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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariant = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var round_money_1 = require("../../common/round-money");
var asset_entity_1 = require("../asset/asset.entity");
var base_entity_1 = require("../base/base.entity");
var channel_entity_1 = require("../channel/channel.entity");
var collection_entity_1 = require("../collection/collection.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var facet_value_entity_1 = require("../facet-value/facet-value.entity");
var order_line_entity_1 = require("../order-line/order-line.entity");
var product_entity_1 = require("../product/product.entity");
var product_option_entity_1 = require("../product-option/product-option.entity");
var stock_level_entity_1 = require("../stock-level/stock-level.entity");
var stock_movement_entity_1 = require("../stock-movement/stock-movement.entity");
var tax_category_entity_1 = require("../tax-category/tax-category.entity");
var product_variant_asset_entity_1 = require("./product-variant-asset.entity");
var product_variant_price_entity_1 = require("./product-variant-price.entity");
var product_variant_translation_entity_1 = require("./product-variant-translation.entity");
/**
 * @description
 * A ProductVariant represents a single stock keeping unit (SKU) in the store's inventory.
 * Whereas a {@link Product} is a "container" of variants, the variant itself holds the
 * data on price, tax category etc. When one adds items to their cart, they are adding
 * ProductVariants, not Products.
 *
 * @docsCategory entities
 */
var ProductVariant = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _instanceExtraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _sku_decorators;
    var _sku_initializers = [];
    var _sku_extraInitializers = [];
    var _get_price_decorators;
    var _get_priceWithTax_decorators;
    var _featuredAsset_decorators;
    var _featuredAsset_initializers = [];
    var _featuredAsset_extraInitializers = [];
    var _featuredAssetId_decorators;
    var _featuredAssetId_initializers = [];
    var _featuredAssetId_extraInitializers = [];
    var _assets_decorators;
    var _assets_initializers = [];
    var _assets_extraInitializers = [];
    var _taxCategory_decorators;
    var _taxCategory_initializers = [];
    var _taxCategory_extraInitializers = [];
    var _taxCategoryId_decorators;
    var _taxCategoryId_initializers = [];
    var _taxCategoryId_extraInitializers = [];
    var _productVariantPrices_decorators;
    var _productVariantPrices_initializers = [];
    var _productVariantPrices_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _product_decorators;
    var _product_initializers = [];
    var _product_extraInitializers = [];
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _outOfStockThreshold_decorators;
    var _outOfStockThreshold_initializers = [];
    var _outOfStockThreshold_extraInitializers = [];
    var _useGlobalOutOfStockThreshold_decorators;
    var _useGlobalOutOfStockThreshold_initializers = [];
    var _useGlobalOutOfStockThreshold_extraInitializers = [];
    var _trackInventory_decorators;
    var _trackInventory_initializers = [];
    var _trackInventory_extraInitializers = [];
    var _stockLevels_decorators;
    var _stockLevels_initializers = [];
    var _stockLevels_extraInitializers = [];
    var _stockMovements_decorators;
    var _stockMovements_initializers = [];
    var _stockMovements_extraInitializers = [];
    var _options_decorators;
    var _options_initializers = [];
    var _options_extraInitializers = [];
    var _facetValues_decorators;
    var _facetValues_initializers = [];
    var _facetValues_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _collections_decorators;
    var _collections_initializers = [];
    var _collections_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _lines_decorators;
    var _lines_initializers = [];
    var _lines_extraInitializers = [];
    var ProductVariant = _classThis = /** @class */ (function (_super) {
        __extends(ProductVariant_1, _super);
        function ProductVariant_1(input) {
            var _this = _super.call(this, input) || this;
            _this.deletedAt = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _deletedAt_initializers, void 0));
            _this.name = __runInitializers(_this, _deletedAt_extraInitializers);
            _this.enabled = __runInitializers(_this, _enabled_initializers, void 0);
            _this.sku = (__runInitializers(_this, _enabled_extraInitializers), __runInitializers(_this, _sku_initializers, void 0));
            /**
             * Calculated at run-time
             */
            _this.listPrice = __runInitializers(_this, _sku_extraInitializers);
            _this.featuredAsset = __runInitializers(_this, _featuredAsset_initializers, void 0);
            _this.featuredAssetId = (__runInitializers(_this, _featuredAsset_extraInitializers), __runInitializers(_this, _featuredAssetId_initializers, void 0));
            _this.assets = (__runInitializers(_this, _featuredAssetId_extraInitializers), __runInitializers(_this, _assets_initializers, void 0));
            _this.taxCategory = (__runInitializers(_this, _assets_extraInitializers), __runInitializers(_this, _taxCategory_initializers, void 0));
            _this.taxCategoryId = (__runInitializers(_this, _taxCategory_extraInitializers), __runInitializers(_this, _taxCategoryId_initializers, void 0));
            _this.productVariantPrices = (__runInitializers(_this, _taxCategoryId_extraInitializers), __runInitializers(_this, _productVariantPrices_initializers, void 0));
            _this.translations = (__runInitializers(_this, _productVariantPrices_extraInitializers), __runInitializers(_this, _translations_initializers, void 0));
            _this.product = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _product_initializers, void 0));
            _this.productId = (__runInitializers(_this, _product_extraInitializers), __runInitializers(_this, _productId_initializers, void 0));
            /**
             * @description
             * Specifies the value of stockOnHand at which the ProductVariant is considered
             * out of stock.
             */
            _this.outOfStockThreshold = (__runInitializers(_this, _productId_extraInitializers), __runInitializers(_this, _outOfStockThreshold_initializers, void 0));
            /**
             * @description
             * When true, the `outOfStockThreshold` value will be taken from the GlobalSettings and the
             * value set on this ProductVariant will be ignored.
             */
            _this.useGlobalOutOfStockThreshold = (__runInitializers(_this, _outOfStockThreshold_extraInitializers), __runInitializers(_this, _useGlobalOutOfStockThreshold_initializers, void 0));
            _this.trackInventory = (__runInitializers(_this, _useGlobalOutOfStockThreshold_extraInitializers), __runInitializers(_this, _trackInventory_initializers, void 0));
            _this.stockLevels = (__runInitializers(_this, _trackInventory_extraInitializers), __runInitializers(_this, _stockLevels_initializers, void 0));
            _this.stockMovements = (__runInitializers(_this, _stockLevels_extraInitializers), __runInitializers(_this, _stockMovements_initializers, void 0));
            _this.options = (__runInitializers(_this, _stockMovements_extraInitializers), __runInitializers(_this, _options_initializers, void 0));
            _this.facetValues = (__runInitializers(_this, _options_extraInitializers), __runInitializers(_this, _facetValues_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _facetValues_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.collections = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _collections_initializers, void 0));
            _this.channels = (__runInitializers(_this, _collections_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.lines = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _lines_initializers, void 0));
            __runInitializers(_this, _lines_extraInitializers);
            return _this;
        }
        Object.defineProperty(ProductVariant_1.prototype, "price", {
            get: function () {
                if (this.listPrice == null) {
                    return 0;
                }
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? this.taxRateApplied.netPriceOf(this.listPrice) : this.listPrice);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ProductVariant_1.prototype, "priceWithTax", {
            get: function () {
                if (this.listPrice == null) {
                    return 0;
                }
                return (0, round_money_1.roundMoney)(this.listPriceIncludesTax ? this.listPrice : this.taxRateApplied.grossPriceOf(this.listPrice));
            },
            enumerable: false,
            configurable: true
        });
        return ProductVariant_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ProductVariant");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _enabled_decorators = [(0, typeorm_1.Column)({ default: true })];
        _sku_decorators = [(0, typeorm_1.Column)()];
        _get_price_decorators = [(0, calculated_decorator_1.Calculated)({
                expression: 'productvariant__productVariantPrices.price',
            })];
        _get_priceWithTax_decorators = [(0, calculated_decorator_1.Calculated)({
                // Note: this works fine for sorting by priceWithTax, but filtering will return inaccurate
                // results due to this expression not taking taxes into account. This is because the tax
                // rate is calculated at run-time in the application layer based on the current context,
                // and is unknown to the database.
                expression: 'productvariant__productVariantPrices.price',
            })];
        _featuredAsset_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return asset_entity_1.Asset; }, function (asset) { return asset.featuredInVariants; }, { onDelete: 'SET NULL' })];
        _featuredAssetId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _assets_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_variant_asset_entity_1.ProductVariantAsset; }, function (productVariantAsset) { return productVariantAsset.productVariant; }, {
                onDelete: 'SET NULL',
            })];
        _taxCategory_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return tax_category_entity_1.TaxCategory; }, function (taxCategory) { return taxCategory.productVariants; })];
        _taxCategoryId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _productVariantPrices_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_variant_price_entity_1.ProductVariantPrice; }, function (price) { return price.variant; }, { eager: true })];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return product_variant_translation_entity_1.ProductVariantTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _product_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return product_entity_1.Product; }, function (product) { return product.variants; })];
        _productId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _outOfStockThreshold_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _useGlobalOutOfStockThreshold_decorators = [(0, typeorm_1.Column)({ default: true })];
        _trackInventory_decorators = [(0, typeorm_1.Column)({ type: 'varchar', default: generated_types_1.GlobalFlag.INHERIT })];
        _stockLevels_decorators = [(0, typeorm_1.OneToMany)(function (type) { return stock_level_entity_1.StockLevel; }, function (stockLevel) { return stockLevel.productVariant; })];
        _stockMovements_decorators = [(0, typeorm_1.OneToMany)(function (type) { return stock_movement_entity_1.StockMovement; }, function (stockMovement) { return stockMovement.productVariant; })];
        _options_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return product_option_entity_1.ProductOption; }, function (productOption) { return productOption.productVariants; }), (0, typeorm_1.JoinTable)()];
        _facetValues_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return facet_value_entity_1.FacetValue; }, function (facetValue) { return facetValue.productVariants; }), (0, typeorm_1.JoinTable)()];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomProductVariantFields; })];
        _collections_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return collection_entity_1.Collection; }, function (collection) { return collection.productVariants; })];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.productVariants; }), (0, typeorm_1.JoinTable)()];
        _lines_decorators = [(0, typeorm_1.OneToMany)(function (type) { return order_line_entity_1.OrderLine; }, function (orderLine) { return orderLine.productVariant; })];
        __esDecorate(_classThis, null, _get_price_decorators, { kind: "getter", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_priceWithTax_decorators, { kind: "getter", name: "priceWithTax", static: false, private: false, access: { has: function (obj) { return "priceWithTax" in obj; }, get: function (obj) { return obj.priceWithTax; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _sku_decorators, { kind: "field", name: "sku", static: false, private: false, access: { has: function (obj) { return "sku" in obj; }, get: function (obj) { return obj.sku; }, set: function (obj, value) { obj.sku = value; } }, metadata: _metadata }, _sku_initializers, _sku_extraInitializers);
        __esDecorate(null, null, _featuredAsset_decorators, { kind: "field", name: "featuredAsset", static: false, private: false, access: { has: function (obj) { return "featuredAsset" in obj; }, get: function (obj) { return obj.featuredAsset; }, set: function (obj, value) { obj.featuredAsset = value; } }, metadata: _metadata }, _featuredAsset_initializers, _featuredAsset_extraInitializers);
        __esDecorate(null, null, _featuredAssetId_decorators, { kind: "field", name: "featuredAssetId", static: false, private: false, access: { has: function (obj) { return "featuredAssetId" in obj; }, get: function (obj) { return obj.featuredAssetId; }, set: function (obj, value) { obj.featuredAssetId = value; } }, metadata: _metadata }, _featuredAssetId_initializers, _featuredAssetId_extraInitializers);
        __esDecorate(null, null, _assets_decorators, { kind: "field", name: "assets", static: false, private: false, access: { has: function (obj) { return "assets" in obj; }, get: function (obj) { return obj.assets; }, set: function (obj, value) { obj.assets = value; } }, metadata: _metadata }, _assets_initializers, _assets_extraInitializers);
        __esDecorate(null, null, _taxCategory_decorators, { kind: "field", name: "taxCategory", static: false, private: false, access: { has: function (obj) { return "taxCategory" in obj; }, get: function (obj) { return obj.taxCategory; }, set: function (obj, value) { obj.taxCategory = value; } }, metadata: _metadata }, _taxCategory_initializers, _taxCategory_extraInitializers);
        __esDecorate(null, null, _taxCategoryId_decorators, { kind: "field", name: "taxCategoryId", static: false, private: false, access: { has: function (obj) { return "taxCategoryId" in obj; }, get: function (obj) { return obj.taxCategoryId; }, set: function (obj, value) { obj.taxCategoryId = value; } }, metadata: _metadata }, _taxCategoryId_initializers, _taxCategoryId_extraInitializers);
        __esDecorate(null, null, _productVariantPrices_decorators, { kind: "field", name: "productVariantPrices", static: false, private: false, access: { has: function (obj) { return "productVariantPrices" in obj; }, get: function (obj) { return obj.productVariantPrices; }, set: function (obj, value) { obj.productVariantPrices = value; } }, metadata: _metadata }, _productVariantPrices_initializers, _productVariantPrices_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _product_decorators, { kind: "field", name: "product", static: false, private: false, access: { has: function (obj) { return "product" in obj; }, get: function (obj) { return obj.product; }, set: function (obj, value) { obj.product = value; } }, metadata: _metadata }, _product_initializers, _product_extraInitializers);
        __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
        __esDecorate(null, null, _outOfStockThreshold_decorators, { kind: "field", name: "outOfStockThreshold", static: false, private: false, access: { has: function (obj) { return "outOfStockThreshold" in obj; }, get: function (obj) { return obj.outOfStockThreshold; }, set: function (obj, value) { obj.outOfStockThreshold = value; } }, metadata: _metadata }, _outOfStockThreshold_initializers, _outOfStockThreshold_extraInitializers);
        __esDecorate(null, null, _useGlobalOutOfStockThreshold_decorators, { kind: "field", name: "useGlobalOutOfStockThreshold", static: false, private: false, access: { has: function (obj) { return "useGlobalOutOfStockThreshold" in obj; }, get: function (obj) { return obj.useGlobalOutOfStockThreshold; }, set: function (obj, value) { obj.useGlobalOutOfStockThreshold = value; } }, metadata: _metadata }, _useGlobalOutOfStockThreshold_initializers, _useGlobalOutOfStockThreshold_extraInitializers);
        __esDecorate(null, null, _trackInventory_decorators, { kind: "field", name: "trackInventory", static: false, private: false, access: { has: function (obj) { return "trackInventory" in obj; }, get: function (obj) { return obj.trackInventory; }, set: function (obj, value) { obj.trackInventory = value; } }, metadata: _metadata }, _trackInventory_initializers, _trackInventory_extraInitializers);
        __esDecorate(null, null, _stockLevels_decorators, { kind: "field", name: "stockLevels", static: false, private: false, access: { has: function (obj) { return "stockLevels" in obj; }, get: function (obj) { return obj.stockLevels; }, set: function (obj, value) { obj.stockLevels = value; } }, metadata: _metadata }, _stockLevels_initializers, _stockLevels_extraInitializers);
        __esDecorate(null, null, _stockMovements_decorators, { kind: "field", name: "stockMovements", static: false, private: false, access: { has: function (obj) { return "stockMovements" in obj; }, get: function (obj) { return obj.stockMovements; }, set: function (obj, value) { obj.stockMovements = value; } }, metadata: _metadata }, _stockMovements_initializers, _stockMovements_extraInitializers);
        __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: function (obj) { return "options" in obj; }, get: function (obj) { return obj.options; }, set: function (obj, value) { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
        __esDecorate(null, null, _facetValues_decorators, { kind: "field", name: "facetValues", static: false, private: false, access: { has: function (obj) { return "facetValues" in obj; }, get: function (obj) { return obj.facetValues; }, set: function (obj, value) { obj.facetValues = value; } }, metadata: _metadata }, _facetValues_initializers, _facetValues_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _collections_decorators, { kind: "field", name: "collections", static: false, private: false, access: { has: function (obj) { return "collections" in obj; }, get: function (obj) { return obj.collections; }, set: function (obj, value) { obj.collections = value; } }, metadata: _metadata }, _collections_initializers, _collections_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _lines_decorators, { kind: "field", name: "lines", static: false, private: false, access: { has: function (obj) { return "lines" in obj; }, get: function (obj) { return obj.lines; }, set: function (obj, value) { obj.lines = value; } }, metadata: _metadata }, _lines_initializers, _lines_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductVariant = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductVariant = _classThis;
}();
exports.ProductVariant = ProductVariant;
