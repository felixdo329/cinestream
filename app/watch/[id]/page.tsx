import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMovies, getMovieById } from "@/lib/movies";
import MovieRow from "../../components/MovieRow";
import AddToListButton from "../../components/AddToListButton";
import VideoPlayer from "./VideoPlayer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieById(Number(id));
  if (!movie) return { title: "Movie Not Found" };
  return {
    title: `${movie.title} – CineStream`,
    description: movie.description,
  };
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieById(Number(id));
  if (!movie) notFound();

  const allMovies = await getMovies();
  const related = allMovies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 8);

  return (
    <div style={{ background: "var(--background)" }}>
      <div className="relative w-full" style={{ background: "#000" }}>
        <VideoPlayer src={movie.videoUrl} title={movie.title} />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 hidden md:block">
            <div className="relative w-48 rounded-lg overflow-hidden" style={{ paddingBottom: "150%", width: 192 }}>
              <Image
                src={movie.thumbnail}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {movie.isNew && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  NEW
                </span>
              )}
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#1e1e1e", color: "#ccc" }}>
                {movie.rating}
              </span>
              <span className="text-xs font-semibold" style={{ color: "#f5c518" }}>
                ★ {movie.imdb} IMDb
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#fff" }}>
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm mb-4" style={{ color: "#888" }}>
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span>{movie.language}</span>
              <span>·</span>
              <span>Dir. {movie.director}</span>
            </div>

            <div className="flex gap-2 flex-wrap mb-5">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: "#1e1e1e", color: "#ccc" }}
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "#bbb", maxWidth: 640 }}>
              {movie.description}
            </p>

            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase mb-2" style={{ color: "#666" }}>
                Cast
              </h3>
              <p className="text-sm" style={{ color: "#aaa" }}>
                {movie.cast.join(" · ")}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Play
              </button>
              <AddToListButton movieId={movie.id} />
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: "#1e1e1e", color: "#ccc" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="pb-12">
          <MovieRow title="More Like This" movies={related} size="sm" />
        </div>
      )}

      <div className="text-center pb-8">
        <Link
          href="/"
          className="text-sm hover:text-white transition-colors"
          style={{ color: "#666" }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
