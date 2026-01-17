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
exports.AttemptedLoginEvent = void 0;
var vendure_event_1 = require("../vendure-event");
/**
 * @description
 * This event is fired when an attempt is made to log in via the shop or admin API `login` mutation.
 * The `strategy` represents the name of the AuthenticationStrategy used in the login attempt.
 * If the "native" strategy is used, the additional `identifier` property will be available.
 *
 * @docsCategory events
 * @docsPage Event Types
 */
var AttemptedLoginEvent = /** @class */ (function (_super) {
    __extends(AttemptedLoginEvent, _super);
    function AttemptedLoginEvent(ctx, strategy, identifier) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.strategy = strategy;
        _this.identifier = identifier;
        return _this;
    }
    return AttemptedLoginEvent;
}(vendure_event_1.VendureEvent));
exports.AttemptedLoginEvent = AttemptedLoginEvent;
