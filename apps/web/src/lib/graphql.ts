import { createGraphQLSDK } from '@graphql-monorepo/sdk';

// Create SDK instance with GraphQL endpoint
export const sdk = createGraphQLSDK({
  endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql',
});

// Export types for easier usage
export type * from '@graphql-monorepo/sdk';
