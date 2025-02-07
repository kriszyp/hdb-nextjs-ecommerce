import { tables } from 'harperdb';
import productdata from "./productdata.json" with { type: "json" };
const { Product } = tables;

// product table seed data
for (const product of productdata) {
	Product.put(product);
}
