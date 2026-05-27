"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/providers/AuthProvider";

interface AddToListButtonProps {
  movieId: number;
}

export default function AddToListButton({ movieId }: AddToListButtonProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [inList, setInList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();
    supabase
      .from("watchlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("movie_id", movieId)
      .maybeSingle()
      .then(({ data }) => setInList(Boolean(data)));
  }, [user, movieId]);

  const toggle = async () => {
    if (!user) {
      router.push(`/account?next=/watch/${movieId}`);
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (inList) {
      const { error } = await supabase
        .from("watchlist")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movieId);

      if (!error) setInList(false);
    } else {
      const { error } = await supabase.from("watchlist").insert({
        user_id: user.id,
        movie_id: movieId,
      });

      if (!error) setInList(true);
    }

    setLoading(false);
  };

  if (authLoading) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
      style={{
        background: inList ? "#2a2a2a" : "rgba(255,255,255,0.1)",
        color: inList ? "#4ade80" : "#fff",
        border: inList ? "1px solid #4ade80" : "1px solid transparent",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {inList ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </>
        )}
      </svg>
      {inList ? "In My List" : "My List"}
    </button>
  );
}
