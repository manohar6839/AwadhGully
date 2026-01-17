"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoIncrementIdStrategy = void 0;
/**
 * @description
 * An id strategy which uses auto-increment integers as primary keys
 * for all entities. This is the default strategy used by Vendure.
 *
 * @docsCategory configuration
 * @docsPage EntityIdStrategy
 */
var AutoIncrementIdStrategy = /** @class */ (function () {
    function AutoIncrementIdStrategy() {
        this.primaryKeyType = 'increment';
    }
    AutoIncrementIdStrategy.prototype.decodeId = function (id) {
        var asNumber = +id;
        return Number.isNaN(asNumber) ? -1 : asNumber;
    };
    AutoIncrementIdStrategy.prototype.encodeId = function (primaryKey) {
        return primaryKey.toString();
    };
    return AutoIncrementIdStrategy;
}());
exports.AutoIncrementIdStrategy = AutoIncrementIdStrategy;
