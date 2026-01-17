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
exports.PromotionShippingAction = exports.PromotionOrderAction = exports.PromotionLineAction = exports.PromotionItemAction = exports.PromotionAction = void 0;
var pick_1 = require("@vendure/common/lib/pick");
var configurable_operation_1 = require("../../common/configurable-operation");
/**
 * @description
 * An abstract class which is extended by {@link PromotionItemAction}, {@link PromotionOrderAction},
 * and {@link PromotionShippingAction}.
 *
 * @docsCategory promotions
 * @docsPage promotion-action
 * @docsWeight 0
 */
var PromotionAction = /** @class */ (function (_super) {
    __extends(PromotionAction, _super);
    function PromotionAction(config) {
        var _this = _super.call(this, config) || this;
        _this.priorityValue = config.priorityValue || 0;
        _this.conditions = config.conditions;
        _this.onActivateFn = config.onActivate;
        _this.onDeactivateFn = config.onDeactivate;
        return _this;
    }
    /** @internal */
    PromotionAction.prototype.onActivate = function (ctx, order, args, promotion) {
        var _a;
        return (_a = this.onActivateFn) === null || _a === void 0 ? void 0 : _a.call(this, ctx, order, this.argsArrayToHash(args), promotion);
    };
    /** @internal */
    PromotionAction.prototype.onDeactivate = function (ctx, order, args, promotion) {
        var _a;
        return (_a = this.onDeactivateFn) === null || _a === void 0 ? void 0 : _a.call(this, ctx, order, this.argsArrayToHash(args), promotion);
    };
    return PromotionAction;
}(configurable_operation_1.ConfigurableOperationDef));
exports.PromotionAction = PromotionAction;
/**
 * @description
 * Represents a PromotionAction which applies to individual {@link OrderLine}s.
 *
 * @example
 * ```ts
 * // Applies a percentage discount to each OrderLine
 * const itemPercentageDiscount = new PromotionItemAction({
 *     code: 'item_percentage_discount',
 *     args: { discount: 'percentage' },
 *     execute(ctx, orderLine, args) {
 *         return -orderLine.unitPrice * (args.discount / 100);
 *     },
 *     description: 'Discount every item by { discount }%',
 * });
 * ```
 *
 * @docsCategory promotions
 * @docsPage promotion-action
 * @docsWeight 1
 */
var PromotionItemAction = /** @class */ (function (_super) {
    __extends(PromotionItemAction, _super);
    function PromotionItemAction(config) {
        var _this = _super.call(this, config) || this;
        _this.executeFn = config.execute;
        return _this;
    }
    /** @internal */
    PromotionItemAction.prototype.execute = function (ctx, orderLine, args, state, promotion) {
        var actionState = this.conditions
            ? (0, pick_1.pick)(state, this.conditions.map(function (c) { return c.code; }))
            : {};
        return this.executeFn(ctx, orderLine, this.argsArrayToHash(args), actionState, promotion);
    };
    return PromotionItemAction;
}(PromotionAction));
exports.PromotionItemAction = PromotionItemAction;
/**
 * @description
 * Represents a PromotionAction which applies to individual {@link OrderLine}s.
 * The difference from PromotionItemAction is that it applies regardless of the Quantity of the OrderLine.
 *
 * @example
 * ```ts
 * // Applies a percentage discount to each OrderLine
 * const linePercentageDiscount = new PromotionLineAction({
 *     code: 'line_percentage_discount',
 *     args: { discount: 'percentage' },
 *     execute(ctx, orderLine, args) {
 *         return -orderLine.linePrice * (args.discount / 100);
 *     },
 *     description: 'Discount every line by { discount }%',
 * });
 * ```
 *
 * @docsCategory promotions
 * @docsPage promotion-action
 */
var PromotionLineAction = /** @class */ (function (_super) {
    __extends(PromotionLineAction, _super);
    function PromotionLineAction(config) {
        var _this = _super.call(this, config) || this;
        _this.executeFn = config.execute;
        return _this;
    }
    /** @internal */
    PromotionLineAction.prototype.execute = function (ctx, orderLine, args, state, promotion) {
        var actionState = this.conditions
            ? (0, pick_1.pick)(state, this.conditions.map(function (c) { return c.code; }))
            : {};
        return this.executeFn(ctx, orderLine, this.argsArrayToHash(args), actionState, promotion);
    };
    return PromotionLineAction;
}(PromotionAction));
exports.PromotionLineAction = PromotionLineAction;
/**
 * @description
 * Represents a PromotionAction which applies to the {@link Order} as a whole.
 *
 * @example
 * ```ts
 * // Applies a percentage discount to the entire Order
 * const orderPercentageDiscount = new PromotionOrderAction({
 *     code: 'order_percentage_discount',
 *     args: { discount: 'percentage' },
 *     execute(ctx, order, args) {
 *         return -order.subTotal * (args.discount / 100);
 *     },
 *     description: 'Discount order by { discount }%',
 * });
 * ```
 *
 * @docsCategory promotions
 * @docsPage promotion-action
 * @docsWeight 2
 */
var PromotionOrderAction = /** @class */ (function (_super) {
    __extends(PromotionOrderAction, _super);
    function PromotionOrderAction(config) {
        var _this = _super.call(this, config) || this;
        _this.executeFn = config.execute;
        return _this;
    }
    /** @internal */
    PromotionOrderAction.prototype.execute = function (ctx, order, args, state, promotion) {
        var actionState = this.conditions
            ? (0, pick_1.pick)(state, this.conditions.map(function (c) { return c.code; }))
            : {};
        return this.executeFn(ctx, order, this.argsArrayToHash(args), actionState, promotion);
    };
    return PromotionOrderAction;
}(PromotionAction));
exports.PromotionOrderAction = PromotionOrderAction;
/**
 * @description
 * Represents a PromotionAction which applies to the shipping cost of an Order.
 *
 * @docsCategory promotions
 * @docsPage promotion-action
 * @docsWeight 3
 */
var PromotionShippingAction = /** @class */ (function (_super) {
    __extends(PromotionShippingAction, _super);
    function PromotionShippingAction(config) {
        var _this = _super.call(this, config) || this;
        _this.executeFn = config.execute;
        return _this;
    }
    /** @internal */
    PromotionShippingAction.prototype.execute = function (ctx, shippingLine, order, args, state, promotion) {
        var actionState = this.conditions
            ? (0, pick_1.pick)(state, this.conditions.map(function (c) { return c.code; }))
            : {};
        return this.executeFn(ctx, shippingLine, order, this.argsArrayToHash(args), actionState, promotion);
    };
    return PromotionShippingAction;
}(PromotionAction));
exports.PromotionShippingAction = PromotionShippingAction;
