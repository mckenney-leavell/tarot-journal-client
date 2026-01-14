import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steve-p.org',
        port: '',
        pathname: '/**'
      }
    ]
  },
  devIndicators: false,
};

export default nextConfig;
