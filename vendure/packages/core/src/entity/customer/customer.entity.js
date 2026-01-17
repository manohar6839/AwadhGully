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
exports.Customer = void 0;
var typeorm_1 = require("typeorm");
var address_entity_1 = require("../address/address.entity");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var customer_group_entity_1 = require("../customer-group/customer-group.entity");
var order_entity_1 = require("../order/order.entity");
var user_entity_1 = require("../user/user.entity");
/**
 * @description
 * This entity represents a customer of the store, typically an individual person. A Customer can be
 * a guest, in which case it has no associated {@link User}. Customers with registered account will
 * have an associated User entity.
 *
 * @docsCategory entities
 */
var Customer = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _emailAddress_decorators;
    var _emailAddress_initializers = [];
    var _emailAddress_extraInitializers = [];
    var _groups_decorators;
    var _groups_initializers = [];
    var _groups_extraInitializers = [];
    var _addresses_decorators;
    var _addresses_initializers = [];
    var _addresses_extraInitializers = [];
    var _orders_decorators;
    var _orders_initializers = [];
    var _orders_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var Customer = _classThis = /** @class */ (function (_super) {
        __extends(Customer_1, _super);
        function Customer_1(input) {
            var _this = _super.call(this, input) || this;
            _this.deletedAt = __runInitializers(_this, _deletedAt_initializers, void 0);
            _this.title = (__runInitializers(_this, _deletedAt_extraInitializers), __runInitializers(_this, _title_initializers, void 0));
            _this.firstName = (__runInitializers(_this, _title_extraInitializers), __runInitializers(_this, _firstName_initializers, void 0));
            _this.lastName = (__runInitializers(_this, _firstName_extraInitializers), __runInitializers(_this, _lastName_initializers, void 0));
            _this.phoneNumber = (__runInitializers(_this, _lastName_extraInitializers), __runInitializers(_this, _phoneNumber_initializers, void 0));
            _this.emailAddress = (__runInitializers(_this, _phoneNumber_extraInitializers), __runInitializers(_this, _emailAddress_initializers, void 0));
            _this.groups = (__runInitializers(_this, _emailAddress_extraInitializers), __runInitializers(_this, _groups_initializers, void 0));
            _this.addresses = (__runInitializers(_this, _groups_extraInitializers), __runInitializers(_this, _addresses_initializers, void 0));
            _this.orders = (__runInitializers(_this, _addresses_extraInitializers), __runInitializers(_this, _orders_initializers, void 0));
            _this.user = (__runInitializers(_this, _orders_extraInitializers), __runInitializers(_this, _user_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _user_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.channels = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            __runInitializers(_this, _channels_extraInitializers);
            return _this;
        }
        return Customer_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Customer");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _title_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _firstName_decorators = [(0, typeorm_1.Column)()];
        _lastName_decorators = [(0, typeorm_1.Column)()];
        _phoneNumber_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _emailAddress_decorators = [(0, typeorm_1.Column)()];
        _groups_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return customer_group_entity_1.CustomerGroup; }, function (group) { return group.customers; }), (0, typeorm_1.JoinTable)()];
        _addresses_decorators = [(0, typeorm_1.OneToMany)(function (type) { return address_entity_1.Address; }, function (address) { return address.customer; })];
        _orders_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_entity_1.Order; }, function (order) { return order.customer; })];
        _user_decorators = [(0, typeorm_1.OneToOne)(function (type) { return user_entity_1.User; }, { eager: true }), (0, typeorm_1.JoinColumn)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomCustomerFields; })];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.customers; }), (0, typeorm_1.JoinTable)()];
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _emailAddress_decorators, { kind: "field", name: "emailAddress", static: false, private: false, access: { has: function (obj) { return "emailAddress" in obj; }, get: function (obj) { return obj.emailAddress; }, set: function (obj, value) { obj.emailAddress = value; } }, metadata: _metadata }, _emailAddress_initializers, _emailAddress_extraInitializers);
        __esDecorate(null, null, _groups_decorators, { kind: "field", name: "groups", static: false, private: false, access: { has: function (obj) { return "groups" in obj; }, get: function (obj) { return obj.groups; }, set: function (obj, value) { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
        __esDecorate(null, null, _addresses_decorators, { kind: "field", name: "addresses", static: false, private: false, access: { has: function (obj) { return "addresses" in obj; }, get: function (obj) { return obj.addresses; }, set: function (obj, value) { obj.addresses = value; } }, metadata: _metadata }, _addresses_initializers, _addresses_extraInitializers);
        __esDecorate(null, null, _orders_decorators, { kind: "field", name: "orders", static: false, private: false, access: { has: function (obj) { return "orders" in obj; }, get: function (obj) { return obj.orders; }, set: function (obj, value) { obj.orders = value; } }, metadata: _metadata }, _orders_initializers, _orders_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Customer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Customer = _classThis;
}();
exports.Customer = Customer;
