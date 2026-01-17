"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MultiChannelStockLocationStrategy = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var ms_1 = require("ms");
var operators_1 = require("rxjs/operators");
var index_1 = require("../../cache/index");
var index_2 = require("../../entity/index");
var stock_level_entity_1 = require("../../entity/stock-level/stock-level.entity");
var stock_location_entity_1 = require("../../entity/stock-location/stock-location.entity");
var index_3 = require("../../event-bus/index");
var default_stock_location_strategy_1 = require("./default-stock-location-strategy");
/**
 * @description
 * The MultiChannelStockLocationStrategy is an implementation of the {@link StockLocationStrategy}.
 * which is suitable for both single- and multichannel setups. It takes into account the active
 * channel when determining stock levels, and also ensures that allocations are made only against
 * stock locations which are associated with the active channel.
 *
 * This strategy became the default in Vendure 3.1.0. If you want to use the previous strategy which
 * does not take channels into account, update your VendureConfig to use to {@link DefaultStockLocationStrategy}.
 *
 * @docsCategory products & stock
 * @since 3.1.0
 */
var MultiChannelStockLocationStrategy = /** @class */ (function (_super) {
    __extends(MultiChannelStockLocationStrategy, _super);
    function MultiChannelStockLocationStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @internal */
    MultiChannelStockLocationStrategy.prototype.init = function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var GlobalSettingsService;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.init.call(this, injector);
                        this.eventBus = injector.get(index_3.EventBus);
                        this.cacheService = injector.get(index_1.CacheService);
                        this.requestContextCache = injector.get(index_1.RequestContextCacheService);
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/services/global-settings.service.js'); })];
                    case 1:
                        GlobalSettingsService = (_a.sent())
                            .GlobalSettingsService;
                        this.globalSettingsService = injector.get(GlobalSettingsService);
                        this.channelIdCache = this.cacheService.createCache({
                            options: {
                                ttl: (0, ms_1.default)('7 days'),
                                tags: ['StockLocation'],
                            },
                            getKey: function (id) { return _this.getCacheKey(id); },
                        });
                        // When a StockLocation is updated, we need to invalidate the cache
                        this.eventBus
                            .ofType(index_3.StockLocationEvent)
                            .pipe((0, operators_1.filter)(function (event) { return event.type !== 'created'; }))
                            .subscribe(function (_a) {
                            var entity = _a.entity;
                            return _this.channelIdCache.delete(_this.getCacheKey(entity.id));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description
     * Returns the available stock for the given ProductVariant, taking into account the active Channel.
     */
    MultiChannelStockLocationStrategy.prototype.getAvailableStock = function (ctx, productVariantId, stockLevels) {
        return __awaiter(this, void 0, void 0, function () {
            var stockOnHand, stockAllocated, _i, stockLevels_1, stockLevel, applies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stockOnHand = 0;
                        stockAllocated = 0;
                        _i = 0, stockLevels_1 = stockLevels;
                        _a.label = 1;
                    case 1:
                        if (!(_i < stockLevels_1.length)) return [3 /*break*/, 4];
                        stockLevel = stockLevels_1[_i];
                        return [4 /*yield*/, this.stockLevelAppliesToActiveChannel(ctx, stockLevel)];
                    case 2:
                        applies = _a.sent();
                        if (applies) {
                            stockOnHand += stockLevel.stockOnHand;
                            stockAllocated += stockLevel.stockAllocated;
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, { stockOnHand: stockOnHand, stockAllocated: stockAllocated }];
                }
            });
        });
    };
    /**
     * @description
     * This method takes into account whether the stock location is applicable to the active channel.
     * It furthermore respects the `trackInventory` and `outOfStockThreshold` settings of the ProductVariant,
     * in order to allocate stock only from locations which are relevant to the active channel and which
     * have sufficient stock available.
     */
    MultiChannelStockLocationStrategy.prototype.forAllocation = function (ctx, stockLocations, orderLine, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var stockLevels, variant, totalAllocated, locations, _a, inventoryNotTracked, effectiveOutOfStockThreshold, _loop_1, this_1, _i, stockLocations_1, stockLocation, state_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getStockLevelsForVariant(ctx, orderLine.productVariantId)];
                    case 1:
                        stockLevels = _b.sent();
                        return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, index_2.ProductVariant, orderLine.productVariantId, { loadEagerRelations: false })];
                    case 2:
                        variant = _b.sent();
                        totalAllocated = 0;
                        locations = [];
                        return [4 /*yield*/, this.getVariantStockSettings(ctx, variant)];
                    case 3:
                        _a = _b.sent(), inventoryNotTracked = _a.inventoryNotTracked, effectiveOutOfStockThreshold = _a.effectiveOutOfStockThreshold;
                        _loop_1 = function (stockLocation) {
                            var stockLevel, _c, quantityAvailable, quantityToAllocate;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        stockLevel = stockLevels.find(function (sl) { return sl.stockLocationId === stockLocation.id; });
                                        _c = stockLevel;
                                        if (!_c) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.stockLevelAppliesToActiveChannel(ctx, stockLevel)];
                                    case 1:
                                        _c = (_d.sent());
                                        _d.label = 2;
                                    case 2:
                                        if (_c) {
                                            quantityAvailable = inventoryNotTracked
                                                ? Number.MAX_SAFE_INTEGER
                                                : stockLevel.stockOnHand - stockLevel.stockAllocated - effectiveOutOfStockThreshold;
                                            if (quantityAvailable > 0) {
                                                quantityToAllocate = Math.min(quantity, quantityAvailable);
                                                locations.push({
                                                    location: stockLocation,
                                                    quantity: quantityToAllocate,
                                                });
                                                totalAllocated += quantityToAllocate;
                                            }
                                        }
                                        if (totalAllocated >= quantity) {
                                            return [2 /*return*/, "break"];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, stockLocations_1 = stockLocations;
                        _b.label = 4;
                    case 4:
                        if (!(_i < stockLocations_1.length)) return [3 /*break*/, 7];
                        stockLocation = stockLocations_1[_i];
                        return [5 /*yield**/, _loop_1(stockLocation)];
                    case 5:
                        state_1 = _b.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 7];
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, locations];
                }
            });
        });
    };
    /**
     * @description
     * Determines whether the given StockLevel applies to the active Channel. Uses a cache to avoid
     * repeated DB queries.
     */
    MultiChannelStockLocationStrategy.prototype.stockLevelAppliesToActiveChannel = function (ctx, stockLevel) {
        return __awaiter(this, void 0, void 0, function () {
            var channelIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.channelIdCache.get(stockLevel.stockLocationId, function () { return __awaiter(_this, void 0, void 0, function () {
                            var stockLocation;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, stock_location_entity_1.StockLocation, stockLevel.stockLocationId, {
                                            relations: {
                                                channels: true,
                                            },
                                        })];
                                    case 1:
                                        stockLocation = _a.sent();
                                        return [2 /*return*/, stockLocation.channels.map(function (c) { return c.id; })];
                                }
                            });
                        }); })];
                    case 1:
                        channelIds = _a.sent();
                        return [2 /*return*/, channelIds.includes(ctx.channelId)];
                }
            });
        });
    };
    MultiChannelStockLocationStrategy.prototype.getCacheKey = function (stockLocationId) {
        return "MultiChannelStockLocationStrategy:StockLocationChannelIds:".concat(stockLocationId);
    };
    MultiChannelStockLocationStrategy.prototype.getStockLevelsForVariant = function (ctx, productVariantId) {
        var _this = this;
        return this.requestContextCache.get(ctx, "MultiChannelStockLocationStrategy.stockLevels.".concat(productVariantId), function () {
            return _this.connection.getRepository(ctx, stock_level_entity_1.StockLevel).find({
                where: {
                    productVariantId: productVariantId,
                },
                loadEagerRelations: false,
            });
        });
    };
    MultiChannelStockLocationStrategy.prototype.getVariantStockSettings = function (ctx, variant) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, outOfStockThreshold, trackInventory, inventoryNotTracked, effectiveOutOfStockThreshold;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                    case 1:
                        _a = _b.sent(), outOfStockThreshold = _a.outOfStockThreshold, trackInventory = _a.trackInventory;
                        inventoryNotTracked = variant.trackInventory === generated_types_1.GlobalFlag.FALSE ||
                            (variant.trackInventory === generated_types_1.GlobalFlag.INHERIT && trackInventory === false);
                        effectiveOutOfStockThreshold = variant.useGlobalOutOfStockThreshold
                            ? outOfStockThreshold
                            : variant.outOfStockThreshold;
                        return [2 /*return*/, {
                                inventoryNotTracked: inventoryNotTracked,
                                effectiveOutOfStockThreshold: effectiveOutOfStockThreshold,
                            }];
                }
            });
        });
    };
    return MultiChannelStockLocationStrategy;
}(default_stock_location_strategy_1.BaseStockLocationStrategy));
exports.MultiChannelStockLocationStrategy = MultiChannelStockLocationStrategy;
