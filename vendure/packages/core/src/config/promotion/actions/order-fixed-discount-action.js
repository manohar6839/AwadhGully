"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderFixedDiscount = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var promotion_action_1 = require("../promotion-action");
exports.orderFixedDiscount = new promotion_action_1.PromotionOrderAction({
    code: 'order_fixed_discount',
    args: {
        discount: {
            type: 'int',
            ui: {
                component: 'currency-form-input',
            },
        },
    },
    execute: function (ctx, order, args) {
        var upperBound = ctx.channel.pricesIncludeTax ? order.subTotalWithTax : order.subTotal;
        return -Math.min(args.discount, upperBound);
    },
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Discount order by fixed amount' }],
});
