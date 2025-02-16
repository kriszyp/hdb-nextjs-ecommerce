'use server';
import { tables } from 'harperdb';
const { Product } = tables;

// Harper DB Server Actions
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

export async function getUserTraits(id = "1") {
	return tables.Traits.get(id).traits;
}

export async function updateUserTraits(id = "1", traits) {
	await tables.Traits.put({ id, traits });
	return 'successfully updated Traits table';
}

// Algolia Search Server Actions
import { algoliasearch } from 'algoliasearch';

const algoliaClient = algoliasearch(
	process.env.ALGOLIA_APP_ID,
	process.env.ALGOLIA_API_KEY,
);

export async function searchProducts(searchTerm = ''){
	return await algoliaClient.searchSingleIndex({
			indexName: 'productdata',
			searchParams: { query: searchTerm },
		});
}

// OpenAI Server Actions
import OpenAI from "openai";
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT_ID,
});

export async function customizeProductDescription(userTraits = [], productDescription) {
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

export async function getAiRecommendations(userTraits = [], currentId) {
	return await listProducts({
		conditions: [{ attribute: 'id', value: currentId, comparator: 'not_equal' }]
	})
		.then(async data => {
			const response = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{
						"role": "developer",
						"content": [
							{
								"type": "text",
								"text": `
									You provide product recommendations that are related to the keywords: ${userTraits.join(', ')} 
									from the following data: ${JSON.stringify(data)}.
									Do not make up new products that do not exist in the data provided.
									You respond with product recommendations in json format.
								`
							}
						]
					},
					{
						"role": "user",
						"content": [
							{
								"type": "text",
								"text": `Can you recommend a maximum of 3 products for me?`
							}
						]
					}
				],
				response_format: { type: "json_object" }
			});
			return response.choices[0].message.content;
		});
}
