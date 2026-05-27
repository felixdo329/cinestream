import { createClient } from "@/lib/supabase/server";
import {
  fetchTmdbMovieById,
  fetchTmdbMovies,
  isTmdbConfigured,
} from "@/lib/tmdb";
import {
  movies as fallbackMovies,
  genres as fallbackGenres,
  continueWatching as fallbackContinueWatching,
  type Movie,
} from "@/app/data/movies";
import type { Database } from "@/types/database";

type MovieRow = Database["public"]["Tables"]["movies"]["Row"];

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function mapRowToMovie(row: MovieRow): Movie {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year,
    rating: row.rating,
    imdb: Number(row.imdb),
    duration: row.duration,
    genre: row.genre ?? [],
    thumbnail: row.thumbnail,
    backdrop: row.backdrop,
    videoUrl: row.video_url,
    isTrending: row.is_trending,
    isFeatured: row.is_featured,
    isNew: row.is_new,
    cast: row.cast_members ?? [],
    director: row.director,
    language: row.language,
  };
}

async function getSupabaseMovies(): Promise<Movie[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data?.length) return null;
    return data.map(mapRowToMovie);
  } catch {
    return null;
  }
}

export async function getMovies(): Promise<Movie[]> {
  if (isTmdbConfigured()) {
    try {
      const tmdbMovies = await fetchTmdbMovies();
      if (tmdbMovies.length > 0) return tmdbMovies;
    } catch (err) {
      console.warn("[TMDB] Failed, trying Supabase:", err);
    }
  }

  const supabaseMovies = await getSupabaseMovies();
  if (supabaseMovies?.length) return supabaseMovies;

  return fallbackMovies;
}

export async function getMovieById(id: number): Promise<Movie | null> {
  if (isTmdbConfigured()) {
    const tmdbMovie = await fetchTmdbMovieById(id);
    if (tmdbMovie) return tmdbMovie;
  }

  const all = await getMovies();
  return all.find((m) => m.id === id) ?? null;
}

export function getTrendingMovies(movies: Movie[]) {
  const trending = movies.filter((m) => m.isTrending);
  return trending.length > 0 ? trending : movies.slice(0, 8);
}

export function getNewReleases(movies: Movie[]) {
  const newest = movies.filter((m) => m.isNew);
  return newest.length > 0 ? newest : movies.slice(0, 8);
}

export function getTopRated(movies: Movie[]) {
  return [...movies].sort((a, b) => b.imdb - a.imdb).slice(0, 8);
}

export function getActionMovies(movies: Movie[]) {
  const action = movies.filter((m) => m.genre.includes("Action"));
  return action.length > 0 ? action : movies.slice(0, 8);
}

export function getDramaMovies(movies: Movie[]) {
  const drama = movies.filter((m) => m.genre.includes("Drama"));
  return drama.length > 0 ? drama : movies.slice(0, 8);
}

export function getGenres(movies: Movie[]): string[] {
  const fromMovies = [...new Set(movies.flatMap((m) => m.genre))].sort();
  return fromMovies.length > 0 ? fromMovies : fallbackGenres;
}

export function getContinueWatching(movies: Movie[]) {
  if (movies.length === 0) {
    return fallbackContinueWatching;
  }

  return [
    { movie: movies[0], progress: 65 },
    { movie: movies[2] ?? movies[0], progress: 30 },
    { movie: movies[4] ?? movies[1], progress: 80 },
    { movie: movies[6] ?? movies[2], progress: 15 },
  ];
}

export function getFeaturedMovie(movies: Movie[]) {
  return movies.find((m) => m.isFeatured) ?? movies[0];
}
