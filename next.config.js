/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    CAT_API_BASE_URL: process.env.CAT_API_BASE_URL,
    CAT_API_KEY: process.env.CAT_API_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cdn2.thecatapi.com'],
  },
}

module.exports = nextConfig
