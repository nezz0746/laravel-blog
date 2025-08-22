// Main SDK exports
export { GraphQLSDK, createGraphQLSDK } from "./client";
export type { GraphQLSDKConfig } from "./client";

// Re-export all generated types and operations
export * from "./generated/graphql";

// Export GraphQLClient from graphql-request for advanced usage
export { GraphQLClient } from "graphql-request";

// Export React Query client configuration
export * from "./client-config";
