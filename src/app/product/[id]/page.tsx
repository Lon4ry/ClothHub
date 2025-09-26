import { ProductDetailClient } from './ProductDetailClient';

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  return <ProductDetailClient productId={id} />;
}