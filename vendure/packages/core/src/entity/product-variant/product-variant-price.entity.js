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
exports.ProductVariantPrice = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var money_decorator_1 = require("../money.decorator");
var product_variant_entity_1 = require("./product-variant.entity");
/**
 * @description
 * A ProductVariantPrice is a Channel-specific price for a ProductVariant. For every Channel to
 * which a ProductVariant is assigned, there will be a corresponding ProductVariantPrice entity.
 *
 * @docsCategory entities
 */
var ProductVariantPrice = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _channelId_decorators;
    var _channelId_initializers = [];
    var _channelId_extraInitializers = [];
    var _currencyCode_decorators;
    var _currencyCode_initializers = [];
    var _currencyCode_extraInitializers = [];
    var _variant_decorators;
    var _variant_initializers = [];
    var _variant_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var ProductVariantPrice = _classThis = /** @class */ (function (_super) {
        __extends(ProductVariantPrice_1, _super);
        function ProductVariantPrice_1(input) {
            var _this = _super.call(this, input) || this;
            _this.price = __runInitializers(_this, _price_initializers, void 0);
            _this.channelId = (__runInitializers(_this, _price_extraInitializers), __runInitializers(_this, _channelId_initializers, void 0));
            _this.currencyCode = (__runInitializers(_this, _channelId_extraInitializers), __runInitializers(_this, _currencyCode_initializers, void 0));
            _this.variant = (__runInitializers(_this, _currencyCode_extraInitializers), __runInitializers(_this, _variant_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _variant_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return ProductVariantPrice_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ProductVariantPrice");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _price_decorators = [(0, money_decorator_1.Money)()];
        _channelId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _currencyCode_decorators = [(0, typeorm_1.Column)('varchar')];
        _variant_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return product_variant_entity_1.ProductVariant; }, function (variant) { return variant.productVariantPrices; }, { onDelete: 'CASCADE' })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomProductVariantPriceFields; })];
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _channelId_decorators, { kind: "field", name: "channelId", static: false, private: false, access: { has: function (obj) { return "channelId" in obj; }, get: function (obj) { return obj.channelId; }, set: function (obj, value) { obj.channelId = value; } }, metadata: _metadata }, _channelId_initializers, _channelId_extraInitializers);
        __esDecorate(null, null, _currencyCode_decorators, { kind: "field", name: "currencyCode", static: false, private: false, access: { has: function (obj) { return "currencyCode" in obj; }, get: function (obj) { return obj.currencyCode; }, set: function (obj, value) { obj.currencyCode = value; } }, metadata: _metadata }, _currencyCode_initializers, _currencyCode_extraInitializers);
        __esDecorate(null, null, _variant_decorators, { kind: "field", name: "variant", static: false, private: false, access: { has: function (obj) { return "variant" in obj; }, get: function (obj) { return obj.variant; }, set: function (obj, value) { obj.variant = value; } }, metadata: _metadata }, _variant_initializers, _variant_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductVariantPrice = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductVariantPrice = _classThis;
}();
exports.ProductVariantPrice = ProductVariantPrice;
