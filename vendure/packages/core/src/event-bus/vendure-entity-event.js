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
exports.VendureEntityEvent = void 0;
var vendure_event_1 = require("./vendure-event");
/**
 * @description
 * The base class for all entity events used by the EventBus system.
 * * For event type `'deleted'` the input will most likely be an `id: ID`
 *
 * @docsCategory events
 * */
var VendureEntityEvent = /** @class */ (function (_super) {
    __extends(VendureEntityEvent, _super);
    function VendureEntityEvent(entity, type, ctx, input) {
        var _this = _super.call(this) || this;
        _this.entity = entity;
        _this.type = type;
        _this.ctx = ctx;
        _this.input = input;
        return _this;
    }
    return VendureEntityEvent;
}(vendure_event_1.VendureEvent));
exports.VendureEntityEvent = VendureEntityEvent;
