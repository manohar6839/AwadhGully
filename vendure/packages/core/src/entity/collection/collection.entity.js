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
exports.Collection = void 0;
var typeorm_1 = require("typeorm");
var asset_entity_1 = require("../asset/asset.entity");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var collection_asset_entity_1 = require("./collection-asset.entity");
var collection_translation_entity_1 = require("./collection-translation.entity");
/**
 * @description
 * A Collection is a grouping of {@link Product}s based on various configurable criteria.
 *
 * @docsCategory entities
 */
var Collection = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.Tree)('closure-table')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _isRoot_decorators;
    var _isRoot_initializers = [];
    var _isRoot_extraInitializers = [];
    var _position_decorators;
    var _position_initializers = [];
    var _position_extraInitializers = [];
    var _isPrivate_decorators;
    var _isPrivate_initializers = [];
    var _isPrivate_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _featuredAsset_decorators;
    var _featuredAsset_initializers = [];
    var _featuredAsset_extraInitializers = [];
    var _assets_decorators;
    var _assets_initializers = [];
    var _assets_extraInitializers = [];
    var _filters_decorators;
    var _filters_initializers = [];
    var _filters_extraInitializers = [];
    var _inheritFilters_decorators;
    var _inheritFilters_initializers = [];
    var _inheritFilters_extraInitializers = [];
    var _productVariants_decorators;
    var _productVariants_initializers = [];
    var _productVariants_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _children_decorators;
    var _children_initializers = [];
    var _children_extraInitializers = [];
    var _parent_decorators;
    var _parent_initializers = [];
    var _parent_extraInitializers = [];
    var _parentId_decorators;
    var _parentId_initializers = [];
    var _parentId_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var Collection = _classThis = /** @class */ (function (_super) {
        __extends(Collection_1, _super);
        function Collection_1(input) {
            var _this = _super.call(this, input) || this;
            _this.isRoot = __runInitializers(_this, _isRoot_initializers, void 0);
            _this.position = (__runInitializers(_this, _isRoot_extraInitializers), __runInitializers(_this, _position_initializers, void 0));
            _this.isPrivate = (__runInitializers(_this, _position_extraInitializers), __runInitializers(_this, _isPrivate_initializers, void 0));
            _this.name = __runInitializers(_this, _isPrivate_extraInitializers);
            _this.translations = __runInitializers(_this, _translations_initializers, void 0);
            _this.featuredAsset = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _featuredAsset_initializers, void 0));
            _this.assets = (__runInitializers(_this, _featuredAsset_extraInitializers), __runInitializers(_this, _assets_initializers, void 0));
            _this.filters = (__runInitializers(_this, _assets_extraInitializers), __runInitializers(_this, _filters_initializers, void 0));
            /**
             * @since 2.0.0
             */
            _this.inheritFilters = (__runInitializers(_this, _filters_extraInitializers), __runInitializers(_this, _inheritFilters_initializers, void 0));
            _this.productVariants = (__runInitializers(_this, _inheritFilters_extraInitializers), __runInitializers(_this, _productVariants_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _productVariants_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.children = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _children_initializers, void 0));
            _this.parent = (__runInitializers(_this, _children_extraInitializers), __runInitializers(_this, _parent_initializers, void 0));
            _this.parentId = (__runInitializers(_this, _parent_extraInitializers), __runInitializers(_this, _parentId_initializers, void 0));
            _this.channels = (__runInitializers(_this, _parentId_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            __runInitializers(_this, _channels_extraInitializers);
            return _this;
        }
        return Collection_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Collection");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _isRoot_decorators = [(0, typeorm_1.Column)({ default: false })];
        _position_decorators = [(0, typeorm_1.Column)()];
        _isPrivate_decorators = [(0, typeorm_1.Column)({ default: false })];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return collection_translation_entity_1.CollectionTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _featuredAsset_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return asset_entity_1.Asset; }, function (asset) { return asset.featuredInCollections; }, { onDelete: 'SET NULL' })];
        _assets_decorators = [(0, typeorm_1.OneToMany)(function (type) { return collection_asset_entity_1.CollectionAsset; }, function (collectionAsset) { return collectionAsset.collection; })];
        _filters_decorators = [(0, typeorm_1.Column)('simple-json')];
        _inheritFilters_decorators = [(0, typeorm_1.Column)({ default: true })];
        _productVariants_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return product_variant_entity_1.ProductVariant; }, function (productVariant) { return productVariant.collections; }), (0, typeorm_1.JoinTable)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomCollectionFields; })];
        _children_decorators = [(0, typeorm_1.TreeChildren)()];
        _parent_decorators = [(0, typeorm_1.TreeParent)()];
        _parentId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.collections; }), (0, typeorm_1.JoinTable)()];
        __esDecorate(null, null, _isRoot_decorators, { kind: "field", name: "isRoot", static: false, private: false, access: { has: function (obj) { return "isRoot" in obj; }, get: function (obj) { return obj.isRoot; }, set: function (obj, value) { obj.isRoot = value; } }, metadata: _metadata }, _isRoot_initializers, _isRoot_extraInitializers);
        __esDecorate(null, null, _position_decorators, { kind: "field", name: "position", static: false, private: false, access: { has: function (obj) { return "position" in obj; }, get: function (obj) { return obj.position; }, set: function (obj, value) { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
        __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: function (obj) { return "isPrivate" in obj; }, get: function (obj) { return obj.isPrivate; }, set: function (obj, value) { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _featuredAsset_decorators, { kind: "field", name: "featuredAsset", static: false, private: false, access: { has: function (obj) { return "featuredAsset" in obj; }, get: function (obj) { return obj.featuredAsset; }, set: function (obj, value) { obj.featuredAsset = value; } }, metadata: _metadata }, _featuredAsset_initializers, _featuredAsset_extraInitializers);
        __esDecorate(null, null, _assets_decorators, { kind: "field", name: "assets", static: false, private: false, access: { has: function (obj) { return "assets" in obj; }, get: function (obj) { return obj.assets; }, set: function (obj, value) { obj.assets = value; } }, metadata: _metadata }, _assets_initializers, _assets_extraInitializers);
        __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: function (obj) { return "filters" in obj; }, get: function (obj) { return obj.filters; }, set: function (obj, value) { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
        __esDecorate(null, null, _inheritFilters_decorators, { kind: "field", name: "inheritFilters", static: false, private: false, access: { has: function (obj) { return "inheritFilters" in obj; }, get: function (obj) { return obj.inheritFilters; }, set: function (obj, value) { obj.inheritFilters = value; } }, metadata: _metadata }, _inheritFilters_initializers, _inheritFilters_extraInitializers);
        __esDecorate(null, null, _productVariants_decorators, { kind: "field", name: "productVariants", static: false, private: false, access: { has: function (obj) { return "productVariants" in obj; }, get: function (obj) { return obj.productVariants; }, set: function (obj, value) { obj.productVariants = value; } }, metadata: _metadata }, _productVariants_initializers, _productVariants_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: function (obj) { return "children" in obj; }, get: function (obj) { return obj.children; }, set: function (obj, value) { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
        __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: function (obj) { return "parent" in obj; }, get: function (obj) { return obj.parent; }, set: function (obj, value) { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
        __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: function (obj) { return "parentId" in obj; }, get: function (obj) { return obj.parentId; }, set: function (obj, value) { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Collection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Collection = _classThis;
}();
exports.Collection = Collection;
