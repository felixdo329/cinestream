import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getWatchlistMovies } from "@/lib/watchlist";
import MovieRow from "../components/MovieRow";

export const metadata = {
  title: "My List – CineStream",
  description: "Your saved movies on CineStream",
};

export default async function MyListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const movies = await getWatchlistMovies();

  return (
    <div className="pt-24 pb-16 px-4 md:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#fff" }}>
          My List
        </h1>
        <p className="text-sm mb-8" style={{ color: "#888" }}>
          {user?.email ? `Saved movies for ${user.email}` : "Your saved movies"}
        </p>

        {movies.length > 0 ? (
          <MovieRow title="Saved Movies" movies={movies} size="md" />
        ) : (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "#141414", border: "1px solid #2a2a2a" }}
          >
            <p className="text-lg font-medium mb-2" style={{ color: "#fff" }}>
              Your list is empty
            </p>
            <p className="text-sm mb-6" style={{ color: "#888" }}>
              Browse movies and click &quot;My List&quot; on any title to save it here.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
