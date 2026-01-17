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
exports.InitializerEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired when vendure finished initializing its services inside the {@link InitializerService}
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.7.0
 */
var InitializerEvent = /** @class */ (function (_super) {
    __extends(InitializerEvent, _super);
    function InitializerEvent() {
        return _super.call(this) || this;
    }
    return InitializerEvent;
}(vendure_event_1.VendureEvent));
exports.InitializerEvent = InitializerEvent;
