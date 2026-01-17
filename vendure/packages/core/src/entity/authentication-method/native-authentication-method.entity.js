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
exports.NativeAuthenticationMethod = void 0;
var typeorm_1 = require("typeorm");
var authentication_method_entity_1 = require("./authentication-method.entity");
/**
 * @description
 * This is the default, built-in authentication method which uses a identifier (typically username or email address)
 * and password combination to authenticate a User.
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
var NativeAuthenticationMethod = function () {
    var _classDecorators = [(0, typeorm_1.ChildEntity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = authentication_method_entity_1.AuthenticationMethod;
    var _identifier_decorators;
    var _identifier_initializers = [];
    var _identifier_extraInitializers = [];
    var _passwordHash_decorators;
    var _passwordHash_initializers = [];
    var _passwordHash_extraInitializers = [];
    var _verificationToken_decorators;
    var _verificationToken_initializers = [];
    var _verificationToken_extraInitializers = [];
    var _passwordResetToken_decorators;
    var _passwordResetToken_initializers = [];
    var _passwordResetToken_extraInitializers = [];
    var _identifierChangeToken_decorators;
    var _identifierChangeToken_initializers = [];
    var _identifierChangeToken_extraInitializers = [];
    var _pendingIdentifier_decorators;
    var _pendingIdentifier_initializers = [];
    var _pendingIdentifier_extraInitializers = [];
    var NativeAuthenticationMethod = _classThis = /** @class */ (function (_super) {
        __extends(NativeAuthenticationMethod_1, _super);
        function NativeAuthenticationMethod_1(input) {
            var _this = _super.call(this, input) || this;
            _this.identifier = __runInitializers(_this, _identifier_initializers, void 0);
            _this.passwordHash = (__runInitializers(_this, _identifier_extraInitializers), __runInitializers(_this, _passwordHash_initializers, void 0));
            _this.verificationToken = (__runInitializers(_this, _passwordHash_extraInitializers), __runInitializers(_this, _verificationToken_initializers, void 0));
            _this.passwordResetToken = (__runInitializers(_this, _verificationToken_extraInitializers), __runInitializers(_this, _passwordResetToken_initializers, void 0));
            /**
             * @description
             * A token issued when a User requests to change their identifier (typically
             * an email address)
             */
            _this.identifierChangeToken = (__runInitializers(_this, _passwordResetToken_extraInitializers), __runInitializers(_this, _identifierChangeToken_initializers, void 0));
            /**
             * @description
             * When a request has been made to change the User's identifier, the new identifier
             * will be stored here until it has been verified, after which it will
             * replace the current value of the `identifier` field.
             */
            _this.pendingIdentifier = (__runInitializers(_this, _identifierChangeToken_extraInitializers), __runInitializers(_this, _pendingIdentifier_initializers, void 0));
            __runInitializers(_this, _pendingIdentifier_extraInitializers);
            return _this;
        }
        return NativeAuthenticationMethod_1;
    }(_classSuper));
    __setFunctionName(_classThis, "NativeAuthenticationMethod");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _identifier_decorators = [(0, typeorm_1.Column)()];
        _passwordHash_decorators = [(0, typeorm_1.Column)({ select: false })];
        _verificationToken_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _passwordResetToken_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _identifierChangeToken_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _pendingIdentifier_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        __esDecorate(null, null, _identifier_decorators, { kind: "field", name: "identifier", static: false, private: false, access: { has: function (obj) { return "identifier" in obj; }, get: function (obj) { return obj.identifier; }, set: function (obj, value) { obj.identifier = value; } }, metadata: _metadata }, _identifier_initializers, _identifier_extraInitializers);
        __esDecorate(null, null, _passwordHash_decorators, { kind: "field", name: "passwordHash", static: false, private: false, access: { has: function (obj) { return "passwordHash" in obj; }, get: function (obj) { return obj.passwordHash; }, set: function (obj, value) { obj.passwordHash = value; } }, metadata: _metadata }, _passwordHash_initializers, _passwordHash_extraInitializers);
        __esDecorate(null, null, _verificationToken_decorators, { kind: "field", name: "verificationToken", static: false, private: false, access: { has: function (obj) { return "verificationToken" in obj; }, get: function (obj) { return obj.verificationToken; }, set: function (obj, value) { obj.verificationToken = value; } }, metadata: _metadata }, _verificationToken_initializers, _verificationToken_extraInitializers);
        __esDecorate(null, null, _passwordResetToken_decorators, { kind: "field", name: "passwordResetToken", static: false, private: false, access: { has: function (obj) { return "passwordResetToken" in obj; }, get: function (obj) { return obj.passwordResetToken; }, set: function (obj, value) { obj.passwordResetToken = value; } }, metadata: _metadata }, _passwordResetToken_initializers, _passwordResetToken_extraInitializers);
        __esDecorate(null, null, _identifierChangeToken_decorators, { kind: "field", name: "identifierChangeToken", static: false, private: false, access: { has: function (obj) { return "identifierChangeToken" in obj; }, get: function (obj) { return obj.identifierChangeToken; }, set: function (obj, value) { obj.identifierChangeToken = value; } }, metadata: _metadata }, _identifierChangeToken_initializers, _identifierChangeToken_extraInitializers);
        __esDecorate(null, null, _pendingIdentifier_decorators, { kind: "field", name: "pendingIdentifier", static: false, private: false, access: { has: function (obj) { return "pendingIdentifier" in obj; }, get: function (obj) { return obj.pendingIdentifier; }, set: function (obj, value) { obj.pendingIdentifier = value; } }, metadata: _metadata }, _pendingIdentifier_initializers, _pendingIdentifier_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NativeAuthenticationMethod = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NativeAuthenticationMethod = _classThis;
}();
exports.NativeAuthenticationMethod = NativeAuthenticationMethod;
