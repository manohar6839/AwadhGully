"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTaxZoneStrategy = void 0;
/**
 * @description
 * A default method of determining Zone for tax calculations. The strategy simply returns the default
 * tax zone of the Channel. In many cases you actually want to base the tax zone
 * on the shipping or billing address of the Order, in which case you would use the
 * {@link AddressBasedTaxZoneStrategy}.
 *
 * @docsCategory tax
 */
var DefaultTaxZoneStrategy = /** @class */ (function () {
    function DefaultTaxZoneStrategy() {
    }
    DefaultTaxZoneStrategy.prototype.determineTaxZone = function (ctx, zones, channel, order) {
        return channel.defaultTaxZone;
    };
    return DefaultTaxZoneStrategy;
}());
exports.DefaultTaxZoneStrategy = DefaultTaxZoneStrategy;
