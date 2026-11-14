import type { NextConfig } from "next";

/**
 * GitHub Pages / static hosting support.
 * Set NEXT_PUBLIC_BASE_PATH (e.g. "/WEBSITE-TRIAL-3") for a static export
 * served under a sub-path; leave unset for the normal Next.js server build.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(BASE_PATH
    ? {
        output: "export",
        basePath: BASE_PATH,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
