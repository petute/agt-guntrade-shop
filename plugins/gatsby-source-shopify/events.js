"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsApi = void 0;
const rest_1 = require("./rest");
function eventsApi(options) {
    const shopifyFetch = (0, rest_1.makeShopifyFetch)(options);
    return {
        async fetchDestroyEventsSince(date) {
            let resp = await shopifyFetch(`/events.json?limit=250&verb=destroy&created_at_min=${date.toISOString()}`);
            const { events } = await resp.json();
            let gatherPaginatedEvents = true;
            while (gatherPaginatedEvents) {
                const paginationInfo = resp.headers.get(`link`);
                if (!paginationInfo) {
                    gatherPaginatedEvents = false;
                    break;
                }
                const pageLinks = paginationInfo.split(`,`).map((pageData) => {
                    const [, url, rel] = pageData.match(/<(.*)>; rel="(.*)"/) || [];
                    return {
                        url,
                        rel,
                    };
                });
                const nextPage = pageLinks.find(l => l.rel === `next`);
                if (nextPage) {
                    resp = await shopifyFetch(nextPage.url);
                    const { events: nextEvents } = await resp.json();
                    events.push(...nextEvents);
                }
                else {
                    gatherPaginatedEvents = false;
                    break;
                }
            }
            return events;
        },
    };
}
exports.eventsApi = eventsApi;
//# sourceMappingURL=events.js.map