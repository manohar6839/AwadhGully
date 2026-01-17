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
exports.PaymentService = void 0;
var common_1 = require("@nestjs/common");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var fulfillment_entity_1 = require("../../entity/fulfillment/fulfillment.entity");
var refund_line_entity_1 = require("../../entity/order-line-reference/refund-line.entity");
var order_line_entity_1 = require("../../entity/order-line/order-line.entity");
var order_entity_1 = require("../../entity/order/order.entity");
var payment_entity_1 = require("../../entity/payment/payment.entity");
var refund_entity_1 = require("../../entity/refund/refund.entity");
var payment_state_transition_event_1 = require("../../event-bus/events/payment-state-transition-event");
var refund_state_transition_event_1 = require("../../event-bus/events/refund-state-transition-event");
/**
 * @description
 * Contains methods relating to {@link Payment} entities.
 *
 * @docsCategory services
 */
var PaymentService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentService = _classThis = /** @class */ (function () {
        function PaymentService_1(connection, paymentStateMachine, refundStateMachine, paymentMethodService, eventBus) {
            this.connection = connection;
            this.paymentStateMachine = paymentStateMachine;
            this.refundStateMachine = refundStateMachine;
            this.paymentMethodService = paymentMethodService;
            this.eventBus = eventBus;
        }
        PaymentService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var newPayment;
                return __generator(this, function (_a) {
                    newPayment = new payment_entity_1.Payment(__assign(__assign({}, input), { state: this.paymentStateMachine.getInitialState() }));
                    return [2 /*return*/, this.connection.getRepository(ctx, payment_entity_1.Payment).save(newPayment)];
                });
            });
        };
        PaymentService_1.prototype.findOneOrThrow = function (ctx_1, id_1) {
            return __awaiter(this, arguments, void 0, function (ctx, id, relations) {
                if (relations === void 0) { relations = ['order']; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, payment_entity_1.Payment, id, {
                                relations: relations,
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @description
         * Transitions a Payment to the given state.
         *
         * When updating a Payment in the context of an Order, it is
         * preferable to use the {@link OrderService} `transitionPaymentToState()` method, which will also handle
         * updating the Order state too.
         */
        PaymentService_1.prototype.transitionToState = function (ctx, paymentId, state) {
            return __awaiter(this, void 0, void 0, function () {
                var payment, fromState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (state === 'Settled') {
                                return [2 /*return*/, this.settlePayment(ctx, paymentId)];
                            }
                            if (state === 'Cancelled') {
                                return [2 /*return*/, this.cancelPayment(ctx, paymentId)];
                            }
                            return [4 /*yield*/, this.findOneOrThrow(ctx, paymentId)];
                        case 1:
                            payment = _a.sent();
                            fromState = payment.state;
                            return [2 /*return*/, this.transitionStateAndSave(ctx, payment, fromState, state)];
                    }
                });
            });
        };
        PaymentService_1.prototype.getNextStates = function (payment) {
            return this.paymentStateMachine.getNextStates(payment);
        };
        /**
         * @description
         * Creates a new Payment.
         *
         * When creating a Payment in the context of an Order, it is
         * preferable to use the {@link OrderService} `addPaymentToOrder()` method, which will also handle
         * updating the Order state too.
         */
        PaymentService_1.prototype.createPayment = function (ctx, order, amount, method, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, paymentMethod, handler, checker, eligible, result, initialState, payment, finalize;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.paymentMethodService.getMethodAndOperations(ctx, method)];
                        case 1:
                            _a = _b.sent(), paymentMethod = _a.paymentMethod, handler = _a.handler, checker = _a.checker;
                            if (!(paymentMethod.checker && checker)) return [3 /*break*/, 3];
                            return [4 /*yield*/, checker.check(ctx, order, paymentMethod.checker.args, paymentMethod)];
                        case 2:
                            eligible = _b.sent();
                            if (eligible === false || typeof eligible === 'string') {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.IneligiblePaymentMethodError({
                                        eligibilityCheckerMessage: typeof eligible === 'string' ? eligible : undefined,
                                    })];
                            }
                            _b.label = 3;
                        case 3: return [4 /*yield*/, handler.createPayment(ctx, order, amount, paymentMethod.handler.args, metadata || {}, paymentMethod)];
                        case 4:
                            result = _b.sent();
                            initialState = 'Created';
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, payment_entity_1.Payment)
                                    .save(new payment_entity_1.Payment(__assign(__assign({}, result), { method: method, state: initialState })))];
                        case 5:
                            payment = _b.sent();
                            return [4 /*yield*/, this.paymentStateMachine.transition(ctx, order, payment, result.state)];
                        case 6:
                            finalize = (_b.sent()).finalize;
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_entity_1.Payment).save(payment, { reload: false })];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('payments')
                                    .of(order)
                                    .add(payment)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_state_transition_event_1.PaymentStateTransitionEvent(initialState, result.state, ctx, payment, order))];
                        case 9:
                            _b.sent();
                            return [4 /*yield*/, finalize()];
                        case 10:
                            _b.sent();
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        /**
         * @description
         * Settles a Payment.
         *
         * When settling a Payment in the context of an Order, it is
         * preferable to use the {@link OrderService} `settlePayment()` method, which will also handle
         * updating the Order state too.
         */
        PaymentService_1.prototype.settlePayment = function (ctx, paymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var payment, _a, paymentMethod, handler, settlePaymentResult, fromState, toState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, payment_entity_1.Payment, paymentId, {
                                relations: ['order'],
                            })];
                        case 1:
                            payment = _b.sent();
                            return [4 /*yield*/, this.paymentMethodService.getMethodAndOperations(ctx, payment.method)];
                        case 2:
                            _a = _b.sent(), paymentMethod = _a.paymentMethod, handler = _a.handler;
                            return [4 /*yield*/, handler.settlePayment(ctx, payment.order, payment, paymentMethod.handler.args, paymentMethod)];
                        case 3:
                            settlePaymentResult = _b.sent();
                            fromState = payment.state;
                            payment.metadata = this.mergePaymentMetadata(payment.metadata, settlePaymentResult.metadata);
                            if (settlePaymentResult.success) {
                                toState = 'Settled';
                            }
                            else {
                                toState = settlePaymentResult.state || 'Error';
                                payment.errorMessage = settlePaymentResult.errorMessage;
                            }
                            return [2 /*return*/, this.transitionStateAndSave(ctx, payment, fromState, toState)];
                    }
                });
            });
        };
        PaymentService_1.prototype.cancelPayment = function (ctx, paymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var payment, _a, paymentMethod, handler, cancelPaymentResult, fromState, toState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, payment_entity_1.Payment, paymentId, {
                                relations: ['order'],
                            })];
                        case 1:
                            payment = _b.sent();
                            return [4 /*yield*/, this.paymentMethodService.getMethodAndOperations(ctx, payment.method)];
                        case 2:
                            _a = _b.sent(), paymentMethod = _a.paymentMethod, handler = _a.handler;
                            return [4 /*yield*/, handler.cancelPayment(ctx, payment.order, payment, paymentMethod.handler.args, paymentMethod)];
                        case 3:
                            cancelPaymentResult = _b.sent();
                            fromState = payment.state;
                            payment.metadata = this.mergePaymentMetadata(payment.metadata, cancelPaymentResult === null || cancelPaymentResult === void 0 ? void 0 : cancelPaymentResult.metadata);
                            if (cancelPaymentResult == null || cancelPaymentResult.success) {
                                toState = 'Cancelled';
                            }
                            else {
                                toState = cancelPaymentResult.state || 'Error';
                                payment.errorMessage = cancelPaymentResult.errorMessage;
                            }
                            return [2 /*return*/, this.transitionStateAndSave(ctx, payment, fromState, toState)];
                    }
                });
            });
        };
        PaymentService_1.prototype.transitionStateAndSave = function (ctx, payment, fromState, toState) {
            return __awaiter(this, void 0, void 0, function () {
                var finalize, result, e_1, transitionError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(fromState === toState)) return [3 /*break*/, 2];
                            // in case metadata was changed
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_entity_1.Payment).save(payment, { reload: false })];
                        case 1:
                            // in case metadata was changed
                            _a.sent();
                            return [2 /*return*/, payment];
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.paymentStateMachine.transition(ctx, payment.order, payment, toState)];
                        case 3:
                            result = _a.sent();
                            finalize = result.finalize;
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            transitionError = ctx.translate(e_1.message, { fromState: fromState, toState: toState });
                            return [2 /*return*/, new generated_graphql_admin_errors_1.PaymentStateTransitionError({ transitionError: transitionError, fromState: fromState, toState: toState })];
                        case 5: return [4 /*yield*/, this.connection.getRepository(ctx, payment_entity_1.Payment).save(payment, { reload: false })];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_state_transition_event_1.PaymentStateTransitionEvent(fromState, toState, ctx, payment, payment.order))];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, finalize()];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a Payment from the manual payment mutation in the Admin API
         *
         * When creating a manual Payment in the context of an Order, it is
         * preferable to use the {@link OrderService} `addManualPaymentToOrder()` method, which will also handle
         * updating the Order state too.
         */
        PaymentService_1.prototype.createManualPayment = function (ctx, order, amount, input) {
            return __awaiter(this, void 0, void 0, function () {
                var initialState, endState, payment, finalize;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            initialState = 'Created';
                            endState = 'Settled';
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_entity_1.Payment).save(new payment_entity_1.Payment({
                                    amount: amount,
                                    order: order,
                                    transactionId: input.transactionId,
                                    metadata: input.metadata,
                                    method: input.method,
                                    state: initialState,
                                }))];
                        case 1:
                            payment = _a.sent();
                            return [4 /*yield*/, this.paymentStateMachine.transition(ctx, order, payment, endState)];
                        case 2:
                            finalize = (_a.sent()).finalize;
                            return [4 /*yield*/, this.connection.getRepository(ctx, payment_entity_1.Payment).save(payment, { reload: false })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('payments')
                                    .of(order)
                                    .add(payment)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new payment_state_transition_event_1.PaymentStateTransitionEvent(initialState, endState, ctx, payment, order))];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, finalize()];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a Refund against the specified Payment. If the amount to be refunded exceeds the value of the
         * specified Payment (in the case of multiple payments on a single Order), then the remaining outstanding
         * refund amount will be refunded against the next available Payment from the Order.
         *
         * When creating a Refund in the context of an Order, it is
         * preferable to use the {@link OrderService} `refundOrder()` method, which performs additional
         * validation.
         */
        PaymentService_1.prototype.createRefund = function (ctx, input, order, selectedPayment) {
            return __awaiter(this, void 0, void 0, function () {
                var orderWithRefunds, paymentToRefund, refundableAmount, refundsCreated, refundablePayments, primaryRefund, refundedPaymentIds, _a, total, orderLinesTotal, refundMax, refundOutstanding, paymentToRefund, amountNotRefunded, constrainedTotal, refund, paymentMethod, handler, methodAndHandler, e_2, createRefundResult, _b, refundLines, _i, _c, _d, orderLineId, quantity, refundLine, finalize, fromState, result, e_3;
                var _this = this;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_entity_1.Order, order.id, {
                                relations: ['payments', 'payments.refunds'],
                            })];
                        case 1:
                            orderWithRefunds = _g.sent();
                            if (input.amount) {
                                paymentToRefund = orderWithRefunds.payments.find(function (p) {
                                    return (0, utils_1.idsAreEqual)(p.id, selectedPayment.id);
                                });
                                if (!paymentToRefund) {
                                    throw new errors_1.InternalServerError('Could not find a Payment to refund');
                                }
                                refundableAmount = paymentToRefund.amount - this.getPaymentRefundTotal(paymentToRefund);
                                if (refundableAmount < input.amount) {
                                    return [2 /*return*/, new generated_graphql_admin_errors_1.RefundAmountError({ maximumRefundable: refundableAmount })];
                                }
                            }
                            refundsCreated = [];
                            refundablePayments = orderWithRefunds.payments.filter(function (p) {
                                return _this.getPaymentRefundTotal(p) < p.amount;
                            });
                            refundedPaymentIds = [];
                            return [4 /*yield*/, this.getRefundAmount(ctx, input)];
                        case 2:
                            _a = _g.sent(), total = _a.total, orderLinesTotal = _a.orderLinesTotal;
                            refundMax = (_f = (_e = orderWithRefunds.payments) === null || _e === void 0 ? void 0 : _e.map(function (p) { return p.amount - _this.getPaymentRefundTotal(p); }).reduce(function (sum, amount) { return sum + amount; }, 0)) !== null && _f !== void 0 ? _f : 0;
                            refundOutstanding = Math.min(total, refundMax);
                            _g.label = 3;
                        case 3:
                            paymentToRefund = (refundedPaymentIds.length === 0 &&
                                refundablePayments.find(function (p) { return (0, utils_1.idsAreEqual)(p.id, selectedPayment.id); })) ||
                                refundablePayments.find(function (p) { return !refundedPaymentIds.includes(p.id); });
                            if (!paymentToRefund) {
                                throw new errors_1.InternalServerError('Could not find a Payment to refund');
                            }
                            amountNotRefunded = paymentToRefund.amount - this.getPaymentRefundTotal(paymentToRefund);
                            constrainedTotal = Math.min(amountNotRefunded, refundOutstanding);
                            refund = new refund_entity_1.Refund({
                                payment: paymentToRefund,
                                total: constrainedTotal,
                                reason: input.reason,
                                method: selectedPayment.method,
                                state: 'Pending',
                                metadata: {},
                                items: orderLinesTotal, // deprecated
                                adjustment: input.adjustment, // deprecated
                                shipping: input.shipping, // deprecated
                            });
                            paymentMethod = void 0;
                            handler = void 0;
                            _g.label = 4;
                        case 4:
                            _g.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.paymentMethodService.getMethodAndOperations(ctx, paymentToRefund.method)];
                        case 5:
                            methodAndHandler = _g.sent();
                            paymentMethod = methodAndHandler.paymentMethod;
                            handler = methodAndHandler.handler;
                            return [3 /*break*/, 7];
                        case 6:
                            e_2 = _g.sent();
                            vendure_logger_1.Logger.warn('Could not find a corresponding PaymentMethodHandler ' +
                                "when creating a refund for the Payment with method \"".concat(paymentToRefund.method, "\""));
                            return [3 /*break*/, 7];
                        case 7:
                            if (!(paymentMethod && handler)) return [3 /*break*/, 9];
                            return [4 /*yield*/, handler.createRefund(ctx, input, constrainedTotal, order, paymentToRefund, paymentMethod.handler.args, paymentMethod)];
                        case 8:
                            _b = _g.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            _b = false;
                            _g.label = 10;
                        case 10:
                            createRefundResult = _b;
                            if (createRefundResult) {
                                refund.transactionId = createRefundResult.transactionId || '';
                                refund.metadata = createRefundResult.metadata || {};
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, refund_entity_1.Refund).save(refund)];
                        case 11:
                            refund = _g.sent();
                            refundLines = [];
                            _i = 0, _c = input.lines || [];
                            _g.label = 12;
                        case 12:
                            if (!(_i < _c.length)) return [3 /*break*/, 15];
                            _d = _c[_i], orderLineId = _d.orderLineId, quantity = _d.quantity;
                            return [4 /*yield*/, this.connection.getRepository(ctx, refund_line_entity_1.RefundLine).save(new refund_line_entity_1.RefundLine({
                                    refund: refund,
                                    orderLineId: orderLineId,
                                    quantity: quantity,
                                }))];
                        case 13:
                            refundLine = _g.sent();
                            refundLines.push(refundLine);
                            _g.label = 14;
                        case 14:
                            _i++;
                            return [3 /*break*/, 12];
                        case 15: return [4 /*yield*/, this.connection
                                .getRepository(ctx, fulfillment_entity_1.Fulfillment)
                                .createQueryBuilder()
                                .relation('lines')
                                .of(refund)
                                .add(refundLines)];
                        case 16:
                            _g.sent();
                            if (!createRefundResult) return [3 /*break*/, 24];
                            finalize = void 0;
                            fromState = refund.state;
                            _g.label = 17;
                        case 17:
                            _g.trys.push([17, 19, , 20]);
                            return [4 /*yield*/, this.refundStateMachine.transition(ctx, order, refund, createRefundResult.state)];
                        case 18:
                            result = _g.sent();
                            finalize = result.finalize;
                            return [3 /*break*/, 20];
                        case 19:
                            e_3 = _g.sent();
                            return [2 /*return*/, new generated_graphql_admin_errors_1.RefundStateTransitionError({
                                    transitionError: e_3.message,
                                    fromState: fromState,
                                    toState: createRefundResult.state,
                                })];
                        case 20: return [4 /*yield*/, this.connection.getRepository(ctx, refund_entity_1.Refund).save(refund, { reload: false })];
                        case 21:
                            _g.sent();
                            return [4 /*yield*/, finalize()];
                        case 22:
                            _g.sent();
                            return [4 /*yield*/, this.eventBus.publish(new refund_state_transition_event_1.RefundStateTransitionEvent(fromState, createRefundResult.state, ctx, refund, order))];
                        case 23:
                            _g.sent();
                            _g.label = 24;
                        case 24:
                            if (primaryRefund == null) {
                                primaryRefund = refund;
                            }
                            refundsCreated.push(refund);
                            refundedPaymentIds.push(paymentToRefund.id);
                            refundOutstanding = total - (0, shared_utils_1.summate)(refundsCreated, 'total');
                            _g.label = 25;
                        case 25:
                            if (0 < refundOutstanding) return [3 /*break*/, 3];
                            _g.label = 26;
                        case 26: 
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        return [2 /*return*/, primaryRefund];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the total amount of all Refunds against the given Payment.
         */
        PaymentService_1.prototype.getPaymentRefundTotal = function (payment) {
            var _a, _b;
            var nonFailedRefunds = (_b = (_a = payment.refunds) === null || _a === void 0 ? void 0 : _a.filter(function (refund) { return refund.state !== 'Failed'; })) !== null && _b !== void 0 ? _b : [];
            return (0, shared_utils_1.summate)(nonFailedRefunds, 'total');
        };
        PaymentService_1.prototype.getRefundAmount = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var refundOrderLinesTotal, inputLines, orderLines, _loop_1, _i, inputLines_1, line, total;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (input.amount) {
                                // This is the new way of getting the refund amount
                                // after v2.2.0. It allows full control over the refund.
                                return [2 /*return*/, { orderLinesTotal: 0, total: input.amount }];
                            }
                            refundOrderLinesTotal = 0;
                            inputLines = input.lines || [];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_line_entity_1.OrderLine)
                                    .find({ where: { id: (0, typeorm_1.In)(inputLines.map(function (l) { return l.orderLineId; })) } })];
                        case 1:
                            orderLines = _c.sent();
                            _loop_1 = function (line) {
                                var orderLine = orderLines.find(function (l) { return (0, utils_1.idsAreEqual)(l.id, line.orderLineId); });
                                if (orderLine && 0 < orderLine.orderPlacedQuantity) {
                                    refundOrderLinesTotal += line.quantity * orderLine.proratedUnitPriceWithTax;
                                }
                            };
                            for (_i = 0, inputLines_1 = inputLines; _i < inputLines_1.length; _i++) {
                                line = inputLines_1[_i];
                                _loop_1(line);
                            }
                            total = refundOrderLinesTotal + ((_a = input.shipping) !== null && _a !== void 0 ? _a : 0) + ((_b = input.adjustment) !== null && _b !== void 0 ? _b : 0);
                            return [2 /*return*/, { orderLinesTotal: refundOrderLinesTotal, total: total }];
                    }
                });
            });
        };
        PaymentService_1.prototype.mergePaymentMetadata = function (m1, m2) {
            if (!m2) {
                return m1;
            }
            var merged = __assign(__assign({}, m1), m2);
            if (m1.public && m1.public) {
                merged.public = __assign(__assign({}, m1.public), m2.public);
            }
            return merged;
        };
        return PaymentService_1;
    }());
    __setFunctionName(_classThis, "PaymentService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentService = _classThis;
}();
exports.PaymentService = PaymentService;
