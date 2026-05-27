import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../data/movies";

interface FeaturedBannerProps {
  movie: Movie;
}

export default function FeaturedBanner({ movie }: FeaturedBannerProps) {

  return (
    <section className="mx-4 md:mx-8 mb-12 rounded-2xl overflow-hidden relative" style={{ minHeight: 280 }}>
      <Image
        src={movie.backdrop}
        alt={movie.title}
        fill
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />
      <div className="relative h-full flex flex-col justify-center p-8 md:p-12 max-w-lg">
        <span
          className="text-xs font-bold px-2 py-1 rounded w-fit mb-3"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          FEATURED
        </span>
        <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: "#fff" }}>
          {movie.title}
        </h2>
        <p className="text-sm mb-5 line-clamp-2" style={{ color: "#bbb" }}>
          {movie.description}
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/watch/${movie.id}`}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Watch Now
          </Link>
          <Link
            href={`/watch/${movie.id}`}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
}
