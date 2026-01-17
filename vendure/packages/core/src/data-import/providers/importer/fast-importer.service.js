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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastImporterService = void 0;
var common_1 = require("@nestjs/common");
var normalize_string_1 = require("@vendure/common/lib/normalize-string");
var unique_1 = require("@vendure/common/lib/unique");
var request_context_1 = require("../../../api/common/request-context");
var product_option_group_translation_entity_1 = require("../../../entity/product-option-group/product-option-group-translation.entity");
var product_option_group_entity_1 = require("../../../entity/product-option-group/product-option-group.entity");
var product_option_translation_entity_1 = require("../../../entity/product-option/product-option-translation.entity");
var product_option_entity_1 = require("../../../entity/product-option/product-option.entity");
var product_variant_asset_entity_1 = require("../../../entity/product-variant/product-variant-asset.entity");
var product_variant_price_entity_1 = require("../../../entity/product-variant/product-variant-price.entity");
var product_variant_translation_entity_1 = require("../../../entity/product-variant/product-variant-translation.entity");
var product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
var product_asset_entity_1 = require("../../../entity/product/product-asset.entity");
var product_translation_entity_1 = require("../../../entity/product/product-translation.entity");
var product_entity_1 = require("../../../entity/product/product.entity");
/**
 * @description
 * A service to import entities into the database. This replaces the regular `create` methods of the service layer with faster
 * versions which skip much of the defensive checks and other DB calls which are not needed when running an import. It also
 * does not publish any events, so e.g. will not trigger search index jobs.
 *
 * In testing, the use of the FastImporterService approximately doubled the speed of bulk imports.
 *
 * @docsCategory import-export
 */
var FastImporterService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FastImporterService = _classThis = /** @class */ (function () {
        /** @internal */
        function FastImporterService_1(connection, channelService, stockMovementService, translatableSaver, requestContextService) {
            this.connection = connection;
            this.channelService = channelService;
            this.stockMovementService = stockMovementService;
            this.translatableSaver = translatableSaver;
            this.requestContextService = requestContextService;
        }
        /**
         * @description
         * This should be called prior to any of the import methods, as it establishes the
         * default Channel as well as the context in which the new entities will be created.
         *
         * Passing a `channel` argument means that Products and ProductVariants will be assigned
         * to that Channel.
         */
        FastImporterService_1.prototype.initialize = function (channel) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this;
                            if (!channel) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.requestContextService.create({
                                    apiType: 'admin',
                                    channelOrToken: channel,
                                })];
                        case 1:
                            _b = _d.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _b = request_context_1.RequestContext.empty();
                            _d.label = 3;
                        case 3:
                            _a.importCtx = _b;
                            _c = this;
                            return [4 /*yield*/, this.channelService.getDefaultChannel(this.importCtx)];
                        case 4:
                            _c.defaultChannel = _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FastImporterService_1.prototype.createProduct = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var product, productAssets;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ensureInitialized();
                            // https://github.com/vendurehq/vendure/issues/2053
                            // normalizes slug without validation for faster performance
                            input.translations.map(function (translation) {
                                translation.slug = (0, normalize_string_1.normalizeString)(translation.slug, '-');
                            });
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: this.importCtx,
                                    input: input,
                                    entityType: product_entity_1.Product,
                                    translationType: product_translation_entity_1.ProductTranslation,
                                    beforeSave: function (p) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            p.channels = (0, unique_1.unique)([this.defaultChannel, this.importCtx.channel], 'id');
                                            if (input.facetValueIds) {
                                                p.facetValues = input.facetValueIds.map(function (id) { return ({ id: id }); });
                                            }
                                            if (input.featuredAssetId) {
                                                p.featuredAsset = { id: input.featuredAssetId };
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); },
                                })];
                        case 1:
                            product = _a.sent();
                            if (!input.assetIds) return [3 /*break*/, 3];
                            productAssets = input.assetIds.map(function (id, i) {
                                return new product_asset_entity_1.ProductAsset({
                                    assetId: id,
                                    productId: product.id,
                                    position: i,
                                });
                            });
                            return [4 /*yield*/, this.connection
                                    .getRepository(this.importCtx, product_asset_entity_1.ProductAsset)
                                    .save(productAssets, { reload: false })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, product.id];
                    }
                });
            });
        };
        FastImporterService_1.prototype.createProductOptionGroup = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ensureInitialized();
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: this.importCtx,
                                    input: input,
                                    entityType: product_option_group_entity_1.ProductOptionGroup,
                                    translationType: product_option_group_translation_entity_1.ProductOptionGroupTranslation,
                                })];
                        case 1:
                            group = _a.sent();
                            return [2 /*return*/, group.id];
                    }
                });
            });
        };
        FastImporterService_1.prototype.createProductOption = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var option;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ensureInitialized();
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: this.importCtx,
                                    input: input,
                                    entityType: product_option_entity_1.ProductOption,
                                    translationType: product_option_translation_entity_1.ProductOptionTranslation,
                                    beforeSave: function (po) { return (po.group = { id: input.productOptionGroupId }); },
                                })];
                        case 1:
                            option = _a.sent();
                            return [2 /*return*/, option.id];
                    }
                });
            });
        };
        FastImporterService_1.prototype.addOptionGroupToProduct = function (productId, optionGroupId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ensureInitialized();
                            return [4 /*yield*/, this.connection
                                    .getRepository(this.importCtx, product_entity_1.Product)
                                    .createQueryBuilder()
                                    .relation('optionGroups')
                                    .of(productId)
                                    .add(optionGroupId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FastImporterService_1.prototype.createProductVariant = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var inputWithoutPrice, createdVariant, variantAssets, assignedChannelIds, _i, assignedChannelIds_1, channelId, variantPrice;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.ensureInitialized();
                            if (!input.optionIds) {
                                input.optionIds = [];
                            }
                            if (input.price == null) {
                                input.price = 0;
                            }
                            inputWithoutPrice = __assign({}, input);
                            delete inputWithoutPrice.price;
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: this.importCtx,
                                    input: inputWithoutPrice,
                                    entityType: product_variant_entity_1.ProductVariant,
                                    translationType: product_variant_translation_entity_1.ProductVariantTranslation,
                                    beforeSave: function (variant) { return __awaiter(_this, void 0, void 0, function () {
                                        var optionIds;
                                        return __generator(this, function (_a) {
                                            variant.channels = (0, unique_1.unique)([this.defaultChannel, this.importCtx.channel], 'id');
                                            optionIds = input.optionIds;
                                            if (optionIds && optionIds.length) {
                                                variant.options = optionIds.map(function (id) { return ({ id: id }); });
                                            }
                                            if (input.facetValueIds) {
                                                variant.facetValues = input.facetValueIds.map(function (id) { return ({ id: id }); });
                                            }
                                            variant.product = { id: input.productId };
                                            variant.taxCategory = { id: input.taxCategoryId };
                                            if (input.featuredAssetId) {
                                                variant.featuredAsset = { id: input.featuredAssetId };
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); },
                                })];
                        case 1:
                            createdVariant = _c.sent();
                            if (!input.assetIds) return [3 /*break*/, 3];
                            variantAssets = input.assetIds.map(function (id, i) {
                                return new product_variant_asset_entity_1.ProductVariantAsset({
                                    assetId: id,
                                    productVariantId: createdVariant.id,
                                    position: i,
                                });
                            });
                            return [4 /*yield*/, this.connection
                                    .getRepository(this.importCtx, product_variant_asset_entity_1.ProductVariantAsset)
                                    .save(variantAssets, { reload: false })];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3: return [4 /*yield*/, this.stockMovementService.adjustProductVariantStock(this.importCtx, createdVariant.id, (_b = (_a = input.stockLevels) !== null && _a !== void 0 ? _a : input.stockOnHand) !== null && _b !== void 0 ? _b : 0)];
                        case 4:
                            _c.sent();
                            assignedChannelIds = (0, unique_1.unique)([this.defaultChannel, this.importCtx.channel], 'id').map(function (c) { return c.id; });
                            _i = 0, assignedChannelIds_1 = assignedChannelIds;
                            _c.label = 5;
                        case 5:
                            if (!(_i < assignedChannelIds_1.length)) return [3 /*break*/, 8];
                            channelId = assignedChannelIds_1[_i];
                            variantPrice = new product_variant_price_entity_1.ProductVariantPrice({
                                price: input.price,
                                channelId: channelId,
                                currencyCode: this.defaultChannel.defaultCurrencyCode,
                            });
                            variantPrice.variant = createdVariant;
                            return [4 /*yield*/, this.connection
                                    .getRepository(this.importCtx, product_variant_price_entity_1.ProductVariantPrice)
                                    .save(variantPrice, { reload: false })];
                        case 6:
                            _c.sent();
                            _c.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 5];
                        case 8: return [2 /*return*/, createdVariant.id];
                    }
                });
            });
        };
        FastImporterService_1.prototype.ensureInitialized = function () {
            if (!this.defaultChannel || !this.importCtx) {
                throw new Error("The FastImporterService must be initialized with a call to 'initialize()' before importing data");
            }
        };
        return FastImporterService_1;
    }());
    __setFunctionName(_classThis, "FastImporterService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FastImporterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FastImporterService = _classThis;
}();
exports.FastImporterService = FastImporterService;
