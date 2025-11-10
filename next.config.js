/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Optional: Set basePath if deploying to a subdirectory
  // basePath: '/repository-name',
  // trailingSlash: true,
}

module.exports = nextConfig

