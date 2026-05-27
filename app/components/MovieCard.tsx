"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Movie } from "../data/movies";

interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
  showProgress?: number;
}

export default function MovieCard({ movie, size = "md", showProgress }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "w-36 md:w-40",
    md: "w-44 md:w-52",
    lg: "w-52 md:w-64",
  };

  return (
    <Link href={`/watch/${movie.id}`} className={`${sizeClasses[size]} shrink-0 group`}>
      <div
        className="relative overflow-hidden rounded-lg transition-transform duration-300 cursor-pointer"
        style={{
          transform: hovered ? "scale(1.05)" : "scale(1)",
          border: "1px solid transparent",
          borderColor: hovered ? "#333" : "transparent",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Poster */}
        <div className="relative w-full" style={{ paddingBottom: "150%" }}>
          {!imgError ? (
            <Image
              src={movie.thumbnail}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 144px, 208px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-3"
              style={{ background: "#1a1a1a" }}
            >
              <div className="text-3xl mb-2">🎬</div>
              <p className="text-xs font-medium" style={{ color: "#aaa" }}>
                {movie.title}
              </p>
            </div>
          )}

          {/* Overlay on hover */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center mb-2 mx-auto transition-transform duration-200 hover:scale-110"
              style={{ background: "var(--accent)" }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/watch/${movie.id}`;
              }}
              aria-label={`Play ${movie.title}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {movie.isNew && (
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                NEW
              </span>
            )}
          </div>

          {/* IMDB rating */}
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold"
            style={{ background: "rgba(0,0,0,0.7)", color: "#f5c518" }}
          >
            <span>★</span>
            <span>{movie.imdb}</span>
          </div>
        </div>

        {/* Progress bar (continue watching) */}
        {typeof showProgress === "number" && (
          <div className="w-full h-1" style={{ background: "#333" }}>
            <div
              className="h-full"
              style={{
                width: `${showProgress}%`,
                background: "var(--accent)",
              }}
            />
          </div>
        )}
      </div>

      {/* Title + meta below card */}
      <div className="mt-2 px-0.5">
        <p className="text-sm font-medium truncate" style={{ color: "#f1f1f1" }}>
          {movie.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#888" }}>
          {movie.year} · {movie.duration}
        </p>
      </div>
    </Link>
  );
}
