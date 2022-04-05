"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productVariantsProcessor = void 0;
const node_builder_1 = require("../node-builder");
function productVariantsProcessor(objects, builder, gatsbyApi, pluginOptions) {
    const objectsToBuild = objects.reduce((objs, obj) => {
        const [, remoteType] = obj.id.match(node_builder_1.pattern) || [];
        if (remoteType === `Product`) {
            // ProductVariants query also returns products but we already process the products in another processor
        }
        else if (remoteType === `InventoryLevel`) {
            objs.push(Object.assign(Object.assign({}, obj), { location: {
                    id: (0, node_builder_1.createNodeId)(obj.location.id, gatsbyApi, pluginOptions),
                } }));
        }
        else {
            objs.push(obj);
        }
        return objs;
    }, []);
    /**
     * We will need to attach presentmentPrices here as a simple array.
     * To achieve that, we could go through the results backwards and
     * save the ProductVariantPricePair records to a map that's keyed
     * by the variant ID, which can be obtained by reading the __parentId
     * field of the ProductVariantPricePair record.
     *
     * We do similar processing to collect the product IDs for a collection,
     * so please see the processors/collections.ts for reference.
     */
    return objectsToBuild.map(builder.buildNode);
}
exports.productVariantsProcessor = productVariantsProcessor;
//# sourceMappingURL=product-variants.js.map