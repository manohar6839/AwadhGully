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
exports.StockMovementEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired whenever a {@link StockMovement} entity is created, which occurs when the saleable
 * stock level of a ProductVariant is altered due to things like sales, manual adjustments, and cancellations.
 *
 * @since 1.1.0
 * @docsCategory events
 * @docsPage Event Types
 */
var StockMovementEvent = /** @class */ (function (_super) {
    __extends(StockMovementEvent, _super);
    function StockMovementEvent(ctx, stockMovements) {
        var _a;
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.stockMovements = stockMovements;
        _this.type = (_a = stockMovements[0]) === null || _a === void 0 ? void 0 : _a.type;
        return _this;
    }
    return StockMovementEvent;
}(vendure_event_1.VendureEvent));
exports.StockMovementEvent = StockMovementEvent;
