"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOrderItemPriceCalculationStrategy = void 0;
/**
 * @description
 * The default {@link OrderItemPriceCalculationStrategy}, which simply passes through the price of
 * the ProductVariant without performing any calculations
 *
 * @docsCategory orders
 */
var DefaultOrderItemPriceCalculationStrategy = /** @class */ (function () {
    function DefaultOrderItemPriceCalculationStrategy() {
    }
    DefaultOrderItemPriceCalculationStrategy.prototype.calculateUnitPrice = function (ctx, productVariant) {
        return {
            price: productVariant.listPrice,
            priceIncludesTax: productVariant.listPriceIncludesTax,
        };
    };
    return DefaultOrderItemPriceCalculationStrategy;
}());
exports.DefaultOrderItemPriceCalculationStrategy = DefaultOrderItemPriceCalculationStrategy;
