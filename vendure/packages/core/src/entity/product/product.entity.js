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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var asset_entity_1 = require("../asset/asset.entity");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var facet_value_entity_1 = require("../facet-value/facet-value.entity");
var product_option_group_entity_1 = require("../product-option-group/product-option-group.entity");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var product_asset_entity_1 = require("./product-asset.entity");
var product_translation_entity_1 = require("./product-translation.entity");
/**
 * @description
 * A Product contains one or more {@link ProductVariant}s and serves as a container for those variants,
 * providing an overall name, description etc.
 *
 * @docsCategory entities
 */
var Product = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _featuredAsset_decorators;
    var _featuredAsset_initializers = [];
    var _featuredAsset_extraInitializers = [];
    var _featuredAssetId_decorators;
    var _featuredAssetId_initializers = [];
    var _featuredAssetId_extraInitializers = [];
    var _assets_decorators;
    var _assets_initializers = [];
    var _assets_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _variants_decorators;
    var _variants_initializers = [];
    var _variants_extraInitializers = [];
    var _optionGroups_decorators;
    var _optionGroups_initializers = [];
    var _optionGroups_extraInitializers = [];
    var _facetValues_decorators;
    var _facetValues_initializers = [];
    var _facetValues_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Product = _classThis = /** @class */ (function (_super) {
        __extends(Product_1, _super);
        function Product_1(input) {
            var _this = _super.call(this, input) || this;
            _this.deletedAt = __runInitializers(_this, _deletedAt_initializers, void 0);
            _this.name = __runInitializers(_this, _deletedAt_extraInitializers);
            _this.enabled = __runInitializers(_this, _enabled_initializers, void 0);
            _this.featuredAsset = (__runInitializers(_this, _enabled_extraInitializers), __runInitializers(_this, _featuredAsset_initializers, void 0));
            _this.featuredAssetId = (__runInitializers(_this, _featuredAsset_extraInitializers), __runInitializers(_this, _featuredAssetId_initializers, void 0));
            _this.assets = (__runInitializers(_this, _featuredAssetId_extraInitializers), __runInitializers(_this, _assets_initializers, void 0));
            _this.translations = (__runInitializers(_this, _assets_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.variants = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _variants_initializers, void 0));
            _this.optionGroups = (__runInitializers(_this, _variants_extraInitializers), __runInitializers(_this, _optionGroups_initializers, void 0));
            _this.facetValues = (__runInitializers(_this, _optionGroups_extraInitializers), __runInitializers(_this, _facetValues_initializers, void 0));
            _this.channels = (__runInitializers(_this, _facetValues_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Product_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Product");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _enabled_decorators = [(0, typeorm_1.Column)({ default: true })];
        _featuredAsset_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return asset_entity_1.Asset; }, function (asset) { return asset.featuredInProducts; }, { onDelete: 'SET NULL' })];
        _featuredAssetId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _assets_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_asset_entity_1.ProductAsset; }, function (productAsset) { return productAsset.product; })];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_translation_entity_1.ProductTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _variants_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_variant_entity_1.ProductVariant; }, function (variant) { return variant.product; })];
        _optionGroups_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_option_group_entity_1.ProductOptionGroup; }, function (optionGroup) { return optionGroup.product; })];
        _facetValues_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return facet_value_entity_1.FacetValue; }, function (facetValue) { return facetValue.products; }), (0, typeorm_1.JoinTable)()];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.products; }), (0, typeorm_1.JoinTable)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomProductFields; })];
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _featuredAsset_decorators, { kind: "field", name: "featuredAsset", static: false, private: false, access: { has: function (obj) { return "featuredAsset" in obj; }, get: function (obj) { return obj.featuredAsset; }, set: function (obj, value) { obj.featuredAsset = value; } }, metadata: _metadata }, _featuredAsset_initializers, _featuredAsset_extraInitializers);
        __esDecorate(null, null, _featuredAssetId_decorators, { kind: "field", name: "featuredAssetId", static: false, private: false, access: { has: function (obj) { return "featuredAssetId" in obj; }, get: function (obj) { return obj.featuredAssetId; }, set: function (obj, value) { obj.featuredAssetId = value; } }, metadata: _metadata }, _featuredAssetId_initializers, _featuredAssetId_extraInitializers);
        __esDecorate(null, null, _assets_decorators, { kind: "field", name: "assets", static: false, private: false, access: { has: function (obj) { return "assets" in obj; }, get: function (obj) { return obj.assets; }, set: function (obj, value) { obj.assets = value; } }, metadata: _metadata }, _assets_initializers, _assets_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _variants_decorators, { kind: "field", name: "variants", static: false, private: false, access: { has: function (obj) { return "variants" in obj; }, get: function (obj) { return obj.variants; }, set: function (obj, value) { obj.variants = value; } }, metadata: _metadata }, _variants_initializers, _variants_extraInitializers);
        __esDecorate(null, null, _optionGroups_decorators, { kind: "field", name: "optionGroups", static: false, private: false, access: { has: function (obj) { return "optionGroups" in obj; }, get: function (obj) { return obj.optionGroups; }, set: function (obj, value) { obj.optionGroups = value; } }, metadata: _metadata }, _optionGroups_initializers, _optionGroups_extraInitializers);
        __esDecorate(null, null, _facetValues_decorators, { kind: "field", name: "facetValues", static: false, private: false, access: { has: function (obj) { return "facetValues" in obj; }, get: function (obj) { return obj.facetValues; }, set: function (obj, value) { obj.facetValues = value; } }, metadata: _metadata }, _facetValues_initializers, _facetValues_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
}();
exports.Product = Product;
