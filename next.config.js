/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lucky-quit-bucket.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

module.exports = nextConfig;