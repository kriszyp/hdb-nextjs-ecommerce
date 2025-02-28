import { tables } from 'harperdb';
import productdata from "./productdata.json" with { type: "json" };
import OpenAI from "openai";
const { Product, Traits, PersonalizeCache } = tables;
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT_ID,
});

// product table seed data
for (const product of productdata) {
	Product.put(product);
}

// trait table seed data
// Typically this data would come from a tool like Segment, Optimizely, etc
const USER_TRAITS = ['sporty', 'likes computers', 'lives near a ski resort'];
Traits.put({ id: "1", traits: USER_TRAITS});

PersonalizeCache.sourcedFrom({
	async get(id) {
		const [ productId, traitsKey ] = id.split('/');
		const traits = traitsKey.split(',');
		const product = await Product.get(productId);
		return {
			key: id,
			content: await customizeProductDescription(traits, product.description),
		};
	}
});

async function customizeProductDescription(userTraits = [], productDescription) {
	const prompt = `Given that a person has the following traits: ${userTraits.join(', ')} 
		can you rewrite the following product description passage for someone like this: ${productDescription} without using exclamation points?
		Only return the product description, no other text.
		Keep the description to a 300 character length maximum.
	`;
	const response = await openai.chat.completions.create({
		messages: [{ role: 'user', content: prompt }],
		model: 'gpt-4o-mini',
	});
	return response.choices[0].message.content;
}
// TODO: should OpenAI personalization caching come from here
// to eliminate server action calls to harper?
// class PersonalizeCache extends Resource {
// 	async get() {
// 		console.log('this context ', this.getContext());
// 		return 'personalize cache';
// 	}
// }