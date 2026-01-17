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
exports.FulfillmentStateTransitionEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired whenever an {@link Fulfillment} transitions from one {@link FulfillmentState} to another.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
var FulfillmentStateTransitionEvent = /** @class */ (function (_super) {
    __extends(FulfillmentStateTransitionEvent, _super);
    function FulfillmentStateTransitionEvent(fromState, toState, ctx, fulfillment) {
        var _this = _super.call(this) || this;
        _this.fromState = fromState;
        _this.toState = toState;
        _this.ctx = ctx;
        _this.fulfillment = fulfillment;
        return _this;
    }
    return FulfillmentStateTransitionEvent;
}(vendure_event_1.VendureEvent));
exports.FulfillmentStateTransitionEvent = FulfillmentStateTransitionEvent;
