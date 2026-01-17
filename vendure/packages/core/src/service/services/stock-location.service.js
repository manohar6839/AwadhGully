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
exports.StockLocationService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var stock_level_entity_1 = require("../../entity/stock-level/stock-level.entity");
var stock_location_entity_1 = require("../../entity/stock-location/stock-location.entity");
var index_1 = require("../../event-bus/index");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link StockLocation} entities.
 *
 * @docsCategory services
 */
var StockLocationService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StockLocationService = _classThis = /** @class */ (function () {
        function StockLocationService_1(requestContextService, connection, channelService, roleService, listQueryBuilder, configService, requestContextCache, customFieldRelationService, eventBus) {
            this.requestContextService = requestContextService;
            this.connection = connection;
            this.channelService = channelService;
            this.roleService = roleService;
            this.listQueryBuilder = listQueryBuilder;
            this.configService = configService;
            this.requestContextCache = requestContextCache;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
        }
        StockLocationService_1.prototype.initStockLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureDefaultStockLocationExists()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        StockLocationService_1.prototype.findOne = function (ctx, stockLocationId) {
            return this.connection
                .findOneInChannel(ctx, stock_location_entity_1.StockLocation, stockLocationId, ctx.channelId)
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        StockLocationService_1.prototype.findAll = function (ctx, options, relations) {
            return this.listQueryBuilder
                .build(stock_location_entity_1.StockLocation, options, {
                channelId: ctx.channelId,
                relations: relations,
                ctx: ctx,
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
        StockLocationService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocation;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).save(new stock_location_entity_1.StockLocation({
                                name: input.name,
                                description: (_a = input.description) !== null && _a !== void 0 ? _a : '',
                                customFields: (_b = input.customFields) !== null && _b !== void 0 ? _b : {},
                            }))];
                        case 1:
                            stockLocation = _c.sent();
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(stockLocation, ctx)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).save(stockLocation)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new index_1.StockLocationEvent(ctx, stockLocation, 'created', input))];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, stockLocation];
                    }
                });
            });
        };
        StockLocationService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocation, updatedStockLocation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, stock_location_entity_1.StockLocation, input.id)];
                        case 1:
                            stockLocation = _a.sent();
                            updatedStockLocation = (0, patch_entity_1.patchEntity)(stockLocation, input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).save(updatedStockLocation)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, stock_location_entity_1.StockLocation, input, updatedStockLocation)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new index_1.StockLocationEvent(ctx, updatedStockLocation, 'updated', input))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, updatedStockLocation.id))];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes a StockLocation. If `transferToLocationId` is specified in the input, all stock levels
         * from the deleted location will be transferred to the target location. The last StockLocation
         * cannot be deleted.
         */
        StockLocationService_1.prototype.delete = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocation, allStockLocations, stockLevelsToTransfer, _i, stockLevelsToTransfer_1, stockLevel, existingStockLevel, newStockLevel, deletedStockLocation, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findOneInChannel(ctx, stock_location_entity_1.StockLocation, input.id, ctx.channelId)];
                        case 1:
                            stockLocation = _a.sent();
                            if (!stockLocation) {
                                throw new errors_1.EntityNotFoundError('StockLocation', input.id);
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).find()];
                        case 2:
                            allStockLocations = _a.sent();
                            if (allStockLocations.length === 1) {
                                return [2 /*return*/, {
                                        result: generated_types_1.DeletionResult.NOT_DELETED,
                                        message: ctx.translate('message.cannot-delete-last-stock-location'),
                                    }];
                            }
                            if (!input.transferToLocationId) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, stock_level_entity_1.StockLevel)
                                    .find({ where: { stockLocationId: stockLocation.id } })];
                        case 3:
                            stockLevelsToTransfer = _a.sent();
                            _i = 0, stockLevelsToTransfer_1 = stockLevelsToTransfer;
                            _a.label = 4;
                        case 4:
                            if (!(_i < stockLevelsToTransfer_1.length)) return [3 /*break*/, 12];
                            stockLevel = stockLevelsToTransfer_1[_i];
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_level_entity_1.StockLevel).findOne({
                                    where: {
                                        stockLocationId: input.transferToLocationId,
                                        productVariantId: stockLevel.productVariantId,
                                    },
                                })];
                        case 5:
                            existingStockLevel = _a.sent();
                            if (!existingStockLevel) return [3 /*break*/, 7];
                            existingStockLevel.stockOnHand += stockLevel.stockOnHand;
                            existingStockLevel.stockAllocated += stockLevel.stockAllocated;
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_level_entity_1.StockLevel).save(existingStockLevel)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            newStockLevel = new stock_level_entity_1.StockLevel({
                                productVariantId: stockLevel.productVariantId,
                                stockLocationId: input.transferToLocationId,
                                stockOnHand: stockLevel.stockOnHand,
                                stockAllocated: stockLevel.stockAllocated,
                            });
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_level_entity_1.StockLevel).save(newStockLevel)];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [4 /*yield*/, this.connection.getRepository(ctx, stock_level_entity_1.StockLevel).remove(stockLevel)];
                        case 10:
                            _a.sent();
                            _a.label = 11;
                        case 11:
                            _i++;
                            return [3 /*break*/, 4];
                        case 12:
                            _a.trys.push([12, 15, , 16]);
                            deletedStockLocation = new stock_location_entity_1.StockLocation(stockLocation);
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).remove(stockLocation)];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new index_1.StockLocationEvent(ctx, deletedStockLocation, 'deleted', input.id))];
                        case 14:
                            _a.sent();
                            return [3 /*break*/, 16];
                        case 15:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: e_1.message,
                                }];
                        case 16: return [2 /*return*/, {
                                result: generated_types_1.DeletionResult.DELETED,
                            }];
                    }
                });
            });
        };
        /**
         * @description
         * Assigns multiple StockLocations to the specified Channel. Requires the `UpdateStockLocation`
         * permission on the target channel.
         */
        StockLocationService_1.prototype.assignStockLocationsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, _i, _a, stockLocationId, stockLocation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.UpdateStockLocation,
                            ])];
                        case 1:
                            hasPermission = _b.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            _i = 0, _a = input.stockLocationIds;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            stockLocationId = _a[_i];
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, stock_location_entity_1.StockLocation, stockLocationId, ctx.channelId)];
                        case 3:
                            stockLocation = _b.sent();
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, stock_location_entity_1.StockLocation, stockLocationId, [
                                    input.channelId,
                                ])];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/, this.connection.findByIdsInChannel(ctx, stock_location_entity_1.StockLocation, input.stockLocationIds, ctx.channelId, {})];
                    }
                });
            });
        };
        /**
         * @description
         * Removes multiple StockLocations from the specified Channel. Requires the `DeleteStockLocation`
         * permission on the target channel. StockLocations cannot be removed from the default channel.
         */
        StockLocationService_1.prototype.removeStockLocationsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, defaultChannel, _i, _a, stockLocationId, stockLocation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.DeleteStockLocation,
                            ])];
                        case 1:
                            hasPermission = _b.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 2:
                            defaultChannel = _b.sent();
                            if ((0, utils_1.idsAreEqual)(input.channelId, defaultChannel.id)) {
                                throw new errors_1.UserInputError('error.items-cannot-be-removed-from-default-channel');
                            }
                            _i = 0, _a = input.stockLocationIds;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            stockLocationId = _a[_i];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, stock_location_entity_1.StockLocation, stockLocationId)];
                        case 4:
                            stockLocation = _b.sent();
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, stock_location_entity_1.StockLocation, stockLocationId, [
                                    input.channelId,
                                ])];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7: return [2 /*return*/, this.connection.findByIdsInChannel(ctx, stock_location_entity_1.StockLocation, input.stockLocationIds, ctx.channelId, {})];
                    }
                });
            });
        };
        StockLocationService_1.prototype.getAllStockLocations = function (ctx) {
            var _this = this;
            return this.requestContextCache.get(ctx, 'StockLocationService.getAllStockLocations', function () {
                return _this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).find();
            });
        };
        StockLocationService_1.prototype.defaultStockLocation = function (ctx) {
            return this.connection
                .getRepository(ctx, stock_location_entity_1.StockLocation)
                .find({ order: { createdAt: 'ASC' } })
                .then(function (items) { return items[0]; });
        };
        /**
         * @description
         * Returns the locations and quantities to use for allocating stock when an OrderLine is created.
         * This uses the configured {@link StockLocationStrategy}.
         */
        StockLocationService_1.prototype.getAllocationLocations = function (ctx, orderLine, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocationStrategy, stockLocations, allocationLocations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stockLocationStrategy = this.configService.catalogOptions.stockLocationStrategy;
                            return [4 /*yield*/, this.getAllStockLocations(ctx)];
                        case 1:
                            stockLocations = _a.sent();
                            return [4 /*yield*/, stockLocationStrategy.forAllocation(ctx, stockLocations, orderLine, quantity)];
                        case 2:
                            allocationLocations = _a.sent();
                            return [2 /*return*/, allocationLocations];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the locations and quantities to use for releasing allocated stock when an OrderLine is cancelled
         * or modified. This uses the configured {@link StockLocationStrategy}.
         */
        StockLocationService_1.prototype.getReleaseLocations = function (ctx, orderLine, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocationStrategy, stockLocations, releaseLocations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stockLocationStrategy = this.configService.catalogOptions.stockLocationStrategy;
                            return [4 /*yield*/, this.getAllStockLocations(ctx)];
                        case 1:
                            stockLocations = _a.sent();
                            return [4 /*yield*/, stockLocationStrategy.forRelease(ctx, stockLocations, orderLine, quantity)];
                        case 2:
                            releaseLocations = _a.sent();
                            return [2 /*return*/, releaseLocations];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the locations and quantities to use for creating sales when an Order is fulfilled.
         * This uses the configured {@link StockLocationStrategy}.
         */
        StockLocationService_1.prototype.getSaleLocations = function (ctx, orderLine, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocationStrategy, stockLocations, saleLocations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stockLocationStrategy = this.configService.catalogOptions.stockLocationStrategy;
                            return [4 /*yield*/, this.getAllStockLocations(ctx)];
                        case 1:
                            stockLocations = _a.sent();
                            return [4 /*yield*/, stockLocationStrategy.forSale(ctx, stockLocations, orderLine, quantity)];
                        case 2:
                            saleLocations = _a.sent();
                            return [2 /*return*/, saleLocations];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the locations and quantities to use for cancelling sales when an OrderLine is cancelled
         * after fulfillment. This uses the configured {@link StockLocationStrategy}.
         */
        StockLocationService_1.prototype.getCancellationLocations = function (ctx, orderLine, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var stockLocationStrategy, stockLocations, cancellationLocations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stockLocationStrategy = this.configService.catalogOptions.stockLocationStrategy;
                            return [4 /*yield*/, this.getAllStockLocations(ctx)];
                        case 1:
                            stockLocations = _a.sent();
                            return [4 /*yield*/, stockLocationStrategy.forCancellation(ctx, stockLocations, orderLine, quantity)];
                        case 2:
                            cancellationLocations = _a.sent();
                            return [2 /*return*/, cancellationLocations];
                    }
                });
            });
        };
        StockLocationService_1.prototype.ensureDefaultStockLocationExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, stockLocations, defaultStockLocation, defaultChannel, _i, stockLocations_1, stockLocation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requestContextService.create({
                                apiType: 'admin',
                            })];
                        case 1:
                            ctx = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).find({
                                    relations: {
                                        channels: true,
                                    },
                                })];
                        case 2:
                            stockLocations = _a.sent();
                            if (!(stockLocations.length === 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).save(new stock_location_entity_1.StockLocation({
                                    name: 'Default Stock Location',
                                    description: 'The default stock location',
                                }))];
                        case 3:
                            defaultStockLocation = _a.sent();
                            defaultStockLocation.channels = [];
                            stockLocations.push(defaultStockLocation);
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_location_entity_1.StockLocation).save(defaultStockLocation)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, this.channelService.getDefaultChannel()];
                        case 6:
                            defaultChannel = _a.sent();
                            _i = 0, stockLocations_1 = stockLocations;
                            _a.label = 7;
                        case 7:
                            if (!(_i < stockLocations_1.length)) return [3 /*break*/, 10];
                            stockLocation = stockLocations_1[_i];
                            if (!!stockLocation.channels.find(function (c) { return c.id === defaultChannel.id; })) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, stock_location_entity_1.StockLocation, stockLocation.id, [
                                    defaultChannel.id,
                                ])];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 7];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        return StockLocationService_1;
    }());
    __setFunctionName(_classThis, "StockLocationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StockLocationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StockLocationService = _classThis;
}();
exports.StockLocationService = StockLocationService;
