"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../data/movies";

interface HeroSectionProps {
  featured: Movie[];
}

export default function HeroSection({ featured }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const movie = featured[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!movie || featured.length === 0) return null;

  return (
    <section className="relative w-full" style={{ height: "90vh", minHeight: 500 }}>
      {/* Backdrop */}
      <div className="absolute inset-0">
        {!imgError[movie.id] ? (
          <Image
            src={movie.backdrop}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            onError={() => setImgError((prev) => ({ ...prev, [movie.id]: true }))}
          />
        ) : (
          <div className="w-full h-full" style={{ background: "#111" }} />
        )}
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.2) 30%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 px-6 md:px-12 max-w-2xl">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-bold px-2 py-1 rounded"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            TRENDING
          </span>
          <span className="text-xs px-2 py-1 rounded" style={{ background: "#1e1e1e", color: "#ccc" }}>
            {movie.rating}
          </span>
          <span className="text-xs font-semibold" style={{ color: "#f5c518" }}>
            ★ {movie.imdb}
          </span>
          <span className="text-xs" style={{ color: "#888" }}>
            {movie.year} · {movie.duration}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight" style={{ color: "#fff" }}>
          {movie.title}
        </h1>

        {/* Genres */}
        <div className="flex gap-2 flex-wrap mb-4">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="text-xs px-2 py-1 rounded"
              style={{ background: "rgba(255,255,255,0.1)", color: "#ccc" }}
            >
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm md:text-base mb-6 line-clamp-3" style={{ color: "#bbb", maxWidth: 520 }}>
          {movie.description}
        </p>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/watch/${movie.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Play Now
          </Link>
          <Link
            href={`/watch/${movie.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </Link>
          <button
            className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            aria-label="Add to My List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            My List
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? "var(--accent)" : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
