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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refund = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var money_decorator_1 = require("../money.decorator");
var refund_line_entity_1 = require("../order-line-reference/refund-line.entity");
var payment_entity_1 = require("../payment/payment.entity");
/**
 * @description A refund the belongs to an order
 *
 * @docsCategory entities
 */
var Refund = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _shipping_decorators;
    var _shipping_initializers = [];
    var _shipping_extraInitializers = [];
    var _adjustment_decorators;
    var _adjustment_initializers = [];
    var _adjustment_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _transactionId_decorators;
    var _transactionId_initializers = [];
    var _transactionId_extraInitializers = [];
    var _lines_decorators;
    var _lines_initializers = [];
    var _lines_extraInitializers = [];
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _paymentId_decorators;
    var _paymentId_initializers = [];
    var _paymentId_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Refund = _classThis = /** @class */ (function (_super) {
        __extends(Refund_1, _super);
        function Refund_1(input) {
            var _this = _super.call(this, input) || this;
            /**
             * @deprecated Since v2.2, the `items` field will not be used by default. Instead, the `total` field
             * alone will be used to determine the refund amount.
             */
            _this.items = __runInitializers(_this, _items_initializers, void 0);
            /**
             * @deprecated Since v2.2, the `shipping` field will not be used by default. Instead, the `total` field
             * alone will be used to determine the refund amount.
             */
            _this.shipping = (__runInitializers(_this, _items_extraInitializers), __runInitializers(_this, _shipping_initializers, void 0));
            /**
             * @deprecated Since v2.2, the `adjustment` field will not be used by default. Instead, the `total` field
             * alone will be used to determine the refund amount.
             */
            _this.adjustment = (__runInitializers(_this, _shipping_extraInitializers), __runInitializers(_this, _adjustment_initializers, void 0));
            _this.total = (__runInitializers(_this, _adjustment_extraInitializers), __runInitializers(_this, _total_initializers, void 0));
            _this.method = (__runInitializers(_this, _total_extraInitializers), __runInitializers(_this, _method_initializers, void 0));
            _this.reason = (__runInitializers(_this, _method_extraInitializers), __runInitializers(_this, _reason_initializers, void 0));
            _this.state = (__runInitializers(_this, _reason_extraInitializers), __runInitializers(_this, _state_initializers, void 0));
            _this.transactionId = (__runInitializers(_this, _state_extraInitializers), __runInitializers(_this, _transactionId_initializers, void 0));
            _this.lines = (__runInitializers(_this, _transactionId_extraInitializers), __runInitializers(_this, _lines_initializers, void 0));
            _this.payment = (__runInitializers(_this, _lines_extraInitializers), __runInitializers(_this, _payment_initializers, void 0));
            _this.paymentId = (__runInitializers(_this, _payment_extraInitializers), __runInitializers(_this, _paymentId_initializers, void 0));
            _this.metadata = (__runInitializers(_this, _paymentId_extraInitializers), __runInitializers(_this, _metadata_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _metadata_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Refund_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Refund");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _items_decorators = [(0, money_decorator_1.Money)()];
        _shipping_decorators = [(0, money_decorator_1.Money)()];
        _adjustment_decorators = [(0, money_decorator_1.Money)()];
        _total_decorators = [(0, money_decorator_1.Money)()];
        _method_decorators = [(0, typeorm_1.Column)()];
        _reason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _state_decorators = [(0, typeorm_1.Column)('varchar')];
        _transactionId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _lines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return refund_line_entity_1.RefundLine; }, function (line) { return line.refund; }), (0, typeorm_1.JoinTable)()];
        _payment_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return payment_entity_1.Payment; }, function (payment) { return payment.refunds; }), (0, typeorm_1.JoinColumn)()];
        _paymentId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        _metadata_decorators = [(0, typeorm_1.Column)('simple-json')];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomRefundFields; })];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _shipping_decorators, { kind: "field", name: "shipping", static: false, private: false, access: { has: function (obj) { return "shipping" in obj; }, get: function (obj) { return obj.shipping; }, set: function (obj, value) { obj.shipping = value; } }, metadata: _metadata }, _shipping_initializers, _shipping_extraInitializers);
        __esDecorate(null, null, _adjustment_decorators, { kind: "field", name: "adjustment", static: false, private: false, access: { has: function (obj) { return "adjustment" in obj; }, get: function (obj) { return obj.adjustment; }, set: function (obj, value) { obj.adjustment = value; } }, metadata: _metadata }, _adjustment_initializers, _adjustment_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
        __esDecorate(null, null, _transactionId_decorators, { kind: "field", name: "transactionId", static: false, private: false, access: { has: function (obj) { return "transactionId" in obj; }, get: function (obj) { return obj.transactionId; }, set: function (obj, value) { obj.transactionId = value; } }, metadata: _metadata }, _transactionId_initializers, _transactionId_extraInitializers);
        __esDecorate(null, null, _lines_decorators, { kind: "field", name: "lines", static: false, private: false, access: { has: function (obj) { return "lines" in obj; }, get: function (obj) { return obj.lines; }, set: function (obj, value) { obj.lines = value; } }, metadata: _metadata }, _lines_initializers, _lines_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _paymentId_decorators, { kind: "field", name: "paymentId", static: false, private: false, access: { has: function (obj) { return "paymentId" in obj; }, get: function (obj) { return obj.paymentId; }, set: function (obj, value) { obj.paymentId = value; } }, metadata: _metadata }, _paymentId_initializers, _paymentId_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Refund = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Refund = _classThis;
}();
exports.Refund = Refund;
