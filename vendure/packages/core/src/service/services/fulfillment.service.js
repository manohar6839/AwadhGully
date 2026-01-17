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
exports.FulfillmentService = void 0;
var common_1 = require("@nestjs/common");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var fulfillment_entity_1 = require("../../entity/fulfillment/fulfillment.entity");
var fulfillment_line_entity_1 = require("../../entity/order-line-reference/fulfillment-line.entity");
var order_line_entity_1 = require("../../entity/order-line/order-line.entity");
var order_entity_1 = require("../../entity/order/order.entity");
var fulfillment_event_1 = require("../../event-bus/events/fulfillment-event");
var fulfillment_state_transition_event_1 = require("../../event-bus/events/fulfillment-state-transition-event");
/**
 * @description
 * Contains methods relating to {@link Fulfillment} entities.
 *
 * @docsCategory services
 */
var FulfillmentService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FulfillmentService = _classThis = /** @class */ (function () {
        function FulfillmentService_1(connection, fulfillmentStateMachine, eventBus, configService, customFieldRelationService) {
            this.connection = connection;
            this.fulfillmentStateMachine = fulfillmentStateMachine;
            this.eventBus = eventBus;
            this.configService = configService;
            this.customFieldRelationService = customFieldRelationService;
        }
        /**
         * @description
         * Creates a new Fulfillment for the given Orders and OrderItems, using the specified
         * {@link FulfillmentHandler}.
         */
        FulfillmentService_1.prototype.create = function (ctx, orders, lines, handler) {
            return __awaiter(this, void 0, void 0, function () {
                var fulfillmentHandler, fulfillmentPartial, e_1, message, orderLines, newFulfillment, fulfillmentLines, _i, lines_1, _a, orderLineId, quantity, fulfillmentLine, fulfillmentWithRelations;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fulfillmentHandler = this.configService.shippingOptions.fulfillmentHandlers.find(function (h) { return h.code === handler.code; });
                            if (!fulfillmentHandler) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.InvalidFulfillmentHandlerError()];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, fulfillmentHandler.createFulfillment(ctx, orders, lines, handler.arguments)];
                        case 2:
                            fulfillmentPartial = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _b.sent();
                            message = 'No error message';
                            if ((0, shared_utils_1.isObject)(e_1)) {
                                message = e_1.message || e_1.toString();
                            }
                            return [2 /*return*/, new generated_graphql_admin_errors_1.CreateFulfillmentError({ fulfillmentHandlerError: message })];
                        case 4: return [4 /*yield*/, this.connection
                                .getRepository(ctx, order_line_entity_1.OrderLine)
                                .find({ where: { id: (0, typeorm_1.In)(lines.map(function (l) { return l.orderLineId; })) } })];
                        case 5:
                            orderLines = _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, fulfillment_entity_1.Fulfillment).save(new fulfillment_entity_1.Fulfillment(__assign(__assign({ method: '', trackingCode: '' }, fulfillmentPartial), { lines: [], state: this.fulfillmentStateMachine.getInitialState(), handlerCode: fulfillmentHandler.code })))];
                        case 6:
                            newFulfillment = _b.sent();
                            fulfillmentLines = [];
                            _i = 0, lines_1 = lines;
                            _b.label = 7;
                        case 7:
                            if (!(_i < lines_1.length)) return [3 /*break*/, 10];
                            _a = lines_1[_i], orderLineId = _a.orderLineId, quantity = _a.quantity;
                            return [4 /*yield*/, this.connection.getRepository(ctx, fulfillment_line_entity_1.FulfillmentLine).save(new fulfillment_line_entity_1.FulfillmentLine({
                                    orderLineId: orderLineId,
                                    quantity: quantity,
                                }))];
                        case 8:
                            fulfillmentLine = _b.sent();
                            fulfillmentLines.push(fulfillmentLine);
                            _b.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 7];
                        case 10: return [4 /*yield*/, this.connection
                                .getRepository(ctx, fulfillment_entity_1.Fulfillment)
                                .createQueryBuilder()
                                .relation('lines')
                                .of(newFulfillment)
                                .add(fulfillmentLines)];
                        case 11:
                            _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, fulfillment_entity_1.Fulfillment, fulfillmentPartial, newFulfillment)];
                        case 12:
                            fulfillmentWithRelations = _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new fulfillment_event_1.FulfillmentEvent(ctx, fulfillmentWithRelations, {
                                    orders: orders,
                                    lines: lines,
                                    handler: handler,
                                }))];
                        case 13:
                            _b.sent();
                            return [2 /*return*/, newFulfillment];
                    }
                });
            });
        };
        FulfillmentService_1.prototype.getFulfillmentLines = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .getEntityOrThrow(ctx, fulfillment_entity_1.Fulfillment, id, {
                            relations: ['lines'],
                        })
                            .then(function (fulfillment) { return fulfillment.lines; })];
                });
            });
        };
        FulfillmentService_1.prototype.getFulfillmentsLinesForOrderLine = function (ctx_1, orderLineId_1) {
            return __awaiter(this, arguments, void 0, function (ctx, orderLineId, relations) {
                var defaultRelations;
                if (relations === void 0) { relations = []; }
                return __generator(this, function (_a) {
                    defaultRelations = ['fulfillment'];
                    return [2 /*return*/, this.connection.getRepository(ctx, fulfillment_line_entity_1.FulfillmentLine).find({
                            relations: Array.from(new Set(__spreadArray(__spreadArray([], defaultRelations, true), relations, true))),
                            where: {
                                fulfillment: {
                                    state: (0, typeorm_1.Not)('Cancelled'),
                                },
                                orderLineId: orderLineId,
                            },
                        })];
                });
            });
        };
        /**
         * @description
         * Transitions the specified Fulfillment to a new state and upon successful transition
         * publishes a {@link FulfillmentStateTransitionEvent}.
         */
        FulfillmentService_1.prototype.transitionToState = function (ctx, fulfillmentId, state) {
            return __awaiter(this, void 0, void 0, function () {
                var fulfillment, orderLinesIds, orders, fromState, finalize, result, e_2, transitionError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, fulfillment_entity_1.Fulfillment, fulfillmentId, {
                                relations: ['lines'],
                            })];
                        case 1:
                            fulfillment = _a.sent();
                            orderLinesIds = (0, unique_1.unique)(fulfillment.lines.map(function (lines) { return lines.orderLineId; }));
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder('order')
                                    .leftJoinAndSelect('order.lines', 'line')
                                    .where('line.id IN (:...lineIds)', { lineIds: orderLinesIds })
                                    .getMany()];
                        case 2:
                            orders = _a.sent();
                            fromState = fulfillment.state;
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.fulfillmentStateMachine.transition(ctx, fulfillment, orders, state)];
                        case 4:
                            result = _a.sent();
                            finalize = result.finalize;
                            return [3 /*break*/, 6];
                        case 5:
                            e_2 = _a.sent();
                            transitionError = ctx.translate(e_2.message, { fromState: fromState, toState: state });
                            return [2 /*return*/, new generated_graphql_admin_errors_1.FulfillmentStateTransitionError({ transitionError: transitionError, fromState: fromState, toState: state })];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, fulfillment_entity_1.Fulfillment).save(fulfillment, { reload: false })];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new fulfillment_state_transition_event_1.FulfillmentStateTransitionEvent(fromState, state, ctx, fulfillment))];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, finalize()];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, { fulfillment: fulfillment, orders: orders, fromState: fromState, toState: state }];
                    }
                });
            });
        };
        /**
         * @description
         * Returns an array of the next valid states for the Fulfillment.
         */
        FulfillmentService_1.prototype.getNextStates = function (fulfillment) {
            return this.fulfillmentStateMachine.getNextStates(fulfillment);
        };
        return FulfillmentService_1;
    }());
    __setFunctionName(_classThis, "FulfillmentService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FulfillmentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FulfillmentService = _classThis;
}();
exports.FulfillmentService = FulfillmentService;
