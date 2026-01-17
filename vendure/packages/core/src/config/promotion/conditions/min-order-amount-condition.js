"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minimumOrderAmount = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var promotion_condition_1 = require("../promotion-condition");
exports.minimumOrderAmount = new promotion_condition_1.PromotionCondition({
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'If order total is greater than { amount }' }],
    code: 'minimum_order_amount',
    args: {
        amount: {
            type: 'int',
            defaultValue: 100,
            ui: { component: 'currency-form-input' },
        },
        taxInclusive: { type: 'boolean', defaultValue: false },
    },
    check: function (ctx, order, args) {
        if (args.taxInclusive) {
            return order.subTotalWithTax >= args.amount;
        }
        else {
            return order.subTotal >= args.amount;
        }
    },
    priorityValue: 10,
});
