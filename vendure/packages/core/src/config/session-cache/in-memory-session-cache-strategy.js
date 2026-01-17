"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySessionCacheStrategy = void 0;
/**
 * @description
 * Caches session in memory, using a LRU cache implementation. Not suitable for
 * multi-server setups since the cache will be local to each instance, reducing
 * its effectiveness. By default the cache has a size of 1000, meaning that after
 * 1000 sessions have been cached, any new sessions will cause the least-recently-used
 * session to be evicted (removed) from the cache.
 *
 * The cache size can be configured by passing a different number to the constructor
 * function.
 *
 * @docsCategory auth
 */
var InMemorySessionCacheStrategy = /** @class */ (function () {
    function InMemorySessionCacheStrategy(cacheSize) {
        this.cache = new Map();
        this.cacheSize = 1000;
        if (cacheSize != null) {
            if (cacheSize < 1) {
                throw new Error('cacheSize must be a positive integer');
            }
            this.cacheSize = Math.round(cacheSize);
        }
    }
    InMemorySessionCacheStrategy.prototype.delete = function (sessionToken) {
        this.cache.delete(sessionToken);
    };
    InMemorySessionCacheStrategy.prototype.get = function (sessionToken) {
        var item = this.cache.get(sessionToken);
        if (item) {
            // refresh key
            this.cache.delete(sessionToken);
            this.cache.set(sessionToken, item);
        }
        return item;
    };
    InMemorySessionCacheStrategy.prototype.set = function (session) {
        this.cache.set(session.token, session);
        if (this.cache.has(session.token)) {
            // refresh key
            this.cache.delete(session.token);
        }
        else if (this.cache.size === this.cacheSize) {
            // evict oldest
            var oldest = this.first();
            if (oldest) {
                this.cache.delete(oldest);
            }
        }
        this.cache.set(session.token, session);
    };
    InMemorySessionCacheStrategy.prototype.clear = function () {
        this.cache.clear();
    };
    InMemorySessionCacheStrategy.prototype.first = function () {
        return this.cache.keys().next().value;
    };
    return InMemorySessionCacheStrategy;
}());
exports.InMemorySessionCacheStrategy = InMemorySessionCacheStrategy;
