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
exports.Asset = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var collection_entity_1 = require("../collection/collection.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var product_entity_1 = require("../product/product.entity");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var tag_entity_1 = require("../tag/tag.entity");
/**
 * @description
 * An Asset represents a file such as an image which can be associated with certain other entities
 * such as Products.
 *
 * @docsCategory entities
 */
var Asset = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _mimeType_decorators;
    var _mimeType_initializers = [];
    var _mimeType_extraInitializers = [];
    var _width_decorators;
    var _width_initializers = [];
    var _width_extraInitializers = [];
    var _height_decorators;
    var _height_initializers = [];
    var _height_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    var _source_decorators;
    var _source_initializers = [];
    var _source_extraInitializers = [];
    var _preview_decorators;
    var _preview_initializers = [];
    var _preview_extraInitializers = [];
    var _focalPoint_decorators;
    var _focalPoint_initializers = [];
    var _focalPoint_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _featuredInCollections_decorators;
    var _featuredInCollections_initializers = [];
    var _featuredInCollections_extraInitializers = [];
    var _featuredInVariants_decorators;
    var _featuredInVariants_initializers = [];
    var _featuredInVariants_extraInitializers = [];
    var _featuredInProducts_decorators;
    var _featuredInProducts_initializers = [];
    var _featuredInProducts_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Asset = _classThis = /** @class */ (function (_super) {
        __extends(Asset_1, _super);
        function Asset_1(input) {
            var _this = _super.call(this, input) || this;
            _this.name = __runInitializers(_this, _name_initializers, void 0);
            _this.type = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _type_initializers, void 0));
            _this.mimeType = (__runInitializers(_this, _type_extraInitializers), __runInitializers(_this, _mimeType_initializers, void 0));
            _this.width = (__runInitializers(_this, _mimeType_extraInitializers), __runInitializers(_this, _width_initializers, void 0));
            _this.height = (__runInitializers(_this, _width_extraInitializers), __runInitializers(_this, _height_initializers, void 0));
            _this.fileSize = (__runInitializers(_this, _height_extraInitializers), __runInitializers(_this, _fileSize_initializers, void 0));
            _this.source = (__runInitializers(_this, _fileSize_extraInitializers), __runInitializers(_this, _source_initializers, void 0));
            _this.preview = (__runInitializers(_this, _source_extraInitializers), __runInitializers(_this, _preview_initializers, void 0));
            _this.focalPoint = (__runInitializers(_this, _preview_extraInitializers), __runInitializers(_this, _focalPoint_initializers, void 0));
            _this.tags = (__runInitializers(_this, _focalPoint_extraInitializers), __runInitializers(_this, _tags_initializers, void 0));
            _this.channels = (__runInitializers(_this, _tags_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.featuredInCollections = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _featuredInCollections_initializers, void 0));
            _this.featuredInVariants = (__runInitializers(_this, _featuredInCollections_extraInitializers), __runInitializers(_this, _featuredInVariants_initializers, void 0));
            _this.featuredInProducts = (__runInitializers(_this, _featuredInVariants_extraInitializers), __runInitializers(_this, _featuredInProducts_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _featuredInProducts_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Asset_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Asset");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, typeorm_1.Column)()];
        _type_decorators = [(0, typeorm_1.Column)('varchar')];
        _mimeType_decorators = [(0, typeorm_1.Column)()];
        _width_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _height_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _fileSize_decorators = [(0, typeorm_1.Column)()];
        _source_decorators = [(0, typeorm_1.Column)()];
        _preview_decorators = [(0, typeorm_1.Column)()];
        _focalPoint_decorators = [(0, typeorm_1.Column)('simple-json', { nullable: true })];
        _tags_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return tag_entity_1.Tag; }), (0, typeorm_1.JoinTable)()];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }), (0, typeorm_1.JoinTable)()];
        _featuredInCollections_decorators = [(0, typeorm_1.OneToMany)(function (type) { return collection_entity_1.Collection; }, function (collection) { return collection.featuredAsset; })];
        _featuredInVariants_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_variant_entity_1.ProductVariant; }, function (productVariant) { return productVariant.featuredAsset; })];
        _featuredInProducts_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_entity_1.Product; }, function (product) { return product.featuredAsset; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomAssetFields; })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: function (obj) { return "mimeType" in obj; }, get: function (obj) { return obj.mimeType; }, set: function (obj, value) { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
        __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: function (obj) { return "width" in obj; }, get: function (obj) { return obj.width; }, set: function (obj, value) { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
        __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: function (obj) { return "height" in obj; }, get: function (obj) { return obj.height; }, set: function (obj, value) { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
        __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: function (obj) { return "source" in obj; }, get: function (obj) { return obj.source; }, set: function (obj, value) { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
        __esDecorate(null, null, _preview_decorators, { kind: "field", name: "preview", static: false, private: false, access: { has: function (obj) { return "preview" in obj; }, get: function (obj) { return obj.preview; }, set: function (obj, value) { obj.preview = value; } }, metadata: _metadata }, _preview_initializers, _preview_extraInitializers);
        __esDecorate(null, null, _focalPoint_decorators, { kind: "field", name: "focalPoint", static: false, private: false, access: { has: function (obj) { return "focalPoint" in obj; }, get: function (obj) { return obj.focalPoint; }, set: function (obj, value) { obj.focalPoint = value; } }, metadata: _metadata }, _focalPoint_initializers, _focalPoint_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _featuredInCollections_decorators, { kind: "field", name: "featuredInCollections", static: false, private: false, access: { has: function (obj) { return "featuredInCollections" in obj; }, get: function (obj) { return obj.featuredInCollections; }, set: function (obj, value) { obj.featuredInCollections = value; } }, metadata: _metadata }, _featuredInCollections_initializers, _featuredInCollections_extraInitializers);
        __esDecorate(null, null, _featuredInVariants_decorators, { kind: "field", name: "featuredInVariants", static: false, private: false, access: { has: function (obj) { return "featuredInVariants" in obj; }, get: function (obj) { return obj.featuredInVariants; }, set: function (obj, value) { obj.featuredInVariants = value; } }, metadata: _metadata }, _featuredInVariants_initializers, _featuredInVariants_extraInitializers);
        __esDecorate(null, null, _featuredInProducts_decorators, { kind: "field", name: "featuredInProducts", static: false, private: false, access: { has: function (obj) { return "featuredInProducts" in obj; }, get: function (obj) { return obj.featuredInProducts; }, set: function (obj, value) { obj.featuredInProducts = value; } }, metadata: _metadata }, _featuredInProducts_initializers, _featuredInProducts_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Asset = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Asset = _classThis;
}();
exports.Asset = Asset;
