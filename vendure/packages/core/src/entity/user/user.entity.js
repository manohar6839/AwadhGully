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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var authentication_method_entity_1 = require("../authentication-method/authentication-method.entity");
var native_authentication_method_entity_1 = require("../authentication-method/native-authentication-method.entity");
var base_entity_1 = require("../base/base.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var role_entity_1 = require("../role/role.entity");
var authenticated_session_entity_1 = require("../session/authenticated-session.entity");
/**
 * @description
 * A User represents any authenticated user of the Vendure API. This includes both
 * {@link Administrator}s as well as registered {@link Customer}s.
 *
 * @docsCategory entities
 */
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _identifier_decorators;
    var _identifier_initializers = [];
    var _identifier_extraInitializers = [];
    var _authenticationMethods_decorators;
    var _authenticationMethods_initializers = [];
    var _authenticationMethods_extraInitializers = [];
    var _verified_decorators;
    var _verified_initializers = [];
    var _verified_extraInitializers = [];
    var _roles_decorators;
    var _roles_initializers = [];
    var _roles_extraInitializers = [];
    var _lastLogin_decorators;
    var _lastLogin_initializers = [];
    var _lastLogin_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _sessions_decorators;
    var _sessions_initializers = [];
    var _sessions_extraInitializers = [];
    var User = _classThis = /** @class */ (function (_super) {
        __extends(User_1, _super);
        function User_1(input) {
            var _this = _super.call(this, input) || this;
            _this.deletedAt = __runInitializers(_this, _deletedAt_initializers, void 0);
            _this.identifier = (__runInitializers(_this, _deletedAt_extraInitializers), __runInitializers(_this, _identifier_initializers, void 0));
            _this.authenticationMethods = (__runInitializers(_this, _identifier_extraInitializers), __runInitializers(_this, _authenticationMethods_initializers, void 0));
            _this.verified = (__runInitializers(_this, _authenticationMethods_extraInitializers), __runInitializers(_this, _verified_initializers, void 0));
            _this.roles = (__runInitializers(_this, _verified_extraInitializers), __runInitializers(_this, _roles_initializers, void 0));
            _this.lastLogin = (__runInitializers(_this, _roles_extraInitializers), __runInitializers(_this, _lastLogin_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _lastLogin_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.sessions = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _sessions_initializers, void 0));
            __runInitializers(_this, _sessions_extraInitializers);
            return _this;
        }
        User_1.prototype.getNativeAuthenticationMethod = function (strict) {
            if (!this.authenticationMethods) {
                throw new errors_1.InternalServerError('error.user-authentication-methods-not-loaded');
            }
            var match = this.authenticationMethods.find(function (m) { return m instanceof native_authentication_method_entity_1.NativeAuthenticationMethod; });
            if (!match && (strict === undefined || strict)) {
                throw new errors_1.InternalServerError('error.native-authentication-methods-not-found');
            }
            return match;
        };
        return User_1;
    }(_classSuper));
    __setFunctionName(_classThis, "User");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _identifier_decorators = [(0, typeorm_1.Column)()];
        _authenticationMethods_decorators = [(0, typeorm_1.OneToMany)(function (type) { return authentication_method_entity_1.AuthenticationMethod; }, function (method) { return method.user; })];
        _verified_decorators = [(0, typeorm_1.Column)({ default: false })];
        _roles_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return role_entity_1.Role; }), (0, typeorm_1.JoinTable)()];
        _lastLogin_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomUserFields; })];
        _sessions_decorators = [(0, typeorm_1.OneToMany)(function (type) { return authenticated_session_entity_1.AuthenticatedSession; }, function (session) { return session.user; })];
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _identifier_decorators, { kind: "field", name: "identifier", static: false, private: false, access: { has: function (obj) { return "identifier" in obj; }, get: function (obj) { return obj.identifier; }, set: function (obj, value) { obj.identifier = value; } }, metadata: _metadata }, _identifier_initializers, _identifier_extraInitializers);
        __esDecorate(null, null, _authenticationMethods_decorators, { kind: "field", name: "authenticationMethods", static: false, private: false, access: { has: function (obj) { return "authenticationMethods" in obj; }, get: function (obj) { return obj.authenticationMethods; }, set: function (obj, value) { obj.authenticationMethods = value; } }, metadata: _metadata }, _authenticationMethods_initializers, _authenticationMethods_extraInitializers);
        __esDecorate(null, null, _verified_decorators, { kind: "field", name: "verified", static: false, private: false, access: { has: function (obj) { return "verified" in obj; }, get: function (obj) { return obj.verified; }, set: function (obj, value) { obj.verified = value; } }, metadata: _metadata }, _verified_initializers, _verified_extraInitializers);
        __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: function (obj) { return "roles" in obj; }, get: function (obj) { return obj.roles; }, set: function (obj, value) { obj.roles = value; } }, metadata: _metadata }, _roles_initializers, _roles_extraInitializers);
        __esDecorate(null, null, _lastLogin_decorators, { kind: "field", name: "lastLogin", static: false, private: false, access: { has: function (obj) { return "lastLogin" in obj; }, get: function (obj) { return obj.lastLogin; }, set: function (obj, value) { obj.lastLogin = value; } }, metadata: _metadata }, _lastLogin_initializers, _lastLogin_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _sessions_decorators, { kind: "field", name: "sessions", static: false, private: false, access: { has: function (obj) { return "sessions" in obj; }, get: function (obj) { return obj.sessions; }, set: function (obj, value) { obj.sessions = value; } }, metadata: _metadata }, _sessions_initializers, _sessions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
