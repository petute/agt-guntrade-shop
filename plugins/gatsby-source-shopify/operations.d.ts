import { NodeInput, SourceNodesArgs } from "gatsby";
export interface IShopifyBulkOperation {
    execute: () => Promise<BulkOperationRunQueryResponse>;
    name: string;
    process: (objects: BulkResults, nodeBuilder: NodeBuilder, _gatsbyApi: SourceNodesArgs, _pluginOptions: ShopifyPluginOptions) => Array<Promise<NodeInput>>;
}
interface IOperations {
    incrementalProducts: (date: Date) => IShopifyBulkOperation;
    incrementalProductVariants: (date: Date) => IShopifyBulkOperation;
    incrementalOrders: (date: Date) => IShopifyBulkOperation;
    incrementalCollections: (date: Date) => IShopifyBulkOperation;
    incrementalLocations: (date: Date) => IShopifyBulkOperation;
    createProductsOperation: IShopifyBulkOperation;
    createProductVariantsOperation: IShopifyBulkOperation;
    createOrdersOperation: IShopifyBulkOperation;
    createCollectionsOperation: IShopifyBulkOperation;
    createLocationsOperation: IShopifyBulkOperation;
    cancelOperationInProgress: () => Promise<void>;
    cancelOperation: (id: string) => Promise<BulkOperationCancelResponse>;
    finishLastOperation: () => Promise<void>;
    completedOperation: (operationId: string, interval?: number) => Promise<{
        node: BulkOperationNode;
    }>;
}
export declare function createOperations(options: ShopifyPluginOptions, { reporter }: SourceNodesArgs): IOperations;
export {};
