"use strict";
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
exports.ShippingMethodService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var omit_1 = require("@vendure/common/lib/omit");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var shipping_method_translation_entity_1 = require("../../entity/shipping-method/shipping-method-translation.entity");
var shipping_method_entity_1 = require("../../entity/shipping-method/shipping-method.entity");
var shipping_method_event_1 = require("../../event-bus/events/shipping-method-event");
/**
 * @description
 * Contains methods relating to {@link ShippingMethod} entities.
 *
 * @docsCategory services
 */
var ShippingMethodService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ShippingMethodService = _classThis = /** @class */ (function () {
        function ShippingMethodService_1(connection, configService, roleService, listQueryBuilder, channelService, configArgService, translatableSaver, customFieldRelationService, eventBus, translator) {
            this.connection = connection;
            this.configService = configService;
            this.roleService = roleService;
            this.listQueryBuilder = listQueryBuilder;
            this.channelService = channelService;
            this.configArgService = configArgService;
            this.translatableSaver = translatableSaver;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
            this.translator = translator;
        }
        /** @internal */
        ShippingMethodService_1.prototype.initShippingMethods = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.configService.shippingOptions.fulfillmentHandlers.length === 0) {
                                throw new Error('No FulfillmentHandlers were found.' +
                                    ' Please ensure the VendureConfig.shippingOptions.fulfillmentHandlers array contains at least one FulfillmentHandler.');
                            }
                            return [4 /*yield*/, this.verifyShippingMethods()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.findAll = function (ctx, options, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            return this.listQueryBuilder
                .build(shipping_method_entity_1.ShippingMethod, options, {
                relations: relations,
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                channelId: ctx.channelId,
                ctx: ctx,
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items.map(function (i) { return _this.translator.translate(i, ctx); }),
                    totalItems: totalItems,
                });
            });
        };
        ShippingMethodService_1.prototype.findOne = function (ctx_1, shippingMethodId_1) {
            return __awaiter(this, arguments, void 0, function (ctx, shippingMethodId, includeDeleted, relations) {
                var shippingMethod;
                var _a;
                if (includeDeleted === void 0) { includeDeleted = false; }
                if (relations === void 0) { relations = []; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.findOneInChannel(ctx, shipping_method_entity_1.ShippingMethod, shippingMethodId, ctx.channelId, __assign({ relations: relations }, (includeDeleted === false ? { where: { deletedAt: (0, typeorm_1.IsNull)() } } : {})))];
                        case 1:
                            shippingMethod = _b.sent();
                            return [2 /*return*/, (_a = (shippingMethod && this.translator.translate(shippingMethod, ctx))) !== null && _a !== void 0 ? _a : undefined];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var shippingMethod, newShippingMethod, shippingMethodWithRelations;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.create({
                                ctx: ctx,
                                input: input,
                                entityType: shipping_method_entity_1.ShippingMethod,
                                translationType: shipping_method_translation_entity_1.ShippingMethodTranslation,
                                beforeSave: function (method) {
                                    method.fulfillmentHandlerCode = _this.ensureValidFulfillmentHandlerCode(method.code, input.fulfillmentHandler);
                                    method.checker = _this.configArgService.parseInput('ShippingEligibilityChecker', input.checker);
                                    method.calculator = _this.configArgService.parseInput('ShippingCalculator', input.calculator);
                                },
                            })];
                        case 1:
                            shippingMethod = _a.sent();
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(shippingMethod, ctx)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, shipping_method_entity_1.ShippingMethod)
                                    .save(shippingMethod)];
                        case 3:
                            newShippingMethod = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, shipping_method_entity_1.ShippingMethod, input, newShippingMethod)];
                        case 4:
                            shippingMethodWithRelations = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new shipping_method_event_1.ShippingMethodEvent(ctx, shippingMethodWithRelations, 'created', input))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, newShippingMethod.id))];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var shippingMethod, updatedShippingMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, input.id)];
                        case 1:
                            shippingMethod = _a.sent();
                            if (!shippingMethod) {
                                throw new errors_1.EntityNotFoundError('ShippingMethod', input.id);
                            }
                            return [4 /*yield*/, this.translatableSaver.update({
                                    ctx: ctx,
                                    input: (0, omit_1.omit)(input, ['checker', 'calculator']),
                                    entityType: shipping_method_entity_1.ShippingMethod,
                                    translationType: shipping_method_translation_entity_1.ShippingMethodTranslation,
                                })];
                        case 2:
                            updatedShippingMethod = _a.sent();
                            if (input.checker) {
                                updatedShippingMethod.checker = this.configArgService.parseInput('ShippingEligibilityChecker', input.checker);
                            }
                            if (input.calculator) {
                                updatedShippingMethod.calculator = this.configArgService.parseInput('ShippingCalculator', input.calculator);
                            }
                            if (input.fulfillmentHandler) {
                                updatedShippingMethod.fulfillmentHandlerCode = this.ensureValidFulfillmentHandlerCode(updatedShippingMethod.code, input.fulfillmentHandler);
                            }
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, shipping_method_entity_1.ShippingMethod, input, updatedShippingMethod)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, shipping_method_entity_1.ShippingMethod)
                                    .save(updatedShippingMethod, { reload: false })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new shipping_method_event_1.ShippingMethodEvent(ctx, shippingMethod, 'updated', input))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, shippingMethod.id))];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.softDelete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var shippingMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, shipping_method_entity_1.ShippingMethod, id, {
                                channelId: ctx.channelId,
                                where: { deletedAt: (0, typeorm_1.IsNull)() },
                            })];
                        case 1:
                            shippingMethod = _a.sent();
                            shippingMethod.deletedAt = new Date();
                            return [4 /*yield*/, this.connection.getRepository(ctx, shipping_method_entity_1.ShippingMethod).save(shippingMethod, { reload: false })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new shipping_method_event_1.ShippingMethodEvent(ctx, shippingMethod, 'deleted', id))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.assignShippingMethodsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, _i, _a, shippingMethodId, shippingMethod;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.UpdateShippingMethod,
                                generated_types_1.Permission.UpdateSettings,
                            ])];
                        case 1:
                            hasPermission = _b.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            _i = 0, _a = input.shippingMethodIds;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            shippingMethodId = _a[_i];
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, shipping_method_entity_1.ShippingMethod, shippingMethodId, ctx.channelId)];
                        case 3:
                            shippingMethod = _b.sent();
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, shipping_method_entity_1.ShippingMethod, shippingMethodId, [
                                    input.channelId,
                                ])];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/, this.connection
                                .findByIdsInChannel(ctx, shipping_method_entity_1.ShippingMethod, input.shippingMethodIds, ctx.channelId, {})
                                .then(function (methods) { return methods.map(function (method) { return _this.translator.translate(method, ctx); }); })];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.removeShippingMethodsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, defaultChannel, _i, _a, shippingMethodId, shippingMethod;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.DeleteShippingMethod,
                                generated_types_1.Permission.DeleteSettings,
                            ])];
                        case 1:
                            hasPermission = _b.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 2:
                            defaultChannel = _b.sent();
                            if ((0, utils_1.idsAreEqual)(input.channelId, defaultChannel.id)) {
                                throw new errors_1.UserInputError('error.items-cannot-be-removed-from-default-channel');
                            }
                            _i = 0, _a = input.shippingMethodIds;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            shippingMethodId = _a[_i];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, shipping_method_entity_1.ShippingMethod, shippingMethodId)];
                        case 4:
                            shippingMethod = _b.sent();
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, shipping_method_entity_1.ShippingMethod, shippingMethodId, [
                                    input.channelId,
                                ])];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7: return [2 /*return*/, this.connection
                                .findByIdsInChannel(ctx, shipping_method_entity_1.ShippingMethod, input.shippingMethodIds, ctx.channelId, {})
                                .then(function (methods) { return methods.map(function (method) { return _this.translator.translate(method, ctx); }); })];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.getShippingEligibilityCheckers = function (ctx) {
            return this.configArgService
                .getDefinitions('ShippingEligibilityChecker')
                .map(function (x) { return x.toGraphQlType(ctx); });
        };
        ShippingMethodService_1.prototype.getShippingCalculators = function (ctx) {
            return this.configArgService.getDefinitions('ShippingCalculator').map(function (x) { return x.toGraphQlType(ctx); });
        };
        ShippingMethodService_1.prototype.getFulfillmentHandlers = function (ctx) {
            return this.configArgService.getDefinitions('FulfillmentHandler').map(function (x) { return x.toGraphQlType(ctx); });
        };
        ShippingMethodService_1.prototype.getActiveShippingMethods = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var shippingMethods;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, shipping_method_entity_1.ShippingMethod).find({
                                relations: ['channels', 'customFields'],
                                where: { deletedAt: (0, typeorm_1.IsNull)() },
                            })];
                        case 1:
                            shippingMethods = _a.sent();
                            return [2 /*return*/, shippingMethods
                                    .filter(function (sm) { return sm.channels.find(function (c) { return (0, utils_1.idsAreEqual)(c.id, ctx.channelId); }); })
                                    .map(function (m) { return _this.translator.translate(m, ctx); })];
                    }
                });
            });
        };
        /**
         * Ensures that all ShippingMethods have a valid fulfillmentHandlerCode
         */
        ShippingMethodService_1.prototype.verifyShippingMethods = function () {
            return __awaiter(this, void 0, void 0, function () {
                var activeShippingMethods, _i, activeShippingMethods_1, method, handlerCode, verifiedHandlerCode;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.rawConnection.getRepository(shipping_method_entity_1.ShippingMethod).find({
                                where: { deletedAt: (0, typeorm_1.IsNull)() },
                            })];
                        case 1:
                            activeShippingMethods = _a.sent();
                            _i = 0, activeShippingMethods_1 = activeShippingMethods;
                            _a.label = 2;
                        case 2:
                            if (!(_i < activeShippingMethods_1.length)) return [3 /*break*/, 5];
                            method = activeShippingMethods_1[_i];
                            handlerCode = method.fulfillmentHandlerCode;
                            verifiedHandlerCode = this.ensureValidFulfillmentHandlerCode(method.code, handlerCode);
                            if (!(handlerCode !== verifiedHandlerCode)) return [3 /*break*/, 4];
                            method.fulfillmentHandlerCode = verifiedHandlerCode;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(shipping_method_entity_1.ShippingMethod).save(method)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        ShippingMethodService_1.prototype.ensureValidFulfillmentHandlerCode = function (shippingMethodCode, fulfillmentHandlerCode) {
            var fulfillmentHandlers = this.configService.shippingOptions.fulfillmentHandlers;
            var handler = fulfillmentHandlers.find(function (h) { return h.code === fulfillmentHandlerCode; });
            if (!handler) {
                handler = fulfillmentHandlers[0];
                vendure_logger_1.Logger.error("The ShippingMethod \"".concat(shippingMethodCode, "\" references an invalid FulfillmentHandler.\n") +
                    "The FulfillmentHandler with code \"".concat(fulfillmentHandlerCode, "\" was not found. Using \"").concat(handler.code, "\" instead."));
            }
            return handler.code;
        };
        return ShippingMethodService_1;
    }());
    __setFunctionName(_classThis, "ShippingMethodService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShippingMethodService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShippingMethodService = _classThis;
}();
exports.ShippingMethodService = ShippingMethodService;
