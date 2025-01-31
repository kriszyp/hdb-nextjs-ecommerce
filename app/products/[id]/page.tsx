import ProductPage from './product-page';
import { products } from './products-data';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <ProductPage id={params.id} />;
}