import { ProductPage, productMetadata, productParams } from '@/components/ProductPage';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => productParams('apps');

export async function generateMetadata({ params }: Props) {
  return productMetadata('apps', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProductPage category="apps" slug={(await params).slug} />;
}
