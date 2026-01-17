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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingMethod = void 0;
var omit_1 = require("@vendure/common/lib/omit");
var typeorm_1 = require("typeorm");
var round_money_1 = require("../../common/round-money");
var config_helpers_1 = require("../../config/config-helpers");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var shipping_method_translation_entity_1 = require("./shipping-method-translation.entity");
/**
 * @description
 * A ShippingMethod is used to apply a shipping price to an {@link Order}. It is composed of a
 * {@link ShippingEligibilityChecker} and a {@link ShippingCalculator}. For a given Order,
 * the `checker` is used to determine whether this ShippingMethod can be used. If yes, then
 * the ShippingMethod can be applied and the `calculator` is used to determine the price of
 * shipping.
 *
 * @docsCategory entities
 */
var ShippingMethod = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _checker_decorators;
    var _checker_initializers = [];
    var _checker_extraInitializers = [];
    var _calculator_decorators;
    var _calculator_initializers = [];
    var _calculator_extraInitializers = [];
    var _fulfillmentHandlerCode_decorators;
    var _fulfillmentHandlerCode_initializers = [];
    var _fulfillmentHandlerCode_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var ShippingMethod = _classThis = /** @class */ (function (_super) {
        __extends(ShippingMethod_1, _super);
        function ShippingMethod_1(input) {
            var _this = _super.call(this, input) || this;
            _this.allCheckers = {};
            _this.allCalculators = {};
            _this.deletedAt = __runInitializers(_this, _deletedAt_initializers, void 0);
            _this.code = (__runInitializers(_this, _deletedAt_extraInitializers), __runInitializers(_this, _code_initializers, void 0));
            _this.name = __runInitializers(_this, _code_extraInitializers);
            _this.checker = __runInitializers(_this, _checker_initializers, void 0);
            _this.calculator = (__runInitializers(_this, _checker_extraInitializers), __runInitializers(_this, _calculator_initializers, void 0));
            _this.fulfillmentHandlerCode = (__runInitializers(_this, _calculator_extraInitializers), __runInitializers(_this, _fulfillmentHandlerCode_initializers, void 0));
            _this.channels = (__runInitializers(_this, _fulfillmentHandlerCode_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.translations = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            __runInitializers(_this, _customFields_extraInitializers);
            var checkers = (0, config_helpers_1.getConfig)().shippingOptions.shippingEligibilityCheckers || [];
            var calculators = (0, config_helpers_1.getConfig)().shippingOptions.shippingCalculators || [];
            _this.allCheckers = checkers.reduce(function (hash, o) {
                var _a;
                return (__assign(__assign({}, hash), (_a = {}, _a[o.code] = o, _a)));
            }, {});
            _this.allCalculators = calculators.reduce(function (hash, o) {
                var _a;
                return (__assign(__assign({}, hash), (_a = {}, _a[o.code] = o, _a)));
            }, {});
            return _this;
        }
        ShippingMethod_1.prototype.apply = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var calculator, response, price, priceIncludesTax, taxRate, metadata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            calculator = this.allCalculators[this.calculator.code];
                            if (!calculator) return [3 /*break*/, 2];
                            return [4 /*yield*/, calculator.calculate(ctx, order, this.calculator.args, this)];
                        case 1:
                            response = _a.sent();
                            if (response) {
                                price = response.price, priceIncludesTax = response.priceIncludesTax, taxRate = response.taxRate, metadata = response.metadata;
                                return [2 /*return*/, {
                                        price: (0, round_money_1.roundMoney)(price),
                                        priceIncludesTax: priceIncludesTax,
                                        taxRate: taxRate,
                                        metadata: metadata,
                                    }];
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ShippingMethod_1.prototype.test = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var checker;
                return __generator(this, function (_a) {
                    checker = this.allCheckers[this.checker.code];
                    if (checker) {
                        return [2 /*return*/, checker.check(ctx, order, this.checker.args, this)];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * This is a fix for https://github.com/vendurehq/vendure/issues/3277,
         * to prevent circular references which cause the JSON.stringify() to fail.
         */
        ShippingMethod_1.prototype.toJSON = function () {
            return (0, omit_1.omit)(this, ['allCheckers', 'allCalculators']);
        };
        return ShippingMethod_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ShippingMethod");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _code_decorators = [(0, typeorm_1.Column)()];
        _checker_decorators = [(0, typeorm_1.Column)('simple-json')];
        _calculator_decorators = [(0, typeorm_1.Column)('simple-json')];
        _fulfillmentHandlerCode_decorators = [(0, typeorm_1.Column)()];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.shippingMethods; }), (0, typeorm_1.JoinTable)()];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return shipping_method_translation_entity_1.ShippingMethodTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomShippingMethodFields; })];
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _checker_decorators, { kind: "field", name: "checker", static: false, private: false, access: { has: function (obj) { return "checker" in obj; }, get: function (obj) { return obj.checker; }, set: function (obj, value) { obj.checker = value; } }, metadata: _metadata }, _checker_initializers, _checker_extraInitializers);
        __esDecorate(null, null, _calculator_decorators, { kind: "field", name: "calculator", static: false, private: false, access: { has: function (obj) { return "calculator" in obj; }, get: function (obj) { return obj.calculator; }, set: function (obj, value) { obj.calculator = value; } }, metadata: _metadata }, _calculator_initializers, _calculator_extraInitializers);
        __esDecorate(null, null, _fulfillmentHandlerCode_decorators, { kind: "field", name: "fulfillmentHandlerCode", static: false, private: false, access: { has: function (obj) { return "fulfillmentHandlerCode" in obj; }, get: function (obj) { return obj.fulfillmentHandlerCode; }, set: function (obj, value) { obj.fulfillmentHandlerCode = value; } }, metadata: _metadata }, _fulfillmentHandlerCode_initializers, _fulfillmentHandlerCode_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShippingMethod = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShippingMethod = _classThis;
}();
exports.ShippingMethod = ShippingMethod;
