"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultShippingEligibilityChecker = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shipping_eligibility_checker_1 = require("./shipping-eligibility-checker");
exports.defaultShippingEligibilityChecker = new shipping_eligibility_checker_1.ShippingEligibilityChecker({
    code: 'default-shipping-eligibility-checker',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Default Shipping Eligibility Checker' }],
    args: {
        orderMinimum: {
            type: 'int',
            defaultValue: 0,
            ui: { component: 'currency-form-input' },
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Minimum order value' }],
            description: [
                {
                    languageCode: generated_types_1.LanguageCode.en,
                    value: 'Order is eligible only if its total is greater or equal to this value',
                },
            ],
        },
    },
    check: function (ctx, order, args) {
        return order.subTotalWithTax >= args.orderMinimum;
    },
});
