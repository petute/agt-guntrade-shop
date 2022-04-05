"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsQuery = void 0;
const bulk_query_1 = require("./bulk-query");
class LocationsQuery extends bulk_query_1.BulkQuery {
    query(date) {
        const publishedStatus = this.pluginOptions.salesChannel
            ? `'${encodeURIComponent(this.pluginOptions.salesChannel)}:visible'`
            : `published`;
        const filters = [`published_status:${publishedStatus}`];
        if (date) {
            const isoDate = date.toISOString();
            filters.push(`created_at:>='${isoDate}' OR updated_at:>='${isoDate}'`);
        }
        const queryString = filters.map(f => `(${f})`).join(` AND `);
        const query = `
      {
        locations(query: "${queryString}") {
          edges {
            node {
              id
              activatable
              address {
                address1
                address2
                city
                country
                countryCode
                formatted
                latitude
                longitude
                phone
                province
                provinceCode
                zip
              }
              addressVerified
              deactivatable
              deactivatedAt
              deletable
              fulfillmentService {
                callbackUrl
                fulfillmentOrdersOptIn
                handle
                id
                inventoryManagement
                productBased
                serviceName
                shippingMethods {
                  code
                  label
                }
                type
              }
              fulfillsOnlineOrders
              hasActiveInventory
              hasUnfulfilledOrders
              isActive
              legacyResourceId
              name
              shipsInventory
            }
          }
        }
      }
      `;
        return this.bulkOperationQuery(query);
    }
}
exports.LocationsQuery = LocationsQuery;
//# sourceMappingURL=locations-query.js.map