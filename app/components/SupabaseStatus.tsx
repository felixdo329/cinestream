import { getMovies, isSupabaseConfigured } from "@/lib/movies";
import { createClient } from "@/lib/supabase/server";

async function getDataSource(): Promise<"supabase" | "local" | "unconfigured"> {
  if (!isSupabaseConfigured()) return "unconfigured";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("movies").select("id").limit(1);
    if (!error && data && data.length > 0) return "supabase";
  } catch {
    // fall through
  }

  const movies = await getMovies();
  return movies.length > 0 ? "local" : "unconfigured";
}

export default async function SupabaseStatus() {
  const source = await getDataSource();

  const styles = {
    supabase: { bg: "#0d3320", color: "#4ade80", label: "Connected to Supabase" },
    local: { bg: "#332b0d", color: "#fbbf24", label: "Using local data — run setup.sql in Supabase" },
    unconfigured: { bg: "#331a1a", color: "#f87171", label: "Supabase not configured" },
  };

  const s = styles[source];

  return (
    <div
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}
    >
      {s.label}
    </div>
  );
}
