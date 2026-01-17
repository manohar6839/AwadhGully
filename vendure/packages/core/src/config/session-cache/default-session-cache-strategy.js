"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.DefaultSessionCacheStrategy = void 0;
var index_1 = require("../../cache/index");
/**
 * @description
 * The default {@link SessionCacheStrategy} delegates to the configured
 * {@link CacheStrategy} to store the session data. This should be suitable
 * for most use-cases, assuming you select a suitable {@link CacheStrategy}
 *
 * @since 3.1.0
 * @docsCategory auth
 */
var DefaultSessionCacheStrategy = /** @class */ (function () {
    function DefaultSessionCacheStrategy(options) {
        this.options = options;
        this.tags = ['DefaultSessionCacheStrategy'];
    }
    DefaultSessionCacheStrategy.prototype.init = function (injector) {
        this.cacheService = injector.get(index_1.CacheService);
    };
    DefaultSessionCacheStrategy.prototype.set = function (session) {
        var _a, _b;
        return this.cacheService.set(this.getCacheKey(session.token), this.serializeDates(session), {
            tags: this.tags,
            ttl: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.ttl) !== null && _b !== void 0 ? _b : 24 * 60 * 60 * 1000,
        });
    };
    DefaultSessionCacheStrategy.prototype.get = function (sessionToken) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = this.getCacheKey(sessionToken);
                        return [4 /*yield*/, this.cacheService.get(cacheKey)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, item ? this.deserializeDates(item) : undefined];
                }
            });
        });
    };
    DefaultSessionCacheStrategy.prototype.delete = function (sessionToken) {
        return this.cacheService.delete(this.getCacheKey(sessionToken));
    };
    DefaultSessionCacheStrategy.prototype.clear = function () {
        var _a;
        // We use the `?` here because there is a case where in the SessionService,
        // the clearSessionCacheOnDataChange() method may be invoked during bootstrap prior to
        // the cacheService being initialized in the `init()` method above.
        // This is an edge-case limited to seeding initial data as in e2e tests or a
        // @vendure/create installation, so it is safe to not invalidate the cache in this case.
        return (_a = this.cacheService) === null || _a === void 0 ? void 0 : _a.invalidateTags(this.tags);
    };
    /**
     * @description
     * The `CachedSession` interface includes a `Date` object, which we need to
     * manually serialize/deserialize to/from JSON.
     */
    DefaultSessionCacheStrategy.prototype.serializeDates = function (session) {
        return __assign(__assign({}, session), { expires: session.expires.toISOString() });
    };
    DefaultSessionCacheStrategy.prototype.deserializeDates = function (session) {
        return __assign(__assign({}, session), { expires: new Date(session.expires) });
    };
    DefaultSessionCacheStrategy.prototype.getCacheKey = function (sessionToken) {
        var _a, _b;
        return "".concat((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.cachePrefix) !== null && _b !== void 0 ? _b : 'vendure-session-cache', ":").concat(sessionToken);
    };
    return DefaultSessionCacheStrategy;
}());
exports.DefaultSessionCacheStrategy = DefaultSessionCacheStrategy;
