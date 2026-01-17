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
exports.AssetChannelEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired whenever an {@link Asset} is assigned or removed
 * From a channel.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
var AssetChannelEvent = /** @class */ (function (_super) {
    __extends(AssetChannelEvent, _super);
    function AssetChannelEvent(ctx, asset, channelId, type) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.asset = asset;
        _this.channelId = channelId;
        _this.type = type;
        return _this;
    }
    return AssetChannelEvent;
}(vendure_event_1.VendureEvent));
exports.AssetChannelEvent = AssetChannelEvent;
