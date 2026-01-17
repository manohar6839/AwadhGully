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
exports.EventBus = void 0;
var common_1 = require("@nestjs/common");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var request_context_1 = require("../api/common/request-context");
var constants_1 = require("../common/constants");
var instrument_decorator_1 = require("../common/instrument-decorator");
var vendure_logger_1 = require("../config/logger/vendure-logger");
var transaction_subscriber_1 = require("../connection/transaction-subscriber");
/**
 * @description
 * The EventBus is used to globally publish events which can then be subscribed to.
 *
 * Events are published whenever certain actions take place within the Vendure server, for example:
 *
 * * when a Product is updated ({@link ProductEvent})
 * * when an Order transitions state ({@link OrderStateTransitionEvent})
 * * when a Customer registers a new account ({@link AccountRegistrationEvent})
 *
 * Using the EventBus it is possible to subscribe to an take action when these events occur.
 * This is done with the `.ofType()` method, which takes an event type and returns an rxjs observable
 * stream of events:
 *
 * @example
 * ```ts
 * import { OnApplicationBootstrap } from '\@nestjs/common';
 * import { EventBus, PluginCommonModule, VendurePlugin } from '\@vendure/core';
 * import { filter } from 'rxjs/operators';
 *
 * \@VendurePlugin({
 *     imports: [PluginCommonModule]
 * })
 * export class MyPlugin implements OnApplicationBootstrap {
 *
 *   constructor(private eventBus: EventBus) {}
 *
 *   async onApplicationBootstrap() {
 *
 *     this.eventBus
 *       .ofType(OrderStateTransitionEvent)
 *       .pipe(
 *         filter(event => event.toState === 'PaymentSettled'),
 *       )
 *       .subscribe((event) => {
 *         // do some action when this event fires
 *       });
 *   }
 * }
 * ```
 *
 * @docsCategory events
 * */
var EventBus = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EventBus = _classThis = /** @class */ (function () {
        function EventBus_1(transactionSubscriber) {
            this.transactionSubscriber = transactionSubscriber;
            this.eventStream = new rxjs_1.Subject();
            this.destroy$ = new rxjs_1.Subject();
            this.blockingEventHandlers = new Map();
        }
        /**
         * @description
         * Publish an event which any subscribers can react to.
         *
         * @example
         * ```ts
         * await eventBus.publish(new SomeEvent());
         * ```
         */
        EventBus_1.prototype.publish = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.eventStream.next(event);
                            return [4 /*yield*/, this.executeBlockingEventHandlers(event)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Returns an RxJS Observable stream of events of the given type.
         * If the event contains a {@link RequestContext} object, the subscriber
         * will only get called after any active database transactions are complete.
         *
         * This means that the subscriber function can safely access all updated
         * data related to the event.
         */
        EventBus_1.prototype.ofType = function (type) {
            var _this = this;
            return this.eventStream.asObservable().pipe((0, operators_1.takeUntil)(this.destroy$), (0, operators_1.filter)(function (e) { return e.constructor === type; }), (0, operators_1.mergeMap)(function (event) { return _this.awaitActiveTransactions(event); }), (0, operators_1.filter)(shared_utils_1.notNullOrUndefined));
        };
        /**
         * @description
         * Returns an RxJS Observable stream of events filtered by a custom predicate.
         * If the event contains a {@link RequestContext} object, the subscriber
         * will only get called after any active database transactions are complete.
         *
         * This means that the subscriber function can safely access all updated
         * data related to the event.
         */
        EventBus_1.prototype.filter = function (predicate) {
            var _this = this;
            return this.eventStream.asObservable().pipe((0, operators_1.takeUntil)(this.destroy$), (0, operators_1.filter)(function (e) { return predicate(e); }), (0, operators_1.mergeMap)(function (event) { return _this.awaitActiveTransactions(event); }), (0, operators_1.filter)(shared_utils_1.notNullOrUndefined));
        };
        /**
         * @description
         * Register an event handler function which will be executed when an event of the given type is published,
         * and will block execution of the code which published the event until the handler has completed.
         *
         * This is useful when you need assurance that the event handler has successfully completed, and you want
         * the triggering code to fail if the handler fails.
         *
         * ::: warning
         * This API should be used with caution, as errors or performance issues in the handler can cause the
         * associated operation to be slow or fail entirely. For this reason, any handler which takes longer than
         * 100ms to execute will log a warning. Any non-trivial task to be performed in a blocking event handler
         * should be offloaded to a background job using the {@link JobQueueService}.
         *
         * Also, be aware that the handler will be executed in the _same database transaction_ as the code which published
         * the event (as long as you pass the `ctx` object from the event to any TransactionalConnection calls).
         * :::
         *
         * @example
         * ```ts
         * eventBus.registerBlockingEventHandler({
         *   event: OrderStateTransitionEvent,
         *   id: 'my-order-state-transition-handler',
         *   handler: async (event) => {
         *     // perform some synchronous task
         *   }
         * });
         * ```
         *
         * @since 2.2.0
         */
        EventBus_1.prototype.registerBlockingEventHandler = function (handlerOptions) {
            var events = Array.isArray(handlerOptions.event) ? handlerOptions.event : [handlerOptions.event];
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_1 = events_1[_i];
                var handlers = this.blockingEventHandlers.get(event_1);
                var handlerWithIdAlreadyExists = handlers === null || handlers === void 0 ? void 0 : handlers.some(function (h) { return h.id === handlerOptions.id; });
                if (handlerWithIdAlreadyExists) {
                    throw new Error("A handler with the id \"".concat(handlerOptions.id, "\" is already registered for the event ").concat(event_1.name));
                }
                if (handlers) {
                    handlers.push(handlerOptions);
                }
                else {
                    handlers = [handlerOptions];
                }
                var orderedHandlers = this.orderEventHandlers(handlers);
                this.blockingEventHandlers.set(event_1, orderedHandlers);
            }
        };
        /** @internal */
        EventBus_1.prototype.onModuleDestroy = function () {
            this.destroy$.next();
        };
        EventBus_1.prototype.executeBlockingEventHandlers = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var blockingHandlers, _i, _a, options, timeStart, timeEnd, timeTaken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            blockingHandlers = this.blockingEventHandlers.get(event.constructor);
                            _i = 0, _a = blockingHandlers || [];
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            options = _a[_i];
                            timeStart = new Date().getTime();
                            return [4 /*yield*/, options.handler(event)];
                        case 2:
                            _b.sent();
                            timeEnd = new Date().getTime();
                            timeTaken = timeEnd - timeStart;
                            vendure_logger_1.Logger.debug("Blocking event handler ".concat(options.id, " took ").concat(timeTaken, "ms"));
                            if (timeTaken > 100) {
                                vendure_logger_1.Logger.warn([
                                    "Blocking event handler ".concat(options.id, " took ").concat(timeTaken, "ms"),
                                    "Consider optimizing the handler by moving the logic to a background job or using a more efficient algorithm.",
                                ].join('\n'));
                            }
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        EventBus_1.prototype.orderEventHandlers = function (handlers) {
            var orderedHandlers = [];
            var handlerMap = new Map();
            // Create a map of handlers by ID for efficient lookup
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var handler = handlers_1[_i];
                handlerMap.set(handler.id, handler);
            }
            // Helper function to recursively add handlers in correct order
            var addHandler = function (handler) {
                // If the handler is already in the ordered list, skip it
                if (orderedHandlers.includes(handler)) {
                    return;
                }
                // If an "after" handler is specified, add it recursively
                if (handler.after) {
                    var afterHandler_1 = handlerMap.get(handler.after);
                    if (afterHandler_1) {
                        if (afterHandler_1.after === handler.id) {
                            throw new Error("Circular dependency detected between event handlers ".concat(handler.id, " and ").concat(afterHandler_1.id));
                        }
                        orderedHandlers = orderedHandlers.filter(function (h) { return h.id !== afterHandler_1.id; });
                        addHandler(afterHandler_1);
                    }
                }
                // Add the current handler
                orderedHandlers.push(handler);
                // If a "before" handler is specified, add it recursively
                if (handler.before) {
                    var beforeHandler_1 = handlerMap.get(handler.before);
                    if (beforeHandler_1) {
                        if (beforeHandler_1.before === handler.id) {
                            throw new Error("Circular dependency detected between event handlers ".concat(handler.id, " and ").concat(beforeHandler_1.id));
                        }
                        orderedHandlers = orderedHandlers.filter(function (h) { return h.id !== beforeHandler_1.id; });
                        addHandler(beforeHandler_1);
                    }
                }
            };
            // Start adding handlers from the original list
            for (var _a = 0, handlers_2 = handlers; _a < handlers_2.length; _a++) {
                var handler = handlers_2[_a];
                addHandler(handler);
            }
            return orderedHandlers;
        };
        /**
         * If the Event includes a RequestContext property, we need to check for any active transaction
         * associated with it, and if there is one, we await that transaction to either commit or rollback
         * before publishing the event.
         *
         * The reason for this is that if the transaction is still active when event subscribers execute,
         * this can cause a couple of issues:
         *
         * 1. If the transaction hasn't completed by the time the subscriber runs, the new data inside
         *  the transaction will not be available to the subscriber.
         * 2. If the subscriber gets a reference to the EntityManager which has an active transaction,
         *   and then the transaction completes, and then the subscriber attempts a DB operation using that
         *   EntityManager, a fatal QueryRunnerAlreadyReleasedError will be thrown.
         *
         * For more context on these two issues, see:
         *
         * * https://github.com/vendurehq/vendure/issues/520
         * * https://github.com/vendurehq/vendure/issues/1107
         */
        EventBus_1.prototype.awaitActiveTransactions = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, key, ctx, transactionManager, newContext, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entry = Object.entries(event).find(function (_a) {
                                var _ = _a[0], value = _a[1];
                                return value instanceof request_context_1.RequestContext;
                            });
                            if (!entry) {
                                return [2 /*return*/, event];
                            }
                            key = entry[0], ctx = entry[1];
                            transactionManager = ctx[constants_1.TRANSACTION_MANAGER_KEY];
                            if (!(transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner)) {
                                return [2 /*return*/, event];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.transactionSubscriber.awaitCommit(transactionManager.queryRunner)];
                        case 2:
                            _a.sent();
                            newContext = ctx.copy();
                            delete newContext[constants_1.TRANSACTION_MANAGER_KEY];
                            // Reassign new context
                            event[key] = newContext;
                            return [2 /*return*/, event];
                        case 3:
                            e_1 = _a.sent();
                            if (e_1 instanceof transaction_subscriber_1.TransactionSubscriberError) {
                                // Expected commit, but rollback or something else happened.
                                // This is still reliable behavior, return undefined
                                // as event should not be exposed from this transaction
                                return [2 /*return*/];
                            }
                            throw e_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return EventBus_1;
    }());
    __setFunctionName(_classThis, "EventBus");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventBus = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventBus = _classThis;
}();
exports.EventBus = EventBus;
