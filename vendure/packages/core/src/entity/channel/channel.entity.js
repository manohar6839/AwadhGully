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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
var typeorm_1 = require("typeorm");
var __1 = require("..");
var base_entity_1 = require("../base/base.entity");
var collection_entity_1 = require("../collection/collection.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var entity_id_decorator_1 = require("../entity-id.decorator");
var facet_entity_1 = require("../facet/facet.entity");
var facet_value_entity_1 = require("../facet-value/facet-value.entity");
var product_entity_1 = require("../product/product.entity");
var product_variant_entity_1 = require("../product-variant/product-variant.entity");
var seller_entity_1 = require("../seller/seller.entity");
var zone_entity_1 = require("../zone/zone.entity");
/**
 * @description
 * A Channel represents a distinct sales channel and configures defaults for that
 * channel.
 *
 * * Set a channel-specific currency, language, tax and shipping defaults
 * * Assign only specific Products to the Channel (with Channel-specific prices)
 * * Create Administrator roles limited to the Channel
 * * Assign only specific StockLocations, Assets, Facets, Collections, Promotions, ShippingMethods & PaymentMethods to the Channel
 * * Have Orders and Customers associated with specific Channels.
 *
 * In Vendure, Channels have a number of different uses, such as:
 *
 * * Multi-region stores, where there is a distinct website for each territory with its own available inventory, pricing, tax and shipping rules.
 * * Creating distinct rules and inventory for different sales channels such as Amazon.
 * * Specialized stores offering a subset of the main inventory.
 * * Implementing multi-vendor marketplace applications.
 *
 * @docsCategory entities
 */
var Channel = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_entity_1.VendureEntity;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _seller_decorators;
    var _seller_initializers = [];
    var _seller_extraInitializers = [];
    var _sellerId_decorators;
    var _sellerId_initializers = [];
    var _sellerId_extraInitializers = [];
    var _defaultLanguageCode_decorators;
    var _defaultLanguageCode_initializers = [];
    var _defaultLanguageCode_extraInitializers = [];
    var _availableLanguageCodes_decorators;
    var _availableLanguageCodes_initializers = [];
    var _availableLanguageCodes_extraInitializers = [];
    var _defaultTaxZone_decorators;
    var _defaultTaxZone_initializers = [];
    var _defaultTaxZone_extraInitializers = [];
    var _defaultShippingZone_decorators;
    var _defaultShippingZone_initializers = [];
    var _defaultShippingZone_extraInitializers = [];
    var _defaultCurrencyCode_decorators;
    var _defaultCurrencyCode_initializers = [];
    var _defaultCurrencyCode_extraInitializers = [];
    var _availableCurrencyCodes_decorators;
    var _availableCurrencyCodes_initializers = [];
    var _availableCurrencyCodes_extraInitializers = [];
    var _trackInventory_decorators;
    var _trackInventory_initializers = [];
    var _trackInventory_extraInitializers = [];
    var _outOfStockThreshold_decorators;
    var _outOfStockThreshold_initializers = [];
    var _outOfStockThreshold_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _pricesIncludeTax_decorators;
    var _pricesIncludeTax_initializers = [];
    var _pricesIncludeTax_extraInitializers = [];
    var _products_decorators;
    var _products_initializers = [];
    var _products_extraInitializers = [];
    var _productVariants_decorators;
    var _productVariants_initializers = [];
    var _productVariants_extraInitializers = [];
    var _facetValues_decorators;
    var _facetValues_initializers = [];
    var _facetValues_extraInitializers = [];
    var _facets_decorators;
    var _facets_initializers = [];
    var _facets_extraInitializers = [];
    var _collections_decorators;
    var _collections_initializers = [];
    var _collections_extraInitializers = [];
    var _promotions_decorators;
    var _promotions_initializers = [];
    var _promotions_extraInitializers = [];
    var _paymentMethods_decorators;
    var _paymentMethods_initializers = [];
    var _paymentMethods_extraInitializers = [];
    var _shippingMethods_decorators;
    var _shippingMethods_initializers = [];
    var _shippingMethods_extraInitializers = [];
    var _customers_decorators;
    var _customers_initializers = [];
    var _customers_extraInitializers = [];
    var _roles_decorators;
    var _roles_initializers = [];
    var _roles_extraInitializers = [];
    var _stockLocations_decorators;
    var _stockLocations_initializers = [];
    var _stockLocations_extraInitializers = [];
    var Channel = _classThis = /** @class */ (function (_super) {
        __extends(Channel_1, _super);
        function Channel_1(input) {
            var _this = _super.call(this, input) || this;
            /**
             * @description
             * The name of the Channel. For example "US Webstore" or "German Webstore".
             */
            _this.code = __runInitializers(_this, _code_initializers, void 0);
            /**
             * @description
             * A unique token (string) used to identify the Channel in the `vendure-token` header of the
             * GraphQL API requests.
             */
            _this.token = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _token_initializers, void 0));
            _this.description = (__runInitializers(_this, _token_extraInitializers), __runInitializers(_this, _description_initializers, void 0));
            _this.seller = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _seller_initializers, void 0));
            _this.sellerId = (__runInitializers(_this, _seller_extraInitializers), __runInitializers(_this, _sellerId_initializers, void 0));
            _this.defaultLanguageCode = (__runInitializers(_this, _sellerId_extraInitializers), __runInitializers(_this, _defaultLanguageCode_initializers, void 0));
            _this.availableLanguageCodes = (__runInitializers(_this, _defaultLanguageCode_extraInitializers), __runInitializers(_this, _availableLanguageCodes_initializers, void 0));
            _this.defaultTaxZone = (__runInitializers(_this, _availableLanguageCodes_extraInitializers), __runInitializers(_this, _defaultTaxZone_initializers, void 0));
            _this.defaultShippingZone = (__runInitializers(_this, _defaultTaxZone_extraInitializers), __runInitializers(_this, _defaultShippingZone_initializers, void 0));
            _this.defaultCurrencyCode = (__runInitializers(_this, _defaultShippingZone_extraInitializers), __runInitializers(_this, _defaultCurrencyCode_initializers, void 0));
            _this.availableCurrencyCodes = (__runInitializers(_this, _defaultCurrencyCode_extraInitializers), __runInitializers(_this, _availableCurrencyCodes_initializers, void 0));
            /**
             * @description
             * Specifies the default value for inventory tracking for ProductVariants.
             * Can be overridden per ProductVariant, but this value determines the default
             * if not otherwise specified.
             */
            _this.trackInventory = (__runInitializers(_this, _availableCurrencyCodes_extraInitializers), __runInitializers(_this, _trackInventory_initializers, void 0));
            /**
             * @description
             * Specifies the value of stockOnHand at which a given ProductVariant is considered
             * out of stock.
             */
            _this.outOfStockThreshold = (__runInitializers(_this, _trackInventory_extraInitializers), __runInitializers(_this, _outOfStockThreshold_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _outOfStockThreshold_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.pricesIncludeTax = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _pricesIncludeTax_initializers, void 0));
            _this.products = (__runInitializers(_this, _pricesIncludeTax_extraInitializers), __runInitializers(_this, _products_initializers, void 0));
            _this.productVariants = (__runInitializers(_this, _products_extraInitializers), __runInitializers(_this, _productVariants_initializers, void 0));
            _this.facetValues = (__runInitializers(_this, _productVariants_extraInitializers), __runInitializers(_this, _facetValues_initializers, void 0));
            _this.facets = (__runInitializers(_this, _facetValues_extraInitializers), __runInitializers(_this, _facets_initializers, void 0));
            _this.collections = (__runInitializers(_this, _facets_extraInitializers), __runInitializers(_this, _collections_initializers, void 0));
            _this.promotions = (__runInitializers(_this, _collections_extraInitializers), __runInitializers(_this, _promotions_initializers, void 0));
            _this.paymentMethods = (__runInitializers(_this, _promotions_extraInitializers), __runInitializers(_this, _paymentMethods_initializers, void 0));
            _this.shippingMethods = (__runInitializers(_this, _paymentMethods_extraInitializers), __runInitializers(_this, _shippingMethods_initializers, void 0));
            _this.customers = (__runInitializers(_this, _shippingMethods_extraInitializers), __runInitializers(_this, _customers_initializers, void 0));
            _this.roles = (__runInitializers(_this, _customers_extraInitializers), __runInitializers(_this, _roles_initializers, void 0));
            _this.stockLocations = (__runInitializers(_this, _roles_extraInitializers), __runInitializers(_this, _stockLocations_initializers, void 0));
            __runInitializers(_this, _stockLocations_extraInitializers);
            if (!input || !input.token) {
                _this.token = _this.generateToken();
            }
            return _this;
        }
        Channel_1.prototype.generateToken = function () {
            var randomString = function () { return Math.random().toString(36).substr(3, 10); };
            return "".concat(randomString()).concat(randomString());
        };
        return Channel_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Channel");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _code_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _token_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _description_decorators = [(0, typeorm_1.Column)({ default: '', nullable: true })];
        _seller_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return seller_entity_1.Seller; }, function (seller) { return seller.channels; })];
        _sellerId_decorators = [(0, entity_id_decorator_1.EntityId)({ nullable: true })];
        _defaultLanguageCode_decorators = [(0, typeorm_1.Column)('varchar')];
        _availableLanguageCodes_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _defaultTaxZone_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return zone_entity_1.Zone; }, function (zone) { return zone.defaultTaxZoneChannels; })];
        _defaultShippingZone_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return zone_entity_1.Zone; }, function (zone) { return zone.defaultShippingZoneChannels; })];
        _defaultCurrencyCode_decorators = [(0, typeorm_1.Column)('varchar')];
        _availableCurrencyCodes_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _trackInventory_decorators = [(0, typeorm_1.Column)({ default: true })];
        _outOfStockThreshold_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomChannelFields; })];
        _pricesIncludeTax_decorators = [(0, typeorm_1.Column)()];
        _products_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return product_entity_1.Product; }, function (product) { return product.channels; }, { onDelete: 'CASCADE' })];
        _productVariants_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return product_variant_entity_1.ProductVariant; }, function (productVariant) { return productVariant.channels; }, { onDelete: 'CASCADE' })];
        _facetValues_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return facet_value_entity_1.FacetValue; }, function (facetValue) { return facetValue.channels; }, { onDelete: 'CASCADE' })];
        _facets_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return facet_entity_1.Facet; }, function (facet) { return facet.channels; }, { onDelete: 'CASCADE' })];
        _collections_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return collection_entity_1.Collection; }, function (collection) { return collection.channels; }, { onDelete: 'CASCADE' })];
        _promotions_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return __1.Promotion; }, function (promotion) { return promotion.channels; }, { onDelete: 'CASCADE' })];
        _paymentMethods_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return __1.PaymentMethod; }, function (paymentMethod) { return paymentMethod.channels; }, { onDelete: 'CASCADE' })];
        _shippingMethods_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return __1.ShippingMethod; }, function (shippingMethod) { return shippingMethod.channels; }, { onDelete: 'CASCADE' })];
        _customers_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return __1.Customer; }, function (customer) { return customer.channels; }, { onDelete: 'CASCADE' })];
        _roles_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return __1.Role; }, function (role) { return role.channels; }, { onDelete: 'CASCADE' })];
        _stockLocations_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return __1.StockLocation; }, function (stockLocation) { return stockLocation.channels; }, { onDelete: 'CASCADE' })];
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _seller_decorators, { kind: "field", name: "seller", static: false, private: false, access: { has: function (obj) { return "seller" in obj; }, get: function (obj) { return obj.seller; }, set: function (obj, value) { obj.seller = value; } }, metadata: _metadata }, _seller_initializers, _seller_extraInitializers);
        __esDecorate(null, null, _sellerId_decorators, { kind: "field", name: "sellerId", static: false, private: false, access: { has: function (obj) { return "sellerId" in obj; }, get: function (obj) { return obj.sellerId; }, set: function (obj, value) { obj.sellerId = value; } }, metadata: _metadata }, _sellerId_initializers, _sellerId_extraInitializers);
        __esDecorate(null, null, _defaultLanguageCode_decorators, { kind: "field", name: "defaultLanguageCode", static: false, private: false, access: { has: function (obj) { return "defaultLanguageCode" in obj; }, get: function (obj) { return obj.defaultLanguageCode; }, set: function (obj, value) { obj.defaultLanguageCode = value; } }, metadata: _metadata }, _defaultLanguageCode_initializers, _defaultLanguageCode_extraInitializers);
        __esDecorate(null, null, _availableLanguageCodes_decorators, { kind: "field", name: "availableLanguageCodes", static: false, private: false, access: { has: function (obj) { return "availableLanguageCodes" in obj; }, get: function (obj) { return obj.availableLanguageCodes; }, set: function (obj, value) { obj.availableLanguageCodes = value; } }, metadata: _metadata }, _availableLanguageCodes_initializers, _availableLanguageCodes_extraInitializers);
        __esDecorate(null, null, _defaultTaxZone_decorators, { kind: "field", name: "defaultTaxZone", static: false, private: false, access: { has: function (obj) { return "defaultTaxZone" in obj; }, get: function (obj) { return obj.defaultTaxZone; }, set: function (obj, value) { obj.defaultTaxZone = value; } }, metadata: _metadata }, _defaultTaxZone_initializers, _defaultTaxZone_extraInitializers);
        __esDecorate(null, null, _defaultShippingZone_decorators, { kind: "field", name: "defaultShippingZone", static: false, private: false, access: { has: function (obj) { return "defaultShippingZone" in obj; }, get: function (obj) { return obj.defaultShippingZone; }, set: function (obj, value) { obj.defaultShippingZone = value; } }, metadata: _metadata }, _defaultShippingZone_initializers, _defaultShippingZone_extraInitializers);
        __esDecorate(null, null, _defaultCurrencyCode_decorators, { kind: "field", name: "defaultCurrencyCode", static: false, private: false, access: { has: function (obj) { return "defaultCurrencyCode" in obj; }, get: function (obj) { return obj.defaultCurrencyCode; }, set: function (obj, value) { obj.defaultCurrencyCode = value; } }, metadata: _metadata }, _defaultCurrencyCode_initializers, _defaultCurrencyCode_extraInitializers);
        __esDecorate(null, null, _availableCurrencyCodes_decorators, { kind: "field", name: "availableCurrencyCodes", static: false, private: false, access: { has: function (obj) { return "availableCurrencyCodes" in obj; }, get: function (obj) { return obj.availableCurrencyCodes; }, set: function (obj, value) { obj.availableCurrencyCodes = value; } }, metadata: _metadata }, _availableCurrencyCodes_initializers, _availableCurrencyCodes_extraInitializers);
        __esDecorate(null, null, _trackInventory_decorators, { kind: "field", name: "trackInventory", static: false, private: false, access: { has: function (obj) { return "trackInventory" in obj; }, get: function (obj) { return obj.trackInventory; }, set: function (obj, value) { obj.trackInventory = value; } }, metadata: _metadata }, _trackInventory_initializers, _trackInventory_extraInitializers);
        __esDecorate(null, null, _outOfStockThreshold_decorators, { kind: "field", name: "outOfStockThreshold", static: false, private: false, access: { has: function (obj) { return "outOfStockThreshold" in obj; }, get: function (obj) { return obj.outOfStockThreshold; }, set: function (obj, value) { obj.outOfStockThreshold = value; } }, metadata: _metadata }, _outOfStockThreshold_initializers, _outOfStockThreshold_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _pricesIncludeTax_decorators, { kind: "field", name: "pricesIncludeTax", static: false, private: false, access: { has: function (obj) { return "pricesIncludeTax" in obj; }, get: function (obj) { return obj.pricesIncludeTax; }, set: function (obj, value) { obj.pricesIncludeTax = value; } }, metadata: _metadata }, _pricesIncludeTax_initializers, _pricesIncludeTax_extraInitializers);
        __esDecorate(null, null, _products_decorators, { kind: "field", name: "products", static: false, private: false, access: { has: function (obj) { return "products" in obj; }, get: function (obj) { return obj.products; }, set: function (obj, value) { obj.products = value; } }, metadata: _metadata }, _products_initializers, _products_extraInitializers);
        __esDecorate(null, null, _productVariants_decorators, { kind: "field", name: "productVariants", static: false, private: false, access: { has: function (obj) { return "productVariants" in obj; }, get: function (obj) { return obj.productVariants; }, set: function (obj, value) { obj.productVariants = value; } }, metadata: _metadata }, _productVariants_initializers, _productVariants_extraInitializers);
        __esDecorate(null, null, _facetValues_decorators, { kind: "field", name: "facetValues", static: false, private: false, access: { has: function (obj) { return "facetValues" in obj; }, get: function (obj) { return obj.facetValues; }, set: function (obj, value) { obj.facetValues = value; } }, metadata: _metadata }, _facetValues_initializers, _facetValues_extraInitializers);
        __esDecorate(null, null, _facets_decorators, { kind: "field", name: "facets", static: false, private: false, access: { has: function (obj) { return "facets" in obj; }, get: function (obj) { return obj.facets; }, set: function (obj, value) { obj.facets = value; } }, metadata: _metadata }, _facets_initializers, _facets_extraInitializers);
        __esDecorate(null, null, _collections_decorators, { kind: "field", name: "collections", static: false, private: false, access: { has: function (obj) { return "collections" in obj; }, get: function (obj) { return obj.collections; }, set: function (obj, value) { obj.collections = value; } }, metadata: _metadata }, _collections_initializers, _collections_extraInitializers);
        __esDecorate(null, null, _promotions_decorators, { kind: "field", name: "promotions", static: false, private: false, access: { has: function (obj) { return "promotions" in obj; }, get: function (obj) { return obj.promotions; }, set: function (obj, value) { obj.promotions = value; } }, metadata: _metadata }, _promotions_initializers, _promotions_extraInitializers);
        __esDecorate(null, null, _paymentMethods_decorators, { kind: "field", name: "paymentMethods", static: false, private: false, access: { has: function (obj) { return "paymentMethods" in obj; }, get: function (obj) { return obj.paymentMethods; }, set: function (obj, value) { obj.paymentMethods = value; } }, metadata: _metadata }, _paymentMethods_initializers, _paymentMethods_extraInitializers);
        __esDecorate(null, null, _shippingMethods_decorators, { kind: "field", name: "shippingMethods", static: false, private: false, access: { has: function (obj) { return "shippingMethods" in obj; }, get: function (obj) { return obj.shippingMethods; }, set: function (obj, value) { obj.shippingMethods = value; } }, metadata: _metadata }, _shippingMethods_initializers, _shippingMethods_extraInitializers);
        __esDecorate(null, null, _customers_decorators, { kind: "field", name: "customers", static: false, private: false, access: { has: function (obj) { return "customers" in obj; }, get: function (obj) { return obj.customers; }, set: function (obj, value) { obj.customers = value; } }, metadata: _metadata }, _customers_initializers, _customers_extraInitializers);
        __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: function (obj) { return "roles" in obj; }, get: function (obj) { return obj.roles; }, set: function (obj, value) { obj.roles = value; } }, metadata: _metadata }, _roles_initializers, _roles_extraInitializers);
        __esDecorate(null, null, _stockLocations_decorators, { kind: "field", name: "stockLocations", static: false, private: false, access: { has: function (obj) { return "stockLocations" in obj; }, get: function (obj) { return obj.stockLocations; }, set: function (obj, value) { obj.stockLocations = value; } }, metadata: _metadata }, _stockLocations_initializers, _stockLocations_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Channel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Channel = _classThis;
}();
exports.Channel = Channel;
