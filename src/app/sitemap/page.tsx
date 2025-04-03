'use client';

import Link from 'next/link';
import './sitemap.css';

interface SitemapSection {
  title: string;
  links: Array<{
    name: string;
    path: string;
    description?: string;
  }>;
}

const sitemapData: SitemapSection[] = [
  {
    title: 'Main Pages',
    links: [
      { name: 'Home', path: '/', description: 'Welcome to Visualter - Digital Solutions Provider' },
      { name: 'About Us', path: '/about', description: 'Learn about our company and mission' },
      { name: 'Contact', path: '/contact', description: 'Get in touch with our team' },
      { name: 'Portfolio', path: '/portfolio', description: 'Explore our work and projects' }
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Web Development', path: '/services/web', description: 'Custom web development solutions' },
      { name: 'Mobile Apps', path: '/services/mobile', description: 'Mobile application development' },
      { name: 'Software Development', path: '/services/software', description: 'Custom software solutions' },
      { name: 'UI/UX Design', path: '/services/ui-ux', description: 'User interface and experience design' }
    ]
  },
  {
    title: 'Products',
    links: [
      { name: 'All Products', path: '/products', description: 'Browse our complete product catalog' },
      { name: 'Enterprise Suite', path: '/products/enterprise', description: 'Business management solutions' },
      { name: 'Security Tools', path: '/products/security', description: 'Cybersecurity solutions' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', path: '/blog', description: 'Latest articles and insights' },
      { name: 'Documentation', path: '/docs', description: 'Technical documentation and guides' },
      { name: 'Support', path: '/support', description: 'Customer support resources' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', path: '/privacy', description: 'Our privacy policies and data practices' },
      { name: 'Terms of Service', path: '/terms', description: 'Terms and conditions of service' }
    ]
  }
];

export default function SitemapPage() {
  return (
    <div className="sitemap">
      <section className="sitemap__hero">
        <div className="sitemap__hero-content">
          <h1 className="sitemap__hero-title">Sitemap</h1>
          <p className="sitemap__hero-description">
            Navigate through our complete site structure
          </p>
        </div>
      </section>

      <div className="sitemap__container">
        <div className="sitemap__content">
          {sitemapData.map((section, index) => (
            <section key={index} className="sitemap__section">
              <h2 className="sitemap__section-title">{section.title}</h2>
              <div className="sitemap__links">
                {section.links.map((link, linkIndex) => (
                  <Link 
                    href={link.path} 
                    key={linkIndex}
                    className="sitemap__link"
                  >
                    <div className="sitemap__link-content">
                      <h3 className="sitemap__link-title">{link.name}</h3>
                      {link.description && (
                        <p className="sitemap__link-description">{link.description}</p>
                      )}
                    </div>
                    <span className="sitemap__link-arrow">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
