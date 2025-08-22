import { GraphQLClient } from "graphql-request";

// Default GraphQL client configuration
export const createGraphQLClient = (
  endpoint: string = "http://localhost:8000/graphql"
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
  endpoint: string = "http://localhost:8000/graphql"
) => ({
  endpoint,
  fetchParams: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  } as RequestInit,
});

// Default data source
export const defaultDataSource = createDataSource();
