import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@designbase/tokens", "@designbase/components"],
};

export default nextConfig;
