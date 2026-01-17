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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingLine = void 0;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var round_money_1 = require("../../common/round-money");
var tax_utils_1 = require("../../common/tax-utils");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var money_decorator_1 = require("../money.decorator");
var order_entity_1 = require("../order/order.entity");
var order_line_entity_1 = require("../order-line/order-line.entity");
var shipping_method_entity_1 = require("../shipping-method/shipping-method.entity");
/**
 * @description
 * A ShippingLine is created when a {@link ShippingMethod} is applied to an {@link Order}.
 * It contains information about the price of the shipping method, any discounts that were
 * applied, and the resulting tax on the shipping method.
 *
 * @docsCategory entities
 */
var ShippingLine = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _instanceExtraInitializers = [];
    var _shippingMethodId_decorators;
    var _shippingMethodId_initializers = [];
    var _shippingMethodId_extraInitializers = [];
    var _shippingMethod_decorators;
    var _shippingMethod_initializers = [];
    var _shippingMethod_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
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
    var _orderLines_decorators;
    var _orderLines_initializers = [];
    var _orderLines_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _get_price_decorators;
    var _get_priceWithTax_decorators;
    var _get_discountedPrice_decorators;
    var _get_discountedPriceWithTax_decorators;
    var _get_taxRate_decorators;
    var _get_discounts_decorators;
    var ShippingLine = _classThis = /** @class */ (function (_super) {
        __extends(ShippingLine_1, _super);
        function ShippingLine_1(input) {
            var _this = _super.call(this, input) || this;
            _this.shippingMethodId = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _shippingMethodId_initializers, void 0));
            _this.shippingMethod = (__runInitializers(_this, _shippingMethodId_extraInitializers), __runInitializers(_this, _shippingMethod_initializers, void 0));
            _this.order = (__runInitializers(_this, _shippingMethod_extraInitializers), __runInitializers(_this, _order_initializers, void 0));
            _this.listPrice = (__runInitializers(_this, _order_extraInitializers), __runInitializers(_this, _listPrice_initializers, void 0));
            _this.listPriceIncludesTax = (__runInitializers(_this, _listPrice_extraInitializers), __runInitializers(_this, _listPriceIncludesTax_initializers, void 0));
            _this.adjustments = (__runInitializers(_this, _listPriceIncludesTax_extraInitializers), __runInitializers(_this, _adjustments_initializers, void 0));
            _this.taxLines = (__runInitializers(_this, _adjustments_extraInitializers), __runInitializers(_this, _taxLines_initializers, void 0));
            _this.orderLines = (__runInitializers(_this, _taxLines_extraInitializers), __runInitializers(_this, _orderLines_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _orderLines_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        Object.defineProperty(ShippingLine_1.prototype, "price", {
            get: function () {
                return this.listPriceIncludesTax ? (0, tax_utils_1.netPriceOf)(this.listPrice, this.taxRate) : this.listPrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShippingLine_1.prototype, "priceWithTax", {
            get: function () {
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? this.listPrice : (0, tax_utils_1.grossPriceOf)(this.listPrice, this.taxRate));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShippingLine_1.prototype, "discountedPrice", {
            get: function () {
                var result = this.listPrice + this.getAdjustmentsTotal();
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? (0, tax_utils_1.netPriceOf)(result, this.taxRate) : result);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShippingLine_1.prototype, "discountedPriceWithTax", {
            get: function () {
                var result = this.listPrice + this.getAdjustmentsTotal();
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? result : (0, tax_utils_1.grossPriceOf)(result, this.taxRate));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShippingLine_1.prototype, "taxRate", {
            get: function () {
                return (0, shared_utils_1.summate)(this.taxLines, 'taxRate');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShippingLine_1.prototype, "discounts", {
            get: function () {
                var _this = this;
                var _a, _b;
                return ((_b = (_a = this.adjustments) === null || _a === void 0 ? void 0 : _a.map(function (adjustment) {
                    var amount = (0, round_money_1.roundMoney)(_this.listPriceIncludesTax
                        ? (0, tax_utils_1.netPriceOf)(adjustment.amount, _this.taxRate)
                        : adjustment.amount);
                    var amountWithTax = (0, round_money_1.roundMoney)(_this.listPriceIncludesTax
                        ? adjustment.amount
                        : (0, tax_utils_1.grossPriceOf)(adjustment.amount, _this.taxRate));
                    return __assign(__assign({}, adjustment), { amount: amount, amountWithTax: amountWithTax });
                })) !== null && _b !== void 0 ? _b : []);
            },
            enumerable: false,
            configurable: true
        });
        ShippingLine_1.prototype.addAdjustment = function (adjustment) {
            this.adjustments = this.adjustments.concat(adjustment);
        };
        ShippingLine_1.prototype.clearAdjustments = function () {
            this.adjustments = [];
        };
        /**
         * @description
         * The total of all price adjustments. Will typically be a negative number due to discounts.
         */
        ShippingLine_1.prototype.getAdjustmentsTotal = function () {
            return (0, shared_utils_1.summate)(this.adjustments, 'amount');
        };
        return ShippingLine_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ShippingLine");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _shippingMethodId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        _shippingMethod_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return shipping_method_entity_1.ShippingMethod; })];
        _order_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_entity_1.Order; }, function (order) { return order.shippingLines; }, { onDelete: 'CASCADE' })];
        _listPrice_decorators = [(0, money_decorator_1.Money)()];
        _listPriceIncludesTax_decorators = [(0, typeorm_1.Column)()];
        _adjustments_decorators = [(0, typeorm_1.Column)('simple-json')];
        _taxLines_decorators = [(0, typeorm_1.Column)('simple-json')];
        _orderLines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_line_entity_1.OrderLine; }, function (orderLine) { return orderLine.shippingLine; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomShippingLineFields; })];
        _get_price_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_priceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discountedPrice_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discountedPriceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_taxRate_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_discounts_decorators = [(0, calculated_decorator_1.Calculated)()];
        __esDecorate(_classThis, null, _get_price_decorators, { kind: "getter", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_priceWithTax_decorators, { kind: "getter", name: "priceWithTax", static: false, private: false, access: { has: function (obj) { return "priceWithTax" in obj; }, get: function (obj) { return obj.priceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discountedPrice_decorators, { kind: "getter", name: "discountedPrice", static: false, private: false, access: { has: function (obj) { return "discountedPrice" in obj; }, get: function (obj) { return obj.discountedPrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discountedPriceWithTax_decorators, { kind: "getter", name: "discountedPriceWithTax", static: false, private: false, access: { has: function (obj) { return "discountedPriceWithTax" in obj; }, get: function (obj) { return obj.discountedPriceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_taxRate_decorators, { kind: "getter", name: "taxRate", static: false, private: false, access: { has: function (obj) { return "taxRate" in obj; }, get: function (obj) { return obj.taxRate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_discounts_decorators, { kind: "getter", name: "discounts", static: false, private: false, access: { has: function (obj) { return "discounts" in obj; }, get: function (obj) { return obj.discounts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _shippingMethodId_decorators, { kind: "field", name: "shippingMethodId", static: false, private: false, access: { has: function (obj) { return "shippingMethodId" in obj; }, get: function (obj) { return obj.shippingMethodId; }, set: function (obj, value) { obj.shippingMethodId = value; } }, metadata: _metadata }, _shippingMethodId_initializers, _shippingMethodId_extraInitializers);
        __esDecorate(null, null, _shippingMethod_decorators, { kind: "field", name: "shippingMethod", static: false, private: false, access: { has: function (obj) { return "shippingMethod" in obj; }, get: function (obj) { return obj.shippingMethod; }, set: function (obj, value) { obj.shippingMethod = value; } }, metadata: _metadata }, _shippingMethod_initializers, _shippingMethod_extraInitializers);
        __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
        __esDecorate(null, null, _listPrice_decorators, { kind: "field", name: "listPrice", static: false, private: false, access: { has: function (obj) { return "listPrice" in obj; }, get: function (obj) { return obj.listPrice; }, set: function (obj, value) { obj.listPrice = value; } }, metadata: _metadata }, _listPrice_initializers, _listPrice_extraInitializers);
        __esDecorate(null, null, _listPriceIncludesTax_decorators, { kind: "field", name: "listPriceIncludesTax", static: false, private: false, access: { has: function (obj) { return "listPriceIncludesTax" in obj; }, get: function (obj) { return obj.listPriceIncludesTax; }, set: function (obj, value) { obj.listPriceIncludesTax = value; } }, metadata: _metadata }, _listPriceIncludesTax_initializers, _listPriceIncludesTax_extraInitializers);
        __esDecorate(null, null, _adjustments_decorators, { kind: "field", name: "adjustments", static: false, private: false, access: { has: function (obj) { return "adjustments" in obj; }, get: function (obj) { return obj.adjustments; }, set: function (obj, value) { obj.adjustments = value; } }, metadata: _metadata }, _adjustments_initializers, _adjustments_extraInitializers);
        __esDecorate(null, null, _taxLines_decorators, { kind: "field", name: "taxLines", static: false, private: false, access: { has: function (obj) { return "taxLines" in obj; }, get: function (obj) { return obj.taxLines; }, set: function (obj, value) { obj.taxLines = value; } }, metadata: _metadata }, _taxLines_initializers, _taxLines_extraInitializers);
        __esDecorate(null, null, _orderLines_decorators, { kind: "field", name: "orderLines", static: false, private: false, access: { has: function (obj) { return "orderLines" in obj; }, get: function (obj) { return obj.orderLines; }, set: function (obj, value) { obj.orderLines = value; } }, metadata: _metadata }, _orderLines_initializers, _orderLines_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShippingLine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShippingLine = _classThis;
}();
exports.ShippingLine = ShippingLine;
