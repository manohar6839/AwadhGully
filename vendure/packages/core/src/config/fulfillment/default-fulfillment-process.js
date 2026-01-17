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
exports.defaultFulfillmentProcess = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var error_result_1 = require("../../common/error/error-result");
var errors_1 = require("../../common/error/errors");
var utils_1 = require("../../common/utils");
var order_entity_1 = require("../../entity/order/order.entity");
var order_utils_1 = require("../../service/helpers/utils/order-utils");
var connection;
var configService;
var orderService;
var historyService;
var stockMovementService;
var stockLevelService;
/**
 * @description
 * The default {@link FulfillmentProcess}. This process includes the following actions:
 *
 * - Executes the configured `FulfillmentHandler.onFulfillmentTransition()` before any state
 *   transition.
 * - On cancellation of a Fulfillment, creates the necessary {@link Cancellation} & {@link Allocation}
 *   stock movement records.
 * - When a Fulfillment transitions from the `Created` to `Pending` state, the necessary
 *   {@link Sale} stock movements are created.
 *
 * @docsCategory fulfillment
 * @docsPage FulfillmentProcess
 * @since 2.0.0
 */
exports.defaultFulfillmentProcess = {
    transitions: {
        Created: {
            to: ['Pending'],
        },
        Pending: {
            to: ['Shipped', 'Delivered', 'Cancelled'],
        },
        Shipped: {
            to: ['Delivered', 'Cancelled'],
        },
        Delivered: {
            to: ['Cancelled'],
        },
        Cancelled: {
            to: [],
        },
    },
    init: function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var TransactionalConnection, ConfigService, HistoryService, OrderService, StockMovementService, StockLevelService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../connection/transactional-connection.js'); }).then(function (m) { return m.TransactionalConnection; })];
                    case 1:
                        TransactionalConnection = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../config.service.js'); }).then(function (m) { return m.ConfigService; })];
                    case 2:
                        ConfigService = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.HistoryService; })];
                    case 3:
                        HistoryService = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.OrderService; })];
                    case 4:
                        OrderService = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.StockMovementService; })];
                    case 5:
                        StockMovementService = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/index.js'); }).then(function (m) { return m.StockLevelService; })];
                    case 6:
                        StockLevelService = _a.sent();
                        connection = injector.get(TransactionalConnection);
                        configService = injector.get(ConfigService);
                        orderService = injector.get(OrderService);
                        historyService = injector.get(HistoryService);
                        stockMovementService = injector.get(StockMovementService);
                        stockLevelService = injector.get(StockLevelService);
                        return [2 /*return*/];
                }
            });
        });
    },
    onTransitionStart: function (fromState, toState, data) {
        return __awaiter(this, void 0, void 0, function () {
            var fulfillmentHandlers, fulfillmentHandler, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fulfillmentHandlers = configService.shippingOptions.fulfillmentHandlers;
                        fulfillmentHandler = fulfillmentHandlers.find(function (h) { return h.code === data.fulfillment.handlerCode; });
                        if (!fulfillmentHandler) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(fulfillmentHandler.onFulfillmentTransition(fromState, toState, data))];
                    case 1:
                        result = _a.sent();
                        if (result === false || typeof result === 'string') {
                            return [2 /*return*/, result];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    onTransitionEnd: function (fromState_1, toState_1, _a) {
        return __awaiter(this, arguments, void 0, function (fromState, toState, _b) {
            var orderLineInput, historyEntryPromises;
            var ctx = _b.ctx, fulfillment = _b.fulfillment, orders = _b.orders;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(toState === 'Cancelled')) return [3 /*break*/, 3];
                        orderLineInput = fulfillment.lines.map(function (l) { return ({
                            orderLineId: l.orderLineId,
                            quantity: l.quantity,
                        }); });
                        return [4 /*yield*/, stockMovementService.createCancellationsForOrderLines(ctx, orderLineInput)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, stockMovementService.createAllocationsForOrderLines(ctx, orderLineInput)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!(fromState === 'Created' && toState === 'Pending')) return [3 /*break*/, 5];
                        return [4 /*yield*/, stockMovementService.createSalesForOrder(ctx, fulfillment.lines)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        historyEntryPromises = orders.map(function (order) {
                            return historyService.createHistoryEntryForOrder({
                                orderId: order.id,
                                type: generated_types_1.HistoryEntryType.ORDER_FULFILLMENT_TRANSITION,
                                ctx: ctx,
                                data: {
                                    fulfillmentId: fulfillment.id,
                                    from: fromState,
                                    to: toState,
                                },
                            });
                        });
                        return [4 /*yield*/, Promise.all(historyEntryPromises)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, Promise.all(orders.map(function (order) {
                                return handleFulfillmentStateTransitByOrder(ctx, order, fulfillment, fromState, toState);
                            }))];
                    case 7:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
function handleFulfillmentStateTransitByOrder(ctx, order, fulfillment, fromState, toState) {
    return __awaiter(this, void 0, void 0, function () {
        var nextOrderStates, transitionOrderIfStateAvailable, orderWithFulfillment, orderWithFulfillment;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextOrderStates = orderService.getNextOrderStates(order);
                    transitionOrderIfStateAvailable = function (state) { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!nextOrderStates.includes(state)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, orderService.transitionToState(ctx, order.id, state)];
                                case 1:
                                    result = _a.sent();
                                    if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                        throw new errors_1.InternalServerError(result.message);
                                    }
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(toState === 'Shipped')) return [3 /*break*/, 5];
                    return [4 /*yield*/, getOrderWithFulfillments(ctx, order.id)];
                case 1:
                    orderWithFulfillment = _a.sent();
                    if (!(0, order_utils_1.orderItemsAreShipped)(orderWithFulfillment)) return [3 /*break*/, 3];
                    return [4 /*yield*/, transitionOrderIfStateAvailable('Shipped')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, transitionOrderIfStateAvailable('PartiallyShipped')];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!(toState === 'Delivered')) return [3 /*break*/, 10];
                    return [4 /*yield*/, getOrderWithFulfillments(ctx, order.id)];
                case 6:
                    orderWithFulfillment = _a.sent();
                    if (!(0, order_utils_1.orderItemsAreDelivered)(orderWithFulfillment)) return [3 /*break*/, 8];
                    return [4 /*yield*/, transitionOrderIfStateAvailable('Delivered')];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, transitionOrderIfStateAvailable('PartiallyDelivered')];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function getOrderWithFulfillments(ctx, orderId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getEntityOrThrow(ctx, order_entity_1.Order, orderId, {
                        relations: ['lines', 'fulfillments', 'fulfillments.lines', 'fulfillments.lines.fulfillment'],
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
