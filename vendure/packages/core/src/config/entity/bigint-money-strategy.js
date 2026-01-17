"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntMoneyStrategy = void 0;
var vendure_logger_1 = require("../logger/vendure-logger");
/**
 * @description
 * A {@link MoneyStrategy} that stores monetary values as a `bigint` type in the database, which
 * allows values up to ~9 quadrillion to be stored (limited by JavaScript's `MAX_SAFE_INTEGER` limit).
 *
 * This strategy also slightly differs in the way rounding is performed, with rounding being done _after_
 * multiplying the unit price, rather than before (as is the case with the {@link DefaultMoneyStrategy}.
 *
 * @docsCategory money
 * @since 2.0.0
 */
var BigIntMoneyStrategy = /** @class */ (function () {
    function BigIntMoneyStrategy() {
        this.moneyColumnOptions = {
            type: 'bigint',
            transformer: {
                to: function (entityValue) {
                    return entityValue;
                },
                from: function (databaseValue) {
                    if (databaseValue == null) {
                        return databaseValue;
                    }
                    var intVal = Number.parseInt(databaseValue, 10);
                    if (!Number.isSafeInteger(intVal)) {
                        vendure_logger_1.Logger.warn("Monetary value ".concat(databaseValue, " is not a safe integer!"));
                    }
                    if (Number.isNaN(intVal)) {
                        vendure_logger_1.Logger.warn("Monetary value ".concat(databaseValue, " is not a number!"));
                    }
                    return intVal;
                },
            },
        };
        this.precision = 2;
    }
    BigIntMoneyStrategy.prototype.round = function (value, quantity) {
        if (quantity === void 0) { quantity = 1; }
        return Math.round(value * quantity);
    };
    return BigIntMoneyStrategy;
}());
exports.BigIntMoneyStrategy = BigIntMoneyStrategy;
