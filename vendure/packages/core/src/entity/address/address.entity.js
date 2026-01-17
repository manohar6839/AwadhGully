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
exports.Address = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var customer_entity_1 = require("../customer/customer.entity");
var country_entity_1 = require("../region/country.entity");
/**
 * @description
 * Represents a {@link Customer}'s address.
 *
 * @docsCategory entities
 */
var Address = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _customer_decorators;
    var _customer_initializers = [];
    var _customer_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _company_decorators;
    var _company_initializers = [];
    var _company_extraInitializers = [];
    var _streetLine1_decorators;
    var _streetLine1_initializers = [];
    var _streetLine1_extraInitializers = [];
    var _streetLine2_decorators;
    var _streetLine2_initializers = [];
    var _streetLine2_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _province_decorators;
    var _province_initializers = [];
    var _province_extraInitializers = [];
    var _postalCode_decorators;
    var _postalCode_initializers = [];
    var _postalCode_extraInitializers = [];
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _defaultShippingAddress_decorators;
    var _defaultShippingAddress_initializers = [];
    var _defaultShippingAddress_extraInitializers = [];
    var _defaultBillingAddress_decorators;
    var _defaultBillingAddress_initializers = [];
    var _defaultBillingAddress_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Address = _classThis = /** @class */ (function (_super) {
        __extends(Address_1, _super);
        function Address_1(input) {
            var _this = _super.call(this, input) || this;
            _this.customer = __runInitializers(_this, _customer_initializers, void 0);
            _this.fullName = (__runInitializers(_this, _customer_extraInitializers), __runInitializers(_this, _fullName_initializers, void 0));
            _this.company = (__runInitializers(_this, _fullName_extraInitializers), __runInitializers(_this, _company_initializers, void 0));
            _this.streetLine1 = (__runInitializers(_this, _company_extraInitializers), __runInitializers(_this, _streetLine1_initializers, void 0));
            _this.streetLine2 = (__runInitializers(_this, _streetLine1_extraInitializers), __runInitializers(_this, _streetLine2_initializers, void 0));
            _this.city = (__runInitializers(_this, _streetLine2_extraInitializers), __runInitializers(_this, _city_initializers, void 0));
            _this.province = (__runInitializers(_this, _city_extraInitializers), __runInitializers(_this, _province_initializers, void 0));
            _this.postalCode = (__runInitializers(_this, _province_extraInitializers), __runInitializers(_this, _postalCode_initializers, void 0));
            _this.country = (__runInitializers(_this, _postalCode_extraInitializers), __runInitializers(_this, _country_initializers, void 0));
            _this.phoneNumber = (__runInitializers(_this, _country_extraInitializers), __runInitializers(_this, _phoneNumber_initializers, void 0));
            _this.defaultShippingAddress = (__runInitializers(_this, _phoneNumber_extraInitializers), __runInitializers(_this, _defaultShippingAddress_initializers, void 0));
            _this.defaultBillingAddress = (__runInitializers(_this, _defaultShippingAddress_extraInitializers), __runInitializers(_this, _defaultBillingAddress_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _defaultBillingAddress_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Address_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Address");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _customer_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return customer_entity_1.Customer; }, function (customer) { return customer.addresses; })];
        _fullName_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _company_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _streetLine1_decorators = [(0, typeorm_1.Column)()];
        _streetLine2_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _city_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _province_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _postalCode_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _country_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return country_entity_1.Country; })];
        _phoneNumber_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _defaultShippingAddress_decorators = [(0, typeorm_1.Column)({ default: false })];
        _defaultBillingAddress_decorators = [(0, typeorm_1.Column)({ default: false })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomAddressFields; })];
        __esDecorate(null, null, _customer_decorators, { kind: "field", name: "customer", static: false, private: false, access: { has: function (obj) { return "customer" in obj; }, get: function (obj) { return obj.customer; }, set: function (obj, value) { obj.customer = value; } }, metadata: _metadata }, _customer_initializers, _customer_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: function (obj) { return "company" in obj; }, get: function (obj) { return obj.company; }, set: function (obj, value) { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
        __esDecorate(null, null, _streetLine1_decorators, { kind: "field", name: "streetLine1", static: false, private: false, access: { has: function (obj) { return "streetLine1" in obj; }, get: function (obj) { return obj.streetLine1; }, set: function (obj, value) { obj.streetLine1 = value; } }, metadata: _metadata }, _streetLine1_initializers, _streetLine1_extraInitializers);
        __esDecorate(null, null, _streetLine2_decorators, { kind: "field", name: "streetLine2", static: false, private: false, access: { has: function (obj) { return "streetLine2" in obj; }, get: function (obj) { return obj.streetLine2; }, set: function (obj, value) { obj.streetLine2 = value; } }, metadata: _metadata }, _streetLine2_initializers, _streetLine2_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _province_decorators, { kind: "field", name: "province", static: false, private: false, access: { has: function (obj) { return "province" in obj; }, get: function (obj) { return obj.province; }, set: function (obj, value) { obj.province = value; } }, metadata: _metadata }, _province_initializers, _province_extraInitializers);
        __esDecorate(null, null, _postalCode_decorators, { kind: "field", name: "postalCode", static: false, private: false, access: { has: function (obj) { return "postalCode" in obj; }, get: function (obj) { return obj.postalCode; }, set: function (obj, value) { obj.postalCode = value; } }, metadata: _metadata }, _postalCode_initializers, _postalCode_extraInitializers);
        __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _defaultShippingAddress_decorators, { kind: "field", name: "defaultShippingAddress", static: false, private: false, access: { has: function (obj) { return "defaultShippingAddress" in obj; }, get: function (obj) { return obj.defaultShippingAddress; }, set: function (obj, value) { obj.defaultShippingAddress = value; } }, metadata: _metadata }, _defaultShippingAddress_initializers, _defaultShippingAddress_extraInitializers);
        __esDecorate(null, null, _defaultBillingAddress_decorators, { kind: "field", name: "defaultBillingAddress", static: false, private: false, access: { has: function (obj) { return "defaultBillingAddress" in obj; }, get: function (obj) { return obj.defaultBillingAddress; }, set: function (obj, value) { obj.defaultBillingAddress = value; } }, metadata: _metadata }, _defaultBillingAddress_initializers, _defaultBillingAddress_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Address = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Address = _classThis;
}();
exports.Address = Address;
