/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_URL_STATICS: process.env.NEXT_PUBLIC_API_URL_STATICS,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "skyserver-production.up.railway.app",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
