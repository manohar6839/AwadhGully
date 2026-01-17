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
exports.PasswordResetEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired when a Customer requests a password reset email.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
var PasswordResetEvent = /** @class */ (function (_super) {
    __extends(PasswordResetEvent, _super);
    function PasswordResetEvent(ctx, user) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.user = user;
        return _this;
    }
    return PasswordResetEvent;
}(vendure_event_1.VendureEvent));
exports.PasswordResetEvent = PasswordResetEvent;
