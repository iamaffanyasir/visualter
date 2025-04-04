/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visualter.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  priority: 0.7,
  changefreq: 'daily',
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      }
    ]
  },
  sitemapSize: 7000,
  additionalPaths: async (config) => [
    {
      loc: '/',
      priority: 1.0,
      changefreq: 'daily'
    },
    {
      loc: '/about',
      priority: 0.8,
      changefreq: 'weekly'
    },
    {
      loc: '/portfolio',
      priority: 0.8,
      changefreq: 'weekly'
    },
    {
      loc: '/contact',
      priority: 0.8,
      changefreq: 'weekly'
    },
    {
      loc: '/clientele',
      priority: 0.8,
      changefreq: 'weekly'
    }
  ]
};
