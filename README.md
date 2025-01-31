# HarperDB + Nextjs Ecommerce Template

This is a template for building a [Nextjs](https://nextjs.org/) application powered by [HarperDB](https://www.harperdb.io/). To get started, make sure you have [installed HarperDB](https://docs.harperdb.io/docs/install-harperdb), which can be quickly done with `npm install -g harperdb`. You can run this reposity by cloning it down and running the following in your terminal:

`npm i`
`npm run dev`

For more information about getting started with HarperDB and building your Next.js applications, see our [getting started guides and documentation](https://www.harperdb.io/development/technologies/next-js).

This template includes the [default configuration](./config.yaml), which specifies how files are handled in your application.

The [schema.graphql](./schema.graphql) is the schema definition. This is the main starting point for defining your database schema, specifying which tables you want and what attributes/fields they should have.

The [resources.js](./resources.js) provides a template for defining JavaScript resource classes, for customized application logic in your endpoints. This repo comes with sample product data in a json file.