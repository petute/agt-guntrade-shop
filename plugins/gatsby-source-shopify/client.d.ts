interface IGraphQLClient {
    request: <T>(query: string, variables?: Record<string, any>) => Promise<T>;
}
export declare function createClient(options: ShopifyPluginOptions): IGraphQLClient;
export {};
