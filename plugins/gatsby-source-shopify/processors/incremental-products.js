"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementalProductsProcessor = void 0;
const node_builder_1 = require("../node-builder");
function incrementalProductsProcessor(objects, builder, gatsbyApi, pluginOptions) {
    const { typePrefix = `` } = pluginOptions;
    const products = objects.filter(obj => {
        const [, remoteType] = obj.id.match(node_builder_1.pattern) || [];
        return remoteType === `Product`;
    });
    const variants = objects.filter(obj => {
        const [, remoteType] = obj.id.match(node_builder_1.pattern) || [];
        return remoteType === `ProductVariant`;
    });
    const productNodeIds = products.map(product => (0, node_builder_1.createNodeId)(product.id, gatsbyApi, pluginOptions));
    /**
     * The events API doesn't tell us about deleted variants or images, so when we
     * get the list of changed products, we have to compare those product
     * variants/images with what we have in the cache, and delete those that are
     * not present in the newer API results.
     */
    const variantsToDelete = gatsbyApi
        .getNodesByType(`${typePrefix}ShopifyProductVariant`)
        .filter(node => {
        const index = productNodeIds.indexOf(node.productId);
        if (index >= 0) {
            const product = products[index];
            const variantIds = variants
                .filter(v => v.__parentId === product.id)
                .map(v => (0, node_builder_1.createNodeId)(v.id, gatsbyApi, pluginOptions));
            if (!variantIds.includes(node.id)) {
                return true;
            }
        }
        return false;
    });
    variantsToDelete.forEach(variant => {
        gatsbyApi.actions.deleteNode(variant);
    });
    const imagesToDelete = gatsbyApi
        .getNodesByType(`${typePrefix}ShopifyProductImage`)
        .filter(node => productNodeIds.includes(node.productId));
    imagesToDelete.forEach(image => {
        gatsbyApi.actions.deleteNode(image);
    });
    /**
     * Additionally, product variants have metafields attached to them, so
     * we must delete those as well to avoid oprhaned nodes building up in
     * the cache.
     */
    const variantIds = variantsToDelete.map(v => v.id);
    gatsbyApi
        .getNodesByType(`${typePrefix}ShopifyProductVariantMetafield`)
        .forEach(metafield => {
        if (variantIds.includes(metafield.productVariantId)) {
            gatsbyApi.actions.deleteNode(metafield);
        }
    });
    const objectsToBuild = objects.filter(obj => {
        const [, remoteType] = obj.id.match(node_builder_1.pattern) || [];
        return remoteType !== `ProductVariant`;
    });
    return objectsToBuild.map(builder.buildNode);
}
exports.incrementalProductsProcessor = incrementalProductsProcessor;
//# sourceMappingURL=incremental-products.js.map