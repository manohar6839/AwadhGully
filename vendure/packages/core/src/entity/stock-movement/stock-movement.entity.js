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
exports.StockMovement = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var stock_location_entity_1 = require("../stock-location/stock-location.entity");
/**
 * @description
 * A StockMovement is created whenever stock of a particular ProductVariant goes in
 * or out.
 *
 * @docsCategory entities
 * @docsPage StockMovement
 * @docsWeight 0
 */
var StockMovement = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'discriminator' } })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _productVariant_decorators;
    var _productVariant_initializers = [];
    var _productVariant_extraInitializers = [];
    var _stockLocation_decorators;
    var _stockLocation_initializers = [];
    var _stockLocation_extraInitializers = [];
    var _stockLocationId_decorators;
    var _stockLocationId_initializers = [];
    var _stockLocationId_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var StockMovement = _classThis = /** @class */ (function (_super) {
        __extends(StockMovement_1, _super);
        function StockMovement_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = __runInitializers(_this, _type_initializers, void 0);
            _this.productVariant = (__runInitializers(_this, _type_extraInitializers), __runInitializers(_this, _productVariant_initializers, void 0));
            _this.stockLocation = (__runInitializers(_this, _productVariant_extraInitializers), __runInitializers(_this, _stockLocation_initializers, void 0));
            _this.stockLocationId = (__runInitializers(_this, _stockLocation_extraInitializers), __runInitializers(_this, _stockLocationId_initializers, void 0));
            _this.quantity = (__runInitializers(_this, _stockLocationId_extraInitializers), __runInitializers(_this, _quantity_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _quantity_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return StockMovement_1;
    }(_classSuper));
    __setFunctionName(_classThis, "StockMovement");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _type_decorators = [(0, typeorm_1.Column)({ nullable: false, type: 'varchar' })];
        _productVariant_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return product_variant_entity_1.ProductVariant; }, function (variant) { return variant.stockMovements; })];
        _stockLocation_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return stock_location_entity_1.StockLocation; }, function (stockLocation) { return stockLocation.stockMovements; }, { onDelete: 'CASCADE' })];
        _stockLocationId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        _quantity_decorators = [(0, typeorm_1.Column)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomStockMovementFields; })];
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _productVariant_decorators, { kind: "field", name: "productVariant", static: false, private: false, access: { has: function (obj) { return "productVariant" in obj; }, get: function (obj) { return obj.productVariant; }, set: function (obj, value) { obj.productVariant = value; } }, metadata: _metadata }, _productVariant_initializers, _productVariant_extraInitializers);
        __esDecorate(null, null, _stockLocation_decorators, { kind: "field", name: "stockLocation", static: false, private: false, access: { has: function (obj) { return "stockLocation" in obj; }, get: function (obj) { return obj.stockLocation; }, set: function (obj, value) { obj.stockLocation = value; } }, metadata: _metadata }, _stockLocation_initializers, _stockLocation_extraInitializers);
        __esDecorate(null, null, _stockLocationId_decorators, { kind: "field", name: "stockLocationId", static: false, private: false, access: { has: function (obj) { return "stockLocationId" in obj; }, get: function (obj) { return obj.stockLocationId; }, set: function (obj, value) { obj.stockLocationId = value; } }, metadata: _metadata }, _stockLocationId_initializers, _stockLocationId_extraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StockMovement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StockMovement = _classThis;
}();
exports.StockMovement = StockMovement;
