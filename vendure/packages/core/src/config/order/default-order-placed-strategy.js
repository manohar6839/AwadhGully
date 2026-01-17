"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOrderPlacedStrategy = void 0;
/**
 * @description
 * The default {@link OrderPlacedStrategy}. The order is set as "placed" when it transitions from
 * 'ArrangingPayment' to either 'PaymentAuthorized' or 'PaymentSettled'.
 *
 * @docsCategory orders
 */
var DefaultOrderPlacedStrategy = /** @class */ (function () {
    function DefaultOrderPlacedStrategy() {
    }
    DefaultOrderPlacedStrategy.prototype.shouldSetAsPlaced = function (ctx, fromState, toState, order) {
        return fromState === 'ArrangingPayment' &&
            (toState === 'PaymentAuthorized' || toState === 'PaymentSettled')
            ? true
            : false;
    };
    return DefaultOrderPlacedStrategy;
}());
exports.DefaultOrderPlacedStrategy = DefaultOrderPlacedStrategy;
