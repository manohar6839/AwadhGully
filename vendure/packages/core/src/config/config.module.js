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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
var common_1 = require("@nestjs/common");
var injector_1 = require("../common/injector");
var config_helpers_1 = require("./config-helpers");
var config_service_1 = require("./config.service");
var ConfigModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            providers: [config_service_1.ConfigService],
            exports: [config_service_1.ConfigService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConfigModule = _classThis = /** @class */ (function () {
        function ConfigModule_1(configService, moduleRef) {
            this.configService = configService;
            this.moduleRef = moduleRef;
        }
        ConfigModule_1.prototype.onApplicationBootstrap = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.initInjectableStrategies()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.initConfigurableOperations()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ConfigModule_1.prototype.onApplicationShutdown = function (signal) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.destroyInjectableStrategies()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.destroyConfigurableOperations()];
                        case 2:
                            _a.sent();
                            /**
                             * When the application shuts down, we reset the activeConfig to the default. Usually this is
                             * redundant, as the app shutdown would normally coincide with the process ending. However, in some
                             * circumstances, such as when running migrations immediately followed by app bootstrap, the activeConfig
                             * will persist between these two applications and mutations e.g. to the CustomFields will result in
                             * hard-to-debug errors. So resetting is a precaution against this scenario.
                             */
                            (0, config_helpers_1.resetConfig)();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ConfigModule_1.prototype.initInjectableStrategies = function () {
            return __awaiter(this, void 0, void 0, function () {
                var injector, _i, _a, strategy;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            injector = new injector_1.Injector(this.moduleRef);
                            _i = 0, _a = this.getInjectableStrategies();
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            strategy = _a[_i];
                            if (!(typeof strategy.init === 'function')) return [3 /*break*/, 3];
                            return [4 /*yield*/, strategy.init(injector)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ConfigModule_1.prototype.destroyInjectableStrategies = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, strategy;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.getInjectableStrategies();
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            strategy = _a[_i];
                            if (!(typeof strategy.destroy === 'function')) return [3 /*break*/, 3];
                            return [4 /*yield*/, strategy.destroy()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ConfigModule_1.prototype.initConfigurableOperations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var injector, _i, _a, operation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            injector = new injector_1.Injector(this.moduleRef);
                            _i = 0, _a = this.getConfigurableOperations();
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            operation = _a[_i];
                            return [4 /*yield*/, operation.init(injector)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ConfigModule_1.prototype.destroyConfigurableOperations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, operation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.getConfigurableOperations();
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            operation = _a[_i];
                            return [4 /*yield*/, operation.destroy()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ConfigModule_1.prototype.getInjectableStrategies = function () {
            var _a = this.configService.assetOptions, assetNamingStrategy = _a.assetNamingStrategy, assetPreviewStrategy = _a.assetPreviewStrategy, assetStorageStrategy = _a.assetStorageStrategy;
            var _b = this.configService.catalogOptions, productVariantPriceCalculationStrategy = _b.productVariantPriceCalculationStrategy, productVariantPriceSelectionStrategy = _b.productVariantPriceSelectionStrategy, productVariantPriceUpdateStrategy = _b.productVariantPriceUpdateStrategy, stockDisplayStrategy = _b.stockDisplayStrategy, stockLocationStrategy = _b.stockLocationStrategy;
            var _c = this.configService.authOptions, adminAuthenticationStrategy = _c.adminAuthenticationStrategy, shopAuthenticationStrategy = _c.shopAuthenticationStrategy, sessionCacheStrategy = _c.sessionCacheStrategy, passwordHashingStrategy = _c.passwordHashingStrategy, passwordValidationStrategy = _c.passwordValidationStrategy, verificationTokenStrategy = _c.verificationTokenStrategy;
            var _d = this.configService.taxOptions, taxZoneStrategy = _d.taxZoneStrategy, taxLineCalculationStrategy = _d.taxLineCalculationStrategy;
            var _e = this.configService.jobQueueOptions, jobQueueStrategy = _e.jobQueueStrategy, jobBufferStorageStrategy = _e.jobBufferStorageStrategy;
            var schedulerStrategy = this.configService.schedulerOptions.schedulerStrategy;
            var _f = this.configService.orderOptions, mergeStrategy = _f.mergeStrategy, checkoutMergeStrategy = _f.checkoutMergeStrategy, orderItemPriceCalculationStrategy = _f.orderItemPriceCalculationStrategy, orderProcess = _f.process, orderCodeStrategy = _f.orderCodeStrategy, orderByCodeAccessStrategy = _f.orderByCodeAccessStrategy, stockAllocationStrategy = _f.stockAllocationStrategy, activeOrderStrategy = _f.activeOrderStrategy, changedPriceHandlingStrategy = _f.changedPriceHandlingStrategy, orderSellerStrategy = _f.orderSellerStrategy, guestCheckoutStrategy = _f.guestCheckoutStrategy, orderInterceptors = _f.orderInterceptors;
            var _g = this.configService.shippingOptions, customFulfillmentProcess = _g.customFulfillmentProcess, fulfillmentProcess = _g.process, shippingLineAssignmentStrategy = _g.shippingLineAssignmentStrategy;
            var _h = this.configService.paymentOptions, customPaymentProcess = _h.customPaymentProcess, paymentProcess = _h.process;
            var entityIdStrategyDeprecated = this.configService.entityIdStrategy;
            var entityIdStrategyCurrent = this.configService.entityOptions.entityIdStrategy;
            var _j = this.configService.systemOptions, healthChecks = _j.healthChecks, errorHandlers = _j.errorHandlers;
            var assetImportStrategy = this.configService.importExportOptions.assetImportStrategy;
            var refundProcess = this.configService.paymentOptions.refundProcess;
            var _k = this.configService.systemOptions, cacheStrategy = _k.cacheStrategy, instrumentationStrategy = _k.instrumentationStrategy;
            var entityIdStrategy = entityIdStrategyCurrent !== null && entityIdStrategyCurrent !== void 0 ? entityIdStrategyCurrent : entityIdStrategyDeprecated;
            return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], adminAuthenticationStrategy, true), shopAuthenticationStrategy, true), [
                sessionCacheStrategy,
                passwordHashingStrategy,
                passwordValidationStrategy,
                verificationTokenStrategy,
                assetNamingStrategy,
                assetPreviewStrategy,
                assetStorageStrategy,
                taxZoneStrategy,
                taxLineCalculationStrategy,
                jobQueueStrategy,
                jobBufferStorageStrategy,
                mergeStrategy,
                checkoutMergeStrategy,
                orderCodeStrategy,
                orderByCodeAccessStrategy,
                entityIdStrategy,
                productVariantPriceCalculationStrategy,
                productVariantPriceUpdateStrategy,
                orderItemPriceCalculationStrategy
            ], false), orderProcess, true), customFulfillmentProcess, true), fulfillmentProcess, true), customPaymentProcess, true), paymentProcess, true), [
                stockAllocationStrategy,
                stockDisplayStrategy
            ], false), healthChecks, true), errorHandlers, true), [
                assetImportStrategy,
                changedPriceHandlingStrategy
            ], false), (Array.isArray(activeOrderStrategy) ? activeOrderStrategy : [activeOrderStrategy]), true), [
                orderSellerStrategy,
                shippingLineAssignmentStrategy,
                stockLocationStrategy,
                productVariantPriceSelectionStrategy,
                guestCheckoutStrategy
            ], false), refundProcess, true), [
                cacheStrategy
            ], false), (instrumentationStrategy ? [instrumentationStrategy] : []), true), orderInterceptors, true), [
                schedulerStrategy,
            ], false);
        };
        ConfigModule_1.prototype.getConfigurableOperations = function () {
            var _a = this.configService.paymentOptions, paymentMethodHandlers = _a.paymentMethodHandlers, paymentMethodEligibilityCheckers = _a.paymentMethodEligibilityCheckers;
            var collectionFilters = this.configService.catalogOptions.collectionFilters;
            var entityDuplicators = this.configService.entityOptions.entityDuplicators;
            var _b = this.configService.promotionOptions, promotionActions = _b.promotionActions, promotionConditions = _b.promotionConditions;
            var _c = this.configService.shippingOptions, shippingCalculators = _c.shippingCalculators, shippingEligibilityCheckers = _c.shippingEligibilityCheckers, fulfillmentHandlers = _c.fulfillmentHandlers;
            return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], (paymentMethodEligibilityCheckers || []), true), paymentMethodHandlers, true), collectionFilters, true), (promotionActions || []), true), (promotionConditions || []), true), (shippingCalculators || []), true), (shippingEligibilityCheckers || []), true), (fulfillmentHandlers || []), true), (entityDuplicators || []), true);
        };
        return ConfigModule_1;
    }());
    __setFunctionName(_classThis, "ConfigModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConfigModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConfigModule = _classThis;
}();
exports.ConfigModule = ConfigModule;
