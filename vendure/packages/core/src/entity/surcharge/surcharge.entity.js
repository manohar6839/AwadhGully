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
exports.Surcharge = void 0;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var round_money_1 = require("../../common/round-money");
var tax_utils_1 = require("../../common/tax-utils");
var base_entity_1 = require("../base/base.entity");
var money_decorator_1 = require("../money.decorator");
var order_entity_1 = require("../order/order.entity");
var order_modification_entity_1 = require("../order-modification/order-modification.entity");
/**
 * @description
 * A Surcharge represents an arbitrary extra item on an {@link Order} which is not
 * a ProductVariant. It can be used to e.g. represent payment-related surcharges.
 *
 * @docsCategory entities
 */
var Surcharge = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _instanceExtraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _listPrice_decorators;
    var _listPrice_initializers = [];
    var _listPrice_extraInitializers = [];
    var _listPriceIncludesTax_decorators;
    var _listPriceIncludesTax_initializers = [];
    var _listPriceIncludesTax_extraInitializers = [];
    var _sku_decorators;
    var _sku_initializers = [];
    var _sku_extraInitializers = [];
    var _taxLines_decorators;
    var _taxLines_initializers = [];
    var _taxLines_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    var _orderModification_decorators;
    var _orderModification_initializers = [];
    var _orderModification_extraInitializers = [];
    var _get_price_decorators;
    var _get_priceWithTax_decorators;
    var _get_taxRate_decorators;
    var Surcharge = _classThis = /** @class */ (function (_super) {
        __extends(Surcharge_1, _super);
        function Surcharge_1(input) {
            var _this = _super.call(this, input) || this;
            _this.description = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _description_initializers, void 0));
            _this.listPrice = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _listPrice_initializers, void 0));
            _this.listPriceIncludesTax = (__runInitializers(_this, _listPrice_extraInitializers), __runInitializers(_this, _listPriceIncludesTax_initializers, void 0));
            _this.sku = (__runInitializers(_this, _listPriceIncludesTax_extraInitializers), __runInitializers(_this, _sku_initializers, void 0));
            _this.taxLines = (__runInitializers(_this, _sku_extraInitializers), __runInitializers(_this, _taxLines_initializers, void 0));
            _this.order = (__runInitializers(_this, _taxLines_extraInitializers), __runInitializers(_this, _order_initializers, void 0));
            _this.orderModification = (__runInitializers(_this, _order_extraInitializers), __runInitializers(_this, _orderModification_initializers, void 0));
            __runInitializers(_this, _orderModification_extraInitializers);
            return _this;
        }
        Object.defineProperty(Surcharge_1.prototype, "price", {
            get: function () {
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? (0, tax_utils_1.netPriceOf)(this.listPrice, this.taxRate) : this.listPrice);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Surcharge_1.prototype, "priceWithTax", {
            get: function () {
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? this.listPrice : (0, tax_utils_1.grossPriceOf)(this.listPrice, this.taxRate));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Surcharge_1.prototype, "taxRate", {
            get: function () {
                return (0, shared_utils_1.summate)(this.taxLines, 'taxRate');
            },
            enumerable: false,
            configurable: true
        });
        return Surcharge_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Surcharge");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _description_decorators = [(0, typeorm_1.Column)()];
        _listPrice_decorators = [(0, money_decorator_1.Money)()];
        _listPriceIncludesTax_decorators = [(0, typeorm_1.Column)()];
        _sku_decorators = [(0, typeorm_1.Column)()];
        _taxLines_decorators = [(0, typeorm_1.Column)('simple-json')];
        _order_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_entity_1.Order; }, function (order) { return order.surcharges; }, { onDelete: 'CASCADE' })];
        _orderModification_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_modification_entity_1.OrderModification; }, function (orderModification) { return orderModification.surcharges; })];
        _get_price_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_priceWithTax_decorators = [(0, calculated_decorator_1.Calculated)()];
        _get_taxRate_decorators = [(0, calculated_decorator_1.Calculated)()];
        __esDecorate(_classThis, null, _get_price_decorators, { kind: "getter", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_priceWithTax_decorators, { kind: "getter", name: "priceWithTax", static: false, private: false, access: { has: function (obj) { return "priceWithTax" in obj; }, get: function (obj) { return obj.priceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_taxRate_decorators, { kind: "getter", name: "taxRate", static: false, private: false, access: { has: function (obj) { return "taxRate" in obj; }, get: function (obj) { return obj.taxRate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _listPrice_decorators, { kind: "field", name: "listPrice", static: false, private: false, access: { has: function (obj) { return "listPrice" in obj; }, get: function (obj) { return obj.listPrice; }, set: function (obj, value) { obj.listPrice = value; } }, metadata: _metadata }, _listPrice_initializers, _listPrice_extraInitializers);
        __esDecorate(null, null, _listPriceIncludesTax_decorators, { kind: "field", name: "listPriceIncludesTax", static: false, private: false, access: { has: function (obj) { return "listPriceIncludesTax" in obj; }, get: function (obj) { return obj.listPriceIncludesTax; }, set: function (obj, value) { obj.listPriceIncludesTax = value; } }, metadata: _metadata }, _listPriceIncludesTax_initializers, _listPriceIncludesTax_extraInitializers);
        __esDecorate(null, null, _sku_decorators, { kind: "field", name: "sku", static: false, private: false, access: { has: function (obj) { return "sku" in obj; }, get: function (obj) { return obj.sku; }, set: function (obj, value) { obj.sku = value; } }, metadata: _metadata }, _sku_initializers, _sku_extraInitializers);
        __esDecorate(null, null, _taxLines_decorators, { kind: "field", name: "taxLines", static: false, private: false, access: { has: function (obj) { return "taxLines" in obj; }, get: function (obj) { return obj.taxLines; }, set: function (obj, value) { obj.taxLines = value; } }, metadata: _metadata }, _taxLines_initializers, _taxLines_extraInitializers);
        __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
        __esDecorate(null, null, _orderModification_decorators, { kind: "field", name: "orderModification", static: false, private: false, access: { has: function (obj) { return "orderModification" in obj; }, get: function (obj) { return obj.orderModification; }, set: function (obj, value) { obj.orderModification = value; } }, metadata: _metadata }, _orderModification_initializers, _orderModification_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Surcharge = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Surcharge = _classThis;
}();
exports.Surcharge = Surcharge;
