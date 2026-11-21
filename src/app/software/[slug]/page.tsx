import { ProductPage, productMetadata, productParams } from '@/components/ProductPage';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => productParams('software');

export async function generateMetadata({ params }: Props) {
  return productMetadata('software', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProductPage category="software" slug={(await params).slug} />;
}
