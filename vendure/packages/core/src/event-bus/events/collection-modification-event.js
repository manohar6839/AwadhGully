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
exports.CollectionModificationEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired whenever a Collection is modified in some way. The `productVariantIds`
 * argument is an array of ids of all ProductVariants which:
 *
 * 1. were part of this collection prior to modification and are no longer
 * 2. are now part of this collection after modification but were not before
 *
 * @docsCategory events
 * @docsPage Event Types
 */
var CollectionModificationEvent = /** @class */ (function (_super) {
    __extends(CollectionModificationEvent, _super);
    function CollectionModificationEvent(ctx, collection, productVariantIds) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.collection = collection;
        _this.productVariantIds = productVariantIds;
        return _this;
    }
    return CollectionModificationEvent;
}(vendure_event_1.VendureEvent));
exports.CollectionModificationEvent = CollectionModificationEvent;
