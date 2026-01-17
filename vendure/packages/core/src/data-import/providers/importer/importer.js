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
exports.Importer = void 0;
var common_1 = require("@nestjs/common");
var normalize_string_1 = require("@vendure/common/lib/normalize-string");
var progress_1 = require("progress");
var rxjs_1 = require("rxjs");
var request_context_1 = require("../../../api/common/request-context");
var errors_1 = require("../../../common/error/errors");
var index_1 = require("../../../config/index");
/**
 * @description
 * Parses and imports Products using the CSV import format.
 *
 * Internally it is using the {@link ImportParser} to parse the CSV file, and then the
 * {@link FastImporterService} and the {@link AssetImporter} to actually create the resulting
 * entities in the Vendure database.
 *
 * @docsCategory import-export
 */
var Importer = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var Importer = _classThis = /** @class */ (function () {
        /** @internal */
        function Importer_1(configService, importParser, channelService, facetService, facetValueService, taxCategoryService, assetImporter, fastImporter) {
            this.configService = configService;
            this.importParser = importParser;
            this.channelService = channelService;
            this.facetService = facetService;
            this.facetValueService = facetValueService;
            this.taxCategoryService = taxCategoryService;
            this.assetImporter = assetImporter;
            this.fastImporter = fastImporter;
            this.taxCategoryMatches = {};
            // These Maps are used to cache newly-created entities and prevent duplicates
            // from being created.
            this.facetMap = new Map();
            this.facetValueMap = new Map();
        }
        /**
         * @description
         * Parses the contents of the [product import CSV file](/guides/developer-guide/importing-data/#product-import-format) and imports
         * the resulting Product & ProductVariants, as well as any associated Assets, Facets & FacetValues.
         *
         * The `ctxOrLanguageCode` argument is used to specify the languageCode to be used when creating the Products.
         */
        Importer_1.prototype.parseAndImport = function (input, ctxOrLanguageCode, reportProgress) {
            var _this = this;
            if (reportProgress === void 0) { reportProgress = false; }
            var bar;
            return new rxjs_1.Observable(function (subscriber) {
                var p = _this.doParseAndImport(input, ctxOrLanguageCode, function (progress) {
                    if (reportProgress) {
                        if (!bar) {
                            bar = new progress_1.default('  importing [:bar] :percent :etas  Importing: :prodName', {
                                complete: '=',
                                incomplete: ' ',
                                total: progress.processed,
                                width: 40,
                            });
                        }
                        bar.tick({ prodName: progress.currentProduct });
                    }
                    subscriber.next(progress);
                }).then(function (value) {
                    subscriber.next(__assign(__assign({}, value), { currentProduct: 'Complete' }));
                    subscriber.complete();
                });
            });
        };
        Importer_1.prototype.doParseAndImport = function (input, ctxOrLanguageCode, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, parsed, importErrors, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getRequestContext(ctxOrLanguageCode)];
                        case 1:
                            ctx = _a.sent();
                            return [4 /*yield*/, this.importParser.parseProducts(input, ctx.languageCode)];
                        case 2:
                            parsed = _a.sent();
                            if (!(parsed && parsed.results.length)) return [3 /*break*/, 7];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.importProducts(ctx, parsed.results, function (progess) {
                                    onProgress(__assign(__assign({}, progess), { processed: parsed.processed }));
                                })];
                        case 4:
                            importErrors = _a.sent();
                            return [2 /*return*/, {
                                    errors: parsed.errors.concat(importErrors),
                                    imported: parsed.results.length,
                                    processed: parsed.processed,
                                }];
                        case 5:
                            err_1 = _a.sent();
                            return [2 /*return*/, {
                                    errors: [err_1.message],
                                    imported: 0,
                                    processed: parsed.processed,
                                }];
                        case 6: return [3 /*break*/, 8];
                        case 7: return [2 /*return*/, {
                                errors: [],
                                imported: 0,
                                processed: parsed.processed,
                            }];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        Importer_1.prototype.getRequestContext = function (ctxOrLanguageCode) {
            return __awaiter(this, void 0, void 0, function () {
                var channel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(ctxOrLanguageCode instanceof request_context_1.RequestContext)) return [3 /*break*/, 1];
                            return [2 /*return*/, ctxOrLanguageCode];
                        case 1: return [4 /*yield*/, this.channelService.getDefaultChannel()];
                        case 2:
                            channel = _a.sent();
                            return [2 /*return*/, new request_context_1.RequestContext({
                                    apiType: 'admin',
                                    isAuthorized: true,
                                    authorizedAsOwnerOnly: false,
                                    channel: channel,
                                    languageCode: ctxOrLanguageCode,
                                })];
                    }
                });
            });
        };
        /**
         * @description
         * Imports the products specified in the rows object. Return an array of error messages.
         */
        Importer_1.prototype.importProducts = function (ctx, rows, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var errors, imported, languageCode, taxCategories, _loop_1, this_1, _i, rows_1, _a, product, variants;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            errors = [];
                            imported = 0;
                            languageCode = ctx.languageCode;
                            return [4 /*yield*/, this.taxCategoryService.findAll(ctx)];
                        case 1:
                            taxCategories = _b.sent();
                            if (taxCategories.totalItems === 0) {
                                index_1.Logger.error([
                                    "No TaxCategories found in the database. Ensure that at least one TaxCategory exists.",
                                    "If you are populating from an InitialData object, ensure the 'taxRates' array is not empty.",
                                ].join('\n'));
                                throw new Error("No TaxCategories found in the database. Ensure the IntialData.taxRates array is not empty.");
                            }
                            return [4 /*yield*/, this.fastImporter.initialize(ctx.channel)];
                        case 2:
                            _b.sent();
                            _loop_1 = function (product, variants) {
                                var productMainTranslation, createProductAssets, productAssets, customFields, createdProductId, _c, _d, optionsMap, _e, _f, _g, optionGroup, optionGroupIndex, optionGroupMainTranslation, code, groupId, _loop_2, _h, _j, _k, optionIndex, value, _l, variants_1, variant, variantMainTranslation, createVariantAssets, variantAssets, facetValueIds, variantCustomFields, optionIds, createdVariant;
                                var _m;
                                return __generator(this, function (_o) {
                                    switch (_o.label) {
                                        case 0:
                                            productMainTranslation = this_1.getTranslationByCodeOrFirst(product.translations, ctx.languageCode);
                                            return [4 /*yield*/, this_1.assetImporter.getAssets(product.assetPaths, ctx)];
                                        case 1:
                                            createProductAssets = _o.sent();
                                            productAssets = createProductAssets.assets;
                                            if (createProductAssets.errors.length) {
                                                errors = errors.concat(createProductAssets.errors);
                                            }
                                            customFields = this_1.processCustomFieldValues(product.translations[0].customFields, this_1.configService.customFields.Product);
                                            _d = (_c = this_1.fastImporter).createProduct;
                                            _m = {
                                                featuredAssetId: productAssets.length ? productAssets[0].id : undefined,
                                                assetIds: productAssets.map(function (a) { return a.id; })
                                            };
                                            return [4 /*yield*/, this_1.getFacetValueIds(ctx, product.facets, ctx.languageCode)];
                                        case 2: return [4 /*yield*/, _d.apply(_c, [(_m.facetValueIds = _o.sent(),
                                                    _m.translations = product.translations.map(function (translation) {
                                                        return {
                                                            languageCode: translation.languageCode,
                                                            name: translation.name,
                                                            description: translation.description,
                                                            slug: translation.slug,
                                                            customFields: _this.processCustomFieldValues(translation.customFields, _this.configService.customFields.Product),
                                                        };
                                                    }),
                                                    _m.customFields = customFields,
                                                    _m)])];
                                        case 3:
                                            createdProductId = _o.sent();
                                            optionsMap = {};
                                            _e = 0, _f = product.optionGroups.map(function (group, i) { return [group, i]; });
                                            _o.label = 4;
                                        case 4:
                                            if (!(_e < _f.length)) return [3 /*break*/, 12];
                                            _g = _f[_e], optionGroup = _g[0], optionGroupIndex = _g[1];
                                            optionGroupMainTranslation = this_1.getTranslationByCodeOrFirst(optionGroup.translations, ctx.languageCode);
                                            code = (0, normalize_string_1.normalizeString)("".concat(productMainTranslation.name, "-").concat(optionGroupMainTranslation.name), '-');
                                            return [4 /*yield*/, this_1.fastImporter.createProductOptionGroup({
                                                    code: code,
                                                    options: optionGroupMainTranslation.values.map(function (name) { return ({}); }),
                                                    translations: optionGroup.translations.map(function (translation) {
                                                        return {
                                                            languageCode: translation.languageCode,
                                                            name: translation.name,
                                                        };
                                                    }),
                                                })];
                                        case 5:
                                            groupId = _o.sent();
                                            _loop_2 = function (optionIndex, value) {
                                                var createdOptionId;
                                                return __generator(this, function (_p) {
                                                    switch (_p.label) {
                                                        case 0: return [4 /*yield*/, this_1.fastImporter.createProductOption({
                                                                productOptionGroupId: groupId,
                                                                code: (0, normalize_string_1.normalizeString)(value, '-'),
                                                                translations: optionGroup.translations.map(function (translation) {
                                                                    return {
                                                                        languageCode: translation.languageCode,
                                                                        name: translation.values[optionIndex],
                                                                    };
                                                                }),
                                                            })];
                                                        case 1:
                                                            createdOptionId = _p.sent();
                                                            optionsMap["".concat(optionGroupIndex, "_").concat(value)] = createdOptionId;
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            _h = 0, _j = optionGroupMainTranslation.values.map(function (val, index) { return [index, val]; });
                                            _o.label = 6;
                                        case 6:
                                            if (!(_h < _j.length)) return [3 /*break*/, 9];
                                            _k = _j[_h], optionIndex = _k[0], value = _k[1];
                                            return [5 /*yield**/, _loop_2(optionIndex, value)];
                                        case 7:
                                            _o.sent();
                                            _o.label = 8;
                                        case 8:
                                            _h++;
                                            return [3 /*break*/, 6];
                                        case 9: return [4 /*yield*/, this_1.fastImporter.addOptionGroupToProduct(createdProductId, groupId)];
                                        case 10:
                                            _o.sent();
                                            _o.label = 11;
                                        case 11:
                                            _e++;
                                            return [3 /*break*/, 4];
                                        case 12:
                                            _l = 0, variants_1 = variants;
                                            _o.label = 13;
                                        case 13:
                                            if (!(_l < variants_1.length)) return [3 /*break*/, 19];
                                            variant = variants_1[_l];
                                            variantMainTranslation = this_1.getTranslationByCodeOrFirst(variant.translations, ctx.languageCode);
                                            return [4 /*yield*/, this_1.assetImporter.getAssets(variant.assetPaths)];
                                        case 14:
                                            createVariantAssets = _o.sent();
                                            variantAssets = createVariantAssets.assets;
                                            if (createVariantAssets.errors.length) {
                                                errors = errors.concat(createVariantAssets.errors);
                                            }
                                            facetValueIds = [];
                                            if (!(0 < variant.facets.length)) return [3 /*break*/, 16];
                                            return [4 /*yield*/, this_1.getFacetValueIds(ctx, variant.facets, languageCode)];
                                        case 15:
                                            facetValueIds = _o.sent();
                                            _o.label = 16;
                                        case 16:
                                            variantCustomFields = this_1.processCustomFieldValues(variantMainTranslation.customFields, this_1.configService.customFields.ProductVariant);
                                            optionIds = variantMainTranslation.optionValues.map(function (v, index) { return optionsMap["".concat(index, "_").concat(v)]; });
                                            return [4 /*yield*/, this_1.fastImporter.createProductVariant({
                                                    productId: createdProductId,
                                                    facetValueIds: facetValueIds,
                                                    featuredAssetId: variantAssets.length ? variantAssets[0].id : undefined,
                                                    assetIds: variantAssets.map(function (a) { return a.id; }),
                                                    sku: variant.sku,
                                                    taxCategoryId: this_1.getMatchingTaxCategoryId(variant.taxCategory, taxCategories.items),
                                                    stockOnHand: variant.stockOnHand,
                                                    trackInventory: variant.trackInventory,
                                                    optionIds: optionIds,
                                                    translations: variant.translations.map(function (translation) {
                                                        var productTranslation = product.translations.find(function (t) { return t.languageCode === translation.languageCode; });
                                                        if (!productTranslation) {
                                                            throw new errors_1.InternalServerError("No translation '".concat(translation.languageCode, "' for product with slug '").concat(productMainTranslation.slug, "'"));
                                                        }
                                                        return {
                                                            languageCode: translation.languageCode,
                                                            name: __spreadArray([productTranslation.name], translation.optionValues, true).join(' '),
                                                            customFields: _this.processCustomFieldValues(translation.customFields, _this.configService.customFields.ProductVariant),
                                                        };
                                                    }),
                                                    price: Math.round(variant.price * 100),
                                                    customFields: variantCustomFields,
                                                })];
                                        case 17:
                                            createdVariant = _o.sent();
                                            _o.label = 18;
                                        case 18:
                                            _l++;
                                            return [3 /*break*/, 13];
                                        case 19:
                                            imported++;
                                            onProgress({
                                                processed: 0,
                                                imported: imported,
                                                errors: errors,
                                                currentProduct: productMainTranslation.name,
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, rows_1 = rows;
                            _b.label = 3;
                        case 3:
                            if (!(_i < rows_1.length)) return [3 /*break*/, 6];
                            _a = rows_1[_i], product = _a.product, variants = _a.variants;
                            return [5 /*yield**/, _loop_1(product, variants)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/, errors];
                    }
                });
            });
        };
        Importer_1.prototype.getFacetValueIds = function (ctx, facets, languageCode) {
            return __awaiter(this, void 0, void 0, function () {
                var facetValueIds, _loop_3, this_2, _i, facets_1, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            facetValueIds = [];
                            _loop_3 = function (item) {
                                var itemMainTranslation, facetName, valueName, facetEntity, cachedFacet, existing, facetValueEntity, facetValueMapKey, cachedFacetValue, existing;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            itemMainTranslation = this_2.getTranslationByCodeOrFirst(item.translations, languageCode);
                                            facetName = itemMainTranslation.facet;
                                            valueName = itemMainTranslation.value;
                                            facetEntity = void 0;
                                            cachedFacet = this_2.facetMap.get(facetName);
                                            if (!cachedFacet) return [3 /*break*/, 1];
                                            facetEntity = cachedFacet;
                                            return [3 /*break*/, 6];
                                        case 1: return [4 /*yield*/, this_2.facetService.findByCode(ctx, (0, normalize_string_1.normalizeString)(facetName, '-'), languageCode)];
                                        case 2:
                                            existing = _b.sent();
                                            if (!existing) return [3 /*break*/, 3];
                                            facetEntity = existing;
                                            return [3 /*break*/, 5];
                                        case 3: return [4 /*yield*/, this_2.facetService.create(ctx, {
                                                isPrivate: false,
                                                code: (0, normalize_string_1.normalizeString)(facetName, '-'),
                                                translations: item.translations.map(function (translation) {
                                                    return {
                                                        languageCode: translation.languageCode,
                                                        name: translation.facet,
                                                    };
                                                }),
                                            })];
                                        case 4:
                                            facetEntity = _b.sent();
                                            _b.label = 5;
                                        case 5:
                                            this_2.facetMap.set(facetName, facetEntity);
                                            _b.label = 6;
                                        case 6:
                                            facetValueEntity = void 0;
                                            facetValueMapKey = "".concat(facetName, ":").concat(valueName);
                                            cachedFacetValue = this_2.facetValueMap.get(facetValueMapKey);
                                            if (!cachedFacetValue) return [3 /*break*/, 7];
                                            facetValueEntity = cachedFacetValue;
                                            return [3 /*break*/, 11];
                                        case 7:
                                            existing = facetEntity.values.find(function (v) { return v.name === valueName; });
                                            if (!existing) return [3 /*break*/, 8];
                                            facetValueEntity = existing;
                                            return [3 /*break*/, 10];
                                        case 8: return [4 /*yield*/, this_2.facetValueService.create(ctx, facetEntity, {
                                                code: (0, normalize_string_1.normalizeString)(valueName, '-'),
                                                translations: item.translations.map(function (translation) {
                                                    return {
                                                        languageCode: translation.languageCode,
                                                        name: translation.value,
                                                    };
                                                }),
                                            })];
                                        case 9:
                                            facetValueEntity = _b.sent();
                                            _b.label = 10;
                                        case 10:
                                            this_2.facetValueMap.set(facetValueMapKey, facetValueEntity);
                                            _b.label = 11;
                                        case 11:
                                            facetValueIds.push(facetValueEntity.id);
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_2 = this;
                            _i = 0, facets_1 = facets;
                            _a.label = 1;
                        case 1:
                            if (!(_i < facets_1.length)) return [3 /*break*/, 4];
                            item = facets_1[_i];
                            return [5 /*yield**/, _loop_3(item)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, facetValueIds];
                    }
                });
            });
        };
        Importer_1.prototype.processCustomFieldValues = function (customFields, config) {
            var processed = {};
            for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
                var fieldDef = config_1[_i];
                var value = customFields[fieldDef.name];
                if (fieldDef.list === true) {
                    processed[fieldDef.name] = value === null || value === void 0 ? void 0 : value.split('|').filter(function (val) { return val.trim() !== ''; });
                }
                else if (fieldDef.type === 'boolean') {
                    processed[fieldDef.name] = value ? value.toLowerCase() === 'true' : undefined;
                }
                else {
                    processed[fieldDef.name] = value ? value : undefined;
                }
            }
            return processed;
        };
        /**
         * Attempts to match a TaxCategory entity against the name supplied in the import table. If no matches
         * are found, the first TaxCategory id is returned.
         */
        Importer_1.prototype.getMatchingTaxCategoryId = function (name, taxCategories) {
            if (this.taxCategoryMatches[name]) {
                return this.taxCategoryMatches[name];
            }
            var regex = new RegExp(name, 'i');
            var found = taxCategories.find(function (tc) { return !!tc.name.match(regex); });
            var match = found ? found : taxCategories[0];
            this.taxCategoryMatches[name] = match.id;
            return match.id;
        };
        Importer_1.prototype.getTranslationByCodeOrFirst = function (translations, languageCode) {
            var translation = translations.find(function (t) { return t.languageCode === languageCode; });
            if (!translation) {
                translation = translations[0];
            }
            return translation;
        };
        return Importer_1;
    }());
    __setFunctionName(_classThis, "Importer");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Importer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Importer = _classThis;
}();
exports.Importer = Importer;
