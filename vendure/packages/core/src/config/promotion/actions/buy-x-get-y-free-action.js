"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyXGetYFreeAction = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var buy_x_get_y_free_condition_1 = require("../conditions/buy-x-get-y-free-condition");
var promotion_action_1 = require("../promotion-action");
exports.buyXGetYFreeAction = new promotion_action_1.PromotionItemAction({
    code: 'buy_x_get_y_free',
    description: [
        {
            languageCode: generated_types_1.LanguageCode.en,
            value: 'Buy X products, get Y products free',
        },
    ],
    args: {},
    conditions: [buy_x_get_y_free_condition_1.buyXGetYFreeCondition],
    execute: function (ctx, orderLine, args, state) {
        var freeItemsPerLine = state.buy_x_get_y_free.freeItemsPerLine;
        var freeQuantity = freeItemsPerLine[orderLine.id];
        if (freeQuantity) {
            var unitPrice = ctx.channel.pricesIncludeTax ? orderLine.unitPriceWithTax : orderLine.unitPrice;
            return -unitPrice * (freeQuantity / orderLine.quantity);
        }
        return 0;
    },
});
