/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/videoId',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
