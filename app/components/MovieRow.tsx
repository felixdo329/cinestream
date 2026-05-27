"use client";
import { useRef } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../data/movies";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  size?: "sm" | "md" | "lg";
  showProgress?: { movie: Movie; progress: number }[];
}

export default function MovieRow({ title, movies, size = "md", showProgress }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = 400;
    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between px-4 md:px-8 mb-4">
        <h2 className="text-lg md:text-xl font-semibold" style={{ color: "#f1f1f1" }}>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:text-white"
            style={{ background: "#1e1e1e", color: "#888" }}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:text-white"
            style={{ background: "#1e1e1e", color: "#888" }}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-8 pb-2"
      >
        {movies.map((movie) => {
          const progress = showProgress?.find((p) => p.movie.id === movie.id)?.progress;
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              size={size}
              showProgress={progress}
            />
          );
        })}
      </div>
    </section>
  );
}
