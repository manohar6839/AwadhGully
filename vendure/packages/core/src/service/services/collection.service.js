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
exports.CollectionService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var pick_1 = require("@vendure/common/lib/pick");
var shared_constants_1 = require("@vendure/common/lib/shared-constants");
var unique_1 = require("@vendure/common/lib/unique");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var collection_translation_entity_1 = require("../../entity/collection/collection-translation.entity");
var collection_entity_1 = require("../../entity/collection/collection.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var collection_event_1 = require("../../event-bus/events/collection-event");
var collection_modification_event_1 = require("../../event-bus/events/collection-modification-event");
var product_event_1 = require("../../event-bus/events/product-event");
var product_variant_event_1 = require("../../event-bus/events/product-variant-event");
var move_to_index_1 = require("../helpers/utils/move-to-index");
/**
 * @description
 * Contains methods relating to {@link Collection} entities.
 *
 * @docsCategory services
 */
var CollectionService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CollectionService = _classThis = /** @class */ (function () {
        function CollectionService_1(connection, channelService, assetService, listQueryBuilder, translatableSaver, eventBus, jobQueueService, configService, slugValidator, configArgService, customFieldRelationService, translator, roleService, requestContextService) {
            this.connection = connection;
            this.channelService = channelService;
            this.assetService = assetService;
            this.listQueryBuilder = listQueryBuilder;
            this.translatableSaver = translatableSaver;
            this.eventBus = eventBus;
            this.jobQueueService = jobQueueService;
            this.configService = configService;
            this.slugValidator = slugValidator;
            this.configArgService = configArgService;
            this.customFieldRelationService = customFieldRelationService;
            this.translator = translator;
            this.roleService = roleService;
            this.requestContextService = requestContextService;
            this.applyAllFiltersOnProductUpdates = true;
            this.chunkArray = function (array, chunkSize) {
                var results = [];
                for (var i = 0; i < array.length; i += chunkSize) {
                    results.push(array.slice(i, i + chunkSize));
                }
                return results;
            };
        }
        /**
         * @internal
         */
        CollectionService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var productEvents$, variantEvents$, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            productEvents$ = this.eventBus.ofType(product_event_1.ProductEvent);
                            variantEvents$ = this.eventBus.ofType(product_variant_event_1.ProductVariantEvent);
                            (0, rxjs_1.merge)(productEvents$, variantEvents$)
                                .pipe((0, operators_1.filter)(function () {
                                if (!_this.applyAllFiltersOnProductUpdates) {
                                    vendure_logger_1.Logger.debug("Detected product data change, but skipping applyCollectionFilters because applyAllFiltersOnProductUpdates = false");
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }), (0, operators_1.debounceTime)(50))
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                .subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.triggerApplyFiltersJob(event.ctx)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            _a = this;
                            return [4 /*yield*/, this.jobQueueService.createQueue({
                                    name: 'apply-collection-filters',
                                    process: function (job) { return __awaiter(_this, void 0, void 0, function () {
                                        var ctx, collectionIds, collections, completed, _loop_1, this_1, _i, collectionIds_1, collectionId;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.requestContextService.create({
                                                        apiType: 'admin',
                                                        languageCode: job.data.ctx.languageCode,
                                                        channelOrToken: job.data.ctx.channelToken,
                                                    })];
                                                case 1:
                                                    ctx = _a.sent();
                                                    collectionIds = job.data.collectionIds;
                                                    if (!(collectionIds.length === 0)) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, this.connection.rawConnection
                                                            .getRepository(collection_entity_1.Collection)
                                                            .createQueryBuilder('collection')
                                                            .select('collection.id', 'id')
                                                            .getRawMany()];
                                                case 2:
                                                    collections = _a.sent();
                                                    collectionIds = collections.map(function (c) { return c.id; });
                                                    _a.label = 3;
                                                case 3:
                                                    vendure_logger_1.Logger.verbose("Processing ".concat(collectionIds.length, " Collections"));
                                                    completed = 0;
                                                    _loop_1 = function (collectionId) {
                                                        var collection, err_1, affectedVariantIds, e_1, translatedCollection;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    if (job.state === generated_types_1.JobState.CANCELLED) {
                                                                        throw new Error("Job was cancelled");
                                                                    }
                                                                    _b.label = 1;
                                                                case 1:
                                                                    _b.trys.push([1, 3, , 4]);
                                                                    return [4 /*yield*/, this_1.connection.getEntityOrThrow(ctx, collection_entity_1.Collection, collectionId, {
                                                                            retries: 5,
                                                                            retryDelay: 50,
                                                                        })];
                                                                case 2:
                                                                    collection = _b.sent();
                                                                    return [3 /*break*/, 4];
                                                                case 3:
                                                                    err_1 = _b.sent();
                                                                    vendure_logger_1.Logger.warn("Could not find Collection with id ".concat(collectionId, ", skipping"));
                                                                    return [3 /*break*/, 4];
                                                                case 4:
                                                                    completed++;
                                                                    if (!(collection !== undefined)) return [3 /*break*/, 9];
                                                                    affectedVariantIds = [];
                                                                    _b.label = 5;
                                                                case 5:
                                                                    _b.trys.push([5, 7, , 8]);
                                                                    return [4 /*yield*/, this_1.applyCollectionFiltersInternal(collection, job.data.applyToChangedVariantsOnly)];
                                                                case 6:
                                                                    affectedVariantIds = _b.sent();
                                                                    return [3 /*break*/, 8];
                                                                case 7:
                                                                    e_1 = _b.sent();
                                                                    translatedCollection = this_1.translator.translate(collection, ctx);
                                                                    vendure_logger_1.Logger.error('An error occurred when processing the filters for ' +
                                                                        "the collection \"".concat(translatedCollection.name, "\" (id: ").concat(collection.id, ")"));
                                                                    vendure_logger_1.Logger.error(e_1.message);
                                                                    return [2 /*return*/, "continue"];
                                                                case 8:
                                                                    job.setProgress(Math.ceil((completed / collectionIds.length) * 100));
                                                                    if (affectedVariantIds.length) {
                                                                        // To avoid performance issues on huge collections we first split the affected variant ids into chunks
                                                                        this_1.chunkArray(affectedVariantIds, 50000).map(function (chunk) {
                                                                            return _this.eventBus.publish(new collection_modification_event_1.CollectionModificationEvent(ctx, collection, chunk));
                                                                        });
                                                                    }
                                                                    _b.label = 9;
                                                                case 9: return [2 /*return*/];
                                                            }
                                                        });
                                                    };
                                                    this_1 = this;
                                                    _i = 0, collectionIds_1 = collectionIds;
                                                    _a.label = 4;
                                                case 4:
                                                    if (!(_i < collectionIds_1.length)) return [3 /*break*/, 7];
                                                    collectionId = collectionIds_1[_i];
                                                    return [5 /*yield**/, _loop_1(collectionId)];
                                                case 5:
                                                    _a.sent();
                                                    _a.label = 6;
                                                case 6:
                                                    _i++;
                                                    return [3 /*break*/, 4];
                                                case 7: return [2 /*return*/, { processedCollections: completed }];
                                            }
                                        });
                                    }); },
                                })];
                        case 1:
                            _a.applyFiltersQueue = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CollectionService_1.prototype.findAll = function (ctx, options, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                var _this = this;
                return __generator(this, function (_a) {
                    qb = this.listQueryBuilder.build(collection_entity_1.Collection, options, {
                        relations: relations !== null && relations !== void 0 ? relations : ['featuredAsset', 'parent', 'channels'],
                        channelId: ctx.channelId,
                        where: { isRoot: false },
                        orderBy: { position: 'ASC' },
                        ctx: ctx,
                    });
                    if ((options === null || options === void 0 ? void 0 : options.topLevelOnly) === true) {
                        qb.innerJoin('collection.parent', 'parent_filter', 'parent_filter.isRoot = :isRoot', {
                            isRoot: true,
                        });
                    }
                    return [2 /*return*/, qb.getManyAndCount().then(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var items;
                            var _this = this;
                            var collections = _b[0], totalItems = _b[1];
                            return __generator(this, function (_c) {
                                items = collections.map(function (collection) {
                                    return _this.translator.translate(collection, ctx, ['parent']);
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
        CollectionService_1.prototype.findOne = function (ctx, collectionId, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var collection;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findOneInChannel(ctx, collection_entity_1.Collection, collectionId, ctx.channelId, {
                                relations: relations !== null && relations !== void 0 ? relations : ['featuredAsset', 'assets', 'channels', 'parent'],
                                loadEagerRelations: true,
                            })];
                        case 1:
                            collection = _a.sent();
                            if (!collection) {
                                return [2 /*return*/];
                            }
                            return [2 /*return*/, this.translator.translate(collection, ctx, ['parent'])];
                    }
                });
            });
        };
        CollectionService_1.prototype.findByIds = function (ctx, ids, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var collections;
                var _this = this;
                return __generator(this, function (_a) {
                    collections = this.connection.findByIdsInChannel(ctx, collection_entity_1.Collection, ids, ctx.channelId, {
                        relations: relations !== null && relations !== void 0 ? relations : ['featuredAsset', 'assets', 'channels', 'parent'],
                        loadEagerRelations: true,
                    });
                    return [2 /*return*/, collections.then(function (values) {
                            return values.map(function (collection) { return _this.translator.translate(collection, ctx, ['parent']); });
                        })];
                });
            });
        };
        CollectionService_1.prototype.findOneBySlug = function (ctx, slug, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var translations, bestMatch;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, collection_translation_entity_1.CollectionTranslation).find({
                                relations: ['base'],
                                where: {
                                    slug: slug,
                                    base: {
                                        channels: {
                                            id: ctx.channelId,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            translations = _c.sent();
                            if (!(translations === null || translations === void 0 ? void 0 : translations.length)) {
                                return [2 /*return*/];
                            }
                            bestMatch = (_b = (_a = translations.find(function (t) { return t.languageCode === ctx.languageCode; })) !== null && _a !== void 0 ? _a : translations.find(function (t) { return t.languageCode === ctx.channel.defaultLanguageCode; })) !== null && _b !== void 0 ? _b : translations[0];
                            return [2 /*return*/, this.findOne(ctx, bestMatch.base.id, relations)];
                    }
                });
            });
        };
        /**
         * @description
         * Returns all configured CollectionFilters, as specified by the {@link CatalogOptions}.
         */
        CollectionService_1.prototype.getAvailableFilters = function (ctx) {
            return this.configService.catalogOptions.collectionFilters.map(function (f) { return f.toGraphQlType(ctx); });
        };
        CollectionService_1.prototype.getParent = function (ctx, collectionId) {
            return __awaiter(this, void 0, void 0, function () {
                var parent;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, collection_entity_1.Collection)
                                .createQueryBuilder('collection')
                                .leftJoinAndSelect('collection.translations', 'translation')
                                .where(function (qb) {
                                return "collection.id = ".concat(qb
                                    .subQuery()
                                    .select("".concat(qb.escape('child'), ".").concat(qb.escape('parentId')))
                                    .from(collection_entity_1.Collection, 'child')
                                    .where('child.id = :id', { id: collectionId })
                                    .getQuery());
                            })
                                .getOne()];
                        case 1:
                            parent = _b.sent();
                            return [2 /*return*/, (_a = (parent && this.translator.translate(parent, ctx))) !== null && _a !== void 0 ? _a : undefined];
                    }
                });
            });
        };
        /**
         * @description
         * Returns all child Collections of the Collection with the given id.
         */
        CollectionService_1.prototype.getChildren = function (ctx, collectionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getDescendants(ctx, collectionId, 1)];
                });
            });
        };
        /**
         * @description
         * Returns an array of name/id pairs representing all ancestor Collections up
         * to the Root Collection.
         */
        CollectionService_1.prototype.getBreadcrumbs = function (ctx, collection) {
            return __awaiter(this, void 0, void 0, function () {
                var rootCollection, pickProps, ancestors, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getRootCollection(ctx)];
                        case 1:
                            rootCollection = _c.sent();
                            if ((0, utils_1.idsAreEqual)(collection.id, rootCollection.id)) {
                                return [2 /*return*/, [(0, pick_1.pick)(rootCollection, ['id', 'name', 'slug'])]];
                            }
                            pickProps = (0, pick_1.pick)(['id', 'name', 'slug']);
                            return [4 /*yield*/, this.getAncestors(collection.id, ctx)];
                        case 2:
                            ancestors = _c.sent();
                            if (!(collection.name == null || collection.slug == null)) return [3 /*break*/, 4];
                            _b = (_a = this.translator).translate;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, collection_entity_1.Collection, collection.id)];
                        case 3:
                            collection = _b.apply(_a, [_c.sent(), ctx]);
                            _c.label = 4;
                        case 4: return [2 /*return*/, __spreadArray(__spreadArray([pickProps(rootCollection)], ancestors.map(pickProps).reverse(), true), [pickProps(collection)], false)];
                    }
                });
            });
        };
        /**
         * @description
         * Returns all Collections which are associated with the given Product ID.
         */
        CollectionService_1.prototype.getCollectionsByProductId = function (ctx, productId, publicOnly) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = this.connection
                                .getRepository(ctx, collection_entity_1.Collection)
                                .createQueryBuilder('collection')
                                .leftJoinAndSelect('collection.translations', 'translation')
                                .leftJoin('collection.productVariants', 'variant')
                                .where('variant.product = :productId', { productId: productId })
                                .groupBy('collection.id, translation.id')
                                .orderBy('collection.id', 'ASC');
                            if (publicOnly) {
                                qb.andWhere('collection.isPrivate = :isPrivate', { isPrivate: false });
                            }
                            return [4 /*yield*/, qb.getMany()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.map(function (collection) { return _this.translator.translate(collection, ctx); })];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the descendants of a Collection as a flat array. The depth of the traversal can be limited
         * with the maxDepth argument. So to get only the immediate children, set maxDepth = 1.
         */
        CollectionService_1.prototype.getDescendants = function (ctx_1, rootId_1) {
            return __awaiter(this, arguments, void 0, function (ctx, rootId, maxDepth) {
                var getChildren, descendants;
                var _this = this;
                if (maxDepth === void 0) { maxDepth = Number.MAX_SAFE_INTEGER; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getChildren = function (id_1) {
                                var args_1 = [];
                                for (var _i = 1; _i < arguments.length; _i++) {
                                    args_1[_i - 1] = arguments[_i];
                                }
                                return __awaiter(_this, __spreadArray([id_1], args_1, true), void 0, function (id, _descendants, depth) {
                                    var children, _a, children_1, child;
                                    if (_descendants === void 0) { _descendants = []; }
                                    if (depth === void 0) { depth = 1; }
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.connection
                                                    .getRepository(ctx, collection_entity_1.Collection)
                                                    .find({ where: { parent: { id: id } }, order: { position: 'ASC' } })];
                                            case 1:
                                                children = _b.sent();
                                                _a = 0, children_1 = children;
                                                _b.label = 2;
                                            case 2:
                                                if (!(_a < children_1.length)) return [3 /*break*/, 5];
                                                child = children_1[_a];
                                                _descendants.push(child);
                                                if (!(depth < maxDepth)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, getChildren(child.id, _descendants, depth++)];
                                            case 3:
                                                _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                _a++;
                                                return [3 /*break*/, 2];
                                            case 5: return [2 /*return*/, _descendants];
                                        }
                                    });
                                });
                            };
                            return [4 /*yield*/, getChildren(rootId)];
                        case 1:
                            descendants = _a.sent();
                            return [2 /*return*/, descendants.map(function (c) { return _this.translator.translate(c, ctx); })];
                    }
                });
            });
        };
        CollectionService_1.prototype.getAncestors = function (collectionId, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var getParent, ancestors;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getParent = function (id_1) {
                                var args_1 = [];
                                for (var _i = 1; _i < arguments.length; _i++) {
                                    args_1[_i - 1] = arguments[_i];
                                }
                                return __awaiter(_this, __spreadArray([id_1], args_1, true), void 0, function (id, _ancestors) {
                                    var parent;
                                    if (_ancestors === void 0) { _ancestors = []; }
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.connection
                                                    .getRepository(ctx, collection_entity_1.Collection)
                                                    .createQueryBuilder()
                                                    .relation(collection_entity_1.Collection, 'parent')
                                                    .of(id)
                                                    .loadOne()];
                                            case 1:
                                                parent = _a.sent();
                                                if (parent) {
                                                    if (!parent.isRoot) {
                                                        if ((0, utils_1.idsAreEqual)(parent.id, id)) {
                                                            vendure_logger_1.Logger.error("Circular reference detected in Collection tree: Collection ".concat(id, " is its own parent"));
                                                            return [2 /*return*/, _ancestors];
                                                        }
                                                        _ancestors.push(parent);
                                                        return [2 /*return*/, getParent(parent.id, _ancestors)];
                                                    }
                                                }
                                                return [2 /*return*/, _ancestors];
                                        }
                                    });
                                });
                            };
                            return [4 /*yield*/, getParent(collectionId)];
                        case 1:
                            ancestors = _a.sent();
                            return [2 /*return*/, this.connection
                                    .getRepository(ctx, collection_entity_1.Collection)
                                    .find({ where: { id: (0, typeorm_1.In)(ancestors.map(function (c) { return c.id; })) } })
                                    .then(function (categories) {
                                    var resultCategories = [];
                                    ancestors.forEach(function (a) {
                                        var category = categories.find(function (c) { return c.id === a.id; });
                                        if (category) {
                                            resultCategories.push(ctx ? _this.translator.translate(category, ctx) : category);
                                        }
                                    });
                                    return resultCategories;
                                })];
                    }
                });
            });
        };
        CollectionService_1.prototype.previewCollectionVariants = function (ctx, input, options, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var applicableFilters, parentFilters, ancestorFilters, qb, collectionFilters, _loop_2, _i, collectionFilters_1, filterType;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            applicableFilters = this.getCollectionFiltersFromInput(input);
                            if (!(input.parentId && input.inheritFilters)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.findOne(ctx, input.parentId, [])];
                        case 1:
                            parentFilters = (_b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.filters) !== null && _b !== void 0 ? _b : [];
                            return [4 /*yield*/, this.getAncestors(input.parentId).then(function (ancestors) {
                                    return ancestors.reduce(function (_filters, c) { return __spreadArray(__spreadArray([], _filters, true), (c.filters || []), true); }, []);
                                })];
                        case 2:
                            ancestorFilters = _c.sent();
                            applicableFilters.push.apply(applicableFilters, __spreadArray(__spreadArray([], parentFilters, false), ancestorFilters, false));
                            _c.label = 3;
                        case 3:
                            qb = this.listQueryBuilder.build(product_variant_entity_1.ProductVariant, options, {
                                relations: relations !== null && relations !== void 0 ? relations : ['taxCategory'],
                                channelId: ctx.channelId,
                                where: { deletedAt: (0, typeorm_1.IsNull)() },
                                ctx: ctx,
                                entityAlias: 'productVariant',
                            });
                            collectionFilters = this.configService.catalogOptions.collectionFilters;
                            _loop_2 = function (filterType) {
                                var filtersOfType = applicableFilters.filter(function (f) { return f.code === filterType.code; });
                                if (filtersOfType.length) {
                                    for (var _d = 0, filtersOfType_1 = filtersOfType; _d < filtersOfType_1.length; _d++) {
                                        var collectionFilter = filtersOfType_1[_d];
                                        qb = filterType.apply(qb, collectionFilter.args);
                                    }
                                }
                            };
                            for (_i = 0, collectionFilters_1 = collectionFilters; _i < collectionFilters_1.length; _i++) {
                                filterType = collectionFilters_1[_i];
                                _loop_2(filterType);
                            }
                            return [2 /*return*/, qb.getManyAndCount().then(function (_a) {
                                    var items = _a[0], totalItems = _a[1];
                                    return ({
                                        items: items,
                                        totalItems: totalItems,
                                    });
                                })];
                    }
                });
            });
        };
        CollectionService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var collection, collectionWithRelations;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.slugValidator.validateSlugs(ctx, input, collection_translation_entity_1.CollectionTranslation)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: ctx,
                                    input: input,
                                    entityType: collection_entity_1.Collection,
                                    translationType: collection_translation_entity_1.CollectionTranslation,
                                    beforeSave: function (coll) { return __awaiter(_this, void 0, void 0, function () {
                                        var parent, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, this.channelService.assignToCurrentChannel(coll, ctx)];
                                                case 1:
                                                    _b.sent();
                                                    return [4 /*yield*/, this.getParentCollection(ctx, input.parentId)];
                                                case 2:
                                                    parent = _b.sent();
                                                    if (parent) {
                                                        coll.parent = parent;
                                                    }
                                                    _a = coll;
                                                    return [4 /*yield*/, this.getNextPositionInParent(ctx, input.parentId || undefined)];
                                                case 3:
                                                    _a.position = _b.sent();
                                                    coll.filters = this.getCollectionFiltersFromInput(input);
                                                    return [4 /*yield*/, this.assetService.updateFeaturedAsset(ctx, coll, input)];
                                                case 4:
                                                    _b.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                })];
                        case 2:
                            collection = _a.sent();
                            return [4 /*yield*/, this.assetService.updateEntityAssets(ctx, collection, input)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, collection_entity_1.Collection, input, collection)];
                        case 4:
                            collectionWithRelations = _a.sent();
                            return [4 /*yield*/, this.triggerApplyFiltersJob(ctx, {
                                    collectionIds: [collection.id],
                                })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new collection_event_1.CollectionEvent(ctx, collectionWithRelations, 'created', input))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, collection.id))];
                    }
                });
            });
        };
        CollectionService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var collection, affectedVariantIds;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.slugValidator.validateSlugs(ctx, input, collection_translation_entity_1.CollectionTranslation)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.translatableSaver.update({
                                    ctx: ctx,
                                    input: input,
                                    entityType: collection_entity_1.Collection,
                                    translationType: collection_translation_entity_1.CollectionTranslation,
                                    beforeSave: function (coll) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (input.filters) {
                                                        coll.filters = this.getCollectionFiltersFromInput(input);
                                                    }
                                                    return [4 /*yield*/, this.assetService.updateFeaturedAsset(ctx, coll, input)];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, this.assetService.updateEntityAssets(ctx, coll, input)];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                })];
                        case 2:
                            collection = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, collection_entity_1.Collection, input, collection)];
                        case 3:
                            _a.sent();
                            if (!input.filters) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.triggerApplyFiltersJob(ctx, {
                                    collectionIds: [collection.id],
                                    applyToChangedVariantsOnly: false,
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 5: return [4 /*yield*/, this.getCollectionProductVariantIds(collection)];
                        case 6:
                            affectedVariantIds = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new collection_modification_event_1.CollectionModificationEvent(ctx, collection, affectedVariantIds))];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [4 /*yield*/, this.eventBus.publish(new collection_event_1.CollectionEvent(ctx, collection, 'updated', input))];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, collection.id))];
                    }
                });
            });
        };
        CollectionService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var collection, deletedCollection, descendants, _i, _a, coll, affectedVariantIds, deletedColl, chunkedDeleteIds, _b, chunkedDeleteIds_1, chunkedDeleteId;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, collection_entity_1.Collection, id, {
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            collection = _c.sent();
                            deletedCollection = new collection_entity_1.Collection(collection);
                            return [4 /*yield*/, this.getDescendants(ctx, collection.id)];
                        case 2:
                            descendants = _c.sent();
                            _i = 0, _a = __spreadArray(__spreadArray([], descendants.reverse(), true), [collection], false);
                            _c.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 12];
                            coll = _a[_i];
                            return [4 /*yield*/, this.getCollectionProductVariantIds(coll)];
                        case 4:
                            affectedVariantIds = _c.sent();
                            deletedColl = new collection_entity_1.Collection(coll);
                            chunkedDeleteIds = this.chunkArray(affectedVariantIds, 500);
                            _b = 0, chunkedDeleteIds_1 = chunkedDeleteIds;
                            _c.label = 5;
                        case 5:
                            if (!(_b < chunkedDeleteIds_1.length)) return [3 /*break*/, 8];
                            chunkedDeleteId = chunkedDeleteIds_1[_b];
                            return [4 /*yield*/, this.connection.rawConnection
                                    .createQueryBuilder()
                                    .relation(collection_entity_1.Collection, 'productVariants')
                                    .of(collection)
                                    .remove(chunkedDeleteId)];
                        case 6:
                            _c.sent();
                            _c.label = 7;
                        case 7:
                            _b++;
                            return [3 /*break*/, 5];
                        case 8: return [4 /*yield*/, this.connection.getRepository(ctx, collection_entity_1.Collection).remove(coll)];
                        case 9:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new collection_modification_event_1.CollectionModificationEvent(ctx, deletedColl, affectedVariantIds))];
                        case 10:
                            _c.sent();
                            _c.label = 11;
                        case 11:
                            _i++;
                            return [3 /*break*/, 3];
                        case 12: return [4 /*yield*/, this.eventBus.publish(new collection_event_1.CollectionEvent(ctx, deletedCollection, 'deleted', id))];
                        case 13:
                            _c.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * Moves a Collection by specifying the parent Collection ID, and an index representing the order amongst
         * its siblings.
         */
        CollectionService_1.prototype.move = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var target, descendants, siblings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, collection_entity_1.Collection, input.collectionId, {
                                channelId: ctx.channelId,
                                relations: ['parent'],
                            })];
                        case 1:
                            target = _a.sent();
                            return [4 /*yield*/, this.getDescendants(ctx, input.collectionId)];
                        case 2:
                            descendants = _a.sent();
                            if ((0, utils_1.idsAreEqual)(input.parentId, target.id) ||
                                descendants.some(function (cat) { return (0, utils_1.idsAreEqual)(input.parentId, cat.id); })) {
                                throw new errors_1.IllegalOperationError('error.cannot-move-collection-into-self');
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, collection_entity_1.Collection)
                                    .createQueryBuilder('collection')
                                    .leftJoin('collection.parent', 'parent')
                                    .where('parent.id = :id', { id: input.parentId })
                                    .getMany()];
                        case 3:
                            siblings = _a.sent();
                            if (!(0, utils_1.idsAreEqual)(target.parent.id, input.parentId)) {
                                target.parent = new collection_entity_1.Collection({ id: input.parentId });
                            }
                            siblings = (0, move_to_index_1.moveToIndex)(input.index, target, siblings);
                            return [4 /*yield*/, this.connection.getRepository(ctx, collection_entity_1.Collection).save(siblings)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.triggerApplyFiltersJob(ctx, {
                                    collectionIds: [target.id],
                                })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new collection_event_1.CollectionEvent(ctx, target, 'updated'))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, input.collectionId))];
                    }
                });
            });
        };
        /**
         * @description
         * By default, whenever product data is updated (as determined by subscribing to the
         * {@link ProductEvent} and {@link ProductVariantEvent} events), the CollectionFilters are re-applied
         * to all Collections.
         *
         * In certain scenarios, such as when a large number of products are updated at once due to
         * bulk data import, this can be inefficient. In such cases, you can disable this behaviour
         * for the duration of the import process by calling this method with `false`, and then
         * re-enable it by calling with `true`.
         *
         * Afterward, you can call the `triggerApplyFiltersJob` method to manually re-apply the filters.
         *
         * @since 3.1.3
         */
        CollectionService_1.prototype.setApplyAllFiltersOnProductUpdates = function (applyAllFiltersOnProductUpdates) {
            this.applyAllFiltersOnProductUpdates = applyAllFiltersOnProductUpdates;
        };
        /**
         * @description
         * Triggers the creation of an `apply-collection-filters` job which will cause the contents
         * of the specified collections to be re-evaluated against their filters.
         *
         * If no `collectionIds` option is passed, then all collections will be re-evaluated.
         *
         * @since 3.1.3
         */
        CollectionService_1.prototype.triggerApplyFiltersJob = function (ctx, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.applyFiltersQueue.add({
                                ctx: {
                                    languageCode: ctx.languageCode,
                                    channelToken: ctx.channel.token,
                                },
                                applyToChangedVariantsOnly: options === null || options === void 0 ? void 0 : options.applyToChangedVariantsOnly,
                                collectionIds: (_a = options === null || options === void 0 ? void 0 : options.collectionIds) !== null && _a !== void 0 ? _a : [],
                            }, { ctx: ctx })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CollectionService_1.prototype.getCollectionFiltersFromInput = function (input) {
            var filters = [];
            if (input.filters) {
                for (var _i = 0, _a = input.filters; _i < _a.length; _i++) {
                    var filterInput = _a[_i];
                    filters.push(this.configArgService.parseInput('CollectionFilter', filterInput));
                }
            }
            return filters;
        };
        /**
         * Applies the CollectionFilters and returns the IDs of ProductVariants that need to be added or removed.
         */
        CollectionService_1.prototype.applyCollectionFiltersInternal = function (collection_1) {
            return __awaiter(this, arguments, void 0, function (collection, applyToChangedVariantsOnly) {
                var masterConnection, ancestorFilters, filters, collectionFilters, filteredQb, _loop_3, _i, collectionFilters_2, filterType, existingVariantsQb, addQb, removeQb, _a, toAddIds, toRemoveIds, e_2, _b;
                var _this = this;
                if (applyToChangedVariantsOnly === void 0) { applyToChangedVariantsOnly = true; }
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            masterConnection = this.connection.rawConnection.createQueryRunner('master').connection;
                            return [4 /*yield*/, this.getAncestorFilters(collection)];
                        case 1:
                            ancestorFilters = _c.sent();
                            filters = __spreadArray(__spreadArray([], ancestorFilters, true), (collection.filters || []), true);
                            collectionFilters = this.configService.catalogOptions.collectionFilters;
                            filteredQb = masterConnection
                                .getRepository(product_variant_entity_1.ProductVariant)
                                .createQueryBuilder('productVariant')
                                .select('productVariant.id', 'id')
                                .setFindOptions({ loadEagerRelations: false });
                            // If there are no filters, we need to ensure that the query returns no results
                            if (filters.length === 0) {
                                filteredQb.andWhere('1 = 0');
                            }
                            _loop_3 = function (filterType) {
                                var filtersOfType = filters.filter(function (f) { return f.code === filterType.code; });
                                if (filtersOfType.length) {
                                    for (var _d = 0, filtersOfType_2 = filtersOfType; _d < filtersOfType_2.length; _d++) {
                                        var collectionFilter = filtersOfType_2[_d];
                                        filteredQb = filterType.apply(filteredQb, collectionFilter.args);
                                    }
                                }
                            };
                            //  Applies the CollectionFilters and returns an array of ProductVariant entities which match
                            for (_i = 0, collectionFilters_2 = collectionFilters; _i < collectionFilters_2.length; _i++) {
                                filterType = collectionFilters_2[_i];
                                _loop_3(filterType);
                            }
                            existingVariantsQb = masterConnection
                                .getRepository(product_variant_entity_1.ProductVariant)
                                .createQueryBuilder('variant')
                                .select('variant.id', 'id')
                                .setFindOptions({ loadEagerRelations: false })
                                .innerJoin('variant.collections', 'collection', 'collection.id = :id', { id: collection.id });
                            addQb = masterConnection
                                .createQueryBuilder()
                                .addCommonTableExpression(filteredQb, '_filtered_variants')
                                .addCommonTableExpression(existingVariantsQb, '_existing_variants')
                                .select('filtered_variants.id')
                                .from('_filtered_variants', 'filtered_variants')
                                .leftJoin('_existing_variants', 'existing_variants', 'filtered_variants.id = existing_variants.id')
                                .where('existing_variants.id IS NULL');
                            removeQb = masterConnection
                                .createQueryBuilder()
                                .addCommonTableExpression(filteredQb, '_filtered_variants')
                                .addCommonTableExpression(existingVariantsQb, '_existing_variants')
                                .select('existing_variants.id')
                                .from('_existing_variants', 'existing_variants')
                                .leftJoin('_filtered_variants', 'filtered_variants', 'existing_variants.id = filtered_variants.id')
                                .where('filtered_variants.id IS NULL')
                                .setParameters({ id: collection.id });
                            return [4 /*yield*/, Promise.all([
                                    addQb.getRawMany().then(function (results) { return results.map(function (result) { return result.id; }); }),
                                    removeQb.getRawMany().then(function (results) { return results.map(function (result) { return result.id; }); }),
                                ])];
                        case 2:
                            _a = _c.sent(), toAddIds = _a[0], toRemoveIds = _a[1];
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.connection.rawConnection.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                    var chunkedDeleteIds, chunkedAddIds;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                chunkedDeleteIds = this.chunkArray(toRemoveIds, 5000);
                                                chunkedAddIds = this.chunkArray(toAddIds, 5000);
                                                return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], chunkedDeleteIds.map(function (chunk) {
                                                        return transactionalEntityManager
                                                            .createQueryBuilder()
                                                            .relation(collection_entity_1.Collection, 'productVariants')
                                                            .of(collection)
                                                            .remove(chunk);
                                                    }), true), chunkedAddIds.map(function (chunk) {
                                                        return transactionalEntityManager
                                                            .createQueryBuilder()
                                                            .relation(collection_entity_1.Collection, 'productVariants')
                                                            .of(collection)
                                                            .add(chunk);
                                                    }), true))];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 4:
                            _c.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_2 = _c.sent();
                            vendure_logger_1.Logger.error(e_2);
                            return [3 /*break*/, 6];
                        case 6:
                            if (applyToChangedVariantsOnly) {
                                return [2 /*return*/, __spreadArray(__spreadArray([], toAddIds, true), toRemoveIds, true)];
                            }
                            _b = [[]];
                            return [4 /*yield*/, existingVariantsQb.getRawMany().then(function (results) { return results.map(function (result) { return result.id; }); })];
                        case 7: return [2 /*return*/, __spreadArray.apply(void 0, [__spreadArray.apply(void 0, _b.concat([(_c.sent()), true])), toRemoveIds, true])];
                    }
                });
            });
        };
        /**
         * Gets all filters of ancestor Collections while respecting the `inheritFilters` setting of each.
         * As soon as `inheritFilters === false` is encountered, the collected filters are returned.
         */
        CollectionService_1.prototype.getAncestorFilters = function (collection) {
            return __awaiter(this, void 0, void 0, function () {
                var ancestorFilters, ancestors, _i, ancestors_1, ancestor;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ancestorFilters = [];
                            if (!collection.inheritFilters) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getAncestors(collection.id)];
                        case 1:
                            ancestors = _a.sent();
                            for (_i = 0, ancestors_1 = ancestors; _i < ancestors_1.length; _i++) {
                                ancestor = ancestors_1[_i];
                                ancestorFilters.push.apply(ancestorFilters, ancestor.filters);
                                if (ancestor.inheritFilters === false) {
                                    return [2 /*return*/, ancestorFilters];
                                }
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/, ancestorFilters];
                    }
                });
            });
        };
        /**
         * Returns the IDs of the Collection's ProductVariants.
         */
        CollectionService_1.prototype.getCollectionProductVariantIds = function (collection, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var productVariants;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!collection.productVariants) return [3 /*break*/, 1];
                            return [2 /*return*/, collection.productVariants.map(function (v) { return v.id; })];
                        case 1: return [4 /*yield*/, this.connection
                                .getRepository(ctx, product_variant_entity_1.ProductVariant)
                                .createQueryBuilder('variant')
                                .select('variant.id', 'id')
                                .innerJoin('variant.collections', 'collection', 'collection.id = :id', { id: collection.id })
                                .getRawMany()];
                        case 2:
                            productVariants = _a.sent();
                            return [2 /*return*/, productVariants.map(function (v) { return v.id; })];
                    }
                });
            });
        };
        /**
         * Returns the next position value in the given parent collection.
         */
        CollectionService_1.prototype.getNextPositionInParent = function (ctx, maybeParentId) {
            return __awaiter(this, void 0, void 0, function () {
                var parentId, _a, result, index;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = maybeParentId;
                            if (_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getRootCollection(ctx)];
                        case 1:
                            _a = (_b.sent()).id;
                            _b.label = 2;
                        case 2:
                            parentId = _a;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, collection_entity_1.Collection)
                                    .createQueryBuilder('collection')
                                    .leftJoin('collection.parent', 'parent')
                                    .select('MAX(collection.position)', 'index')
                                    .where('parent.id = :id', { id: parentId })
                                    .getRawOne()];
                        case 3:
                            result = _b.sent();
                            index = result.index;
                            return [2 /*return*/, (typeof index === 'number' ? index : 0) + 1];
                    }
                });
            });
        };
        CollectionService_1.prototype.getParentCollection = function (ctx, parentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (parentId) {
                        return [2 /*return*/, this.connection
                                .getRepository(ctx, collection_entity_1.Collection)
                                .createQueryBuilder('collection')
                                .leftJoin('collection.channels', 'channel')
                                .where('collection.id = :id', { id: parentId })
                                .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                                .getOne()
                                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                    }
                    else {
                        return [2 /*return*/, this.getRootCollection(ctx)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        CollectionService_1.prototype.getRootCollection = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var cachedRoot, existingRoot, rootTranslation, newRoot;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cachedRoot = this.rootCollection;
                            if (cachedRoot) {
                                return [2 /*return*/, cachedRoot];
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, collection_entity_1.Collection)
                                    .createQueryBuilder('collection')
                                    .leftJoin('collection.channels', 'channel')
                                    .leftJoinAndSelect('collection.translations', 'translation')
                                    .where('collection.isRoot = :isRoot', { isRoot: true })
                                    .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                                    .getOne()];
                        case 1:
                            existingRoot = _a.sent();
                            if (existingRoot) {
                                this.rootCollection = this.translator.translate(existingRoot, ctx);
                                return [2 /*return*/, this.rootCollection];
                            }
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(collection_translation_entity_1.CollectionTranslation).save(new collection_translation_entity_1.CollectionTranslation({
                                    languageCode: this.configService.defaultLanguageCode,
                                    name: shared_constants_1.ROOT_COLLECTION_NAME,
                                    description: 'The root of the Collection tree.',
                                    slug: shared_constants_1.ROOT_COLLECTION_NAME,
                                }))];
                        case 2:
                            rootTranslation = _a.sent();
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(collection_entity_1.Collection).save(new collection_entity_1.Collection({
                                    isRoot: true,
                                    position: 0,
                                    translations: [rootTranslation],
                                    channels: [ctx.channel],
                                    filters: [],
                                }))];
                        case 3:
                            newRoot = _a.sent();
                            this.rootCollection = this.translator.translate(newRoot, ctx);
                            return [2 /*return*/, this.rootCollection];
                    }
                });
            });
        };
        /**
         * @description
         * Assigns Collections to the specified Channel
         */
        CollectionService_1.prototype.assignCollectionsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, collectionsToAssign, assetIds;
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.UpdateCollection,
                                generated_types_1.Permission.UpdateCatalog,
                            ])];
                        case 1:
                            hasPermission = _b.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, collection_entity_1.Collection)
                                    .find({ where: { id: (0, typeorm_1.In)(input.collectionIds) }, relations: { assets: true } })];
                        case 2:
                            collectionsToAssign = _b.sent();
                            return [4 /*yield*/, Promise.all(collectionsToAssign.map(function (collection) {
                                    return _this.channelService.assignToChannels(ctx, collection_entity_1.Collection, collection.id, [input.channelId]);
                                }))];
                        case 3:
                            _b.sent();
                            assetIds = (0, unique_1.unique)((_a = []).concat.apply(_a, collectionsToAssign.map(function (c) { return c.assets.map(function (a) { return a.assetId; }); })));
                            return [4 /*yield*/, this.assetService.assignToChannel(ctx, { channelId: input.channelId, assetIds: assetIds })];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, this.triggerApplyFiltersJob(ctx, {
                                    collectionIds: collectionsToAssign.map(function (collection) { return collection.id; }),
                                })];
                        case 5:
                            _b.sent();
                            return [2 /*return*/, this.connection
                                    .findByIdsInChannel(ctx, collection_entity_1.Collection, collectionsToAssign.map(function (c) { return c.id; }), ctx.channelId, {})
                                    .then(function (collections) { return collections.map(function (collection) { return _this.translator.translate(collection, ctx); }); })];
                    }
                });
            });
        };
        /**
         * @description
         * Remove Collections from the specified Channel
         */
        CollectionService_1.prototype.removeCollectionsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, defaultChannel, collectionsToRemove;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.DeleteCollection,
                                generated_types_1.Permission.DeleteCatalog,
                            ])];
                        case 1:
                            hasPermission = _a.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 2:
                            defaultChannel = _a.sent();
                            if ((0, utils_1.idsAreEqual)(input.channelId, defaultChannel.id)) {
                                throw new errors_1.UserInputError('error.items-cannot-be-removed-from-default-channel');
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, collection_entity_1.Collection)
                                    .find({ where: { id: (0, typeorm_1.In)(input.collectionIds) } })];
                        case 3:
                            collectionsToRemove = _a.sent();
                            return [4 /*yield*/, Promise.all(collectionsToRemove.map(function (collection) { return __awaiter(_this, void 0, void 0, function () {
                                    var affectedVariantIds;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.getCollectionProductVariantIds(collection)];
                                            case 1:
                                                affectedVariantIds = _a.sent();
                                                return [4 /*yield*/, this.channelService.removeFromChannels(ctx, collection_entity_1.Collection, collection.id, [
                                                        input.channelId,
                                                    ])];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, this.eventBus.publish(new collection_modification_event_1.CollectionModificationEvent(ctx, collection, affectedVariantIds))];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.connection
                                    .findByIdsInChannel(ctx, collection_entity_1.Collection, collectionsToRemove.map(function (c) { return c.id; }), ctx.channelId, {})
                                    .then(function (collections) { return collections.map(function (collection) { return _this.translator.translate(collection, ctx); }); })];
                    }
                });
            });
        };
        return CollectionService_1;
    }());
    __setFunctionName(_classThis, "CollectionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CollectionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CollectionService = _classThis;
}();
exports.CollectionService = CollectionService;
