import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles output automatically, no need for "standalone"
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    // Allow AI-generated images from any source if needed later
    remotePatterns: [],
  },
};

export default nextConfig;
