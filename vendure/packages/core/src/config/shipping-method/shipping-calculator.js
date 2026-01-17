"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingCalculator = void 0;
var configurable_operation_1 = require("../../common/configurable-operation");
/**
 * @description
 * The ShippingCalculator is used by a {@link ShippingMethod} to calculate the price of shipping on a given {@link Order}.
 *
 * @example
 * ```ts
 * const flatRateCalculator = new ShippingCalculator({
 *   code: 'flat-rate-calculator',
 *   description: [{ languageCode: LanguageCode.en, value: 'Default Flat-Rate Shipping Calculator' }],
 *   args: {
 *     rate: {
 *       type: 'int',
 *       ui: { component: 'currency-form-input' },
 *     },
 *     taxRate: {
         type: 'int',
         ui: { component: 'number-form-input', suffix: '%' },
       },
 *   },
 *   calculate: (ctx, order, args) => {
 *     return {
 *       price: args.rate,
 *       taxRate: args.taxRate,
 *       priceIncludesTax: ctx.channel.pricesIncludeTax,
 *     };
 *   },
 * });
 * ```
 *
 * @docsCategory shipping
 * @docsPage ShippingCalculator
 */
var ShippingCalculator = /** @class */ (function (_super) {
    __extends(ShippingCalculator, _super);
    function ShippingCalculator(config) {
        var _this = _super.call(this, config) || this;
        _this.calculateFn = config.calculate;
        return _this;
    }
    /**
     * @description
     * Calculates the price of shipping for the given Order.
     *
     * @internal
     */
    ShippingCalculator.prototype.calculate = function (ctx, order, args, method) {
        return this.calculateFn(ctx, order, this.argsArrayToHash(args), method);
    };
    return ShippingCalculator;
}(configurable_operation_1.ConfigurableOperationDef));
exports.ShippingCalculator = ShippingCalculator;
