"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultChangedPriceHandlingStrategy = void 0;
/**
 * @description
 * The default {@link ChangedPriceHandlingStrategy} will always use the latest price when
 * updating existing OrderLines.
 */
var DefaultChangedPriceHandlingStrategy = /** @class */ (function () {
    function DefaultChangedPriceHandlingStrategy() {
    }
    DefaultChangedPriceHandlingStrategy.prototype.handlePriceChange = function (ctx, current) {
        return current;
    };
    return DefaultChangedPriceHandlingStrategy;
}());
exports.DefaultChangedPriceHandlingStrategy = DefaultChangedPriceHandlingStrategy;
