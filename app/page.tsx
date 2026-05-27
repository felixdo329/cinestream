import HeroSection from "./components/HeroSection";
import MovieRow from "./components/MovieRow";
import GenreSection from "./components/GenreSection";
import FeaturedBanner from "./components/FeaturedBanner";
import {
  getMovies,
  getTrendingMovies,
  getNewReleases,
  getTopRated,
  getActionMovies,
  getDramaMovies,
  getGenres,
  getContinueWatching,
  getFeaturedMovie,
} from "@/lib/movies";

export default async function Home() {
  const movies = await getMovies();
  const trending = getTrendingMovies(movies);
  const newReleases = getNewReleases(movies);
  const topRated = getTopRated(movies);
  const actionMovies = getActionMovies(movies);
  const dramaMovies = getDramaMovies(movies);
  const genres = getGenres(movies);
  const continueWatching = getContinueWatching(movies);
  const featured = getFeaturedMovie(movies);
  const continueMovies = continueWatching.map((c) => c.movie);

  return (
    <div style={{ background: "var(--background)" }}>
      <HeroSection featured={trending.slice(0, 5)} />

      <section className="mt-8">
        <MovieRow
          title="Continue Watching"
          movies={continueMovies}
          size="md"
          showProgress={continueWatching}
        />
      </section>

      <MovieRow title="Trending Now" movies={trending} size="md" />
      <MovieRow title="New Releases" movies={newReleases} size="md" />
      <FeaturedBanner movie={featured} />
      <MovieRow title="Top Rated" movies={topRated} size="md" />
      <GenreSection movies={movies} genres={genres} />
      <MovieRow title="Action & Adventure" movies={actionMovies} size="sm" />
      <MovieRow title="Drama" movies={dramaMovies} size="sm" />
    </div>
  );
}
