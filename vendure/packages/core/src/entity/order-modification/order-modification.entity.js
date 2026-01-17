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
exports.OrderModification = void 0;
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var base_entity_1 = require("../base/base.entity");
var money_decorator_1 = require("../money.decorator");
var order_modification_line_entity_1 = require("../order-line-reference/order-modification-line.entity");
var order_entity_1 = require("../order/order.entity");
var payment_entity_1 = require("../payment/payment.entity");
var refund_entity_1 = require("../refund/refund.entity");
var surcharge_entity_1 = require("../surcharge/surcharge.entity");
/**
 * @description
 * An entity which represents a modification to an order which has been placed, and
 * then modified afterwards by an administrator.
 *
 * @docsCategory entities
 */
var OrderModification = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _instanceExtraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    var _lines_decorators;
    var _lines_initializers = [];
    var _lines_extraInitializers = [];
    var _surcharges_decorators;
    var _surcharges_initializers = [];
    var _surcharges_extraInitializers = [];
    var _priceChange_decorators;
    var _priceChange_initializers = [];
    var _priceChange_extraInitializers = [];
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _refund_decorators;
    var _refund_initializers = [];
    var _refund_extraInitializers = [];
    var _shippingAddressChange_decorators;
    var _shippingAddressChange_initializers = [];
    var _shippingAddressChange_extraInitializers = [];
    var _billingAddressChange_decorators;
    var _billingAddressChange_initializers = [];
    var _billingAddressChange_extraInitializers = [];
    var _get_isSettled_decorators;
    var OrderModification = _classThis = /** @class */ (function (_super) {
        __extends(OrderModification_1, _super);
        function OrderModification_1(input) {
            var _this = _super.call(this, input) || this;
            _this.note = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _note_initializers, void 0));
            _this.order = (__runInitializers(_this, _note_extraInitializers), __runInitializers(_this, _order_initializers, void 0));
            _this.lines = (__runInitializers(_this, _order_extraInitializers), __runInitializers(_this, _lines_initializers, void 0));
            _this.surcharges = (__runInitializers(_this, _lines_extraInitializers), __runInitializers(_this, _surcharges_initializers, void 0));
            _this.priceChange = (__runInitializers(_this, _surcharges_extraInitializers), __runInitializers(_this, _priceChange_initializers, void 0));
            _this.payment = (__runInitializers(_this, _priceChange_extraInitializers), __runInitializers(_this, _payment_initializers, void 0));
            _this.refund = (__runInitializers(_this, _payment_extraInitializers), __runInitializers(_this, _refund_initializers, void 0));
            _this.shippingAddressChange = (__runInitializers(_this, _refund_extraInitializers), __runInitializers(_this, _shippingAddressChange_initializers, void 0));
            _this.billingAddressChange = (__runInitializers(_this, _shippingAddressChange_extraInitializers), __runInitializers(_this, _billingAddressChange_initializers, void 0));
            __runInitializers(_this, _billingAddressChange_extraInitializers);
            return _this;
        }
        Object.defineProperty(OrderModification_1.prototype, "isSettled", {
            get: function () {
                if (this.priceChange === 0) {
                    return true;
                }
                return !!this.payment || !!this.refund;
            },
            enumerable: false,
            configurable: true
        });
        return OrderModification_1;
    }(_classSuper));
    __setFunctionName(_classThis, "OrderModification");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _note_decorators = [(0, typeorm_1.Column)()];
        _order_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_entity_1.Order; }, function (order) { return order.modifications; }, { onDelete: 'CASCADE' })];
        _lines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_modification_line_entity_1.OrderModificationLine; }, function (line) { return line.modification; })];
        _surcharges_decorators = [(0, typeorm_1.OneToMany)(function (type) { return surcharge_entity_1.Surcharge; }, function (surcharge) { return surcharge.orderModification; })];
        _priceChange_decorators = [(0, money_decorator_1.Money)()];
        _payment_decorators = [(0, typeorm_1.ManyToOne)(function (type) { return payment_entity_1.Payment; }), (0, typeorm_1.JoinColumn)()];
        _refund_decorators = [(0, typeorm_1.ManyToOne)(function (type) { return refund_entity_1.Refund; }), (0, typeorm_1.JoinColumn)()];
        _shippingAddressChange_decorators = [(0, typeorm_1.Column)('simple-json', { nullable: true })];
        _billingAddressChange_decorators = [(0, typeorm_1.Column)('simple-json', { nullable: true })];
        _get_isSettled_decorators = [(0, calculated_decorator_1.Calculated)()];
        __esDecorate(_classThis, null, _get_isSettled_decorators, { kind: "getter", name: "isSettled", static: false, private: false, access: { has: function (obj) { return "isSettled" in obj; }, get: function (obj) { return obj.isSettled; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
        __esDecorate(null, null, _lines_decorators, { kind: "field", name: "lines", static: false, private: false, access: { has: function (obj) { return "lines" in obj; }, get: function (obj) { return obj.lines; }, set: function (obj, value) { obj.lines = value; } }, metadata: _metadata }, _lines_initializers, _lines_extraInitializers);
        __esDecorate(null, null, _surcharges_decorators, { kind: "field", name: "surcharges", static: false, private: false, access: { has: function (obj) { return "surcharges" in obj; }, get: function (obj) { return obj.surcharges; }, set: function (obj, value) { obj.surcharges = value; } }, metadata: _metadata }, _surcharges_initializers, _surcharges_extraInitializers);
        __esDecorate(null, null, _priceChange_decorators, { kind: "field", name: "priceChange", static: false, private: false, access: { has: function (obj) { return "priceChange" in obj; }, get: function (obj) { return obj.priceChange; }, set: function (obj, value) { obj.priceChange = value; } }, metadata: _metadata }, _priceChange_initializers, _priceChange_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _refund_decorators, { kind: "field", name: "refund", static: false, private: false, access: { has: function (obj) { return "refund" in obj; }, get: function (obj) { return obj.refund; }, set: function (obj, value) { obj.refund = value; } }, metadata: _metadata }, _refund_initializers, _refund_extraInitializers);
        __esDecorate(null, null, _shippingAddressChange_decorators, { kind: "field", name: "shippingAddressChange", static: false, private: false, access: { has: function (obj) { return "shippingAddressChange" in obj; }, get: function (obj) { return obj.shippingAddressChange; }, set: function (obj, value) { obj.shippingAddressChange = value; } }, metadata: _metadata }, _shippingAddressChange_initializers, _shippingAddressChange_extraInitializers);
        __esDecorate(null, null, _billingAddressChange_decorators, { kind: "field", name: "billingAddressChange", static: false, private: false, access: { has: function (obj) { return "billingAddressChange" in obj; }, get: function (obj) { return obj.billingAddressChange; }, set: function (obj, value) { obj.billingAddressChange = value; } }, metadata: _metadata }, _billingAddressChange_initializers, _billingAddressChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderModification = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderModification = _classThis;
}();
exports.OrderModification = OrderModification;
