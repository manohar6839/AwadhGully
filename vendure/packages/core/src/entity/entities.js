"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreEntitiesMap = void 0;
var address_entity_1 = require("./address/address.entity");
var administrator_entity_1 = require("./administrator/administrator.entity");
var asset_entity_1 = require("./asset/asset.entity");
var authentication_method_entity_1 = require("./authentication-method/authentication-method.entity");
var external_authentication_method_entity_1 = require("./authentication-method/external-authentication-method.entity");
var native_authentication_method_entity_1 = require("./authentication-method/native-authentication-method.entity");
var channel_entity_1 = require("./channel/channel.entity");
var collection_asset_entity_1 = require("./collection/collection-asset.entity");
var collection_translation_entity_1 = require("./collection/collection-translation.entity");
var collection_entity_1 = require("./collection/collection.entity");
var customer_group_entity_1 = require("./customer-group/customer-group.entity");
var customer_entity_1 = require("./customer/customer.entity");
var facet_value_translation_entity_1 = require("./facet-value/facet-value-translation.entity");
var facet_value_entity_1 = require("./facet-value/facet-value.entity");
var facet_translation_entity_1 = require("./facet/facet-translation.entity");
var facet_entity_1 = require("./facet/facet.entity");
var fulfillment_entity_1 = require("./fulfillment/fulfillment.entity");
var global_settings_entity_1 = require("./global-settings/global-settings.entity");
var customer_history_entry_entity_1 = require("./history-entry/customer-history-entry.entity");
var history_entry_entity_1 = require("./history-entry/history-entry.entity");
var order_history_entry_entity_1 = require("./history-entry/order-history-entry.entity");
var fulfillment_line_entity_1 = require("./order-line-reference/fulfillment-line.entity");
var order_line_reference_entity_1 = require("./order-line-reference/order-line-reference.entity");
var order_modification_line_entity_1 = require("./order-line-reference/order-modification-line.entity");
var refund_line_entity_1 = require("./order-line-reference/refund-line.entity");
var order_line_entity_1 = require("./order-line/order-line.entity");
var order_modification_entity_1 = require("./order-modification/order-modification.entity");
var order_entity_1 = require("./order/order.entity");
var payment_method_translation_entity_1 = require("./payment-method/payment-method-translation.entity");
var payment_method_entity_1 = require("./payment-method/payment-method.entity");
var payment_entity_1 = require("./payment/payment.entity");
var product_option_group_translation_entity_1 = require("./product-option-group/product-option-group-translation.entity");
var product_option_group_entity_1 = require("./product-option-group/product-option-group.entity");
var product_option_translation_entity_1 = require("./product-option/product-option-translation.entity");
var product_option_entity_1 = require("./product-option/product-option.entity");
var product_variant_asset_entity_1 = require("./product-variant/product-variant-asset.entity");
var product_variant_price_entity_1 = require("./product-variant/product-variant-price.entity");
var product_variant_translation_entity_1 = require("./product-variant/product-variant-translation.entity");
var product_variant_entity_1 = require("./product-variant/product-variant.entity");
var product_asset_entity_1 = require("./product/product-asset.entity");
var product_translation_entity_1 = require("./product/product-translation.entity");
var product_entity_1 = require("./product/product.entity");
var promotion_translation_entity_1 = require("./promotion/promotion-translation.entity");
var promotion_entity_1 = require("./promotion/promotion.entity");
var refund_entity_1 = require("./refund/refund.entity");
var country_entity_1 = require("./region/country.entity");
var province_entity_1 = require("./region/province.entity");
var region_translation_entity_1 = require("./region/region-translation.entity");
var region_entity_1 = require("./region/region.entity");
var role_entity_1 = require("./role/role.entity");
var seller_entity_1 = require("./seller/seller.entity");
var anonymous_session_entity_1 = require("./session/anonymous-session.entity");
var authenticated_session_entity_1 = require("./session/authenticated-session.entity");
var session_entity_1 = require("./session/session.entity");
var settings_store_entry_entity_1 = require("./settings-store-entry/settings-store-entry.entity");
var shipping_line_entity_1 = require("./shipping-line/shipping-line.entity");
var shipping_method_translation_entity_1 = require("./shipping-method/shipping-method-translation.entity");
var shipping_method_entity_1 = require("./shipping-method/shipping-method.entity");
var stock_level_entity_1 = require("./stock-level/stock-level.entity");
var stock_location_entity_1 = require("./stock-location/stock-location.entity");
var allocation_entity_1 = require("./stock-movement/allocation.entity");
var cancellation_entity_1 = require("./stock-movement/cancellation.entity");
var release_entity_1 = require("./stock-movement/release.entity");
var sale_entity_1 = require("./stock-movement/sale.entity");
var stock_adjustment_entity_1 = require("./stock-movement/stock-adjustment.entity");
var stock_movement_entity_1 = require("./stock-movement/stock-movement.entity");
var surcharge_entity_1 = require("./surcharge/surcharge.entity");
var tag_entity_1 = require("./tag/tag.entity");
var tax_category_entity_1 = require("./tax-category/tax-category.entity");
var tax_rate_entity_1 = require("./tax-rate/tax-rate.entity");
var user_entity_1 = require("./user/user.entity");
var zone_entity_1 = require("./zone/zone.entity");
/**
 * A map of all the core database entities.
 */
exports.coreEntitiesMap = {
    Address: address_entity_1.Address,
    Administrator: administrator_entity_1.Administrator,
    Allocation: allocation_entity_1.Allocation,
    AnonymousSession: anonymous_session_entity_1.AnonymousSession,
    Asset: asset_entity_1.Asset,
    AuthenticatedSession: authenticated_session_entity_1.AuthenticatedSession,
    AuthenticationMethod: authentication_method_entity_1.AuthenticationMethod,
    Cancellation: cancellation_entity_1.Cancellation,
    Channel: channel_entity_1.Channel,
    Collection: collection_entity_1.Collection,
    CollectionAsset: collection_asset_entity_1.CollectionAsset,
    CollectionTranslation: collection_translation_entity_1.CollectionTranslation,
    Country: country_entity_1.Country,
    Customer: customer_entity_1.Customer,
    CustomerGroup: customer_group_entity_1.CustomerGroup,
    CustomerHistoryEntry: customer_history_entry_entity_1.CustomerHistoryEntry,
    ExternalAuthenticationMethod: external_authentication_method_entity_1.ExternalAuthenticationMethod,
    Facet: facet_entity_1.Facet,
    FacetTranslation: facet_translation_entity_1.FacetTranslation,
    FacetValue: facet_value_entity_1.FacetValue,
    FacetValueTranslation: facet_value_translation_entity_1.FacetValueTranslation,
    Fulfillment: fulfillment_entity_1.Fulfillment,
    FulfillmentLine: fulfillment_line_entity_1.FulfillmentLine,
    GlobalSettings: global_settings_entity_1.GlobalSettings,
    HistoryEntry: history_entry_entity_1.HistoryEntry,
    NativeAuthenticationMethod: native_authentication_method_entity_1.NativeAuthenticationMethod,
    OrderModificationLine: order_modification_line_entity_1.OrderModificationLine,
    Order: order_entity_1.Order,
    OrderHistoryEntry: order_history_entry_entity_1.OrderHistoryEntry,
    OrderLine: order_line_entity_1.OrderLine,
    OrderLineReference: order_line_reference_entity_1.OrderLineReference,
    OrderModification: order_modification_entity_1.OrderModification,
    Payment: payment_entity_1.Payment,
    PaymentMethod: payment_method_entity_1.PaymentMethod,
    PaymentMethodTranslation: payment_method_translation_entity_1.PaymentMethodTranslation,
    Product: product_entity_1.Product,
    ProductAsset: product_asset_entity_1.ProductAsset,
    ProductOption: product_option_entity_1.ProductOption,
    ProductOptionGroup: product_option_group_entity_1.ProductOptionGroup,
    ProductOptionGroupTranslation: product_option_group_translation_entity_1.ProductOptionGroupTranslation,
    ProductOptionTranslation: product_option_translation_entity_1.ProductOptionTranslation,
    ProductTranslation: product_translation_entity_1.ProductTranslation,
    ProductVariant: product_variant_entity_1.ProductVariant,
    ProductVariantAsset: product_variant_asset_entity_1.ProductVariantAsset,
    ProductVariantPrice: product_variant_price_entity_1.ProductVariantPrice,
    ProductVariantTranslation: product_variant_translation_entity_1.ProductVariantTranslation,
    Promotion: promotion_entity_1.Promotion,
    PromotionTranslation: promotion_translation_entity_1.PromotionTranslation,
    Province: province_entity_1.Province,
    Refund: refund_entity_1.Refund,
    RefundLine: refund_line_entity_1.RefundLine,
    Region: region_entity_1.Region,
    RegionTranslation: region_translation_entity_1.RegionTranslation,
    Release: release_entity_1.Release,
    Role: role_entity_1.Role,
    Sale: sale_entity_1.Sale,
    Session: session_entity_1.Session,
    SettingsStoreEntry: settings_store_entry_entity_1.SettingsStoreEntry,
    ShippingLine: shipping_line_entity_1.ShippingLine,
    ShippingMethod: shipping_method_entity_1.ShippingMethod,
    ShippingMethodTranslation: shipping_method_translation_entity_1.ShippingMethodTranslation,
    StockAdjustment: stock_adjustment_entity_1.StockAdjustment,
    StockLevel: stock_level_entity_1.StockLevel,
    StockLocation: stock_location_entity_1.StockLocation,
    StockMovement: stock_movement_entity_1.StockMovement,
    Surcharge: surcharge_entity_1.Surcharge,
    Tag: tag_entity_1.Tag,
    TaxCategory: tax_category_entity_1.TaxCategory,
    TaxRate: tax_rate_entity_1.TaxRate,
    User: user_entity_1.User,
    Seller: seller_entity_1.Seller,
    Zone: zone_entity_1.Zone,
};
