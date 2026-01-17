"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidIdStrategy = void 0;
/**
 * @description
 * An id strategy which uses string uuids as primary keys
 * for all entities. This strategy can be configured with the
 * `entityIdStrategy` property of the `entityOptions` property
 * of {@link VendureConfig}.
 *
 * @example
 * ```ts
 * import { UuidIdStrategy, VendureConfig } from '\@vendure/core';
 *
 * export const config: VendureConfig = {
 *   entityOptions: {
 *     entityIdStrategy: new UuidIdStrategy(),
 *     // ...
 *   }
 * }
 * ```
 *
 * @docsCategory configuration
 * @docsPage EntityIdStrategy
 */
var UuidIdStrategy = /** @class */ (function () {
    function UuidIdStrategy() {
        this.primaryKeyType = 'uuid';
    }
    UuidIdStrategy.prototype.decodeId = function (id) {
        return id;
    };
    UuidIdStrategy.prototype.encodeId = function (primaryKey) {
        return primaryKey;
    };
    return UuidIdStrategy;
}());
exports.UuidIdStrategy = UuidIdStrategy;
