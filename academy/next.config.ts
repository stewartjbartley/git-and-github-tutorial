import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/course/[slug]": ["./content/real/**/*"] },
};

export default nextConfig;
