/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_URL_STATICS: process.env.API_URL_STATICS,
  },
  reactStrictMode: false,
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
        hostname: "skyserver-production.up.railway",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
