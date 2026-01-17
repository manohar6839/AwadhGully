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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelfRefreshingCache = createSelfRefreshingCache;
var vendure_logger_1 = require("../config/logger/vendure-logger");
/**
 * @description
 * Creates a {@link SelfRefreshingCache} object, which is used to cache a single frequently-accessed value. In this type
 * of cache, the function used to populate the value (`refreshFn`) is defined during the creation of the cache, and
 * it is immediately used to populate the initial value.
 *
 * From there, when the `.value` property is accessed, it will return a value from the cache, and if the
 * value has expired, it will automatically run the `refreshFn` to update the value and then return the
 * fresh value.
 *
 * @example
 * ```ts title="Example of creating a SelfRefreshingCache"
 * import { createSelfRefreshingCache } from '@vendure/core';
 *
 * \@Injectable()
 * export class PublicChannelService {
 *   private publicChannel: SelfRefreshingCache<Channel, [RequestContext]>;
 *
 *   async init() {
 *     this.publicChannel = await createSelfRefreshingCache<Channel, [RequestContext]>({
 *      name: 'PublicChannelService.publicChannel',
 *      ttl: 1000 * 60 * 60, // 1 hour
 *      refresh: {
 *        fn: async (ctx: RequestContext) => {
 *         return this.channelService.getPublicChannel(ctx);
 *       },
 *      defaultArgs: [RequestContext.empty()],
 *     },
 *   });
 * }
 * ```
 *
 * @docsCategory cache
 * @docsPage SelfRefreshingCache
 */
function createSelfRefreshingCache(config, refreshArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var ttl, name, refresh, getTimeFn, getTimeNow, initialValue, value, expires, memoCache, refreshValue, getValue, memoize;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ttl = config.ttl, name = config.name, refresh = config.refresh, getTimeFn = config.getTimeFn;
                    getTimeNow = getTimeFn !== null && getTimeFn !== void 0 ? getTimeFn : (function () { return new Date().getTime(); });
                    return [4 /*yield*/, refresh.fn.apply(refresh, (refreshArgs !== null && refreshArgs !== void 0 ? refreshArgs : refresh.defaultArgs))];
                case 1:
                    initialValue = _a.sent();
                    value = initialValue;
                    expires = getTimeNow() + ttl;
                    memoCache = new Map();
                    refreshValue = function (resetMemoCache, args) {
                        if (resetMemoCache === void 0) { resetMemoCache = true; }
                        return refresh
                            .fn.apply(refresh, args).then(function (newValue) {
                            value = newValue;
                            expires = getTimeNow() + ttl;
                            if (resetMemoCache) {
                                memoCache.clear();
                            }
                            return value;
                        })
                            .catch(function (err) {
                            var _message = err.message;
                            var message = typeof _message === 'string' ? _message : JSON.stringify(err.message);
                            vendure_logger_1.Logger.error("Failed to update SelfRefreshingCache \"".concat(name, "\": ").concat(message), undefined, err.stack);
                            return value;
                        });
                    };
                    getValue = function (_refreshArgs_1) {
                        var args_1 = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args_1[_i - 1] = arguments[_i];
                        }
                        return __awaiter(_this, __spreadArray([_refreshArgs_1], args_1, true), void 0, function (_refreshArgs, resetMemoCache) {
                            var now;
                            if (resetMemoCache === void 0) { resetMemoCache = true; }
                            return __generator(this, function (_a) {
                                now = getTimeNow();
                                if (expires < now) {
                                    return [2 /*return*/, refreshValue(resetMemoCache, _refreshArgs !== null && _refreshArgs !== void 0 ? _refreshArgs : refresh.defaultArgs)];
                                }
                                return [2 /*return*/, value];
                            });
                        });
                    };
                    memoize = function (args, _refreshArgs, fn) { return __awaiter(_this, void 0, void 0, function () {
                        var key, cached, now, result;
                        return __generator(this, function (_a) {
                            key = JSON.stringify(args);
                            cached = memoCache.get(key);
                            now = getTimeNow();
                            if (cached && now < cached.expires) {
                                return [2 /*return*/, cached.value];
                            }
                            result = getValue(_refreshArgs, false).then(function (val) { return fn.apply(void 0, __spreadArray([val], args, false)); });
                            memoCache.set(key, {
                                expires: now + ttl,
                                value: result,
                            });
                            return [2 /*return*/, result];
                        });
                    }); };
                    return [2 /*return*/, {
                            value: function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return getValue(!args.length || (args.length === 1 && args[0] === undefined)
                                    ? undefined
                                    : args);
                            },
                            refresh: function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return refreshValue(true, args);
                            },
                            memoize: memoize,
                        }];
            }
        });
    });
}
