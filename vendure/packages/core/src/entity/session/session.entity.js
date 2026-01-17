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
exports.Session = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var order_entity_1 = require("../order/order.entity");
/**
 * @description
 * A Session is created when a user makes a request to restricted API operations. A Session can be an {@link AnonymousSession}
 * in the case of un-authenticated users, otherwise it is an {@link AuthenticatedSession}.
 *
 * @docsCategory entities
 */
var Session = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'type' } })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _expires_decorators;
    var _expires_initializers = [];
    var _expires_extraInitializers = [];
    var _invalidated_decorators;
    var _invalidated_initializers = [];
    var _invalidated_extraInitializers = [];
    var _activeOrderId_decorators;
    var _activeOrderId_initializers = [];
    var _activeOrderId_extraInitializers = [];
    var _activeOrder_decorators;
    var _activeOrder_initializers = [];
    var _activeOrder_extraInitializers = [];
    var _activeChannelId_decorators;
    var _activeChannelId_initializers = [];
    var _activeChannelId_extraInitializers = [];
    var _activeChannel_decorators;
    var _activeChannel_initializers = [];
    var _activeChannel_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var Session = _classThis = /** @class */ (function (_super) {
        __extends(Session_1, _super);
        function Session_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.token = __runInitializers(_this, _token_initializers, void 0);
            _this.expires = (__runInitializers(_this, _token_extraInitializers), __runInitializers(_this, _expires_initializers, void 0));
            _this.invalidated = (__runInitializers(_this, _expires_extraInitializers), __runInitializers(_this, _invalidated_initializers, void 0));
            _this.activeOrderId = (__runInitializers(_this, _invalidated_extraInitializers), __runInitializers(_this, _activeOrderId_initializers, void 0));
            _this.activeOrder = (__runInitializers(_this, _activeOrderId_extraInitializers), __runInitializers(_this, _activeOrder_initializers, void 0));
            _this.activeChannelId = (__runInitializers(_this, _activeOrder_extraInitializers), __runInitializers(_this, _activeChannelId_initializers, void 0));
            _this.activeChannel = (__runInitializers(_this, _activeChannelId_extraInitializers), __runInitializers(_this, _activeChannel_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _activeChannel_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return Session_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Session");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _token_decorators = [(0, typeorm_1.Index)({ unique: true }), (0, typeorm_1.Column)()];
        _expires_decorators = [(0, typeorm_1.Column)()];
        _invalidated_decorators = [(0, typeorm_1.Column)()];
        _activeOrderId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _activeOrder_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return order_entity_1.Order; })];
        _activeChannelId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _activeChannel_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return channel_entity_1.Channel; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomSessionFields; })];
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _expires_decorators, { kind: "field", name: "expires", static: false, private: false, access: { has: function (obj) { return "expires" in obj; }, get: function (obj) { return obj.expires; }, set: function (obj, value) { obj.expires = value; } }, metadata: _metadata }, _expires_initializers, _expires_extraInitializers);
        __esDecorate(null, null, _invalidated_decorators, { kind: "field", name: "invalidated", static: false, private: false, access: { has: function (obj) { return "invalidated" in obj; }, get: function (obj) { return obj.invalidated; }, set: function (obj, value) { obj.invalidated = value; } }, metadata: _metadata }, _invalidated_initializers, _invalidated_extraInitializers);
        __esDecorate(null, null, _activeOrderId_decorators, { kind: "field", name: "activeOrderId", static: false, private: false, access: { has: function (obj) { return "activeOrderId" in obj; }, get: function (obj) { return obj.activeOrderId; }, set: function (obj, value) { obj.activeOrderId = value; } }, metadata: _metadata }, _activeOrderId_initializers, _activeOrderId_extraInitializers);
        __esDecorate(null, null, _activeOrder_decorators, { kind: "field", name: "activeOrder", static: false, private: false, access: { has: function (obj) { return "activeOrder" in obj; }, get: function (obj) { return obj.activeOrder; }, set: function (obj, value) { obj.activeOrder = value; } }, metadata: _metadata }, _activeOrder_initializers, _activeOrder_extraInitializers);
        __esDecorate(null, null, _activeChannelId_decorators, { kind: "field", name: "activeChannelId", static: false, private: false, access: { has: function (obj) { return "activeChannelId" in obj; }, get: function (obj) { return obj.activeChannelId; }, set: function (obj, value) { obj.activeChannelId = value; } }, metadata: _metadata }, _activeChannelId_initializers, _activeChannelId_extraInitializers);
        __esDecorate(null, null, _activeChannel_decorators, { kind: "field", name: "activeChannel", static: false, private: false, access: { has: function (obj) { return "activeChannel" in obj; }, get: function (obj) { return obj.activeChannel; }, set: function (obj, value) { obj.activeChannel = value; } }, metadata: _metadata }, _activeChannel_initializers, _activeChannel_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Session = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Session = _classThis;
}();
exports.Session = Session;
