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
exports.AssetEvent = void 0;
var vendure_entity_event_1 = require("../vendure-entity-event");
/**
 * @description
 * This event is fired whenever a {@link Asset} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
var AssetEvent = /** @class */ (function (_super) {
    __extends(AssetEvent, _super);
    function AssetEvent(ctx, entity, type, input) {
        return _super.call(this, entity, type, ctx, input) || this;
    }
    Object.defineProperty(AssetEvent.prototype, "asset", {
        /**
         * Return an asset field to become compatible with the
         * deprecated old version of AssetEvent
         * @deprecated Use `entity` instead
         * @since 1.4
         */
        get: function () {
            return this.entity;
        },
        enumerable: false,
        configurable: true
    });
    return AssetEvent;
}(vendure_entity_event_1.VendureEntityEvent));
exports.AssetEvent = AssetEvent;
