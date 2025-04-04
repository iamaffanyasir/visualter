/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visualter.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://visualter.com/sitemap.xml'
    ]
  }
};
