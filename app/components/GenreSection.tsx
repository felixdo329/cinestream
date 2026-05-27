"use client";
import { useState } from "react";
import type { Movie } from "../data/movies";
import MovieCard from "./MovieCard";

interface GenreSectionProps {
  movies: Movie[];
  genres: string[];
}

export default function GenreSection({ movies, genres }: GenreSectionProps) {
  const [activeGenre, setActiveGenre] = useState(genres[0] ?? "Action");

  const filtered = movies.filter((m) => m.genre.includes(activeGenre)).slice(0, 8);

  return (
    <section className="px-4 md:px-8 mb-12">
      <h2 className="text-lg md:text-xl font-semibold mb-5" style={{ color: "#f1f1f1" }}>
        Browse by Genre
      </h2>

      {/* Genre tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeGenre === genre ? "var(--accent)" : "#1e1e1e",
              color: activeGenre === genre ? "#fff" : "#aaa",
              border: `1px solid ${activeGenre === genre ? "var(--accent)" : "#2a2a2a"}`,
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movies grid */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {filtered.length > 0 ? (
          filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} size="md" />
          ))
        ) : (
          <p className="text-sm" style={{ color: "#666" }}>
            No movies found for this genre.
          </p>
        )}
      </div>
    </section>
  );
}
