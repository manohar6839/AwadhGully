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
exports.AssetService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var omit_1 = require("@vendure/common/lib/omit");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var unique_1 = require("@vendure/common/lib/unique");
var fs_1 = require("fs");
var fs_extra_1 = require("fs-extra");
var http_1 = require("http");
var mime_types_1 = require("mime-types");
var path_1 = require("path");
var typeorm_1 = require("typeorm");
var StringUtils_1 = require("typeorm/util/StringUtils");
var request_context_1 = require("../../api/common/request-context");
var common_2 = require("../../common");
var error_result_1 = require("../../common/error/error-result");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var asset_entity_1 = require("../../entity/asset/asset.entity");
var collection_entity_1 = require("../../entity/collection/collection.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var product_entity_1 = require("../../entity/product/product.entity");
var asset_channel_event_1 = require("../../event-bus/events/asset-channel-event");
var asset_event_1 = require("../../event-bus/events/asset-event");
var patch_entity_1 = require("../helpers/utils/patch-entity");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var sizeOf = require('image-size');
/**
 * @description
 * Contains methods relating to {@link Asset} entities.
 *
 * @docsCategory services
 * @docsWeight 0
 */
var AssetService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, common_2.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AssetService = _classThis = /** @class */ (function () {
        function AssetService_1(connection, configService, listQueryBuilder, eventBus, tagService, channelService, roleService, customFieldRelationService) {
            this.connection = connection;
            this.configService = configService;
            this.listQueryBuilder = listQueryBuilder;
            this.eventBus = eventBus;
            this.tagService = tagService;
            this.channelService = channelService;
            this.roleService = roleService;
            this.customFieldRelationService = customFieldRelationService;
            this.permittedMimeTypes = [];
            this.permittedMimeTypes = this.configService.assetOptions.permittedFileTypes
                .map(function (val) { return (/\.[\w]+/.test(val) ? mime_types_1.default.lookup(val) || undefined : val); })
                .filter(shared_utils_1.notNullOrUndefined)
                .map(function (val) {
                var _a = val.split('/'), type = _a[0], subtype = _a[1];
                return { type: type, subtype: subtype };
            });
        }
        AssetService_1.prototype.findOne = function (ctx, id, relations) {
            return this.connection
                .findOneInChannel(ctx, asset_entity_1.Asset, id, ctx.channelId, {
                relations: relations !== null && relations !== void 0 ? relations : [],
            })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        AssetService_1.prototype.findAll = function (ctx, options, relations) {
            var _a;
            var qb = this.listQueryBuilder.build(asset_entity_1.Asset, options, {
                ctx: ctx,
                relations: __spreadArray(__spreadArray([], (relations !== null && relations !== void 0 ? relations : []), true), ['tags'], false),
                channelId: ctx.channelId,
            });
            var tags = options === null || options === void 0 ? void 0 : options.tags;
            if (tags && tags.length) {
                var operator = (_a = options === null || options === void 0 ? void 0 : options.tagsOperator) !== null && _a !== void 0 ? _a : generated_types_1.LogicalOperator.AND;
                var subquery = qb.connection
                    .createQueryBuilder()
                    .select('asset.id')
                    .from(asset_entity_1.Asset, 'asset')
                    .leftJoin('asset.tags', 'tags')
                    .where('tags.value IN (:...tags)');
                if (operator === generated_types_1.LogicalOperator.AND) {
                    subquery.groupBy('asset.id').having('COUNT(asset.id) = :tagCount');
                }
                qb.andWhere("asset.id IN (".concat(subquery.getQuery(), ")")).setParameters({
                    tags: tags,
                    tagCount: tags.length,
                });
            }
            return qb.getManyAndCount().then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items,
                    totalItems: totalItems,
                });
            });
        };
        AssetService_1.prototype.getFeaturedAsset = function (ctx, entity) {
            return __awaiter(this, void 0, void 0, function () {
                var entityType, entityWithFeaturedAsset;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entityType = Object.getPrototypeOf(entity).constructor;
                            if (!this.channelService.isChannelAware(entity)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, entityType, entity.id, ctx.channelId, {
                                    relations: ['featuredAsset'],
                                    loadEagerRelations: false,
                                })];
                        case 1:
                            entityWithFeaturedAsset = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.connection
                                .getRepository(ctx, entityType)
                                .findOne({
                                where: { id: entity.id },
                                relations: {
                                    featuredAsset: true,
                                },
                                loadEagerRelations: false,
                                // TODO: satisfies
                            })
                                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                        case 3:
                            entityWithFeaturedAsset = _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, (entityWithFeaturedAsset && entityWithFeaturedAsset.featuredAsset) || undefined];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the Assets of an entity which has a well-ordered list of Assets, such as Product,
         * ProductVariant or Collection.
         */
        AssetService_1.prototype.getEntityAssets = function (ctx, entity) {
            return __awaiter(this, void 0, void 0, function () {
                var orderableAssets, entityType, entityWithAssets, assetsInChannel_1;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            orderableAssets = entity.assets;
                            if (!!orderableAssets) return [3 /*break*/, 2];
                            entityType = Object.getPrototypeOf(entity).constructor;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entityType)
                                    .createQueryBuilder('entity')
                                    .leftJoinAndSelect('entity.assets', 'orderable_asset')
                                    .leftJoinAndSelect('orderable_asset.asset', 'asset')
                                    .leftJoinAndSelect('asset.channels', 'asset_channel')
                                    .where('entity.id = :id', { id: entity.id })
                                    .andWhere('asset_channel.id = :channelId', { channelId: ctx.channelId })
                                    .getOne()];
                        case 1:
                            entityWithAssets = _c.sent();
                            orderableAssets = (_a = entityWithAssets === null || entityWithAssets === void 0 ? void 0 : entityWithAssets.assets) !== null && _a !== void 0 ? _a : [];
                            return [3 /*break*/, 7];
                        case 2:
                            if (!(0 < orderableAssets.length)) return [3 /*break*/, 6];
                            if (!((_b = orderableAssets[0].asset) === null || _b === void 0 ? void 0 : _b.channels)) return [3 /*break*/, 3];
                            orderableAssets = orderableAssets.filter(function (a) { return !!a.asset.channels.map(function (c) { return c.id; }).find(function (id) { return (0, utils_1.idsAreEqual)(id, ctx.channelId); }); });
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.connection
                                .getRepository(ctx, asset_entity_1.Asset)
                                .createQueryBuilder('asset')
                                .leftJoinAndSelect('asset.channels', 'asset_channel')
                                .where('asset.id IN (:...ids)', { ids: orderableAssets.map(function (a) { return a.assetId; }) })
                                .andWhere('asset_channel.id = :channelId', { channelId: ctx.channelId })
                                .getMany()];
                        case 4:
                            assetsInChannel_1 = _c.sent();
                            orderableAssets = orderableAssets.filter(function (oa) { return !!assetsInChannel_1.find(function (a) { return (0, utils_1.idsAreEqual)(a.id, oa.assetId); }); });
                            _c.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            orderableAssets = [];
                            _c.label = 7;
                        case 7: return [2 /*return*/, orderableAssets.sort(function (a, b) { return a.position - b.position; }).map(function (a) { return a.asset; })];
                    }
                });
            });
        };
        AssetService_1.prototype.updateFeaturedAsset = function (ctx, entity, input) {
            return __awaiter(this, void 0, void 0, function () {
                var assetIds, featuredAssetId, featuredAsset;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            assetIds = input.assetIds, featuredAssetId = input.featuredAssetId;
                            if (featuredAssetId === null || (assetIds && assetIds.length === 0)) {
                                entity.featuredAsset = null;
                                return [2 /*return*/, entity];
                            }
                            if (featuredAssetId === undefined) {
                                return [2 /*return*/, entity];
                            }
                            return [4 /*yield*/, this.findOne(ctx, featuredAssetId)];
                        case 1:
                            featuredAsset = _a.sent();
                            if (featuredAsset) {
                                entity.featuredAsset = featuredAsset;
                            }
                            return [2 /*return*/, entity];
                    }
                });
            });
        };
        /**
         * @description
         * Updates the assets / featuredAsset of an entity, ensuring that only valid assetIds are used.
         */
        AssetService_1.prototype.updateEntityAssets = function (ctx, entity, input) {
            return __awaiter(this, void 0, void 0, function () {
                var assetIds, assets_1, sortedAssets, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!entity.id) {
                                throw new errors_1.InternalServerError('error.entity-must-have-an-id');
                            }
                            assetIds = input.assetIds;
                            if (!(assetIds && assetIds.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.connection.findByIdsInChannel(ctx, asset_entity_1.Asset, assetIds, ctx.channelId, {})];
                        case 1:
                            assets_1 = _b.sent();
                            sortedAssets = assetIds
                                .map(function (id) { return assets_1.find(function (a) { return (0, utils_1.idsAreEqual)(a.id, id); }); })
                                .filter(shared_utils_1.notNullOrUndefined);
                            return [4 /*yield*/, this.removeExistingOrderableAssets(ctx, entity)];
                        case 2:
                            _b.sent();
                            _a = entity;
                            return [4 /*yield*/, this.createOrderableAssets(ctx, entity, sortedAssets)];
                        case 3:
                            _a.assets = _b.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            if (!(assetIds && assetIds.length === 0)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.removeExistingOrderableAssets(ctx, entity)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6: return [2 /*return*/, entity];
                    }
                });
            });
        };
        /**
         * @description
         * Create an Asset based on a file uploaded via the GraphQL API. The file should be uploaded
         * using the [GraphQL multipart request specification](https://github.com/jaydenseric/graphql-multipart-request-spec),
         * e.g. using the [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client) npm package.
         *
         * See the [Uploading Files docs](/guides/developer-guide/uploading-files) for an example of usage.
         */
        AssetService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, createReadStream, filename, mimetype, _b, stream, errorPromise, result, tags;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, input.file];
                        case 1:
                            _a = _c.sent(), createReadStream = _a.createReadStream, filename = _a.filename, mimetype = _a.mimetype;
                            _b = this.makeStreamGuard(createReadStream), stream = _b.stream, errorPromise = _b.errorPromise;
                            return [4 /*yield*/, Promise.race([
                                    this.createAssetInternal(ctx, stream, filename, mimetype, input.customFields),
                                    errorPromise,
                                ])];
                        case 2:
                            result = _c.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, asset_entity_1.Asset, input, result)];
                        case 3:
                            _c.sent();
                            if (!input.tags) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.tagService.valuesToTags(ctx, input.tags)];
                        case 4:
                            tags = _c.sent();
                            result.tags = tags;
                            return [4 /*yield*/, this.connection.getRepository(ctx, asset_entity_1.Asset).save(result)];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [4 /*yield*/, this.eventBus.publish(new asset_event_1.AssetEvent(ctx, result, 'created', input))];
                        case 7:
                            _c.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @description
         * Updates the name, focalPoint, tags & custom fields of an Asset.
         */
        AssetService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var asset, to3dp, _a, updatedAsset;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, asset_entity_1.Asset, input.id)];
                        case 1:
                            asset = _b.sent();
                            if (input.focalPoint) {
                                to3dp = function (x) { return +x.toFixed(3); };
                                input.focalPoint.x = to3dp(input.focalPoint.x);
                                input.focalPoint.y = to3dp(input.focalPoint.y);
                            }
                            (0, patch_entity_1.patchEntity)(asset, (0, omit_1.omit)(input, ['tags']));
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, asset_entity_1.Asset, input, asset)];
                        case 2:
                            _b.sent();
                            if (!input.tags) return [3 /*break*/, 4];
                            _a = asset;
                            return [4 /*yield*/, this.tagService.valuesToTags(ctx, input.tags)];
                        case 3:
                            _a.tags = _b.sent();
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.connection.getRepository(ctx, asset_entity_1.Asset).save(asset)];
                        case 5:
                            updatedAsset = _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new asset_event_1.AssetEvent(ctx, updatedAsset, 'updated', input))];
                        case 6:
                            _b.sent();
                            return [2 /*return*/, updatedAsset];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes an Asset after performing checks to ensure that the Asset is not currently in use
         * by a Product, ProductVariant or Collection.
         */
        AssetService_1.prototype.delete = function (ctx_1, ids_1) {
            return __awaiter(this, arguments, void 0, function (ctx, ids, force, deleteFromAllChannels) {
                var assets, channelsOfAssets, usageCount, _i, assets_2, asset, usages, hasUsages, hasDeleteAllPermission, isOnlyChannel;
                var _this = this;
                if (force === void 0) { force = false; }
                if (deleteFromAllChannels === void 0) { deleteFromAllChannels = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findByIdsInChannel(ctx, asset_entity_1.Asset, ids, ctx.channelId, {
                                relations: ['channels'],
                            })];
                        case 1:
                            assets = _a.sent();
                            channelsOfAssets = [];
                            assets.forEach(function (a) { return a.channels.forEach(function (c) { return channelsOfAssets.push(c.id); }); });
                            channelsOfAssets = (0, unique_1.unique)(channelsOfAssets);
                            usageCount = {
                                products: 0,
                                variants: 0,
                                collections: 0,
                            };
                            _i = 0, assets_2 = assets;
                            _a.label = 2;
                        case 2:
                            if (!(_i < assets_2.length)) return [3 /*break*/, 5];
                            asset = assets_2[_i];
                            return [4 /*yield*/, this.findAssetUsages(ctx, asset)];
                        case 3:
                            usages = _a.sent();
                            usageCount.products += usages.products.length;
                            usageCount.variants += usages.variants.length;
                            usageCount.collections += usages.collections.length;
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            hasUsages = !!(usageCount.products || usageCount.variants || usageCount.collections);
                            if (hasUsages && !force) {
                                return [2 /*return*/, {
                                        result: generated_types_1.DeletionResult.NOT_DELETED,
                                        message: ctx.translate('message.asset-to-be-deleted-is-featured', {
                                            assetCount: assets.length,
                                            products: usageCount.products,
                                            variants: usageCount.variants,
                                            collections: usageCount.collections,
                                        }),
                                    }];
                            }
                            return [4 /*yield*/, this.hasDeletePermissionForChannels(ctx, channelsOfAssets)];
                        case 6:
                            hasDeleteAllPermission = _a.sent();
                            if (deleteFromAllChannels && !hasDeleteAllPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            if (!!deleteFromAllChannels) return [3 /*break*/, 10];
                            return [4 /*yield*/, Promise.all(assets.map(function (asset) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.channelService.removeFromChannels(ctx, asset_entity_1.Asset, asset.id, [ctx.channelId])];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, this.eventBus.publish(new asset_channel_event_1.AssetChannelEvent(ctx, asset, ctx.channelId, 'removed'))];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 7:
                            _a.sent();
                            isOnlyChannel = channelsOfAssets.length === 1;
                            if (!isOnlyChannel) return [3 /*break*/, 9];
                            // only channel, so also delete asset
                            return [4 /*yield*/, this.deleteUnconditional(ctx, assets)];
                        case 8:
                            // only channel, so also delete asset
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2 /*return*/, {
                                result: generated_types_1.DeletionResult.DELETED,
                            }];
                        case 10: 
                        // This leaves us with deleteFromAllChannels with force or deleteFromAllChannels with no current usages
                        return [4 /*yield*/, Promise.all(assets.map(function (asset) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.channelService.removeFromChannels(ctx, asset_entity_1.Asset, asset.id, channelsOfAssets)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.eventBus.publish(new asset_channel_event_1.AssetChannelEvent(ctx, asset, ctx.channelId, 'removed'))];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 11:
                            // This leaves us with deleteFromAllChannels with force or deleteFromAllChannels with no current usages
                            _a.sent();
                            return [2 /*return*/, this.deleteUnconditional(ctx, assets)];
                    }
                });
            });
        };
        AssetService_1.prototype.assignToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, assets;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasPermissionOnChannel(ctx, input.channelId, generated_types_1.Permission.UpdateCatalog)];
                        case 1:
                            hasPermission = _a.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.connection.findByIdsInChannel(ctx, asset_entity_1.Asset, input.assetIds, ctx.channelId, {})];
                        case 2:
                            assets = _a.sent();
                            return [4 /*yield*/, Promise.all(assets.map(function (asset) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.channelService.assignToChannels(ctx, asset_entity_1.Asset, asset.id, [input.channelId])];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, this.eventBus.publish(new asset_channel_event_1.AssetChannelEvent(ctx, asset, input.channelId, 'assigned'))];
                                            case 2: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                }); }))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.connection.findByIdsInChannel(ctx, asset_entity_1.Asset, assets.map(function (a) { return a.id; }), ctx.channelId, {})];
                    }
                });
            });
        };
        AssetService_1.prototype.createFromFileStream = function (stream, maybeFilePathOrCtx, maybeCtx) {
            return __awaiter(this, void 0, void 0, function () {
                var assetImportStrategy, filePathFromArgs, filePath, filename, mimetype, ctx;
                return __generator(this, function (_a) {
                    assetImportStrategy = this.configService.importExportOptions.assetImportStrategy;
                    filePathFromArgs = maybeFilePathOrCtx instanceof request_context_1.RequestContext ? undefined : maybeFilePathOrCtx;
                    filePath = stream instanceof fs_extra_1.ReadStream || stream instanceof fs_1.ReadStream ? stream.path : filePathFromArgs;
                    if (typeof filePath === 'string') {
                        filename = path_1.default.basename(filePath).split('?')[0];
                        mimetype = this.getMimeType(stream, filename);
                        ctx = maybeFilePathOrCtx instanceof request_context_1.RequestContext
                            ? maybeFilePathOrCtx
                            : maybeCtx instanceof request_context_1.RequestContext
                                ? maybeCtx
                                : request_context_1.RequestContext.empty();
                        return [2 /*return*/, this.createAssetInternal(ctx, stream, filename, mimetype)];
                    }
                    else {
                        throw new errors_1.InternalServerError('error.path-should-be-a-string-got-buffer');
                    }
                    return [2 /*return*/];
                });
            });
        };
        AssetService_1.prototype.getMimeType = function (stream, filename) {
            if (stream instanceof http_1.IncomingMessage) {
                var contentType = stream.headers['content-type'];
                if (contentType) {
                    return contentType;
                }
            }
            return mime_types_1.default.lookup(filename) || 'application/octet-stream';
        };
        /**
         * @description
         * Unconditionally delete given assets.
         * Does not remove assets from channels
         */
        AssetService_1.prototype.deleteUnconditional = function (ctx, assets) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, assets_3, asset, deletedAsset, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, assets_3 = assets;
                            _a.label = 1;
                        case 1:
                            if (!(_i < assets_3.length)) return [3 /*break*/, 10];
                            asset = assets_3[_i];
                            deletedAsset = new asset_entity_1.Asset(asset);
                            return [4 /*yield*/, this.connection.getRepository(ctx, asset_entity_1.Asset).remove(asset)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 6, , 7]);
                            return [4 /*yield*/, this.configService.assetOptions.assetStorageStrategy.deleteFile(asset.source)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.configService.assetOptions.assetStorageStrategy.deleteFile(asset.preview)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            vendure_logger_1.Logger.error('error.could-not-delete-asset-file', undefined, e_1.stack);
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.eventBus.publish(new asset_event_1.AssetEvent(ctx, deletedAsset, 'deleted', deletedAsset.id))];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 1];
                        case 10: return [2 /*return*/, {
                                result: generated_types_1.DeletionResult.DELETED,
                            }];
                    }
                });
            });
        };
        /**
         * Check if current user has permissions to delete assets from all channels
         */
        AssetService_1.prototype.hasDeletePermissionForChannels = function (ctx, channelIds) {
            return __awaiter(this, void 0, void 0, function () {
                var permissions;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(channelIds.map(function (channelId) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, this.roleService.userHasPermissionOnChannel(ctx, channelId, generated_types_1.Permission.DeleteCatalog)];
                                });
                            }); }))];
                        case 1:
                            permissions = _a.sent();
                            return [2 /*return*/, !permissions.includes(false)];
                    }
                });
            });
        };
        AssetService_1.prototype.createAssetInternal = function (ctx, stream, filename, mimetype, customFields) {
            return __awaiter(this, void 0, void 0, function () {
                var assetOptions, assetPreviewStrategy, assetStorageStrategy, sourceFileName, previewFileName, sourceFileIdentifier, sourceFile, preview, e_2, message, previewFileIdentifier, type, _a, width, height, asset;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            assetOptions = this.configService.assetOptions;
                            if (!this.validateMimeType(mimetype)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.MimeTypeError({ fileName: filename, mimeType: mimetype })];
                            }
                            assetPreviewStrategy = assetOptions.assetPreviewStrategy, assetStorageStrategy = assetOptions.assetStorageStrategy;
                            return [4 /*yield*/, this.getSourceFileName(ctx, filename)];
                        case 1:
                            sourceFileName = _b.sent();
                            return [4 /*yield*/, this.getPreviewFileName(ctx, sourceFileName)];
                        case 2:
                            previewFileName = _b.sent();
                            return [4 /*yield*/, assetStorageStrategy.writeFileFromStream(sourceFileName, stream)];
                        case 3:
                            sourceFileIdentifier = _b.sent();
                            return [4 /*yield*/, assetStorageStrategy.readFileToBuffer(sourceFileIdentifier)];
                        case 4:
                            sourceFile = _b.sent();
                            _b.label = 5;
                        case 5:
                            _b.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, assetPreviewStrategy.generatePreviewImage(ctx, mimetype, sourceFile)];
                        case 6:
                            preview = _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            e_2 = _b.sent();
                            message = typeof e_2.message === 'string' ? e_2.message : e_2.message.toString();
                            vendure_logger_1.Logger.error("Could not create Asset preview image: ".concat(message), undefined, e_2.stack);
                            throw e_2;
                        case 8: return [4 /*yield*/, assetStorageStrategy.writeFileFromBuffer(previewFileName, preview)];
                        case 9:
                            previewFileIdentifier = _b.sent();
                            type = (0, utils_1.getAssetType)(mimetype);
                            _a = this.getDimensions(type === generated_types_1.AssetType.IMAGE ? sourceFile : preview), width = _a.width, height = _a.height;
                            asset = new asset_entity_1.Asset({
                                type: type,
                                width: width,
                                height: height,
                                name: path_1.default.basename(sourceFileName),
                                fileSize: sourceFile.byteLength,
                                mimeType: mimetype,
                                source: sourceFileIdentifier,
                                preview: previewFileIdentifier,
                                focalPoint: null,
                                customFields: customFields,
                            });
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(asset, ctx)];
                        case 10:
                            _b.sent();
                            return [2 /*return*/, this.connection.getRepository(ctx, asset_entity_1.Asset).save(asset)];
                    }
                });
            });
        };
        AssetService_1.prototype.getSourceFileName = function (ctx, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var assetOptions;
                return __generator(this, function (_a) {
                    assetOptions = this.configService.assetOptions;
                    return [2 /*return*/, this.generateUniqueName(fileName, function (name, conflict) {
                            return assetOptions.assetNamingStrategy.generateSourceFileName(ctx, name, conflict);
                        })];
                });
            });
        };
        AssetService_1.prototype.getPreviewFileName = function (ctx, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var assetOptions;
                return __generator(this, function (_a) {
                    assetOptions = this.configService.assetOptions;
                    return [2 /*return*/, this.generateUniqueName(fileName, function (name, conflict) {
                            return assetOptions.assetNamingStrategy.generatePreviewFileName(ctx, name, conflict);
                        })];
                });
            });
        };
        AssetService_1.prototype.generateUniqueName = function (inputFileName, generateNameFn) {
            return __awaiter(this, void 0, void 0, function () {
                var assetOptions, outputFileName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            assetOptions = this.configService.assetOptions;
                            _a.label = 1;
                        case 1:
                            outputFileName = generateNameFn(inputFileName, outputFileName);
                            _a.label = 2;
                        case 2: return [4 /*yield*/, assetOptions.assetStorageStrategy.fileExists(outputFileName)];
                        case 3:
                            if (_a.sent()) return [3 /*break*/, 1];
                            _a.label = 4;
                        case 4: return [2 /*return*/, outputFileName];
                    }
                });
            });
        };
        AssetService_1.prototype.getDimensions = function (imageFile) {
            try {
                var _a = sizeOf(imageFile), width = _a.width, height = _a.height;
                return { width: width, height: height };
            }
            catch (e) {
                vendure_logger_1.Logger.error('Could not determine Asset dimensions: ' + JSON.stringify(e));
                return { width: 0, height: 0 };
            }
        };
        AssetService_1.prototype.createOrderableAssets = function (ctx, entity, assets) {
            var _this = this;
            var orderableAssets = assets.map(function (asset, i) { return _this.getOrderableAsset(ctx, entity, asset, i); });
            return this.connection.getRepository(ctx, orderableAssets[0].constructor).save(orderableAssets);
        };
        AssetService_1.prototype.getOrderableAsset = function (ctx, entity, asset, index) {
            var _a;
            var entityIdProperty = this.getHostEntityIdProperty(entity);
            var orderableAssetType = this.getOrderableAssetType(ctx, entity);
            return new orderableAssetType((_a = {
                    assetId: asset.id,
                    position: index
                },
                _a[entityIdProperty] = entity.id,
                _a));
        };
        AssetService_1.prototype.removeExistingOrderableAssets = function (ctx, entity) {
            return __awaiter(this, void 0, void 0, function () {
                var propertyName, orderableAssetType;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            propertyName = this.getHostEntityIdProperty(entity);
                            orderableAssetType = this.getOrderableAssetType(ctx, entity);
                            return [4 /*yield*/, this.connection.getRepository(ctx, orderableAssetType).delete((_a = {},
                                    _a[propertyName] = entity.id,
                                    _a))];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AssetService_1.prototype.getOrderableAssetType = function (ctx, entity) {
            var assetRelation = this.connection
                .getRepository(ctx, entity.constructor)
                .metadata.relations.find(function (r) { return r.propertyName === 'assets'; });
            if (!assetRelation || typeof assetRelation.type === 'string') {
                throw new errors_1.InternalServerError('error.could-not-find-matching-orderable-asset');
            }
            return assetRelation.type;
        };
        AssetService_1.prototype.getHostEntityIdProperty = function (entity) {
            var entityName = entity.constructor.name;
            switch (entityName) {
                case 'Product':
                    return 'productId';
                case 'ProductVariant':
                    return 'productVariantId';
                case 'Collection':
                    return 'collectionId';
                default:
                    return "".concat((0, StringUtils_1.camelCase)(entityName), "Id");
            }
        };
        AssetService_1.prototype.validateMimeType = function (mimeType) {
            var _a = mimeType.split('/'), type = _a[0], subtype = _a[1];
            var typeMatches = this.permittedMimeTypes.filter(function (t) { return t.type === type; });
            for (var _i = 0, typeMatches_1 = typeMatches; _i < typeMatches_1.length; _i++) {
                var match = typeMatches_1[_i];
                if (match.subtype === subtype || match.subtype === '*') {
                    return true;
                }
            }
            return false;
        };
        /**
         * Find the entities which reference the given Asset as a featuredAsset.
         */
        AssetService_1.prototype.findAssetUsages = function (ctx, asset) {
            return __awaiter(this, void 0, void 0, function () {
                var products, variants, collections;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).find({
                                where: {
                                    featuredAsset: { id: asset.id },
                                    deletedAt: (0, typeorm_1.IsNull)(),
                                },
                            })];
                        case 1:
                            products = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).find({
                                    where: {
                                        featuredAsset: { id: asset.id },
                                        deletedAt: (0, typeorm_1.IsNull)(),
                                    },
                                })];
                        case 2:
                            variants = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, collection_entity_1.Collection).find({
                                    where: {
                                        featuredAsset: { id: asset.id },
                                    },
                                })];
                        case 3:
                            collections = _a.sent();
                            return [2 /*return*/, { products: products, variants: variants, collections: collections }];
                    }
                });
            });
        };
        AssetService_1.prototype.makeStreamGuard = function (createReadStream) {
            var onReject;
            var errorPromise = new Promise(function (_, rej) {
                onReject = rej;
            });
            // `fs-capacitor`'s `createReadStream` can throw if its `WriteStream` has already been destroyed
            // sync error so will bubble to consumer immediately
            var stream = createReadStream();
            stream.on('error', function (err) {
                onReject(err);
            });
            return { stream: stream, errorPromise: errorPromise };
        };
        return AssetService_1;
    }());
    __setFunctionName(_classThis, "AssetService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AssetService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AssetService = _classThis;
}();
exports.AssetService = AssetService;
