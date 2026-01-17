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
exports.defaultOrderProcess = void 0;
exports.configureDefaultOrderProcess = configureDefaultOrderProcess;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var unique_1 = require("@vendure/common/lib/unique");
var transactional_connection_1 = require("../../connection/transactional-connection");
var order_entity_1 = require("../../entity/order/order.entity");
var order_line_entity_1 = require("../../entity/order-line/order-line.entity");
var order_modification_entity_1 = require("../../entity/order-modification/order-modification.entity");
var payment_entity_1 = require("../../entity/payment/payment.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var order_placed_event_1 = require("../../event-bus/events/order-placed-event");
var order_utils_1 = require("../../service/helpers/utils/order-utils");
/**
 * @description
 * Used to configure a customized instance of the default {@link OrderProcess} that ships with Vendure.
 * Using this function allows you to turn off certain checks and constraints that are enabled by default.
 *
 * ```ts
 * import { configureDefaultOrderProcess, VendureConfig } from '\@vendure/core';
 *
 * const myCustomOrderProcess = configureDefaultOrderProcess({
 *   // Disable the constraint that requires
 *   // Orders to have a shipping method assigned
 *   // before payment.
 *   arrangingPaymentRequiresShipping: false,
 * });
 *
 * export const config: VendureConfig = {
 *   orderOptions: {
 *     process: [myCustomOrderProcess],
 *   },
 * };
 * ```
 * The {@link DefaultOrderProcessOptions} type defines all available options. If you require even
 * more customization, you can create your own implementation of the {@link OrderProcess} interface.
 *
 *
 * @docsCategory Orders
 * @docsPage OrderProcess
 * @since 2.0.0
 */
function configureDefaultOrderProcess(options) {
    var connection;
    var productVariantService;
    var configService;
    var eventBus;
    var stockMovementService;
    var stockLevelService;
    var historyService;
    var orderSplitter;
    var orderProcess = {
        transitions: {
            Created: {
                to: ['AddingItems', 'Draft'],
            },
            Draft: {
                to: ['Cancelled', 'ArrangingPayment'],
            },
            AddingItems: {
                to: ['ArrangingPayment', 'Cancelled'],
            },
            ArrangingPayment: {
                to: ['PaymentAuthorized', 'PaymentSettled', 'AddingItems', 'Cancelled'],
            },
            PaymentAuthorized: {
                to: ['PaymentSettled', 'Cancelled', 'Modifying', 'ArrangingAdditionalPayment'],
            },
            PaymentSettled: {
                to: [
                    'PartiallyDelivered',
                    'Delivered',
                    'PartiallyShipped',
                    'Shipped',
                    'Cancelled',
                    'Modifying',
                    'ArrangingAdditionalPayment',
                ],
            },
            PartiallyShipped: {
                to: ['Shipped', 'PartiallyDelivered', 'Cancelled', 'Modifying'],
            },
            Shipped: {
                to: ['PartiallyDelivered', 'Delivered', 'Cancelled', 'Modifying'],
            },
            PartiallyDelivered: {
                to: ['Delivered', 'Cancelled', 'Modifying'],
            },
            Delivered: {
                to: ['Cancelled'],
            },
            Modifying: {
                to: [
                    'PaymentAuthorized',
                    'PaymentSettled',
                    'PartiallyShipped',
                    'Shipped',
                    'PartiallyDelivered',
                    'ArrangingAdditionalPayment',
                ],
            },
            ArrangingAdditionalPayment: {
                to: [
                    'PaymentAuthorized',
                    'PaymentSettled',
                    'PartiallyShipped',
                    'Shipped',
                    'PartiallyDelivered',
                    'Cancelled',
                ],
            },
            Cancelled: {
                to: [],
            },
        },
        init: function (injector) {
            return __awaiter(this, void 0, void 0, function () {
                var ConfigService, EventBus, StockMovementService, StockLevelService, HistoryService, OrderSplitter, ProductVariantService;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../config.service.js'); }).then(function (m) { return m.ConfigService; })];
                        case 1:
                            ConfigService = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../event-bus/index.js'); }).then(function (m) { return m.EventBus; })];
                        case 2:
                            EventBus = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.StockMovementService; })];
                        case 3:
                            StockMovementService = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.StockLevelService; })];
                        case 4:
                            StockLevelService = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.HistoryService; })];
                        case 5:
                            HistoryService = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.OrderSplitter; })];
                        case 6:
                            OrderSplitter = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.ProductVariantService; })];
                        case 7:
                            ProductVariantService = _a.sent();
                            connection = injector.get(transactional_connection_1.TransactionalConnection);
                            productVariantService = injector.get(ProductVariantService);
                            configService = injector.get(ConfigService);
                            eventBus = injector.get(EventBus);
                            stockMovementService = injector.get(StockMovementService);
                            stockLevelService = injector.get(StockLevelService);
                            historyService = injector.get(HistoryService);
                            orderSplitter = injector.get(OrderSplitter);
                            return [2 /*return*/];
                    }
                });
            });
        },
        onTransitionStart: function (fromState_1, toState_1, _a) {
            return __awaiter(this, arguments, void 0, function (fromState, toState, _b) {
                var modifications, existingPayments, deficit, variantIds, qb, availableVariants, variantsWithInsufficientSaleableStock, _i, _c, line, availableStock, hasAnAuthorizedPayment, orderWithFulfillments, orderWithFulfillments, orderWithFulfillments, orderWithFulfillments;
                var ctx = _b.ctx, order = _b.order;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!(options.checkModificationPayments !== false && fromState === 'Modifying')) return [3 /*break*/, 2];
                            return [4 /*yield*/, connection
                                    .getRepository(ctx, order_modification_entity_1.OrderModification)
                                    .find({ where: { order: { id: order.id } }, relations: ['refund', 'payment'] })];
                        case 1:
                            modifications = _d.sent();
                            if (toState === 'ArrangingAdditionalPayment') {
                                if (0 < modifications.length &&
                                    modifications.every(function (modification) { return modification.isSettled; })) {
                                    return [2 /*return*/, 'message.cannot-transition-no-additional-payments-needed'];
                                }
                            }
                            else {
                                if (modifications.some(function (modification) { return !modification.isSettled; })) {
                                    return [2 /*return*/, 'message.cannot-transition-without-modification-payment'];
                                }
                            }
                            _d.label = 2;
                        case 2:
                            if (!(options.checkAdditionalPaymentsAmount !== false &&
                                fromState === 'ArrangingAdditionalPayment')) return [3 /*break*/, 4];
                            if (toState === 'Cancelled') {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, connection.getRepository(ctx, payment_entity_1.Payment).find({
                                    relations: ['refunds'],
                                    where: {
                                        order: { id: order.id },
                                    },
                                })];
                        case 3:
                            existingPayments = _d.sent();
                            order.payments = existingPayments;
                            deficit = order.totalWithTax - (0, order_utils_1.totalCoveredByPayments)(order);
                            if (0 < deficit) {
                                return [2 /*return*/, 'message.cannot-transition-from-arranging-additional-payment'];
                            }
                            _d.label = 4;
                        case 4:
                            if (!(options.checkAllVariantsExist !== false &&
                                fromState === 'AddingItems' &&
                                toState !== 'Cancelled' &&
                                order.lines.length > 0)) return [3 /*break*/, 6];
                            variantIds = (0, unique_1.unique)(order.lines.map(function (l) { return l.productVariant.id; }));
                            qb = connection
                                .getRepository(ctx, product_variant_entity_1.ProductVariant)
                                .createQueryBuilder('variant')
                                .leftJoin('variant.product', 'product')
                                .where('variant.deletedAt IS NULL')
                                .andWhere('product.deletedAt IS NULL')
                                .andWhere('variant.id IN (:...variantIds)', { variantIds: variantIds });
                            return [4 /*yield*/, qb.getMany()];
                        case 5:
                            availableVariants = _d.sent();
                            if (availableVariants.length !== variantIds.length) {
                                return [2 /*return*/, 'message.cannot-transition-order-contains-products-which-are-unavailable'];
                            }
                            _d.label = 6;
                        case 6:
                            if (!(toState === 'ArrangingPayment')) return [3 /*break*/, 11];
                            if (options.arrangingPaymentRequiresContents !== false && order.lines.length === 0) {
                                return [2 /*return*/, 'message.cannot-transition-to-payment-when-order-is-empty'];
                            }
                            if (options.arrangingPaymentRequiresCustomer !== false && !order.customer) {
                                return [2 /*return*/, 'message.cannot-transition-to-payment-without-customer'];
                            }
                            if (options.arrangingPaymentRequiresShipping !== false &&
                                (!order.shippingLines || order.shippingLines.length === 0)) {
                                return [2 /*return*/, 'message.cannot-transition-to-payment-without-shipping-method'];
                            }
                            if (!(options.arrangingPaymentRequiresStock !== false)) return [3 /*break*/, 11];
                            variantsWithInsufficientSaleableStock = [];
                            _i = 0, _c = order.lines;
                            _d.label = 7;
                        case 7:
                            if (!(_i < _c.length)) return [3 /*break*/, 10];
                            line = _c[_i];
                            return [4 /*yield*/, productVariantService.getSaleableStockLevel(ctx, line.productVariant)];
                        case 8:
                            availableStock = _d.sent();
                            if (line.quantity > availableStock) {
                                variantsWithInsufficientSaleableStock.push(line.productVariant);
                            }
                            _d.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 7];
                        case 10:
                            if (variantsWithInsufficientSaleableStock.length) {
                                return [2 /*return*/, ctx.translate('message.cannot-transition-to-payment-due-to-insufficient-stock', {
                                        productVariantNames: variantsWithInsufficientSaleableStock
                                            .map(function (v) { return v.name; })
                                            .join(', '),
                                    })];
                            }
                            _d.label = 11;
                        case 11:
                            if (options.checkPaymentsCoverTotal !== false) {
                                if (toState === 'PaymentAuthorized') {
                                    hasAnAuthorizedPayment = !!order.payments.find(function (p) { return p.state === 'Authorized'; });
                                    if (!(0, order_utils_1.orderTotalIsCovered)(order, ['Authorized', 'Settled']) || !hasAnAuthorizedPayment) {
                                        return [2 /*return*/, 'message.cannot-transition-without-authorized-payments'];
                                    }
                                }
                                if (toState === 'PaymentSettled' && !(0, order_utils_1.orderTotalIsCovered)(order, 'Settled')) {
                                    return [2 /*return*/, 'message.cannot-transition-without-settled-payments'];
                                }
                            }
                            if (options.checkAllItemsBeforeCancel !== false) {
                                if (toState === 'Cancelled' &&
                                    fromState !== 'AddingItems' &&
                                    fromState !== 'ArrangingPayment') {
                                    if (!(0, order_utils_1.orderLinesAreAllCancelled)(order)) {
                                        return [2 /*return*/, 'message.cannot-transition-unless-all-cancelled'];
                                    }
                                }
                            }
                            if (!(options.checkFulfillmentStates !== false)) return [3 /*break*/, 19];
                            if (!(toState === 'PartiallyShipped')) return [3 /*break*/, 13];
                            return [4 /*yield*/, findOrderWithFulfillments(ctx, order.id)];
                        case 12:
                            orderWithFulfillments = _d.sent();
                            if (!(0, order_utils_1.orderItemsArePartiallyShipped)(orderWithFulfillments)) {
                                return [2 /*return*/, 'message.cannot-transition-unless-some-order-items-shipped'];
                            }
                            _d.label = 13;
                        case 13:
                            if (!(toState === 'Shipped')) return [3 /*break*/, 15];
                            return [4 /*yield*/, findOrderWithFulfillments(ctx, order.id)];
                        case 14:
                            orderWithFulfillments = _d.sent();
                            if (!(0, order_utils_1.orderItemsAreShipped)(orderWithFulfillments)) {
                                return [2 /*return*/, 'message.cannot-transition-unless-all-order-items-shipped'];
                            }
                            _d.label = 15;
                        case 15:
                            if (!(toState === 'PartiallyDelivered')) return [3 /*break*/, 17];
                            return [4 /*yield*/, findOrderWithFulfillments(ctx, order.id)];
                        case 16:
                            orderWithFulfillments = _d.sent();
                            if (!(0, order_utils_1.orderItemsArePartiallyDelivered)(orderWithFulfillments)) {
                                return [2 /*return*/, 'message.cannot-transition-unless-some-order-items-delivered'];
                            }
                            _d.label = 17;
                        case 17:
                            if (!(toState === 'Delivered')) return [3 /*break*/, 19];
                            return [4 /*yield*/, findOrderWithFulfillments(ctx, order.id)];
                        case 18:
                            orderWithFulfillments = _d.sent();
                            if (!(0, order_utils_1.orderItemsAreDelivered)(orderWithFulfillments)) {
                                return [2 /*return*/, 'message.cannot-transition-unless-all-order-items-delivered'];
                            }
                            _d.label = 19;
                        case 19: return [2 /*return*/];
                    }
                });
            });
        },
        onTransitionEnd: function (fromState, toState, data) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, order, _a, stockAllocationStrategy, orderPlacedStrategy, shouldSetAsPlaced, shouldAllocateStock;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            ctx = data.ctx, order = data.order;
                            _a = configService.orderOptions, stockAllocationStrategy = _a.stockAllocationStrategy, orderPlacedStrategy = _a.orderPlacedStrategy;
                            if (!order.active) return [3 /*break*/, 4];
                            shouldSetAsPlaced = orderPlacedStrategy.shouldSetAsPlaced(ctx, fromState, toState, order);
                            if (!shouldSetAsPlaced) return [3 /*break*/, 4];
                            order.active = false;
                            order.orderPlacedAt = new Date();
                            return [4 /*yield*/, Promise.all(order.lines.map(function (line) {
                                    line.orderPlacedQuantity = line.quantity;
                                    return connection
                                        .getRepository(ctx, order_line_entity_1.OrderLine)
                                        .update(line.id, { orderPlacedQuantity: line.quantity });
                                }))];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, eventBus.publish(new order_placed_event_1.OrderPlacedEvent(fromState, toState, ctx, order))];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, orderSplitter.createSellerOrders(ctx, order)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [4 /*yield*/, stockAllocationStrategy.shouldAllocateStock(ctx, fromState, toState, order)];
                        case 5:
                            shouldAllocateStock = _b.sent();
                            if (!shouldAllocateStock) return [3 /*break*/, 7];
                            return [4 /*yield*/, stockMovementService.createAllocationsForOrder(ctx, order)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            if (toState === 'Cancelled') {
                                order.active = false;
                            }
                            if (fromState === 'Draft' && toState === 'ArrangingPayment') {
                                // Once we exit the Draft state, we can consider the order active,
                                // which will allow us to run the OrderPlacedStrategy at the correct point.
                                order.active = true;
                            }
                            return [4 /*yield*/, historyService.createHistoryEntryForOrder({
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_STATE_TRANSITION,
                                    ctx: ctx,
                                    data: {
                                        from: fromState,
                                        to: toState,
                                    },
                                })];
                        case 8:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
    function findOrderWithFulfillments(ctx, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getEntityOrThrow(ctx, order_entity_1.Order, id, {
                            relations: ['lines', 'fulfillments', 'fulfillments.lines', 'fulfillments.lines.fulfillment'],
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    return orderProcess;
}
/**
 * @description
 * This is the built-in {@link OrderProcess} that ships with Vendure. A customized version of this process
 * can be created using the {@link configureDefaultOrderProcess} function, which allows you to pass in an object
 * to enable/disable certain checks.
 *
 * @docsCategory Orders
 * @docsPage OrderProcess
 * @since 2.0.0
 */
exports.defaultOrderProcess = configureDefaultOrderProcess({});
