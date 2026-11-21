import { ProductPage, productMetadata, productParams } from '@/components/ProductPage';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => productParams('hardware');

export async function generateMetadata({ params }: Props) {
  return productMetadata('hardware', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProductPage category="hardware" slug={(await params).slug} />;
}
