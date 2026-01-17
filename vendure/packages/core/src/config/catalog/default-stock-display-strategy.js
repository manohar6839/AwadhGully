"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStockDisplayStrategy = void 0;
/**
 * @description
 * Displays the `ProductVariant.stockLevel` as either `'IN_STOCK'`, `'OUT_OF_STOCK'` or `'LOW_STOCK'`.
 * Low stock is defined as a saleable stock level less than or equal to the `lowStockLevel` as passed in
 * to the constructor (defaults to `2`).
 *
 * @docsCategory products & stock
 */
var DefaultStockDisplayStrategy = /** @class */ (function () {
    function DefaultStockDisplayStrategy(lowStockLevel) {
        if (lowStockLevel === void 0) { lowStockLevel = 2; }
        this.lowStockLevel = lowStockLevel;
    }
    DefaultStockDisplayStrategy.prototype.getStockLevel = function (ctx, productVariant, saleableStockLevel) {
        return saleableStockLevel < 1
            ? 'OUT_OF_STOCK'
            : saleableStockLevel <= this.lowStockLevel
                ? 'LOW_STOCK'
                : 'IN_STOCK';
    };
    return DefaultStockDisplayStrategy;
}());
exports.DefaultStockDisplayStrategy = DefaultStockDisplayStrategy;
