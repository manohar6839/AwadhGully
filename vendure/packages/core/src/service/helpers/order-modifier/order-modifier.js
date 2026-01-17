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
exports.OrderModifier = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var typeorm_1 = require("typeorm");
var error_result_1 = require("../../../common/error/error-result");
var errors_1 = require("../../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../../common/error/generated-graphql-admin-errors");
var generated_graphql_shop_errors_1 = require("../../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../../common/instrument-decorator");
var utils_1 = require("../../../common/utils");
var fulfillment_line_entity_1 = require("../../../entity/order-line-reference/fulfillment-line.entity");
var order_modification_line_entity_1 = require("../../../entity/order-line-reference/order-modification-line.entity");
var order_line_entity_1 = require("../../../entity/order-line/order-line.entity");
var order_modification_entity_1 = require("../../../entity/order-modification/order-modification.entity");
var order_entity_1 = require("../../../entity/order/order.entity");
var payment_entity_1 = require("../../../entity/payment/payment.entity");
var product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
var shipping_line_entity_1 = require("../../../entity/shipping-line/shipping-line.entity");
var allocation_entity_1 = require("../../../entity/stock-movement/allocation.entity");
var cancellation_entity_1 = require("../../../entity/stock-movement/cancellation.entity");
var release_entity_1 = require("../../../entity/stock-movement/release.entity");
var sale_entity_1 = require("../../../entity/stock-movement/sale.entity");
var surcharge_entity_1 = require("../../../entity/surcharge/surcharge.entity");
var event_bus_1 = require("../../../event-bus");
var order_line_event_1 = require("../../../event-bus/events/order-line-event");
var order_utils_1 = require("../utils/order-utils");
var patch_entity_1 = require("../utils/patch-entity");
/**
 * @description
 * This helper is responsible for modifying the contents of an Order.
 *
 * Note:
 * There is not a clear separation of concerns between the OrderService and this, since
 * the OrderService also contains some method which modify the Order (e.g. removeItemFromOrder).
 * So this helper was mainly extracted to isolate the huge `modifyOrder` method since the
 * OrderService was just growing too large. Future refactoring could improve the organization
 * of these Order-related methods into a more clearly-delineated set of classes.
 *
 * @docsCategory service-helpers
 */
var OrderModifier = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderModifier = _classThis = /** @class */ (function () {
        function OrderModifier_1(connection, configService, orderCalculator, paymentService, countryService, stockMovementService, productVariantService, customFieldRelationService, promotionService, eventBus, shippingCalculator, historyService, translator) {
            this.connection = connection;
            this.configService = configService;
            this.orderCalculator = orderCalculator;
            this.paymentService = paymentService;
            this.countryService = countryService;
            this.stockMovementService = stockMovementService;
            this.productVariantService = productVariantService;
            this.customFieldRelationService = customFieldRelationService;
            this.promotionService = promotionService;
            this.eventBus = eventBus;
            this.shippingCalculator = shippingCalculator;
            this.historyService = historyService;
            this.translator = translator;
        }
        /**
         * @description
         * Ensure that the ProductVariant has sufficient saleable stock to add the given
         * quantity to an Order.
         *
         * - `existingOrderLineQuantity` is used when adding an item to the order, since if an OrderLine
         * already exists then we will be adding the new quantity to the existing quantity.
         * - `quantityInOtherOrderLines` is used when we have more than 1 OrderLine containing the same
         * ProductVariant. This occurs when there are custom fields defined on the OrderLine and the lines
         * have differing values for one or more custom fields. In this case, we need to take _all_ of these
         * OrderLines into account when constraining the quantity. See https://github.com/vendurehq/vendure/issues/2702
         * for more on this.
         */
        OrderModifier_1.prototype.constrainQuantityToSaleable = function (ctx_1, variant_1, quantity_1) {
            return __awaiter(this, arguments, void 0, function (ctx, variant, quantity, existingOrderLineQuantity, quantityInOtherOrderLines) {
                var correctedQuantity, saleableStockLevel;
                if (existingOrderLineQuantity === void 0) { existingOrderLineQuantity = 0; }
                if (quantityInOtherOrderLines === void 0) { quantityInOtherOrderLines = 0; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            correctedQuantity = quantity + existingOrderLineQuantity;
                            return [4 /*yield*/, this.productVariantService.getSaleableStockLevel(ctx, variant)];
                        case 1:
                            saleableStockLevel = _a.sent();
                            if (saleableStockLevel < correctedQuantity + quantityInOtherOrderLines) {
                                correctedQuantity = Math.max(saleableStockLevel - existingOrderLineQuantity - quantityInOtherOrderLines, 0);
                            }
                            return [2 /*return*/, correctedQuantity];
                    }
                });
            });
        };
        /**
         * @description
         * Given a ProductVariant ID and optional custom fields, this method will return an existing OrderLine that
         * matches, or `undefined` if no match is found.
         */
        OrderModifier_1.prototype.getExistingOrderLine = function (ctx, order, productVariantId, customFields) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, line, match, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, _a = order.lines;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            line = _a[_i];
                            _b = (0, utils_1.idsAreEqual)(line.productVariantId, productVariantId);
                            if (!_b) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.customFieldsAreEqual(ctx, line, customFields, line.customFields)];
                        case 2:
                            _b = (_c.sent());
                            _c.label = 3;
                        case 3:
                            match = _b;
                            if (match) {
                                return [2 /*return*/, line];
                            }
                            _c.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the OrderLine containing the given {@link ProductVariant}, taking into account any custom field values. If no existing
         * OrderLine is found, a new OrderLine will be created.
         */
        OrderModifier_1.prototype.getOrCreateOrderLine = function (ctx, order, productVariantId, customFields) {
            return __awaiter(this, void 0, void 0, function () {
                var existingOrderLine, productVariant, featuredAssetId, orderLine, orderSellerStrategy, _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getExistingOrderLine(ctx, order, productVariantId, customFields)];
                        case 1:
                            existingOrderLine = _c.sent();
                            if (existingOrderLine) {
                                return [2 /*return*/, existingOrderLine];
                            }
                            return [4 /*yield*/, this.getProductVariantOrThrow(ctx, productVariantId, order)];
                        case 2:
                            productVariant = _c.sent();
                            featuredAssetId = (_b = productVariant.featuredAssetId) !== null && _b !== void 0 ? _b : productVariant.product.featuredAssetId;
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(new order_line_entity_1.OrderLine({
                                    productVariant: productVariant,
                                    taxCategory: productVariant.taxCategory,
                                    featuredAsset: featuredAssetId ? { id: featuredAssetId } : undefined,
                                    listPrice: productVariant.listPrice,
                                    listPriceIncludesTax: productVariant.listPriceIncludesTax,
                                    adjustments: [],
                                    taxLines: [],
                                    customFields: customFields,
                                    quantity: 0,
                                }))];
                        case 3:
                            orderLine = _c.sent();
                            orderSellerStrategy = this.configService.orderOptions.orderSellerStrategy;
                            if (!(typeof orderSellerStrategy.setOrderLineSellerChannel === 'function')) return [3 /*break*/, 6];
                            _a = orderLine;
                            return [4 /*yield*/, orderSellerStrategy.setOrderLineSellerChannel(ctx, orderLine)];
                        case 4:
                            _a.sellerChannel = _c.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_line_entity_1.OrderLine)
                                    .createQueryBuilder()
                                    .relation('sellerChannel')
                                    .of(orderLine)
                                    .set(orderLine.sellerChannel)];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, order_line_entity_1.OrderLine, { customFields: customFields }, orderLine)];
                        case 7:
                            _c.sent();
                            order.lines.push(orderLine);
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('lines')
                                    .of(order)
                                    .add(orderLine)];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_line_event_1.OrderLineEvent(ctx, order, orderLine, 'created'))];
                        case 9:
                            _c.sent();
                            return [2 /*return*/, orderLine];
                    }
                });
            });
        };
        /**
         * @description
         * Updates the quantity of an OrderLine, taking into account the available saleable stock level.
         * Returns the actual quantity that the OrderLine was updated to (which may be less than the
         * `quantity` argument if insufficient stock was available.
         */
        OrderModifier_1.prototype.updateOrderLineQuantity = function (ctx, orderLine, quantity, order) {
            return __awaiter(this, void 0, void 0, function () {
                var currentQuantity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentQuantity = orderLine.quantity;
                            orderLine.quantity = quantity;
                            if (!(currentQuantity < quantity)) return [3 /*break*/, 3];
                            if (!(!order.active && order.state !== 'Draft')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.stockMovementService.createAllocationsForOrderLines(ctx, [
                                    {
                                        orderLineId: orderLine.id,
                                        quantity: quantity - currentQuantity,
                                    },
                                ])];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [3 /*break*/, 6];
                        case 3:
                            if (!(quantity < currentQuantity)) return [3 /*break*/, 6];
                            if (!(!order.active && order.state !== 'Draft')) return [3 /*break*/, 6];
                            // When an Order is not active (i.e. Customer checked out), then we don't want to just
                            // delete the OrderItems - instead we will cancel them
                            // const toSetAsCancelled = orderLine.items.filter(i => !i.cancelled).slice(quantity);
                            // const fulfilledItems = toSetAsCancelled.filter(i => !!i.fulfillment);
                            // const allocatedItems = toSetAsCancelled.filter(i => !i.fulfillment);
                            return [4 /*yield*/, this.stockMovementService.createCancellationsForOrderLines(ctx, [
                                    { orderLineId: orderLine.id, quantity: quantity },
                                ])];
                        case 4:
                            // When an Order is not active (i.e. Customer checked out), then we don't want to just
                            // delete the OrderItems - instead we will cancel them
                            // const toSetAsCancelled = orderLine.items.filter(i => !i.cancelled).slice(quantity);
                            // const fulfilledItems = toSetAsCancelled.filter(i => !!i.fulfillment);
                            // const allocatedItems = toSetAsCancelled.filter(i => !i.fulfillment);
                            _a.sent();
                            return [4 /*yield*/, this.stockMovementService.createReleasesForOrderLines(ctx, [
                                    { orderLineId: orderLine.id, quantity: quantity },
                                ])];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(orderLine)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new order_line_event_1.OrderLineEvent(ctx, order, orderLine, 'updated'))];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, orderLine];
                    }
                });
            });
        };
        OrderModifier_1.prototype.cancelOrderByOrderLines = function (ctx, input, lineInputs) {
            return __awaiter(this, void 0, void 0, function () {
                var orders, order, fullOrder, allocatedLines, fulfilledLines, _loop_1, this_1, _i, lineInputs_1, lineInput, state_1, _loop_2, this_2, _a, lineInputs_2, line, orderWithLines, _b, _c, shippingLine;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (lineInputs.length === 0 || (0, shared_utils_1.summate)(lineInputs, 'quantity') === 0) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.EmptyOrderLineSelectionError()];
                            }
                            return [4 /*yield*/, (0, order_utils_1.getOrdersFromLines)(ctx, this.connection, lineInputs)];
                        case 1:
                            orders = _d.sent();
                            if (1 < orders.length) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.MultipleOrderError()];
                            }
                            order = orders[0];
                            if (!(0, utils_1.idsAreEqual)(order.id, input.orderId)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.MultipleOrderError()];
                            }
                            if (order.active) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.CancelActiveOrderError({ orderState: order.state })];
                            }
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_entity_1.Order, order.id, {
                                    relations: ['lines'],
                                })];
                        case 2:
                            fullOrder = _d.sent();
                            allocatedLines = [];
                            fulfilledLines = [];
                            _loop_1 = function (lineInput) {
                                var orderLine, allocationsForLine, salesForLine, releasesForLine, totalAllocated, fulfillmentsForLine, cancellationsForLine, totalFulfilled;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            orderLine = fullOrder.lines.find(function (l) { return (0, utils_1.idsAreEqual)(l.id, lineInput.orderLineId); });
                                            if (orderLine && orderLine.quantity < lineInput.quantity) {
                                                return [2 /*return*/, { value: new generated_graphql_admin_errors_1.QuantityTooGreatError() }];
                                            }
                                            return [4 /*yield*/, this_1.connection
                                                    .getRepository(ctx, allocation_entity_1.Allocation)
                                                    .createQueryBuilder('allocation')
                                                    .leftJoinAndSelect('allocation.orderLine', 'orderLine')
                                                    .where('orderLine.id = :orderLineId', { orderLineId: lineInput.orderLineId })
                                                    .getMany()];
                                        case 1:
                                            allocationsForLine = _e.sent();
                                            return [4 /*yield*/, this_1.connection
                                                    .getRepository(ctx, sale_entity_1.Sale)
                                                    .createQueryBuilder('sale')
                                                    .leftJoinAndSelect('sale.orderLine', 'orderLine')
                                                    .where('orderLine.id = :orderLineId', { orderLineId: lineInput.orderLineId })
                                                    .getMany()];
                                        case 2:
                                            salesForLine = _e.sent();
                                            return [4 /*yield*/, this_1.connection
                                                    .getRepository(ctx, release_entity_1.Release)
                                                    .createQueryBuilder('release')
                                                    .leftJoinAndSelect('release.orderLine', 'orderLine')
                                                    .where('orderLine.id = :orderLineId', { orderLineId: lineInput.orderLineId })
                                                    .getMany()];
                                        case 3:
                                            releasesForLine = _e.sent();
                                            totalAllocated = (0, shared_utils_1.summate)(allocationsForLine, 'quantity') +
                                                (0, shared_utils_1.summate)(salesForLine, 'quantity') -
                                                (0, shared_utils_1.summate)(releasesForLine, 'quantity');
                                            if (0 < totalAllocated) {
                                                allocatedLines.push({
                                                    orderLineId: lineInput.orderLineId,
                                                    quantity: Math.min(totalAllocated, lineInput.quantity),
                                                });
                                            }
                                            return [4 /*yield*/, this_1.connection
                                                    .getRepository(ctx, fulfillment_line_entity_1.FulfillmentLine)
                                                    .createQueryBuilder('fulfillmentLine')
                                                    .leftJoinAndSelect('fulfillmentLine.orderLine', 'orderLine')
                                                    .where('orderLine.id = :orderLineId', { orderLineId: lineInput.orderLineId })
                                                    .getMany()];
                                        case 4:
                                            fulfillmentsForLine = _e.sent();
                                            return [4 /*yield*/, this_1.connection
                                                    .getRepository(ctx, cancellation_entity_1.Cancellation)
                                                    .createQueryBuilder('cancellation')
                                                    .leftJoinAndSelect('cancellation.orderLine', 'orderLine')
                                                    .where('orderLine.id = :orderLineId', { orderLineId: lineInput.orderLineId })
                                                    .getMany()];
                                        case 5:
                                            cancellationsForLine = _e.sent();
                                            totalFulfilled = (0, shared_utils_1.summate)(fulfillmentsForLine, 'quantity') - (0, shared_utils_1.summate)(cancellationsForLine, 'quantity');
                                            if (0 < totalFulfilled) {
                                                fulfilledLines.push({
                                                    orderLineId: lineInput.orderLineId,
                                                    quantity: Math.min(totalFulfilled, lineInput.quantity),
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, lineInputs_1 = lineInputs;
                            _d.label = 3;
                        case 3:
                            if (!(_i < lineInputs_1.length)) return [3 /*break*/, 6];
                            lineInput = lineInputs_1[_i];
                            return [5 /*yield**/, _loop_1(lineInput)];
                        case 4:
                            state_1 = _d.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _d.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.stockMovementService.createCancellationsForOrderLines(ctx, fulfilledLines)];
                        case 7:
                            _d.sent();
                            return [4 /*yield*/, this.stockMovementService.createReleasesForOrderLines(ctx, allocatedLines)];
                        case 8:
                            _d.sent();
                            _loop_2 = function (line) {
                                var orderLine;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            orderLine = fullOrder.lines.find(function (l) { return (0, utils_1.idsAreEqual)(l.id, line.orderLineId); });
                                            if (!orderLine) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this_2.connection.getRepository(ctx, order_line_entity_1.OrderLine).update(line.orderLineId, {
                                                    quantity: orderLine.quantity - line.quantity,
                                                })];
                                        case 1:
                                            _f.sent();
                                            return [4 /*yield*/, this_2.eventBus.publish(new order_line_event_1.OrderLineEvent(ctx, order, orderLine, 'cancelled'))];
                                        case 2:
                                            _f.sent();
                                            _f.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            };
                            this_2 = this;
                            _a = 0, lineInputs_2 = lineInputs;
                            _d.label = 9;
                        case 9:
                            if (!(_a < lineInputs_2.length)) return [3 /*break*/, 12];
                            line = lineInputs_2[_a];
                            return [5 /*yield**/, _loop_2(line)];
                        case 10:
                            _d.sent();
                            _d.label = 11;
                        case 11:
                            _a++;
                            return [3 /*break*/, 9];
                        case 12: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_entity_1.Order, order.id, {
                                relations: ['lines', 'surcharges', 'shippingLines'],
                            })];
                        case 13:
                            orderWithLines = _d.sent();
                            if (!(input.cancelShipping === true)) return [3 /*break*/, 17];
                            _b = 0, _c = orderWithLines.shippingLines;
                            _d.label = 14;
                        case 14:
                            if (!(_b < _c.length)) return [3 /*break*/, 17];
                            shippingLine = _c[_b];
                            shippingLine.adjustments.push({
                                adjustmentSource: 'CANCEL_ORDER',
                                type: generated_types_1.AdjustmentType.OTHER,
                                description: 'shipping cancellation',
                                amount: -shippingLine.discountedPrice,
                                data: {},
                            });
                            return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).save(shippingLine, { reload: false })];
                        case 15:
                            _d.sent();
                            _d.label = 16;
                        case 16:
                            _b++;
                            return [3 /*break*/, 14];
                        case 17:
                            // Update totals after cancellation
                            this.orderCalculator.calculateOrderTotals(orderWithLines);
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(orderWithLines, { reload: false })];
                        case 18:
                            _d.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_CANCELLATION,
                                    data: {
                                        lines: lineInputs,
                                        reason: input.reason || undefined,
                                        shippingCancelled: !!input.cancelShipping,
                                    },
                                })];
                        case 19:
                            _d.sent();
                            return [2 /*return*/, (0, order_utils_1.orderLinesAreAllCancelled)(orderWithLines)];
                    }
                });
            });
        };
        OrderModifier_1.prototype.modifyOrder = function (ctx, input, order) {
            return __awaiter(this, void 0, void 0, function () {
                var dryRun, modification, initialTotalWithTax, initialShippingWithTax, orderItemsLimit, currentItemsCount, updatedOrderLineIds, refundInputArray, refundInputs, _i, _a, row, productVariantId, quantity, customFields, orderLine, correctedQuantity, initialQuantity, orderModificationLine, _loop_3, this_3, _b, _c, row, state_2, _loop_4, this_4, _d, _e, surchargeInput, country, country, _f, _g, couponCode, validationResult, _h, _j, existingCouponCode, updatedOrderLines, promotions, activePromotionsPre, result, orderItemPriceCalculationStrategy, _k, updatedOrderLines_1, orderLine, variant, priceResult, orderCustomFields, newTotalWithTax, delta, primaryRefund, shippingDelta, _l, _m, _loop_5, this_5, _o, refundInputs_1, refundInput, createdModification;
                var _p, _q, _r, _s, _t;
                return __generator(this, function (_u) {
                    switch (_u.label) {
                        case 0:
                            dryRun = input.dryRun;
                            modification = new order_modification_entity_1.OrderModification({
                                order: order,
                                note: input.note || '',
                                lines: [],
                                surcharges: [],
                            });
                            initialTotalWithTax = order.totalWithTax;
                            initialShippingWithTax = order.shippingWithTax;
                            if (order.state !== 'Modifying') {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.OrderModificationStateError()];
                            }
                            if (this.noChangesSpecified(input)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.NoChangesSpecifiedError()];
                            }
                            orderItemsLimit = this.configService.orderOptions.orderItemsLimit;
                            currentItemsCount = (0, shared_utils_1.summate)(order.lines, 'quantity');
                            updatedOrderLineIds = [];
                            refundInputArray = Array.isArray(input.refunds)
                                ? input.refunds
                                : input.refund
                                    ? [input.refund]
                                    : [];
                            refundInputs = refundInputArray.map(function (refund) { return ({
                                lines: [],
                                adjustment: 0,
                                shipping: 0,
                                paymentId: refund.paymentId,
                                amount: refund.amount,
                                reason: refund.reason || input.note,
                            }); });
                            _i = 0, _a = (_p = input.addItems) !== null && _p !== void 0 ? _p : [];
                            _u.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            row = _a[_i];
                            productVariantId = row.productVariantId, quantity = row.quantity;
                            if (quantity < 0) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.NegativeQuantityError()];
                            }
                            customFields = row.customFields || {};
                            return [4 /*yield*/, this.getOrCreateOrderLine(ctx, order, productVariantId, customFields)];
                        case 2:
                            orderLine = _u.sent();
                            return [4 /*yield*/, this.constrainQuantityToSaleable(ctx, orderLine.productVariant, quantity)];
                        case 3:
                            correctedQuantity = _u.sent();
                            if (orderItemsLimit < currentItemsCount + correctedQuantity) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.OrderLimitError({ maxItems: orderItemsLimit })];
                            }
                            else {
                                currentItemsCount += correctedQuantity;
                            }
                            if (correctedQuantity < quantity) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.InsufficientStockError({ quantityAvailable: correctedQuantity, order: order })];
                            }
                            updatedOrderLineIds.push(orderLine.id);
                            initialQuantity = orderLine.quantity;
                            return [4 /*yield*/, this.updateOrderLineQuantity(ctx, orderLine, initialQuantity + correctedQuantity, order)];
                        case 4:
                            _u.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_modification_line_entity_1.OrderModificationLine)
                                    .save(new order_modification_line_entity_1.OrderModificationLine({ orderLine: orderLine, quantity: quantity - initialQuantity }))];
                        case 5:
                            orderModificationLine = _u.sent();
                            modification.lines.push(orderModificationLine);
                            _u.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7:
                            _loop_3 = function (row) {
                                var orderLineId, quantity, orderLine, initialLineQuantity, correctedQuantity, additionalQuantity, resultingOrderTotalQuantity, customFields, cancelLinesInput, orderModificationLine, qtyDelta_1;
                                return __generator(this, function (_v) {
                                    switch (_v.label) {
                                        case 0:
                                            orderLineId = row.orderLineId, quantity = row.quantity;
                                            if (quantity < 0) {
                                                return [2 /*return*/, { value: new generated_graphql_shop_errors_1.NegativeQuantityError() }];
                                            }
                                            orderLine = order.lines.find(function (line) { return (0, utils_1.idsAreEqual)(line.id, orderLineId); });
                                            if (!orderLine) {
                                                throw new errors_1.UserInputError('error.order-does-not-contain-line-with-id', { id: orderLineId });
                                            }
                                            initialLineQuantity = orderLine.quantity;
                                            correctedQuantity = quantity;
                                            if (!(initialLineQuantity < quantity)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this_3.constrainQuantityToSaleable(ctx, orderLine.productVariant, quantity - initialLineQuantity)];
                                        case 1:
                                            additionalQuantity = _v.sent();
                                            correctedQuantity = initialLineQuantity + additionalQuantity;
                                            _v.label = 2;
                                        case 2:
                                            resultingOrderTotalQuantity = currentItemsCount + correctedQuantity - orderLine.quantity;
                                            if (orderItemsLimit < resultingOrderTotalQuantity) {
                                                return [2 /*return*/, { value: new generated_graphql_shop_errors_1.OrderLimitError({ maxItems: orderItemsLimit }) }];
                                            }
                                            else {
                                                currentItemsCount += correctedQuantity;
                                            }
                                            if (!(correctedQuantity < quantity)) return [3 /*break*/, 3];
                                            return [2 /*return*/, { value: new generated_graphql_shop_errors_1.InsufficientStockError({ quantityAvailable: correctedQuantity, order: order }) }];
                                        case 3:
                                            customFields = row.customFields;
                                            if (customFields) {
                                                (0, patch_entity_1.patchEntity)(orderLine, { customFields: customFields });
                                            }
                                            if (!(quantity < initialLineQuantity)) return [3 /*break*/, 5];
                                            cancelLinesInput = [
                                                {
                                                    orderLineId: orderLineId,
                                                    quantity: initialLineQuantity - quantity,
                                                },
                                            ];
                                            return [4 /*yield*/, this_3.cancelOrderByOrderLines(ctx, { orderId: order.id }, cancelLinesInput)];
                                        case 4:
                                            _v.sent();
                                            orderLine.quantity = quantity;
                                            return [3 /*break*/, 7];
                                        case 5: return [4 /*yield*/, this_3.updateOrderLineQuantity(ctx, orderLine, quantity, order)];
                                        case 6:
                                            _v.sent();
                                            _v.label = 7;
                                        case 7: return [4 /*yield*/, this_3.connection
                                                .getRepository(ctx, order_modification_line_entity_1.OrderModificationLine)
                                                .save(new order_modification_line_entity_1.OrderModificationLine({ orderLine: orderLine, quantity: quantity - initialLineQuantity }))];
                                        case 8:
                                            orderModificationLine = _v.sent();
                                            modification.lines.push(orderModificationLine);
                                            if (correctedQuantity < initialLineQuantity) {
                                                qtyDelta_1 = initialLineQuantity - correctedQuantity;
                                                refundInputs.forEach(function (ri) {
                                                    var _a;
                                                    (_a = ri.lines) === null || _a === void 0 ? void 0 : _a.push({
                                                        orderLineId: orderLine.id,
                                                        quantity: qtyDelta_1,
                                                    });
                                                });
                                            }
                                            _v.label = 9;
                                        case 9:
                                            updatedOrderLineIds.push(orderLine.id);
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_3 = this;
                            _b = 0, _c = (_q = input.adjustOrderLines) !== null && _q !== void 0 ? _q : [];
                            _u.label = 8;
                        case 8:
                            if (!(_b < _c.length)) return [3 /*break*/, 11];
                            row = _c[_b];
                            return [5 /*yield**/, _loop_3(row)];
                        case 9:
                            state_2 = _u.sent();
                            if (typeof state_2 === "object")
                                return [2 /*return*/, state_2.value];
                            _u.label = 10;
                        case 10:
                            _b++;
                            return [3 /*break*/, 8];
                        case 11:
                            _loop_4 = function (surchargeInput) {
                                var taxLines, surcharge;
                                return __generator(this, function (_w) {
                                    switch (_w.label) {
                                        case 0:
                                            taxLines = surchargeInput.taxRate != null
                                                ? [
                                                    {
                                                        taxRate: surchargeInput.taxRate,
                                                        description: surchargeInput.taxDescription || '',
                                                    },
                                                ]
                                                : [];
                                            return [4 /*yield*/, this_4.connection.getRepository(ctx, surcharge_entity_1.Surcharge).save(new surcharge_entity_1.Surcharge({
                                                    sku: surchargeInput.sku || '',
                                                    description: surchargeInput.description,
                                                    listPrice: surchargeInput.price,
                                                    listPriceIncludesTax: surchargeInput.priceIncludesTax,
                                                    taxLines: taxLines,
                                                    order: order,
                                                }))];
                                        case 1:
                                            surcharge = _w.sent();
                                            order.surcharges.push(surcharge);
                                            modification.surcharges.push(surcharge);
                                            if (surcharge.priceWithTax < 0) {
                                                refundInputs.forEach(function (ri) {
                                                    if (ri.adjustment != null) {
                                                        ri.adjustment += Math.abs(surcharge.priceWithTax);
                                                    }
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_4 = this;
                            _d = 0, _e = (_r = input.surcharges) !== null && _r !== void 0 ? _r : [];
                            _u.label = 12;
                        case 12:
                            if (!(_d < _e.length)) return [3 /*break*/, 15];
                            surchargeInput = _e[_d];
                            return [5 /*yield**/, _loop_4(surchargeInput)];
                        case 13:
                            _u.sent();
                            _u.label = 14;
                        case 14:
                            _d++;
                            return [3 /*break*/, 12];
                        case 15:
                            if (!((_s = input.surcharges) === null || _s === void 0 ? void 0 : _s.length)) return [3 /*break*/, 17];
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 16:
                            _u.sent();
                            _u.label = 17;
                        case 17:
                            if (!input.updateShippingAddress) return [3 /*break*/, 21];
                            order.shippingAddress = __assign(__assign({}, order.shippingAddress), input.updateShippingAddress);
                            if (!input.updateShippingAddress.countryCode) return [3 /*break*/, 19];
                            return [4 /*yield*/, this.countryService.findOneByCode(ctx, input.updateShippingAddress.countryCode)];
                        case 18:
                            country = _u.sent();
                            order.shippingAddress.country = country.name;
                            _u.label = 19;
                        case 19: return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 20:
                            _u.sent();
                            modification.shippingAddressChange = input.updateShippingAddress;
                            _u.label = 21;
                        case 21:
                            if (!input.updateBillingAddress) return [3 /*break*/, 25];
                            order.billingAddress = __assign(__assign({}, order.billingAddress), input.updateBillingAddress);
                            if (!input.updateBillingAddress.countryCode) return [3 /*break*/, 23];
                            return [4 /*yield*/, this.countryService.findOneByCode(ctx, input.updateBillingAddress.countryCode)];
                        case 22:
                            country = _u.sent();
                            order.billingAddress.country = country.name;
                            _u.label = 23;
                        case 23: return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order, { reload: false })];
                        case 24:
                            _u.sent();
                            modification.billingAddressChange = input.updateBillingAddress;
                            _u.label = 25;
                        case 25:
                            if (!input.couponCodes) return [3 /*break*/, 35];
                            _f = 0, _g = input.couponCodes;
                            _u.label = 26;
                        case 26:
                            if (!(_f < _g.length)) return [3 /*break*/, 30];
                            couponCode = _g[_f];
                            return [4 /*yield*/, this.promotionService.validateCouponCode(ctx, couponCode, order.customer && order.customer.id)];
                        case 27:
                            validationResult = _u.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(validationResult)) {
                                return [2 /*return*/, validationResult];
                            }
                            if (!!order.couponCodes.includes(couponCode)) return [3 /*break*/, 29];
                            // This is a new coupon code that hadn't been applied before
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_COUPON_APPLIED,
                                    data: { couponCode: couponCode, promotionId: validationResult.id },
                                })];
                        case 28:
                            // This is a new coupon code that hadn't been applied before
                            _u.sent();
                            _u.label = 29;
                        case 29:
                            _f++;
                            return [3 /*break*/, 26];
                        case 30:
                            _h = 0, _j = order.couponCodes;
                            _u.label = 31;
                        case 31:
                            if (!(_h < _j.length)) return [3 /*break*/, 34];
                            existingCouponCode = _j[_h];
                            if (!!input.couponCodes.includes(existingCouponCode)) return [3 /*break*/, 33];
                            // An existing coupon code has been removed
                            return [4 /*yield*/, this.historyService.createHistoryEntryForOrder({
                                    ctx: ctx,
                                    orderId: order.id,
                                    type: generated_types_1.HistoryEntryType.ORDER_COUPON_REMOVED,
                                    data: { couponCode: existingCouponCode },
                                })];
                        case 32:
                            // An existing coupon code has been removed
                            _u.sent();
                            _u.label = 33;
                        case 33:
                            _h++;
                            return [3 /*break*/, 31];
                        case 34:
                            order.couponCodes = input.couponCodes;
                            _u.label = 35;
                        case 35:
                            updatedOrderLines = order.lines.filter(function (l) { return updatedOrderLineIds.includes(l.id); });
                            return [4 /*yield*/, this.promotionService.getActivePromotionsInChannel(ctx)];
                        case 36:
                            promotions = _u.sent();
                            return [4 /*yield*/, this.promotionService.getActivePromotionsOnOrder(ctx, order.id)];
                        case 37:
                            activePromotionsPre = _u.sent();
                            if (!input.shippingMethodIds) return [3 /*break*/, 39];
                            return [4 /*yield*/, this.setShippingMethods(ctx, order, input.shippingMethodIds)];
                        case 38:
                            result = _u.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            _u.label = 39;
                        case 39:
                            orderItemPriceCalculationStrategy = this.configService.orderOptions.orderItemPriceCalculationStrategy;
                            _k = 0, updatedOrderLines_1 = updatedOrderLines;
                            _u.label = 40;
                        case 40:
                            if (!(_k < updatedOrderLines_1.length)) return [3 /*break*/, 44];
                            orderLine = updatedOrderLines_1[_k];
                            return [4 /*yield*/, this.productVariantService.applyChannelPriceAndTax(orderLine.productVariant, ctx, order)];
                        case 41:
                            variant = _u.sent();
                            return [4 /*yield*/, orderItemPriceCalculationStrategy.calculateUnitPrice(ctx, variant, orderLine.customFields || {}, order, orderLine.quantity)];
                        case 42:
                            priceResult = _u.sent();
                            orderLine.listPrice = priceResult.price;
                            orderLine.listPriceIncludesTax = priceResult.priceIncludesTax;
                            _u.label = 43;
                        case 43:
                            _k++;
                            return [3 /*break*/, 40];
                        case 44: return [4 /*yield*/, this.orderCalculator.applyPriceAdjustments(ctx, order, promotions, updatedOrderLines, {
                                recalculateShipping: (_t = input.options) === null || _t === void 0 ? void 0 : _t.recalculateShipping,
                            })];
                        case 45:
                            _u.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(order.lines, { reload: false })];
                        case 46:
                            _u.sent();
                            orderCustomFields = input.customFields;
                            if (orderCustomFields) {
                                (0, patch_entity_1.patchEntity)(order, { customFields: orderCustomFields });
                            }
                            return [4 /*yield*/, this.promotionService.runPromotionSideEffects(ctx, order, activePromotionsPre)];
                        case 47:
                            _u.sent();
                            if (dryRun) {
                                return [2 /*return*/, { order: order, modification: modification }];
                            }
                            newTotalWithTax = order.totalWithTax;
                            delta = newTotalWithTax - initialTotalWithTax;
                            if (!(delta < 0)) return [3 /*break*/, 53];
                            if (refundInputs.length === 0) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.RefundPaymentIdMissingError()];
                            }
                            primaryRefund = refundInputs.slice().sort(function (a, b) { return (b.amount || 0) - (a.amount || 0); })[0];
                            shippingDelta = order.shippingWithTax - initialShippingWithTax;
                            if (shippingDelta < 0) {
                                primaryRefund.shipping = shippingDelta * -1;
                            }
                            if (!(primaryRefund.adjustment != null)) return [3 /*break*/, 49];
                            _l = primaryRefund;
                            _m = _l.adjustment;
                            return [4 /*yield*/, this.calculateRefundAdjustment(ctx, delta, primaryRefund)];
                        case 48:
                            _l.adjustment = _m + _u.sent();
                            _u.label = 49;
                        case 49:
                            _loop_5 = function (refundInput) {
                                var existingPayments, payment, refund;
                                return __generator(this, function (_x) {
                                    switch (_x.label) {
                                        case 0: return [4 /*yield*/, this_5.getOrderPayments(ctx, order.id)];
                                        case 1:
                                            existingPayments = _x.sent();
                                            payment = existingPayments.find(function (p) { return (0, utils_1.idsAreEqual)(p.id, refundInput.paymentId); });
                                            if (!payment) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this_5.paymentService.createRefund(ctx, refundInput, order, payment)];
                                        case 2:
                                            refund = _x.sent();
                                            if (!(0, error_result_1.isGraphQlErrorResult)(refund)) {
                                                if ((0, utils_1.idsAreEqual)(payment.id, primaryRefund.paymentId)) {
                                                    modification.refund = refund;
                                                }
                                            }
                                            else {
                                                throw new errors_1.InternalServerError(refund.message);
                                            }
                                            _x.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            };
                            this_5 = this;
                            _o = 0, refundInputs_1 = refundInputs;
                            _u.label = 50;
                        case 50:
                            if (!(_o < refundInputs_1.length)) return [3 /*break*/, 53];
                            refundInput = refundInputs_1[_o];
                            return [5 /*yield**/, _loop_5(refundInput)];
                        case 51:
                            _u.sent();
                            _u.label = 52;
                        case 52:
                            _o++;
                            return [3 /*break*/, 50];
                        case 53:
                            modification.priceChange = delta;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_modification_entity_1.OrderModification)
                                    .save(modification)];
                        case 54:
                            createdModification = _u.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_entity_1.Order).save(order)];
                        case 55:
                            _u.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).save(order.shippingLines, { reload: false })];
                        case 56:
                            _u.sent();
                            return [4 /*yield*/, this.eventBus.publish(new event_bus_1.OrderEvent(ctx, order, 'updated', input))];
                        case 57:
                            _u.sent();
                            return [2 /*return*/, { order: order, modification: createdModification }];
                    }
                });
            });
        };
        OrderModifier_1.prototype.setShippingMethods = function (ctx, order, shippingMethodIds) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, _b, i, shippingMethodId, shippingMethod, shippingLine, shippingLinesToDelete, shippingLineAssignmentStrategy, _loop_6, this_6, _c, _d, shippingLine;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _i = 0, _a = shippingMethodIds.entries();
                            _e.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 8];
                            _b = _a[_i], i = _b[0], shippingMethodId = _b[1];
                            return [4 /*yield*/, this.shippingCalculator.getMethodIfEligible(ctx, order, shippingMethodId)];
                        case 2:
                            shippingMethod = _e.sent();
                            if (!shippingMethod) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.IneligibleShippingMethodError()];
                            }
                            shippingLine = order.shippingLines[i];
                            if (!shippingLine) return [3 /*break*/, 3];
                            shippingLine.shippingMethod = shippingMethod;
                            shippingLine.shippingMethodId = shippingMethod.id;
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).save(new shipping_line_entity_1.ShippingLine({
                                shippingMethod: shippingMethod,
                                order: order,
                                adjustments: [],
                                listPrice: 0,
                                listPriceIncludesTax: ctx.channel.pricesIncludeTax,
                                taxLines: [],
                            }))];
                        case 4:
                            shippingLine = _e.sent();
                            if (order.shippingLines) {
                                order.shippingLines.push(shippingLine);
                            }
                            else {
                                order.shippingLines = [shippingLine];
                            }
                            _e.label = 5;
                        case 5: return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).save(shippingLine)];
                        case 6:
                            _e.sent();
                            _e.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8:
                            if (!(shippingMethodIds.length < order.shippingLines.length)) return [3 /*break*/, 10];
                            shippingLinesToDelete = order.shippingLines.splice(shippingMethodIds.length - 1);
                            return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).remove(shippingLinesToDelete)];
                        case 9:
                            _e.sent();
                            _e.label = 10;
                        case 10: 
                        // assign the ShippingLines to the OrderLines
                        return [4 /*yield*/, this.connection
                                .getRepository(ctx, order_line_entity_1.OrderLine)
                                .createQueryBuilder('line')
                                .update({ shippingLine: undefined })
                                .whereInIds(order.lines.map(function (l) { return l.id; }))
                                .execute()];
                        case 11:
                            // assign the ShippingLines to the OrderLines
                            _e.sent();
                            shippingLineAssignmentStrategy = this.configService.shippingOptions.shippingLineAssignmentStrategy;
                            _loop_6 = function (shippingLine) {
                                var orderLinesForShippingLine;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0: return [4 /*yield*/, shippingLineAssignmentStrategy.assignShippingLineToOrderLines(ctx, shippingLine, order)];
                                        case 1:
                                            orderLinesForShippingLine = _f.sent();
                                            return [4 /*yield*/, this_6.connection
                                                    .getRepository(ctx, order_line_entity_1.OrderLine)
                                                    .createQueryBuilder('line')
                                                    .update({ shippingLineId: shippingLine.id })
                                                    .whereInIds(orderLinesForShippingLine.map(function (l) { return l.id; }))
                                                    .execute()];
                                        case 2:
                                            _f.sent();
                                            orderLinesForShippingLine.forEach(function (line) {
                                                line.shippingLine = shippingLine;
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_6 = this;
                            _c = 0, _d = order.shippingLines;
                            _e.label = 12;
                        case 12:
                            if (!(_c < _d.length)) return [3 /*break*/, 15];
                            shippingLine = _d[_c];
                            return [5 /*yield**/, _loop_6(shippingLine)];
                        case 13:
                            _e.sent();
                            _e.label = 14;
                        case 14:
                            _c++;
                            return [3 /*break*/, 12];
                        case 15: return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderModifier_1.prototype.noChangesSpecified = function (input) {
            var _a, _b, _c;
            var noChanges = !((_a = input.adjustOrderLines) === null || _a === void 0 ? void 0 : _a.length) &&
                !((_b = input.addItems) === null || _b === void 0 ? void 0 : _b.length) &&
                !((_c = input.surcharges) === null || _c === void 0 ? void 0 : _c.length) &&
                !input.updateShippingAddress &&
                !input.updateBillingAddress &&
                !input.couponCodes &&
                !input.customFields &&
                (!input.shippingMethodIds || input.shippingMethodIds.length === 0);
            return noChanges;
        };
        /**
         * @description
         * Because a Refund's amount is calculated based on the orderItems changed, plus shipping change,
         * we need to make sure the amount gets adjusted to match any changes caused by other factors,
         * i.e. promotions that were previously active but are no longer.
         *
         * TODO: Deprecated - can be removed once we remove support for the "shipping" & "adjustment" input
         * fields for refunds.
         */
        OrderModifier_1.prototype.calculateRefundAdjustment = function (ctx, delta, refundInput) {
            return __awaiter(this, void 0, void 0, function () {
                var existingAdjustment, itemAmount, _i, _a, lineInput, orderLine, calculatedDelta, absDelta;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            existingAdjustment = (_b = refundInput.adjustment) !== null && _b !== void 0 ? _b : 0;
                            itemAmount = 0;
                            _i = 0, _a = (_c = refundInput.lines) !== null && _c !== void 0 ? _c : [];
                            _e.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            lineInput = _a[_i];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_line_entity_1.OrderLine, lineInput.orderLineId)];
                        case 2:
                            orderLine = _e.sent();
                            itemAmount += orderLine.proratedUnitPriceWithTax * lineInput.quantity;
                            _e.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            calculatedDelta = itemAmount + ((_d = refundInput.shipping) !== null && _d !== void 0 ? _d : 0) + existingAdjustment;
                            absDelta = Math.abs(delta);
                            return [2 /*return*/, absDelta !== calculatedDelta ? absDelta - calculatedDelta : 0];
                    }
                });
            });
        };
        OrderModifier_1.prototype.getOrderPayments = function (ctx, orderId) {
            return this.connection.getRepository(ctx, payment_entity_1.Payment).find({
                relations: ['refunds'],
                where: {
                    order: { id: orderId },
                },
            });
        };
        OrderModifier_1.prototype.customFieldsAreEqual = function (ctx, orderLine, inputCustomFields, existingCustomFields) {
            return __awaiter(this, void 0, void 0, function () {
                var customFieldDefs, _i, customFieldDefs_1, def, key, existingValue, customFieldRelations, lineWithCustomFieldRelations, _a, customFieldDefs_2, def, key, existingValue, valuesMatch, undefinedMatchesNull, defaultValueMatch, inputId, inputValue, existingRelation, customFieldNotEqual;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            customFieldDefs = this.configService.customFields.OrderLine;
                            if (inputCustomFields == null && typeof existingCustomFields === 'object') {
                                // A null value for an OrderLine customFields input is the equivalent
                                // of every property of an existing customFields object being null
                                // or equal to the defaultValue
                                for (_i = 0, customFieldDefs_1 = customFieldDefs; _i < customFieldDefs_1.length; _i++) {
                                    def = customFieldDefs_1[_i];
                                    key = def.name;
                                    existingValue = this.coerceValue(def, existingCustomFields);
                                    if (existingValue != null && (!def.list || (existingValue === null || existingValue === void 0 ? void 0 : existingValue.length) !== 0)) {
                                        if (def.defaultValue != null) {
                                            if (existingValue !== def.defaultValue) {
                                                return [2 /*return*/, false];
                                            }
                                        }
                                        else {
                                            return [2 /*return*/, false];
                                        }
                                    }
                                }
                                return [2 /*return*/, true];
                            }
                            customFieldRelations = customFieldDefs.filter(function (d) { return d.type === 'relation'; });
                            if (!customFieldRelations.length) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_line_entity_1.OrderLine)
                                    .findOne({
                                    where: { id: orderLine.id },
                                    relations: customFieldRelations.map(function (r) { return "customFields.".concat(r.name); }),
                                })
                                    .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                        case 1:
                            // for relation types, we need to actually query the DB and check if there is an
                            // existing entity assigned.
                            lineWithCustomFieldRelations = _b.sent();
                            _b.label = 2;
                        case 2:
                            for (_a = 0, customFieldDefs_2 = customFieldDefs; _a < customFieldDefs_2.length; _a++) {
                                def = customFieldDefs_2[_a];
                                key = def.name;
                                existingValue = this.coerceValue(def, existingCustomFields);
                                if (def.type !== 'relation' && existingValue !== undefined) {
                                    valuesMatch = JSON.stringify(inputCustomFields === null || inputCustomFields === void 0 ? void 0 : inputCustomFields[key]) === JSON.stringify(existingValue);
                                    undefinedMatchesNull = existingValue === null && (inputCustomFields === null || inputCustomFields === void 0 ? void 0 : inputCustomFields[key]) === undefined;
                                    defaultValueMatch = (inputCustomFields === null || inputCustomFields === void 0 ? void 0 : inputCustomFields[key]) === undefined && def.defaultValue === existingValue;
                                    if (!valuesMatch && !undefinedMatchesNull && !defaultValueMatch) {
                                        return [2 /*return*/, false];
                                    }
                                }
                                else if (def.type === 'relation') {
                                    inputId = (0, shared_utils_1.getGraphQlInputName)(def);
                                    inputValue = inputCustomFields === null || inputCustomFields === void 0 ? void 0 : inputCustomFields[inputId];
                                    existingRelation = lineWithCustomFieldRelations.customFields[key];
                                    if (inputValue) {
                                        customFieldNotEqual = def.list
                                            ? JSON.stringify(inputValue.sort()) !==
                                                JSON.stringify(existingRelation === null || existingRelation === void 0 ? void 0 : existingRelation.map(function (relation) { return relation.id; }).sort())
                                            : inputValue !== (existingRelation === null || existingRelation === void 0 ? void 0 : existingRelation.id);
                                        if (customFieldNotEqual) {
                                            return [2 /*return*/, false];
                                        }
                                    }
                                }
                            }
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * This function is required because with the MySQL driver, boolean customFields with a default
         * of `false` were being represented as `0`, thus causing the equality check to fail.
         * So if it's a boolean, we'll explicitly coerce the value to a boolean.
         */
        OrderModifier_1.prototype.coerceValue = function (def, existingCustomFields) {
            var key = def.name;
            return def.type === 'boolean' && typeof (existingCustomFields === null || existingCustomFields === void 0 ? void 0 : existingCustomFields[key]) === 'number'
                ? !!(existingCustomFields === null || existingCustomFields === void 0 ? void 0 : existingCustomFields[key])
                : existingCustomFields === null || existingCustomFields === void 0 ? void 0 : existingCustomFields[key];
        };
        OrderModifier_1.prototype.getProductVariantOrThrow = function (ctx, productVariantId, order) {
            return __awaiter(this, void 0, void 0, function () {
                var variant;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findOneInChannel(ctx, product_variant_entity_1.ProductVariant, productVariantId, ctx.channelId, {
                                relations: ['product', 'productVariantPrices', 'taxCategory'],
                                loadEagerRelations: false,
                                where: { deletedAt: (0, typeorm_1.IsNull)() },
                            })];
                        case 1:
                            variant = _a.sent();
                            if (!variant) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.productVariantService.applyChannelPriceAndTax(variant, ctx, order)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: throw new errors_1.EntityNotFoundError('ProductVariant', productVariantId);
                    }
                });
            });
        };
        return OrderModifier_1;
    }());
    __setFunctionName(_classThis, "OrderModifier");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderModifier = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderModifier = _classThis;
}();
exports.OrderModifier = OrderModifier;
