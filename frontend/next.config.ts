import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   ppr: true,
  //   webpackMemoryOptimizations: true,
  // },
  images: {
    remotePatterns: [new URL("https://randomuser.me/api/**")],
  },
  /* config options here */
};

export default nextConfig;
