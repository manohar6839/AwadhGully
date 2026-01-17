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
exports.Facet = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var facet_value_entity_1 = require("../facet-value/facet-value.entity");
var facet_translation_entity_1 = require("./facet-translation.entity");
/**
 * @description
 * A Facet is a class of properties which can be applied to a {@link Product} or {@link ProductVariant}.
 * They are used to enable [faceted search](https://en.wikipedia.org/wiki/Faceted_search) whereby products
 * can be filtered along a number of dimensions (facets).
 *
 * For example, there could be a Facet named "Brand" which has a number of {@link FacetValue}s representing
 * the various brands of product, e.g. "Apple", "Samsung", "Dell", "HP" etc.
 *
 * @docsCategory entities
 */
var Facet = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _isPrivate_decorators;
    var _isPrivate_initializers = [];
    var _isPrivate_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _values_decorators;
    var _values_initializers = [];
    var _values_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var Facet = _classThis = /** @class */ (function (_super) {
        __extends(Facet_1, _super);
        function Facet_1(input) {
            var _this = _super.call(this, input) || this;
            _this.isPrivate = __runInitializers(_this, _isPrivate_initializers, void 0);
            _this.code = (__runInitializers(_this, _isPrivate_extraInitializers), __runInitializers(_this, _code_initializers, void 0));
            _this.translations = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.values = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _values_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _values_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.channels = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            __runInitializers(_this, _channels_extraInitializers);
            return _this;
        }
        return Facet_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Facet");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _isPrivate_decorators = [(0, typeorm_1.Column)({ default: false })];
        _code_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return facet_translation_entity_1.FacetTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _values_decorators = [(0, typeorm_1.OneToMany)(function (type) { return facet_value_entity_1.FacetValue; }, function (value) { return value.facet; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomFacetFields; })];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.facets; }), (0, typeorm_1.JoinTable)()];
        __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: function (obj) { return "isPrivate" in obj; }, get: function (obj) { return obj.isPrivate; }, set: function (obj, value) { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _values_decorators, { kind: "field", name: "values", static: false, private: false, access: { has: function (obj) { return "values" in obj; }, get: function (obj) { return obj.values; }, set: function (obj, value) { obj.values = value; } }, metadata: _metadata }, _values_initializers, _values_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Facet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Facet = _classThis;
}();
exports.Facet = Facet;
