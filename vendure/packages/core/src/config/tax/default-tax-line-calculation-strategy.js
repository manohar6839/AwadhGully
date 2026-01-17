"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTaxLineCalculationStrategy = void 0;
/**
 * @description
 * The default {@link TaxLineCalculationStrategy} which applies a single TaxLine to the OrderLine
 * based on the applicable {@link TaxRate}.
 *
 * @docsCategory tax
 */
var DefaultTaxLineCalculationStrategy = /** @class */ (function () {
    function DefaultTaxLineCalculationStrategy() {
    }
    DefaultTaxLineCalculationStrategy.prototype.calculate = function (args) {
        var orderLine = args.orderLine, applicableTaxRate = args.applicableTaxRate;
        return [applicableTaxRate.apply(orderLine.proratedUnitPrice)];
    };
    return DefaultTaxLineCalculationStrategy;
}());
exports.DefaultTaxLineCalculationStrategy = DefaultTaxLineCalculationStrategy;
