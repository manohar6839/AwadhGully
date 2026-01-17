"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
/**
 * @description
 * A convenience wrapper around the {@link CacheService} methods which provides a simple
 * API for caching and retrieving data.
 *
 * The advantage of using the `Cache` class rather than directly calling the `CacheService`
 * methods is that it allows you to define a consistent way of generating cache keys and
 * to set default cache options, and takes care of setting the value in cache if it does not
 * already exist.
 *
 * In most cases, using the `Cache` class will result in simpler and more readable code.
 *
 * This class is normally created via the {@link CacheService}.`createCache()` method.
 *
 * @example
 * ```ts
 * const cache = cacheService.createCache({
 *   getKey: id => `ProductVariantIds:${id}`,
 *   options: {
 *     ttl: 1000 * 60 * 60,
 *     tags: ['products'],
 *   },
 * });
 *
 * // This will fetch the value from the cache if it exists, or
 * // fetch it from the ProductService if not, and then cache
 * // using the key 'ProductVariantIds.${id}'.
 * const variantIds = await cache.get(id, async () => {
 *   const variants await ProductService.getVariantsByProductId(ctx, id) ;
 *   // The cached value must be serializable, so we just return the ids
 *   return variants.map(v => v.id);
 * });
 * ```
 *
 * @docsCategory cache
 * @since 3.1.0
 */
var Cache = /** @class */ (function () {
    function Cache(config, cacheService) {
        this.config = config;
        this.cacheService = cacheService;
    }
    /**
     * @description
     * Retrieves the value from the cache if it exists, otherwise calls the `getValueFn` function
     * to get the value, sets it in the cache and returns it.
     */
    Cache.prototype.get = function (id, getValueFn) {
        return __awaiter(this, void 0, void 0, function () {
            var key, cachedValue, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = this.config.getKey(id);
                        return [4 /*yield*/, this.cacheService.get(key)];
                    case 1:
                        cachedValue = _a.sent();
                        if (cachedValue) {
                            return [2 /*return*/, cachedValue];
                        }
                        return [4 /*yield*/, getValueFn()];
                    case 2:
                        value = _a.sent();
                        return [4 /*yield*/, this.cacheService.set(key, value, this.config.options)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, value];
                }
            });
        });
    };
    /**
     * @description
     * Deletes one or more items from the cache.
     */
    Cache.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, keyArgs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = Array.isArray(id) ? id : [id];
                        keyArgs = ids.map(function (_id) { return _this.config.getKey(_id); });
                        return [4 /*yield*/, Promise.all(keyArgs.map(function (key) { return _this.cacheService.delete(key); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description
     * Invalidates one or more tags in the cache.
     */
    Cache.prototype.invalidateTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cacheService.invalidateTags(tags)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Cache;
}());
exports.Cache = Cache;
