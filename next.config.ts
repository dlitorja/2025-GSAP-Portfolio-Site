import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
    ],
  },
};

export default nextConfig;
