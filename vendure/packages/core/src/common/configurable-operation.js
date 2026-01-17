"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurableOperationDef = void 0;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var constants_1 = require("./constants");
var errors_1 = require("./error/errors");
/**
 * @description
 * A ConfigurableOperationDef is a special type of object used extensively by Vendure to define
 * code blocks which have arguments which are configurable at run-time by the administrator.
 *
 * This is the mechanism used by:
 *
 * * {@link CollectionFilter}
 * * {@link PaymentMethodHandler}
 * * {@link PromotionAction}
 * * {@link PromotionCondition}
 * * {@link ShippingCalculator}
 * * {@link ShippingEligibilityChecker}
 *
 * Any class which extends ConfigurableOperationDef works in the same way: it takes a
 * config object as the constructor argument. That config object extends the {@link ConfigurableOperationDefOptions}
 * interface and typically adds some kind of business logic function to it.
 *
 * For example, in the case of `ShippingEligibilityChecker`,
 * it adds the `check()` function to the config object which defines the logic for checking whether an Order is eligible
 * for a particular ShippingMethod.
 *
 * ## The `args` property
 *
 * The key feature of the ConfigurableOperationDef is the `args` property. This is where we define those
 * arguments that are exposed via the Admin UI as data input components. This allows their values to
 * be set at run-time by the Administrator. Those values can then be accessed in the business logic
 * of the operation.
 *
 * The data type of the args can be one of {@link ConfigArgType}, and the configuration is further explained in
 * the docs of {@link ConfigArgs}.
 *
 * ## Dependency Injection
 * If your business logic relies on injectable providers, such as the `TransactionalConnection` object, or any of the
 * internal Vendure services or those defined in a plugin, you can inject them by using the config object's
 * `init()` method, which exposes the {@link Injector}.
 *
 * Here's an example of a ShippingCalculator that injects a service which has been defined in a plugin:
 *
 * @example
 * ```ts
 * import { Injector, ShippingCalculator } from '\@vendure/core';
 * import { ShippingRatesService } from './shipping-rates.service';
 *
 * // We keep reference to our injected service by keeping it
 * // in the top-level scope of the file.
 * let shippingRatesService: ShippingRatesService;
 *
 * export const customShippingCalculator = new ShippingCalculator({
 *   code: 'custom-shipping-calculator',
 *   description: [],
 *   args: {},
 *
 *   init(injector: Injector) {
 *     // The init function is called during bootstrap, and allows
 *     // us to inject any providers we need.
 *     shippingRatesService = injector.get(ShippingRatesService);
 *   },
 *
 *   calculate: async (order, args) => {
 *     // We can now use the injected provider in the business logic.
 *     const { price, priceWithTax } = await shippingRatesService.getRate({
 *       destination: order.shippingAddress,
 *       contents: order.lines,
 *     });
 *
 *     return {
 *       price,
 *       priceWithTax,
 *     };
 *   },
 * });
 * ```
 *
 * @docsCategory ConfigurableOperationDef
 */
var ConfigurableOperationDef = /** @class */ (function () {
    function ConfigurableOperationDef(options) {
        this.options = options;
    }
    Object.defineProperty(ConfigurableOperationDef.prototype, "code", {
        get: function () {
            return this.options.code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigurableOperationDef.prototype, "args", {
        get: function () {
            return this.options.args;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigurableOperationDef.prototype, "description", {
        get: function () {
            return this.options.description;
        },
        enumerable: false,
        configurable: true
    });
    ConfigurableOperationDef.prototype.init = function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof this.options.init === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.options.init(injector)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurableOperationDef.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof this.options.destroy === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.options.destroy()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description
     * Convert a ConfigurableOperationDef into a ConfigurableOperationDefinition object, typically
     * so that it can be sent via the API.
     */
    ConfigurableOperationDef.prototype.toGraphQlType = function (ctx) {
        return {
            code: this.code,
            description: localizeString(this.description, ctx.languageCode, ctx.channel.defaultLanguageCode),
            args: Object.entries(this.args).map(function (_a) {
                var _b, _c;
                var name = _a[0], arg = _a[1];
                return ({
                    name: name,
                    type: arg.type,
                    list: (_b = arg.list) !== null && _b !== void 0 ? _b : false,
                    required: (_c = arg.required) !== null && _c !== void 0 ? _c : true,
                    defaultValue: arg.defaultValue,
                    ui: arg.ui,
                    label: arg.label &&
                        localizeString(arg.label, ctx.languageCode, ctx.channel.defaultLanguageCode),
                    description: arg.description &&
                        localizeString(arg.description, ctx.languageCode, ctx.channel.defaultLanguageCode),
                });
            }),
        };
    };
    /**
     * @description
     * Coverts an array of ConfigArgs into a hash object:
     *
     * from:
     * `[{ name: 'foo', type: 'string', value: 'bar'}]`
     *
     * to:
     * `{ foo: 'bar' }`
     **/
    ConfigurableOperationDef.prototype.argsArrayToHash = function (args) {
        var output = {};
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (arg && arg.value != null && this.args[arg.name] != null) {
                output[arg.name] = coerceValueToType(arg.value, this.args[arg.name].type, this.args[arg.name].list || false);
            }
        }
        return output;
    };
    return ConfigurableOperationDef;
}());
exports.ConfigurableOperationDef = ConfigurableOperationDef;
function localizeString(stringArray, languageCode, channelLanguageCode) {
    var match = stringArray.find(function (x) { return x.languageCode === languageCode; });
    if (!match) {
        match = stringArray.find(function (x) { return x.languageCode === channelLanguageCode; });
    }
    if (!match) {
        match = stringArray.find(function (x) { return x.languageCode === constants_1.DEFAULT_LANGUAGE_CODE; });
    }
    if (!match) {
        match = stringArray[0];
    }
    return match.value;
}
function coerceValueToType(value, type, isList) {
    if (isList) {
        try {
            return JSON.parse(value).map(function (v) { return coerceValueToType(v, type, false); });
        }
        catch (err) {
            throw new errors_1.InternalServerError("Could not parse list value \"".concat(value, "\": ") + JSON.stringify(err.message));
        }
    }
    switch (type) {
        case 'string':
            return value;
        case 'int':
            return Number.parseInt(value || '', 10);
        case 'float':
            return Number.parseFloat(value || '');
        case 'datetime':
            return Date.parse(value || '');
        case 'boolean':
            return !!(value && (value.toLowerCase() === 'true' || value === '1'));
        case 'ID':
            return value;
        default:
            (0, shared_utils_1.assertNever)(type);
    }
}
