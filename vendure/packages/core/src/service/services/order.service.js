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
exports.OrderService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var omit_1 = require("@vendure/common/lib/omit");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var FindOptionsUtils_1 = require("typeorm/find-options/FindOptionsUtils");
var constants_1 = require("../../common/constants");
var error_result_1 = require("../../common/error/error-result");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var tax_utils_1 = require("../../common/tax-utils");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var fulfillment_line_entity_1 = require("../../entity/order-line-reference/fulfillment-line.entity");
var order_line_entity_1 = require("../../entity/order-line/order-line.entity");
var order_modification_entity_1 = require("../../entity/order-modification/order-modification.entity");
var order_entity_1 = require("../../entity/order/order.entity");
var payment_entity_1 = require("../../entity/payment/payment.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var refund_entity_1 = require("../../entity/refund/refund.entity");
var session_entity_1 = require("../../entity/session/session.entity");
var shipping_line_entity_1 = require("../../entity/shipping-line/shipping-line.entity");
var surcharge_entity_1 = require("../../entity/surcharge/surcharge.entity");
var coupon_code_event_1 = require("../../event-bus/events/coupon-code-event");
var order_event_1 = require("../../event-bus/events/order-event");
var order_line_event_1 = require("../../event-bus/events/order-line-event");
var order_state_transition_event_1 = require("../../event-bus/events/order-state-transition-event");
var refund_event_1 = require("../../event-bus/events/refund-event");
var refund_state_transition_event_1 = require("../../event-bus/events/refund-state-transition-event");
var db_errors_1 = require("../helpers/utils/db-errors");
var order_utils_1 = require("../helpers/utils/order-utils");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link Order} entities.
 *
 * @docsCategory services
 */
var OrderService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderService = _classThis = /** @class */ (function () {
        function OrderService_1(connection, configService, productVariantService, customerService, countryService, orderCalculator, shippingCalculator, orderStateMachine, orderMerger, paymentService, paymentMethodService, fulfillmentService, listQueryBuilder, refundStateMachine, historyService, promotionService, eventBus, channelService, orderModifier, customFieldRelationService, requestCache, translator, stockLevelService) {
            this.connection = connection;
            this.configService = configService;
            this.productVariantService = productVariantService;
            this.customerService = customerService;
            this.countryService = countryService;
            this.orderCalculator = orderCalculator;
            this.shippingCalculator = shippingCalculator;
            this.orderStateMachine = orderStateMachine;
            this.orderMerger = orderMerger;
            this.paymentService = paymentService;
            this.paymentMethodService = paymentMethodService;
            this.fulfillmentService = fulfillmentService;
            this.listQueryBuilder = listQueryBuilder;
            this.refundStateMachine = refundStateMachine;
            this.historyService = historyService;
            this.promotionService = promotionService;
            this.eventBus = eventBus;
            this.channelService = channelService;
            this.orderModifier = orderModifier;
            this.customFieldRelationService = customFieldRelationService;
            this.requestCache = requestCache;
            this.translator = translator;
            this.stockLevelService = stockLevelService;
        }
        /**
         * @description
         * Returns an array of all the configured states and transitions of the order process. This is
         * based on the default order process plus all configured {@link OrderProcess} objects
         * defined in the {@link OrderOptions} `process` array.
         */
        OrderService_1.prototype.getOrderProcessStates = function () {
            return Object.entries(this.orderStateMachine.config.transitions).map(function (_a) {
                var name = _a[0], to = _a[1].to;
                return ({
                    name: name,
                    to: to,
                });
            });
        };
        OrderService_1.prototype.findAll = function (ctx, options, relations) {
            return this.listQueryBuilder
                .build(order_entity_1.Order, options, {
                ctx: ctx,
                relations: relations !== null && relations !== void 0 ? relations : [
                    'lines',
                    'customer',
                    'lines.productVariant',
                    'channels',
                    'shippingLines',
                    'payments',
                ],
                channelId: ctx.channelId,
                customPropertyMap: {
                    customerLastName: 'customer.lastName',
                    transactionId: 'payments.transactionId',
                },
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return {
                    items: items,
                    totalItems: totalItems,
                };
            });
        };
        OrderService_1.prototype.findOne = function (ctx, orderId, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, effectiveRelations, orderRelations, lineRelations, order, hasLinesRelations, linesQb, lines, _i, _a, line, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            qb = this.connection.getRepository(ctx, order_entity_1.Order).createQueryBuilder('order');
                            effectiveRelations = relations !== null && relations !== void 0 ? relations : [
                                'channels',
                                'customer',
                                'customer.user',
                                'lines',
                                'lines.productVariant',
                                'lines.productVariant.taxCategory',
                                'lines.productVariant.productVariantPrices',
                                'lines.productVariant.translations',
                                'lines.featuredAsset',
                                'lines.taxCategory',
                                'shippingLines',
                                'surcharges',
                            ];
                            if (relations &&
                                effectiveRelations.includes('lines.productVariant') &&
                                !effectiveRelations.includes('lines.productVariant.taxCategory')) {
                                effectiveRelations.push('lines.productVariant.taxCategory');
                            }
                            orderRelations = effectiveRelations.filter(function (r) { return !r.startsWith('lines'); });
                            lineRelations = effectiveRelations
                                .filter(function (r) { return r.startsWith('lines.'); })
                                .map(function (r) { return r.replace('lines.', ''); });
                            qb.setFindOptions({
                                relations: orderRelations,
                                relationLoadStrategy: 'query',
                            })
                                .leftJoin('order.channels', 'channel')
                                .where('order.id = :orderId', { orderId: orderId })
                                .andWhere('channel.id = :channelId', { channelId: ctx.channelId });
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            FindOptionsUtils_1.FindOptionsUtils.joinEagerRelations(qb, qb.alias, qb.expressionMap.mainAlias.metadata);
                            return [4 /*yield*/, qb.getOne()];
                        case 1:
                            order = _e.sent();
                            if (!order) return [3 /*break*/, 8];
                            hasLinesRelations = effectiveRelations.some(function (r) { return r.startsWith('lines'); });
                            if (!hasLinesRelations) return [3 /*break*/, 3];
                            linesQb = this.connection.getRepository(ctx, order_line_entity_1.OrderLine).createQueryBuilder('line');
                            linesQb
                                .setFindOptions({
                                relations: lineRelations,
                            })
                                .where('line.orderId = :orderId', { orderId: orderId })
                                .addOrderBy('line.createdAt', 'ASC')
                                .addOrderBy('line.productVariantId', 'ASC');
                            return [4 /*yield*/, linesQb.getMany()];
                        case 2:
                            lines = _e.sent();
                            order.lines = lines;
                            _e.label = 3;
                        case 3:
                            if (!effectiveRelations.includes('lines.productVariant')) return [3 /*break*/, 7];
                            _i = 0, _a = order.lines;
                            _e.label = 4;
                        case 4:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            line = _a[_i];
                            _b = line;
                            _d = (_c = this.translator).translate;
                            return [4 /*yield*/, this.productVariantService.applyChannelPriceAndTax(line.productVariant, ctx, order)];
                        case 5:
                            _b.productVariant = _d.apply(_c, [_e.sent(), ctx]);
                            _e.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 4];
                        case 7: return [2 /*return*/, order];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        OrderService_1.prototype.findOneByCode = function (ctx, orderCode, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).findOne({
                                relations: ['customer'],
                                where: {
                                    code: orderCode,
                                },
                            })];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, order ? this.findOne(ctx, order.id, relations) : undefined];
                    }
                });
            });
        };
        OrderService_1.prototype.findOneByOrderLineId = function (ctx, orderLineId, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, order_entity_1.Order)
                                .createQueryBuilder('order')
                                .innerJoin('order.lines', 'line', 'line.id = :orderLineId', { orderLineId: orderLineId })
                                .getOne()];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, order ? this.findOne(ctx, order.id, relations) : undefined];
                    }
                });
            });
        };
        OrderService_1.prototype.findByCustomerId = function (ctx, customerId, options, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var effectiveRelations;
                return __generator(this, function (_a) {
                    effectiveRelations = (relations !== null && relations !== void 0 ? relations : ['lines', 'customer', 'channels', 'shippingLines']).filter(function (r) {
                        // Don't join productVariant because it messes with the
                        // price calculation in certain edge-case field resolver scenarios
                        return !r.includes('productVariant');
                    });
                    return [2 /*return*/, this.listQueryBuilder
                            .build(order_entity_1.Order, options, {
                            relations: effectiveRelations,
                            channelId: ctx.channelId,
                            ctx: ctx,
                        })
                            .andWhere('order.state != :draftState', { draftState: 'Draft' })
                            .andWhere('order.customer.id = :customerId', { customerId: customerId })
                            .getManyAndCount()
                            .then(function (_a) {
                            var items = _a[0], totalItems = _a[1];
                            return {
                                items: items,
                                totalItems: totalItems,
                            };
                        })];
                });
            });
        };
        /**
         * @description
         * Returns all {@link Payment} entities associated with the Order.
         */
        OrderService_1.prototype.getOrderPayments = function (ctx, orderId) {
            return this.connection.getRepository(ctx, payment_entity_1.Payment).find({
                relations: ['refunds'],
                where: {
                    order: { id: orderId },
                },
            });
        };
        /**
         * @description
         * Returns an array of any {@link OrderModification} entities associated with the Order.
         */
        OrderService_1.prototype.getOrderModifications = function (ctx, orderId) {
            return this.connection.getRepository(ctx, order_modification_entity_1.OrderModification).find({
                where: {
                    order: { id: orderId },
                },
                relations: ['lines', 'payment', 'refund', 'surcharges'],
            });
        };
        /**
         * @description
         * Returns any {@link Refund}s associated with a {@link Payment}.
         */
        OrderService_1.prototype.getPaymentRefunds = function (ctx, paymentId) {
            return this.connection.getRepository(ctx, refund_entity_1.Refund).find({
                where: {
                    paymentId: paymentId,
                },
            });
        };
        OrderService_1.prototype.getSellerOrders = function (ctx, order) {
            return this.connection.getRepository(ctx, order_entity_1.Order).find({
                where: {
                    aggregateOrderId: order.id,
                },
                relations: ['channels'],
            });
        };
        OrderService_1.prototype.getAggregateOrder = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, order.aggregateOrderId == null
                            ? undefined
                            : this.connection
                                .getRepository(ctx, order_entity_1.Order)
                                .findOne({ where: { id: order.aggregateOrderId }, relations: ['channels', 'lines'] })
                                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                });
            });
        };
        OrderService_1.prototype.getOrderChannels = function (ctx, order) {
            return this.connection
                .getRepository(ctx, order_entity_1.Order)
                .createQueryBuilder('order')
                .relation('channels')
                .of(order)
                .loadMany();
        };
        /**
         * @description
         * Returns any Order associated with the specified User's Customer account
         * that is still in the `active` state.
         */
        OrderService_1.prototype.getActiveOrderForUser = function (ctx, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var customer, activeOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.customerService.findOneByUserId(ctx, userId)];
                        case 1:
                            customer = _a.sent();
                            if (!customer) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .innerJoinAndSelect('order.channels', 'channel', 'channel.id = :channelId', {
                                    channelId: ctx.channelId,
                                })
                                    .leftJoinAndSelect('order.customer', 'customer')
                                    .leftJoinAndSelect('order.shippingLines', 'shippingLines')
                                    .where('order.active = :active', { active: true })
                                    .andWhere('order.customer.id = :customerId', { customerId: customer.id })
                                    .orderBy('order.createdAt', 'DESC')
                                    .getOne()];
                        case 2:
                            activeOrder = _a.sent();
                            if (activeOrder) {
                                return [2 /*return*/, this.findOne(ctx, activeOrder.id)];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new, empty Order. If a `userId` is passed, the Order will get associated with that
         * User's Customer account.
         */
        OrderService_1.prototype.create = function (ctx, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var newOrder, customer, order, transitionResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createEmptyOrderEntity(ctx)];
                        case 1:
                            newOrder = _a.sent();
                            if (!userId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.customerService.findOneByUserId(ctx, userId)];
                        case 2:
                            customer = _a.sent();
                            if (customer) {
                                newOrder.customer = customer;
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.channelService.assignToCurrentChannel(newOrder, ctx)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(newOrder)];
                        case 5:
                            order = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_event_1.OrderEvent(ctx, order, 'created'))];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.transitionToState(ctx, order.id, 'AddingItems')];
                        case 7:
                            transitionResult = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(transitionResult)) {
                                // this should never occur, so we will throw rather than return
                                throw transitionResult;
                            }
                            return [2 /*return*/, transitionResult];
                    }
                });
            });
        };
        OrderService_1.prototype.createDraft = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var newOrder, order, transitionResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createEmptyOrderEntity(ctx)];
                        case 1:
                            newOrder = _a.sent();
                            newOrder.active = false;
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(newOrder, ctx)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(newOrder)];
                        case 3:
                            order = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_event_1.OrderEvent(ctx, order, 'created'))];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.transitionToState(ctx, order.id, 'Draft')];
                        case 5:
                            transitionResult = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(transitionResult)) {
                                // this should never occur, so we will throw rather than return
                                throw transitionResult;
                            }
                            return [2 /*return*/, transitionResult];
                    }
                });
            });
        };
        OrderService_1.prototype.createEmptyOrderEntity = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = order_entity_1.Order.bind;
                            _b = {
                                type: generated_types_1.OrderType.Regular
                            };
                            return [4 /*yield*/, this.configService.orderOptions.orderCodeStrategy.generate(ctx)];
                        case 1: return [2 /*return*/, new (_a.apply(order_entity_1.Order, [void 0, (_b.code = _c.sent(),
                                    _b.state = this.orderStateMachine.getInitialState(),
                                    _b.lines = [],
                                    _b.surcharges = [],
                                    _b.couponCodes = [],
                                    _b.modifications = [],
                                    _b.shippingAddress = {},
                                    _b.billingAddress = {},
                                    _b.subTotal = 0,
                                    _b.subTotalWithTax = 0,
                                    _b.currencyCode = ctx.currencyCode,
                                    _b)]))()];
                    }
                });
            });
        };
        /**
         * @description
         * Updates the custom fields of an Order.
         */
        OrderService_1.prototype.updateCustomFields = function (ctx, orderId, customFields) {
            return __awaiter(this, void 0, void 0, function () {
                var order, updatedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            order = (0, patch_entity_1.patchEntity)(order, { customFields: customFields });
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order)];
                        case 2:
                            updatedOrder = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, order_entity_1.Order, { customFields: customFields }, updatedOrder)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_event_1.OrderEvent(ctx, updatedOrder, 'updated', { customFields: customFields }))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        /**
         * @description
         * Updates the Customer which is assigned to a given Order. The target Customer must be assigned to the same
         * Channels as the Order, otherwise an error will be thrown.
         *
         * @since 2.2.0
         */
        OrderService_1.prototype.updateOrderCustomer = function (ctx_1, _a) {
            return __awaiter(this, arguments, void 0, function (ctx, _b) {
                var order, currentCustomer, targetCustomer, channelIds, customerChannelIds, missingChannelIds, updatedOrder;
                var customerId = _b.customerId, orderId = _b.orderId, note = _b.note;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId, ['channels', 'customer'])];
                        case 1:
                            order = _c.sent();
                            currentCustomer = order.customer;
                            if ((currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.id) === customerId) {
                                // No change in customer, so just return the order as-is
                                return [2 /*return*/, order];
                            }
                            return [4 /*yield*/, this.customerService.findOne(ctx, customerId, ['channels'])];
                        case 2:
                            targetCustomer = _c.sent();
                            if (!targetCustomer) {
                                throw new errors_1.EntityNotFoundError('Customer', customerId);
                            }
                            channelIds = order.channels.map(function (c) { return c.id; });
                            customerChannelIds = targetCustomer.channels.map(function (c) { return c.id; });
                            missingChannelIds = channelIds.filter(function (id) { return !customerChannelIds.includes(id); });
                            if (missingChannelIds.length) {
                                throw new errors_1.UserInputError("error.target-customer-not-assigned-to-order-channels", {
                                    channelIds: missingChannelIds.join(', '),
                                });
                            }
                            return [4 /*yield*/, this.addCustomerToOrder(ctx, order.id, targetCustomer)];
                        case 3:
                            updatedOrder = _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_event_1.OrderEvent(ctx, updatedOrder, 'updated', targetCustomer))];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: orderId,
                                    type: generated_types_1.HistoryEntryType.ORDER_CUSTOMER_UPDATED,
                                    data: {
                                        previousCustomerId: currentCustomer === null || currentCustomer === void 0 ? void 0 : currentCustomer.id,
                                        previousCustomerName: currentCustomer && "".concat(currentCustomer.firstName, " ").concat(currentCustomer.lastName),
                                        newCustomerId: targetCustomer.id,
                                        newCustomerName: "".concat(targetCustomer.firstName, " ").concat(targetCustomer.lastName),
                                        note: note,
                                    },
                                })];
                        case 5:
                            _c.sent();
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        /**
         * @description
         * Adds an item to the Order, either creating a new OrderLine or
         * incrementing an existing one.
         *
         * If you need to add multiple items to an Order, use `addItemsToOrder()` instead.
         */
        OrderService_1.prototype.addItemToOrder = function (ctx, orderId, productVariantId, quantity, customFields, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.addItemsToOrder(ctx, orderId, [{ productVariantId: productVariantId, quantity: quantity, customFields: customFields }], relations)];
                        case 1:
                            result = _a.sent();
                            if (result.errorResults.length) {
                                return [2 /*return*/, result.errorResults[0]];
                            }
                            else {
                                return [2 /*return*/, result.order];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Adds multiple items to an Order. This method is more efficient than calling `addItemToOrder`
         * multiple times, as it only needs to fetch the entire Order once, and only performs
         * price adjustments once at the end.
         *
         * Since this method can return multiple error results, it is recommended to check the `errorResults`
         * array to determine if any errors occurred.
         *
         * @since 3.1.0
         */
        OrderService_1.prototype.addItemsToOrder = function (ctx, orderId, items, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var order, errorResults, updatedOrderLines, _loop_1, this_1, _i, items_1, item, state_1, updatedOrder, _a, _b, _c, i, errorResult;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _d.sent();
                            errorResults = [];
                            updatedOrderLines = [];
                            _loop_1 = function (item) {
                                var productVariantId, quantity, customFields, existingOrderLine, validationError, variant, existingQuantityInOtherLines, correctedQuantity, orderInterceptors, _e, orderInterceptors_1, interceptor, error, orderLine, newQuantity, quantityWasAdjustedDown;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            productVariantId = item.productVariantId, quantity = item.quantity, customFields = item.customFields;
                                            return [4 /*yield*/, this_1.orderModifier.getExistingOrderLine(ctx, order, productVariantId, customFields)];
                                        case 1:
                                            existingOrderLine = _f.sent();
                                            validationError = this_1.assertQuantityIsPositive(quantity) ||
                                                this_1.assertAddingItemsState(order) ||
                                                this_1.assertNotOverOrderItemsLimit(order, quantity) ||
                                                this_1.assertNotOverOrderLineItemsLimit(existingOrderLine, quantity);
                                            if (validationError) {
                                                errorResults.push(validationError);
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [4 /*yield*/, this_1.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, productVariantId, {
                                                    relations: ['product'],
                                                    where: {
                                                        enabled: true,
                                                        deletedAt: (0, typeorm_1.IsNull)(),
                                                    },
                                                    loadEagerRelations: false,
                                                })];
                                        case 2:
                                            variant = _f.sent();
                                            if (variant.product.enabled === false) {
                                                throw new errors_1.EntityNotFoundError('ProductVariant', productVariantId);
                                            }
                                            existingQuantityInOtherLines = (0, shared_utils_1.summate)(order.lines.filter(function (l) {
                                                return (0, utils_1.idsAreEqual)(l.productVariantId, productVariantId) &&
                                                    !(0, utils_1.idsAreEqual)(l.id, existingOrderLine === null || existingOrderLine === void 0 ? void 0 : existingOrderLine.id);
                                            }), 'quantity');
                                            return [4 /*yield*/, this_1.orderModifier.constrainQuantityToSaleable(ctx, variant, quantity, existingOrderLine === null || existingOrderLine === void 0 ? void 0 : existingOrderLine.quantity, existingQuantityInOtherLines)];
                                        case 3:
                                            correctedQuantity = _f.sent();
                                            if (correctedQuantity === 0) {
                                                errorResults.push(new generated_graphql_shop_errors_1.InsufficientStockError({ order: order, quantityAvailable: correctedQuantity }));
                                                return [2 /*return*/, "continue"];
                                            }
                                            orderInterceptors = this_1.configService.orderOptions.orderInterceptors;
                                            _e = 0, orderInterceptors_1 = orderInterceptors;
                                            _f.label = 4;
                                        case 4:
                                            if (!(_e < orderInterceptors_1.length)) return [3 /*break*/, 7];
                                            interceptor = orderInterceptors_1[_e];
                                            if (!interceptor.willAddItemToOrder) return [3 /*break*/, 6];
                                            return [4 /*yield*/, interceptor.willAddItemToOrder(ctx, order, {
                                                    productVariant: variant,
                                                    quantity: correctedQuantity,
                                                    customFields: customFields,
                                                })];
                                        case 5:
                                            error = _f.sent();
                                            if (error) {
                                                errorResults.push(new generated_graphql_shop_errors_1.OrderInterceptorError({ interceptorError: error }));
                                                return [2 /*return*/, "continue-addItem"];
                                            }
                                            _f.label = 6;
                                        case 6:
                                            _e++;
                                            return [3 /*break*/, 4];
                                        case 7: return [4 /*yield*/, this_1.orderModifier.getOrCreateOrderLine(ctx, order, productVariantId, customFields)];
                                        case 8:
                                            orderLine = _f.sent();
                                            if (!(correctedQuantity < quantity)) return [3 /*break*/, 10];
                                            newQuantity = (existingOrderLine ? existingOrderLine === null || existingOrderLine === void 0 ? void 0 : existingOrderLine.quantity : 0) + correctedQuantity;
                                            return [4 /*yield*/, this_1.orderModifier.updateOrderLineQuantity(ctx, orderLine, newQuantity, order)];
                                        case 9:
                                            _f.sent();
                                            return [3 /*break*/, 12];
                                        case 10: return [4 /*yield*/, this_1.orderModifier.updateOrderLineQuantity(ctx, orderLine, correctedQuantity, order)];
                                        case 11:
                                            _f.sent();
                                            _f.label = 12;
                                        case 12:
                                            updatedOrderLines.push(orderLine);
                                            quantityWasAdjustedDown = correctedQuantity < quantity;
                                            if (quantityWasAdjustedDown) {
                                                errorResults.push(new generated_graphql_shop_errors_1.InsufficientStockError({ quantityAvailable: correctedQuantity, order: order }));
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, items_1 = items;
                            _d.label = 2;
                        case 2:
                            if (!(_i < items_1.length)) return [3 /*break*/, 5];
                            item = items_1[_i];
                            return [5 /*yield**/, _loop_1(item)];
                        case 3:
                            state_1 = _d.sent();
                            switch (state_1) {
                                case "continue-addItem": return [3 /*break*/, 4];
                            }
                            _d.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, this.applyPriceAdjustments(ctx, order, updatedOrderLines, relations)];
                        case 6:
                            updatedOrder = _d.sent();
                            // for any InsufficientStockError errors, we want to make sure we use the final updatedOrder
                            // after having applied all price adjustments
                            for (_a = 0, _b = Object.entries(errorResults); _a < _b.length; _a++) {
                                _c = _b[_a], i = _c[0], errorResult = _c[1];
                                if (errorResult.__typename === 'InsufficientStockError') {
                                    errorResults[+i] = new generated_graphql_shop_errors_1.InsufficientStockError({
                                        quantityAvailable: errorResult.quantityAvailable,
                                        order: updatedOrder,
                                    });
                                }
                            }
                            return [2 /*return*/, {
                                    order: updatedOrder,
                                    errorResults: errorResults,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * Adjusts the quantity and/or custom field values of an existing OrderLine.
         *
         * If you need to adjust multiple OrderLines, use `adjustOrderLines()` instead.
         */
        OrderService_1.prototype.adjustOrderLine = function (ctx, orderId, orderLineId, quantity, customFields, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adjustOrderLines(ctx, orderId, [{ orderLineId: orderLineId, quantity: quantity, customFields: customFields }], relations)];
                        case 1:
                            result = _a.sent();
                            if (result.errorResults.length) {
                                return [2 /*return*/, result.errorResults[0]];
                            }
                            else {
                                return [2 /*return*/, result.order];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Adjusts the quantity and/or custom field values of existing OrderLines.
         * This method is more efficient than calling `adjustOrderLine` multiple times, as it only needs to fetch
         * the entire Order once, and only performs price adjustments once at the end.
         * Since this method can return multiple error results, it is recommended to check the `errorResults`
         * array to determine if any errors occurred.
         *
         * @since 3.1.0
         */
        OrderService_1.prototype.adjustOrderLines = function (ctx, orderId, lines, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var order, errorResults, updatedOrderLines, _loop_2, this_2, _i, lines_1, line, state_2, updatedOrder, _a, _b, _c, i, errorResult;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _d.sent();
                            errorResults = [];
                            updatedOrderLines = [];
                            _loop_2 = function (line) {
                                var orderLineId, quantity, customFields, orderLine, validationError, orderInterceptors, _e, orderInterceptors_2, interceptor, error, existingCustomFields, mergedCustomFields, _f, _g, _h, key, value, existingQuantityInOtherLines, correctedQuantity, deletedOrderLine, quantityWasAdjustedDown;
                                return __generator(this, function (_j) {
                                    switch (_j.label) {
                                        case 0:
                                            orderLineId = line.orderLineId, quantity = line.quantity, customFields = line.customFields;
                                            orderLine = this_2.getOrderLineOrThrow(order, orderLineId);
                                            validationError = this_2.assertAddingItemsState(order) ||
                                                this_2.assertQuantityIsPositive(quantity) ||
                                                this_2.assertNotOverOrderItemsLimit(order, quantity - orderLine.quantity) ||
                                                this_2.assertNotOverOrderLineItemsLimit(orderLine, quantity - orderLine.quantity);
                                            if (validationError) {
                                                errorResults.push(validationError);
                                                return [2 /*return*/, "continue"];
                                            }
                                            orderInterceptors = this_2.configService.orderOptions.orderInterceptors;
                                            _e = 0, orderInterceptors_2 = orderInterceptors;
                                            _j.label = 1;
                                        case 1:
                                            if (!(_e < orderInterceptors_2.length)) return [3 /*break*/, 4];
                                            interceptor = orderInterceptors_2[_e];
                                            if (!interceptor.willAdjustOrderLine) return [3 /*break*/, 3];
                                            return [4 /*yield*/, interceptor.willAdjustOrderLine(ctx, order, {
                                                    orderLine: orderLine,
                                                    quantity: quantity,
                                                    customFields: customFields,
                                                })];
                                        case 2:
                                            error = _j.sent();
                                            if (error) {
                                                errorResults.push(new generated_graphql_shop_errors_1.OrderInterceptorError({ interceptorError: error }));
                                                return [2 /*return*/, "continue-adjustLine"];
                                            }
                                            _j.label = 3;
                                        case 3:
                                            _e++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            if (!(customFields != null)) return [3 /*break*/, 6];
                                            existingCustomFields = orderLine.customFields || {};
                                            mergedCustomFields = __assign({}, existingCustomFields);
                                            for (_f = 0, _g = Object.entries(customFields); _f < _g.length; _f++) {
                                                _h = _g[_f], key = _h[0], value = _h[1];
                                                if (value !== undefined) {
                                                    // Update with the new value (including explicit null to unset)
                                                    mergedCustomFields[key] = value;
                                                }
                                                // If value is undefined, preserve the existing value (don't set it)
                                            }
                                            orderLine.customFields = mergedCustomFields;
                                            return [4 /*yield*/, this_2.customFieldRelationService.updateRelations(ctx, order_line_entity_1.OrderLine, { customFields: mergedCustomFields }, orderLine)];
                                        case 5:
                                            _j.sent();
                                            _j.label = 6;
                                        case 6:
                                            existingQuantityInOtherLines = (0, shared_utils_1.summate)(order.lines.filter(function (l) {
                                                return (0, utils_1.idsAreEqual)(l.productVariantId, orderLine.productVariantId) &&
                                                    !(0, utils_1.idsAreEqual)(l.id, orderLineId);
                                            }), 'quantity');
                                            return [4 /*yield*/, this_2.orderModifier.constrainQuantityToSaleable(ctx, orderLine.productVariant, quantity, 0, existingQuantityInOtherLines)];
                                        case 7:
                                            correctedQuantity = _j.sent();
                                            if (!(correctedQuantity === 0)) return [3 /*break*/, 10];
                                            order.lines = order.lines.filter(function (l) { return !(0, utils_1.idsAreEqual)(l.id, orderLine.id); });
                                            deletedOrderLine = new order_line_entity_1.OrderLine(orderLine);
                                            return [4 /*yield*/, this_2.connection.getRepository(ctx, order_line_entity_1.OrderLine).remove(orderLine)];
                                        case 8:
                                            _j.sent();
                                            return [4 /*yield*/, this_2.eventBus.publish(new order_line_event_1.OrderLineEvent(ctx, order, deletedOrderLine, 'deleted'))];
                                        case 9:
                                            _j.sent();
                                            return [3 /*break*/, 12];
                                        case 10: return [4 /*yield*/, this_2.orderModifier.updateOrderLineQuantity(ctx, orderLine, correctedQuantity, order)];
                                        case 11:
                                            _j.sent();
                                            updatedOrderLines.push(orderLine);
                                            _j.label = 12;
                                        case 12:
                                            quantityWasAdjustedDown = correctedQuantity < quantity;
                                            if (quantityWasAdjustedDown) {
                                                errorResults.push(new generated_graphql_shop_errors_1.InsufficientStockError({
                                                    quantityAvailable: correctedQuantity,
                                                    order: order,
                                                }));
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_2 = this;
                            _i = 0, lines_1 = lines;
                            _d.label = 2;
                        case 2:
                            if (!(_i < lines_1.length)) return [3 /*break*/, 5];
                            line = lines_1[_i];
                            return [5 /*yield**/, _loop_2(line)];
                        case 3:
                            state_2 = _d.sent();
                            switch (state_2) {
                                case "continue-adjustLine": return [3 /*break*/, 4];
                            }
                            _d.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, this.applyPriceAdjustments(ctx, order, updatedOrderLines, relations)];
                        case 6:
                            updatedOrder = _d.sent();
                            for (_a = 0, _b = Object.entries(errorResults); _a < _b.length; _a++) {
                                _c = _b[_a], i = _c[0], errorResult = _c[1];
                                if (errorResult.__typename === 'InsufficientStockError') {
                                    errorResults[+i] = new generated_graphql_shop_errors_1.InsufficientStockError({
                                        quantityAvailable: errorResult.quantityAvailable,
                                        order: updatedOrder,
                                    });
                                }
                            }
                            return [2 /*return*/, {
                                    order: updatedOrder,
                                    errorResults: errorResults,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * Removes the specified OrderLine from the Order.
         *
         * If you need to remove multiple OrderLines, use `removeItemsFromOrder()` instead.
         */
        OrderService_1.prototype.removeItemFromOrder = function (ctx, orderId, orderLineId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.removeItemsFromOrder(ctx, orderId, [orderLineId])];
                });
            });
        };
        /**
         * @description
         * Removes the specified OrderLines from the Order.
         * This method is more efficient than calling `removeItemFromOrder` multiple times, as it only needs to fetch
         * the entire Order once, and only performs price adjustments once at the end.
         *
         * @since 3.1.0
         */
        OrderService_1.prototype.removeItemsFromOrder = function (ctx, orderId, orderLineIds) {
            return __awaiter(this, void 0, void 0, function () {
                var order, validationError, orderLinesToDelete, _i, orderLineIds_1, orderLineId, orderLine, orderInterceptors, _a, orderInterceptors_3, interceptor, error, updatedOrder, _b, orderLinesToDelete_1, orderLine, deletedOrderLine;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _c.sent();
                            validationError = this.assertAddingItemsState(order);
                            if (validationError) {
                                return [2 /*return*/, validationError];
                            }
                            orderLinesToDelete = [];
                            _i = 0, orderLineIds_1 = orderLineIds;
                            _c.label = 2;
                        case 2:
                            if (!(_i < orderLineIds_1.length)) return [3 /*break*/, 8];
                            orderLineId = orderLineIds_1[_i];
                            orderLine = this.getOrderLineOrThrow(order, orderLineId);
                            orderInterceptors = this.configService.orderOptions.orderInterceptors;
                            _a = 0, orderInterceptors_3 = orderInterceptors;
                            _c.label = 3;
                        case 3:
                            if (!(_a < orderInterceptors_3.length)) return [3 /*break*/, 6];
                            interceptor = orderInterceptors_3[_a];
                            if (!interceptor.willRemoveItemFromOrder) return [3 /*break*/, 5];
                            return [4 /*yield*/, interceptor.willRemoveItemFromOrder(ctx, order, orderLine)];
                        case 4:
                            error = _c.sent();
                            if (error) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.OrderInterceptorError({ interceptorError: error })];
                            }
                            _c.label = 5;
                        case 5:
                            _a++;
                            return [3 /*break*/, 3];
                        case 6:
                            orderLinesToDelete.push(orderLine);
                            _c.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 2];
                        case 8:
                            order.lines = order.lines.filter(function (line) { return !orderLineIds.find(function (olId) { return (0, utils_1.idsAreEqual)(line.id, olId); }); });
                            // Persist the orderLine removal before applying price adjustments
                            // so that any hydration of the Order entity during the course of the
                            // `applyPriceAdjustments()` (e.g. in a ShippingEligibilityChecker etc)
                            // will not re-add the OrderLine.
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 9:
                            // Persist the orderLine removal before applying price adjustments
                            // so that any hydration of the Order entity during the course of the
                            // `applyPriceAdjustments()` (e.g. in a ShippingEligibilityChecker etc)
                            // will not re-add the OrderLine.
                            _c.sent();
                            return [4 /*yield*/, this.applyPriceAdjustments(ctx, order)];
                        case 10:
                            updatedOrder = _c.sent();
                            _b = 0, orderLinesToDelete_1 = orderLinesToDelete;
                            _c.label = 11;
                        case 11:
                            if (!(_b < orderLinesToDelete_1.length)) return [3 /*break*/, 15];
                            orderLine = orderLinesToDelete_1[_b];
                            deletedOrderLine = new order_line_entity_1.OrderLine(orderLine);
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).remove(orderLine)];
                        case 12:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_line_event_1.OrderLineEvent(ctx, order, deletedOrderLine, 'deleted'))];
                        case 13:
                            _c.sent();
                            _c.label = 14;
                        case 14:
                            _b++;
                            return [3 /*break*/, 11];
                        case 15: return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        /**
         * @description
         * Removes all OrderLines from the Order.
         */
        OrderService_1.prototype.removeAllItemsFromOrder = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, validationError, orderInterceptors, _i, _a, orderLine, _b, orderInterceptors_4, interceptor, error, updatedOrder;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _c.sent();
                            validationError = this.assertAddingItemsState(order);
                            if (validationError) {
                                return [2 /*return*/, validationError];
                            }
                            orderInterceptors = this.configService.orderOptions.orderInterceptors;
                            _i = 0, _a = order.lines;
                            _c.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            orderLine = _a[_i];
                            _b = 0, orderInterceptors_4 = orderInterceptors;
                            _c.label = 3;
                        case 3:
                            if (!(_b < orderInterceptors_4.length)) return [3 /*break*/, 6];
                            interceptor = orderInterceptors_4[_b];
                            if (!interceptor.willRemoveItemFromOrder) return [3 /*break*/, 5];
                            return [4 /*yield*/, interceptor.willRemoveItemFromOrder(ctx, order, orderLine)];
                        case 4:
                            error = _c.sent();
                            if (error) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.OrderInterceptorError({ interceptorError: error })];
                            }
                            _c.label = 5;
                        case 5:
                            _b++;
                            return [3 /*break*/, 3];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7: return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).remove(order.lines)];
                        case 8:
                            _c.sent();
                            order.lines = [];
                            return [4 /*yield*/, this.applyPriceAdjustments(ctx, order)];
                        case 9:
                            updatedOrder = _c.sent();
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        /**
         * @description
         * Adds a {@link Surcharge} to the Order.
         */
        OrderService_1.prototype.addSurchargeToOrder = function (ctx, orderId, surchargeInput) {
            return __awaiter(this, void 0, void 0, function () {
                var order, surcharge, updatedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, surcharge_entity_1.Surcharge).save(new surcharge_entity_1.Surcharge(__assign({ taxLines: [], sku: '', listPriceIncludesTax: ctx.channel.pricesIncludeTax, order: order }, surchargeInput)))];
                        case 2:
                            surcharge = _a.sent();
                            order.surcharges.push(surcharge);
                            return [4 /*yield*/, this.applyPriceAdjustments(ctx, order)];
                        case 3:
                            updatedOrder = _a.sent();
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        /**
         * @description
         * Removes a {@link Surcharge} from the Order.
         */
        OrderService_1.prototype.removeSurchargeFromOrder = function (ctx, orderId, surchargeId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, surcharge, updatedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, surcharge_entity_1.Surcharge, surchargeId)];
                        case 2:
                            surcharge = _a.sent();
                            if (!order.surcharges.find(function (s) { return (0, utils_1.idsAreEqual)(s.id, surcharge.id); })) return [3 /*break*/, 5];
                            order.surcharges = order.surcharges.filter(function (s) { return !(0, utils_1.idsAreEqual)(s.id, surchargeId); });
                            return [4 /*yield*/, this.applyPriceAdjustments(ctx, order)];
                        case 3:
                            updatedOrder = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, surcharge_entity_1.Surcharge).remove(surcharge)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, updatedOrder];
                        case 5: return [2 /*return*/, order];
                    }
                });
            });
        };
        /**
         * @description
         * Applies a coupon code to the Order, which should be a valid coupon code as specified in the configuration
         * of an active {@link Promotion}.
         */
        OrderService_1.prototype.applyCouponCode = function (ctx, orderId, couponCode) {
            return __awaiter(this, void 0, void 0, function () {
                var order, validationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            if (order.couponCodes.includes(couponCode)) {
                                return [2 /*return*/, order];
                            }
                            return [4 /*yield*/, this.promotionService.validateCouponCode(ctx, couponCode, order.customer && order.customer.id)];
                        case 2:
                            validationResult = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(validationResult)) {
                                return [2 /*return*/, validationResult];
                            }
                            order.couponCodes.push(couponCode);
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_COUPON_APPLIED,
                                    data: { couponCode: couponCode, promotionId: validationResult.id },
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new coupon_code_event_1.CouponCodeEvent(ctx, couponCode, orderId, 'assigned'))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.applyPriceAdjustments(ctx, order)];
                    }
                });
            });
        };
        /**
         * @description
         * Removes a coupon code from the Order.
         */
        OrderService_1.prototype.removeCouponCode = function (ctx, orderId, couponCode) {
            return __awaiter(this, void 0, void 0, function () {
                var order, affectedOrderLines, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            if (!order.couponCodes.includes(couponCode)) return [3 /*break*/, 6];
                            affectedOrderLines = order.lines.filter(function (line) {
                                return line.adjustments.filter(function (a) { return a.type === generated_types_1.AdjustmentType.DISTRIBUTED_ORDER_PROMOTION; })
                                    .length;
                            });
                            order.couponCodes = order.couponCodes.filter(function (cc) { return cc !== couponCode; });
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_COUPON_REMOVED,
                                    data: { couponCode: couponCode },
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new coupon_code_event_1.CouponCodeEvent(ctx, couponCode, orderId, 'removed'))];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.applyPriceAdjustments(ctx, order)];
                        case 4:
                            result = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(affectedOrderLines)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, result];
                        case 6: return [2 /*return*/, order];
                    }
                });
            });
        };
        /**
         * @description
         * Returns all {@link Promotion}s associated with an Order.
         */
        OrderService_1.prototype.getOrderPromotions = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_entity_1.Order, orderId, {
                                channelId: ctx.channelId,
                                relations: ['promotions'],
                            })];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, order.promotions.map(function (p) { return _this.translator.translate(p, ctx); }) || []];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the next possible states that the Order may transition to.
         */
        OrderService_1.prototype.getNextOrderStates = function (order) {
            return this.orderStateMachine.getNextStates(order);
        };
        /**
         * @description
         * Sets the shipping address for the Order.
         */
        OrderService_1.prototype.setShippingAddress = function (ctx, orderId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order, country, shippingAddress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.countryService.findOneByCode(ctx, input.countryCode)];
                        case 2:
                            country = _a.sent();
                            shippingAddress = __assign(__assign({}, input), { countryCode: input.countryCode, country: country.name });
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .update(order_entity_1.Order)
                                    .set({ shippingAddress: shippingAddress })
                                    .where('id = :id', { id: order.id })
                                    .execute()];
                        case 3:
                            _a.sent();
                            order.shippingAddress = shippingAddress;
                            // Since a changed ShippingAddress could alter the activeTaxZone,
                            // we will remove any cached activeTaxZone, so it can be re-calculated
                            // as needed.
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone, undefined);
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone_PPA, undefined);
                            return [2 /*return*/, this.applyPriceAdjustments(ctx, order, order.lines)];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the billing address for the Order.
         */
        OrderService_1.prototype.setBillingAddress = function (ctx, orderId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order, country, billingAddress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.countryService.findOneByCode(ctx, input.countryCode)];
                        case 2:
                            country = _a.sent();
                            billingAddress = __assign(__assign({}, input), { countryCode: input.countryCode, country: country.name });
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .update(order_entity_1.Order)
                                    .set({ billingAddress: billingAddress })
                                    .where('id = :id', { id: order.id })
                                    .execute()];
                        case 3:
                            _a.sent();
                            order.billingAddress = billingAddress;
                            // Since a changed BillingAddress could alter the activeTaxZone,
                            // we will remove any cached activeTaxZone, so it can be re-calculated
                            // as needed.
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone, undefined);
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone_PPA, undefined);
                            return [2 /*return*/, this.applyPriceAdjustments(ctx, order, order.lines)];
                    }
                });
            });
        };
        /**
         * @description
         * Unsets the shipping address for the Order.
         *
         * @since 3.1.0
         */
        OrderService_1.prototype.unsetShippingAddress = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .update(order_entity_1.Order)
                                    .set({ shippingAddress: {} })
                                    .where('id = :id', { id: order.id })
                                    .execute()];
                        case 2:
                            _a.sent();
                            order.shippingAddress = {};
                            // Since a changed ShippingAddress could alter the activeTaxZone,
                            // we will remove any cached activeTaxZone, so it can be re-calculated
                            // as needed.
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone, undefined);
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone_PPA, undefined);
                            return [2 /*return*/, this.applyPriceAdjustments(ctx, order, order.lines)];
                    }
                });
            });
        };
        /**
         * @description
         * Unsets the billing address for the Order.
         *
         * @since 3.1.0
         */
        OrderService_1.prototype.unsetBillingAddress = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .update(order_entity_1.Order)
                                    .set({ billingAddress: {} })
                                    .where('id = :id', { id: order.id })
                                    .execute()];
                        case 2:
                            _a.sent();
                            order.billingAddress = {};
                            // Since a changed BillingAddress could alter the activeTaxZone,
                            // we will remove any cached activeTaxZone, so it can be re-calculated
                            // as needed.
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone, undefined);
                            this.requestCache.set(ctx, constants_1.CacheKey.ActiveTaxZone_PPA, undefined);
                            return [2 /*return*/, this.applyPriceAdjustments(ctx, order, order.lines)];
                    }
                });
            });
        };
        /**
         * @description
         * Returns an array of quotes stating which {@link ShippingMethod}s may be applied to this Order.
         * This is determined by the configured {@link ShippingEligibilityChecker} of each ShippingMethod.
         *
         * The quote also includes a price for each method, as determined by the configured
         * {@link ShippingCalculator} of each eligible ShippingMethod.
         */
        OrderService_1.prototype.getEligibleShippingMethods = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, eligibleMethods;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.shippingCalculator.getEligibleShippingMethods(ctx, order)];
                        case 2:
                            eligibleMethods = _a.sent();
                            return [2 /*return*/, eligibleMethods.map(function (eligible) {
                                    var _a = eligible.result, price = _a.price, taxRate = _a.taxRate, priceIncludesTax = _a.priceIncludesTax, metadata = _a.metadata;
                                    return {
                                        id: eligible.method.id,
                                        price: priceIncludesTax ? (0, tax_utils_1.netPriceOf)(price, taxRate) : price,
                                        priceWithTax: priceIncludesTax ? price : (0, tax_utils_1.grossPriceOf)(price, taxRate),
                                        description: eligible.method.description,
                                        name: eligible.method.name,
                                        code: eligible.method.code,
                                        metadata: metadata,
                                        customFields: eligible.method.customFields,
                                    };
                                })];
                    }
                });
            });
        };
        /**
         * @description
         * Returns an array of quotes stating which {@link PaymentMethod}s may be used on this Order.
         */
        OrderService_1.prototype.getEligiblePaymentMethods = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, this.paymentMethodService.getEligiblePaymentMethods(ctx, order)];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the ShippingMethod to be used on this Order.
         */
        OrderService_1.prototype.setShippingMethod = function (ctx, orderId, shippingMethodIds) {
            return __awaiter(this, void 0, void 0, function () {
                var order, validationError, result, updatedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _a.sent();
                            validationError = this.assertAddingItemsState(order);
                            if (validationError) {
                                return [2 /*return*/, validationError];
                            }
                            return [4 /*yield*/, this.orderModifier.setShippingMethods(ctx, order, shippingMethodIds)];
                        case 2:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 3:
                            updatedOrder = _a.sent();
                            return [4 /*yield*/, this.applyPriceAdjustments(ctx, updatedOrder)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.connection.getRepository(ctx, order_entity_1.Order).save(updatedOrder)];
                    }
                });
            });
        };
        /**
         * @description
         * Transitions the Order to the given state.
         */
        OrderService_1.prototype.transitionToState = function (ctx, orderId, state) {
            return __awaiter(this, void 0, void 0, function () {
                var order, _a, fromState, finalize, result, e_1, transitionError;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _b.sent();
                            _a = order;
                            return [4 /*yield*/, this.getOrderPayments(ctx, orderId)];
                        case 2:
                            _a.payments = _b.sent();
                            fromState = order.state;
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.orderStateMachine.transition(ctx, order, state)];
                        case 4:
                            result = _b.sent();
                            finalize = result.finalize;
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _b.sent();
                            transitionError = ctx.translate(e_1.message, { fromState: fromState, toState: state });
                            return [2 /*return*/, new generated_graphql_shop_errors_1.OrderStateTransitionError({ transitionError: transitionError, fromState: fromState, toState: state })];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_state_transition_event_1.OrderStateTransitionEvent(fromState, state, ctx, order))];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, finalize()];
                        case 9:
                            _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 10:
                            _b.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        /**
         * @description
         * Transitions a Fulfillment to the given state and then transitions the Order state based on
         * whether all Fulfillments of the Order are shipped or delivered.
         */
        OrderService_1.prototype.transitionFulfillmentToState = function (ctx, fulfillmentId, state) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fulfillmentService.transitionToState(ctx, fulfillmentId, state)];
                        case 1:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, result.fulfillment];
                    }
                });
            });
        };
        /**
         * @description
         * Transitions a Refund to the given state
         */
        OrderService_1.prototype.transitionRefundToState = function (ctx, refundId, state, transactionId) {
            return __awaiter(this, void 0, void 0, function () {
                var refund, fromState, toState, finalize;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, refund_entity_1.Refund, refundId, {
                                relations: ['payment', 'payment.order'],
                            })];
                        case 1:
                            refund = _a.sent();
                            if (transactionId && refund.transactionId !== transactionId) {
                                refund.transactionId = transactionId;
                            }
                            fromState = refund.state;
                            toState = state;
                            return [4 /*yield*/, this.refundStateMachine.transition(ctx, refund.payment.order, refund, toState)];
                        case 2:
                            finalize = (_a.sent()).finalize;
                            return [4 /*yield*/, this.connection.getRepository(ctx, refund_entity_1.Refund).save(refund)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, finalize()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new refund_state_transition_event_1.RefundStateTransitionEvent(fromState, toState, ctx, refund, refund.payment.order))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, refund];
                    }
                });
            });
        };
        /**
         * @description
         * Allows the Order to be modified, which allows several aspects of the Order to be changed:
         *
         * * Changes to OrderLine quantities
         * * New OrderLines being added
         * * Arbitrary {@link Surcharge}s being added
         * * Shipping or billing address changes
         *
         * Setting the `dryRun` input property to `true` will apply all changes, including updating the price of the
         * Order, except history entry and additional payment actions.
         *
         * __Using dryRun option, you must wrap function call in transaction manually.__
         *
         */
        OrderService_1.prototype.modifyOrder = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, input.orderId)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.orderModifier.modifyOrder(ctx, input, order)];
                        case 2:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            if (input.dryRun) {
                                return [2 /*return*/, result.order];
                            }
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: input.orderId,
                                    type: generated_types_1.HistoryEntryType.ORDER_MODIFIED,
                                    data: {
                                        modificationId: result.modification.id,
                                    },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.getOrderOrThrow(ctx, input.orderId)];
                    }
                });
            });
        };
        /**
         * @description
         * Transitions the given {@link Payment} to a new state.
         */
        OrderService_1.prototype.transitionPaymentToState = function (ctx, paymentId, state) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.paymentService.transitionToState(ctx, paymentId, state)];
                });
            });
        };
        /**
         * @description
         * Adds a new Payment to the Order. If the Order totalWithTax is covered by Payments, then the Order
         * state will get automatically transitioned to the `PaymentSettled` or `PaymentAuthorized` state.
         */
        OrderService_1.prototype.addPaymentToOrder = function (ctx, orderId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order, _a, amountToPay, payment;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderId)];
                        case 1:
                            order = _b.sent();
                            if (!this.canAddPaymentToOrder(order)) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.OrderPaymentStateError()];
                            }
                            _a = order;
                            return [4 /*yield*/, this.getOrderPayments(ctx, order.id)];
                        case 2:
                            _a.payments = _b.sent();
                            amountToPay = order.totalWithTax - (0, order_utils_1.totalCoveredByPayments)(order);
                            return [4 /*yield*/, this.paymentService.createPayment(ctx, order, amountToPay, input.method, input.metadata)];
                        case 3:
                            payment = _b.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(payment)) {
                                return [2 /*return*/, payment];
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('payments')
                                    .of(order)
                                    .add(payment)];
                        case 4:
                            _b.sent();
                            if (payment.state === 'Error') {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.PaymentFailedError({ paymentErrorMessage: payment.errorMessage || '' })];
                            }
                            if (payment.state === 'Declined') {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.PaymentDeclinedError({ paymentErrorMessage: payment.errorMessage || '' })];
                            }
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, order.id))];
                    }
                });
            });
        };
        /**
         * @description
         * We can add a Payment to the order if:
         * 1. the Order is in the `ArrangingPayment` state or
         * 2. the Order's current state can transition to `PaymentAuthorized` and `PaymentSettled`
         */
        OrderService_1.prototype.canAddPaymentToOrder = function (order) {
            if (order.state === 'ArrangingPayment') {
                return true;
            }
            var canTransitionToPaymentAuthorized = this.orderStateMachine.canTransition(order.state, 'PaymentAuthorized');
            var canTransitionToPaymentSettled = this.orderStateMachine.canTransition(order.state, 'PaymentSettled');
            return canTransitionToPaymentAuthorized && canTransitionToPaymentSettled;
        };
        /**
         * @description
         * This method is used after modifying an existing completed order using the `modifyOrder()` method. If the modifications
         * cause the order total to increase (such as when adding a new OrderLine), then there will be an outstanding charge to
         * pay.
         *
         * This method allows you to add a new Payment and assumes the actual processing has been done manually, e.g. in the
         * dashboard of your payment provider.
         */
        OrderService_1.prototype.addManualPaymentToOrder = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order, existingPayments, amount, modifications, unsettledModifications, outstandingModificationsTotal, payment, _i, unsettledModifications_1, modification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, input.orderId)];
                        case 1:
                            order = _a.sent();
                            if (order.state !== 'ArrangingAdditionalPayment' && order.state !== 'ArrangingPayment') {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.ManualPaymentStateError()];
                            }
                            return [4 /*yield*/, this.getOrderPayments(ctx, order.id)];
                        case 2:
                            existingPayments = _a.sent();
                            order.payments = existingPayments;
                            amount = order.totalWithTax - (0, order_utils_1.totalCoveredByPayments)(order);
                            return [4 /*yield*/, this.getOrderModifications(ctx, order.id)];
                        case 3:
                            modifications = _a.sent();
                            unsettledModifications = modifications.filter(function (m) { return !m.isSettled; });
                            if (0 < unsettledModifications.length) {
                                outstandingModificationsTotal = (0, shared_utils_1.summate)(unsettledModifications, 'priceChange');
                                if (outstandingModificationsTotal !== amount) {
                                    throw new errors_1.InternalServerError("The outstanding order amount (".concat(amount, ") should equal the unsettled OrderModifications total (").concat(outstandingModificationsTotal, ")"));
                                }
                            }
                            return [4 /*yield*/, this.paymentService.createManualPayment(ctx, order, amount, input)];
                        case 4:
                            payment = _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .relation('payments')
                                    .of(order)
                                    .add(payment)];
                        case 5:
                            _a.sent();
                            _i = 0, unsettledModifications_1 = unsettledModifications;
                            _a.label = 6;
                        case 6:
                            if (!(_i < unsettledModifications_1.length)) return [3 /*break*/, 9];
                            modification = unsettledModifications_1[_i];
                            modification.payment = payment;
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_modification_entity_1.OrderModification).save(modification)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 6];
                        case 9: return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, order.id))];
                    }
                });
            });
        };
        /**
         * @description
         * Settles a payment by invoking the {@link PaymentMethodHandler}'s `settlePayment()` method. Automatically
         * transitions the Order state if all Payments are settled.
         */
        OrderService_1.prototype.settlePayment = function (ctx, paymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.paymentService.settlePayment(ctx, paymentId)];
                        case 1:
                            payment = _a.sent();
                            if (!(0, error_result_1.isGraphQlErrorResult)(payment)) {
                                if (payment.state !== 'Settled') {
                                    return [2 /*return*/, new generated_graphql_admin_errors_1.SettlePaymentError({ paymentErrorMessage: payment.errorMessage || '' })];
                                }
                            }
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        /**
         * @description
         * Cancels a payment by invoking the {@link PaymentMethodHandler}'s `cancelPayment()` method (if defined), and transitions the Payment to
         * the `Cancelled` state.
         */
        OrderService_1.prototype.cancelPayment = function (ctx, paymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.paymentService.cancelPayment(ctx, paymentId)];
                        case 1:
                            payment = _a.sent();
                            if (!(0, error_result_1.isGraphQlErrorResult)(payment)) {
                                if (payment.state !== 'Cancelled') {
                                    return [2 /*return*/, new generated_graphql_admin_errors_1.CancelPaymentError({ paymentErrorMessage: payment.errorMessage || '' })];
                                }
                            }
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new Fulfillment associated with the given Order and OrderItems.
         */
        OrderService_1.prototype.createFulfillment = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var orders, stockCheckResult, fulfillment, _i, orders_1, order, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!input.lines || input.lines.length === 0 || (0, shared_utils_1.summate)(input.lines, 'quantity') === 0) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.EmptyOrderLineSelectionError()];
                            }
                            return [4 /*yield*/, (0, order_utils_1.getOrdersFromLines)(ctx, this.connection, input.lines)];
                        case 1:
                            orders = _a.sent();
                            return [4 /*yield*/, this.requestedFulfillmentQuantityExceedsLineQuantity(ctx, input)];
                        case 2:
                            if (_a.sent()) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.ItemsAlreadyFulfilledError()];
                            }
                            return [4 /*yield*/, this.ensureSufficientStockForFulfillment(ctx, input)];
                        case 3:
                            stockCheckResult = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(stockCheckResult)) {
                                return [2 /*return*/, stockCheckResult];
                            }
                            return [4 /*yield*/, this.fulfillmentService.create(ctx, orders, input.lines, input.handler)];
                        case 4:
                            fulfillment = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(fulfillment)) {
                                return [2 /*return*/, fulfillment];
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('fulfillments')
                                    .of(orders)
                                    .add(fulfillment)];
                        case 5:
                            _a.sent();
                            _i = 0, orders_1 = orders;
                            _a.label = 6;
                        case 6:
                            if (!(_i < orders_1.length)) return [3 /*break*/, 9];
                            order = orders_1[_i];
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_FULFILLMENT,
                                    data: {
                                        fulfillmentId: fulfillment.id,
                                    },
                                })];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 6];
                        case 9: return [4 /*yield*/, this.fulfillmentService.transitionToState(ctx, fulfillment.id, 'Pending')];
                        case 10:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, result.fulfillment];
                    }
                });
            });
        };
        OrderService_1.prototype.requestedFulfillmentQuantityExceedsLineQuantity = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var existingFulfillmentLines, _loop_3, this_3, _i, _a, inputLine, state_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, fulfillment_line_entity_1.FulfillmentLine)
                                .createQueryBuilder('fulfillmentLine')
                                .leftJoinAndSelect('fulfillmentLine.orderLine', 'orderLine')
                                .leftJoinAndSelect('fulfillmentLine.fulfillment', 'fulfillment')
                                .where('fulfillmentLine.orderLineId IN (:...orderLineIds)', {
                                orderLineIds: input.lines.map(function (l) { return l.orderLineId; }),
                            })
                                .andWhere('fulfillment.state != :state', { state: 'Cancelled' })
                                .getMany()];
                        case 1:
                            existingFulfillmentLines = _b.sent();
                            _loop_3 = function (inputLine) {
                                var fulfillmentLinesForOrderLine, fulfilledQuantity, unfulfilledQuantity, orderLine;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            fulfillmentLinesForOrderLine = existingFulfillmentLines.filter(function (l) {
                                                return (0, utils_1.idsAreEqual)(l.orderLineId, inputLine.orderLineId);
                                            });
                                            if (!fulfillmentLinesForOrderLine.length) return [3 /*break*/, 1];
                                            fulfilledQuantity = (0, shared_utils_1.summate)(fulfillmentLinesForOrderLine, 'quantity');
                                            unfulfilledQuantity = fulfillmentLinesForOrderLine[0].orderLine.quantity - fulfilledQuantity;
                                            if (unfulfilledQuantity < inputLine.quantity) {
                                                return [2 /*return*/, { value: true }];
                                            }
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, this_3.connection.getEntityOrThrow(ctx, order_line_entity_1.OrderLine, inputLine.orderLineId)];
                                        case 2:
                                            orderLine = _c.sent();
                                            if (orderLine.quantity < inputLine.quantity) {
                                                return [2 /*return*/, { value: true }];
                                            }
                                            _c.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            };
                            this_3 = this;
                            _i = 0, _a = input.lines;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            inputLine = _a[_i];
                            return [5 /*yield**/, _loop_3(inputLine)];
                        case 3:
                            state_3 = _b.sent();
                            if (typeof state_3 === "object")
                                return [2 /*return*/, state_3.value];
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, false];
                    }
                });
            });
        };
        OrderService_1.prototype.ensureSufficientStockForFulfillment = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var lines, _loop_4, this_4, _i, lines_2, line, state_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).find({
                                where: {
                                    id: (0, typeorm_1.In)(input.lines.map(function (l) { return l.orderLineId; })),
                                },
                                relations: ['productVariant'],
                            })];
                        case 1:
                            lines = _a.sent();
                            _loop_4 = function (line) {
                                var lineInput, fulfillableStockLevel, stockOnHand, productVariant;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            lineInput = input.lines.find(function (l) { return (0, utils_1.idsAreEqual)(l.orderLineId, line.id); });
                                            return [4 /*yield*/, this_4.productVariantService.getFulfillableStockLevel(ctx, line.productVariant)];
                                        case 1:
                                            fulfillableStockLevel = _b.sent();
                                            if (!(fulfillableStockLevel < lineInput.quantity)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this_4.stockLevelService.getAvailableStock(ctx, line.productVariant.id)];
                                        case 2:
                                            stockOnHand = (_b.sent()).stockOnHand;
                                            productVariant = this_4.translator.translate(line.productVariant, ctx);
                                            return [2 /*return*/, { value: new generated_graphql_admin_errors_1.InsufficientStockOnHandError({
                                                        productVariantId: productVariant.id,
                                                        productVariantName: productVariant.name,
                                                        stockOnHand: stockOnHand,
                                                    }) }];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            };
                            this_4 = this;
                            _i = 0, lines_2 = lines;
                            _a.label = 2;
                        case 2:
                            if (!(_i < lines_2.length)) return [3 /*break*/, 5];
                            line = lines_2[_i];
                            return [5 /*yield**/, _loop_4(line)];
                        case 3:
                            state_4 = _a.sent();
                            if (typeof state_4 === "object")
                                return [2 /*return*/, state_4.value];
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Returns an array of all Fulfillments associated with the Order.
         */
        OrderService_1.prototype.getOrderFulfillments = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var fulfillments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_entity_1.Order, order.id, {
                                relations: ['fulfillments'],
                            })];
                        case 1:
                            fulfillments = (_a.sent()).fulfillments;
                            return [2 /*return*/, fulfillments];
                    }
                });
            });
        };
        /**
         * @description
         * Returns an array of all Surcharges associated with the Order.
         */
        OrderService_1.prototype.getOrderSurcharges = function (ctx, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_entity_1.Order, orderId, {
                                channelId: ctx.channelId,
                                relations: ['surcharges'],
                                relationLoadStrategy: 'query',
                            })];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, order.surcharges || []];
                    }
                });
            });
        };
        /**
         * @description
         * Cancels an Order by transitioning it to the `Cancelled` state. If stock is being tracked for the ProductVariants
         * in the Order, then new {@link StockMovement}s will be created to correct the stock levels.
         */
        OrderService_1.prototype.cancelOrder = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var allOrderItemsCancelled, cancelResult, _a, transitionResult;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            allOrderItemsCancelled = false;
                            if (!(input.lines != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.orderModifier.cancelOrderByOrderLines(ctx, input, input.lines)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.cancelOrderById(ctx, input)];
                        case 3:
                            _a = _b.sent();
                            _b.label = 4;
                        case 4:
                            cancelResult = _a;
                            if ((0, error_result_1.isGraphQlErrorResult)(cancelResult)) {
                                return [2 /*return*/, cancelResult];
                            }
                            else {
                                allOrderItemsCancelled = cancelResult;
                            }
                            if (!allOrderItemsCancelled) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.transitionToState(ctx, input.orderId, 'Cancelled')];
                        case 5:
                            transitionResult = _b.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(transitionResult)) {
                                return [2 /*return*/, transitionResult];
                            }
                            _b.label = 6;
                        case 6: return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, input.orderId))];
                    }
                });
            });
        };
        OrderService_1.prototype.cancelOrderById = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order, lines;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, input.orderId)];
                        case 1:
                            order = _a.sent();
                            if (order.active) {
                                return [2 /*return*/, true];
                            }
                            else {
                                lines = order.lines.map(function (l) { return ({
                                    orderLineId: l.id,
                                    quantity: l.quantity,
                                }); });
                                return [2 /*return*/, this.orderModifier.cancelOrderByOrderLines(ctx, input, lines)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a {@link Refund} against the order and in doing so invokes the `createRefund()` method of the
         * {@link PaymentMethodHandler}.
         */
        OrderService_1.prototype.refundOrder = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var orders, payment, order, createdRefund;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if ((!input.lines || input.lines.length === 0 || (0, shared_utils_1.summate)(input.lines, 'quantity') === 0) &&
                                input.shipping === 0 &&
                                !input.amount) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.NothingToRefundError()];
                            }
                            return [4 /*yield*/, (0, order_utils_1.getOrdersFromLines)(ctx, this.connection, (_a = input.lines) !== null && _a !== void 0 ? _a : [])];
                        case 1:
                            orders = _b.sent();
                            if (1 < orders.length) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.MultipleOrderError()];
                            }
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, payment_entity_1.Payment, input.paymentId, {
                                    relations: ['order'],
                                })];
                        case 2:
                            payment = _b.sent();
                            if (orders && orders.length && !(0, utils_1.idsAreEqual)(payment.order.id, orders[0].id)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.PaymentOrderMismatchError()];
                            }
                            order = payment.order;
                            if (order.state === 'AddingItems' ||
                                order.state === 'ArrangingPayment' ||
                                order.state === 'PaymentAuthorized') {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.RefundOrderStateError({ orderState: order.state })];
                            }
                            return [4 /*yield*/, this.paymentService.createRefund(ctx, input, order, payment)];
                        case 3:
                            createdRefund = _b.sent();
                            if (!(createdRefund instanceof refund_entity_1.Refund)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.eventBus.publish(new refund_event_1.RefundEvent(ctx, order, createdRefund, 'created'))];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [2 /*return*/, createdRefund];
                    }
                });
            });
        };
        /**
         * @description
         * Settles a Refund by transitioning it to the `Settled` state.
         */
        OrderService_1.prototype.settleRefund = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var refund, fromState, toState, finalize;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, refund_entity_1.Refund, input.id, {
                                relations: ['payment', 'payment.order'],
                            })];
                        case 1:
                            refund = _a.sent();
                            refund.transactionId = input.transactionId;
                            fromState = refund.state;
                            toState = 'Settled';
                            return [4 /*yield*/, this.refundStateMachine.transition(ctx, refund.payment.order, refund, toState)];
                        case 2:
                            finalize = (_a.sent()).finalize;
                            return [4 /*yield*/, this.connection.getRepository(ctx, refund_entity_1.Refund).save(refund)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, finalize()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new refund_state_transition_event_1.RefundStateTransitionEvent(fromState, toState, ctx, refund, refund.payment.order))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, refund];
                    }
                });
            });
        };
        /**
         * @description
         * Associates a Customer with the Order.
         */
        OrderService_1.prototype.addCustomerToOrder = function (ctx, orderIdOrOrder, customer) {
            return __awaiter(this, void 0, void 0, function () {
                var order, _a, updatedOrder, _i, _b, couponCode, validationResult;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(orderIdOrOrder instanceof order_entity_1.Order)) return [3 /*break*/, 1];
                            _a = orderIdOrOrder;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.getOrderOrThrow(ctx, orderIdOrOrder)];
                        case 2:
                            _a = _c.sent();
                            _c.label = 3;
                        case 3:
                            order = _a;
                            order.customer = customer;
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 4:
                            _c.sent();
                            updatedOrder = order;
                            if (!(order.active && order.couponCodes)) return [3 /*break*/, 9];
                            _i = 0, _b = order.couponCodes.slice();
                            _c.label = 5;
                        case 5:
                            if (!(_i < _b.length)) return [3 /*break*/, 9];
                            couponCode = _b[_i];
                            return [4 /*yield*/, this.promotionService.validateCouponCode(ctx, couponCode, customer.id)];
                        case 6:
                            validationResult = _c.sent();
                            if (!(0, error_result_1.isGraphQlErrorResult)(validationResult)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.removeCouponCode(ctx, order.id, couponCode)];
                        case 7:
                            updatedOrder = _c.sent();
                            _c.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 5];
                        case 9: return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new "ORDER_NOTE" type {@link OrderHistoryEntry} in the Order's history timeline.
         */
        OrderService_1.prototype.addNoteToOrder = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderOrThrow(ctx, input.id)];
                        case 1:
                            order = _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_NOTE,
                                    data: {
                                        note: input.note,
                                    },
                                }, input.isPublic)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderService_1.prototype.updateOrderNote = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.historyService.updateOrderHistoryEntry(ctx, {
                            type: generated_types_1.HistoryEntryType.ORDER_NOTE,
                            data: input.note ? { note: input.note } : undefined,
                            isPublic: (_a = input.isPublic) !== null && _a !== void 0 ? _a : undefined,
                            ctx: ctx,
                            entryId: input.noteId,
                        })];
                });
            });
        };
        OrderService_1.prototype.deleteOrderNote = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.historyService.deleteOrderHistoryEntry(ctx, id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                        case 2:
                            e_2 = _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: e_2.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes an Order, ensuring that any Sessions that reference this Order are dereferenced before deletion.
         *
         * @since 1.5.0
         */
        OrderService_1.prototype.deleteOrder = function (ctx, orderOrId) {
            return __awaiter(this, void 0, void 0, function () {
                var orderToDelete, _a, sessions, deletedOrder;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(orderOrId instanceof order_entity_1.Order)) return [3 /*break*/, 1];
                            _a = orderOrId;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.connection
                                .getRepository(ctx, order_entity_1.Order)
                                .findOneOrFail({ where: { id: orderOrId }, relations: ['lines', 'shippingLines'] })];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            orderToDelete = _a;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, session_entity_1.Session)
                                    .find({ where: { activeOrderId: orderToDelete.id } })];
                        case 4:
                            sessions = _b.sent();
                            if (!sessions.length) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, session_entity_1.Session)
                                    .update(sessions.map(function (s) { return s.id; }), { activeOrder: null })];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            deletedOrder = new order_entity_1.Order(orderToDelete);
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).delete(orderToDelete.id)];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_event_1.OrderEvent(ctx, deletedOrder, 'deleted'))];
                        case 8:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * When a guest user with an anonymous Order signs in and has an existing Order associated with that Customer,
         * we need to reconcile the contents of the two orders.
         *
         * The logic used to do the merging is specified in the {@link OrderOptions} `mergeStrategy` config setting.
         */
        OrderService_1.prototype.mergeOrders = function (ctx, user, guestOrder, existingOrder) {
            return __awaiter(this, void 0, void 0, function () {
                var mergeResult, orderToDelete, linesToInsert, linesToDelete, linesToModify, order, e_3, note, orderId, _i, linesToDelete_1, line, result, orderId, result, orderId, result, orderId, result, e_4, customer;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (guestOrder && guestOrder.customer) {
                                // In this case the "guest order" is actually an order of an existing Customer,
                                // so we do not want to merge at all. See https://github.com/vendurehq/vendure/issues/263
                                return [2 /*return*/, existingOrder];
                            }
                            mergeResult = this.orderMerger.merge(ctx, guestOrder, existingOrder);
                            orderToDelete = mergeResult.orderToDelete, linesToInsert = mergeResult.linesToInsert, linesToDelete = mergeResult.linesToDelete, linesToModify = mergeResult.linesToModify;
                            order = mergeResult.order;
                            if (!orderToDelete) return [3 /*break*/, 6];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 6]);
                            // Separate transaction to isolate foreign key failure, so it doesn't roll back the entire outer transaction
                            return [4 /*yield*/, this.connection.withTransaction(ctx, function (innerCtx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.deleteOrder(innerCtx, orderToDelete)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            // Separate transaction to isolate foreign key failure, so it doesn't roll back the entire outer transaction
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 3:
                            e_3 = _a.sent();
                            if (!(0, db_errors_1.isForeignKeyViolationError)(e_3))
                                throw e_3;
                            if (!order)
                                throw new Error("Cannot complete order merge: active order not found, while cancelling order ".concat(orderToDelete.id));
                            // If the order has a foreign key violation (e.g. with cancelled payments),
                            // instead of deleting it we cancel the order and leave a note with an explanation.
                            // This way the previous order and all its information are preserved.
                            return [4 /*yield*/, this.cancelOrder(ctx, { orderId: orderToDelete.id })];
                        case 4:
                            // If the order has a foreign key violation (e.g. with cancelled payments),
                            // instead of deleting it we cancel the order and leave a note with an explanation.
                            // This way the previous order and all its information are preserved.
                            _a.sent();
                            note = [
                                'This order was cancelled during user sign-in because merging with the active order was not possible.',
                                "The active order is ".concat(order.code, ". This order has been preserved for reference."),
                            ].join(' ');
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: orderToDelete.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_NOTE,
                                    data: { note: note },
                                }, false)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            if (!(order && linesToDelete)) return [3 /*break*/, 10];
                            orderId = order.id;
                            _i = 0, linesToDelete_1 = linesToDelete;
                            _a.label = 7;
                        case 7:
                            if (!(_i < linesToDelete_1.length)) return [3 /*break*/, 10];
                            line = linesToDelete_1[_i];
                            return [4 /*yield*/, this.removeItemFromOrder(ctx, orderId, line.orderLineId)];
                        case 8:
                            result = _a.sent();
                            if (!(0, error_result_1.isGraphQlErrorResult)(result)) {
                                order = result;
                            }
                            _a.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 7];
                        case 10:
                            if (!(order && linesToInsert)) return [3 /*break*/, 12];
                            orderId = order.id;
                            return [4 /*yield*/, this.addItemsToOrder(ctx, orderId, linesToInsert)];
                        case 11:
                            result = _a.sent();
                            order = result.order;
                            _a.label = 12;
                        case 12:
                            if (!(order && linesToModify)) return [3 /*break*/, 14];
                            orderId = order.id;
                            return [4 /*yield*/, this.adjustOrderLines(ctx, orderId, linesToModify)];
                        case 13:
                            result = _a.sent();
                            order = result.order;
                            _a.label = 14;
                        case 14:
                            if (!(order && linesToDelete)) return [3 /*break*/, 18];
                            orderId = order.id;
                            _a.label = 15;
                        case 15:
                            _a.trys.push([15, 17, , 18]);
                            return [4 /*yield*/, this.removeItemsFromOrder(ctx, orderId, linesToDelete.map(function (l) { return l.orderLineId; }))];
                        case 16:
                            result = _a.sent();
                            if (!(0, error_result_1.isGraphQlErrorResult)(result)) {
                                order = result;
                            }
                            return [3 /*break*/, 18];
                        case 17:
                            e_4 = _a.sent();
                            vendure_logger_1.Logger.error(e_4.message, undefined, e_4.stack);
                            return [3 /*break*/, 18];
                        case 18: return [4 /*yield*/, this.customerService.findOneByUserId(ctx, user.id)];
                        case 19:
                            customer = _a.sent();
                            if (!(order && customer)) return [3 /*break*/, 21];
                            order.customer = customer;
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 20:
                            _a.sent();
                            _a.label = 21;
                        case 21: return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderService_1.prototype.getOrderOrThrow = function (ctx, orderId, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, orderId, relations !== null && relations !== void 0 ? relations : [
                                'lines',
                                'lines.productVariant',
                                'lines.productVariant.productVariantPrices',
                                'shippingLines',
                                'surcharges',
                                'customer',
                            ])];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new errors_1.EntityNotFoundError('Order', orderId);
                            }
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderService_1.prototype.getOrderLineOrThrow = function (order, orderLineId) {
            var orderLine = order.lines.find(function (line) { return (0, utils_1.idsAreEqual)(line.id, orderLineId); });
            if (!orderLine) {
                throw new errors_1.UserInputError('error.order-does-not-contain-line-with-id', { id: orderLineId });
            }
            return orderLine;
        };
        /**
         * Returns error if quantity is negative.
         */
        OrderService_1.prototype.assertQuantityIsPositive = function (quantity) {
            if (quantity < 0) {
                return new generated_graphql_shop_errors_1.NegativeQuantityError();
            }
        };
        /**
         * Returns error if the Order is not in the "AddingItems" or "Draft" state.
         */
        OrderService_1.prototype.assertAddingItemsState = function (order) {
            if (order.state !== 'AddingItems' && order.state !== 'Draft') {
                return new generated_graphql_shop_errors_1.OrderModificationError();
            }
        };
        /**
         * Throws if adding the given quantity would take the total order items over the
         * maximum limit specified in the config.
         */
        OrderService_1.prototype.assertNotOverOrderItemsLimit = function (order, quantityToAdd) {
            var currentItemsCount = (0, shared_utils_1.summate)(order.lines, 'quantity');
            var orderItemsLimit = this.configService.orderOptions.orderItemsLimit;
            if (orderItemsLimit < currentItemsCount + quantityToAdd) {
                return new generated_graphql_shop_errors_1.OrderLimitError({ maxItems: orderItemsLimit });
            }
        };
        /**
         * Throws if adding the given quantity would exceed the maximum allowed
         * quantity for one order line.
         */
        OrderService_1.prototype.assertNotOverOrderLineItemsLimit = function (orderLine, quantityToAdd) {
            var currentQuantity = (orderLine === null || orderLine === void 0 ? void 0 : orderLine.quantity) || 0;
            var orderLineItemsLimit = this.configService.orderOptions.orderLineItemsLimit;
            if (orderLineItemsLimit < currentQuantity + quantityToAdd) {
                return new generated_graphql_shop_errors_1.OrderLimitError({ maxItems: orderLineItemsLimit });
            }
        };
        /**
         * @description
         * Applies promotions, taxes and shipping to the Order. If the `updatedOrderLines` argument is passed in,
         * then all of those OrderLines will have their prices re-calculated using the configured {@link OrderItemPriceCalculationStrategy}.
         */
        OrderService_1.prototype.applyPriceAdjustments = function (ctx, order, updatedOrderLines, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var promotions, activePromotionsPre, _a, orderItemPriceCalculationStrategy, changedPriceHandlingStrategy, _i, updatedOrderLines_1, updatedOrderLine, variant, priceResult, initialListPrice, shippingLineIdsPre, updatedOrder, shippingLineIdsPost;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.promotionService.getActivePromotionsInChannel(ctx)];
                        case 1:
                            promotions = _c.sent();
                            return [4 /*yield*/, this.promotionService.getActivePromotionsOnOrder(ctx, order.id)];
                        case 2:
                            activePromotionsPre = _c.sent();
                            // When changing the Order's currencyCode (on account of passing
                            // a different currencyCode into the RequestContext), we need to make sure
                            // to update all existing OrderLines to use prices in this new currency.
                            if (ctx.currencyCode !== order.currencyCode) {
                                updatedOrderLines = order.lines;
                                order.currencyCode = ctx.currencyCode;
                            }
                            if (!(updatedOrderLines === null || updatedOrderLines === void 0 ? void 0 : updatedOrderLines.length)) return [3 /*break*/, 9];
                            _a = this.configService.orderOptions, orderItemPriceCalculationStrategy = _a.orderItemPriceCalculationStrategy, changedPriceHandlingStrategy = _a.changedPriceHandlingStrategy;
                            _i = 0, updatedOrderLines_1 = updatedOrderLines;
                            _c.label = 3;
                        case 3:
                            if (!(_i < updatedOrderLines_1.length)) return [3 /*break*/, 9];
                            updatedOrderLine = updatedOrderLines_1[_i];
                            return [4 /*yield*/, this.productVariantService.applyChannelPriceAndTax(updatedOrderLine.productVariant, ctx, order)];
                        case 4:
                            variant = _c.sent();
                            return [4 /*yield*/, orderItemPriceCalculationStrategy.calculateUnitPrice(ctx, variant, updatedOrderLine.customFields || {}, order, updatedOrderLine.quantity)];
                        case 5:
                            priceResult = _c.sent();
                            initialListPrice = (_b = updatedOrderLine.initialListPrice) !== null && _b !== void 0 ? _b : priceResult.price;
                            if (!(initialListPrice !== priceResult.price)) return [3 /*break*/, 7];
                            return [4 /*yield*/, changedPriceHandlingStrategy.handlePriceChange(ctx, priceResult, updatedOrderLine, order)];
                        case 6:
                            priceResult = _c.sent();
                            _c.label = 7;
                        case 7:
                            if (updatedOrderLine.initialListPrice == null) {
                                updatedOrderLine.initialListPrice = initialListPrice;
                            }
                            updatedOrderLine.listPrice = priceResult.price;
                            updatedOrderLine.listPriceIncludesTax = priceResult.priceIncludesTax;
                            _c.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 3];
                        case 9:
                            shippingLineIdsPre = order.shippingLines.map(function (l) { return l.id; });
                            return [4 /*yield*/, this.orderCalculator.applyPriceAdjustments(ctx, order, promotions, updatedOrderLines !== null && updatedOrderLines !== void 0 ? updatedOrderLines : [])];
                        case 10:
                            updatedOrder = _c.sent();
                            shippingLineIdsPost = updatedOrder.shippingLines.map(function (l) { return l.id; });
                            return [4 /*yield*/, this.applyChangesToShippingLines(ctx, updatedOrder, shippingLineIdsPre, shippingLineIdsPost)];
                        case 11:
                            _c.sent();
                            // Explicitly omit the shippingAddress and billingAddress properties to avoid
                            // a race condition where changing one or the other in parallel can
                            // overwrite the other's changes. The other omissions prevent the save
                            // function from doing more work than necessary.
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .save((0, omit_1.omit)(updatedOrder, [
                                    'shippingAddress',
                                    'billingAddress',
                                    'lines',
                                    'shippingLines',
                                    'aggregateOrder',
                                    'sellerOrders',
                                    'customer',
                                    'modifications',
                                    'customFields',
                                ]), {
                                    reload: false,
                                })];
                        case 12:
                            // Explicitly omit the shippingAddress and billingAddress properties to avoid
                            // a race condition where changing one or the other in parallel can
                            // overwrite the other's changes. The other omissions prevent the save
                            // function from doing more work than necessary.
                            _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(updatedOrder.lines, { reload: false })];
                        case 13:
                            _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).save(order.shippingLines, { reload: false })];
                        case 14:
                            _c.sent();
                            return [4 /*yield*/, this.promotionService.runPromotionSideEffects(ctx, order, activePromotionsPre)];
                        case 15:
                            _c.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, order.id, relations))];
                    }
                });
            });
        };
        /**
         * Applies changes to the shipping lines of an order, adding or removing the relations
         * in the database.
         */
        OrderService_1.prototype.applyChangesToShippingLines = function (ctx, order, shippingLineIdsPre, shippingLineIdsPost) {
            return __awaiter(this, void 0, void 0, function () {
                var removedShippingLineIds, newlyAddedShippingLineIds, _i, removedShippingLineIds_1, idToRemove, _a, newlyAddedShippingLineIds_1, idToAdd;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            removedShippingLineIds = shippingLineIdsPre.filter(function (id) { return !shippingLineIdsPost.includes(id); });
                            newlyAddedShippingLineIds = shippingLineIdsPost.filter(function (id) { return !shippingLineIdsPre.includes(id); });
                            _i = 0, removedShippingLineIds_1 = removedShippingLineIds;
                            _b.label = 1;
                        case 1:
                            if (!(_i < removedShippingLineIds_1.length)) return [3 /*break*/, 4];
                            idToRemove = removedShippingLineIds_1[_i];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('shippingLines')
                                    .of(order)
                                    .remove(idToRemove)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            _a = 0, newlyAddedShippingLineIds_1 = newlyAddedShippingLineIds;
                            _b.label = 5;
                        case 5:
                            if (!(_a < newlyAddedShippingLineIds_1.length)) return [3 /*break*/, 8];
                            idToAdd = newlyAddedShippingLineIds_1[_a];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('shippingLines')
                                    .of(order)
                                    .add(idToAdd)];
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
        return OrderService_1;
    }());
    __setFunctionName(_classThis, "OrderService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderService = _classThis;
}();
exports.OrderService = OrderService;
