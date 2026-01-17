"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseGuestStrategy = void 0;
var order_merge_strategy_1 = require("./order-merge-strategy");
/**
 * @description
 * Any existing order is discarded and the guest order is set as the active order.
 *
 * @docsCategory orders
 * @docsPage Merge Strategies
 */
var UseGuestStrategy = /** @class */ (function () {
    function UseGuestStrategy() {
    }
    UseGuestStrategy.prototype.merge = function (ctx, guestOrder, existingOrder) {
        return guestOrder.lines.map(order_merge_strategy_1.toMergedOrderLine);
    };
    return UseGuestStrategy;
}());
exports.UseGuestStrategy = UseGuestStrategy;
