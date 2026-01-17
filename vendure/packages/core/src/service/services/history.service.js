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
exports.HistoryService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var customer_history_entry_entity_1 = require("../../entity/history-entry/customer-history-entry.entity");
var history_entry_entity_1 = require("../../entity/history-entry/history-entry.entity");
var order_history_entry_entity_1 = require("../../entity/history-entry/order-history-entry.entity");
var history_entry_event_1 = require("../../event-bus/events/history-entry-event");
/**
 * @description
 * Contains methods relating to {@link HistoryEntry} entities. Histories are timelines of actions
 * related to a particular Customer or Order, recording significant events such as creation, state changes,
 * notes, etc.
 *
 * ## Custom History Entry Types
 *
 * Since Vendure v1.9.0, it is possible to define custom HistoryEntry types.
 *
 * Let's take an example where we have some Customers who are businesses. We want to verify their
 * tax ID in order to allow them wholesale rates. As part of this verification, we'd like to add
 * an entry into the Customer's history with data about the tax ID verification.
 *
 * First of all we'd extend the GraphQL `HistoryEntryType` enum for our new type as part of a plugin
 *
 * @example
 * ```ts
 * import { PluginCommonModule, VendurePlugin } from '\@vendure/core';
 * import { VerificationService } from './verification.service';
 *
 * \@VendurePlugin({
 *   imports: [PluginCommonModule],
 *   adminApiExtensions: {
 *     schema: gql`
 *       extend enum HistoryEntryType {
 *         CUSTOMER_TAX_ID_VERIFICATION
 *       }
 *     `,
 *   },
 *   providers: [VerificationService],
 * })
 * export class TaxIDVerificationPlugin {}
 * ```
 *
 * Next we need to create a TypeScript type definition file where we extend the `CustomerHistoryEntryData` interface. This is done
 * via TypeScript's [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces)
 * and [ambient modules](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules) features.
 *
 * @example
 * ```ts
 * // types.ts
 * import { CustomerHistoryEntryData } from '\@vendure/core';
 *
 * export const CUSTOMER_TAX_ID_VERIFICATION = 'CUSTOMER_TAX_ID_VERIFICATION';
 *
 * declare module '@vendure/core' {
 *   interface CustomerHistoryEntryData {
 *     [CUSTOMER_TAX_ID_VERIFICATION]: {
 *       taxId: string;
 *       valid: boolean;
 *       name?: string;
 *       address?: string;
 *     };
 *   }
 * }
 * ```
 *
 * Note: it works exactly the same way if we wanted to add a custom type for Order history, except in that case we'd extend the
 * `OrderHistoryEntryData` interface instead.
 *
 * Now that we have our types set up, we can use the HistoryService to add a new HistoryEntry in a type-safe manner:
 *
 * @example
 * ```ts
 * // verification.service.ts
 * import { Injectable } from '\@nestjs/common';
 * import { RequestContext } from '\@vendure/core';
 * import { CUSTOMER_TAX_ID_VERIFICATION } from './types';
 *
 * \@Injectable()
 * export class VerificationService {
 *   constructor(private historyService: HistoryService) {}
 *
 *   async verifyTaxId(ctx: RequestContext, customerId: ID, taxId: string) {
 *     const result = await someTaxIdCheckingService(taxId);
 *
 *     await this.historyService.createHistoryEntryForCustomer({
 *       customerId,
 *       ctx,
 *       type: CUSTOMER_TAX_ID_VERIFICATION,
 *       data: {
 *         taxId,
 *         valid: result.isValid,
 *         name: result.companyName,
 *         address: result.registeredAddress,
 *       },
 *     });
 *   }
 * }
 * ```
 * :::info
 * It is also possible to define a UI component to display custom history entry types. See the
 * [Custom History Timeline Components guide](/guides/extending-the-admin-ui/custom-timeline-components/).
 * :::
 *
 * @docsCategory services
 */
var HistoryService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HistoryService = _classThis = /** @class */ (function () {
        function HistoryService_1(connection, administratorService, listQueryBuilder, eventBus) {
            this.connection = connection;
            this.administratorService = administratorService;
            this.listQueryBuilder = listQueryBuilder;
            this.eventBus = eventBus;
        }
        HistoryService_1.prototype.getHistoryForOrder = function (ctx, orderId, publicOnly, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.listQueryBuilder
                            .build(history_entry_entity_1.HistoryEntry, options, {
                            where: __assign({ order: { id: orderId } }, (publicOnly ? { isPublic: true } : {})),
                            relations: ['administrator'],
                            ctx: ctx,
                        })
                            .getManyAndCount()
                            .then(function (_a) {
                            var items = _a[0], totalItems = _a[1];
                            return ({
                                items: items,
                                totalItems: totalItems,
                            });
                        })];
                });
            });
        };
        HistoryService_1.prototype.createHistoryEntryForOrder = function (args_1) {
            return __awaiter(this, arguments, void 0, function (args, isPublic) {
                var ctx, data, orderId, type, administrator, entry, history;
                if (isPublic === void 0) { isPublic = true; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ctx = args.ctx, data = args.data, orderId = args.orderId, type = args.type;
                            return [4 /*yield*/, this.getAdministratorFromContext(ctx)];
                        case 1:
                            administrator = _a.sent();
                            entry = new order_history_entry_entity_1.OrderHistoryEntry({
                                type: type,
                                isPublic: isPublic,
                                data: data,
                                order: { id: orderId },
                                administrator: administrator,
                            });
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_history_entry_entity_1.OrderHistoryEntry).save(entry)];
                        case 2:
                            history = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new history_entry_event_1.HistoryEntryEvent(ctx, history, 'created', 'order', { type: type, data: data }))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, history];
                    }
                });
            });
        };
        HistoryService_1.prototype.getHistoryForCustomer = function (ctx, customerId, publicOnly, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.listQueryBuilder
                            .build(history_entry_entity_1.HistoryEntry, options, {
                            where: __assign({ customer: { id: customerId } }, (publicOnly ? { isPublic: true } : {})),
                            relations: ['administrator'],
                            ctx: ctx,
                        })
                            .getManyAndCount()
                            .then(function (_a) {
                            var items = _a[0], totalItems = _a[1];
                            return ({
                                items: items,
                                totalItems: totalItems,
                            });
                        })];
                });
            });
        };
        HistoryService_1.prototype.createHistoryEntryForCustomer = function (args_1) {
            return __awaiter(this, arguments, void 0, function (args, isPublic) {
                var ctx, data, customerId, type, administrator, entry, history;
                if (isPublic === void 0) { isPublic = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ctx = args.ctx, data = args.data, customerId = args.customerId, type = args.type;
                            return [4 /*yield*/, this.getAdministratorFromContext(ctx)];
                        case 1:
                            administrator = _a.sent();
                            entry = new customer_history_entry_entity_1.CustomerHistoryEntry({
                                createdAt: new Date(),
                                type: type,
                                isPublic: isPublic,
                                data: data,
                                customer: { id: customerId },
                                administrator: administrator,
                            });
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_history_entry_entity_1.CustomerHistoryEntry).save(entry)];
                        case 2:
                            history = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new history_entry_event_1.HistoryEntryEvent(ctx, history, 'created', 'customer', { type: type, data: data }))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, history];
                    }
                });
            });
        };
        HistoryService_1.prototype.updateOrderHistoryEntry = function (ctx, args) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, administrator, newEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_history_entry_entity_1.OrderHistoryEntry, args.entryId, {
                                where: { type: args.type },
                            })];
                        case 1:
                            entry = _a.sent();
                            if (args.data) {
                                entry.data = args.data;
                            }
                            if (typeof args.isPublic === 'boolean') {
                                entry.isPublic = args.isPublic;
                            }
                            return [4 /*yield*/, this.getAdministratorFromContext(ctx)];
                        case 2:
                            administrator = _a.sent();
                            if (administrator) {
                                entry.administrator = administrator;
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_history_entry_entity_1.OrderHistoryEntry).save(entry)];
                        case 3:
                            newEntry = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new history_entry_event_1.HistoryEntryEvent(ctx, entry, 'updated', 'order', args))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, newEntry];
                    }
                });
            });
        };
        HistoryService_1.prototype.deleteOrderHistoryEntry = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, deletedEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_history_entry_entity_1.OrderHistoryEntry, id)];
                        case 1:
                            entry = _a.sent();
                            deletedEntry = new order_history_entry_entity_1.OrderHistoryEntry(entry);
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_history_entry_entity_1.OrderHistoryEntry).remove(entry)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new history_entry_event_1.HistoryEntryEvent(ctx, deletedEntry, 'deleted', 'order', id))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HistoryService_1.prototype.updateCustomerHistoryEntry = function (ctx, args) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, administrator, newEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_history_entry_entity_1.CustomerHistoryEntry, args.entryId, {
                                where: { type: args.type },
                            })];
                        case 1:
                            entry = _a.sent();
                            if (args.data) {
                                entry.data = args.data;
                            }
                            return [4 /*yield*/, this.getAdministratorFromContext(ctx)];
                        case 2:
                            administrator = _a.sent();
                            if (administrator) {
                                entry.administrator = administrator;
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_history_entry_entity_1.CustomerHistoryEntry).save(entry)];
                        case 3:
                            newEntry = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new history_entry_event_1.HistoryEntryEvent(ctx, entry, 'updated', 'customer', args))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, newEntry];
                    }
                });
            });
        };
        HistoryService_1.prototype.deleteCustomerHistoryEntry = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, deletedEntry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_history_entry_entity_1.CustomerHistoryEntry, id)];
                        case 1:
                            entry = _a.sent();
                            deletedEntry = new customer_history_entry_entity_1.CustomerHistoryEntry(entry);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_history_entry_entity_1.CustomerHistoryEntry).remove(entry)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new history_entry_event_1.HistoryEntryEvent(ctx, deletedEntry, 'deleted', 'customer', id))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HistoryService_1.prototype.getAdministratorFromContext = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var administrator, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!ctx.activeUserId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.administratorService.findOneByUserId(ctx, ctx.activeUserId)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = null;
                            _b.label = 3;
                        case 3:
                            administrator = _a;
                            return [2 /*return*/, administrator !== null && administrator !== void 0 ? administrator : undefined];
                    }
                });
            });
        };
        return HistoryService_1;
    }());
    __setFunctionName(_classThis, "HistoryService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HistoryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HistoryService = _classThis;
}();
exports.HistoryService = HistoryService;
