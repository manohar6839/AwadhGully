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
exports.ExternalAuthenticationMethod = void 0;
var typeorm_1 = require("typeorm");
var authentication_method_entity_1 = require("./authentication-method.entity");
/**
 * @description
 * This method is used when an external authentication service is used to authenticate Vendure Users.
 * Examples of external auth include social logins or corporate identity servers.
 *
 * @docsCategory entities
 * @docsPage AuthenticationMethod
 */
var ExternalAuthenticationMethod = function () {
    var _classDecorators = [(0, typeorm_1.ChildEntity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = authentication_method_entity_1.AuthenticationMethod;
    var _strategy_decorators;
    var _strategy_initializers = [];
    var _strategy_extraInitializers = [];
    var _externalIdentifier_decorators;
    var _externalIdentifier_initializers = [];
    var _externalIdentifier_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var ExternalAuthenticationMethod = _classThis = /** @class */ (function (_super) {
        __extends(ExternalAuthenticationMethod_1, _super);
        function ExternalAuthenticationMethod_1(input) {
            var _this = _super.call(this, input) || this;
            _this.strategy = __runInitializers(_this, _strategy_initializers, void 0);
            _this.externalIdentifier = (__runInitializers(_this, _strategy_extraInitializers), __runInitializers(_this, _externalIdentifier_initializers, void 0));
            _this.metadata = (__runInitializers(_this, _externalIdentifier_extraInitializers), __runInitializers(_this, _metadata_initializers, void 0));
            __runInitializers(_this, _metadata_extraInitializers);
            return _this;
        }
        return ExternalAuthenticationMethod_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ExternalAuthenticationMethod");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _strategy_decorators = [(0, typeorm_1.Column)()];
        _externalIdentifier_decorators = [(0, typeorm_1.Column)()];
        _metadata_decorators = [(0, typeorm_1.Column)('simple-json')];
        __esDecorate(null, null, _strategy_decorators, { kind: "field", name: "strategy", static: false, private: false, access: { has: function (obj) { return "strategy" in obj; }, get: function (obj) { return obj.strategy; }, set: function (obj, value) { obj.strategy = value; } }, metadata: _metadata }, _strategy_initializers, _strategy_extraInitializers);
        __esDecorate(null, null, _externalIdentifier_decorators, { kind: "field", name: "externalIdentifier", static: false, private: false, access: { has: function (obj) { return "externalIdentifier" in obj; }, get: function (obj) { return obj.externalIdentifier; }, set: function (obj, value) { obj.externalIdentifier = value; } }, metadata: _metadata }, _externalIdentifier_initializers, _externalIdentifier_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExternalAuthenticationMethod = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExternalAuthenticationMethod = _classThis;
}();
exports.ExternalAuthenticationMethod = ExternalAuthenticationMethod;
