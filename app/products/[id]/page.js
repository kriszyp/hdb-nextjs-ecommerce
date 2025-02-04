import 'harperdb';
import ProductPage from './product-page';
import { listProducts } from '@/app/actions';

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((data) => ({
    id: data.id,
  }))
}

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductPage id={id} />;
}