/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visualter.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
};
