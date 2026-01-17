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
exports.PromotionService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var adjustment_source_1 = require("../../common/types/adjustment-source");
var utils_1 = require("../../common/utils");
var order_entity_1 = require("../../entity/order/order.entity");
var promotion_translation_entity_1 = require("../../entity/promotion/promotion-translation.entity");
var promotion_entity_1 = require("../../entity/promotion/promotion.entity");
var promotion_event_1 = require("../../event-bus/events/promotion-event");
/**
 * @description
 * Contains methods relating to {@link Promotion} entities.
 *
 * @docsCategory services
 */
var PromotionService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PromotionService = _classThis = /** @class */ (function () {
        function PromotionService_1(connection, configService, channelService, listQueryBuilder, configArgService, customFieldRelationService, eventBus, translatableSaver, translator) {
            this.connection = connection;
            this.configService = configService;
            this.channelService = channelService;
            this.listQueryBuilder = listQueryBuilder;
            this.configArgService = configArgService;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
            this.translatableSaver = translatableSaver;
            this.translator = translator;
            this.availableConditions = [];
            this.availableActions = [];
            this.availableConditions = this.configService.promotionOptions.promotionConditions || [];
            this.availableActions = this.configService.promotionOptions.promotionActions || [];
        }
        PromotionService_1.prototype.findAll = function (ctx, options, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            return this.listQueryBuilder
                .build(promotion_entity_1.Promotion, options, {
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                channelId: ctx.channelId,
                relations: relations,
                ctx: ctx,
            })
                .getManyAndCount()
                .then(function (_a) {
                var promotions = _a[0], totalItems = _a[1];
                var items = promotions.map(function (promotion) { return _this.translator.translate(promotion, ctx); });
                return {
                    items: items,
                    totalItems: totalItems,
                };
            });
        };
        PromotionService_1.prototype.findOne = function (ctx_1, adjustmentSourceId_1) {
            return __awaiter(this, arguments, void 0, function (ctx, adjustmentSourceId, relations) {
                var _this = this;
                if (relations === void 0) { relations = []; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .findOneInChannel(ctx, promotion_entity_1.Promotion, adjustmentSourceId, ctx.channelId, {
                            where: { deletedAt: (0, typeorm_1.IsNull)() },
                            relations: relations,
                        })
                            .then(function (promotion) { var _a; return (_a = (promotion && _this.translator.translate(promotion, ctx))) !== null && _a !== void 0 ? _a : undefined; })];
                });
            });
        };
        PromotionService_1.prototype.getPromotionConditions = function (ctx) {
            return this.availableConditions.map(function (x) { return x.toGraphQlType(ctx); });
        };
        PromotionService_1.prototype.getPromotionActions = function (ctx) {
            return this.availableActions.map(function (x) { return x.toGraphQlType(ctx); });
        };
        PromotionService_1.prototype.createPromotion = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var conditions, actions, newPromotion, promotionWithRelations;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            conditions = input.conditions.map(function (c) {
                                return _this.configArgService.parseInput('PromotionCondition', c);
                            });
                            actions = input.actions.map(function (a) { return _this.configArgService.parseInput('PromotionAction', a); });
                            this.validateRequiredConditions(conditions, actions);
                            if (conditions.length === 0 && !input.couponCode) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.MissingConditionsError()];
                            }
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: ctx,
                                    input: input,
                                    entityType: promotion_entity_1.Promotion,
                                    translationType: promotion_translation_entity_1.PromotionTranslation,
                                    beforeSave: function (p) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    p.priorityScore = this.calculatePriorityScore(input);
                                                    p.conditions = conditions;
                                                    p.actions = actions;
                                                    return [4 /*yield*/, this.channelService.assignToCurrentChannel(p, ctx)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                })];
                        case 1:
                            newPromotion = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, promotion_entity_1.Promotion, input, newPromotion)];
                        case 2:
                            promotionWithRelations = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new promotion_event_1.PromotionEvent(ctx, promotionWithRelations, 'created', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, newPromotion.id))];
                    }
                });
            });
        };
        PromotionService_1.prototype.updatePromotion = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var promotion, hasConditions, hasCouponCode, updatedPromotion;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, promotion_entity_1.Promotion, input.id, {
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            promotion = _a.sent();
                            hasConditions = input.conditions
                                ? input.conditions.length > 0
                                : promotion.conditions.length > 0;
                            hasCouponCode = input.couponCode != null ? !!input.couponCode : !!promotion.couponCode;
                            if (!hasConditions && !hasCouponCode) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.MissingConditionsError()];
                            }
                            return [4 /*yield*/, this.translatableSaver.update({
                                    ctx: ctx,
                                    input: input,
                                    entityType: promotion_entity_1.Promotion,
                                    translationType: promotion_translation_entity_1.PromotionTranslation,
                                    beforeSave: function (p) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            p.priorityScore = this.calculatePriorityScore(input);
                                            if (input.conditions) {
                                                p.conditions = input.conditions.map(function (c) {
                                                    return _this.configArgService.parseInput('PromotionCondition', c);
                                                });
                                            }
                                            if (input.actions) {
                                                p.actions = input.actions.map(function (a) {
                                                    return _this.configArgService.parseInput('PromotionAction', a);
                                                });
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); },
                                })];
                        case 2:
                            updatedPromotion = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, promotion_entity_1.Promotion, input, updatedPromotion)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new promotion_event_1.PromotionEvent(ctx, promotion, 'updated', input))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, updatedPromotion.id))];
                    }
                });
            });
        };
        PromotionService_1.prototype.softDeletePromotion = function (ctx, promotionId) {
            return __awaiter(this, void 0, void 0, function () {
                var promotion;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, promotion_entity_1.Promotion, promotionId)];
                        case 1:
                            promotion = _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, promotion_entity_1.Promotion)
                                    .update({ id: promotionId }, { deletedAt: new Date() })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new promotion_event_1.PromotionEvent(ctx, promotion, 'deleted', promotionId))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        PromotionService_1.prototype.assignPromotionsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var promotions, _i, promotions_1, promotion;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findByIdsInChannel(ctx, promotion_entity_1.Promotion, input.promotionIds, ctx.channelId, {})];
                        case 1:
                            promotions = _a.sent();
                            _i = 0, promotions_1 = promotions;
                            _a.label = 2;
                        case 2:
                            if (!(_i < promotions_1.length)) return [3 /*break*/, 5];
                            promotion = promotions_1[_i];
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, promotion_entity_1.Promotion, promotion.id, [input.channelId])];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, promotions.map(function (p) { return _this.translator.translate(p, ctx); })];
                    }
                });
            });
        };
        PromotionService_1.prototype.removePromotionsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var promotions, _i, promotions_2, promotion;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findByIdsInChannel(ctx, promotion_entity_1.Promotion, input.promotionIds, ctx.channelId, {})];
                        case 1:
                            promotions = _a.sent();
                            _i = 0, promotions_2 = promotions;
                            _a.label = 2;
                        case 2:
                            if (!(_i < promotions_2.length)) return [3 /*break*/, 5];
                            promotion = promotions_2[_i];
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, promotion_entity_1.Promotion, promotion.id, [input.channelId])];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, promotions.map(function (p) { return _this.translator.translate(p, ctx); })];
                    }
                });
            });
        };
        /**
         * @description
         * Checks the validity of a coupon code, by checking that it is associated with an existing,
         * enabled and non-expired Promotion. Additionally, if there is a usage limit on the coupon code,
         * this method will enforce that limit against the specified Customer.
         */
        PromotionService_1.prototype.validateCouponCode = function (ctx, couponCode, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var promotion, usageCount, usageCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, promotion_entity_1.Promotion).findOne({
                                where: {
                                    couponCode: couponCode,
                                    enabled: true,
                                    deletedAt: (0, typeorm_1.IsNull)(),
                                    channels: { id: ctx.channelId },
                                },
                                relations: ['channels'],
                            })];
                        case 1:
                            promotion = _a.sent();
                            if (!promotion ||
                                promotion.couponCode !== couponCode ||
                                !promotion.channels.find(function (c) { return (0, utils_1.idsAreEqual)(c.id, ctx.channelId); })) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.CouponCodeInvalidError({ couponCode: couponCode })];
                            }
                            if (promotion.endsAt && +promotion.endsAt < +new Date()) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.CouponCodeExpiredError({ couponCode: couponCode })];
                            }
                            if (!(customerId && promotion.perCustomerUsageLimit != null)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.countPromotionUsagesForCustomer(ctx, promotion.id, customerId)];
                        case 2:
                            usageCount = _a.sent();
                            if (promotion.perCustomerUsageLimit <= usageCount) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.CouponCodeLimitError({ couponCode: couponCode, limit: promotion.perCustomerUsageLimit })];
                            }
                            _a.label = 3;
                        case 3:
                            if (!(promotion.usageLimit !== null)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.countPromotionUsages(ctx, promotion.id)];
                        case 4:
                            usageCount = _a.sent();
                            if (promotion.usageLimit <= usageCount) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.CouponCodeLimitError({ couponCode: couponCode, limit: promotion.usageLimit })];
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/, promotion];
                    }
                });
            });
        };
        PromotionService_1.prototype.getActivePromotionsInChannel = function (ctx) {
            var _this = this;
            return this.connection
                .getRepository(ctx, promotion_entity_1.Promotion)
                .createQueryBuilder('promotion')
                .leftJoin('promotion.channels', 'channel')
                .leftJoinAndSelect('promotion.translations', 'translation')
                .where('channel.id = :channelId', { channelId: ctx.channelId })
                .andWhere('promotion.deletedAt IS NULL')
                .andWhere('promotion.enabled = :enabled', { enabled: true })
                .orderBy('promotion.priorityScore', 'ASC')
                .getMany()
                .then(function (promotions) { return promotions.map(function (p) { return _this.translator.translate(p, ctx); }); });
        };
        PromotionService_1.prototype.getActivePromotionsOnOrder = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, order_entity_1.Order)
                                .createQueryBuilder('order')
                                .leftJoinAndSelect('order.promotions', 'promotions')
                                .where('order.id = :orderId', { orderId: orderId })
                                .getOne()];
                        case 1:
                            order = _b.sent();
                            return [2 /*return*/, (_a = order === null || order === void 0 ? void 0 : order.promotions) !== null && _a !== void 0 ? _a : []];
                    }
                });
            });
        };
        PromotionService_1.prototype.runPromotionSideEffects = function (ctx, order, promotionsPre) {
            return __awaiter(this, void 0, void 0, function () {
                var promotionsPost, _loop_1, _i, promotionsPre_1, activePre, _loop_2, _a, promotionsPost_1, activePost;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            promotionsPost = order.promotions;
                            _loop_1 = function (activePre) {
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            if (!!promotionsPost.find(function (p) { return (0, utils_1.idsAreEqual)(p.id, activePre.id); })) return [3 /*break*/, 2];
                                            // activePre is no longer active, so call onDeactivate
                                            return [4 /*yield*/, activePre.deactivate(ctx, order)];
                                        case 1:
                                            // activePre is no longer active, so call onDeactivate
                                            _c.sent();
                                            _c.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, promotionsPre_1 = promotionsPre;
                            _b.label = 1;
                        case 1:
                            if (!(_i < promotionsPre_1.length)) return [3 /*break*/, 4];
                            activePre = promotionsPre_1[_i];
                            return [5 /*yield**/, _loop_1(activePre)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            _loop_2 = function (activePost) {
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            if (!!promotionsPre.find(function (p) { return (0, utils_1.idsAreEqual)(p.id, activePost.id); })) return [3 /*break*/, 2];
                                            // activePost was not previously active, so call onActivate
                                            return [4 /*yield*/, activePost.activate(ctx, order)];
                                        case 1:
                                            // activePost was not previously active, so call onActivate
                                            _d.sent();
                                            _d.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _a = 0, promotionsPost_1 = promotionsPost;
                            _b.label = 5;
                        case 5:
                            if (!(_a < promotionsPost_1.length)) return [3 /*break*/, 8];
                            activePost = promotionsPost_1[_a];
                            return [5 /*yield**/, _loop_2(activePost)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            _a++;
                            return [3 /*break*/, 5];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Used internally to associate a Promotion with an Order, once an Order has been placed.
         *
         * @deprecated This method is no longer used and will be removed in v2.0
         */
        PromotionService_1.prototype.addPromotionsToOrder = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var allPromotionIds, promotionIds, promotions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allPromotionIds = order.discounts.map(function (a) { return adjustment_source_1.AdjustmentSource.decodeSourceId(a.adjustmentSource).id; });
                            promotionIds = (0, unique_1.unique)(allPromotionIds);
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, promotion_entity_1.Promotion)
                                    .find({ where: { id: (0, typeorm_1.In)(promotionIds) } })];
                        case 1:
                            promotions = _a.sent();
                            order.promotions = promotions;
                            return [2 /*return*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order)];
                    }
                });
            });
        };
        PromotionService_1.prototype.countPromotionUsagesForCustomer = function (ctx, promotionId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.connection
                        .getRepository(ctx, order_entity_1.Order)
                        .createQueryBuilder('order')
                        .leftJoin('order.promotions', 'promotion')
                        .where('promotion.id = :promotionId', { promotionId: promotionId })
                        .andWhere('order.customer = :customerId', { customerId: customerId })
                        .andWhere('order.state != :state', { state: 'Cancelled' })
                        .andWhere('order.active = :active', { active: false });
                    return [2 /*return*/, qb.getCount()];
                });
            });
        };
        PromotionService_1.prototype.countPromotionUsages = function (ctx, promotionId) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.connection
                        .getRepository(ctx, order_entity_1.Order)
                        .createQueryBuilder('order')
                        .leftJoin('order.promotions', 'promotion')
                        .where('promotion.id = :promotionId', { promotionId: promotionId })
                        .andWhere('order.state != :state', { state: 'Cancelled' })
                        .andWhere('order.active = :active', { active: false });
                    return [2 /*return*/, qb.getCount()];
                });
            });
        };
        PromotionService_1.prototype.calculatePriorityScore = function (input) {
            var _this = this;
            var conditions = input.conditions
                ? input.conditions.map(function (c) { return _this.configArgService.getByCode('PromotionCondition', c.code); })
                : [];
            var actions = input.actions
                ? input.actions.map(function (c) { return _this.configArgService.getByCode('PromotionAction', c.code); })
                : [];
            return __spreadArray(__spreadArray([], conditions, true), actions, true).reduce(function (score, op) { return score + op.priorityValue; }, 0);
        };
        PromotionService_1.prototype.validateRequiredConditions = function (conditions, actions) {
            var conditionCodes = conditions.reduce(function (codeMap, _a) {
                var _b;
                var code = _a.code;
                return (__assign(__assign({}, codeMap), (_b = {}, _b[code] = code, _b)));
            }, {});
            for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                var actionCode = actions_1[_i].code;
                var actionDef = this.configArgService.getByCode('PromotionAction', actionCode);
                var actionDependencies = actionDef.conditions || [];
                if (!actionDependencies || actionDependencies.length === 0) {
                    continue;
                }
                var missingConditions = actionDependencies.filter(function (condition) { return !conditionCodes[condition.code]; });
                if (missingConditions.length) {
                    throw new errors_1.UserInputError('error.conditions-required-for-action', {
                        action: actionCode,
                        conditions: missingConditions.map(function (c) { return c.code; }).join(', '),
                    });
                }
            }
        };
        return PromotionService_1;
    }());
    __setFunctionName(_classThis, "PromotionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PromotionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PromotionService = _classThis;
}();
exports.PromotionService = PromotionService;
