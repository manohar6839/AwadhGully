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
exports.FacetValueChecker = void 0;
var common_1 = require("@nestjs/common");
var unique_1 = require("@vendure/common/lib/unique");
var ms_1 = require("ms");
var operators_1 = require("rxjs/operators");
var utils_1 = require("../../../common/utils");
var product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
var index_1 = require("../../../event-bus/index");
/**
 * @description
 * The FacetValueChecker is a helper class used to determine whether a given OrderLine consists
 * of ProductVariants containing the given FacetValues.
 *
 * @example
 * ```ts
 * import { FacetValueChecker, LanguageCode, PromotionCondition, TransactionalConnection } from '\@vendure/core';
 *
 * let facetValueChecker: FacetValueChecker;
 *
 * export const hasFacetValues = new PromotionCondition({
 *   code: 'at_least_n_with_facets',
 *   description: [
 *     { languageCode: LanguageCode.en, value: 'Buy at least { minimum } products with the given facets' },
 *   ],
 *   args: {
 *     minimum: { type: 'int' },
 *     facets: { type: 'ID', list: true, ui: { component: 'facet-value-form-input' } },
 *   },
 *   init(injector) {
 *     facetValueChecker = injector.get(FacetValueChecker);
 *   },
 *   async check(ctx, order, args) {
 *     let matches = 0;
 *     for (const line of order.lines) {
 *       if (await facetValueChecker.hasFacetValues(line, args.facets)) {
 *           matches += line.quantity;
 *       }
 *     }
 *     return args.minimum <= matches;
 *   },
 * });
 * ```
 *
 * @docsCategory Promotions
 */
var FacetValueChecker = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FacetValueChecker = _classThis = /** @class */ (function () {
        /**
         * @deprecated
         * Do not directly instantiate. Use the injector to get an instance:
         *
         * ```ts
         * facetValueChecker = injector.get(FacetValueChecker);
         * ```
         * @param connection
         */
        function FacetValueChecker_1(connection, cacheService, eventBus) {
            this.connection = connection;
            this.cacheService = cacheService;
            this.eventBus = eventBus;
            this.facetValueCache = this.cacheService.createCache({
                getKey: function (variantId) { return "FacetValueChecker.".concat(variantId); },
                options: { ttl: (0, ms_1.default)('1w') },
            });
        }
        FacetValueChecker_1.prototype.onModuleInit = function () {
            var _this = this;
            var _a, _b;
            (_a = this.eventBus) === null || _a === void 0 ? void 0 : _a.ofType(index_1.ProductEvent).pipe((0, operators_1.filter)(function (event) { return event.type === 'updated'; })).subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
                var variantIds;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = event.input) === null || _a === void 0 ? void 0 : _a.facetValueIds)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.connection.rawConnection
                                    .getRepository(product_variant_entity_1.ProductVariant)
                                    .createQueryBuilder('variant')
                                    .select('variant.id', 'id')
                                    .where('variant.productId = :prodId', { prodId: event.product.id })
                                    .getRawMany()
                                    .then(function (result) { return result.map(function (r) { return r.id; }); })];
                        case 1:
                            variantIds = _b.sent();
                            if (!variantIds.length) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.facetValueCache.delete(variantIds)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            (_b = this.eventBus) === null || _b === void 0 ? void 0 : _b.ofType(index_1.ProductVariantEvent).pipe((0, operators_1.filter)(function (event) { return event.type === 'updated'; })).subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
                var updatedVariantIds, _i, _a, input;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            updatedVariantIds = [];
                            if (Array.isArray(event.input)) {
                                for (_i = 0, _a = event.input; _i < _a.length; _i++) {
                                    input = _a[_i];
                                    if (input === null || input === void 0 ? void 0 : input.facetValueIds) {
                                        updatedVariantIds.push(input.id);
                                    }
                                }
                            }
                            if (!updatedVariantIds.length) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.facetValueCache.delete(updatedVariantIds)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * @description
         * Checks a given {@link OrderLine} against the facetValueIds and returns
         * `true` if the associated {@link ProductVariant} & {@link Product} together
         * have *all* the specified {@link FacetValue}s.
         */
        FacetValueChecker_1.prototype.hasFacetValues = function (orderLine, facetValueIds, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var variantId, variantFacetValueIds;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            variantId = orderLine.productVariant.id;
                            return [4 /*yield*/, this.facetValueCache.get(variantId, function () { return __awaiter(_this, void 0, void 0, function () {
                                    var variant;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.connection
                                                    .getRepository(ctx, product_variant_entity_1.ProductVariant)
                                                    .findOne({
                                                    where: { id: orderLine.productVariant.id },
                                                    relations: ['product', 'product.facetValues', 'facetValues'],
                                                    loadEagerRelations: false,
                                                })
                                                    .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                                            case 1:
                                                variant = _a.sent();
                                                if (!variant) {
                                                    return [2 /*return*/, []];
                                                }
                                                else {
                                                    return [2 /*return*/, (0, unique_1.unique)(__spreadArray(__spreadArray([], variant.facetValues, true), variant.product.facetValues, true).map(function (fv) { return fv.id; }))];
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            variantFacetValueIds = _a.sent();
                            return [2 /*return*/, facetValueIds.reduce(function (result, id) { return result && !!(variantFacetValueIds !== null && variantFacetValueIds !== void 0 ? variantFacetValueIds : []).find(function (_id) { return (0, utils_1.idsAreEqual)(_id, id); }); }, true)];
                    }
                });
            });
        };
        return FacetValueChecker_1;
    }());
    __setFunctionName(_classThis, "FacetValueChecker");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FacetValueChecker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FacetValueChecker = _classThis;
}();
exports.FacetValueChecker = FacetValueChecker;
