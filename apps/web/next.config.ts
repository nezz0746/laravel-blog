import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production deployment
  output: "standalone",

  // Environment variables
  env: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT:
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      "http://localhost:8000/graphql",
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "@graphql-monorepo/react-sdk",
      "@tanstack/react-query",
    ],
  },
};

export default nextConfig;
