import type { Movie } from "@/app/data/movies";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function isTmdbConfigured(): boolean {
  return Boolean(process.env.TMDB_API_KEY);
}

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error("TMDB_API_KEY is not set");
  return key;
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", getApiKey());
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  original_language: string;
  adult?: boolean;
}

interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbListResponse {
  results: TmdbMovie[];
}

interface TmdbMovieDetail extends TmdbMovie {
  runtime: number | null;
  genres: { id: number; name: string }[];
  credits?: {
    cast: { name: string }[];
    crew: { name: string; job: string }[];
  };
  videos?: {
    results: { key: string; site: string; type: string }[];
  };
}

let genreMapCache: Map<number, string> | null = null;

async function getGenreMap(): Promise<Map<number, string>> {
  if (genreMapCache) return genreMapCache;
  const data = await tmdbFetch<{ genres: TmdbGenre[] }>("/genre/movie/list");
  genreMapCache = new Map(data.genres.map((g) => [g.id, g.name]));
  return genreMapCache;
}

function posterUrl(path: string | null, size: "w500" | "w780" | "original" = "w500") {
  if (!path) return "https://picsum.photos/seed/no-poster/300/450";
  return `${IMAGE_BASE}/${size}${path}`;
}

function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return "2h 0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function getTrailerUrl(videos?: TmdbMovieDetail["videos"]): string {
  const trailer = videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  if (trailer?.key) {
    return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`;
  }
  return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
}

function mapListMovie(
  movie: TmdbMovie,
  genreMap: Map<number, string>,
  flags: { isTrending?: boolean; isNew?: boolean; isFeatured?: boolean }
): Movie {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : new Date().getFullYear();

  const genres =
    movie.genre_ids?.map((id) => genreMap.get(id)).filter((g): g is string => Boolean(g)) ??
    [];

  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview || "No description available.",
    year,
    rating: movie.adult ? "R" : "PG-13",
    imdb: Math.round(movie.vote_average * 10) / 10,
    duration: "2h 0m",
    genre: genres.length > 0 ? genres : ["Drama"],
    thumbnail: posterUrl(movie.poster_path),
    backdrop: posterUrl(movie.backdrop_path, "original"),
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cast: [],
    director: "—",
    language: movie.original_language?.toUpperCase() ?? "EN",
    ...flags,
  };
}

function mapDetailMovie(movie: TmdbMovieDetail): Movie {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : new Date().getFullYear();

  const director =
    movie.credits?.crew?.find((c) => c.job === "Director")?.name ?? "—";

  const cast =
    movie.credits?.cast?.slice(0, 5).map((c) => c.name) ?? [];

  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview || "No description available.",
    year,
    rating: movie.adult ? "R" : "PG-13",
    imdb: Math.round(movie.vote_average * 10) / 10,
    duration: formatRuntime(movie.runtime),
    genre: movie.genres?.map((g) => g.name) ?? ["Drama"],
    thumbnail: posterUrl(movie.poster_path),
    backdrop: posterUrl(movie.backdrop_path, "original"),
    videoUrl: getTrailerUrl(movie.videos),
    cast,
    director,
    language: movie.original_language?.toUpperCase() ?? "EN",
    isTrending: movie.vote_average >= 7.5,
  };
}

function dedupeMovies(movies: Movie[]): Movie[] {
  const seen = new Set<number>();
  return movies.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}

export async function fetchTmdbMovies(): Promise<Movie[]> {
  const genreMap = await getGenreMap();

  const [trending, popular, topRated, nowPlaying] = await Promise.all([
    tmdbFetch<TmdbListResponse>("/trending/movie/week"),
    tmdbFetch<TmdbListResponse>("/movie/popular"),
    tmdbFetch<TmdbListResponse>("/movie/top_rated"),
    tmdbFetch<TmdbListResponse>("/movie/now_playing"),
  ]);

  const movies = dedupeMovies([
    ...trending.results.slice(0, 10).map((m) =>
      mapListMovie(m, genreMap, { isTrending: true, isFeatured: m === trending.results[0] })
    ),
    ...nowPlaying.results.slice(0, 8).map((m) =>
      mapListMovie(m, genreMap, { isNew: true })
    ),
    ...topRated.results.slice(0, 10).map((m) => mapListMovie(m, genreMap, {})),
    ...popular.results.slice(0, 10).map((m) => mapListMovie(m, genreMap, {})),
  ]);

  return movies.slice(0, 24);
}

export async function fetchTmdbMovieById(id: number): Promise<Movie | null> {
  try {
    const movie = await tmdbFetch<TmdbMovieDetail>(`/movie/${id}`, {
      append_to_response: "videos,credits",
    });
    return mapDetailMovie(movie);
  } catch {
    return null;
  }
}
