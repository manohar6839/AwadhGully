"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeShipping = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var promotion_action_1 = require("../promotion-action");
exports.freeShipping = new promotion_action_1.PromotionShippingAction({
    code: 'free_shipping',
    args: {},
    execute: function (ctx, shippingLine, order, args) {
        return ctx.channel.pricesIncludeTax ? -shippingLine.priceWithTax : -shippingLine.price;
    },
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Free shipping' }],
});
