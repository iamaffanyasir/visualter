/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visualter.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  priority: 0.7,
  changefreq: 'daily',
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
};
