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
exports.GlobalSettingsEvent = void 0;
var vendure_entity_event_1 = require("../vendure-entity-event");
/**
 * @description
 * This event is fired whenever a {@link GlobalSettings} is added. The type is always `updated`, because it's
 * only created once and never deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
var GlobalSettingsEvent = /** @class */ (function (_super) {
    __extends(GlobalSettingsEvent, _super);
    function GlobalSettingsEvent(ctx, entity, input) {
        return _super.call(this, entity, 'updated', ctx, input) || this;
    }
    return GlobalSettingsEvent;
}(vendure_entity_event_1.VendureEntityEvent));
exports.GlobalSettingsEvent = GlobalSettingsEvent;
