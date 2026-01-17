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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_constants_1 = require("@vendure/common/lib/shared-constants");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var payment_method_translation_entity_1 = require("../../entity/payment-method/payment-method-translation.entity");
var payment_method_entity_1 = require("../../entity/payment-method/payment-method.entity");
var payment_method_event_1 = require("../../event-bus/events/payment-method-event");
/**
 * @description
 * Contains methods relating to {@link PaymentMethod} entities.
 *
 * @docsCategory services
 */
var PaymentMethodService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentMethodService = _classThis = /** @class */ (function () {
        function PaymentMethodService_1(connection, configService, roleService, listQueryBuilder, eventBus, configArgService, channelService, customFieldRelationService, translatableSaver, translator) {
            this.connection = connection;
            this.configService = configService;
            this.roleService = roleService;
            this.listQueryBuilder = listQueryBuilder;
            this.eventBus = eventBus;
            this.configArgService = configArgService;
            this.channelService = channelService;
            this.customFieldRelationService = customFieldRelationService;
            this.translatableSaver = translatableSaver;
            this.translator = translator;
        }
        PaymentMethodService_1.prototype.findAll = function (ctx, options, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            return this.listQueryBuilder
                .build(payment_method_entity_1.PaymentMethod, options, { ctx: ctx, relations: relations, channelId: ctx.channelId })
                .getManyAndCount()
                .then(function (_a) {
                var methods = _a[0], totalItems = _a[1];
                var items = methods.map(function (m) { return _this.translator.translate(m, ctx); });
                return {
                    items: items,
                    totalItems: totalItems,
                };
            });
        };
        PaymentMethodService_1.prototype.findOne = function (ctx, paymentMethodId, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            return this.connection
                .findOneInChannel(ctx, payment_method_entity_1.PaymentMethod, paymentMethodId, ctx.channelId, {
                relations: relations,
            })
                .then(function (paymentMethod) {
                if (paymentMethod) {
                    return _this.translator.translate(paymentMethod, ctx);
                }
            });
        };
        PaymentMethodService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var savedPaymentMethod;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.create({
                                ctx: ctx,
                                input: input,
                                entityType: payment_method_entity_1.PaymentMethod,
                                translationType: payment_method_translation_entity_1.PaymentMethodTranslation,
                                beforeSave: function (pm) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                pm.handler = this.configArgService.parseInput('PaymentMethodHandler', input.handler);
                                                if (input.checker) {
                                                    pm.checker = this.configArgService.parseInput('PaymentMethodEligibilityChecker', input.checker);
                                                }
                                                return [4 /*yield*/, this.channelService.assignToCurrentChannel(pm, ctx)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            })];
                        case 1:
                            savedPaymentMethod = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, payment_method_entity_1.PaymentMethod, input, savedPaymentMethod)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_method_event_1.PaymentMethodEvent(ctx, savedPaymentMethod, 'created', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, savedPaymentMethod.id))];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedPaymentMethod;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.update({
                                ctx: ctx,
                                input: input,
                                entityType: payment_method_entity_1.PaymentMethod,
                                translationType: payment_method_translation_entity_1.PaymentMethodTranslation,
                                beforeSave: function (pm) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (input.checker) {
                                            pm.checker = this.configArgService.parseInput('PaymentMethodEligibilityChecker', input.checker);
                                        }
                                        if (input.checker === null) {
                                            pm.checker = null;
                                        }
                                        if (input.handler) {
                                            pm.handler = this.configArgService.parseInput('PaymentMethodHandler', input.handler);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); },
                            })];
                        case 1:
                            updatedPaymentMethod = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, payment_method_entity_1.PaymentMethod, input, updatedPaymentMethod)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_method_event_1.PaymentMethodEvent(ctx, updatedPaymentMethod, 'updated', input))];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_method_entity_1.PaymentMethod).save(updatedPaymentMethod, { reload: false })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, updatedPaymentMethod.id))];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.delete = function (ctx_1, paymentMethodId_1) {
            return __awaiter(this, arguments, void 0, function (ctx, paymentMethodId, force) {
                var paymentMethod, nonDefaultChannels, message, result, deletedPaymentMethod, e_1;
                if (force === void 0) { force = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, payment_method_entity_1.PaymentMethod, paymentMethodId, {
                                relations: ['channels'],
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            paymentMethod = _a.sent();
                            if (!(ctx.channel.code === shared_constants_1.DEFAULT_CHANNEL_CODE)) return [3 /*break*/, 7];
                            nonDefaultChannels = paymentMethod.channels.filter(function (channel) { return channel.code !== shared_constants_1.DEFAULT_CHANNEL_CODE; });
                            if (0 < nonDefaultChannels.length && !force) {
                                message = ctx.translate('message.payment-method-used-in-channels', {
                                    channelCodes: nonDefaultChannels.map(function (c) { return c.code; }).join(', '),
                                });
                                result = generated_types_1.DeletionResult.NOT_DELETED;
                                return [2 /*return*/, { result: result, message: message }];
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            deletedPaymentMethod = new payment_method_entity_1.PaymentMethod(paymentMethod);
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_method_entity_1.PaymentMethod).remove(paymentMethod)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_method_event_1.PaymentMethodEvent(ctx, deletedPaymentMethod, 'deleted', paymentMethodId))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                        case 5:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: e_1.message || String(e_1),
                                }];
                        case 6: return [3 /*break*/, 10];
                        case 7:
                            // If not deleting from the default channel, we will not actually delete,
                            // but will remove from the current channel
                            paymentMethod.channels = paymentMethod.channels.filter(function (c) { return !(0, utils_1.idsAreEqual)(c.id, ctx.channelId); });
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_method_entity_1.PaymentMethod).save(paymentMethod)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_method_event_1.PaymentMethodEvent(ctx, paymentMethod, 'deleted', paymentMethodId))];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.assignPaymentMethodsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, _i, _a, paymentMethodId, paymentMethod;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.UpdatePaymentMethod,
                                generated_types_1.Permission.UpdateSettings,
                            ])];
                        case 1:
                            hasPermission = _b.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            _i = 0, _a = input.paymentMethodIds;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            paymentMethodId = _a[_i];
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, payment_method_entity_1.PaymentMethod, paymentMethodId, ctx.channelId)];
                        case 3:
                            paymentMethod = _b.sent();
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, payment_method_entity_1.PaymentMethod, paymentMethodId, [
                                    input.channelId,
                                ])];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/, this.connection
                                .findByIdsInChannel(ctx, payment_method_entity_1.PaymentMethod, input.paymentMethodIds, ctx.channelId, {})
                                .then(function (methods) { return methods.map(function (method) { return _this.translator.translate(method, ctx); }); })];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.removePaymentMethodsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, defaultChannel, _i, _a, paymentMethodId, paymentMethod;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.DeletePaymentMethod,
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
                            _i = 0, _a = input.paymentMethodIds;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            paymentMethodId = _a[_i];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, payment_method_entity_1.PaymentMethod, paymentMethodId)];
                        case 4:
                            paymentMethod = _b.sent();
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, payment_method_entity_1.PaymentMethod, paymentMethodId, [
                                    input.channelId,
                                ])];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7: return [2 /*return*/, this.connection
                                .findByIdsInChannel(ctx, payment_method_entity_1.PaymentMethod, input.paymentMethodIds, ctx.channelId, {})
                                .then(function (methods) { return methods.map(function (method) { return _this.translator.translate(method, ctx); }); })];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.getPaymentMethodEligibilityCheckers = function (ctx) {
            return this.configArgService
                .getDefinitions('PaymentMethodEligibilityChecker')
                .map(function (x) { return x.toGraphQlType(ctx); });
        };
        PaymentMethodService_1.prototype.getPaymentMethodHandlers = function (ctx) {
            return this.configArgService.getDefinitions('PaymentMethodHandler').map(function (x) { return x.toGraphQlType(ctx); });
        };
        PaymentMethodService_1.prototype.getEligiblePaymentMethods = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var paymentMethods, results, paymentMethodsInChannel, _i, paymentMethodsInChannel_1, method, isEligible, eligibilityMessage, checker, eligible;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, payment_method_entity_1.PaymentMethod)
                                .find({ where: { enabled: true }, relations: ['channels'] })];
                        case 1:
                            paymentMethods = _a.sent();
                            results = [];
                            paymentMethodsInChannel = paymentMethods
                                .filter(function (p) { return p.channels.find(function (pc) { return (0, utils_1.idsAreEqual)(pc.id, ctx.channelId); }); })
                                .map(function (p) { return _this.translator.translate(p, ctx); });
                            _i = 0, paymentMethodsInChannel_1 = paymentMethodsInChannel;
                            _a.label = 2;
                        case 2:
                            if (!(_i < paymentMethodsInChannel_1.length)) return [3 /*break*/, 6];
                            method = paymentMethodsInChannel_1[_i];
                            isEligible = true;
                            eligibilityMessage = void 0;
                            if (!method.checker) return [3 /*break*/, 4];
                            checker = this.configArgService.getByCode('PaymentMethodEligibilityChecker', method.checker.code);
                            return [4 /*yield*/, checker.check(ctx, order, method.checker.args, method)];
                        case 3:
                            eligible = _a.sent();
                            if (eligible === false || typeof eligible === 'string') {
                                isEligible = false;
                                eligibilityMessage = typeof eligible === 'string' ? eligible : undefined;
                            }
                            _a.label = 4;
                        case 4:
                            results.push({
                                id: method.id,
                                code: method.code,
                                name: method.name,
                                description: method.description,
                                isEligible: isEligible,
                                eligibilityMessage: eligibilityMessage,
                                customFields: method.customFields,
                            });
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/, results];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.getMethodAndOperations = function (ctx, method) {
            return __awaiter(this, void 0, void 0, function () {
                var paymentMethod, handler, checker;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, payment_method_entity_1.PaymentMethod)
                                .createQueryBuilder('method')
                                .leftJoin('method.channels', 'channel')
                                .where('method.code = :code', { code: method })
                                .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                                .andWhere('method.enabled IS true')
                                .getOne()];
                        case 1:
                            paymentMethod = _a.sent();
                            if (!paymentMethod) {
                                throw new errors_1.UserInputError('error.payment-method-not-found', { method: method });
                            }
                            handler = this.configArgService.getByCode('PaymentMethodHandler', paymentMethod.handler.code);
                            checker = paymentMethod.checker &&
                                this.configArgService.getByCode('PaymentMethodEligibilityChecker', paymentMethod.checker.code);
                            return [2 /*return*/, { paymentMethod: paymentMethod, handler: handler, checker: checker }];
                    }
                });
            });
        };
        PaymentMethodService_1.prototype.getActivePaymentMethods = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var paymentMethods;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, payment_method_entity_1.PaymentMethod).find({
                                where: { enabled: true, channels: { id: ctx.channelId } },
                                relations: ['channels', 'customFields'],
                            })];
                        case 1:
                            paymentMethods = _a.sent();
                            return [2 /*return*/, paymentMethods.map(function (p) { return _this.translator.translate(p, ctx); })];
                    }
                });
            });
        };
        return PaymentMethodService_1;
    }());
    __setFunctionName(_classThis, "PaymentMethodService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentMethodService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentMethodService = _classThis;
}();
exports.PaymentMethodService = PaymentMethodService;
