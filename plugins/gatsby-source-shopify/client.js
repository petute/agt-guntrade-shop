"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const errors_1 = require("./errors");
const adminUrl = (options) => `https://@${options.storeUrl}/admin/api/2022-01/graphql.json`;
const MAX_BACKOFF_MILLISECONDS = 60000;
function createClient(options) {
    const url = adminUrl(options);
    async function graphqlFetch(query, variables, retries = 0) {
        const response = await (0, node_fetch_1.default)(url, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`,
                'X-Shopify-Access-Token': options.password
            },
            body: JSON.stringify({
                query,
                variables
            })
        });
        if (!response.ok) {
            const waitTime = 2 ** (retries + 1) + 500;
            if (response.status >= 500 && waitTime < MAX_BACKOFF_MILLISECONDS) {
                await new Promise(resolve => setTimeout(resolve, waitTime));
                return graphqlFetch(query, variables, retries + 1);
            }
            throw new errors_1.HttpError(response);
        }
        const json = await response.json();
        return json.data;
    }
    return { request: graphqlFetch };
}
exports.createClient = createClient;
//# sourceMappingURL=client.js.map