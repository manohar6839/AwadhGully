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
exports.FacetValue = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var facet_entity_1 = require("../facet/facet.entity");
var product_entity_1 = require("../product/product.entity");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var facet_value_translation_entity_1 = require("./facet-value-translation.entity");
/**
 * @description
 * A particular value of a {@link Facet}.
 *
 * @docsCategory entities
 */
var FacetValue = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _facet_decorators;
    var _facet_initializers = [];
    var _facet_extraInitializers = [];
    var _facetId_decorators;
    var _facetId_initializers = [];
    var _facetId_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _products_decorators;
    var _products_initializers = [];
    var _products_extraInitializers = [];
    var _productVariants_decorators;
    var _productVariants_initializers = [];
    var _productVariants_extraInitializers = [];
    var FacetValue = _classThis = /** @class */ (function (_super) {
        __extends(FacetValue_1, _super);
        function FacetValue_1(input) {
            var _this = _super.call(this, input) || this;
            _this.code = __runInitializers(_this, _code_initializers, void 0);
            _this.translations = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.facet = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _facet_initializers, void 0));
            _this.facetId = (__runInitializers(_this, _facet_extraInitializers), __runInitializers(_this, _facetId_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _facetId_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.channels = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.products = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _products_initializers, void 0));
            _this.productVariants = (__runInitializers(_this, _products_extraInitializers), __runInitializers(_this, _productVariants_initializers, void 0));
            __runInitializers(_this, _productVariants_extraInitializers);
            return _this;
        }
        return FacetValue_1;
    }(_classSuper));
    __setFunctionName(_classThis, "FacetValue");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _code_decorators = [(0, typeorm_1.Column)()];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return facet_value_translation_entity_1.FacetValueTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _facet_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return facet_entity_1.Facet; }, function (group) { return group.values; }, { onDelete: 'CASCADE' })];
        _facetId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomFacetValueFields; })];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.facetValues; }), (0, typeorm_1.JoinTable)()];
        _products_decorators = [(0, typeorm_1.ManyToMany)(function () { return product_entity_1.Product; }, function (product) { return product.facetValues; }, { onDelete: 'CASCADE' })];
        _productVariants_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return product_variant_entity_1.ProductVariant; }, function (productVariant) { return productVariant.facetValues; })];
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _facet_decorators, { kind: "field", name: "facet", static: false, private: false, access: { has: function (obj) { return "facet" in obj; }, get: function (obj) { return obj.facet; }, set: function (obj, value) { obj.facet = value; } }, metadata: _metadata }, _facet_initializers, _facet_extraInitializers);
        __esDecorate(null, null, _facetId_decorators, { kind: "field", name: "facetId", static: false, private: false, access: { has: function (obj) { return "facetId" in obj; }, get: function (obj) { return obj.facetId; }, set: function (obj, value) { obj.facetId = value; } }, metadata: _metadata }, _facetId_initializers, _facetId_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _products_decorators, { kind: "field", name: "products", static: false, private: false, access: { has: function (obj) { return "products" in obj; }, get: function (obj) { return obj.products; }, set: function (obj, value) { obj.products = value; } }, metadata: _metadata }, _products_initializers, _products_extraInitializers);
        __esDecorate(null, null, _productVariants_decorators, { kind: "field", name: "productVariants", static: false, private: false, access: { has: function (obj) { return "productVariants" in obj; }, get: function (obj) { return obj.productVariants; }, set: function (obj, value) { obj.productVariants = value; } }, metadata: _metadata }, _productVariants_initializers, _productVariants_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FacetValue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FacetValue = _classThis;
}();
exports.FacetValue = FacetValue;
