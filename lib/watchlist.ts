import { createClient } from "@/lib/supabase/server";
import type { Movie } from "@/app/data/movies";
import { getMovies } from "@/lib/movies";

export async function getWatchlistMovies(): Promise<Movie[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: rows, error } = await supabase
    .from("watchlist")
    .select("movie_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !rows?.length) return [];

  const allMovies = await getMovies();
  const ids = new Set(rows.map((r) => r.movie_id));
  return allMovies.filter((m) => ids.has(m.id));
}

export async function isInWatchlist(movieId: number): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("movie_id", movieId)
    .maybeSingle();

  return Boolean(data);
}
