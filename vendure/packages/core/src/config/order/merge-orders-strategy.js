"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeOrdersStrategy = void 0;
var order_merge_strategy_1 = require("./order-merge-strategy");
/**
 * @description
 * Merges both Orders. If the guest order contains items which are already in the
 * existing Order, the guest Order quantity will replace that of the existing Order.
 *
 * @docsCategory orders
 * @docsPage Merge Strategies
 */
var MergeOrdersStrategy = /** @class */ (function () {
    function MergeOrdersStrategy() {
    }
    MergeOrdersStrategy.prototype.merge = function (ctx, guestOrder, existingOrder) {
        var mergedLines = existingOrder.lines.map(order_merge_strategy_1.toMergedOrderLine);
        var guestLines = guestOrder.lines.slice();
        var _loop_1 = function (guestLine) {
            var existingLine = this_1.findCorrespondingLine(existingOrder, guestLine);
            if (!existingLine) {
                mergedLines.unshift((0, order_merge_strategy_1.toMergedOrderLine)(guestLine));
            }
            else {
                var matchingMergedLine = mergedLines.find(function (l) { return l.orderLineId === existingLine.id; });
                if (matchingMergedLine) {
                    matchingMergedLine.quantity = guestLine.quantity;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = guestLines.reverse(); _i < _a.length; _i++) {
            var guestLine = _a[_i];
            _loop_1(guestLine);
        }
        return mergedLines;
    };
    MergeOrdersStrategy.prototype.findCorrespondingLine = function (existingOrder, guestLine) {
        return existingOrder.lines.find(function (line) {
            return line.productVariant.id === guestLine.productVariant.id &&
                JSON.stringify(line.customFields) === JSON.stringify(guestLine.customFields);
        });
    };
    return MergeOrdersStrategy;
}());
exports.MergeOrdersStrategy = MergeOrdersStrategy;
