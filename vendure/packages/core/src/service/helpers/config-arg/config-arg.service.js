"use strict";
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
exports.ConfigArgService = void 0;
var common_1 = require("@nestjs/common");
var errors_1 = require("../../../common/error/errors");
/**
 * This helper class provides methods relating to ConfigurableOperationDef instances.
 */
var ConfigArgService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConfigArgService = _classThis = /** @class */ (function () {
        function ConfigArgService_1(configService) {
            this.configService = configService;
            this.definitionsByType = {
                CollectionFilter: this.configService.catalogOptions.collectionFilters,
                EntityDuplicator: this.configService.entityOptions.entityDuplicators,
                FulfillmentHandler: this.configService.shippingOptions.fulfillmentHandlers,
                PaymentMethodEligibilityChecker: this.configService.paymentOptions.paymentMethodEligibilityCheckers || [],
                PaymentMethodHandler: this.configService.paymentOptions.paymentMethodHandlers,
                PromotionAction: this.configService.promotionOptions.promotionActions,
                PromotionCondition: this.configService.promotionOptions.promotionConditions,
                ShippingCalculator: this.configService.shippingOptions.shippingCalculators,
                ShippingEligibilityChecker: this.configService.shippingOptions.shippingEligibilityCheckers,
            };
        }
        ConfigArgService_1.prototype.getDefinitions = function (defType) {
            return this.definitionsByType[defType];
        };
        ConfigArgService_1.prototype.getByCode = function (defType, code) {
            var defsOfType = this.getDefinitions(defType);
            var match = defsOfType.find(function (def) { return def.code === code; });
            if (!match) {
                throw new errors_1.UserInputError('error.no-configurable-operation-def-with-code-found', {
                    code: code,
                    type: defType,
                });
            }
            return match;
        };
        /**
         * Parses and validates the input to a ConfigurableOperation.
         */
        ConfigArgService_1.prototype.parseInput = function (defType, input) {
            var match = this.getByCode(defType, input.code);
            this.validateRequiredFields(input, match);
            var orderedArgs = this.orderArgsToMatchDef(match, input.arguments);
            return {
                code: input.code,
                args: orderedArgs,
            };
        };
        ConfigArgService_1.prototype.orderArgsToMatchDef = function (def, args) {
            var output = [];
            var _loop_1 = function (name_1) {
                var match = args.find(function (arg) { return arg.name === name_1; });
                if (match) {
                    output.push(match);
                }
            };
            for (var _i = 0, _a = Object.keys(def.args); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                _loop_1(name_1);
            }
            return output;
        };
        ConfigArgService_1.prototype.validateRequiredFields = function (input, def) {
            var _loop_2 = function (name_2, argDef) {
                if (argDef.required) {
                    var inputArg = input.arguments.find(function (a) { return a.name === name_2; });
                    var valid = false;
                    try {
                        if (['string', 'ID', 'datetime'].includes(argDef.type)) {
                            valid = !!inputArg && inputArg.value !== '' && inputArg.value != null;
                        }
                        else {
                            valid = !!inputArg && JSON.parse(inputArg.value) != null;
                        }
                    }
                    catch (e) {
                        // ignore
                    }
                    if (!valid) {
                        throw new errors_1.UserInputError('error.configurable-argument-is-required', {
                            name: name_2,
                        });
                    }
                }
            };
            for (var _i = 0, _a = Object.entries(def.args); _i < _a.length; _i++) {
                var _b = _a[_i], name_2 = _b[0], argDef = _b[1];
                _loop_2(name_2, argDef);
            }
        };
        return ConfigArgService_1;
    }());
    __setFunctionName(_classThis, "ConfigArgService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConfigArgService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConfigArgService = _classThis;
}();
exports.ConfigArgService = ConfigArgService;
