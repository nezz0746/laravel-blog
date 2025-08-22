import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

export interface GraphQLSDKConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

export class GraphQLSDK {
  private client: GraphQLClient;
  private sdk: ReturnType<typeof getSdk>;

  constructor(config: GraphQLSDKConfig) {
    this.client = new GraphQLClient(config.endpoint, {
      headers: config.headers,
    });
    this.sdk = getSdk(this.client);
  }

  getSdk(): ReturnType<typeof getSdk> {
    return this.sdk;
  }

  getClient() {
    return this.client;
  }
}

// Factory function for easier instantiation
export function createGraphQLSDK(config: GraphQLSDKConfig): GraphQLSDK {
  return new GraphQLSDK(config);
}

// Re-export types from generated code
export * from './generated/graphql';
