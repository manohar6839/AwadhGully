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
exports.CustomerGroup = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var customer_entity_1 = require("../customer/customer.entity");
var tax_rate_entity_1 = require("../tax-rate/tax-rate.entity");
/**
 * @description
 * A grouping of {@link Customer}s which enables features such as group-based promotions
 * or tax rules.
 *
 * @docsCategory entities
 */
var CustomerGroup = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _customers_decorators;
    var _customers_initializers = [];
    var _customers_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _taxRates_decorators;
    var _taxRates_initializers = [];
    var _taxRates_extraInitializers = [];
    var CustomerGroup = _classThis = /** @class */ (function (_super) {
        __extends(CustomerGroup_1, _super);
        function CustomerGroup_1(input) {
            var _this = _super.call(this, input) || this;
            _this.name = __runInitializers(_this, _name_initializers, void 0);
            _this.customers = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _customers_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _customers_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.taxRates = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _taxRates_initializers, void 0));
            __runInitializers(_this, _taxRates_extraInitializers);
            return _this;
        }
        return CustomerGroup_1;
    }(_classSuper));
    __setFunctionName(_classThis, "CustomerGroup");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _name_decorators = [(0, typeorm_1.Column)()];
        _customers_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return customer_entity_1.Customer; }, function (customer) { return customer.groups; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomCustomerGroupFields; })];
        _taxRates_decorators = [(0, typeorm_1.OneToMany)(function (type) { return tax_rate_entity_1.TaxRate; }, function (taxRate) { return taxRate.zone; })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _customers_decorators, { kind: "field", name: "customers", static: false, private: false, access: { has: function (obj) { return "customers" in obj; }, get: function (obj) { return obj.customers; }, set: function (obj, value) { obj.customers = value; } }, metadata: _metadata }, _customers_initializers, _customers_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _taxRates_decorators, { kind: "field", name: "taxRates", static: false, private: false, access: { has: function (obj) { return "taxRates" in obj; }, get: function (obj) { return obj.taxRates; }, set: function (obj, value) { obj.taxRates = value; } }, metadata: _metadata }, _taxRates_initializers, _taxRates_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerGroup = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerGroup = _classThis;
}();
exports.CustomerGroup = CustomerGroup;
