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
        destination: '/cats',
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
