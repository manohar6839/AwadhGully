"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMoneyStrategy = void 0;
/**
 * @description
 * A {@link MoneyStrategy} that stores monetary values as a `int` type in the database.
 * The storage configuration and rounding logic replicates the behaviour of Vendure pre-2.0.
 *
 * @docsCategory money
 * @since 2.0.0
 */
var DefaultMoneyStrategy = /** @class */ (function () {
    function DefaultMoneyStrategy() {
        this.moneyColumnOptions = {
            type: 'int',
        };
        this.precision = 2;
    }
    DefaultMoneyStrategy.prototype.round = function (value, quantity) {
        if (quantity === void 0) { quantity = 1; }
        return Math.round(value * quantity);
    };
    return DefaultMoneyStrategy;
}());
exports.DefaultMoneyStrategy = DefaultMoneyStrategy;
