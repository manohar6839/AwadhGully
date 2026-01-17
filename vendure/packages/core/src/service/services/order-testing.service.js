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
exports.OrderTestingService = void 0;
var common_1 = require("@nestjs/common");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var tax_utils_1 = require("../../common/tax-utils");
var order_line_entity_1 = require("../../entity/order-line/order-line.entity");
var order_entity_1 = require("../../entity/order/order.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var shipping_line_entity_1 = require("../../entity/shipping-line/shipping-line.entity");
var shipping_method_entity_1 = require("../../entity/shipping-method/shipping-method.entity");
/**
 * @description
 * This service is responsible for creating temporary mock Orders against which tests can be run, such as
 * testing a ShippingMethod or Promotion.
 *
 * @docsCategory services
 */
var OrderTestingService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderTestingService = _classThis = /** @class */ (function () {
        function OrderTestingService_1(connection, orderCalculator, shippingCalculator, configArgService, configService, productPriceApplicator, translator) {
            this.connection = connection;
            this.orderCalculator = orderCalculator;
            this.shippingCalculator = shippingCalculator;
            this.configArgService = configArgService;
            this.configService = configService;
            this.productPriceApplicator = productPriceApplicator;
            this.translator = translator;
        }
        /**
         * @description
         * Runs a given ShippingMethod configuration against a mock Order to test for eligibility and resulting
         * price.
         */
        OrderTestingService_1.prototype.testShippingMethod = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var shippingMethod, mockOrder, eligible, result, _a, quote, price, priceIncludesTax, taxRate, metadata;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            shippingMethod = new shipping_method_entity_1.ShippingMethod({
                                checker: this.configArgService.parseInput('ShippingEligibilityChecker', input.checker),
                                calculator: this.configArgService.parseInput('ShippingCalculator', input.calculator),
                            });
                            return [4 /*yield*/, this.buildMockOrder(ctx, input.shippingAddress, input.lines)];
                        case 1:
                            mockOrder = _b.sent();
                            return [4 /*yield*/, shippingMethod.test(ctx, mockOrder)];
                        case 2:
                            eligible = _b.sent();
                            if (!eligible) return [3 /*break*/, 4];
                            return [4 /*yield*/, shippingMethod.apply(ctx, mockOrder)];
                        case 3:
                            _a = _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _a = undefined;
                            _b.label = 5;
                        case 5:
                            result = _a;
                            if (result) {
                                price = result.price, priceIncludesTax = result.priceIncludesTax, taxRate = result.taxRate, metadata = result.metadata;
                                quote = {
                                    price: priceIncludesTax ? (0, tax_utils_1.netPriceOf)(price, taxRate) : price,
                                    priceWithTax: priceIncludesTax ? price : (0, tax_utils_1.grossPriceOf)(price, taxRate),
                                    metadata: metadata,
                                };
                            }
                            return [2 /*return*/, {
                                    eligible: eligible,
                                    quote: quote,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * Tests all available ShippingMethods against a mock Order and return those which are eligible. This
         * is intended to simulate a call to the `eligibleShippingMethods` query of the Shop API.
         */
        OrderTestingService_1.prototype.testEligibleShippingMethods = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var mockOrder, eligibleMethods;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.buildMockOrder(ctx, input.shippingAddress, input.lines)];
                        case 1:
                            mockOrder = _a.sent();
                            return [4 /*yield*/, this.shippingCalculator.getEligibleShippingMethods(ctx, mockOrder)];
                        case 2:
                            eligibleMethods = _a.sent();
                            return [2 /*return*/, eligibleMethods
                                    .map(function (result) {
                                    _this.translator.translate(result.method, ctx);
                                    return result;
                                })
                                    .map(function (result) {
                                    var _a = result.result, price = _a.price, taxRate = _a.taxRate, priceIncludesTax = _a.priceIncludesTax, metadata = _a.metadata;
                                    return {
                                        id: result.method.id,
                                        price: priceIncludesTax ? (0, tax_utils_1.netPriceOf)(price, taxRate) : price,
                                        priceWithTax: priceIncludesTax ? price : (0, tax_utils_1.grossPriceOf)(price, taxRate),
                                        name: result.method.name,
                                        code: result.method.code,
                                        description: result.method.description,
                                        metadata: result.result.metadata,
                                    };
                                })];
                    }
                });
            });
        };
        OrderTestingService_1.prototype.buildMockOrder = function (ctx, shippingAddress, lines) {
            return __awaiter(this, void 0, void 0, function () {
                var orderItemPriceCalculationStrategy, mockOrder, _i, lines_1, line, productVariant, orderLine, _a, price, priceIncludesTax, taxRate;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            orderItemPriceCalculationStrategy = this.configService.orderOptions.orderItemPriceCalculationStrategy;
                            mockOrder = new order_entity_1.Order({
                                lines: [],
                                surcharges: [],
                                modifications: [],
                            });
                            mockOrder.shippingAddress = shippingAddress;
                            _i = 0, lines_1 = lines;
                            _b.label = 1;
                        case 1:
                            if (!(_i < lines_1.length)) return [3 /*break*/, 6];
                            line = lines_1[_i];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, line.productVariantId, { relations: ['taxCategory'] })];
                        case 2:
                            productVariant = _b.sent();
                            return [4 /*yield*/, this.productPriceApplicator.applyChannelPriceAndTax(productVariant, ctx, mockOrder)];
                        case 3:
                            _b.sent();
                            orderLine = new order_line_entity_1.OrderLine({
                                productVariant: productVariant,
                                adjustments: [],
                                taxLines: [],
                                quantity: line.quantity,
                                taxCategory: productVariant.taxCategory,
                                taxCategoryId: productVariant.taxCategoryId,
                            });
                            mockOrder.lines.push(orderLine);
                            return [4 /*yield*/, orderItemPriceCalculationStrategy.calculateUnitPrice(ctx, productVariant, orderLine.customFields || {}, mockOrder, orderLine.quantity)];
                        case 4:
                            _a = _b.sent(), price = _a.price, priceIncludesTax = _a.priceIncludesTax;
                            taxRate = productVariant.taxRateApplied;
                            orderLine.listPrice = price;
                            orderLine.listPriceIncludesTax = priceIncludesTax;
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6:
                            mockOrder.shippingLines = [
                                new shipping_line_entity_1.ShippingLine({
                                    listPrice: 0,
                                    listPriceIncludesTax: ctx.channel.pricesIncludeTax,
                                    taxLines: [],
                                    adjustments: [],
                                }),
                            ];
                            return [4 /*yield*/, this.orderCalculator.applyPriceAdjustments(ctx, mockOrder, [])];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, mockOrder];
                    }
                });
            });
        };
        return OrderTestingService_1;
    }());
    __setFunctionName(_classThis, "OrderTestingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderTestingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderTestingService = _classThis;
}();
exports.OrderTestingService = OrderTestingService;
