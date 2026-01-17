"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBasedTaxZoneStrategy = void 0;
var vendure_logger_1 = require("../logger/vendure-logger");
var loggerCtx = 'AddressBasedTaxZoneStrategy';
/**
 * @description
 * Address based {@link TaxZoneStrategy} which tries to find the applicable {@link Zone} based on the
 * country of the shipping address of the Order.
 * This is useful for shops that do cross-border B2C orders and use the One-Stop-Shop (OSS) VAT scheme.
 *
 * Returns the default {@link Channel}'s default tax zone if no applicable zone is found.
 *
 * :::info
 *
 * This is configured via `taxOptions.taxZoneStrategy = new AddressBasedTaxZoneStrategy()` in
 * your VendureConfig.
 *
 * :::
 *
 * @example
 * ```ts
 * import { VendureConfig, AddressBasedTaxZoneStrategy } from '\@vendure/core';
 *
 * export const config: VendureConfig = {
 *   // other options...
 *   taxOptions: {
 *     // highlight-next-line
 *     taxZoneStrategy: new AddressBasedTaxZoneStrategy(),
 *   },
 * };
 * ```
 *
 * @since 3.1.0
 * @docsCategory tax
 */
var AddressBasedTaxZoneStrategy = /** @class */ (function () {
    function AddressBasedTaxZoneStrategy() {
    }
    AddressBasedTaxZoneStrategy.prototype.determineTaxZone = function (ctx, zones, channel, order) {
        var _a;
        var countryCode = (_a = order === null || order === void 0 ? void 0 : order.shippingAddress) === null || _a === void 0 ? void 0 : _a.countryCode;
        if (order && countryCode) {
            var zone = zones.find(function (z) { var _a; return (_a = z.members) === null || _a === void 0 ? void 0 : _a.find(function (member) { return member.code === countryCode; }); });
            if (zone) {
                return zone;
            }
            vendure_logger_1.Logger.debug("No tax zone found for country ".concat(countryCode, ". Returning default ").concat(channel.defaultTaxZone.name, " for order ").concat(order.code), loggerCtx);
        }
        return channel.defaultTaxZone;
    };
    return AddressBasedTaxZoneStrategy;
}());
exports.AddressBasedTaxZoneStrategy = AddressBasedTaxZoneStrategy;
