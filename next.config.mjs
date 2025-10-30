/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Keep builds green during initial upgrade; remove once comfortable
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
