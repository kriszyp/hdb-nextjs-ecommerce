'use server';
import('harperdb');
const { Product } = tables;

export async function listProducts(conditions = {}) {
	const products = [];
  const results = Product.search(conditions);
	for await (const product of results) {
		products.push(product);
	}
	return products;
}

export async function getProduct(id) {
	return tables.Product.get(id);
}
