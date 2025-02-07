'use server';
import { tables } from 'harperdb';
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


// Server-side AI example
import PipelineSingleton from '@/app/pipeline.js';

export async function getAiRecommendations(userTraits = [], category) {
  if (!Array.isArray(userTraits) || !userTraits.length) {
		// If no user trait data, query 3 'default' products in similar category
		// saves an AI API call and prevents needless server resource usage
		return await listProducts({
			conditions: [
				{ attribute: 'category', value: category, comparator: 'equals' },
			],
			limit: 3
		});
  }

  // Get the question-answer pipeline. When called for the first time,
  // this will load the pipeline and cache it for future use.
  const answerer = await PipelineSingleton.getInstance();

  // Actually perform the product recommendation
	return await listProducts()
		.then(data => {
			const question =
				`What are three good product IDs for someone who has the following traits: ${userTraits.join(', ')}`;
			const context = `Good products for the ${userTraits.join(', ')} can be pulled from this list of product data: ${data}, and good products have similar names, descriptions, and features to the ${userTraits} please return the product ids of the selected products.`;

			return answerer(question, context)
				// .then(res => {
				// 	console.log('okay... ', res.answer);
				// 	return res.answer;
				// });
		});
}

// -------
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT_ID,
});

export async function getAi(userTraits = [], category) {
  if (!Array.isArray(userTraits) || !userTraits.length) {
		// If no user trait data, query 3 'default' products in similar category
		// saves an AI API call and prevents needless server resource usage
		return await listProducts({
			conditions: [
				{ attribute: 'category', value: category, comparator: 'equals' },
			],
			limit: 3
		});
  }

  // Actually perform the product recommendation using OpenAI
	return await listProducts()
		.then(async data => {
			const response = await openai.chat.completions.create({
				model: "gpt-4o",
				messages: [
					{
						"role": "developer",
						"content": [
							{
								"type": "text",
								"text": `
									You provide product recommendations that are related to the keywords: ${userTraits.join(', ')} from the following data: ${JSON.stringify(data)}.
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
