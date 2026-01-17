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
exports.ProductVariantAsset = void 0;
var typeorm_1 = require("typeorm");
var orderable_asset_entity_1 = require("../asset/orderable-asset.entity");
var product_variant_entity_1 = require("./product-variant.entity");
var ProductVariantAsset = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = orderable_asset_entity_1.OrderableAsset;
    var _productVariantId_decorators;
    var _productVariantId_initializers = [];
    var _productVariantId_extraInitializers = [];
    var _productVariant_decorators;
    var _productVariant_initializers = [];
    var _productVariant_extraInitializers = [];
    var ProductVariantAsset = _classThis = /** @class */ (function (_super) {
        __extends(ProductVariantAsset_1, _super);
        function ProductVariantAsset_1(input) {
            var _this = _super.call(this, input) || this;
            _this.productVariantId = __runInitializers(_this, _productVariantId_initializers, void 0);
            _this.productVariant = (__runInitializers(_this, _productVariantId_extraInitializers), __runInitializers(_this, _productVariant_initializers, void 0));
            __runInitializers(_this, _productVariant_extraInitializers);
            return _this;
        }
        return ProductVariantAsset_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ProductVariantAsset");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _productVariantId_decorators = [(0, typeorm_1.Column)()];
        _productVariant_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return product_variant_entity_1.ProductVariant; }, function (variant) { return variant.assets; }, { onDelete: 'CASCADE' })];
        __esDecorate(null, null, _productVariantId_decorators, { kind: "field", name: "productVariantId", static: false, private: false, access: { has: function (obj) { return "productVariantId" in obj; }, get: function (obj) { return obj.productVariantId; }, set: function (obj, value) { obj.productVariantId = value; } }, metadata: _metadata }, _productVariantId_initializers, _productVariantId_extraInitializers);
        __esDecorate(null, null, _productVariant_decorators, { kind: "field", name: "productVariant", static: false, private: false, access: { has: function (obj) { return "productVariant" in obj; }, get: function (obj) { return obj.productVariant; }, set: function (obj, value) { obj.productVariant = value; } }, metadata: _metadata }, _productVariant_initializers, _productVariant_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductVariantAsset = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductVariantAsset = _classThis;
}();
exports.ProductVariantAsset = ProductVariantAsset;
