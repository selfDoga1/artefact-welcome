import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    resolveAlias: {
      "@backend": path.resolve(__dirname, "../backend"),
    },
  },
};

export default nextConfig;
