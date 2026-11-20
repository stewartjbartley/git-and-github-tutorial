import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/course/[slug]": ["./content/real/**/*"],
    "/api/downloads/[id]": ["./private/pdfs/**/*"],
  },
};

export default nextConfig;
