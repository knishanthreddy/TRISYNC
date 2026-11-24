/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  async redirects() {
    return [
      {
        source: '/auth/:path*',
        destination: '/app/overview',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
