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
exports.Order = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var errors_1 = require("../../common/error/errors");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var customer_entity_1 = require("../customer/customer.entity");
var entity_id_decorator_1 = require("../entity-id.decorator");
var fulfillment_entity_1 = require("../fulfillment/fulfillment.entity");
var money_decorator_1 = require("../money.decorator");
var order_line_entity_1 = require("../order-line/order-line.entity");
var order_modification_entity_1 = require("../order-modification/order-modification.entity");
var payment_entity_1 = require("../payment/payment.entity");
var promotion_entity_1 = require("../promotion/promotion.entity");
var shipping_line_entity_1 = require("../shipping-line/shipping-line.entity");
var surcharge_entity_1 = require("../surcharge/surcharge.entity");
/**
 * @description
 * An Order is created whenever a {@link Customer} adds an item to the cart. It contains all the
 * information required to fulfill an order: which {@link ProductVariant}s in what quantities;
 * the shipping address and price; any applicable promotions; payments etc.
 *
 * An Order exists in a well-defined state according to the {@link OrderState} type. A state machine
 * is used to govern the transition from one state to another.
 *
 * @docsCategory entities
 */
var Order = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _instanceExtraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _sellerOrders_decorators;
    var _sellerOrders_initializers = [];
    var _sellerOrders_extraInitializers = [];
    var _aggregateOrder_decorators;
    var _aggregateOrder_initializers = [];
    var _aggregateOrder_extraInitializers = [];
    var _aggregateOrderId_decorators;
    var _aggregateOrderId_initializers = [];
    var _aggregateOrderId_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _active_decorators;
    var _active_initializers = [];
    var _active_extraInitializers = [];
    var _orderPlacedAt_decorators;
    var _orderPlacedAt_initializers = [];
    var _orderPlacedAt_extraInitializers = [];
    var _customer_decorators;
    var _customer_initializers = [];
    var _customer_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _lines_decorators;
    var _lines_initializers = [];
    var _lines_extraInitializers = [];
    var _surcharges_decorators;
    var _surcharges_initializers = [];
    var _surcharges_extraInitializers = [];
    var _couponCodes_decorators;
    var _couponCodes_initializers = [];
    var _couponCodes_extraInitializers = [];
    var _promotions_decorators;
    var _promotions_initializers = [];
    var _promotions_extraInitializers = [];
    var _shippingAddress_decorators;
    var _shippingAddress_initializers = [];
    var _shippingAddress_extraInitializers = [];
    var _billingAddress_decorators;
    var _billingAddress_initializers = [];
    var _billingAddress_extraInitializers = [];
    var _payments_decorators;
    var _payments_initializers = [];
    var _payments_extraInitializers = [];
    var _fulfillments_decorators;
    var _fulfillments_initializers = [];
    var _fulfillments_extraInitializers = [];
    var _currencyCode_decorators;
    var _currencyCode_initializers = [];
    var _currencyCode_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _taxZoneId_decorators;
    var _taxZoneId_initializers = [];
    var _taxZoneId_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _modifications_decorators;
    var _modifications_initializers = [];
    var _modifications_extraInitializers = [];
    var _subTotal_decorators;
    var _subTotal_initializers = [];
    var _subTotal_extraInitializers = [];
    var _subTotalWithTax_decorators;
    var _subTotalWithTax_initializers = [];
    var _subTotalWithTax_extraInitializers = [];
    var _shippingLines_decorators;
    var _shippingLines_initializers = [];
    var _shippingLines_extraInitializers = [];
    var _shipping_decorators;
    var _shipping_initializers = [];
    var _shipping_extraInitializers = [];
    var _shippingWithTax_decorators;
    var _shippingWithTax_initializers = [];
    var _shippingWithTax_extraInitializers = [];
    var _get_discounts_decorators;
    var _get_total_decorators;
    var _get_totalWithTax_decorators;
    var _get_totalQuantity_decorators;
    var _get_taxSummary_decorators;
    var Order = _classThis = /** @class */ (function (_super) {
        __extends(Order_1, _super);
        function Order_1(input) {
            var _this = _super.call(this, input) || this;
            _this.type = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _type_initializers, void 0));
            _this.sellerOrders = (__runInitializers(_this, _type_extraInitializers), __runInitializers(_this, _sellerOrders_initializers, void 0));
            _this.aggregateOrder = (__runInitializers(_this, _sellerOrders_extraInitializers), __runInitializers(_this, _aggregateOrder_initializers, void 0));
            _this.aggregateOrderId = (__runInitializers(_this, _aggregateOrder_extraInitializers), __runInitializers(_this, _aggregateOrderId_initializers, void 0));
            /**
             * @description
             * A unique code for the Order, generated according to the
             * {@link OrderCodeStrategy}. This should be used as an order reference
             * for Customers, rather than the Order's id.
             */
            _this.code = (__runInitializers(_this, _aggregateOrderId_extraInitializers), __runInitializers(_this, _code_initializers, void 0));
            _this.state = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _state_initializers, void 0));
            /**
             * @description
             * Whether the Order is considered "active", meaning that the
             * Customer can still make changes to it and has not yet completed
             * the checkout process.
             * This is governed by the {@link OrderPlacedStrategy}.
             */
            _this.active = (__runInitializers(_this, _state_extraInitializers), __runInitializers(_this, _active_initializers, void 0));
            /**
             * @description
             * The date & time that the Order was placed, i.e. the Customer
             * completed the checkout and the Order is no longer "active".
             * This is governed by the {@link OrderPlacedStrategy}.
             */
            _this.orderPlacedAt = (__runInitializers(_this, _active_extraInitializers), __runInitializers(_this, _orderPlacedAt_initializers, void 0));
            _this.customer = (__runInitializers(_this, _orderPlacedAt_extraInitializers), __runInitializers(_this, _customer_initializers, void 0));
            _this.customerId = (__runInitializers(_this, _customer_extraInitializers), __runInitializers(_this, _customerId_initializers, void 0));
            _this.lines = (__runInitializers(_this, _customerId_extraInitializers), __runInitializers(_this, _lines_initializers, void 0));
            /**
             * @description
             * Surcharges are arbitrary modifications to the Order total which are neither
             * ProductVariants nor discounts resulting from applied Promotions. For example,
             * one-off discounts based on customer interaction, or surcharges based on payment
             * methods.
             */
            _this.surcharges = (__runInitializers(_this, _lines_extraInitializers), __runInitializers(_this, _surcharges_initializers, void 0));
            /**
             * @description
             * An array of all coupon codes applied to the Order.
             */
            _this.couponCodes = (__runInitializers(_this, _surcharges_extraInitializers), __runInitializers(_this, _couponCodes_initializers, void 0));
            /**
             * @description
             * Promotions applied to the order. Only gets populated after the payment process has completed,
             * i.e. the Order is no longer active.
             */
            _this.promotions = (__runInitializers(_this, _couponCodes_extraInitializers), __runInitializers(_this, _promotions_initializers, void 0));
            _this.shippingAddress = (__runInitializers(_this, _promotions_extraInitializers), __runInitializers(_this, _shippingAddress_initializers, void 0));
            _this.billingAddress = (__runInitializers(_this, _shippingAddress_extraInitializers), __runInitializers(_this, _billingAddress_initializers, void 0));
            _this.payments = (__runInitializers(_this, _billingAddress_extraInitializers), __runInitializers(_this, _payments_initializers, void 0));
            _this.fulfillments = (__runInitializers(_this, _payments_extraInitializers), __runInitializers(_this, _fulfillments_initializers, void 0));
            _this.currencyCode = (__runInitializers(_this, _fulfillments_extraInitializers), __runInitializers(_this, _currencyCode_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _currencyCode_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.taxZoneId = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _taxZoneId_initializers, void 0));
            _this.channels = (__runInitializers(_this, _taxZoneId_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.modifications = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _modifications_initializers, void 0));
            /**
             * @description
             * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
             * discounts which have been prorated (proportionally distributed) amongst the OrderItems.
             * To get a total of all OrderLines which does not account for prorated discounts, use the
             * sum of {@link OrderLine}'s `discountedLinePrice` values.
             */
            _this.subTotal = (__runInitializers(_this, _modifications_extraInitializers), __runInitializers(_this, _subTotal_initializers, void 0));
            /**
             * @description
             * Same as subTotal, but inclusive of tax.
             */
            _this.subTotalWithTax = (__runInitializers(_this, _subTotal_extraInitializers), __runInitializers(_this, _subTotalWithTax_initializers, void 0));
            /**
             * @description
             * The shipping charges applied to this order.
             */
            _this.shippingLines = (__runInitializers(_this, _subTotalWithTax_extraInitializers), __runInitializers(_this, _shippingLines_initializers, void 0));
            /**
             * @description
             * The total of all the `shippingLines`.
             */
            _this.shipping = (__runInitializers(_this, _shippingLines_extraInitializers), __runInitializers(_this, _shipping_initializers, void 0));
            _this.shippingWithTax = (__runInitializers(_this, _shipping_extraInitializers), __runInitializers(_this, _shippingWithTax_initializers, void 0));
            __runInitializers(_this, _shippingWithTax_extraInitializers);
            return _this;
        }
        Object.defineProperty(Order_1.prototype, "discounts", {
            get: function () {
                var _a, _b;
                this.throwIfLinesNotJoined('discounts');
                var groupedAdjustments = new Map();
                for (var _i = 0, _c = (_a = this.lines) !== null && _a !== void 0 ? _a : []; _i < _c.length; _i++) {
                    var line = _c[_i];
                    for (var _d = 0, _e = line.discounts; _d < _e.length; _d++) {
                        var discount = _e[_d];
                        var adjustment = groupedAdjustments.get(discount.adjustmentSource);
                        if (adjustment) {
                            adjustment.amount += discount.amount;
                            adjustment.amountWithTax += discount.amountWithTax;
                        }
                        else {
                            groupedAdjustments.set(discount.adjustmentSource, __assign({}, discount));
                        }
                    }
                }
                for (var _f = 0, _g = (_b = this.shippingLines) !== null && _b !== void 0 ? _b : []; _f < _g.length; _f++) {
                    var shippingLine = _g[_f];
                    for (var _h = 0, _j = shippingLine.discounts; _h < _j.length; _h++) {
                        var discount = _j[_h];
                        var adjustment = groupedAdjustments.get(discount.adjustmentSource);
                        if (adjustment) {
                            adjustment.amount += discount.amount;
                            adjustment.amountWithTax += discount.amountWithTax;
                        }
                        else {
                            groupedAdjustments.set(discount.adjustmentSource, __assign({}, discount));
                        }
                    }
                }
                return __spreadArray([], groupedAdjustments.values(), true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Order_1.prototype, "total", {
            /**
             * @description
             * Equal to `subTotal` plus `shipping`
             */
            get: function () {
                return this.subTotal + (this.shipping || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Order_1.prototype, "totalWithTax", {
            /**
             * @description
             * The final payable amount. Equal to `subTotalWithTax` plus `shippingWithTax`.
             */
            get: function () {
                return this.subTotalWithTax + (this.shippingWithTax || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Order_1.prototype, "totalQuantity", {
            get: function () {
                this.throwIfLinesNotJoined('totalQuantity');
                return (0, shared_utils_1.summate)(this.lines, 'quantity');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Order_1.prototype, "taxSummary", {
            /**
             * @description
             * A summary of the taxes being applied to this Order.
             */
            get: function () {
                var _a, _b, _c;
                this.throwIfLinesNotJoined('taxSummary');
                this.throwIfSurchargesNotJoined('taxSummary');
                var taxRateMap = new Map();
                var taxId = function (taxLine) { return "".concat(taxLine.description, ":").concat(taxLine.taxRate); };
                var taxableLines = __spreadArray(__spreadArray(__spreadArray([], ((_a = this.lines) !== null && _a !== void 0 ? _a : []), true), ((_b = this.shippingLines) !== null && _b !== void 0 ? _b : []), true), ((_c = this.surcharges) !== null && _c !== void 0 ? _c : []), true);
                for (var _i = 0, taxableLines_1 = taxableLines; _i < taxableLines_1.length; _i++) {
                    var line = taxableLines_1[_i];
                    var taxRateTotal = (0, shared_utils_1.summate)(line.taxLines, 'taxRate');
                    for (var _d = 0, _e = line.taxLines; _d < _e.length; _d++) {
                        var taxLine = _e[_d];
                        var id = taxId(taxLine);
                        var row = taxRateMap.get(id);
                        var proportionOfTotalRate = 0 < taxLine.taxRate ? taxLine.taxRate / taxRateTotal : 0;
                        var lineBase = line instanceof order_line_entity_1.OrderLine
                            ? line.proratedLinePrice
                            : line instanceof surcharge_entity_1.Surcharge
                                ? line.price
                                : line.discountedPrice;
                        var lineWithTax = line instanceof order_line_entity_1.OrderLine
                            ? line.proratedLinePriceWithTax
                            : line instanceof surcharge_entity_1.Surcharge
                                ? line.priceWithTax
                                : line.discountedPriceWithTax;
                        var amount = Math.round((lineWithTax - lineBase) * proportionOfTotalRate);
                        if (row) {
                            row.tax += amount;
                            row.base += lineBase;
                        }
                        else {
                            taxRateMap.set(id, {
                                tax: amount,
                                base: lineBase,
                                description: taxLine.description,
                                rate: taxLine.taxRate,
                            });
                        }
                    }
                }
                return Array.from(taxRateMap.entries()).map(function (_a) {
                    var taxRate = _a[0], row = _a[1];
                    return ({
                        taxRate: row.rate,
                        description: row.description,
                        taxBase: row.base,
                        taxTotal: row.tax,
                    });
                });
            },
            enumerable: false,
            configurable: true
        });
        Order_1.prototype.throwIfLinesNotJoined = function (propertyName) {
            if (this.lines == null) {
                var errorMessage = [
                    "The property \"".concat(propertyName, "\" on the Order entity requires the Order.lines relation to be joined."),
                    "This can be done with the EntityHydratorService: `await entityHydratorService.hydrate(ctx, order, { relations: ['lines'] })`",
                ];
                throw new errors_1.InternalServerError(errorMessage.join('\n'));
            }
        };
        Order_1.prototype.throwIfSurchargesNotJoined = function (propertyName) {
            if (this.surcharges == null) {
                var errorMessage = [
                    "The property \"".concat(propertyName, "\" on the Order entity requires the Order.surcharges relation to be joined."),
                    "This can be done with the EntityHydratorService: `await entityHydratorService.hydrate(ctx, order, { relations: ['surcharges'] })`",
                ];
                throw new errors_1.InternalServerError(errorMessage.join('\n'));
            }
        };
        return Order_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Order");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _type_decorators = [(0, typeorm_1.Column)('varchar', { default: generated_types_1.OrderType.Regular })];
        _sellerOrders_decorators = [(0, typeorm_1.OneToMany)(function (type) { return Order; }, function (sellerOrder) { return sellerOrder.aggregateOrder; })];
        _aggregateOrder_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return Order; }, function (aggregateOrder) { return aggregateOrder.sellerOrders; })];
        _aggregateOrderId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _code_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)({ unique: true })];
        _state_decorators = [(0, typeorm_1.Column)('varchar')];
        _active_decorators = [(0, typeorm_1.Column)({ default: true })];
        _orderPlacedAt_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _customer_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return customer_entity_1.Customer; }, function (customer) { return customer.orders; })];
        _customerId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _lines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_line_entity_1.OrderLine; }, function (line) { return line.order; })];
        _surcharges_decorators = [(0, typeorm_1.OneToMany)(function (type) { return surcharge_entity_1.Surcharge; }, function (surcharge) { return surcharge.order; })];
        _couponCodes_decorators = [(0, typeorm_1.Column)('simple-array')];
        _promotions_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return promotion_entity_1.Promotion; }, function (promotion) { return promotion.orders; }), (0, typeorm_1.JoinTable)()];
        _shippingAddress_decorators = [(0, typeorm_1.Column)('simple-json')];
        _billingAddress_decorators = [(0, typeorm_1.Column)('simple-json')];
        _payments_decorators = [(0, typeorm_1.OneToMany)(function (type) { return payment_entity_1.Payment; }, function (payment) { return payment.order; })];
        _fulfillments_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return fulfillment_entity_1.Fulfillment; }, function (fulfillment) { return fulfillment.orders; }), (0, typeorm_1.JoinTable)()];
        _currencyCode_decorators = [(0, typeorm_1.Column)('varchar')];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomOrderFields; })];
        _taxZoneId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }), (0, typeorm_1.JoinTable)()];
        _modifications_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_modification_entity_1.OrderModification; }, function (modification) { return modification.order; })];
        _subTotal_decorators = [(0, money_decorator_1.Money)()];
        _subTotalWithTax_decorators = [(0, money_decorator_1.Money)()];
        _shippingLines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return shipping_line_entity_1.ShippingLine; }, function (shippingLine) { return shippingLine.order; })];
        _shipping_decorators = [(0, money_decorator_1.Money)({ default: 0 })];
        _shippingWithTax_decorators = [(0, money_decorator_1.Money)({ default: 0 })];
        _get_discounts_decorators = [(0, calculated_decorator_1.Calculated)({ relations: ['lines', 'shippingLines'] })];
        _get_total_decorators = [(0, calculated_decorator_1.Calculated)({
                query: function (qb) {
                    return qb
                        .leftJoin(function (qb1) {
                        return qb1
                            .from(Order, 'order')
                            .select('order.shipping + order.subTotal', 'total')
                            .addSelect('order.id', 'oid');
                    }, 't1', 't1.oid = order.id')
                        .addSelect('t1.total', 'total');
                },
                expression: 'total',
            })];
        _get_totalWithTax_decorators = [(0, calculated_decorator_1.Calculated)({
                query: function (qb) {
                    return qb
                        .leftJoin(function (qb1) {
                        return qb1
                            .from(Order, 'order')
                            .select('order.shippingWithTax + order.subTotalWithTax', 'twt')
                            .addSelect('order.id', 'oid');
                    }, 't1', 't1.oid = order.id')
                        .addSelect('t1.twt', 'twt');
                },
                expression: 'twt',
            })];
        _get_totalQuantity_decorators = [(0, calculated_decorator_1.Calculated)({
                relations: ['lines'],
                query: function (qb) {
                    qb.leftJoin(function (qb1) {
                        return qb1
                            .from(Order, 'order')
                            .select('SUM(lines.quantity)', 'qty')
                            .addSelect('order.id', 'oid')
                            .leftJoin('order.lines', 'lines')
                            .groupBy('order.id');
                    }, 't1', 't1.oid = order.id').addSelect('t1.qty', 'qty');
                },
                expression: 'qty',
            })];
        _get_taxSummary_decorators = [(0, calculated_decorator_1.Calculated)({ relations: ['lines', 'surcharges'] })];
        __esDecorate(_classThis, null, _get_discounts_decorators, { kind: "getter", name: "discounts", static: false, private: false, access: { has: function (obj) { return "discounts" in obj; }, get: function (obj) { return obj.discounts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_total_decorators, { kind: "getter", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_totalWithTax_decorators, { kind: "getter", name: "totalWithTax", static: false, private: false, access: { has: function (obj) { return "totalWithTax" in obj; }, get: function (obj) { return obj.totalWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_totalQuantity_decorators, { kind: "getter", name: "totalQuantity", static: false, private: false, access: { has: function (obj) { return "totalQuantity" in obj; }, get: function (obj) { return obj.totalQuantity; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_taxSummary_decorators, { kind: "getter", name: "taxSummary", static: false, private: false, access: { has: function (obj) { return "taxSummary" in obj; }, get: function (obj) { return obj.taxSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _sellerOrders_decorators, { kind: "field", name: "sellerOrders", static: false, private: false, access: { has: function (obj) { return "sellerOrders" in obj; }, get: function (obj) { return obj.sellerOrders; }, set: function (obj, value) { obj.sellerOrders = value; } }, metadata: _metadata }, _sellerOrders_initializers, _sellerOrders_extraInitializers);
        __esDecorate(null, null, _aggregateOrder_decorators, { kind: "field", name: "aggregateOrder", static: false, private: false, access: { has: function (obj) { return "aggregateOrder" in obj; }, get: function (obj) { return obj.aggregateOrder; }, set: function (obj, value) { obj.aggregateOrder = value; } }, metadata: _metadata }, _aggregateOrder_initializers, _aggregateOrder_extraInitializers);
        __esDecorate(null, null, _aggregateOrderId_decorators, { kind: "field", name: "aggregateOrderId", static: false, private: false, access: { has: function (obj) { return "aggregateOrderId" in obj; }, get: function (obj) { return obj.aggregateOrderId; }, set: function (obj, value) { obj.aggregateOrderId = value; } }, metadata: _metadata }, _aggregateOrderId_initializers, _aggregateOrderId_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
        __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: function (obj) { return "active" in obj; }, get: function (obj) { return obj.active; }, set: function (obj, value) { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
        __esDecorate(null, null, _orderPlacedAt_decorators, { kind: "field", name: "orderPlacedAt", static: false, private: false, access: { has: function (obj) { return "orderPlacedAt" in obj; }, get: function (obj) { return obj.orderPlacedAt; }, set: function (obj, value) { obj.orderPlacedAt = value; } }, metadata: _metadata }, _orderPlacedAt_initializers, _orderPlacedAt_extraInitializers);
        __esDecorate(null, null, _customer_decorators, { kind: "field", name: "customer", static: false, private: false, access: { has: function (obj) { return "customer" in obj; }, get: function (obj) { return obj.customer; }, set: function (obj, value) { obj.customer = value; } }, metadata: _metadata }, _customer_initializers, _customer_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _lines_decorators, { kind: "field", name: "lines", static: false, private: false, access: { has: function (obj) { return "lines" in obj; }, get: function (obj) { return obj.lines; }, set: function (obj, value) { obj.lines = value; } }, metadata: _metadata }, _lines_initializers, _lines_extraInitializers);
        __esDecorate(null, null, _surcharges_decorators, { kind: "field", name: "surcharges", static: false, private: false, access: { has: function (obj) { return "surcharges" in obj; }, get: function (obj) { return obj.surcharges; }, set: function (obj, value) { obj.surcharges = value; } }, metadata: _metadata }, _surcharges_initializers, _surcharges_extraInitializers);
        __esDecorate(null, null, _couponCodes_decorators, { kind: "field", name: "couponCodes", static: false, private: false, access: { has: function (obj) { return "couponCodes" in obj; }, get: function (obj) { return obj.couponCodes; }, set: function (obj, value) { obj.couponCodes = value; } }, metadata: _metadata }, _couponCodes_initializers, _couponCodes_extraInitializers);
        __esDecorate(null, null, _promotions_decorators, { kind: "field", name: "promotions", static: false, private: false, access: { has: function (obj) { return "promotions" in obj; }, get: function (obj) { return obj.promotions; }, set: function (obj, value) { obj.promotions = value; } }, metadata: _metadata }, _promotions_initializers, _promotions_extraInitializers);
        __esDecorate(null, null, _shippingAddress_decorators, { kind: "field", name: "shippingAddress", static: false, private: false, access: { has: function (obj) { return "shippingAddress" in obj; }, get: function (obj) { return obj.shippingAddress; }, set: function (obj, value) { obj.shippingAddress = value; } }, metadata: _metadata }, _shippingAddress_initializers, _shippingAddress_extraInitializers);
        __esDecorate(null, null, _billingAddress_decorators, { kind: "field", name: "billingAddress", static: false, private: false, access: { has: function (obj) { return "billingAddress" in obj; }, get: function (obj) { return obj.billingAddress; }, set: function (obj, value) { obj.billingAddress = value; } }, metadata: _metadata }, _billingAddress_initializers, _billingAddress_extraInitializers);
        __esDecorate(null, null, _payments_decorators, { kind: "field", name: "payments", static: false, private: false, access: { has: function (obj) { return "payments" in obj; }, get: function (obj) { return obj.payments; }, set: function (obj, value) { obj.payments = value; } }, metadata: _metadata }, _payments_initializers, _payments_extraInitializers);
        __esDecorate(null, null, _fulfillments_decorators, { kind: "field", name: "fulfillments", static: false, private: false, access: { has: function (obj) { return "fulfillments" in obj; }, get: function (obj) { return obj.fulfillments; }, set: function (obj, value) { obj.fulfillments = value; } }, metadata: _metadata }, _fulfillments_initializers, _fulfillments_extraInitializers);
        __esDecorate(null, null, _currencyCode_decorators, { kind: "field", name: "currencyCode", static: false, private: false, access: { has: function (obj) { return "currencyCode" in obj; }, get: function (obj) { return obj.currencyCode; }, set: function (obj, value) { obj.currencyCode = value; } }, metadata: _metadata }, _currencyCode_initializers, _currencyCode_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _taxZoneId_decorators, { kind: "field", name: "taxZoneId", static: false, private: false, access: { has: function (obj) { return "taxZoneId" in obj; }, get: function (obj) { return obj.taxZoneId; }, set: function (obj, value) { obj.taxZoneId = value; } }, metadata: _metadata }, _taxZoneId_initializers, _taxZoneId_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _modifications_decorators, { kind: "field", name: "modifications", static: false, private: false, access: { has: function (obj) { return "modifications" in obj; }, get: function (obj) { return obj.modifications; }, set: function (obj, value) { obj.modifications = value; } }, metadata: _metadata }, _modifications_initializers, _modifications_extraInitializers);
        __esDecorate(null, null, _subTotal_decorators, { kind: "field", name: "subTotal", static: false, private: false, access: { has: function (obj) { return "subTotal" in obj; }, get: function (obj) { return obj.subTotal; }, set: function (obj, value) { obj.subTotal = value; } }, metadata: _metadata }, _subTotal_initializers, _subTotal_extraInitializers);
        __esDecorate(null, null, _subTotalWithTax_decorators, { kind: "field", name: "subTotalWithTax", static: false, private: false, access: { has: function (obj) { return "subTotalWithTax" in obj; }, get: function (obj) { return obj.subTotalWithTax; }, set: function (obj, value) { obj.subTotalWithTax = value; } }, metadata: _metadata }, _subTotalWithTax_initializers, _subTotalWithTax_extraInitializers);
        __esDecorate(null, null, _shippingLines_decorators, { kind: "field", name: "shippingLines", static: false, private: false, access: { has: function (obj) { return "shippingLines" in obj; }, get: function (obj) { return obj.shippingLines; }, set: function (obj, value) { obj.shippingLines = value; } }, metadata: _metadata }, _shippingLines_initializers, _shippingLines_extraInitializers);
        __esDecorate(null, null, _shipping_decorators, { kind: "field", name: "shipping", static: false, private: false, access: { has: function (obj) { return "shipping" in obj; }, get: function (obj) { return obj.shipping; }, set: function (obj, value) { obj.shipping = value; } }, metadata: _metadata }, _shipping_initializers, _shipping_extraInitializers);
        __esDecorate(null, null, _shippingWithTax_decorators, { kind: "field", name: "shippingWithTax", static: false, private: false, access: { has: function (obj) { return "shippingWithTax" in obj; }, get: function (obj) { return obj.shippingWithTax; }, set: function (obj, value) { obj.shippingWithTax = value; } }, metadata: _metadata }, _shippingWithTax_initializers, _shippingWithTax_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Order = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Order = _classThis;
}();
exports.Order = Order;
