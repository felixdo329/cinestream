import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensures Vercel builds from this app folder (avoids wrong root detection)
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
