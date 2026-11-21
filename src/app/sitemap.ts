import type { MetadataRoute } from 'next';
import { productHref, products } from '@/data/products';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/store', '/apps', '/software', '/hardware', '/work', '/downloads', '/developer', '/contact', '/privacy', '/terms', '/refunds'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}${productHref(p)}`, lastModified: now, priority: 0.7 })),
  ];
}
