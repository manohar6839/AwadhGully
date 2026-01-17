"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStockAllocationStrategy = void 0;
/**
 * @description
 * Allocates stock when the Order transitions from `ArrangingPayment` to either
 * `PaymentAuthorized` or `PaymentSettled`.
 *
 * @docsCategory orders
 */
var DefaultStockAllocationStrategy = /** @class */ (function () {
    function DefaultStockAllocationStrategy() {
    }
    DefaultStockAllocationStrategy.prototype.shouldAllocateStock = function (ctx, fromState, toState, order) {
        return (fromState === 'ArrangingPayment' &&
            (toState === 'PaymentAuthorized' || toState === 'PaymentSettled'));
    };
    return DefaultStockAllocationStrategy;
}());
exports.DefaultStockAllocationStrategy = DefaultStockAllocationStrategy;
