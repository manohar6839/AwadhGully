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
exports.InMemoryCacheStrategy = void 0;
var cache_ttl_provider_1 = require("../../cache/cache-ttl-provider");
/**
 * A {@link CacheStrategy} that stores the cache in memory using a simple
 * JavaScript Map.
 *
 * This is the default strategy that will be used if no other strategy is
 * configured.
 *
 * **Caution** do not use this in a multi-instance deployment because
 * cache invalidation will not propagate to other instances.
 *
 * @since 3.1.0
 */
var InMemoryCacheStrategy = /** @class */ (function () {
    function InMemoryCacheStrategy(config) {
        this.cache = new Map();
        this.cacheTags = new Map();
        this.cacheSize = 10000;
        if (config === null || config === void 0 ? void 0 : config.cacheSize) {
            this.cacheSize = config.cacheSize;
        }
        this.ttlProvider = (config === null || config === void 0 ? void 0 : config.cacheTtlProvider) || new cache_ttl_provider_1.DefaultCacheTtlProvider();
    }
    InMemoryCacheStrategy.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var hit;
            return __generator(this, function (_a) {
                hit = this.cache.get(key);
                if (hit) {
                    if (!hit.expires || (hit.expires && this.ttlProvider.getTime() < hit.expires)) {
                        return [2 /*return*/, hit.value];
                    }
                    else {
                        this.cache.delete(key);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    InMemoryCacheStrategy.prototype.set = function (key, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var oldest, _i, _a, tag, tagged;
            return __generator(this, function (_b) {
                if (this.cache.has(key)) {
                    // delete key to put the item to the end of
                    // the cache, marking it as new again
                    this.cache.delete(key);
                }
                else if (this.cache.size === this.cacheSize) {
                    oldest = this.first();
                    if (oldest) {
                        this.cache.delete(oldest);
                    }
                }
                this.cache.set(key, {
                    value: value,
                    expires: (options === null || options === void 0 ? void 0 : options.ttl) ? this.ttlProvider.getTime() + options.ttl : undefined,
                });
                if (options === null || options === void 0 ? void 0 : options.tags) {
                    for (_i = 0, _a = options.tags; _i < _a.length; _i++) {
                        tag = _a[_i];
                        tagged = this.cacheTags.get(tag) || new Set();
                        tagged.add(key);
                        this.cacheTags.set(tag, tagged);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    InMemoryCacheStrategy.prototype.delete = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cache.delete(key);
                return [2 /*return*/];
            });
        });
    };
    InMemoryCacheStrategy.prototype.invalidateTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, tags_1, tag, tagged, _a, tagged_1, key;
            return __generator(this, function (_b) {
                for (_i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                    tag = tags_1[_i];
                    tagged = this.cacheTags.get(tag);
                    if (tagged) {
                        for (_a = 0, tagged_1 = tagged; _a < tagged_1.length; _a++) {
                            key = tagged_1[_a];
                            this.cache.delete(key);
                        }
                        this.cacheTags.delete(tag);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    InMemoryCacheStrategy.prototype.first = function () {
        return this.cache.keys().next().value;
    };
    return InMemoryCacheStrategy;
}());
exports.InMemoryCacheStrategy = InMemoryCacheStrategy;
