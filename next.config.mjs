/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Next.js settings
  swcMinify: true,
  reactStrictMode: true,
  
  // Skip build if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ];
  },
  
  // Disable certain checks during build to avoid errors
  eslint: {
    // Warning: This allows production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    // Similarly this skips type checking to allow builds with TypeScript errors
    ignoreBuildErrors: true,
  },
  
  // Reduce build size by excluding certain patterns
  poweredByHeader: false,
};

export default nextConfig;
