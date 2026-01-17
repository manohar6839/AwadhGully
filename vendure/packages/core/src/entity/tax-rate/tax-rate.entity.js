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
exports.TaxRate = void 0;
var typeorm_1 = require("typeorm");
var tax_utils_1 = require("../../common/tax-utils");
var utils_1 = require("../../common/utils");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var customer_group_entity_1 = require("../customer-group/customer-group.entity");
var entity_id_decorator_1 = require("../entity-id.decorator");
var tax_category_entity_1 = require("../tax-category/tax-category.entity");
var value_transformers_1 = require("../value-transformers");
var zone_entity_1 = require("../zone/zone.entity");
/**
 * @description
 * A TaxRate defines the rate of tax to apply to a {@link ProductVariant} based on three factors:
 *
 * 1. the ProductVariant's {@link TaxCategory}
 * 2. the applicable {@link Zone} ("applicable" being defined by the configured {@link TaxZoneStrategy})
 * 3. the {@link CustomerGroup} of the current Customer
 *
 * @docsCategory entities
 */
var TaxRate = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _value_decorators;
    var _value_initializers = [];
    var _value_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _zone_decorators;
    var _zone_initializers = [];
    var _zone_extraInitializers = [];
    var _zoneId_decorators;
    var _zoneId_initializers = [];
    var _zoneId_extraInitializers = [];
    var _customerGroup_decorators;
    var _customerGroup_initializers = [];
    var _customerGroup_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var TaxRate = _classThis = /** @class */ (function (_super) {
        __extends(TaxRate_1, _super);
        function TaxRate_1(input) {
            var _this = _super.call(this, input) || this;
            _this.name = __runInitializers(_this, _name_initializers, void 0);
            _this.enabled = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _enabled_initializers, void 0));
            _this.value = (__runInitializers(_this, _enabled_extraInitializers), __runInitializers(_this, _value_initializers, void 0));
            _this.category = (__runInitializers(_this, _value_extraInitializers), __runInitializers(_this, _category_initializers, void 0));
            _this.categoryId = (__runInitializers(_this, _category_extraInitializers), __runInitializers(_this, _categoryId_initializers, void 0));
            _this.zone = (__runInitializers(_this, _categoryId_extraInitializers), __runInitializers(_this, _zone_initializers, void 0));
            _this.zoneId = (__runInitializers(_this, _zone_extraInitializers), __runInitializers(_this, _zoneId_initializers, void 0));
            _this.customerGroup = (__runInitializers(_this, _zoneId_extraInitializers), __runInitializers(_this, _customerGroup_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _customerGroup_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        /**
         * Returns the tax component of a given gross price.
         */
        TaxRate_1.prototype.taxComponentOf = function (grossPrice) {
            return (0, tax_utils_1.taxComponentOf)(grossPrice, this.value);
        };
        /**
         * Given a gross (tax-inclusive) price, returns the net price.
         */
        TaxRate_1.prototype.netPriceOf = function (grossPrice) {
            return (0, tax_utils_1.netPriceOf)(grossPrice, this.value);
        };
        /**
         * Returns the tax applicable to the given net price.
         */
        TaxRate_1.prototype.taxPayableOn = function (netPrice) {
            return (0, tax_utils_1.taxPayableOn)(netPrice, this.value);
        };
        /**
         * Given a net price, return the gross price (net + tax)
         */
        TaxRate_1.prototype.grossPriceOf = function (netPrice) {
            return (0, tax_utils_1.grossPriceOf)(netPrice, this.value);
        };
        TaxRate_1.prototype.apply = function (price) {
            return {
                description: this.name,
                taxRate: this.value,
            };
        };
        TaxRate_1.prototype.test = function (zone, taxCategory) {
            var taxCategoryId = this.isId(taxCategory) ? taxCategory : taxCategory.id;
            var zoneId = this.isId(zone) ? zone : zone.id;
            return (0, utils_1.idsAreEqual)(taxCategoryId, this.categoryId) && (0, utils_1.idsAreEqual)(zoneId, this.zoneId);
        };
        TaxRate_1.prototype.isId = function (entityOrId) {
            return typeof entityOrId === 'string' || typeof entityOrId === 'number';
        };
        return TaxRate_1;
    }(_classSuper));
    __setFunctionName(_classThis, "TaxRate");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, typeorm_1.Column)()];
        _enabled_decorators = [(0, typeorm_1.Column)()];
        _value_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, transformer: new value_transformers_1.DecimalTransformer() })];
        _category_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return tax_category_entity_1.TaxCategory; }, function (taxCategory) { return taxCategory.taxRates; })];
        _categoryId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _zone_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return zone_entity_1.Zone; }, function (zone) { return zone.taxRates; })];
        _zoneId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _customerGroup_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return customer_group_entity_1.CustomerGroup; }, function (customerGroup) { return customerGroup.taxRates; }, { nullable: true })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomTaxRateFields; })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: function (obj) { return "value" in obj; }, get: function (obj) { return obj.value; }, set: function (obj, value) { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
        __esDecorate(null, null, _zone_decorators, { kind: "field", name: "zone", static: false, private: false, access: { has: function (obj) { return "zone" in obj; }, get: function (obj) { return obj.zone; }, set: function (obj, value) { obj.zone = value; } }, metadata: _metadata }, _zone_initializers, _zone_extraInitializers);
        __esDecorate(null, null, _zoneId_decorators, { kind: "field", name: "zoneId", static: false, private: false, access: { has: function (obj) { return "zoneId" in obj; }, get: function (obj) { return obj.zoneId; }, set: function (obj, value) { obj.zoneId = value; } }, metadata: _metadata }, _zoneId_initializers, _zoneId_extraInitializers);
        __esDecorate(null, null, _customerGroup_decorators, { kind: "field", name: "customerGroup", static: false, private: false, access: { has: function (obj) { return "customerGroup" in obj; }, get: function (obj) { return obj.customerGroup; }, set: function (obj, value) { obj.customerGroup = value; } }, metadata: _metadata }, _customerGroup_initializers, _customerGroup_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TaxRate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TaxRate = _classThis;
}();
exports.TaxRate = TaxRate;
