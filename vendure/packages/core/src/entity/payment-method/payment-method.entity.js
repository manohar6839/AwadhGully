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
exports.PaymentMethod = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var payment_method_translation_entity_1 = require("./payment-method-translation.entity");
/**
 * @description
 * A PaymentMethod is created automatically according to the configured {@link PaymentMethodHandler}s defined
 * in the {@link PaymentOptions} config.
 *
 * @docsCategory entities
 */
var PaymentMethod = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _checker_decorators;
    var _checker_initializers = [];
    var _checker_extraInitializers = [];
    var _handler_decorators;
    var _handler_initializers = [];
    var _handler_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var PaymentMethod = _classThis = /** @class */ (function (_super) {
        __extends(PaymentMethod_1, _super);
        function PaymentMethod_1(input) {
            var _this = _super.call(this, input) || this;
            _this.code = __runInitializers(_this, _code_initializers, void 0);
            _this.description = __runInitializers(_this, _code_extraInitializers);
            _this.translations = __runInitializers(_this, _translations_initializers, void 0);
            _this.enabled = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _enabled_initializers, void 0));
            _this.checker = (__runInitializers(_this, _enabled_extraInitializers), __runInitializers(_this, _checker_initializers, void 0));
            _this.handler = (__runInitializers(_this, _checker_extraInitializers), __runInitializers(_this, _handler_initializers, void 0));
            _this.channels = (__runInitializers(_this, _handler_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            return _this;
        }
        return PaymentMethod_1;
    }(_classSuper));
    __setFunctionName(_classThis, "PaymentMethod");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _code_decorators = [(0, typeorm_1.Column)({ default: '' })];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return payment_method_translation_entity_1.PaymentMethodTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _enabled_decorators = [(0, typeorm_1.Column)()];
        _checker_decorators = [(0, typeorm_1.Column)('simple-json', { nullable: true })];
        _handler_decorators = [(0, typeorm_1.Column)('simple-json')];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.paymentMethods; }), (0, typeorm_1.JoinTable)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomPaymentMethodFields; })];
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _checker_decorators, { kind: "field", name: "checker", static: false, private: false, access: { has: function (obj) { return "checker" in obj; }, get: function (obj) { return obj.checker; }, set: function (obj, value) { obj.checker = value; } }, metadata: _metadata }, _checker_initializers, _checker_extraInitializers);
        __esDecorate(null, null, _handler_decorators, { kind: "field", name: "handler", static: false, private: false, access: { has: function (obj) { return "handler" in obj; }, get: function (obj) { return obj.handler; }, set: function (obj, value) { obj.handler = value; } }, metadata: _metadata }, _handler_initializers, _handler_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentMethod = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentMethod = _classThis;
}();
exports.PaymentMethod = PaymentMethod;
