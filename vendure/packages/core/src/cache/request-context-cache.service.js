"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextCacheService = void 0;
/**
 * @description
 * This service is used to cache arbitrary data relative to an ongoing request.
 * It does this by using a WeakMap bound to the current RequestContext, so the cached
 * data is available for the duration of the request. Once the request completes, the
 * cached data will be automatically garbage-collected.
 *
 * This is useful for caching data which is expensive to compute and which is needed
 * multiple times during the handling of a single request.
 *
 * @docsCategory cache
 */
var RequestContextCacheService = /** @class */ (function () {
    function RequestContextCacheService() {
        this.caches = new WeakMap();
    }
    /**
     * @description
     * Set a value in the RequestContext cache.
     */
    RequestContextCacheService.prototype.set = function (ctx, key, val) {
        this.getContextCache(ctx).set(key, val);
    };
    RequestContextCacheService.prototype.get = function (ctx, key, getDefault) {
        var ctxCache = this.getContextCache(ctx);
        var result = ctxCache.get(key);
        if (result) {
            return result;
        }
        if (getDefault) {
            var defaultResultOrPromise = getDefault();
            ctxCache.set(key, defaultResultOrPromise);
            return defaultResultOrPromise;
        }
        else {
            return;
        }
    };
    RequestContextCacheService.prototype.getContextCache = function (ctx) {
        var ctxCache = this.caches.get(ctx);
        if (!ctxCache) {
            ctxCache = new Map();
            this.caches.set(ctx, ctxCache);
        }
        return ctxCache;
    };
    RequestContextCacheService.prototype.isPromise = function (input) {
        return typeof input.then === 'function';
    };
    return RequestContextCacheService;
}());
exports.RequestContextCacheService = RequestContextCacheService;
