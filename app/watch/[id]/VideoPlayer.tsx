"use client";

import { useRef, useState } from "react";
import { isYoutubeVideo } from "@/lib/video";

interface VideoPlayerProps {
  src: string;
  title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [showControls, setShowControls] = useState(true);
  const [showYoutube, setShowYoutube] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isYoutube = isYoutubeVideo(src);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (isYoutube) {
      setShowYoutube(true);
      setPlaying(true);
      return;
    }

    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress((v.currentTime / v.duration) * 100 || 0);
    setCurrentTime(formatTime(v.currentTime));
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(formatTime(v.duration));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  };

  if (isYoutube && showYoutube) {
    return (
      <div
        className="relative w-full bg-black"
        style={{ aspectRatio: "16/9", maxHeight: "80vh" }}
      >
        <iframe
          src={src}
          title={`${title} trailer`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p
          className="absolute bottom-3 left-4 text-xs px-2 py-1 rounded"
          style={{ background: "rgba(0,0,0,0.7)", color: "#aaa" }}
        >
          Playing official trailer
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-black"
      style={{ aspectRatio: "16/9", maxHeight: "80vh" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {!isYoutube && (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setPlaying(false)}
          onClick={togglePlay}
          playsInline
        />
      )}

      {isYoutube && !showYoutube && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
          }}
        >
          <p className="text-sm" style={{ color: "#aaa" }}>
            Official trailer available
          </p>
        </div>
      )}

      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${title}`}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ background: "rgba(229,9,20,0.9)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </button>
      )}

      {!isYoutube && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
          }}
        >
          <div
            className="w-full h-1 rounded-full cursor-pointer mb-3"
            style={{ background: "rgba(255,255,255,0.2)" }}
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: "var(--accent)" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:opacity-80"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:opacity-80"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              <span className="text-xs text-white">
                {currentTime} / {duration}
              </span>
            </div>

            <span className="text-xs text-white opacity-70 truncate max-w-xs hidden md:block">
              {title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
