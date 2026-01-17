"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderLineFixedDiscount = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var promotion_action_1 = require("../promotion-action");
exports.orderLineFixedDiscount = new promotion_action_1.PromotionLineAction({
    code: 'order_line_fixed_discount',
    args: {
        discount: {
            type: 'int',
            ui: {
                component: 'currency-form-input',
            },
        },
    },
    execute: function (ctx, orderLine, args) {
        return -args.discount;
    },
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Discount orderLine by fixed amount' }],
});
