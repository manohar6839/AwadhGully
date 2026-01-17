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
exports.TaxRateService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var request_context_1 = require("../../api/common/request-context");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var self_refreshing_cache_1 = require("../../common/self-refreshing-cache");
var utils_1 = require("../../common/utils");
var customer_group_entity_1 = require("../../entity/customer-group/customer-group.entity");
var tax_category_entity_1 = require("../../entity/tax-category/tax-category.entity");
var tax_rate_entity_1 = require("../../entity/tax-rate/tax-rate.entity");
var zone_entity_1 = require("../../entity/zone/zone.entity");
var tax_rate_event_1 = require("../../event-bus/events/tax-rate-event");
var tax_rate_modification_event_1 = require("../../event-bus/events/tax-rate-modification-event");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link TaxRate} entities.
 *
 * @docsCategory services
 */
var TaxRateService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TaxRateService = _classThis = /** @class */ (function () {
        function TaxRateService_1(connection, eventBus, listQueryBuilder, configService, customFieldRelationService) {
            this.connection = connection;
            this.eventBus = eventBus;
            this.listQueryBuilder = listQueryBuilder;
            this.configService = configService;
            this.customFieldRelationService = customFieldRelationService;
            this.defaultTaxRate = new tax_rate_entity_1.TaxRate({
                value: 0,
                enabled: true,
                name: 'No configured tax rate',
                id: '0',
            });
        }
        /**
         * When the app is bootstrapped, ensure the tax rate cache gets created
         * @internal
         */
        TaxRateService_1.prototype.initTaxRates = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureCacheExists()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TaxRateService_1.prototype.findAll = function (ctx, options, relations) {
            var effectiveRelations = relations || ['customerGroup'];
            var customPropertyMap = {};
            var hasZoneIdFilter = this.listQueryBuilder.filterObjectHasProperty(options === null || options === void 0 ? void 0 : options.filter, 'zoneId');
            var hasCategoryIdFilter = this.listQueryBuilder.filterObjectHasProperty(options === null || options === void 0 ? void 0 : options.filter, 'categoryId');
            if (hasZoneIdFilter) {
                effectiveRelations.push('zone');
                customPropertyMap.zoneId = 'zone.id';
            }
            if (hasCategoryIdFilter) {
                effectiveRelations.push('category');
                customPropertyMap.zoneId = 'category.id';
            }
            return this.listQueryBuilder
                .build(tax_rate_entity_1.TaxRate, options, {
                relations: effectiveRelations,
                ctx: ctx,
                customPropertyMap: customPropertyMap,
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items,
                    totalItems: totalItems,
                });
            });
        };
        TaxRateService_1.prototype.findOne = function (ctx, taxRateId, relations) {
            return this.connection
                .getRepository(ctx, tax_rate_entity_1.TaxRate)
                .findOne({
                where: { id: taxRateId },
                relations: relations !== null && relations !== void 0 ? relations : ['category', 'zone', 'customerGroup'],
            })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        TaxRateService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var taxRate, _a, _b, _c, newTaxRate;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            taxRate = new tax_rate_entity_1.TaxRate(input);
                            _a = taxRate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, tax_category_entity_1.TaxCategory, input.categoryId)];
                        case 1:
                            _a.category = _d.sent();
                            _b = taxRate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.zoneId)];
                        case 2:
                            _b.zone = _d.sent();
                            if (!input.customerGroupId) return [3 /*break*/, 4];
                            _c = taxRate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_group_entity_1.CustomerGroup, input.customerGroupId)];
                        case 3:
                            _c.customerGroup = _d.sent();
                            _d.label = 4;
                        case 4: return [4 /*yield*/, this.connection.getRepository(ctx, tax_rate_entity_1.TaxRate).save(taxRate)];
                        case 5:
                            newTaxRate = _d.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, tax_rate_entity_1.TaxRate, input, newTaxRate)];
                        case 6:
                            _d.sent();
                            return [4 /*yield*/, this.updateActiveTaxRates(ctx)];
                        case 7:
                            _d.sent();
                            return [4 /*yield*/, this.eventBus.publish(new tax_rate_modification_event_1.TaxRateModificationEvent(ctx, newTaxRate))];
                        case 8:
                            _d.sent();
                            return [4 /*yield*/, this.eventBus.publish(new tax_rate_event_1.TaxRateEvent(ctx, newTaxRate, 'created', input))];
                        case 9:
                            _d.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, newTaxRate.id))];
                    }
                });
            });
        };
        TaxRateService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var taxRate, updatedTaxRate, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, input.id)];
                        case 1:
                            taxRate = _d.sent();
                            if (!taxRate) {
                                throw new errors_1.EntityNotFoundError('TaxRate', input.id);
                            }
                            updatedTaxRate = (0, patch_entity_1.patchEntity)(taxRate, input);
                            if (!input.categoryId) return [3 /*break*/, 3];
                            _a = updatedTaxRate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, tax_category_entity_1.TaxCategory, input.categoryId)];
                        case 2:
                            _a.category = _d.sent();
                            _d.label = 3;
                        case 3:
                            if (!input.zoneId) return [3 /*break*/, 5];
                            _b = updatedTaxRate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.zoneId)];
                        case 4:
                            _b.zone = _d.sent();
                            _d.label = 5;
                        case 5:
                            if (!input.customerGroupId) return [3 /*break*/, 7];
                            _c = updatedTaxRate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_group_entity_1.CustomerGroup, input.customerGroupId)];
                        case 6:
                            _c.customerGroup = _d.sent();
                            _d.label = 7;
                        case 7: return [4 /*yield*/, this.connection.getRepository(ctx, tax_rate_entity_1.TaxRate).save(updatedTaxRate, { reload: false })];
                        case 8:
                            _d.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, tax_rate_entity_1.TaxRate, input, updatedTaxRate)];
                        case 9:
                            _d.sent();
                            return [4 /*yield*/, this.updateActiveTaxRates(ctx)];
                        case 10:
                            _d.sent();
                            // Commit the transaction so that the worker process can access the updated
                            // TaxRate when updating its own tax rate cache.
                            return [4 /*yield*/, this.connection.commitOpenTransaction(ctx)];
                        case 11:
                            // Commit the transaction so that the worker process can access the updated
                            // TaxRate when updating its own tax rate cache.
                            _d.sent();
                            return [4 /*yield*/, this.eventBus.publish(new tax_rate_modification_event_1.TaxRateModificationEvent(ctx, updatedTaxRate))];
                        case 12:
                            _d.sent();
                            return [4 /*yield*/, this.eventBus.publish(new tax_rate_event_1.TaxRateEvent(ctx, updatedTaxRate, 'updated', input))];
                        case 13:
                            _d.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, taxRate.id))];
                    }
                });
            });
        };
        TaxRateService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var taxRate, deletedTaxRate, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, tax_rate_entity_1.TaxRate, id)];
                        case 1:
                            taxRate = _a.sent();
                            deletedTaxRate = new tax_rate_entity_1.TaxRate(taxRate);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, this.connection.getRepository(ctx, tax_rate_entity_1.TaxRate).remove(taxRate)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new tax_rate_event_1.TaxRateEvent(ctx, deletedTaxRate, 'deleted', id))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                        case 5:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: e_1.toString(),
                                }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the applicable TaxRate based on the specified Zone and TaxCategory. Used when calculating Order
         * prices.
         */
        TaxRateService_1.prototype.getApplicableTaxRate = function (ctx, zone, taxCategory) {
            return __awaiter(this, void 0, void 0, function () {
                var rate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getActiveTaxRates(ctx)];
                        case 1:
                            rate = (_a.sent()).find(function (r) { return r.test(zone, taxCategory); });
                            return [2 /*return*/, rate || this.defaultTaxRate];
                    }
                });
            });
        };
        TaxRateService_1.prototype.getActiveTaxRates = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.activeTaxRates.value(ctx)];
                });
            });
        };
        TaxRateService_1.prototype.updateActiveTaxRates = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.activeTaxRates.refresh(ctx)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TaxRateService_1.prototype.findActiveTaxRates = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, tax_rate_entity_1.TaxRate).find({
                                relations: ['category', 'zone', 'customerGroup'],
                                where: {
                                    enabled: true,
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Ensures taxRate cache exists. If not, this method creates one.
         */
        TaxRateService_1.prototype.ensureCacheExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.activeTaxRates) {
                                return [2 /*return*/];
                            }
                            _a = this;
                            return [4 /*yield*/, (0, self_refreshing_cache_1.createSelfRefreshingCache)({
                                    name: 'TaxRateService.activeTaxRates',
                                    ttl: this.configService.entityOptions.taxRateCacheTtl,
                                    refresh: { fn: function (ctx) { return _this.findActiveTaxRates(ctx); }, defaultArgs: [request_context_1.RequestContext.empty()] },
                                })];
                        case 1:
                            _a.activeTaxRates = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return TaxRateService_1;
    }());
    __setFunctionName(_classThis, "TaxRateService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TaxRateService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TaxRateService = _classThis;
}();
exports.TaxRateService = TaxRateService;
