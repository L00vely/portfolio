import dotenv from 'dotenv';
dotenv.config();

import { GraphQLClient } from 'graphql-request';

// CONT NEXT_PUBLIC son visibles en el sitio web, pero no en la terminal
const spaceId: string | undefined = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const deliveryToken: string | undefined = process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN;
const environment: string | undefined = process.env.NEXT_PUBLIC_CONTENTFUL_NODE_ENV;
const endpoint: string = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`;

const contentfulClient: GraphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${deliveryToken}`
  }
});

export {
  contentfulClient
};
