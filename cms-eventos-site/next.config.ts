import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "source.unsplash.com",
        },
      ],
    },
  };


export default nextConfig;
