import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true, // Log the full URL of each fetch request
      // hmrRefreshes: true // Log fetch requests restored from HMR cache (optional)
    },
  },
};

export default nextConfig;
