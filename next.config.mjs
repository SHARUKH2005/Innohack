/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: []
  },
};

export default nextConfig;
