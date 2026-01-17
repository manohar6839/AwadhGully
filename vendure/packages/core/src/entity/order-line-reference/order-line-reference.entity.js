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
exports.OrderLineReference = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var entity_id_decorator_1 = require("../entity-id.decorator");
var order_line_entity_1 = require("../order-line/order-line.entity");
/**
 * @description
 * This is an abstract base class for entities which reference an {@link OrderLine}.
 *
 * @docsCategory entities
 * @docsPage OrderLineReference
 */
var OrderLineReference = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'discriminator' } })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _orderLine_decorators;
    var _orderLine_initializers = [];
    var _orderLine_extraInitializers = [];
    var _orderLineId_decorators;
    var _orderLineId_initializers = [];
    var _orderLineId_extraInitializers = [];
    var OrderLineReference = _classThis = /** @class */ (function (_super) {
        __extends(OrderLineReference_1, _super);
        function OrderLineReference_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.quantity = __runInitializers(_this, _quantity_initializers, void 0);
            _this.orderLine = (__runInitializers(_this, _quantity_extraInitializers), __runInitializers(_this, _orderLine_initializers, void 0));
            _this.orderLineId = (__runInitializers(_this, _orderLine_extraInitializers), __runInitializers(_this, _orderLineId_initializers, void 0));
            __runInitializers(_this, _orderLineId_extraInitializers);
            return _this;
        }
        return OrderLineReference_1;
    }(_classSuper));
    __setFunctionName(_classThis, "OrderLineReference");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _quantity_decorators = [(0, typeorm_1.Column)()];
        _orderLine_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_line_entity_1.OrderLine; }, function (line) { return line.linesReferences; }, { onDelete: 'CASCADE' })];
        _orderLineId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, null, _orderLine_decorators, { kind: "field", name: "orderLine", static: false, private: false, access: { has: function (obj) { return "orderLine" in obj; }, get: function (obj) { return obj.orderLine; }, set: function (obj, value) { obj.orderLine = value; } }, metadata: _metadata }, _orderLine_initializers, _orderLine_extraInitializers);
        __esDecorate(null, null, _orderLineId_decorators, { kind: "field", name: "orderLineId", static: false, private: false, access: { has: function (obj) { return "orderLineId" in obj; }, get: function (obj) { return obj.orderLineId; }, set: function (obj, value) { obj.orderLineId = value; } }, metadata: _metadata }, _orderLineId_initializers, _orderLineId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderLineReference = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderLineReference = _classThis;
}();
exports.OrderLineReference = OrderLineReference;
