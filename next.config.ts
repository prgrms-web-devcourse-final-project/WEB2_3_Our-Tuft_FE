import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["team09-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  // compiler: {
  //   removeConsole: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
