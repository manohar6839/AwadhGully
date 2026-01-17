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
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var product_option_group_entity_1 = require("../../entity/product-option-group/product-option-group.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var product_translation_entity_1 = require("../../entity/product/product-translation.entity");
var product_entity_1 = require("../../entity/product/product.entity");
var product_channel_event_1 = require("../../event-bus/events/product-channel-event");
var product_event_1 = require("../../event-bus/events/product-event");
var product_option_group_change_event_1 = require("../../event-bus/events/product-option-group-change-event");
/**
 * @description
 * Contains methods relating to {@link Product} entities.
 *
 * @docsCategory services
 */
var ProductService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductService = _classThis = /** @class */ (function () {
        function ProductService_1(connection, channelService, assetService, productVariantService, facetValueService, listQueryBuilder, translatableSaver, eventBus, slugValidator, customFieldRelationService, translator, productOptionGroupService) {
            this.connection = connection;
            this.channelService = channelService;
            this.assetService = assetService;
            this.productVariantService = productVariantService;
            this.facetValueService = facetValueService;
            this.listQueryBuilder = listQueryBuilder;
            this.translatableSaver = translatableSaver;
            this.eventBus = eventBus;
            this.slugValidator = slugValidator;
            this.customFieldRelationService = customFieldRelationService;
            this.translator = translator;
            this.productOptionGroupService = productOptionGroupService;
            this.relations = ['featuredAsset', 'assets', 'channels', 'facetValues', 'facetValues.facet'];
        }
        ProductService_1.prototype.findAll = function (ctx, options, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var effectiveRelations, customPropertyMap, hasFacetValueIdFilter, hasSkuFilter;
                var _this = this;
                return __generator(this, function (_a) {
                    effectiveRelations = relations || this.relations.slice();
                    customPropertyMap = {};
                    hasFacetValueIdFilter = this.listQueryBuilder.filterObjectHasProperty(options === null || options === void 0 ? void 0 : options.filter, 'facetValueId');
                    hasSkuFilter = this.listQueryBuilder.filterObjectHasProperty(options === null || options === void 0 ? void 0 : options.filter, 'sku');
                    if (hasFacetValueIdFilter) {
                        effectiveRelations.push('facetValues');
                        customPropertyMap.facetValueId = 'facetValues.id';
                    }
                    if (hasSkuFilter) {
                        effectiveRelations.push('variants');
                        customPropertyMap.sku = 'variants.sku';
                    }
                    return [2 /*return*/, this.listQueryBuilder
                            .build(product_entity_1.Product, options, {
                            relations: effectiveRelations,
                            channelId: ctx.channelId,
                            where: { deletedAt: (0, typeorm_1.IsNull)() },
                            ctx: ctx,
                            customPropertyMap: customPropertyMap,
                        })
                            .getManyAndCount()
                            .then(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var items;
                            var _this = this;
                            var products = _b[0], totalItems = _b[1];
                            return __generator(this, function (_c) {
                                items = products.map(function (product) {
                                    return _this.translator.translate(product, ctx, ['facetValues', ['facetValues', 'facet']]);
                                });
                                return [2 /*return*/, {
                                        items: items,
                                        totalItems: totalItems,
                                    }];
                            });
                        }); })];
                });
            });
        };
        ProductService_1.prototype.findOne = function (ctx, productId, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var effectiveRelations, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            effectiveRelations = relations !== null && relations !== void 0 ? relations : this.relations.slice();
                            if (relations && effectiveRelations.includes('facetValues')) {
                                // We need the facet to determine with the FacetValues are public
                                // when serving via the Shop API.
                                effectiveRelations.push('facetValues.facet');
                            }
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, product_entity_1.Product, productId, ctx.channelId, {
                                    relations: (0, unique_1.unique)(effectiveRelations),
                                    where: {
                                        deletedAt: (0, typeorm_1.IsNull)(),
                                    },
                                })];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                return [2 /*return*/];
                            }
                            return [2 /*return*/, this.translator.translate(product, ctx, ['facetValues', ['facetValues', 'facet']])];
                    }
                });
            });
        };
        ProductService_1.prototype.findByIds = function (ctx, productIds, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                var _this = this;
                return __generator(this, function (_a) {
                    qb = this.connection
                        .getRepository(ctx, product_entity_1.Product)
                        .createQueryBuilder('product')
                        .setFindOptions({ relations: (relations && false) || this.relations });
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    typeorm_1.FindOptionsUtils.joinEagerRelations(qb, qb.alias, qb.expressionMap.mainAlias.metadata);
                    return [2 /*return*/, qb
                            .leftJoin('product.channels', 'channel')
                            .andWhere('product.deletedAt IS NULL')
                            .andWhere('product.id IN (:...ids)', { ids: productIds })
                            .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                            .getMany()
                            .then(function (products) {
                            return products.map(function (product) {
                                return _this.translator.translate(product, ctx, ['facetValues', ['facetValues', 'facet']]);
                            });
                        })];
                });
            });
        };
        /**
         * @description
         * Returns all Channels to which the Product is assigned.
         */
        ProductService_1.prototype.getProductChannels = function (ctx, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_entity_1.Product, productId, {
                                relations: ['channels'],
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            product = _a.sent();
                            return [2 /*return*/, product.channels];
                    }
                });
            });
        };
        ProductService_1.prototype.getFacetValuesForProduct = function (ctx, productId) {
            var _this = this;
            return this.connection
                .getRepository(ctx, product_entity_1.Product)
                .findOne({
                where: { id: productId },
                relations: ['facetValues'],
            })
                .then(function (product) {
                if (!product) {
                    return [];
                }
                return product.facetValues.map(function (o) { return _this.translator.translate(o, ctx, ['facet']); });
            });
        };
        ProductService_1.prototype.findOneBySlug = function (ctx, slug, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, translationQb, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = this.connection.getRepository(ctx, product_entity_1.Product).createQueryBuilder('product');
                            translationQb = this.connection
                                .getRepository(ctx, product_translation_entity_1.ProductTranslation)
                                .createQueryBuilder('_product_translation')
                                .select('_product_translation.baseId')
                                .andWhere('_product_translation.slug = :slug', { slug: slug });
                            qb.leftJoin('product.translations', 'translation')
                                .leftJoin('product.channels', 'channel')
                                .andWhere('product.deletedAt IS NULL')
                                .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                                .andWhere('product.id IN (' + translationQb.getQuery() + ')')
                                .setParameters(translationQb.getParameters())
                                .select('product.id', 'id')
                                .addSelect(
                            // eslint-disable-next-line max-len
                            "CASE translation.languageCode WHEN '".concat(ctx.languageCode, "' THEN 2 WHEN '").concat(ctx.channel.defaultLanguageCode, "' THEN 1 ELSE 0 END"), 'sort_order')
                                .orderBy('sort_order', 'DESC');
                            return [4 /*yield*/, qb.getRawOne()];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                return [2 /*return*/, this.findOne(ctx, result.id, relations)];
                            }
                            else {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProductService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.slugValidator.validateSlugs(ctx, input, product_translation_entity_1.ProductTranslation)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: ctx,
                                    input: input,
                                    entityType: product_entity_1.Product,
                                    translationType: product_translation_entity_1.ProductTranslation,
                                    beforeSave: function (p) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, this.channelService.assignToCurrentChannel(p, ctx)];
                                                case 1:
                                                    _b.sent();
                                                    if (!input.facetValueIds) return [3 /*break*/, 3];
                                                    _a = p;
                                                    return [4 /*yield*/, this.facetValueService.findByIds(ctx, input.facetValueIds)];
                                                case 2:
                                                    _a.facetValues = _b.sent();
                                                    _b.label = 3;
                                                case 3: return [4 /*yield*/, this.assetService.updateFeaturedAsset(ctx, p, input)];
                                                case 4:
                                                    _b.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                })];
                        case 2:
                            product = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_entity_1.Product, input, product)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.assetService.updateEntityAssets(ctx, product, input)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_event_1.ProductEvent(ctx, product, 'created', input))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, product.id))];
                    }
                });
            });
        };
        ProductService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var product, updatedProduct;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_entity_1.Product, input.id, {
                                channelId: ctx.channelId,
                                relations: ['facetValues', 'facetValues.channels'],
                            })];
                        case 1:
                            product = _a.sent();
                            return [4 /*yield*/, this.slugValidator.validateSlugs(ctx, input, product_translation_entity_1.ProductTranslation)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.translatableSaver.update({
                                    ctx: ctx,
                                    input: input,
                                    entityType: product_entity_1.Product,
                                    translationType: product_translation_entity_1.ProductTranslation,
                                    beforeSave: function (p) { return __awaiter(_this, void 0, void 0, function () {
                                        var facetValuesInOtherChannels, _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!input.facetValueIds) return [3 /*break*/, 2];
                                                    facetValuesInOtherChannels = product.facetValues.filter(function (fv) {
                                                        return fv.channels.every(function (channel) { return !(0, utils_1.idsAreEqual)(channel.id, ctx.channelId); });
                                                    });
                                                    _a = p;
                                                    _b = [__spreadArray([], facetValuesInOtherChannels, true)];
                                                    return [4 /*yield*/, this.facetValueService.findByIds(ctx, input.facetValueIds)];
                                                case 1:
                                                    _a.facetValues = __spreadArray.apply(void 0, _b.concat([(_c.sent()), true]));
                                                    _c.label = 2;
                                                case 2: return [4 /*yield*/, this.assetService.updateFeaturedAsset(ctx, p, input)];
                                                case 3:
                                                    _c.sent();
                                                    return [4 /*yield*/, this.assetService.updateEntityAssets(ctx, p, input)];
                                                case 4:
                                                    _c.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                })];
                        case 3:
                            updatedProduct = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_entity_1.Product, input, updatedProduct)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_event_1.ProductEvent(ctx, updatedProduct, 'updated', input))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, updatedProduct.id))];
                    }
                });
            });
        };
        ProductService_1.prototype.softDelete = function (ctx, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var product, variantResult, _i, _a, optionGroup, groupResult;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_entity_1.Product, productId, {
                                relationLoadStrategy: 'query',
                                loadEagerRelations: false,
                                channelId: ctx.channelId,
                                relations: ['variants', 'optionGroups'],
                            })];
                        case 1:
                            product = _b.sent();
                            product.deletedAt = new Date();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).save(product, { reload: false })];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_event_1.ProductEvent(ctx, product, 'deleted', productId))];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.productVariantService.softDelete(ctx, product.variants.map(function (v) { return v.id; }))];
                        case 4:
                            variantResult = _b.sent();
                            if (!(variantResult.result === generated_types_1.DeletionResult.NOT_DELETED)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.connection.rollBackTransaction(ctx)];
                        case 5:
                            _b.sent();
                            return [2 /*return*/, variantResult];
                        case 6:
                            _i = 0, _a = product.optionGroups;
                            _b.label = 7;
                        case 7:
                            if (!(_i < _a.length)) return [3 /*break*/, 11];
                            optionGroup = _a[_i];
                            if (!!optionGroup.deletedAt) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.productOptionGroupService.deleteGroupAndOptionsFromProduct(ctx, optionGroup.id, productId)];
                        case 8:
                            groupResult = _b.sent();
                            if (!(groupResult.result === generated_types_1.DeletionResult.NOT_DELETED)) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.connection.rollBackTransaction(ctx)];
                        case 9:
                            _b.sent();
                            return [2 /*return*/, groupResult];
                        case 10:
                            _i++;
                            return [3 /*break*/, 7];
                        case 11: return [2 /*return*/, {
                                result: generated_types_1.DeletionResult.DELETED,
                            }];
                    }
                });
            });
        };
        /**
         * @description
         * Assigns a Product to the specified Channel, and optionally uses a `priceFactor` to set the ProductVariantPrices
         * on the new Channel.
         *
         * Internally, this method will also call {@link ProductVariantService} `assignProductVariantsToChannel()` for
         * each of the Product's variants, and will assign the Product's Assets to the Channel too.
         */
        ProductService_1.prototype.assignProductsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var productsWithVariants, assetIds, products, _i, products_1, product;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).find({
                                where: { id: (0, typeorm_1.In)(input.productIds) },
                                relations: ['variants', 'assets'],
                            })];
                        case 1:
                            productsWithVariants = _c.sent();
                            return [4 /*yield*/, this.productVariantService.assignProductVariantsToChannel(ctx, {
                                    productVariantIds: (_a = []).concat.apply(_a, productsWithVariants.map(function (p) { return p.variants.map(function (v) { return v.id; }); })),
                                    channelId: input.channelId,
                                    priceFactor: input.priceFactor,
                                })];
                        case 2:
                            _c.sent();
                            assetIds = (0, unique_1.unique)((_b = []).concat.apply(_b, productsWithVariants.map(function (p) { return p.assets.map(function (a) { return a.assetId; }); })));
                            return [4 /*yield*/, this.assetService.assignToChannel(ctx, { channelId: input.channelId, assetIds: assetIds })];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, product_entity_1.Product)
                                    .find({ where: { id: (0, typeorm_1.In)(input.productIds) } })];
                        case 4:
                            products = _c.sent();
                            _i = 0, products_1 = products;
                            _c.label = 5;
                        case 5:
                            if (!(_i < products_1.length)) return [3 /*break*/, 8];
                            product = products_1[_i];
                            return [4 /*yield*/, this.eventBus.publish(new product_channel_event_1.ProductChannelEvent(ctx, product, input.channelId, 'assigned'))];
                        case 6:
                            _c.sent();
                            _c.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 5];
                        case 8: return [2 /*return*/, this.findByIds(ctx, productsWithVariants.map(function (p) { return p.id; }))];
                    }
                });
            });
        };
        ProductService_1.prototype.removeProductsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var productsWithVariants, products, _i, products_2, product;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).find({
                                where: { id: (0, typeorm_1.In)(input.productIds) },
                                relations: ['variants'],
                            })];
                        case 1:
                            productsWithVariants = _b.sent();
                            return [4 /*yield*/, this.productVariantService.removeProductVariantsFromChannel(ctx, {
                                    productVariantIds: (_a = []).concat.apply(_a, productsWithVariants.map(function (p) { return p.variants.map(function (v) { return v.id; }); })),
                                    channelId: input.channelId,
                                })];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, product_entity_1.Product)
                                    .find({ where: { id: (0, typeorm_1.In)(input.productIds) } })];
                        case 3:
                            products = _b.sent();
                            _i = 0, products_2 = products;
                            _b.label = 4;
                        case 4:
                            if (!(_i < products_2.length)) return [3 /*break*/, 7];
                            product = products_2[_i];
                            return [4 /*yield*/, this.eventBus.publish(new product_channel_event_1.ProductChannelEvent(ctx, product, input.channelId, 'removed'))];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 4];
                        case 7: return [2 /*return*/, this.findByIds(ctx, productsWithVariants.map(function (p) { return p.id; }))];
                    }
                });
            });
        };
        ProductService_1.prototype.addOptionGroupToProduct = function (ctx, productId, optionGroupId) {
            return __awaiter(this, void 0, void 0, function () {
                var product, optionGroup, translated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getProductWithOptionGroups(ctx, productId)];
                        case 1:
                            product = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_option_group_entity_1.ProductOptionGroup).findOne({
                                    where: { id: optionGroupId },
                                    relations: ['product'],
                                })];
                        case 2:
                            optionGroup = _a.sent();
                            if (!optionGroup) {
                                throw new errors_1.EntityNotFoundError('ProductOptionGroup', optionGroupId);
                            }
                            if (optionGroup.product) {
                                translated = this.translator.translate(optionGroup.product, ctx);
                                throw new errors_1.UserInputError('error.product-option-group-already-assigned', {
                                    groupCode: optionGroup.code,
                                    productName: translated.name,
                                });
                            }
                            if (Array.isArray(product.optionGroups)) {
                                product.optionGroups.push(optionGroup);
                            }
                            else {
                                product.optionGroups = [optionGroup];
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).save(product, { reload: false })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_option_group_change_event_1.ProductOptionGroupChangeEvent(ctx, product, optionGroupId, 'assigned'))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, productId))];
                    }
                });
            });
        };
        ProductService_1.prototype.removeOptionGroupFromProduct = function (ctx, productId, optionGroupId, force) {
            return __awaiter(this, void 0, void 0, function () {
                var product, optionGroup, optionIsInUse, _i, _a, variant, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getProductWithOptionGroups(ctx, productId)];
                        case 1:
                            product = _b.sent();
                            optionGroup = product.optionGroups.find(function (g) { return (0, utils_1.idsAreEqual)(g.id, optionGroupId); });
                            if (!optionGroup) {
                                throw new errors_1.EntityNotFoundError('ProductOptionGroup', optionGroupId);
                            }
                            optionIsInUse = product.variants.some(function (variant) {
                                return variant.deletedAt == null &&
                                    variant.options.some(function (option) { return (0, utils_1.idsAreEqual)(option.groupId, optionGroupId); });
                            });
                            if (!optionIsInUse) return [3 /*break*/, 4];
                            if (!!force) return [3 /*break*/, 2];
                            return [2 /*return*/, new generated_graphql_admin_errors_1.ProductOptionInUseError({
                                    optionGroupCode: optionGroup.code,
                                    productVariantCount: product.variants.length,
                                })];
                        case 2:
                            // We will force the removal of this ProductOptionGroup by first
                            // removing all ProductOptions from the ProductVariants
                            for (_i = 0, _a = product.variants; _i < _a.length; _i++) {
                                variant = _a[_i];
                                variant.options = variant.options.filter(function (o) { return !(0, utils_1.idsAreEqual)(o.groupId, optionGroupId); });
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).save(product.variants, {
                                    reload: false,
                                })];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.productOptionGroupService.deleteGroupAndOptionsFromProduct(ctx, optionGroupId, productId)];
                        case 5:
                            result = _b.sent();
                            product.optionGroups = product.optionGroups.filter(function (g) { return g.id !== optionGroupId; });
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).save(product, { reload: false })];
                        case 6:
                            _b.sent();
                            if (result.result === generated_types_1.DeletionResult.NOT_DELETED) {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                throw new errors_1.InternalServerError(result.message);
                            }
                            return [4 /*yield*/, this.eventBus.publish(new product_option_group_change_event_1.ProductOptionGroupChangeEvent(ctx, product, optionGroupId, 'removed'))];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, productId))];
                    }
                });
            });
        };
        ProductService_1.prototype.getProductWithOptionGroups = function (ctx, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).findOne({
                                relationLoadStrategy: 'query',
                                loadEagerRelations: false,
                                where: { id: productId, deletedAt: (0, typeorm_1.IsNull)() },
                                relations: ['optionGroups', 'variants', 'variants.options'],
                            })];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                throw new errors_1.EntityNotFoundError('Product', productId);
                            }
                            return [2 /*return*/, product];
                    }
                });
            });
        };
        return ProductService_1;
    }());
    __setFunctionName(_classThis, "ProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductService = _classThis;
}();
exports.ProductService = ProductService;
