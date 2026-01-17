"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseGuestIfExistingEmptyStrategy = void 0;
var order_merge_strategy_1 = require("./order-merge-strategy");
/**
 * @description
 * If the existing order is empty, then the guest order is used. Otherwise the existing order is used.
 *
 * @docsCategory orders
 * @docsPage Merge Strategies
 */
var UseGuestIfExistingEmptyStrategy = /** @class */ (function () {
    function UseGuestIfExistingEmptyStrategy() {
    }
    UseGuestIfExistingEmptyStrategy.prototype.merge = function (ctx, guestOrder, existingOrder) {
        return existingOrder.lines.length
            ? existingOrder.lines.map(order_merge_strategy_1.toMergedOrderLine)
            : guestOrder.lines.map(order_merge_strategy_1.toMergedOrderLine);
    };
    return UseGuestIfExistingEmptyStrategy;
}());
exports.UseGuestIfExistingEmptyStrategy = UseGuestIfExistingEmptyStrategy;
