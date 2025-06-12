import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pngimg.com",
        port: "",
        pathname: "/**", // Allow all paths under pngimg.com
      },
    ],
  },
};

export default nextConfig;
