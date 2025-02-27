import { tables } from 'harperdb';
import productdata from "./productdata.json" with { type: "json" };
const { Product, Traits } = tables;

// product table seed data
for (const product of productdata) {
	Product.put(product);
}

// trait table seed data
// Typically this data would come from a tool like Segment, Optimizely, etc
const USER_TRAITS = ['sporty', 'likes computers', 'lives near a ski resort'];
Traits.put({ id: "1", traits: USER_TRAITS});

// TODO: should OpenAI personalization caching come from here
// to eliminate server action calls to harper?
// class PersonalizeCache extends Resource {
// 	async get() {
// 		console.log('this context ', this.getContext());
// 		return 'personalize cache';
// 	}
// }