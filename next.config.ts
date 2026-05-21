import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  experimental: {
    viewTransition: true,
    optimizePackageImports: ["lucide-react", "motion", "@react-three/drei"],
  },
  poweredByHeader: false,
  compress: true,
  images: {
    // No sharp at runtime — the deploy container is Linux/amd64 and we
    // build node_modules locally; shipping mac binaries breaks startup.
    // We don't use next/image with optimization yet anyway.
    unoptimized: true,
  },
};

export default config;
