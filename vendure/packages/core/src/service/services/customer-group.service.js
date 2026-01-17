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
exports.CustomerGroupService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var customer_group_entity_1 = require("../../entity/customer-group/customer-group.entity");
var customer_entity_1 = require("../../entity/customer/customer.entity");
var customer_group_change_event_1 = require("../../event-bus/events/customer-group-change-event");
var customer_group_event_1 = require("../../event-bus/events/customer-group-event");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link CustomerGroup} entities.
 *
 * @docsCategory services
 */
var CustomerGroupService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomerGroupService = _classThis = /** @class */ (function () {
        function CustomerGroupService_1(connection, listQueryBuilder, historyService, eventBus, customFieldRelationService) {
            this.connection = connection;
            this.listQueryBuilder = listQueryBuilder;
            this.historyService = historyService;
            this.eventBus = eventBus;
            this.customFieldRelationService = customFieldRelationService;
        }
        CustomerGroupService_1.prototype.findAll = function (ctx, options, relations) {
            if (relations === void 0) { relations = []; }
            return this.listQueryBuilder
                .build(customer_group_entity_1.CustomerGroup, options, { ctx: ctx, relations: relations })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({ items: items, totalItems: totalItems });
            });
        };
        CustomerGroupService_1.prototype.findOne = function (ctx, customerGroupId, relations) {
            if (relations === void 0) { relations = []; }
            return this.connection
                .getRepository(ctx, customer_group_entity_1.CustomerGroup)
                .findOne({ where: { id: customerGroupId }, relations: relations })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        /**
         * @description
         * Returns a {@link PaginatedList} of all the Customers in the group.
         */
        CustomerGroupService_1.prototype.getGroupCustomers = function (ctx, customerGroupId, options) {
            return this.listQueryBuilder
                .build(customer_entity_1.Customer, options, { ctx: ctx })
                .leftJoin('customer.groups', 'group')
                .leftJoin('customer.channels', 'channel')
                .andWhere('group.id = :groupId', { groupId: customerGroupId })
                .andWhere('customer.deletedAt IS NULL', { groupId: customerGroupId })
                .andWhere('channel.id =:channelId', { channelId: ctx.channelId })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({ items: items, totalItems: totalItems });
            });
        };
        CustomerGroupService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var customerGroup, newCustomerGroup, customers, _i, customers_1, customer, savedCustomerGroup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            customerGroup = new customer_group_entity_1.CustomerGroup(input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_group_entity_1.CustomerGroup).save(customerGroup)];
                        case 1:
                            newCustomerGroup = _a.sent();
                            if (!input.customerIds) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.getCustomersFromIds(ctx, input.customerIds)];
                        case 2:
                            customers = _a.sent();
                            _i = 0, customers_1 = customers;
                            _a.label = 3;
                        case 3:
                            if (!(_i < customers_1.length)) return [3 /*break*/, 6];
                            customer = customers_1[_i];
                            customer.groups = __spreadArray(__spreadArray([], (customer.groups || []), true), [newCustomerGroup], false);
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    ctx: ctx,
                                    customerId: customer.id,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_ADDED_TO_GROUP,
                                    data: {
                                        groupName: customerGroup.name,
                                    },
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customers)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [4 /*yield*/, (0, utils_1.assertFound)(this.findOne(ctx, newCustomerGroup.id))];
                        case 9:
                            savedCustomerGroup = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, customer_group_entity_1.CustomerGroup, input, savedCustomerGroup)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_group_event_1.CustomerGroupEvent(ctx, savedCustomerGroup, 'created', input))];
                        case 11:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, savedCustomerGroup.id))];
                    }
                });
            });
        };
        CustomerGroupService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var customerGroup, updatedCustomerGroup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_group_entity_1.CustomerGroup, input.id)];
                        case 1:
                            customerGroup = _a.sent();
                            updatedCustomerGroup = (0, patch_entity_1.patchEntity)(customerGroup, input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_group_entity_1.CustomerGroup).save(updatedCustomerGroup, { reload: false })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, customer_group_entity_1.CustomerGroup, input, updatedCustomerGroup)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_group_event_1.CustomerGroupEvent(ctx, customerGroup, 'updated', input))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, customerGroup.id))];
                    }
                });
            });
        };
        CustomerGroupService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var group, deletedGroup, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_group_entity_1.CustomerGroup, id)];
                        case 1:
                            group = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            deletedGroup = new customer_group_entity_1.CustomerGroup(group);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_group_entity_1.CustomerGroup).remove(group)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_group_event_1.CustomerGroupEvent(ctx, deletedGroup, 'deleted', id))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                        case 5:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: e_1.message,
                                }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        CustomerGroupService_1.prototype.addCustomersToGroup = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var customers, group, _i, customers_2, customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCustomersFromIds(ctx, input.customerIds)];
                        case 1:
                            customers = _a.sent();
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_group_entity_1.CustomerGroup, input.customerGroupId)];
                        case 2:
                            group = _a.sent();
                            _i = 0, customers_2 = customers;
                            _a.label = 3;
                        case 3:
                            if (!(_i < customers_2.length)) return [3 /*break*/, 6];
                            customer = customers_2[_i];
                            if (!!customer.groups.map(function (g) { return g.id; }).includes(input.customerGroupId)) return [3 /*break*/, 5];
                            customer.groups.push(group);
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    ctx: ctx,
                                    customerId: customer.id,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_ADDED_TO_GROUP,
                                    data: {
                                        groupName: group.name,
                                    },
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customers, { reload: false })];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_group_change_event_1.CustomerGroupChangeEvent(ctx, customers, group, 'assigned'))];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, group.id))];
                    }
                });
            });
        };
        CustomerGroupService_1.prototype.removeCustomersFromGroup = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var customers, group, _i, customers_3, customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCustomersFromIds(ctx, input.customerIds)];
                        case 1:
                            customers = _a.sent();
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_group_entity_1.CustomerGroup, input.customerGroupId)];
                        case 2:
                            group = _a.sent();
                            _i = 0, customers_3 = customers;
                            _a.label = 3;
                        case 3:
                            if (!(_i < customers_3.length)) return [3 /*break*/, 6];
                            customer = customers_3[_i];
                            if (!customer.groups.map(function (g) { return g.id; }).includes(input.customerGroupId)) {
                                throw new errors_1.UserInputError('error.customer-does-not-belong-to-customer-group');
                            }
                            customer.groups = customer.groups.filter(function (g) { return !(0, utils_1.idsAreEqual)(g.id, group.id); });
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    ctx: ctx,
                                    customerId: customer.id,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_REMOVED_FROM_GROUP,
                                    data: {
                                        groupName: group.name,
                                    },
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customers, { reload: false })];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_group_change_event_1.CustomerGroupChangeEvent(ctx, customers, group, 'removed'))];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, group.id))];
                    }
                });
            });
        };
        CustomerGroupService_1.prototype.getCustomersFromIds = function (ctx, ids) {
            if (ids.length === 0) {
                return new Array();
            } // TypeORM throws error when list is empty
            return this.connection
                .getRepository(ctx, customer_entity_1.Customer)
                .createQueryBuilder('customer')
                .leftJoin('customer.channels', 'channel')
                .leftJoinAndSelect('customer.groups', 'group')
                .where('customer.id IN (:...customerIds)', { customerIds: ids })
                .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                .andWhere('customer.deletedAt is null')
                .getMany();
        };
        return CustomerGroupService_1;
    }());
    __setFunctionName(_classThis, "CustomerGroupService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerGroupService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerGroupService = _classThis;
}();
exports.CustomerGroupService = CustomerGroupService;
