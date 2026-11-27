import type { NextConfig } from "next";

const backendUrl = (
  process.env.MENTORLAGBE_BACKEND_URL ||
  "https://mentorlagbe-server-wi7f.onrender.com"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  experimental: {
    webpackBuildWorker: false,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;