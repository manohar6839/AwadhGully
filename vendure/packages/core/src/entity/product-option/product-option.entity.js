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
exports.ProductOption = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var product_option_group_entity_1 = require("../product-option-group/product-option-group.entity");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var product_option_translation_entity_1 = require("./product-option-translation.entity");
/**
 * @description
 * A ProductOption is used to differentiate {@link ProductVariant}s from one another.
 *
 * @docsCategory entities
 */
var ProductOption = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _group_decorators;
    var _group_initializers = [];
    var _group_extraInitializers = [];
    var _groupId_decorators;
    var _groupId_initializers = [];
    var _groupId_extraInitializers = [];
    var _productVariants_decorators;
    var _productVariants_initializers = [];
    var _productVariants_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var ProductOption = _classThis = /** @class */ (function (_super) {
        __extends(ProductOption_1, _super);
        function ProductOption_1(input) {
            var _this = _super.call(this, input) || this;
            _this.deletedAt = __runInitializers(_this, _deletedAt_initializers, void 0);
            _this.name = __runInitializers(_this, _deletedAt_extraInitializers);
            _this.code = __runInitializers(_this, _code_initializers, void 0);
            _this.translations = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.group = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _group_initializers, void 0));
            _this.groupId = (__runInitializers(_this, _group_extraInitializers), __runInitializers(_this, _groupId_initializers, void 0));
            _this.productVariants = (__runInitializers(_this, _groupId_extraInitializers), __runInitializers(_this, _productVariants_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _productVariants_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return ProductOption_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ProductOption");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _code_decorators = [(0, typeorm_1.Column)()];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_option_translation_entity_1.ProductOptionTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _group_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return product_option_group_entity_1.ProductOptionGroup; }, function (group) { return group.options; })];
        _groupId_decorators = [(0, entity_id_decorator_1.EntityId)()];
        _productVariants_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return product_variant_entity_1.ProductVariant; }, function (variant) { return variant.options; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomProductOptionFields; })];
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _group_decorators, { kind: "field", name: "group", static: false, private: false, access: { has: function (obj) { return "group" in obj; }, get: function (obj) { return obj.group; }, set: function (obj, value) { obj.group = value; } }, metadata: _metadata }, _group_initializers, _group_extraInitializers);
        __esDecorate(null, null, _groupId_decorators, { kind: "field", name: "groupId", static: false, private: false, access: { has: function (obj) { return "groupId" in obj; }, get: function (obj) { return obj.groupId; }, set: function (obj, value) { obj.groupId = value; } }, metadata: _metadata }, _groupId_initializers, _groupId_extraInitializers);
        __esDecorate(null, null, _productVariants_decorators, { kind: "field", name: "productVariants", static: false, private: false, access: { has: function (obj) { return "productVariants" in obj; }, get: function (obj) { return obj.productVariants; }, set: function (obj, value) { obj.productVariants = value; } }, metadata: _metadata }, _productVariants_initializers, _productVariants_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductOption = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductOption = _classThis;
}();
exports.ProductOption = ProductOption;
