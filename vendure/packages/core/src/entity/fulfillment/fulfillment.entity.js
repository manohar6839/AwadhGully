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
exports.Fulfillment = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var order_entity_1 = require("../order/order.entity");
var fulfillment_line_entity_1 = require("../order-line-reference/fulfillment-line.entity");
/**
 * @description
 * This entity represents a fulfillment of an Order or part of it, i.e. which {@link OrderLine}s have been
 * delivered to the Customer after successful payment.
 *
 * @docsCategory entities
 */
var Fulfillment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _trackingCode_decorators;
    var _trackingCode_initializers = [];
    var _trackingCode_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _handlerCode_decorators;
    var _handlerCode_initializers = [];
    var _handlerCode_extraInitializers = [];
    var _lines_decorators;
    var _lines_initializers = [];
    var _lines_extraInitializers = [];
    var _orders_decorators;
    var _orders_initializers = [];
    var _orders_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Fulfillment = _classThis = /** @class */ (function (_super) {
        __extends(Fulfillment_1, _super);
        function Fulfillment_1(input) {
            var _this = _super.call(this, input) || this;
            _this.state = __runInitializers(_this, _state_initializers, void 0);
            _this.trackingCode = (__runInitializers(_this, _state_extraInitializers), __runInitializers(_this, _trackingCode_initializers, void 0));
            _this.method = (__runInitializers(_this, _trackingCode_extraInitializers), __runInitializers(_this, _method_initializers, void 0));
            _this.handlerCode = (__runInitializers(_this, _method_extraInitializers), __runInitializers(_this, _handlerCode_initializers, void 0));
            _this.lines = (__runInitializers(_this, _handlerCode_extraInitializers), __runInitializers(_this, _lines_initializers, void 0));
            _this.orders = (__runInitializers(_this, _lines_extraInitializers), __runInitializers(_this, _orders_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _orders_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Fulfillment_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Fulfillment");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _state_decorators = [(0, typeorm_1.Column)('varchar')];
        _trackingCode_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _method_decorators = [(0, typeorm_1.Column)()];
        _handlerCode_decorators = [(0, typeorm_1.Column)()];
        _lines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return fulfillment_line_entity_1.FulfillmentLine; }, function (fulfillmentLine) { return fulfillmentLine.fulfillment; })];
        _orders_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return order_entity_1.Order; }, function (order) { return order.fulfillments; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomFulfillmentFields; })];
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
        __esDecorate(null, null, _trackingCode_decorators, { kind: "field", name: "trackingCode", static: false, private: false, access: { has: function (obj) { return "trackingCode" in obj; }, get: function (obj) { return obj.trackingCode; }, set: function (obj, value) { obj.trackingCode = value; } }, metadata: _metadata }, _trackingCode_initializers, _trackingCode_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _handlerCode_decorators, { kind: "field", name: "handlerCode", static: false, private: false, access: { has: function (obj) { return "handlerCode" in obj; }, get: function (obj) { return obj.handlerCode; }, set: function (obj, value) { obj.handlerCode = value; } }, metadata: _metadata }, _handlerCode_initializers, _handlerCode_extraInitializers);
        __esDecorate(null, null, _lines_decorators, { kind: "field", name: "lines", static: false, private: false, access: { has: function (obj) { return "lines" in obj; }, get: function (obj) { return obj.lines; }, set: function (obj, value) { obj.lines = value; } }, metadata: _metadata }, _lines_initializers, _lines_extraInitializers);
        __esDecorate(null, null, _orders_decorators, { kind: "field", name: "orders", static: false, private: false, access: { has: function (obj) { return "orders" in obj; }, get: function (obj) { return obj.orders; }, set: function (obj, value) { obj.orders = value; } }, metadata: _metadata }, _orders_initializers, _orders_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Fulfillment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Fulfillment = _classThis;
}();
exports.Fulfillment = Fulfillment;
