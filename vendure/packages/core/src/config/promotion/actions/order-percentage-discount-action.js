"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPercentageDiscount = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var promotion_action_1 = require("../promotion-action");
exports.orderPercentageDiscount = new promotion_action_1.PromotionOrderAction({
    code: 'order_percentage_discount',
    args: {
        discount: {
            type: 'float',
            ui: {
                component: 'number-form-input',
                suffix: '%',
                min: 0,
            },
        },
    },
    execute: function (ctx, order, args) {
        var orderTotal = ctx.channel.pricesIncludeTax ? order.subTotalWithTax : order.subTotal;
        return -orderTotal * (args.discount / 100);
    },
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Discount order by { discount }%' }],
});
