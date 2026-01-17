"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalculatedColumns = getCalculatedColumns;
var calculated_decorator_1 = require("../../../common/calculated-decorator");
/**
 * @description
 * Returns calculated columns definitions for the given entity type.
 */
function getCalculatedColumns(entity) {
    var calculatedColumns = [];
    var prototype = entity.prototype;
    if (prototype.hasOwnProperty(calculated_decorator_1.CALCULATED_PROPERTIES)) {
        for (var _i = 0, _a = prototype[calculated_decorator_1.CALCULATED_PROPERTIES]; _i < _a.length; _i++) {
            var property = _a[_i];
            calculatedColumns.push(property);
        }
    }
    return calculatedColumns;
}
