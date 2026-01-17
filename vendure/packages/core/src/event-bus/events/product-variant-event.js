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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantEvent = void 0;
var vendure_entity_event_1 = require("../vendure-entity-event");
/**
 * @description
 * This event is fired whenever a {@link ProductVariant} is added, updated
 * or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
var ProductVariantEvent = /** @class */ (function (_super) {
    __extends(ProductVariantEvent, _super);
    function ProductVariantEvent(ctx, entity, type, input) {
        return _super.call(this, entity, type, ctx, input) || this;
    }
    Object.defineProperty(ProductVariantEvent.prototype, "variants", {
        /**
         * Return an variants field to become compatible with the
         * deprecated old version of ProductEvent
         * @deprecated Use `entity` instead
         * @since 1.4
         */
        get: function () {
            return this.entity;
        },
        enumerable: false,
        configurable: true
    });
    return ProductVariantEvent;
}(vendure_entity_event_1.VendureEntityEvent));
exports.ProductVariantEvent = ProductVariantEvent;
