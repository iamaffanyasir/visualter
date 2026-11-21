import type { Metadata } from 'next';
import { CategoryPage } from '@/components/CategoryPage';
import { categories } from '@/data/products';

export const metadata: Metadata = { title: 'Hardware', description: categories.hardware.text };

export default function Page() {
  return <CategoryPage category="hardware" />;
}
