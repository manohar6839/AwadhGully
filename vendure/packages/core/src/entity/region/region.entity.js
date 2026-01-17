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
exports.Region = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var region_translation_entity_1 = require("./region-translation.entity");
/**
 * @description
 * A Region represents a geographical administrative unit, such as a Country, Province, State, Prefecture etc.
 * This is an abstract class which is extended by the {@link Country} and {@link Province} entities.
 * Regions can be grouped into {@link Zone}s which are in turn used to determine applicable shipping and taxes for an {@link Order}.
 *
 * @docsCategory entities
 */
var Region = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'discriminator' } })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _parent_decorators;
    var _parent_initializers = [];
    var _parent_extraInitializers = [];
    var _parentId_decorators;
    var _parentId_initializers = [];
    var _parentId_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Region = _classThis = /** @class */ (function (_super) {
        __extends(Region_1, _super);
        function Region_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * @description
             * A code representing the region. The code format will depend on the type of region. For
             * example, a Country code will be a 2-letter ISO code, whereas a Province code could use
             * a format relevant to the type of province, e.g. a US state code like "CA".
             */
            _this.code = __runInitializers(_this, _code_initializers, void 0);
            _this.type = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _type_initializers, void 0));
            _this.name = __runInitializers(_this, _type_extraInitializers);
            _this.parent = __runInitializers(_this, _parent_initializers, void 0);
            _this.parentId = (__runInitializers(_this, _parent_extraInitializers), __runInitializers(_this, _parentId_initializers, void 0));
            _this.enabled = (__runInitializers(_this, _parentId_extraInitializers), __runInitializers(_this, _enabled_initializers, void 0));
            _this.translations = (__runInitializers(_this, _enabled_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Region_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Region");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _code_decorators = [(0, typeorm_1.Column)()];
        _type_decorators = [(0, typeorm_1.Column)({ nullable: false, type: 'varchar' })];
        _parent_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return Region; }, { nullable: true, onDelete: 'SET NULL' })];
        _parentId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _enabled_decorators = [(0, typeorm_1.Column)()];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return region_translation_entity_1.RegionTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomRegionFields; })];
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: function (obj) { return "parent" in obj; }, get: function (obj) { return obj.parent; }, set: function (obj, value) { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
        __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: function (obj) { return "parentId" in obj; }, get: function (obj) { return obj.parentId; }, set: function (obj, value) { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Region = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Region = _classThis;
}();
exports.Region = Region;
