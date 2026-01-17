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
exports.OrderCalculator = void 0;
var common_1 = require("@nestjs/common");
var filter_async_1 = require("@vendure/common/lib/filter-async");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var constants_1 = require("../../../common/constants");
var errors_1 = require("../../../common/error/errors");
var instrument_decorator_1 = require("../../../common/instrument-decorator");
var utils_1 = require("../../../common/utils");
var prorate_1 = require("./prorate");
/**
 * @description
 * This helper is used when making changes to an Order, to apply all applicable price adjustments to that Order,
 * including:
 *
 * - Promotions
 * - Taxes
 * - Shipping
 *
 * @docsCategory service-helpers
 */
var OrderCalculator = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderCalculator = _classThis = /** @class */ (function () {
        function OrderCalculator_1(configService, zoneService, taxRateService, shippingMethodService, shippingCalculator, requestContextCache) {
            this.configService = configService;
            this.zoneService = zoneService;
            this.taxRateService = taxRateService;
            this.shippingMethodService = shippingMethodService;
            this.shippingCalculator = shippingCalculator;
            this.requestContextCache = requestContextCache;
        }
        /**
         * @description
         * Applies taxes and promotions to an Order. Mutates the order object.
         * Returns an array of any OrderItems which had new adjustments
         * applied, either tax or promotions.
         */
        OrderCalculator_1.prototype.applyPriceAdjustments = function (ctx_1, order_1, promotions_1) {
            return __awaiter(this, arguments, void 0, function (ctx, order, promotions, updatedOrderLines, options) {
                var taxZoneStrategy, zones, activeTaxZone, taxZoneChanged, _i, updatedOrderLines_1, updatedOrderLine, totalBeforePromotions;
                if (updatedOrderLines === void 0) { updatedOrderLines = []; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            taxZoneStrategy = this.configService.taxOptions.taxZoneStrategy;
                            // We reset the promotions array as all promotions
                            // must be revalidated on any changes to an Order.
                            order.promotions = [];
                            return [4 /*yield*/, this.zoneService.getAllWithMembers(ctx)];
                        case 1:
                            zones = _a.sent();
                            return [4 /*yield*/, this.requestContextCache.get(ctx, constants_1.CacheKey.ActiveTaxZone, function () {
                                    return taxZoneStrategy.determineTaxZone(ctx, zones, ctx.channel, order);
                                })];
                        case 2:
                            activeTaxZone = _a.sent();
                            taxZoneChanged = false;
                            if (!activeTaxZone) {
                                throw new errors_1.InternalServerError('error.no-active-tax-zone');
                            }
                            if (!order.taxZoneId || !(0, utils_1.idsAreEqual)(order.taxZoneId, activeTaxZone.id)) {
                                order.taxZoneId = activeTaxZone.id;
                                taxZoneChanged = true;
                            }
                            _i = 0, updatedOrderLines_1 = updatedOrderLines;
                            _a.label = 3;
                        case 3:
                            if (!(_i < updatedOrderLines_1.length)) return [3 /*break*/, 6];
                            updatedOrderLine = updatedOrderLines_1[_i];
                            return [4 /*yield*/, this.applyTaxesToOrderLine(ctx, order, updatedOrderLine, this.createTaxRateGetter(ctx, activeTaxZone))];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            this.calculateOrderTotals(order);
                            if (!order.lines.length) return [3 /*break*/, 11];
                            if (!taxZoneChanged) return [3 /*break*/, 8];
                            // First apply taxes to the non-discounted prices
                            return [4 /*yield*/, this.applyTaxes(ctx, order, activeTaxZone)];
                        case 7:
                            // First apply taxes to the non-discounted prices
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            totalBeforePromotions = order.subTotal;
                            return [4 /*yield*/, this.applyPromotions(ctx, order, promotions)];
                        case 9:
                            _a.sent();
                            if (!(order.subTotal !== totalBeforePromotions)) return [3 /*break*/, 11];
                            // Finally, re-calculate taxes because the promotions may have
                            // altered the unit prices, which in turn will alter the tax payable.
                            return [4 /*yield*/, this.applyTaxes(ctx, order, activeTaxZone)];
                        case 10:
                            // Finally, re-calculate taxes because the promotions may have
                            // altered the unit prices, which in turn will alter the tax payable.
                            _a.sent();
                            _a.label = 11;
                        case 11:
                            if (!((options === null || options === void 0 ? void 0 : options.recalculateShipping) !== false)) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.applyShipping(ctx, order)];
                        case 12:
                            _a.sent();
                            return [4 /*yield*/, this.applyShippingPromotions(ctx, order, promotions)];
                        case 13:
                            _a.sent();
                            _a.label = 14;
                        case 14:
                            this.calculateOrderTotals(order);
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        /**
         * @description
         * Applies the correct TaxRate to each OrderLine in the order.
         */
        OrderCalculator_1.prototype.applyTaxes = function (ctx, order, activeZone) {
            return __awaiter(this, void 0, void 0, function () {
                var getTaxRate, _i, _a, line;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            getTaxRate = this.createTaxRateGetter(ctx, activeZone);
                            _i = 0, _a = order.lines;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            line = _a[_i];
                            return [4 /*yield*/, this.applyTaxesToOrderLine(ctx, order, line, getTaxRate)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            this.calculateOrderTotals(order);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Applies the correct TaxRate to an OrderLine
         */
        OrderCalculator_1.prototype.applyTaxesToOrderLine = function (ctx, order, line, getTaxRate) {
            return __awaiter(this, void 0, void 0, function () {
                var applicableTaxRate, taxLineCalculationStrategy, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, getTaxRate(line.taxCategoryId)];
                        case 1:
                            applicableTaxRate = _b.sent();
                            taxLineCalculationStrategy = this.configService.taxOptions.taxLineCalculationStrategy;
                            _a = line;
                            return [4 /*yield*/, taxLineCalculationStrategy.calculate({
                                    ctx: ctx,
                                    applicableTaxRate: applicableTaxRate,
                                    order: order,
                                    orderLine: line,
                                })];
                        case 2:
                            _a.taxLines = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Returns a memoized function for performing an efficient
         * lookup of the correct TaxRate for a given TaxCategory.
         */
        OrderCalculator_1.prototype.createTaxRateGetter = function (ctx, activeZone) {
            var _this = this;
            var taxRateCache = new Map();
            return function (taxCategoryId) { return __awaiter(_this, void 0, void 0, function () {
                var cached, rate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cached = taxRateCache.get(taxCategoryId);
                            if (cached) {
                                return [2 /*return*/, cached];
                            }
                            return [4 /*yield*/, this.taxRateService.getApplicableTaxRate(ctx, activeZone, taxCategoryId)];
                        case 1:
                            rate = _a.sent();
                            taxRateCache.set(taxCategoryId, rate);
                            return [2 /*return*/, rate];
                    }
                });
            }); };
        };
        /**
         * @description
         * Applies any eligible promotions to each OrderLine in the order.
         */
        OrderCalculator_1.prototype.applyPromotions = function (ctx, order, promotions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.applyOrderItemPromotions(ctx, order, promotions)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.applyOrderPromotions(ctx, order, promotions)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Applies promotions to OrderItems. This is a quite complex function, due to the inherent complexity
         * of applying the promotions, and also due to added complexity in the name of performance
         * optimization. Therefore, it is heavily annotated so that the purpose of each step is clear.
         * Additionally, this is used in both promotionItemAction and promotionLineAction,
         * as it is difficult to separate action types at this stage.
         */
        OrderCalculator_1.prototype.applyOrderItemPromotions = function (ctx, order, promotions) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, line, _b, promotions_1, promotion, applicableOrState, state, adjustment;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, _a = order.lines;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 8];
                            line = _a[_i];
                            // Must be re-calculated for each line, since the previous lines may have triggered promotions
                            // which affected the order price.
                            line.clearAdjustments();
                            _b = 0, promotions_1 = promotions;
                            _c.label = 2;
                        case 2:
                            if (!(_b < promotions_1.length)) return [3 /*break*/, 6];
                            promotion = promotions_1[_b];
                            return [4 /*yield*/, promotion.test(ctx, order)];
                        case 3:
                            applicableOrState = _c.sent();
                            if (!applicableOrState) return [3 /*break*/, 5];
                            state = typeof applicableOrState === 'object' ? applicableOrState : undefined;
                            return [4 /*yield*/, promotion.apply(ctx, { orderLine: line }, state)];
                        case 4:
                            adjustment = _c.sent();
                            if (adjustment) {
                                line.addAdjustment(adjustment);
                                this.calculateOrderTotals(order);
                            }
                            this.addPromotion(order, promotion);
                            _c.label = 5;
                        case 5:
                            _b++;
                            return [3 /*break*/, 2];
                        case 6:
                            this.calculateOrderTotals(order);
                            _c.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        OrderCalculator_1.prototype.applyOrderPromotions = function (ctx, order, promotions) {
            return __awaiter(this, void 0, void 0, function () {
                var orderHasDistributedPromotions, applicableOrderPromotions, _loop_1, this_1, _i, applicableOrderPromotions_1, promotion;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            orderHasDistributedPromotions = !!order.discounts.find(function (adjustment) { return adjustment.type === generated_types_1.AdjustmentType.DISTRIBUTED_ORDER_PROMOTION; });
                            if (orderHasDistributedPromotions) {
                                // If the Order currently has any Order-level discounts applied, we need to
                                // mark all OrderItems in the Order as "updated", since one or more of those
                                // Order-level discounts may become invalid, which will require _all_ OrderItems
                                // to be saved.
                                order.lines.forEach(function (line) {
                                    line.clearAdjustments(generated_types_1.AdjustmentType.DISTRIBUTED_ORDER_PROMOTION);
                                });
                            }
                            this.calculateOrderTotals(order);
                            return [4 /*yield*/, (0, filter_async_1.filterAsync)(promotions, function (p) {
                                    return p.test(ctx, order).then(Boolean);
                                })];
                        case 1:
                            applicableOrderPromotions = _a.sent();
                            if (!applicableOrderPromotions.length) return [3 /*break*/, 6];
                            _loop_1 = function (promotion) {
                                var applicableOrState, state, adjustment_1, amount, weights, distribution_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, promotion.test(ctx, order)];
                                        case 1:
                                            applicableOrState = _b.sent();
                                            if (!applicableOrState) return [3 /*break*/, 3];
                                            state = typeof applicableOrState === 'object' ? applicableOrState : undefined;
                                            return [4 /*yield*/, promotion.apply(ctx, { order: order }, state)];
                                        case 2:
                                            adjustment_1 = _b.sent();
                                            if (adjustment_1 && adjustment_1.amount !== 0) {
                                                amount = adjustment_1.amount;
                                                weights = order.lines.map(function (l) {
                                                    return l.quantity !== 0 ? l.proratedLinePriceWithTax : 0;
                                                });
                                                distribution_1 = (0, prorate_1.prorate)(weights, amount);
                                                order.lines.forEach(function (line, i) {
                                                    var shareOfAmount = distribution_1[i];
                                                    var itemWeights = Array.from({
                                                        length: line.quantity,
                                                    }).map(function () { return line.unitPrice; });
                                                    var itemDistribution = (0, prorate_1.prorate)(itemWeights, shareOfAmount);
                                                    line.addAdjustment({
                                                        amount: shareOfAmount,
                                                        adjustmentSource: adjustment_1.adjustmentSource,
                                                        description: adjustment_1.description,
                                                        type: generated_types_1.AdjustmentType.DISTRIBUTED_ORDER_PROMOTION,
                                                        data: { itemDistribution: itemDistribution },
                                                    });
                                                });
                                                this_1.calculateOrderTotals(order);
                                            }
                                            this_1.addPromotion(order, promotion);
                                            _b.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, applicableOrderPromotions_1 = applicableOrderPromotions;
                            _a.label = 2;
                        case 2:
                            if (!(_i < applicableOrderPromotions_1.length)) return [3 /*break*/, 5];
                            promotion = applicableOrderPromotions_1[_i];
                            return [5 /*yield**/, _loop_1(promotion)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            this.calculateOrderTotals(order);
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        OrderCalculator_1.prototype.applyShippingPromotions = function (ctx, order, promotions) {
            return __awaiter(this, void 0, void 0, function () {
                var applicableOrderPromotions, _i, applicableOrderPromotions_2, promotion, applicableOrState, state, _a, _b, shippingLine, adjustment, _c, _d, shippingLine;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, (0, filter_async_1.filterAsync)(promotions, function (p) {
                                return p.test(ctx, order).then(Boolean);
                            })];
                        case 1:
                            applicableOrderPromotions = _e.sent();
                            if (!applicableOrderPromotions.length) return [3 /*break*/, 10];
                            order.shippingLines.forEach(function (line) { return line.clearAdjustments(); });
                            _i = 0, applicableOrderPromotions_2 = applicableOrderPromotions;
                            _e.label = 2;
                        case 2:
                            if (!(_i < applicableOrderPromotions_2.length)) return [3 /*break*/, 9];
                            promotion = applicableOrderPromotions_2[_i];
                            return [4 /*yield*/, promotion.test(ctx, order)];
                        case 3:
                            applicableOrState = _e.sent();
                            if (!applicableOrState) return [3 /*break*/, 8];
                            state = typeof applicableOrState === 'object' ? applicableOrState : undefined;
                            _a = 0, _b = order.shippingLines;
                            _e.label = 4;
                        case 4:
                            if (!(_a < _b.length)) return [3 /*break*/, 7];
                            shippingLine = _b[_a];
                            return [4 /*yield*/, promotion.apply(ctx, { shippingLine: shippingLine, order: order }, state)];
                        case 5:
                            adjustment = _e.sent();
                            if (adjustment && adjustment.amount !== 0) {
                                shippingLine.addAdjustment(adjustment);
                            }
                            _e.label = 6;
                        case 6:
                            _a++;
                            return [3 /*break*/, 4];
                        case 7:
                            this.addPromotion(order, promotion);
                            _e.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 2];
                        case 9: return [3 /*break*/, 11];
                        case 10:
                            // If there is no applicable promotion for shipping,
                            // we should remove already assigned adjustment from shipping lines.
                            for (_c = 0, _d = order.shippingLines; _c < _d.length; _c++) {
                                shippingLine = _d[_c];
                                shippingLine.clearAdjustments();
                            }
                            _e.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        OrderCalculator_1.prototype.applyShipping = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var orderLineShippingLineIds, _loop_2, this_2, _i, _a, shippingLine, state_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            orderLineShippingLineIds = order.lines.map(function (line) { return line.shippingLineId; });
                            order.shippingLines = order.shippingLines.filter(function (shippingLine) {
                                return orderLineShippingLineIds.includes(shippingLine.id);
                            });
                            _loop_2 = function (shippingLine) {
                                var currentShippingMethod, _c, currentMethodStillEligible, result, results, cheapest;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            _c = (shippingLine === null || shippingLine === void 0 ? void 0 : shippingLine.shippingMethodId);
                                            if (!_c) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this_2.shippingMethodService.findOne(ctx, shippingLine.shippingMethodId)];
                                        case 1:
                                            _c = (_d.sent());
                                            _d.label = 2;
                                        case 2:
                                            currentShippingMethod = _c;
                                            if (!currentShippingMethod) {
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            return [4 /*yield*/, currentShippingMethod.test(ctx, order)];
                                        case 3:
                                            currentMethodStillEligible = _d.sent();
                                            if (!currentMethodStillEligible) return [3 /*break*/, 5];
                                            return [4 /*yield*/, currentShippingMethod.apply(ctx, order)];
                                        case 4:
                                            result = _d.sent();
                                            if (result) {
                                                shippingLine.listPrice = result.price;
                                                shippingLine.listPriceIncludesTax = result.priceIncludesTax;
                                                shippingLine.taxLines = [
                                                    {
                                                        description: 'shipping tax',
                                                        taxRate: result.taxRate,
                                                    },
                                                ];
                                            }
                                            return [2 /*return*/, "continue"];
                                        case 5: return [4 /*yield*/, this_2.shippingCalculator.getEligibleShippingMethods(ctx, order, [
                                                currentShippingMethod.id,
                                            ])];
                                        case 6:
                                            results = _d.sent();
                                            if (results && results.length) {
                                                cheapest = results[0];
                                                shippingLine.listPrice = cheapest.result.price;
                                                shippingLine.listPriceIncludesTax = cheapest.result.priceIncludesTax;
                                                shippingLine.shippingMethod = cheapest.method;
                                                shippingLine.shippingMethodId = cheapest.method.id;
                                                shippingLine.taxLines = [
                                                    {
                                                        description: 'shipping tax',
                                                        taxRate: cheapest.result.taxRate,
                                                    },
                                                ];
                                            }
                                            else {
                                                order.shippingLines = order.shippingLines.filter(function (sl) { return sl !== shippingLine; });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_2 = this;
                            _i = 0, _a = order.shippingLines;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            shippingLine = _a[_i];
                            return [5 /*yield**/, _loop_2(shippingLine)];
                        case 2:
                            state_1 = _b.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the totals properties on an Order by summing each OrderLine, and taking
         * into account any Surcharges and ShippingLines. Does not save the Order, so
         * the entity must be persisted to the DB after calling this method.
         *
         * Note that this method does *not* evaluate any taxes or promotions. It assumes
         * that has already been done and is solely responsible for summing the
         * totals.
         */
        OrderCalculator_1.prototype.calculateOrderTotals = function (order) {
            var totalPrice = 0;
            var totalPriceWithTax = 0;
            for (var _i = 0, _a = order.lines; _i < _a.length; _i++) {
                var line = _a[_i];
                totalPrice += line.proratedLinePrice;
                totalPriceWithTax += line.proratedLinePriceWithTax;
            }
            for (var _b = 0, _c = order.surcharges; _b < _c.length; _b++) {
                var surcharge = _c[_b];
                totalPrice += surcharge.price;
                totalPriceWithTax += surcharge.priceWithTax;
            }
            order.subTotal = totalPrice;
            order.subTotalWithTax = totalPriceWithTax;
            var shippingPrice = 0;
            var shippingPriceWithTax = 0;
            for (var _d = 0, _e = order.shippingLines; _d < _e.length; _d++) {
                var shippingLine = _e[_d];
                shippingPrice += shippingLine.discountedPrice;
                shippingPriceWithTax += shippingLine.discountedPriceWithTax;
            }
            order.shipping = shippingPrice;
            order.shippingWithTax = shippingPriceWithTax;
        };
        OrderCalculator_1.prototype.addPromotion = function (order, promotion) {
            if (order.promotions && !order.promotions.find(function (p) { return (0, utils_1.idsAreEqual)(p.id, promotion.id); })) {
                order.promotions.push(promotion);
            }
        };
        return OrderCalculator_1;
    }());
    __setFunctionName(_classThis, "OrderCalculator");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderCalculator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderCalculator = _classThis;
}();
exports.OrderCalculator = OrderCalculator;
