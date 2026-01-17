"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TtlCache = void 0;
/**
 * @description
 * An in-memory cache with a configurable TTL (time to live) which means cache items
 * expire after they have been in the cache longer than that time.
 *
 * The `ttl` config option is in milliseconds. Defaults to 30 seconds TTL and a cache size of 1000.
 *
 * @deprecated Use the CacheService instead
 */
var TtlCache = /** @class */ (function () {
    function TtlCache(config) {
        this.cache = new Map();
        this.ttl = 30 * 1000;
        this.cacheSize = 1000;
        if (config === null || config === void 0 ? void 0 : config.ttl) {
            this.ttl = config.ttl;
        }
        if (config === null || config === void 0 ? void 0 : config.cacheSize) {
            this.cacheSize = config.cacheSize;
        }
    }
    TtlCache.prototype.get = function (key) {
        var hit = this.cache.get(key);
        var now = new Date().getTime();
        if (hit) {
            if (now < hit.expires) {
                return hit.value;
            }
            else {
                this.cache.delete(key);
            }
        }
    };
    TtlCache.prototype.set = function (key, value) {
        if (this.cache.has(key)) {
            // delete key to put the item to the end of
            // the cache, marking it as new again
            this.cache.delete(key);
        }
        else if (this.cache.size === this.cacheSize) {
            // evict oldest
            var oldest = this.first();
            if (oldest) {
                this.cache.delete(oldest);
            }
        }
        this.cache.set(key, {
            value: value,
            expires: new Date().getTime() + this.ttl,
        });
    };
    TtlCache.prototype.delete = function (key) {
        this.cache.delete(key);
    };
    TtlCache.prototype.first = function () {
        return this.cache.keys().next().value;
    };
    return TtlCache;
}());
exports.TtlCache = TtlCache;
