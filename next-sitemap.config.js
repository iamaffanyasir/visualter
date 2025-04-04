/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visualter.vercel.app',
  changefreq: 'daily',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    additionalSitemaps: [
      'https://visualter.vercel.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    }
  },
}
