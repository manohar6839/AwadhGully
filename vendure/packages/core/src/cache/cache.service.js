"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("../common");
var index_1 = require("../config/index");
var cache_1 = require("./cache");
/**
 * @description
 * The CacheService is used to cache data in order to optimize performance.
 *
 * Internally it makes use of the configured {@link CacheStrategy} to persist
 * the cache into a key-value store.
 *
 * @since 3.1.0
 * @docsCategory cache
 */
var CacheService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, common_2.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CacheService = _classThis = /** @class */ (function () {
        function CacheService_1(configService) {
            this.configService = configService;
            this.cacheStrategy = this.configService.systemOptions.cacheStrategy;
        }
        /**
         * @description
         * Creates a new {@link Cache} instance with the given configuration.
         *
         * The `Cache` instance provides a convenience wrapper around the `CacheService`
         * methods.
         */
        CacheService_1.prototype.createCache = function (config) {
            return new cache_1.Cache(config, this);
        };
        /**
         * @description
         * Gets an item from the cache, or returns undefined if the key is not found, or the
         * item has expired.
         */
        CacheService_1.prototype.get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.cacheStrategy.get(key)];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                index_1.Logger.debug("CacheService hit for key [".concat(key, "]"));
                            }
                            return [2 /*return*/, result];
                        case 2:
                            e_1 = _a.sent();
                            index_1.Logger.error("Could not get key [".concat(key, "] from CacheService"), undefined, e_1.stack);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Sets a key-value pair in the cache. The value must be serializable, so cannot contain
         * things like functions, circular data structures, class instances etc.
         *
         * Optionally a "time to live" (ttl) can be specified, which means that the key will
         * be considered stale after that many milliseconds.
         */
        CacheService_1.prototype.set = function (key, value, options) {
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.cacheStrategy.set(key, value, options)];
                        case 1:
                            _a.sent();
                            index_1.Logger.debug("Set key [".concat(key, "] in CacheService"));
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _a.sent();
                            index_1.Logger.error("Could not set key [".concat(key, "] in CacheService"), undefined, e_2.stack);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes an item from the cache.
         */
        CacheService_1.prototype.delete = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.cacheStrategy.delete(key)];
                        case 1:
                            _a.sent();
                            index_1.Logger.debug("Deleted key [".concat(key, "] from CacheService"));
                            return [3 /*break*/, 3];
                        case 2:
                            e_3 = _a.sent();
                            index_1.Logger.error("Could not delete key [".concat(key, "] from CacheService"), undefined, e_3.stack);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes all items from the cache which contain at least one matching tag.
         */
        CacheService_1.prototype.invalidateTags = function (tags) {
            return __awaiter(this, void 0, void 0, function () {
                var e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.cacheStrategy.invalidateTags(tags)];
                        case 1:
                            _a.sent();
                            index_1.Logger.debug("Invalidated tags [".concat(tags.join(', '), "] from CacheService"));
                            return [3 /*break*/, 3];
                        case 2:
                            e_4 = _a.sent();
                            index_1.Logger.error("Could not invalidate tags [".concat(tags.join(', '), "] from CacheService"), undefined, e_4.stack);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return CacheService_1;
    }());
    __setFunctionName(_classThis, "CacheService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CacheService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CacheService = _classThis;
}();
exports.CacheService = CacheService;
