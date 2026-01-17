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
exports.AdjustmentSource = void 0;
var base_entity_1 = require("../../entity/base/base.entity");
var AdjustmentSource = /** @class */ (function (_super) {
    __extends(AdjustmentSource, _super);
    function AdjustmentSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdjustmentSource.prototype.getSourceId = function () {
        return "".concat(this.type, ":").concat(this.id);
    };
    AdjustmentSource.decodeSourceId = function (sourceId) {
        var _a = sourceId.split(':'), type = _a[0], id = _a[1];
        return {
            type: type,
            id: Number.isNaN(+id) ? id : +id,
        };
    };
    return AdjustmentSource;
}(base_entity_1.VendureEntity));
exports.AdjustmentSource = AdjustmentSource;
