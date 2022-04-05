"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersQuery = void 0;
const bulk_query_1 = require("./bulk-query");
class OrdersQuery extends bulk_query_1.BulkQuery {
    query(date) {
        const filters = [];
        if (date) {
            const isoDate = date.toISOString();
            filters.push(`created_at:>='${isoDate}' OR updated_at:>='${isoDate}'`);
        }
        const queryString = filters.map(f => `(${f})`).join(` AND `);
        const query = `
      {
        orders(query: "${queryString}") {
          edges {
            node {
              id
              edited
              closed
              closedAt
              refunds {
                id
                createdAt
              }
              lineItems {
                edges {
                  node {
                    id
                    product {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }`;
        return this.bulkOperationQuery(query);
    }
}
exports.OrdersQuery = OrdersQuery;
//# sourceMappingURL=orders-query.js.map