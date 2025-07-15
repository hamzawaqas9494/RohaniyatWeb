/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gpvvxhhvxzefphknwtng.supabase.co',
        pathname: '/storage/v1/object/public/**'   // Supabase storage ka path pattern
      }
    ]
  }
};

module.exports = nextConfig;
