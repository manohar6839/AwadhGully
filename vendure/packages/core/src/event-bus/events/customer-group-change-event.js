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
exports.CustomerGroupChangeEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired whenever one or more {@link Customer} is assigned to or removed from a
 * {@link CustomerGroup}.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
var CustomerGroupChangeEvent = /** @class */ (function (_super) {
    __extends(CustomerGroupChangeEvent, _super);
    function CustomerGroupChangeEvent(ctx, customers, customGroup, type) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.customers = customers;
        _this.customGroup = customGroup;
        _this.type = type;
        return _this;
    }
    return CustomerGroupChangeEvent;
}(vendure_event_1.VendureEvent));
exports.CustomerGroupChangeEvent = CustomerGroupChangeEvent;
