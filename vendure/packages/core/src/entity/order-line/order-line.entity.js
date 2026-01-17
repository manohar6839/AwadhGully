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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLine = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var round_money_1 = require("../../common/round-money");
var tax_utils_1 = require("../../common/tax-utils");
var asset_entity_1 = require("../asset/asset.entity");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var money_decorator_1 = require("../money.decorator");
var order_entity_1 = require("../order/order.entity");
var order_line_reference_entity_1 = require("../order-line-reference/order-line-reference.entity");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var shipping_line_entity_1 = require("../shipping-line/shipping-line.entity");
var allocation_entity_1 = require("../stock-movement/allocation.entity");
var cancellation_entity_1 = require("../stock-movement/cancellation.entity");
var sale_entity_1 = require("../stock-movement/sale.entity");
var tax_category_entity_1 = require("../tax-category/tax-category.entity");
/**
 * @description
 * A single line on an {@link Order} which contains information about the {@link ProductVariant} and
 * quantity ordered, as well as the price and tax information.
 *
 * @docsCategory entities
 */
var OrderLine = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _instanceExtraInitializers = [];
    var _sellerChannel_decorators;
    var _sellerChannel_initializers = [];
    var _sellerChannel_extraInitializers = [];
    var _sellerChannelId_decorators;
    var _sellerChannelId_initializers = [];
    var _sellerChannelId_extraInitializers = [];
    var _shippingLine_decorators;
    var _shippingLine_initializers = [];
    var _shippingLine_extraInitializers = [];
    var _shippingLineId_decorators;
    var _shippingLineId_initializers = [];
    var _shippingLineId_extraInitializers = [];
    var _productVariant_decorators;
    var _productVariant_initializers = [];
    var _productVariant_extraInitializers = [];
    var _productVariantId_decorators;
    var _productVariantId_initializers = [];
    var _productVariantId_extraInitializers = [];
    var _taxCategory_decorators;
    var _taxCategory_initializers = [];
    var _taxCategory_extraInitializers = [];
    var _taxCategoryId_decorators;
    var _taxCategoryId_initializers = [];
    var _taxCategoryId_extraInitializers = [];
    var _featuredAsset_decorators;
    var _featuredAsset_initializers = [];
    var _featuredAsset_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    var _linesReferences_decorators;
    var _linesReferences_initializers = [];
    var _linesReferences_extraInitializers = [];
    var _sales_decorators;
    var _sales_initializers = [];
    var _sales_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _orderPlacedQuantity_decorators;
    var _orderPlacedQuantity_initializers = [];
    var _orderPlacedQuantity_extraInitializers = [];
    var _initialListPrice_decorators;
    var _initialListPrice_initializers = [];
    var _initialListPrice_extraInitializers = [];
    var _listPrice_decorators;
    var _listPrice_initializers = [];
    var _listPrice_extraInitializers = [];
    var _listPriceIncludesTax_decorators;
    var _listPriceIncludesTax_initializers = [];
    var _listPriceIncludesTax_extraInitializers = [];
    var _adjustments_decorators;
    var _adjustments_initializers = [];
    var _adjustments_extraInitializers = [];
    var _taxLines_decorators;
    var _taxLines_initializers = [];
    var _taxLines_extraInitializers = [];
    var _cancellations_decorators;
    var _cancellations_initializers = [];
    var _cancellations_extraInitializers = [];
    var _allocations_decorators;
    var _allocations_initializers = [];
    var _allocations_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _get_unitPrice_decorators;
    var _get_unitPriceWithTax_decorators;
    var _get_unitPriceChangeSinceAdded_decorators;
    var _get_unitPriceWithTaxChangeSinceAdded_decorators;
    var _get_discountedUnitPrice_decorators;
    var _get_discountedUnitPriceWithTax_decorators;
    var _get_proratedUnitPrice_decorators;
    var _get_proratedUnitPriceWithTax_decorators;
    var _get_unitTax_decorators;
    var _get_proratedUnitTax_decorators;
    var _get_taxRate_decorators;
    var _get_linePrice_decorators;
    var _get_linePriceWithTax_decorators;
    var _get_discountedLinePrice_decorators;
    var _get_discountedLinePriceWithTax_decorators;
    var _get_discounts_decorators;
    var _get_lineTax_decorators;
    var _get_proratedLinePrice_decorators;
    var _get_proratedLinePriceWithTax_decorators;
    var _get_proratedLineTax_decorators;
    var OrderLine = _classThis = /** @class */ (function (_super) {
        __extends(OrderLine_1, _super);
        function OrderLine_1(input) {
            var _this = _super.call(this, input) || this;
            /**
             * @description
             * The {@link Channel} of the {@link Seller} for a multivendor setup.
             */
            _this.sellerChannel = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _sellerChannel_initializers, void 0));
            _this.sellerChannelId = (__runInitializers(_this, _sellerChannel_extraInitializers), __runInitializers(_this, _sellerChannelId_initializers, void 0));
            /**
             * @description
             * The {@link ShippingLine} to which this line has been assigned.
             * This is determined by the configured {@link ShippingLineAssignmentStrategy}.
             */
            _this.shippingLine = (__runInitializers(_this, _sellerChannelId_extraInitializers), __runInitializers(_this, _shippingLine_initializers, void 0));
            _this.shippingLineId = (__runInitializers(_this, _shippingLine_extraInitializers), __runInitializers(_this, _shippingLineId_initializers, void 0));
            /**
             * @description
             * The {@link ProductVariant} which is being ordered.
             */
            _this.productVariant = (__runInitializers(_this, _shippingLineId_extraInitializers), __runInitializers(_this, _productVariant_initializers, void 0));
            _this.productVariantId = (__runInitializers(_this, _productVariant_extraInitializers), __runInitializers(_this, _productVariantId_initializers, void 0));
            _this.taxCategory = (__runInitializers(_this, _productVariantId_extraInitializers), __runInitializers(_this, _taxCategory_initializers, void 0));
            _this.taxCategoryId = (__runInitializers(_this, _taxCategory_extraInitializers), __runInitializers(_this, _taxCategoryId_initializers, void 0));
            _this.featuredAsset = (__runInitializers(_this, _taxCategoryId_extraInitializers), __runInitializers(_this, _featuredAsset_initializers, void 0));
            _this.order = (__runInitializers(_this, _featuredAsset_extraInitializers), __runInitializers(_this, _order_initializers, void 0));
            _this.linesReferences = (__runInitializers(_this, _order_extraInitializers), __runInitializers(_this, _linesReferences_initializers, void 0));
            _this.sales = (__runInitializers(_this, _linesReferences_extraInitializers), __runInitializers(_this, _sales_initializers, void 0));
            _this.quantity = (__runInitializers(_this, _sales_extraInitializers), __runInitializers(_this, _quantity_initializers, void 0));
            /**
             * @description
             * The quantity of this OrderLine at the time the order was placed (as per the {@link OrderPlacedStrategy}).
             */
            _this.orderPlacedQuantity = (__runInitializers(_this, _quantity_extraInitializers), __runInitializers(_this, _orderPlacedQuantity_initializers, void 0));
            /**
             * @description
             * The price as calculated when the OrderLine was first added to the Order. Usually will be identical to the
             * `listPrice`, except when the ProductVariant price has changed in the meantime and a re-calculation of
             * the Order has been performed.
             */
            _this.initialListPrice = (__runInitializers(_this, _orderPlacedQuantity_extraInitializers), __runInitializers(_this, _initialListPrice_initializers, void 0));
            /**
             * @description
             * This is the price as listed by the ProductVariant (and possibly modified by the {@link OrderItemPriceCalculationStrategy}),
             * which, depending on the current Channel, may or may not include tax.
             */
            _this.listPrice = (__runInitializers(_this, _initialListPrice_extraInitializers), __runInitializers(_this, _listPrice_initializers, void 0));
            /**
             * @description
             * Whether the listPrice includes tax, which depends on the settings of the current Channel.
             */
            _this.listPriceIncludesTax = (__runInitializers(_this, _listPrice_extraInitializers), __runInitializers(_this, _listPriceIncludesTax_initializers, void 0));
            _this.adjustments = (__runInitializers(_this, _listPriceIncludesTax_extraInitializers), __runInitializers(_this, _adjustments_initializers, void 0));
            _this.taxLines = (__runInitializers(_this, _adjustments_extraInitializers), __runInitializers(_this, _taxLines_initializers, void 0));
            _this.cancellations = (__runInitializers(_this, _taxLines_extraInitializers), __runInitializers(_this, _cancellations_initializers, void 0));
            _this.allocations = (__runInitializers(_this, _cancellations_extraInitializers), __runInitializers(_this, _allocations_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _allocations_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        Object.defineProperty(OrderLine_1.prototype, "unitPrice", {
            /**
             * @description
             * The price of a single unit, excluding tax and discounts.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._unitPrice());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "unitPriceWithTax", {
            /**
             * @description
             * The price of a single unit, including tax but excluding discounts.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._unitPriceWithTax());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "unitPriceChangeSinceAdded", {
            /**
             * @description
             * Non-zero if the `unitPrice` has changed since it was initially added to Order.
             */
            get: function () {
                var _a = this, initialListPrice = _a.initialListPrice, listPriceIncludesTax = _a.listPriceIncludesTax;
                var initialPrice = listPriceIncludesTax
                    ? (0, tax_utils_1.netPriceOf)(initialListPrice, this.taxRate)
                    : initialListPrice;
                return (0, round_money_1.roundMoney)(this._unitPrice() - initialPrice);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "unitPriceWithTaxChangeSinceAdded", {
            /**
             * @description
             * Non-zero if the `unitPriceWithTax` has changed since it was initially added to Order.
             */
            get: function () {
                var _a = this, initialListPrice = _a.initialListPrice, listPriceIncludesTax = _a.listPriceIncludesTax;
                var initialPriceWithTax = listPriceIncludesTax
                    ? initialListPrice
                    : (0, tax_utils_1.grossPriceOf)(initialListPrice, this.taxRate);
                return (0, round_money_1.roundMoney)(this._unitPriceWithTax() - initialPriceWithTax);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "discountedUnitPrice", {
            /**
             * @description
             * The price of a single unit including discounts, excluding tax.
             *
             * If Order-level discounts have been applied, this will not be the
             * actual taxable unit price (see `proratedUnitPrice`), but is generally the
             * correct price to display to customers to avoid confusion
             * about the internal handling of distributed Order-level discounts.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._discountedUnitPrice());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "discountedUnitPriceWithTax", {
            /**
             * @description
             * The price of a single unit including discounts and tax
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._discountedUnitPriceWithTax());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "proratedUnitPrice", {
            /**
             * @description
             * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
             * Order-level discounts. This value is the true economic value of a single unit in this OrderLine, and is used in tax
             * and refund calculations.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._proratedUnitPrice());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "proratedUnitPriceWithTax", {
            /**
             * @description
             * The `proratedUnitPrice` including tax.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._proratedUnitPriceWithTax());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "unitTax", {
            get: function () {
                return this.unitPriceWithTax - this.unitPrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "proratedUnitTax", {
            get: function () {
                return this.proratedUnitPriceWithTax - this.proratedUnitPrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "taxRate", {
            get: function () {
                return (0, shared_utils_1.summate)(this.taxLines, 'taxRate');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "linePrice", {
            /**
             * @description
             * The total price of the line excluding tax and discounts.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._unitPrice(), this.quantity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "linePriceWithTax", {
            /**
             * @description
             * The total price of the line including tax but excluding discounts.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._unitPriceWithTax(), this.quantity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "discountedLinePrice", {
            /**
             * @description
             * The price of the line including discounts, excluding tax.
             */
            get: function () {
                // return roundMoney(this.linePrice + this.getLineAdjustmentsTotal(false, AdjustmentType.PROMOTION));
                return (0, round_money_1.roundMoney)(this._discountedUnitPrice(), this.quantity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "discountedLinePriceWithTax", {
            /**
             * @description
             * The price of the line including discounts and tax.
             */
            get: function () {
                return (0, round_money_1.roundMoney)(this._discountedUnitPriceWithTax(), this.quantity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "discounts", {
            get: function () {
                var priceIncludesTax = this.listPriceIncludesTax;
                // Group discounts together, so that it does not list a new
                // discount row for each item in the line
                var groupedDiscounts = new Map();
                for (var _i = 0, _a = this.adjustments; _i < _a.length; _i++) {
                    var adjustment = _a[_i];
                    var discountGroup = groupedDiscounts.get(adjustment.adjustmentSource);
                    var unitAdjustmentAmount = (adjustment.amount / Math.max(this.orderPlacedQuantity, this.quantity)) * this.quantity;
                    var amount = priceIncludesTax
                        ? (0, tax_utils_1.netPriceOf)(unitAdjustmentAmount, this.taxRate)
                        : unitAdjustmentAmount;
                    var amountWithTax = priceIncludesTax
                        ? unitAdjustmentAmount
                        : (0, tax_utils_1.grossPriceOf)(unitAdjustmentAmount, this.taxRate);
                    if (discountGroup) {
                        discountGroup.amount += amount;
                        discountGroup.amountWithTax += amountWithTax;
                    }
                    else {
                        groupedDiscounts.set(adjustment.adjustmentSource, __assign(__assign({}, adjustment), { amount: (0, round_money_1.roundMoney)(amount), amountWithTax: (0, round_money_1.roundMoney)(amountWithTax) }));
                    }
                }
                return __spreadArray([], groupedDiscounts.values(), true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "lineTax", {
            /**
             * @description
             * The total tax on this line.
             */
            get: function () {
                return this.linePriceWithTax - this.linePrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "proratedLinePrice", {
            /**
             * @description
             * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
             * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
             * and refund calculations.
             */
            get: function () {
                // return roundMoney(this.linePrice + this.getLineAdjustmentsTotal(false));
                return (0, round_money_1.roundMoney)(this._proratedUnitPrice(), this.quantity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "proratedLinePriceWithTax", {
            /**
             * @description
             * The `proratedLinePrice` including tax.
             */
            get: function () {
                // return roundMoney(this.linePriceWithTax + this.getLineAdjustmentsTotal(true));
                return (0, round_money_1.roundMoney)(this._proratedUnitPriceWithTax(), this.quantity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrderLine_1.prototype, "proratedLineTax", {
            get: function () {
                return this.proratedLinePriceWithTax - this.proratedLinePrice;
            },
            enumerable: false,
            configurable: true
        });
        OrderLine_1.prototype.addAdjustment = function (adjustment) {
            // We should not allow adding adjustments which would
            // result in a negative unit price
            var maxDiscount = (this.listPriceIncludesTax ? this.proratedLinePriceWithTax : this.proratedLinePrice) * -1;
            var limitedAdjustment = __assign(__assign({}, adjustment), { amount: Math.max(maxDiscount, adjustment.amount) });
            if (limitedAdjustment.amount !== 0) {
                this.adjustments = this.adjustments.concat(limitedAdjustment);
            }
        };
        /**
         * Clears Adjustments from all OrderItems of the given type. If no type
         * is specified, then all adjustments are removed.
         */
        OrderLine_1.prototype.clearAdjustments = function (type) {
            if (!type) {
                this.adjustments = [];
            }
            else {
                this.adjustments = this.adjustments ? this.adjustments.filter(function (a) { return a.type !== type; }) : [];
            }
        };
        OrderLine_1.prototype._unitPrice = function () {
            return this.listPriceIncludesTax ? (0, tax_utils_1.netPriceOf)(this.listPrice, this.taxRate) : this.listPrice;
        };
        OrderLine_1.prototype._unitPriceWithTax = function () {
            return this.listPriceIncludesTax ? this.listPrice : (0, tax_utils_1.grossPriceOf)(this.listPrice, this.taxRate);
        };
        OrderLine_1.prototype._discountedUnitPrice = function () {
            var result = this.listPrice + this.getUnitAdjustmentsTotal(generated_types_1.AdjustmentType.PROMOTION);
            return this.listPriceIncludesTax ? (0, tax_utils_1.netPriceOf)(result, this.taxRate) : result;
        };
        OrderLine_1.prototype._discountedUnitPriceWithTax = function () {
            var result = this.listPrice + this.getUnitAdjustmentsTotal(generated_types_1.AdjustmentType.PROMOTION);
            return this.listPriceIncludesTax ? result : (0, tax_utils_1.grossPriceOf)(result, this.taxRate);
        };
        /**
         * @description
         * Calculates the prorated unit price, excluding tax. This function performs no
         * rounding, so before being exposed publicly via the GraphQL API, the returned value
         * needs to be rounded to ensure it is an integer.
         */
        OrderLine_1.prototype._proratedUnitPrice = function () {
            var result = this.listPrice + this.getUnitAdjustmentsTotal();
            return this.listPriceIncludesTax ? (0, tax_utils_1.netPriceOf)(result, this.taxRate) : result;
        };
        /**
         * @description
         * Calculates the prorated unit price, including tax. This function performs no
         * rounding, so before being exposed publicly via the GraphQL API, the returned value
         * needs to be rounded to ensure it is an integer.
         */
        OrderLine_1.prototype._proratedUnitPriceWithTax = function () {
            var result = this.listPrice + this.getUnitAdjustmentsTotal();
            return this.listPriceIncludesTax ? result : (0, tax_utils_1.grossPriceOf)(result, this.taxRate);
        };
        /**
         * @description
         * The total of all price adjustments. Will typically be a negative number due to discounts.
         */
        OrderLine_1.prototype.getUnitAdjustmentsTotal = function (type) {
            var _this = this;
            if (!this.adjustments || this.quantity === 0) {
                return 0;
            }
            return this.adjustments
                .filter(function (adjustment) { return (type ? adjustment.type === type : true); })
                .map(function (adjustment) { return adjustment.amount / Math.max(_this.orderPlacedQuantity, _this.quantity); })
                .reduce(function (total, a) { return total + a; }, 0);
        };
        /**
         * @description
         * The total of all price adjustments. Will typically be a negative number due to discounts.
         */
        OrderLine_1.prototype.getLineAdjustmentsTotal = function (withTax, type) {
            if (!this.adjustments || this.quantity === 0) {
                return 0;
            }
            var sum = this.adjustments
                .filter(function (adjustment) { return (type ? adjustment.type === type : true); })
                .map(function (adjustment) { return adjustment.amount; })
                .reduce(function (total, a) { return total + a; }, 0);
            var adjustedForQuantityChanges = sum * (this.quantity / Math.max(this.orderPlacedQuantity, this.quantity));
            if (withTax) {
                return this.listPriceIncludesTax
                    ? adjustedForQuantityChanges
                    : (0, tax_utils_1.grossPriceOf)(adjustedForQuantityChanges, this.taxRate);
            }
            else {
                return this.listPriceIncludesTax
                    ? (0, tax_utils_1.netPriceOf)(adjustedForQuantityChanges, this.taxRate)
                    : adjustedForQuantityChanges;
            }
        };
        return OrderLine_1;
    }(_classSuper));
    __setFunctionName(_classThis, "OrderLine");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _sellerChannel_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return channel_entity_1.Channel; }, { nullable: true, onDelete: 'SET NULL' })];
        _sellerChannelId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _shippingLine_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return shipping_line_entity_1.ShippingLine; }, function (shippingLine) { return shippingLine.orderLines; }, {
                nullable: true,
                onDelete: 'SET NULL',
            })];
        _shippingLineId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _productVariant_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return product_variant_entity_1.ProductVariant; }, function (productVariant) { return productVariant.lines; }, { onDelete: 'CASCADE' })];
        _productVariantId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        _taxCategory_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return tax_category_entity_1.TaxCategory; })];
        _taxCategoryId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _featuredAsset_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return asset_entity_1.Asset; }, function (asset) { return asset.featuredInVariants; }, { onDelete: 'SET NULL' })];
        _order_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_entity_1.Order; }, function (order) { return order.lines; }, { onDelete: 'CASCADE' })];
        _linesReferences_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_line_reference_entity_1.OrderLineReference; }, function (lineRef) { return lineRef.orderLine; })];
        _sales_decorators = [(0, typeorm_1.OneToMany)(function (type) { return sale_entity_1.Sale; }, function (sale) { return sale.orderLine; })];
        _quantity_decorators = [(0, typeorm_1.Column)()];
        _orderPlacedQuantity_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _initialListPrice_decorators = [(0, money_decorator_1.Money)({ nullable: true })];
        _listPrice_decorators = [(0, money_decorator_1.Money)()];
        _listPriceIncludesTax_decorators = [(0, typeorm_1.Column)()];
        _adjustments_decorators = [(0, typeorm_1.Column)('simple-json')];
        _taxLines_decorators = [(0, typeorm_1.Column)('simple-json')];
        _cancellations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return cancellation_entity_1.Cancellation; }, function (cancellation) { return cancellation.orderLine; })];
        _allocations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return allocation_entity_1.Allocation; }, function (allocation) { return allocation.orderLine; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomOrderLineFields; })];
        _get_unitPrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_unitPriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_unitPriceChangeSinceAdded_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_unitPriceWithTaxChangeSinceAdded_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discountedUnitPrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discountedUnitPriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_proratedUnitPrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_proratedUnitPriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_unitTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_proratedUnitTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_taxRate_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_linePrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_linePriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discountedLinePrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discountedLinePriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discounts_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_lineTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_proratedLinePrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_proratedLinePriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_proratedLineTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        __esDecorate(_classThis, null, _get_unitPrice_decorators, { kind: "getter", name: "unitPrice", static: false, private: false, access: { has: function (obj) { return "unitPrice" in obj; }, get: function (obj) { return obj.unitPrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_unitPriceWithTax_decorators, { kind: "getter", name: "unitPriceWithTax", static: false, private: false, access: { has: function (obj) { return "unitPriceWithTax" in obj; }, get: function (obj) { return obj.unitPriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_unitPriceChangeSinceAdded_decorators, { kind: "getter", name: "unitPriceChangeSinceAdded", static: false, private: false, access: { has: function (obj) { return "unitPriceChangeSinceAdded" in obj; }, get: function (obj) { return obj.unitPriceChangeSinceAdded; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_unitPriceWithTaxChangeSinceAdded_decorators, { kind: "getter", name: "unitPriceWithTaxChangeSinceAdded", static: false, private: false, access: { has: function (obj) { return "unitPriceWithTaxChangeSinceAdded" in obj; }, get: function (obj) { return obj.unitPriceWithTaxChangeSinceAdded; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discountedUnitPrice_decorators, { kind: "getter", name: "discountedUnitPrice", static: false, private: false, access: { has: function (obj) { return "discountedUnitPrice" in obj; }, get: function (obj) { return obj.discountedUnitPrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discountedUnitPriceWithTax_decorators, { kind: "getter", name: "discountedUnitPriceWithTax", static: false, private: false, access: { has: function (obj) { return "discountedUnitPriceWithTax" in obj; }, get: function (obj) { return obj.discountedUnitPriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_proratedUnitPrice_decorators, { kind: "getter", name: "proratedUnitPrice", static: false, private: false, access: { has: function (obj) { return "proratedUnitPrice" in obj; }, get: function (obj) { return obj.proratedUnitPrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_proratedUnitPriceWithTax_decorators, { kind: "getter", name: "proratedUnitPriceWithTax", static: false, private: false, access: { has: function (obj) { return "proratedUnitPriceWithTax" in obj; }, get: function (obj) { return obj.proratedUnitPriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_unitTax_decorators, { kind: "getter", name: "unitTax", static: false, private: false, access: { has: function (obj) { return "unitTax" in obj; }, get: function (obj) { return obj.unitTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_proratedUnitTax_decorators, { kind: "getter", name: "proratedUnitTax", static: false, private: false, access: { has: function (obj) { return "proratedUnitTax" in obj; }, get: function (obj) { return obj.proratedUnitTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_taxRate_decorators, { kind: "getter", name: "taxRate", static: false, private: false, access: { has: function (obj) { return "taxRate" in obj; }, get: function (obj) { return obj.taxRate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_linePrice_decorators, { kind: "getter", name: "linePrice", static: false, private: false, access: { has: function (obj) { return "linePrice" in obj; }, get: function (obj) { return obj.linePrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_linePriceWithTax_decorators, { kind: "getter", name: "linePriceWithTax", static: false, private: false, access: { has: function (obj) { return "linePriceWithTax" in obj; }, get: function (obj) { return obj.linePriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discountedLinePrice_decorators, { kind: "getter", name: "discountedLinePrice", static: false, private: false, access: { has: function (obj) { return "discountedLinePrice" in obj; }, get: function (obj) { return obj.discountedLinePrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discountedLinePriceWithTax_decorators, { kind: "getter", name: "discountedLinePriceWithTax", static: false, private: false, access: { has: function (obj) { return "discountedLinePriceWithTax" in obj; }, get: function (obj) { return obj.discountedLinePriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discounts_decorators, { kind: "getter", name: "discounts", static: false, private: false, access: { has: function (obj) { return "discounts" in obj; }, get: function (obj) { return obj.discounts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_lineTax_decorators, { kind: "getter", name: "lineTax", static: false, private: false, access: { has: function (obj) { return "lineTax" in obj; }, get: function (obj) { return obj.lineTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_proratedLinePrice_decorators, { kind: "getter", name: "proratedLinePrice", static: false, private: false, access: { has: function (obj) { return "proratedLinePrice" in obj; }, get: function (obj) { return obj.proratedLinePrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_proratedLinePriceWithTax_decorators, { kind: "getter", name: "proratedLinePriceWithTax", static: false, private: false, access: { has: function (obj) { return "proratedLinePriceWithTax" in obj; }, get: function (obj) { return obj.proratedLinePriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_proratedLineTax_decorators, { kind: "getter", name: "proratedLineTax", static: false, private: false, access: { has: function (obj) { return "proratedLineTax" in obj; }, get: function (obj) { return obj.proratedLineTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _sellerChannel_decorators, { kind: "field", name: "sellerChannel", static: false, private: false, access: { has: function (obj) { return "sellerChannel" in obj; }, get: function (obj) { return obj.sellerChannel; }, set: function (obj, value) { obj.sellerChannel = value; } }, metadata: _metadata }, _sellerChannel_initializers, _sellerChannel_extraInitializers);
        __esDecorate(null, null, _sellerChannelId_decorators, { kind: "field", name: "sellerChannelId", static: false, private: false, access: { has: function (obj) { return "sellerChannelId" in obj; }, get: function (obj) { return obj.sellerChannelId; }, set: function (obj, value) { obj.sellerChannelId = value; } }, metadata: _metadata }, _sellerChannelId_initializers, _sellerChannelId_extraInitializers);
        __esDecorate(null, null, _shippingLine_decorators, { kind: "field", name: "shippingLine", static: false, private: false, access: { has: function (obj) { return "shippingLine" in obj; }, get: function (obj) { return obj.shippingLine; }, set: function (obj, value) { obj.shippingLine = value; } }, metadata: _metadata }, _shippingLine_initializers, _shippingLine_extraInitializers);
        __esDecorate(null, null, _shippingLineId_decorators, { kind: "field", name: "shippingLineId", static: false, private: false, access: { has: function (obj) { return "shippingLineId" in obj; }, get: function (obj) { return obj.shippingLineId; }, set: function (obj, value) { obj.shippingLineId = value; } }, metadata: _metadata }, _shippingLineId_initializers, _shippingLineId_extraInitializers);
        __esDecorate(null, null, _productVariant_decorators, { kind: "field", name: "productVariant", static: false, private: false, access: { has: function (obj) { return "productVariant" in obj; }, get: function (obj) { return obj.productVariant; }, set: function (obj, value) { obj.productVariant = value; } }, metadata: _metadata }, _productVariant_initializers, _productVariant_extraInitializers);
        __esDecorate(null, null, _productVariantId_decorators, { kind: "field", name: "productVariantId", static: false, private: false, access: { has: function (obj) { return "productVariantId" in obj; }, get: function (obj) { return obj.productVariantId; }, set: function (obj, value) { obj.productVariantId = value; } }, metadata: _metadata }, _productVariantId_initializers, _productVariantId_extraInitializers);
        __esDecorate(null, null, _taxCategory_decorators, { kind: "field", name: "taxCategory", static: false, private: false, access: { has: function (obj) { return "taxCategory" in obj; }, get: function (obj) { return obj.taxCategory; }, set: function (obj, value) { obj.taxCategory = value; } }, metadata: _metadata }, _taxCategory_initializers, _taxCategory_extraInitializers);
        __esDecorate(null, null, _taxCategoryId_decorators, { kind: "field", name: "taxCategoryId", static: false, private: false, access: { has: function (obj) { return "taxCategoryId" in obj; }, get: function (obj) { return obj.taxCategoryId; }, set: function (obj, value) { obj.taxCategoryId = value; } }, metadata: _metadata }, _taxCategoryId_initializers, _taxCategoryId_extraInitializers);
        __esDecorate(null, null, _featuredAsset_decorators, { kind: "field", name: "featuredAsset", static: false, private: false, access: { has: function (obj) { return "featuredAsset" in obj; }, get: function (obj) { return obj.featuredAsset; }, set: function (obj, value) { obj.featuredAsset = value; } }, metadata: _metadata }, _featuredAsset_initializers, _featuredAsset_extraInitializers);
        __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
        __esDecorate(null, null, _linesReferences_decorators, { kind: "field", name: "linesReferences", static: false, private: false, access: { has: function (obj) { return "linesReferences" in obj; }, get: function (obj) { return obj.linesReferences; }, set: function (obj, value) { obj.linesReferences = value; } }, metadata: _metadata }, _linesReferences_initializers, _linesReferences_extraInitializers);
        __esDecorate(null, null, _sales_decorators, { kind: "field", name: "sales", static: false, private: false, access: { has: function (obj) { return "sales" in obj; }, get: function (obj) { return obj.sales; }, set: function (obj, value) { obj.sales = value; } }, metadata: _metadata }, _sales_initializers, _sales_extraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, null, _orderPlacedQuantity_decorators, { kind: "field", name: "orderPlacedQuantity", static: false, private: false, access: { has: function (obj) { return "orderPlacedQuantity" in obj; }, get: function (obj) { return obj.orderPlacedQuantity; }, set: function (obj, value) { obj.orderPlacedQuantity = value; } }, metadata: _metadata }, _orderPlacedQuantity_initializers, _orderPlacedQuantity_extraInitializers);
        __esDecorate(null, null, _initialListPrice_decorators, { kind: "field", name: "initialListPrice", static: false, private: false, access: { has: function (obj) { return "initialListPrice" in obj; }, get: function (obj) { return obj.initialListPrice; }, set: function (obj, value) { obj.initialListPrice = value; } }, metadata: _metadata }, _initialListPrice_initializers, _initialListPrice_extraInitializers);
        __esDecorate(null, null, _listPrice_decorators, { kind: "field", name: "listPrice", static: false, private: false, access: { has: function (obj) { return "listPrice" in obj; }, get: function (obj) { return obj.listPrice; }, set: function (obj, value) { obj.listPrice = value; } }, metadata: _metadata }, _listPrice_initializers, _listPrice_extraInitializers);
        __esDecorate(null, null, _listPriceIncludesTax_decorators, { kind: "field", name: "listPriceIncludesTax", static: false, private: false, access: { has: function (obj) { return "listPriceIncludesTax" in obj; }, get: function (obj) { return obj.listPriceIncludesTax; }, set: function (obj, value) { obj.listPriceIncludesTax = value; } }, metadata: _metadata }, _listPriceIncludesTax_initializers, _listPriceIncludesTax_extraInitializers);
        __esDecorate(null, null, _adjustments_decorators, { kind: "field", name: "adjustments", static: false, private: false, access: { has: function (obj) { return "adjustments" in obj; }, get: function (obj) { return obj.adjustments; }, set: function (obj, value) { obj.adjustments = value; } }, metadata: _metadata }, _adjustments_initializers, _adjustments_extraInitializers);
        __esDecorate(null, null, _taxLines_decorators, { kind: "field", name: "taxLines", static: false, private: false, access: { has: function (obj) { return "taxLines" in obj; }, get: function (obj) { return obj.taxLines; }, set: function (obj, value) { obj.taxLines = value; } }, metadata: _metadata }, _taxLines_initializers, _taxLines_extraInitializers);
        __esDecorate(null, null, _cancellations_decorators, { kind: "field", name: "cancellations", static: false, private: false, access: { has: function (obj) { return "cancellations" in obj; }, get: function (obj) { return obj.cancellations; }, set: function (obj, value) { obj.cancellations = value; } }, metadata: _metadata }, _cancellations_initializers, _cancellations_extraInitializers);
        __esDecorate(null, null, _allocations_decorators, { kind: "field", name: "allocations", static: false, private: false, access: { has: function (obj) { return "allocations" in obj; }, get: function (obj) { return obj.allocations; }, set: function (obj, value) { obj.allocations = value; } }, metadata: _metadata }, _allocations_initializers, _allocations_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderLine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderLine = _classThis;
}();
exports.OrderLine = OrderLine;
