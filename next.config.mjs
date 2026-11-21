/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/developer', permanent: true },
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/clientele', destination: '/work', permanent: true },
      { source: '/products', destination: '/store', permanent: true },
      { source: '/sitemap', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/downloads/:file*.apk',
        headers: [{ key: 'Content-Type', value: 'application/vnd.android.package-archive' }],
      },
    ];
  },
};

export default nextConfig;
