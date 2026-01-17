"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundMoney = roundMoney;
var config_helpers_1 = require("../config/config-helpers");
var moneyStrategy;
/**
 * @description
 * Rounds a monetary value according to the configured {@link MoneyStrategy}.
 *
 * @docsCategory money
 * @since 2.0.0
 */
function roundMoney(value, quantity) {
    if (quantity === void 0) { quantity = 1; }
    if (!moneyStrategy) {
        moneyStrategy = (0, config_helpers_1.getConfig)().entityOptions.moneyStrategy;
    }
    return moneyStrategy.round(value, quantity);
}
