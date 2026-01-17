"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopSessionCacheStrategy = void 0;
/**
 * @description
 * A cache that doesn't cache. The cache lookup will miss every time
 * so the session will always be taken from the database.
 *
 * @docsCategory auth
 */
var NoopSessionCacheStrategy = /** @class */ (function () {
    function NoopSessionCacheStrategy() {
    }
    NoopSessionCacheStrategy.prototype.clear = function () {
        return undefined;
    };
    NoopSessionCacheStrategy.prototype.delete = function (sessionToken) {
        return undefined;
    };
    NoopSessionCacheStrategy.prototype.get = function (sessionToken) {
        return undefined;
    };
    NoopSessionCacheStrategy.prototype.set = function (session) {
        return undefined;
    };
    return NoopSessionCacheStrategy;
}());
exports.NoopSessionCacheStrategy = NoopSessionCacheStrategy;
