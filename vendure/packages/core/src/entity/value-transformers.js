"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalTransformer = void 0;
/**
 * Decimal types are returned as strings (e.g. "20.00") by some DBs, e.g. MySQL & Postgres
 */
var DecimalTransformer = /** @class */ (function () {
    function DecimalTransformer() {
    }
    DecimalTransformer.prototype.to = function (value) {
        return value;
    };
    DecimalTransformer.prototype.from = function (value) {
        return Number.parseFloat(value);
    };
    return DecimalTransformer;
}());
exports.DecimalTransformer = DecimalTransformer;
