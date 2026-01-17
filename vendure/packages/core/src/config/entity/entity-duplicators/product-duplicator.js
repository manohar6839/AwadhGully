"use strict";
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
exports.productDuplicator = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var common_1 = require("../../../common");
var errors_1 = require("../../../common/error/errors");
var transactional_connection_1 = require("../../../connection/transactional-connection");
var product_entity_1 = require("../../../entity/product/product.entity");
var product_option_group_entity_1 = require("../../../entity/product-option-group/product-option-group.entity");
var product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
var product_option_group_service_1 = require("../../../service/services/product-option-group.service");
var product_option_service_1 = require("../../../service/services/product-option.service");
var product_variant_service_1 = require("../../../service/services/product-variant.service");
var product_service_1 = require("../../../service/services/product.service");
var entity_duplicator_1 = require("../entity-duplicator");
var connection;
var productService;
var productVariantService;
var productOptionGroupService;
var productOptionService;
/**
 * @description
 * Duplicates a Product and its associated ProductVariants.
 */
exports.productDuplicator = new entity_duplicator_1.EntityDuplicator({
    code: 'product-duplicator',
    description: [
        {
            languageCode: generated_types_1.LanguageCode.en,
            value: 'Default duplicator for Products',
        },
    ],
    requiresPermission: [generated_types_1.Permission.CreateProduct, generated_types_1.Permission.CreateCatalog],
    forEntities: ['Product'],
    args: {
        includeVariants: {
            type: 'boolean',
            defaultValue: true,
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Include variants' }],
        },
    },
    init: function (injector) {
        connection = injector.get(transactional_connection_1.TransactionalConnection);
        productService = injector.get(product_service_1.ProductService);
        productVariantService = injector.get(product_variant_service_1.ProductVariantService);
        productOptionGroupService = injector.get(product_option_group_service_1.ProductOptionGroupService);
        productOptionService = injector.get(product_option_service_1.ProductOptionService);
    },
    duplicate: function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var product, translations, productInput, duplicatedProduct, productVariants, _loop_1, _i, _c, optionGroup, newOptionGroups_1, variantInput, duplicatedProductVariants;
            var _d;
            var ctx = _b.ctx, id = _b.id, args = _b.args;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, connection.getEntityOrThrow(ctx, product_entity_1.Product, id, {
                            relations: {
                                featuredAsset: true,
                                assets: true,
                                channels: true,
                                facetValues: {
                                    facet: true,
                                },
                                optionGroups: {
                                    options: true,
                                },
                            },
                        })];
                    case 1:
                        product = _e.sent();
                        translations = product.translations.map(function (translation) {
                            return {
                                name: translation.name + ' (copy)',
                                slug: translation.slug + '-copy',
                                description: translation.description,
                                languageCode: translation.languageCode,
                                customFields: translation.customFields,
                            };
                        });
                        productInput = {
                            featuredAssetId: (_d = product.featuredAsset) === null || _d === void 0 ? void 0 : _d.id,
                            enabled: false,
                            assetIds: product.assets.map(function (value) { return value.assetId; }),
                            facetValueIds: product.facetValues.map(function (value) { return value.id; }),
                            translations: translations,
                            customFields: product.customFields,
                        };
                        return [4 /*yield*/, productService.create(ctx, productInput)];
                    case 2:
                        duplicatedProduct = _e.sent();
                        if (!args.includeVariants) return [3 /*break*/, 10];
                        return [4 /*yield*/, connection.getRepository(ctx, product_variant_entity_1.ProductVariant).find({
                                where: {
                                    productId: id,
                                    deletedAt: (0, typeorm_1.IsNull)(),
                                },
                                relations: {
                                    options: {
                                        group: true,
                                    },
                                    assets: true,
                                    featuredAsset: true,
                                    stockLevels: true,
                                    facetValues: true,
                                    productVariantPrices: true,
                                    taxCategory: true,
                                },
                            })];
                    case 3:
                        productVariants = _e.sent();
                        if (!(product.optionGroups && product.optionGroups.length)) return [3 /*break*/, 7];
                        _loop_1 = function (optionGroup) {
                            var newOptionGroup, options, _f, options_1, option, newOption;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0: return [4 /*yield*/, productOptionGroupService.create(ctx, {
                                            code: optionGroup.code,
                                            translations: optionGroup.translations.map(function (translation) {
                                                return {
                                                    languageCode: translation.languageCode,
                                                    name: translation.name,
                                                    customFields: translation.customFields,
                                                };
                                            }),
                                        })];
                                    case 1:
                                        newOptionGroup = _g.sent();
                                        options = optionGroup.options.map(function (option) {
                                            return {
                                                code: option.code,
                                                productOptionGroupId: newOptionGroup.id,
                                                translations: option.translations.map(function (translation) {
                                                    return {
                                                        languageCode: translation.languageCode,
                                                        name: translation.name,
                                                        customFields: translation.customFields,
                                                    };
                                                }),
                                            };
                                        });
                                        if (!(options && options.length)) return [3 /*break*/, 5];
                                        _f = 0, options_1 = options;
                                        _g.label = 2;
                                    case 2:
                                        if (!(_f < options_1.length)) return [3 /*break*/, 5];
                                        option = options_1[_f];
                                        return [4 /*yield*/, productOptionService.create(ctx, newOptionGroup, option)];
                                    case 3:
                                        newOption = _g.sent();
                                        newOptionGroup.options.push(newOption);
                                        _g.label = 4;
                                    case 4:
                                        _f++;
                                        return [3 /*break*/, 2];
                                    case 5: return [4 /*yield*/, productService.addOptionGroupToProduct(ctx, duplicatedProduct.id, newOptionGroup.id)];
                                    case 6:
                                        _g.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _c = product.optionGroups;
                        _e.label = 4;
                    case 4:
                        if (!(_i < _c.length)) return [3 /*break*/, 7];
                        optionGroup = _c[_i];
                        return [5 /*yield**/, _loop_1(optionGroup)];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, connection.getRepository(ctx, product_option_group_entity_1.ProductOptionGroup).find({
                            where: {
                                product: { id: duplicatedProduct.id },
                            },
                            relations: {
                                options: true,
                            },
                        })];
                    case 8:
                        newOptionGroups_1 = _e.sent();
                        variantInput = productVariants.map(function (variant, i) {
                            var _a, _b, _c, _d, _e;
                            var options = variant.options.map(function (existingOption) {
                                var _a;
                                var newOption = (_a = newOptionGroups_1
                                    .find(function (og) { return og.code === existingOption.group.code; })) === null || _a === void 0 ? void 0 : _a.options.find(function (o) { return o.code === existingOption.code; });
                                if (!newOption) {
                                    throw new errors_1.InternalServerError("An error occurred when creating option ".concat(existingOption.code));
                                }
                                return newOption;
                            });
                            var price = (_b = (_a = variant.productVariantPrices.find(function (p) { return (0, common_1.idsAreEqual)(p.channelId, ctx.channelId); })) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : (_c = variant.productVariantPrices[0]) === null || _c === void 0 ? void 0 : _c.price;
                            return {
                                productId: duplicatedProduct.id,
                                price: price !== null && price !== void 0 ? price : variant.price,
                                sku: "".concat(variant.sku, "-copy"),
                                stockOnHand: 1,
                                featuredAssetId: (_d = variant.featuredAsset) === null || _d === void 0 ? void 0 : _d.id,
                                taxCategoryId: (_e = variant.taxCategory) === null || _e === void 0 ? void 0 : _e.id,
                                useGlobalOutOfStockThreshold: variant.useGlobalOutOfStockThreshold,
                                trackInventory: variant.trackInventory,
                                assetIds: variant.assets.map(function (value) { return value.assetId; }),
                                translations: variant.translations.map(function (translation) {
                                    return {
                                        languageCode: translation.languageCode,
                                        name: translation.name,
                                        customFields: translation.customFields,
                                    };
                                }),
                                optionIds: options.map(function (option) { return option.id; }),
                                facetValueIds: variant.facetValues.map(function (value) { return value.id; }),
                                stockLevels: variant.stockLevels.map(function (stockLevel) { return ({
                                    stockLocationId: stockLevel.stockLocationId,
                                    stockOnHand: stockLevel.stockOnHand,
                                }); }),
                                customFields: variant.customFields,
                            };
                        });
                        return [4 /*yield*/, productVariantService.create(ctx, variantInput)];
                    case 9:
                        duplicatedProductVariants = _e.sent();
                        duplicatedProduct.variants = duplicatedProductVariants;
                        _e.label = 10;
                    case 10: return [2 /*return*/, duplicatedProduct];
                }
            });
        });
    },
});
