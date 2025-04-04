/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visualter.vercel.app', // Update this to your actual domain
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/']
      }
    ]
  }
};
