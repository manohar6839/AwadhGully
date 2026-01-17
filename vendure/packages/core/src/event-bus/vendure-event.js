"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendureEvent = void 0;
/**
 * @description
 * The base class for all events used by the EventBus system.
 *
 * @docsCategory events
 * */
var VendureEvent = /** @class */ (function () {
    function VendureEvent() {
        this.createdAt = new Date();
    }
    return VendureEvent;
}());
exports.VendureEvent = VendureEvent;
