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
exports.ENABLE_INSTRUMENTATION_ENV_VAR = void 0;
exports.Instrument = Instrument;
exports.getInstrumentedClassTarget = getInstrumentedClassTarget;
var config_helpers_1 = require("../config/config-helpers");
var noop_instrumentation_strategy_1 = require("../config/system/noop-instrumentation-strategy");
exports.ENABLE_INSTRUMENTATION_ENV_VAR = 'VENDURE_ENABLE_INSTRUMENTATION';
var INSTRUMENTED_CLASS = Symbol('InstrumentedClassTarget');
/**
 * @description
 * This decorator is used to apply instrumentation to a class. It is intended to be used in conjunction
 * with an {@link InstrumentationStrategy} which defines how the instrumentation should be applied.
 *
 * In order for the instrumentation to be applied, the `VENDURE_ENABLE_INSTRUMENTATION` environment
 * variable (exported from the `@vendure/core` package as `ENABLE_INSTRUMENTATION_ENV_VAR`) must be set to `true`.
 * This is done to avoid the overhead of instrumentation in environments where it is not needed.
 *
 * :::warning
 * You should _not_ decorate GraphQL resolvers & REST controllers with this decorator. Those will
 * already be instrumented, and adding the `@Instrument()` decorator will potentially
 * interfere with other NestJS decorators on your resolver methods.
 * :::
 *
 * For more information on how instrumentation is used, see docs on the TelemetryPlugin.
 *
 * @example
 * ```ts
 * import { Instrument } from '\@vendure/core';
 * import { Injectable } from '\@nestjs/common';
 *
 * \@Injectable()
 * // highlight-next-line
 * \@Instrument()
 * export class MyService {
 *
 *   // Calls to this method will be instrumented
 *   myMethod() {
 *     // ...
 *   }
 * }
 * ```
 *
 * @since 3.3.0
 * @docsCategory telemetry
 */
function Instrument() {
    return function (target) {
        // Since the instrumentation is not "free" (it will wrap all instrumented classes in a
        // Proxy, which has some overhead), we will only do this if explicitly requested by the
        // presence of this env var. The `@vendure/telemetry-plugin` package sets this in its configuration,
        // which will be run before any of the Vendure code is loaded.
        if (process.env[exports.ENABLE_INSTRUMENTATION_ENV_VAR] == null) {
            return target;
        }
        // Add type guard to ensure target is a constructor
        if (typeof target !== 'function') {
            return target;
        }
        var InstrumentedClass = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // eslint-disable-next-line constructor-super
                var _this = _super.apply(this, args) || this;
                var config = (0, config_helpers_1.getConfig)();
                var instrumentationStrategy = config.systemOptions.instrumentationStrategy;
                if (!instrumentationStrategy) {
                    return _this;
                }
                if (instrumentationStrategy instanceof noop_instrumentation_strategy_1.NoopInstrumentationStrategy) {
                    throw new Error('Please add a TelemetryPlugin to your VendureConfig');
                }
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var instance = _this;
                var proxy = new Proxy(_this, {
                    get: function (obj, prop) {
                        var original = obj[prop];
                        if (typeof original === 'function') {
                            // Bind the method to the proxy instance to ensure internal calls go through the proxy
                            var boundMethod_1 = original.bind(proxy);
                            return function () {
                                var _this = this;
                                var methodArgs = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    methodArgs[_i] = arguments[_i];
                                }
                                var applyOriginalFunction = boundMethod_1.constructor.name === 'AsyncFunction'
                                    ? function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, boundMethod_1.apply(void 0, methodArgs)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    }); }); }
                                    : function () { return boundMethod_1.apply(void 0, methodArgs); };
                                var wrappedMethodArgs = {
                                    instance: instance,
                                    target: target,
                                    methodName: String(prop),
                                    args: methodArgs,
                                    applyOriginalFunction: applyOriginalFunction,
                                };
                                return instrumentationStrategy.wrapMethod(wrappedMethodArgs);
                            };
                        }
                        return original;
                    },
                });
                return proxy;
            }
            return class_1;
        }(target));
        // Set the name property of ProxiedClass to match the target's name
        Object.defineProperty(InstrumentedClass, 'name', { value: target.name });
        Object.defineProperty(InstrumentedClass, INSTRUMENTED_CLASS, { value: target });
        return InstrumentedClass;
    };
}
/**
 * @description
 * This function is used to retrieve the original class of an instrumented class. It is intended for
 * use in an {@link InstrumentationStrategy} only, and should not generally be used in application code.
 *
 * @since 3.3.0
 */
function getInstrumentedClassTarget(input) {
    return input[INSTRUMENTED_CLASS];
}
