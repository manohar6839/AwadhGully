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
exports.ProductVariantService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var round_money_1 = require("../../common/round-money");
var utils_1 = require("../../common/utils");
var entity_1 = require("../../entity");
var product_option_entity_1 = require("../../entity/product-option/product-option.entity");
var product_variant_translation_entity_1 = require("../../entity/product-variant/product-variant-translation.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var product_entity_1 = require("../../entity/product/product.entity");
var product_variant_channel_event_1 = require("../../event-bus/events/product-variant-channel-event");
var product_variant_event_1 = require("../../event-bus/events/product-variant-event");
var product_variant_price_event_1 = require("../../event-bus/events/product-variant-price-event");
var patch_entity_1 = require("../helpers/utils/patch-entity");
var samples_each_1 = require("../helpers/utils/samples-each");
/**
 * @description
 * Contains methods relating to {@link ProductVariant} entities.
 *
 * @docsCategory services
 */
var ProductVariantService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductVariantService = _classThis = /** @class */ (function () {
        function ProductVariantService_1(connection, configService, taxCategoryService, facetValueService, assetService, translatableSaver, eventBus, listQueryBuilder, globalSettingsService, stockMovementService, stockLevelService, channelService, roleService, customFieldRelationService, requestCache, productPriceApplicator, translator) {
            this.connection = connection;
            this.configService = configService;
            this.taxCategoryService = taxCategoryService;
            this.facetValueService = facetValueService;
            this.assetService = assetService;
            this.translatableSaver = translatableSaver;
            this.eventBus = eventBus;
            this.listQueryBuilder = listQueryBuilder;
            this.globalSettingsService = globalSettingsService;
            this.stockMovementService = stockMovementService;
            this.stockLevelService = stockLevelService;
            this.channelService = channelService;
            this.roleService = roleService;
            this.customFieldRelationService = customFieldRelationService;
            this.requestCache = requestCache;
            this.productPriceApplicator = productPriceApplicator;
            this.translator = translator;
        }
        ProductVariantService_1.prototype.findAll = function (ctx, options) {
            return __awaiter(this, void 0, void 0, function () {
                var relations, customPropertyMap, hasFacetValueIdFilter;
                var _this = this;
                return __generator(this, function (_a) {
                    relations = ['featuredAsset', 'taxCategory', 'channels'];
                    customPropertyMap = {};
                    hasFacetValueIdFilter = this.listQueryBuilder.filterObjectHasProperty(options === null || options === void 0 ? void 0 : options.filter, 'facetValueId');
                    if (hasFacetValueIdFilter) {
                        relations.push('facetValues');
                        customPropertyMap.facetValueId = 'facetValues.id';
                    }
                    return [2 /*return*/, this.listQueryBuilder
                            .build(product_variant_entity_1.ProductVariant, options, {
                            relations: relations,
                            channelId: ctx.channelId,
                            where: { deletedAt: (0, typeorm_1.IsNull)() },
                            ctx: ctx,
                            customPropertyMap: customPropertyMap,
                        })
                            .getManyAndCount()
                            .then(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var items;
                            var variants = _b[0], totalItems = _b[1];
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, this.applyPricesAndTranslateVariants(ctx, variants)];
                                    case 1:
                                        items = _c.sent();
                                        return [2 /*return*/, {
                                                items: items,
                                                totalItems: totalItems,
                                            }];
                                }
                            });
                        }); })];
                });
            });
        };
        ProductVariantService_1.prototype.findOne = function (ctx, productVariantId, relations) {
            var _this = this;
            return this.connection
                .findOneInChannel(ctx, product_variant_entity_1.ProductVariant, productVariantId, ctx.channelId, {
                relations: __spreadArray(__spreadArray([], (relations || ['product', 'featuredAsset', 'product.featuredAsset']), true), [
                    'taxCategory',
                ], false),
                where: { deletedAt: (0, typeorm_1.IsNull)() },
            })
                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!result) return [3 /*break*/, 2];
                            _b = (_a = this.translator).translate;
                            return [4 /*yield*/, this.applyChannelPriceAndTax(result, ctx)];
                        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(), ctx, [
                                    'product',
                                ]])];
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        };
        ProductVariantService_1.prototype.findByIds = function (ctx, ids) {
            var _this = this;
            return this.connection
                .findByIdsInChannel(ctx, product_variant_entity_1.ProductVariant, ids, ctx.channelId, {
                relations: [
                    'options',
                    'facetValues',
                    'facetValues.facet',
                    'taxCategory',
                    'assets',
                    'featuredAsset',
                ],
            })
                .then(function (variants) { return _this.applyPricesAndTranslateVariants(ctx, variants); });
        };
        ProductVariantService_1.prototype.getVariantsByProductId = function (ctx, productId, options, relations) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var qb = this.listQueryBuilder
                .build(product_variant_entity_1.ProductVariant, options, {
                relations: __spreadArray(__spreadArray([], (relations || [
                    'options',
                    'facetValues',
                    'facetValues.facet',
                    'assets',
                    'featuredAsset',
                ]), true), [
                    'taxCategory',
                ], false),
                orderBy: { id: 'ASC' },
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                ctx: ctx,
            })
                .innerJoinAndSelect('productvariant.channels', 'channel', 'channel.id = :channelId', {
                channelId: ctx.channelId,
            })
                .innerJoinAndSelect('productvariant.product', 'product', 'product.id = :productId', {
                productId: productId,
            });
            if (ctx.apiType === 'shop') {
                qb.andWhere('productvariant.enabled = :enabled', { enabled: true });
            }
            return qb.getManyAndCount().then(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                var items;
                var variants = _b[0], totalItems = _b[1];
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.applyPricesAndTranslateVariants(ctx, variants)];
                        case 1:
                            items = _c.sent();
                            return [2 /*return*/, {
                                    items: items,
                                    totalItems: totalItems,
                                }];
                    }
                });
            }); });
        };
        /**
         * @description
         * Returns a {@link PaginatedList} of all ProductVariants associated with the given Collection.
         */
        ProductVariantService_1.prototype.getVariantsByCollectionId = function (ctx, collectionId, options, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            var qb = this.listQueryBuilder
                .build(product_variant_entity_1.ProductVariant, options, {
                relations: (0, unique_1.unique)(__spreadArray(__spreadArray([], relations, true), ['taxCategory'], false)),
                channelId: ctx.channelId,
                ctx: ctx,
            })
                .leftJoin('productvariant.collections', 'collection')
                .leftJoin('productvariant.product', 'product')
                .andWhere('product.deletedAt IS NULL')
                .andWhere('productvariant.deletedAt IS NULL')
                .andWhere('collection.id = :collectionId', { collectionId: collectionId });
            if (options && options.filter && options.filter.enabled && options.filter.enabled.eq === true) {
                qb.andWhere('product.enabled = :enabled', { enabled: true });
            }
            return qb.getManyAndCount().then(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                var items;
                var variants = _b[0], totalItems = _b[1];
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.applyPricesAndTranslateVariants(ctx, variants)];
                        case 1:
                            items = _c.sent();
                            return [2 /*return*/, {
                                    items: items,
                                    totalItems: totalItems,
                                }];
                    }
                });
            }); });
        };
        /**
         * @description
         * Returns all Channels to which the ProductVariant is assigned.
         */
        ProductVariantService_1.prototype.getProductVariantChannels = function (ctx, productVariantId) {
            return __awaiter(this, void 0, void 0, function () {
                var variant;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, productVariantId, {
                                relations: ['channels'],
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            variant = _a.sent();
                            return [2 /*return*/, variant.channels];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.getProductVariantPrices = function (ctx, productVariantId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .getRepository(ctx, entity_1.ProductVariantPrice)
                            .createQueryBuilder('pvp')
                            .where('pvp.variant = :productVariantId', { productVariantId: productVariantId })
                            .andWhere('pvp.channelId = :channelId', { channelId: ctx.channelId })
                            .getMany()];
                });
            });
        };
        /**
         * @description
         * Returns the ProductVariant associated with the given {@link OrderLine}.
         */
        ProductVariantService_1.prototype.getVariantByOrderLineId = function (ctx, orderLineId) {
            return __awaiter(this, void 0, void 0, function () {
                var productVariant, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, entity_1.OrderLine, orderLineId, {
                                relations: ['productVariant', 'productVariant.taxCategory'],
                                includeSoftDeleted: true,
                            })];
                        case 1:
                            productVariant = (_c.sent()).productVariant;
                            _b = (_a = this.translator).translate;
                            return [4 /*yield*/, this.applyChannelPriceAndTax(productVariant, ctx)];
                        case 2: return [2 /*return*/, _b.apply(_a, [_c.sent(), ctx])];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the {@link ProductOption}s for the given ProductVariant.
         */
        ProductVariantService_1.prototype.getOptionsForVariant = function (ctx, variantId) {
            var _this = this;
            return this.connection
                .findOneInChannel(ctx, product_variant_entity_1.ProductVariant, variantId, ctx.channelId, {
                relations: ['options'],
            })
                .then(function (variant) { return (!variant ? [] : variant.options.map(function (o) { return _this.translator.translate(o, ctx); })); });
        };
        ProductVariantService_1.prototype.getFacetValuesForVariant = function (ctx, variantId) {
            var _this = this;
            return this.connection
                .findOneInChannel(ctx, product_variant_entity_1.ProductVariant, variantId, ctx.channelId, {
                relations: ['facetValues', 'facetValues.facet', 'facetValues.channels'],
            })
                .then(function (variant) {
                return !variant ? [] : variant.facetValues.map(function (o) { return _this.translator.translate(o, ctx, ['facet']); });
            });
        };
        /**
         * @description
         * Returns the Product associated with the ProductVariant. Whereas the `ProductService.findOne()`
         * method performs a large multi-table join with all the typical data needed for a "product detail"
         * page, this method returns only the Product itself.
         */
        ProductVariantService_1.prototype.getProductForVariant = function (ctx, variant) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!variant.product) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_entity_1.Product, variant.productId, {
                                    includeSoftDeleted: true,
                                })];
                        case 1:
                            product = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            product = variant.product;
                            _a.label = 3;
                        case 3: return [2 /*return*/, this.translator.translate(product, ctx)];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the number of saleable units of the ProductVariant, i.e. how many are available
         * for purchase by Customers. This is determined by the ProductVariant's `stockOnHand` value,
         * as well as the local and global `outOfStockThreshold` settings.
         */
        ProductVariantService_1.prototype.getSaleableStockLevel = function (ctx, variant) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, outOfStockThreshold, trackInventory, inventoryNotTracked, _b, stockOnHand, stockAllocated, effectiveOutOfStockThreshold;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 1:
                            _a = _c.sent(), outOfStockThreshold = _a.outOfStockThreshold, trackInventory = _a.trackInventory;
                            inventoryNotTracked = variant.trackInventory === generated_types_1.GlobalFlag.FALSE ||
                                (variant.trackInventory === generated_types_1.GlobalFlag.INHERIT && trackInventory === false);
                            if (inventoryNotTracked) {
                                return [2 /*return*/, Number.MAX_SAFE_INTEGER];
                            }
                            return [4 /*yield*/, this.stockLevelService.getAvailableStock(ctx, variant.id)];
                        case 2:
                            _b = _c.sent(), stockOnHand = _b.stockOnHand, stockAllocated = _b.stockAllocated;
                            effectiveOutOfStockThreshold = variant.useGlobalOutOfStockThreshold
                                ? outOfStockThreshold
                                : variant.outOfStockThreshold;
                            return [2 /*return*/, stockOnHand - stockAllocated - effectiveOutOfStockThreshold];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.getOutOfStockThreshold = function (ctx, variant) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, outOfStockThreshold, trackInventory, inventoryNotTracked;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 1:
                            _a = _b.sent(), outOfStockThreshold = _a.outOfStockThreshold, trackInventory = _a.trackInventory;
                            inventoryNotTracked = variant.trackInventory === generated_types_1.GlobalFlag.FALSE ||
                                (variant.trackInventory === generated_types_1.GlobalFlag.INHERIT && trackInventory === false);
                            if (inventoryNotTracked) {
                                return [2 /*return*/, 0];
                            }
                            else {
                                return [2 /*return*/, variant.useGlobalOutOfStockThreshold ? outOfStockThreshold : variant.outOfStockThreshold];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the stockLevel to display to the customer, as specified by the configured
         * {@link StockDisplayStrategy}.
         */
        ProductVariantService_1.prototype.getDisplayStockLevel = function (ctx, variant) {
            return __awaiter(this, void 0, void 0, function () {
                var stockDisplayStrategy, saleableStockLevel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stockDisplayStrategy = this.configService.catalogOptions.stockDisplayStrategy;
                            return [4 /*yield*/, this.getSaleableStockLevel(ctx, variant)];
                        case 1:
                            saleableStockLevel = _a.sent();
                            return [2 /*return*/, stockDisplayStrategy.getStockLevel(ctx, variant, saleableStockLevel)];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the number of fulfillable units of the ProductVariant, equivalent to stockOnHand
         * for those variants which are tracking inventory.
         */
        ProductVariantService_1.prototype.getFulfillableStockLevel = function (ctx, variant) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, outOfStockThreshold, trackInventory, inventoryNotTracked, stockOnHand;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 1:
                            _a = _b.sent(), outOfStockThreshold = _a.outOfStockThreshold, trackInventory = _a.trackInventory;
                            inventoryNotTracked = variant.trackInventory === generated_types_1.GlobalFlag.FALSE ||
                                (variant.trackInventory === generated_types_1.GlobalFlag.INHERIT && trackInventory === false);
                            if (inventoryNotTracked) {
                                return [2 /*return*/, Number.MAX_SAFE_INTEGER];
                            }
                            return [4 /*yield*/, this.stockLevelService.getAvailableStock(ctx, variant.id)];
                        case 2:
                            stockOnHand = (_b.sent()).stockOnHand;
                            return [2 /*return*/, stockOnHand];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ids, _i, input_1, productInput, id, createdVariants;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ids = [];
                            _i = 0, input_1 = input;
                            _a.label = 1;
                        case 1:
                            if (!(_i < input_1.length)) return [3 /*break*/, 4];
                            productInput = input_1[_i];
                            return [4 /*yield*/, this.createSingle(ctx, productInput)];
                        case 2:
                            id = _a.sent();
                            ids.push(id);
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, this.findByIds(ctx, ids)];
                        case 5:
                            createdVariants = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_event_1.ProductVariantEvent(ctx, createdVariants, 'created', input))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, createdVariants];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, input_2, productInput, updatedVariants;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, input_2 = input;
                            _a.label = 1;
                        case 1:
                            if (!(_i < input_2.length)) return [3 /*break*/, 4];
                            productInput = input_2[_i];
                            return [4 /*yield*/, this.updateSingle(ctx, productInput)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, this.findByIds(ctx, input.map(function (i) { return i.id; }))];
                        case 5:
                            updatedVariants = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_event_1.ProductVariantEvent(ctx, updatedVariants, 'updated', input))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, updatedVariants];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.createSingle = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, inputWithoutPrice, createdVariant, defaultChannel;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.validateVariantOptionIds(ctx, input.productId, input.optionIds)];
                        case 1:
                            _b.sent();
                            if (!input.optionIds) {
                                input.optionIds = [];
                            }
                            if (input.price == null) {
                                input.price = 0;
                            }
                            _a = input;
                            return [4 /*yield*/, this.getTaxCategoryForNewVariant(ctx, input.taxCategoryId)];
                        case 2:
                            _a.taxCategoryId = (_b.sent()).id;
                            inputWithoutPrice = __assign({}, input);
                            delete inputWithoutPrice.price;
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: ctx,
                                    input: inputWithoutPrice,
                                    entityType: product_variant_entity_1.ProductVariant,
                                    translationType: product_variant_translation_entity_1.ProductVariantTranslation,
                                    beforeSave: function (variant) { return __awaiter(_this, void 0, void 0, function () {
                                        var optionIds, selectedOptions, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    optionIds = input.optionIds;
                                                    if (!(optionIds && optionIds.length)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.connection
                                                            .getRepository(ctx, product_option_entity_1.ProductOption)
                                                            .find({ where: { id: (0, typeorm_1.In)(optionIds) } })];
                                                case 1:
                                                    selectedOptions = _b.sent();
                                                    variant.options = selectedOptions;
                                                    _b.label = 2;
                                                case 2:
                                                    if (!input.facetValueIds) return [3 /*break*/, 4];
                                                    _a = variant;
                                                    return [4 /*yield*/, this.facetValueService.findByIds(ctx, input.facetValueIds)];
                                                case 3:
                                                    _a.facetValues = _b.sent();
                                                    _b.label = 4;
                                                case 4:
                                                    variant.product = { id: input.productId };
                                                    variant.taxCategory = { id: input.taxCategoryId };
                                                    return [4 /*yield*/, this.assetService.updateFeaturedAsset(ctx, variant, input)];
                                                case 5:
                                                    _b.sent();
                                                    return [4 /*yield*/, this.channelService.assignToCurrentChannel(variant, ctx)];
                                                case 6:
                                                    _b.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    typeOrmSubscriberData: {
                                        channelId: ctx.channelId,
                                        taxCategoryId: input.taxCategoryId,
                                    },
                                })];
                        case 3:
                            createdVariant = _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_variant_entity_1.ProductVariant, input, createdVariant)];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, this.assetService.updateEntityAssets(ctx, createdVariant, input)];
                        case 5:
                            _b.sent();
                            if (!(input.stockOnHand != null || input.stockLevels)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.stockMovementService.adjustProductVariantStock(ctx, createdVariant.id, 
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                input.stockLevels || input.stockOnHand)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7: return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 8:
                            defaultChannel = _b.sent();
                            return [4 /*yield*/, this.createOrUpdateProductVariantPrice(ctx, createdVariant.id, input.price, ctx.channelId)];
                        case 9:
                            _b.sent();
                            if (!!(0, utils_1.idsAreEqual)(ctx.channelId, defaultChannel.id)) return [3 /*break*/, 11];
                            // When creating a ProductVariant _not_ in the default Channel, we still need to
                            // create a ProductVariantPrice for it in the default Channel, otherwise errors will
                            // result when trying to query it there.
                            return [4 /*yield*/, this.createOrUpdateProductVariantPrice(ctx, createdVariant.id, input.price, defaultChannel.id, defaultChannel.defaultCurrencyCode)];
                        case 10:
                            // When creating a ProductVariant _not_ in the default Channel, we still need to
                            // create a ProductVariantPrice for it in the default Channel, otherwise errors will
                            // result when trying to query it there.
                            _b.sent();
                            _b.label = 11;
                        case 11: return [2 /*return*/, createdVariant.id];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.updateSingle = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var existingVariant, outOfStockThreshold, inputWithoutPriceAndStockLevels, updatedVariant, _i, _a, priceInput;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, input.id, {
                                channelId: ctx.channelId,
                                relations: ['facetValues', 'facetValues.channels'],
                            })];
                        case 1:
                            existingVariant = _b.sent();
                            return [4 /*yield*/, this.getOutOfStockThreshold(ctx, existingVariant)];
                        case 2:
                            outOfStockThreshold = _b.sent();
                            if (input.stockOnHand && input.stockOnHand < outOfStockThreshold) {
                                throw new errors_1.UserInputError('error.stockonhand-cannot-be-negative');
                            }
                            if (!input.optionIds) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.validateVariantOptionIds(ctx, existingVariant.productId, input.optionIds, true)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            inputWithoutPriceAndStockLevels = __assign({}, input);
                            delete inputWithoutPriceAndStockLevels.price;
                            delete inputWithoutPriceAndStockLevels.stockLevels;
                            return [4 /*yield*/, this.translatableSaver.update({
                                    ctx: ctx,
                                    input: inputWithoutPriceAndStockLevels,
                                    entityType: product_variant_entity_1.ProductVariant,
                                    translationType: product_variant_translation_entity_1.ProductVariantTranslation,
                                    beforeSave: function (v) { return __awaiter(_this, void 0, void 0, function () {
                                        var taxCategory, selectedOptions, facetValuesInOtherChannels, _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!input.taxCategoryId) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.taxCategoryService.findOne(ctx, input.taxCategoryId)];
                                                case 1:
                                                    taxCategory = _c.sent();
                                                    if (taxCategory) {
                                                        v.taxCategory = taxCategory;
                                                    }
                                                    _c.label = 2;
                                                case 2:
                                                    if (!(input.optionIds && input.optionIds.length)) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, this.connection
                                                            .getRepository(ctx, product_option_entity_1.ProductOption)
                                                            .find({ where: { id: (0, typeorm_1.In)(input.optionIds) } })];
                                                case 3:
                                                    selectedOptions = _c.sent();
                                                    v.options = selectedOptions;
                                                    _c.label = 4;
                                                case 4:
                                                    if (!input.facetValueIds) return [3 /*break*/, 6];
                                                    facetValuesInOtherChannels = existingVariant.facetValues.filter(function (fv) {
                                                        return fv.channels.every(function (channel) { return !(0, utils_1.idsAreEqual)(channel.id, ctx.channelId); });
                                                    });
                                                    _a = v;
                                                    _b = [__spreadArray([], facetValuesInOtherChannels, true)];
                                                    return [4 /*yield*/, this.facetValueService.findByIds(ctx, input.facetValueIds)];
                                                case 5:
                                                    _a.facetValues = __spreadArray.apply(void 0, _b.concat([(_c.sent()), true]));
                                                    _c.label = 6;
                                                case 6:
                                                    if (!(input.stockOnHand != null || input.stockLevels)) return [3 /*break*/, 8];
                                                    return [4 /*yield*/, this.stockMovementService.adjustProductVariantStock(ctx, existingVariant.id, 
                                                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                                        input.stockLevels || input.stockOnHand)];
                                                case 7:
                                                    _c.sent();
                                                    _c.label = 8;
                                                case 8: return [4 /*yield*/, this.assetService.updateFeaturedAsset(ctx, v, input)];
                                                case 9:
                                                    _c.sent();
                                                    return [4 /*yield*/, this.assetService.updateEntityAssets(ctx, v, input)];
                                                case 10:
                                                    _c.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    typeOrmSubscriberData: {
                                        channelId: ctx.channelId,
                                        taxCategoryId: input.taxCategoryId,
                                    },
                                })];
                        case 5:
                            updatedVariant = _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_variant_entity_1.ProductVariant, input, updatedVariant)];
                        case 6:
                            _b.sent();
                            if (!(input.price != null)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.createOrUpdateProductVariantPrice(ctx, input.id, input.price, ctx.channelId)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8:
                            if (!input.prices) return [3 /*break*/, 14];
                            _i = 0, _a = input.prices;
                            _b.label = 9;
                        case 9:
                            if (!(_i < _a.length)) return [3 /*break*/, 14];
                            priceInput = _a[_i];
                            if (!(priceInput.delete === true)) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.deleteProductVariantPrice(ctx, input.id, ctx.channelId, priceInput.currencyCode)];
                        case 10:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 11: return [4 /*yield*/, this.createOrUpdateProductVariantPrice(ctx, input.id, priceInput.price, ctx.channelId, priceInput.currencyCode, priceInput.customFields)];
                        case 12:
                            _b.sent();
                            _b.label = 13;
                        case 13:
                            _i++;
                            return [3 /*break*/, 9];
                        case 14: return [2 /*return*/, updatedVariant.id];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a {@link ProductVariantPrice} for the given ProductVariant/Channel combination.
         * If the `currencyCode` is not specified, the default currency of the Channel will be used.
         */
        ProductVariantService_1.prototype.createOrUpdateProductVariantPrice = function (ctx, productVariantId, price, channelId, currencyCode, customFields) {
            return __awaiter(this, void 0, void 0, function () {
                var productVariantPriceUpdateStrategy, allPrices, targetPrice, channel, additionalPricesToUpdate, createdPrice, updatedPrice, uniqueAdditionalPricesToUpdate, updatedAdditionalPrices;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            productVariantPriceUpdateStrategy = this.configService.catalogOptions.productVariantPriceUpdateStrategy;
                            return [4 /*yield*/, this.connection.getRepository(ctx, entity_1.ProductVariantPrice).find({
                                    where: {
                                        variant: { id: productVariantId },
                                    },
                                })];
                        case 1:
                            allPrices = _a.sent();
                            targetPrice = allPrices.find(function (p) {
                                return (0, utils_1.idsAreEqual)(p.channelId, channelId) &&
                                    p.currencyCode === (currencyCode !== null && currencyCode !== void 0 ? currencyCode : ctx.channel.defaultCurrencyCode);
                            });
                            if (!currencyCode) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.channelService.findOne(ctx, channelId)];
                        case 2:
                            channel = _a.sent();
                            if (!(channel === null || channel === void 0 ? void 0 : channel.availableCurrencyCodes.includes(currencyCode))) {
                                throw new errors_1.UserInputError('error.currency-not-available-in-channel', {
                                    currencyCode: currencyCode,
                                });
                            }
                            _a.label = 3;
                        case 3:
                            additionalPricesToUpdate = [];
                            if (!!targetPrice) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.connection.getRepository(ctx, entity_1.ProductVariantPrice).save(new entity_1.ProductVariantPrice({
                                    channelId: channelId,
                                    price: price,
                                    variant: new product_variant_entity_1.ProductVariant({ id: productVariantId }),
                                    currencyCode: currencyCode !== null && currencyCode !== void 0 ? currencyCode : ctx.channel.defaultCurrencyCode,
                                }))];
                        case 4:
                            createdPrice = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_price_event_1.ProductVariantPriceEvent(ctx, [createdPrice], 'created'))];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, productVariantPriceUpdateStrategy.onPriceCreated(ctx, createdPrice, allPrices)];
                        case 6:
                            additionalPricesToUpdate = _a.sent();
                            targetPrice = createdPrice;
                            return [3 /*break*/, 13];
                        case 7:
                            (0, patch_entity_1.patchEntity)(targetPrice, {
                                price: price,
                                customFields: customFields || targetPrice.customFields,
                            });
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entity_1.ProductVariantPrice)
                                    .save(targetPrice)];
                        case 8:
                            updatedPrice = _a.sent();
                            if (!customFields) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, entity_1.ProductVariantPrice, customFields, updatedPrice)];
                        case 9:
                            _a.sent();
                            _a.label = 10;
                        case 10: return [4 /*yield*/, this.eventBus.publish(new product_variant_price_event_1.ProductVariantPriceEvent(ctx, [updatedPrice], 'updated'))];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, productVariantPriceUpdateStrategy.onPriceUpdated(ctx, updatedPrice, allPrices)];
                        case 12:
                            additionalPricesToUpdate = _a.sent();
                            _a.label = 13;
                        case 13:
                            uniqueAdditionalPricesToUpdate = (0, unique_1.unique)(additionalPricesToUpdate, 'id').filter(function (p) {
                                // We don't save the targetPrice again unless it has been assigned
                                // a different price by the ProductVariantPriceUpdateStrategy.
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                return !((0, utils_1.idsAreEqual)(p.id, targetPrice.id) && p.price === targetPrice.price);
                            });
                            if (!uniqueAdditionalPricesToUpdate.length) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entity_1.ProductVariantPrice)
                                    .save(uniqueAdditionalPricesToUpdate)];
                        case 14:
                            updatedAdditionalPrices = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_price_event_1.ProductVariantPriceEvent(ctx, updatedAdditionalPrices, 'updated'))];
                        case 15:
                            _a.sent();
                            _a.label = 16;
                        case 16: return [2 /*return*/, targetPrice];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.deleteProductVariantPrice = function (ctx, variantId, channelId, currencyCode) {
            return __awaiter(this, void 0, void 0, function () {
                var variantPrice, productVariantPriceUpdateStrategy, allPrices, additionalPricesToUpdate, updatedAdditionalPrices;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, entity_1.ProductVariantPrice).findOne({
                                where: {
                                    variant: { id: variantId },
                                    channelId: channelId,
                                    currencyCode: currencyCode,
                                },
                            })];
                        case 1:
                            variantPrice = _a.sent();
                            if (!variantPrice) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.connection.getRepository(ctx, entity_1.ProductVariantPrice).remove(variantPrice)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_price_event_1.ProductVariantPriceEvent(ctx, [variantPrice], 'deleted'))];
                        case 3:
                            _a.sent();
                            productVariantPriceUpdateStrategy = this.configService.catalogOptions.productVariantPriceUpdateStrategy;
                            return [4 /*yield*/, this.connection.getRepository(ctx, entity_1.ProductVariantPrice).find({
                                    where: {
                                        variant: { id: variantId },
                                    },
                                })];
                        case 4:
                            allPrices = _a.sent();
                            return [4 /*yield*/, productVariantPriceUpdateStrategy.onPriceDeleted(ctx, variantPrice, allPrices)];
                        case 5:
                            additionalPricesToUpdate = _a.sent();
                            if (!additionalPricesToUpdate.length) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entity_1.ProductVariantPrice)
                                    .save(additionalPricesToUpdate)];
                        case 6:
                            updatedAdditionalPrices = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_price_event_1.ProductVariantPriceEvent(ctx, updatedAdditionalPrices, 'updated'))];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.softDelete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var ids, variants, _i, variants_1, variant;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ids = Array.isArray(id) ? id : [id];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, product_variant_entity_1.ProductVariant)
                                    .find({ where: { id: (0, typeorm_1.In)(ids) } })];
                        case 1:
                            variants = _a.sent();
                            for (_i = 0, variants_1 = variants; _i < variants_1.length; _i++) {
                                variant = variants_1[_i];
                                variant.deletedAt = new Date();
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).save(variants, { reload: false })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_event_1.ProductVariantEvent(ctx, variants, 'deleted', id))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * This method is intended to be used by the ProductVariant GraphQL entity resolver to resolve the
         * price-related fields which need to be populated at run-time using the `applyChannelPriceAndTax`
         * method.
         *
         * Is optimized to make as few DB calls as possible using caching based on the open request.
         */
        ProductVariantService_1.prototype.hydratePriceFields = function (ctx, variant, priceField) {
            return __awaiter(this, void 0, void 0, function () {
                var cacheKey, populatePricesPromise, hydratedVariant;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cacheKey = "hydrate-variant-price-fields-".concat(variant.id);
                            populatePricesPromise = this.requestCache.get(ctx, cacheKey);
                            if (!populatePricesPromise) {
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                populatePricesPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                    var variantWithPrices, variantWithTaxCategory, _a, e_1;
                                    var _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                _c.trys.push([0, 6, , 7]);
                                                if (!!((_b = variant.productVariantPrices) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, variant.id, { relations: ['productVariantPrices'], includeSoftDeleted: true })];
                                            case 1:
                                                variantWithPrices = _c.sent();
                                                variant.productVariantPrices = variantWithPrices.productVariantPrices;
                                                _c.label = 2;
                                            case 2:
                                                if (!!variant.taxCategory) return [3 /*break*/, 4];
                                                return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, variant.id, { relations: ['taxCategory'], includeSoftDeleted: true })];
                                            case 3:
                                                variantWithTaxCategory = _c.sent();
                                                variant.taxCategory = variantWithTaxCategory.taxCategory;
                                                _c.label = 4;
                                            case 4:
                                                _a = resolve;
                                                return [4 /*yield*/, this.applyChannelPriceAndTax(variant, ctx, undefined, true)];
                                            case 5:
                                                _a.apply(void 0, [_c.sent()]);
                                                return [3 /*break*/, 7];
                                            case 6:
                                                e_1 = _c.sent();
                                                reject(e_1);
                                                return [3 /*break*/, 7];
                                            case 7: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                this.requestCache.set(ctx, cacheKey, populatePricesPromise);
                            }
                            return [4 /*yield*/, populatePricesPromise];
                        case 1:
                            hydratedVariant = _a.sent();
                            return [2 /*return*/, hydratedVariant[priceField]];
                    }
                });
            });
        };
        /**
         * @description
         * Given an array of ProductVariants from the database, this method will apply the correct price and tax
         * and translate each item.
         */
        ProductVariantService_1.prototype.applyPricesAndTranslateVariants = function (ctx, variants) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(variants.map(function (variant) { return __awaiter(_this, void 0, void 0, function () {
                                var variantWithPrices;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.applyChannelPriceAndTax(variant, ctx)];
                                        case 1:
                                            variantWithPrices = _a.sent();
                                            return [2 /*return*/, this.translator.translate(variantWithPrices, ctx, [
                                                    'options',
                                                    'facetValues',
                                                    ['facetValues', 'facet'],
                                                ])];
                                    }
                                });
                            }); }))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @description
         * Populates the `price` field with the price for the specified channel.
         */
        ProductVariantService_1.prototype.applyChannelPriceAndTax = function (variant_1, ctx_1, order_1) {
            return __awaiter(this, arguments, void 0, function (variant, ctx, order, throwIfNoPriceFound) {
                if (throwIfNoPriceFound === void 0) { throwIfNoPriceFound = false; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.productPriceApplicator.applyChannelPriceAndTax(variant, ctx, order, throwIfNoPriceFound)];
                });
            });
        };
        /**
         * @description
         * Assigns the specified ProductVariants to the specified Channel. In doing so, it will create a new
         * {@link ProductVariantPrice} and also assign the associated Product and any Assets to the Channel too.
         */
        ProductVariantService_1.prototype.assignProductVariantsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, variants, priceFactor, targetChannel, _i, variants_2, variant, price, assetIds, result, _a, variants_3, variant;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasPermissionOnChannel(ctx, input.channelId, generated_types_1.Permission.UpdateCatalog)];
                        case 1:
                            hasPermission = _c.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).find({
                                    where: {
                                        id: (0, typeorm_1.In)(input.productVariantIds),
                                    },
                                    relations: ['taxCategory', 'assets'],
                                })];
                        case 2:
                            variants = _c.sent();
                            priceFactor = input.priceFactor != null ? input.priceFactor : 1;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, entity_1.Channel, input.channelId)];
                        case 3:
                            targetChannel = _c.sent();
                            _i = 0, variants_2 = variants;
                            _c.label = 4;
                        case 4:
                            if (!(_i < variants_2.length)) return [3 /*break*/, 11];
                            variant = variants_2[_i];
                            if (variant.deletedAt) {
                                return [3 /*break*/, 10];
                            }
                            return [4 /*yield*/, this.applyChannelPriceAndTax(variant, ctx)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, product_entity_1.Product, variant.productId, [input.channelId])];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, product_variant_entity_1.ProductVariant, variant.id, [input.channelId])];
                        case 7:
                            _c.sent();
                            price = targetChannel.pricesIncludeTax ? variant.priceWithTax : variant.price;
                            return [4 /*yield*/, this.createOrUpdateProductVariantPrice(ctx, variant.id, (0, round_money_1.roundMoney)(price * priceFactor), input.channelId, targetChannel.defaultCurrencyCode)];
                        case 8:
                            _c.sent();
                            assetIds = ((_b = variant.assets) === null || _b === void 0 ? void 0 : _b.map(function (a) { return a.assetId; })) || [];
                            return [4 /*yield*/, this.assetService.assignToChannel(ctx, { channelId: input.channelId, assetIds: assetIds })];
                        case 9:
                            _c.sent();
                            _c.label = 10;
                        case 10:
                            _i++;
                            return [3 /*break*/, 4];
                        case 11: return [4 /*yield*/, this.findByIds(ctx, variants.map(function (v) { return v.id; }))];
                        case 12:
                            result = _c.sent();
                            _a = 0, variants_3 = variants;
                            _c.label = 13;
                        case 13:
                            if (!(_a < variants_3.length)) return [3 /*break*/, 16];
                            variant = variants_3[_a];
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_channel_event_1.ProductVariantChannelEvent(ctx, variant, input.channelId, 'assigned'))];
                        case 14:
                            _c.sent();
                            _c.label = 15;
                        case 15:
                            _a++;
                            return [3 /*break*/, 13];
                        case 16: return [2 /*return*/, result];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.removeProductVariantsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, defaultChannel, variants, _i, variants_4, variant, productVariants, productChannelsFromVariants, result, _a, variants_5, variant;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasPermissionOnChannel(ctx, input.channelId, generated_types_1.Permission.UpdateCatalog)];
                        case 1:
                            hasPermission = _c.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 2:
                            defaultChannel = _c.sent();
                            if ((0, utils_1.idsAreEqual)(input.channelId, defaultChannel.id)) {
                                throw new errors_1.UserInputError('error.items-cannot-be-removed-from-default-channel');
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, product_variant_entity_1.ProductVariant)
                                    .find({ where: { id: (0, typeorm_1.In)(input.productVariantIds) } })];
                        case 3:
                            variants = _c.sent();
                            _i = 0, variants_4 = variants;
                            _c.label = 4;
                        case 4:
                            if (!(_i < variants_4.length)) return [3 /*break*/, 10];
                            variant = variants_4[_i];
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, product_variant_entity_1.ProductVariant, variant.id, [input.channelId])];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, entity_1.ProductVariantPrice).delete({
                                    channelId: input.channelId,
                                    variant: { id: variant.id },
                                })];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).find({
                                    where: {
                                        productId: variant.productId,
                                    },
                                    relations: ['channels'],
                                })];
                        case 7:
                            productVariants = _c.sent();
                            productChannelsFromVariants = (_b = []).concat.apply(_b, productVariants.map(function (pv) { return pv.channels; }));
                            if (!!productChannelsFromVariants.find(function (c) { return c.id === input.channelId; })) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, product_entity_1.Product, variant.productId, [
                                    input.channelId,
                                ])];
                        case 8:
                            _c.sent();
                            _c.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 4];
                        case 10: return [4 /*yield*/, this.findByIds(ctx, variants.map(function (v) { return v.id; }))];
                        case 11:
                            result = _c.sent();
                            _a = 0, variants_5 = variants;
                            _c.label = 12;
                        case 12:
                            if (!(_a < variants_5.length)) return [3 /*break*/, 15];
                            variant = variants_5[_a];
                            return [4 /*yield*/, this.eventBus.publish(new product_variant_channel_event_1.ProductVariantChannelEvent(ctx, variant, input.channelId, 'removed'))];
                        case 13:
                            _c.sent();
                            _c.label = 14;
                        case 14:
                            _a++;
                            return [3 /*break*/, 12];
                        case 15: return [2 /*return*/, result];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.validateVariantOptionIds = function (ctx_1, productId_1) {
            return __awaiter(this, arguments, void 0, function (ctx, productId, optionIds, isUpdateOperation) {
                var optionGroups, activeOptions, product, inputOptionIds;
                var _this = this;
                if (optionIds === void 0) { optionIds = []; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_entity_1.Product, productId, {
                                channelId: ctx.channelId,
                                relations: ['optionGroups', 'optionGroups.options'],
                                loadEagerRelations: false,
                            })];
                        case 1:
                            optionGroups = (_a.sent()).optionGroups;
                            activeOptions = optionGroups && optionGroups.filter(function (group) { return !group.deletedAt; });
                            if (optionIds.length !== activeOptions.length) {
                                this.throwIncompatibleOptionsError(optionGroups);
                            }
                            if (!(0, samples_each_1.samplesEach)(optionIds, activeOptions.map(function (g) { return g.options.map(function (o) { return o.id; }); }))) {
                                this.throwIncompatibleOptionsError(optionGroups);
                            }
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_entity_1.Product, productId, {
                                    channelId: ctx.channelId,
                                    relations: ['variants', 'variants.options'],
                                    loadEagerRelations: true,
                                })];
                        case 2:
                            product = _a.sent();
                            inputOptionIds = this.sortJoin(optionIds, ',');
                            product.variants
                                .filter(function (v) { return !v.deletedAt; })
                                .forEach(function (variant) {
                                var variantOptionIds = _this.sortJoin(variant.options, ',', 'id');
                                if (isUpdateOperation)
                                    return;
                                if (variantOptionIds === inputOptionIds) {
                                    throw new errors_1.UserInputError('error.product-variant-options-combination-already-exists', {
                                        variantName: _this.translator.translate(variant, ctx).name,
                                    });
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProductVariantService_1.prototype.throwIncompatibleOptionsError = function (optionGroups) {
            throw new errors_1.UserInputError('error.product-variant-option-ids-not-compatible', {
                groupNames: this.sortJoin(optionGroups, ', ', 'code'),
            });
        };
        ProductVariantService_1.prototype.sortJoin = function (arr, glue, prop) {
            return arr
                .map(function (x) { return (prop ? x[prop] : x); })
                .sort()
                .join(glue);
        };
        ProductVariantService_1.prototype.getTaxCategoryForNewVariant = function (ctx, taxCategoryId) {
            return __awaiter(this, void 0, void 0, function () {
                var taxCategory, taxCategories;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!taxCategoryId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, entity_1.TaxCategory, taxCategoryId)];
                        case 1:
                            taxCategory = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.taxCategoryService.findAll(ctx)];
                        case 3:
                            taxCategories = _b.sent();
                            taxCategory = (_a = taxCategories.items.find(function (t) { return t.isDefault === true; })) !== null && _a !== void 0 ? _a : taxCategories.items[0];
                            _b.label = 4;
                        case 4:
                            if (!!taxCategory) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.taxCategoryService.create(ctx, { name: 'Standard Tax' })];
                        case 5:
                            // there is no TaxCategory set up, so create a default
                            taxCategory = _b.sent();
                            _b.label = 6;
                        case 6: return [2 /*return*/, taxCategory];
                    }
                });
            });
        };
        return ProductVariantService_1;
    }());
    __setFunctionName(_classThis, "ProductVariantService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductVariantService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductVariantService = _classThis;
}();
exports.ProductVariantService = ProductVariantService;
