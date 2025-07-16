/** @type {import('next').NextConfig} */
const nextConfig = {
  // The entire experimental object can be removed if appDir was the only thing in it
  // Or, if there were other experimental flags, just remove appDir: true,
  // For this specific content, you can remove the whole experimental block.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig