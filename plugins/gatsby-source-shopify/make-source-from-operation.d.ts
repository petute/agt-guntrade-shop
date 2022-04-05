import { SourceNodesArgs } from "gatsby";
import { IShopifyBulkOperation } from "./operations";
export declare function makeSourceFromOperation(finishLastOperation: () => Promise<void>, completedOperation: (id: string) => Promise<{
    node: BulkOperationNode;
}>, cancelOperationInProgress: () => Promise<void>, gatsbyApi: SourceNodesArgs, pluginOptions: ShopifyPluginOptions): (op: IShopifyBulkOperation, isPriorityBuild?: boolean) => Promise<void>;
