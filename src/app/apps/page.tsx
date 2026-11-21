import type { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { categories } from '@/data/products';

export const metadata: Metadata = { title: 'Apps', description: categories.apps.text };

export default function Page() {
  return <CategoryPage category="apps" />;
}
