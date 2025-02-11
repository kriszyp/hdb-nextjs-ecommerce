import { tables } from 'harperdb';
import productdata from "./productdata.json" with { type: "json" };
const { Product, Traits } = tables;

// product table seed data
for (const product of productdata) {
	Product.put(product);
}

// trait table seed data
const USER_TRAITS = ['sporty', 'likes computers', 'lives near a ski resort'];
Traits.put({ id: "1", traits: USER_TRAITS});
