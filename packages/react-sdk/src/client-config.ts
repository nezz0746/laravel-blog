import { GraphQLClient } from "graphql-request";

// Default GraphQL client configuration
export const createGraphQLClient = (
  endpoint: string = "http://localhost:8000"
) => {
  return new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

// Default client instance
export const defaultClient = createGraphQLClient();

// Data source configuration for React Query hooks
export const createDataSource = (
  endpoint: string = "http://localhost:8000"
) => ({
  endpoint: `${endpoint}/graphql`,
  fetchParams: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  } as RequestInit,
});

// Default data source
export const defaultDataSource = createDataSource(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000"
);
