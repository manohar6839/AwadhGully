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
exports.StockMovementService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var order_line_entity_1 = require("../../entity/order-line/order-line.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var allocation_entity_1 = require("../../entity/stock-movement/allocation.entity");
var cancellation_entity_1 = require("../../entity/stock-movement/cancellation.entity");
var release_entity_1 = require("../../entity/stock-movement/release.entity");
var sale_entity_1 = require("../../entity/stock-movement/sale.entity");
var stock_adjustment_entity_1 = require("../../entity/stock-movement/stock-adjustment.entity");
var stock_movement_entity_1 = require("../../entity/stock-movement/stock-movement.entity");
var stock_movement_event_1 = require("../../event-bus/events/stock-movement-event");
/**
 * @description
 * Contains methods relating to {@link StockMovement} entities.
 *
 * @docsCategory services
 */
var StockMovementService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StockMovementService = _classThis = /** @class */ (function () {
        function StockMovementService_1(connection, listQueryBuilder, globalSettingsService, stockLevelService, eventBus, stockLocationService) {
            this.connection = connection;
            this.listQueryBuilder = listQueryBuilder;
            this.globalSettingsService = globalSettingsService;
            this.stockLevelService = stockLevelService;
            this.eventBus = eventBus;
            this.stockLocationService = stockLocationService;
        }
        /**
         * @description
         * Returns a {@link PaginatedList} of all StockMovements associated with the specified ProductVariant.
         */
        StockMovementService_1.prototype.getStockMovementsByProductVariantId = function (ctx, productVariantId, options) {
            var qb = this.listQueryBuilder
                .build(stock_movement_entity_1.StockMovement, options, { ctx: ctx })
                .leftJoin('stockmovement.productVariant', 'productVariant')
                .andWhere('productVariant.id = :productVariantId', { productVariantId: productVariantId });
            if (options === null || options === void 0 ? void 0 : options.type) {
                qb.andWhere('stockmovement.type = :type', { type: options.type });
            }
            return qb.getManyAndCount().then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items,
                    totalItems: totalItems,
                });
            });
        };
        /**
         * @description
         * Adjusts the stock level of the ProductVariant, creating a new {@link StockAdjustment} entity
         * in the process.
         */
        StockMovementService_1.prototype.adjustProductVariantStock = function (ctx, productVariantId, stockOnHandNumberOrInput) {
            return __awaiter(this, void 0, void 0, function () {
                var stockOnHandInputs, defaultStockLocation, adjustments, _i, stockOnHandInputs_1, input, stockLevel, oldStockLevel, newStockLevel, delta, adjustment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof stockOnHandNumberOrInput === 'number')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.stockLocationService.defaultStockLocation(ctx)];
                        case 1:
                            defaultStockLocation = _a.sent();
                            stockOnHandInputs = [
                                { stockLocationId: defaultStockLocation.id, stockOnHand: stockOnHandNumberOrInput },
                            ];
                            return [3 /*break*/, 3];
                        case 2:
                            stockOnHandInputs = stockOnHandNumberOrInput;
                            _a.label = 3;
                        case 3:
                            adjustments = [];
                            _i = 0, stockOnHandInputs_1 = stockOnHandInputs;
                            _a.label = 4;
                        case 4:
                            if (!(_i < stockOnHandInputs_1.length)) return [3 /*break*/, 10];
                            input = stockOnHandInputs_1[_i];
                            return [4 /*yield*/, this.stockLevelService.getStockLevel(ctx, productVariantId, input.stockLocationId)];
                        case 5:
                            stockLevel = _a.sent();
                            oldStockLevel = stockLevel.stockOnHand;
                            newStockLevel = input.stockOnHand;
                            if (oldStockLevel === newStockLevel) {
                                return [3 /*break*/, 9];
                            }
                            delta = newStockLevel - oldStockLevel;
                            return [4 /*yield*/, this.connection.getRepository(ctx, stock_adjustment_entity_1.StockAdjustment).save(new stock_adjustment_entity_1.StockAdjustment({
                                    quantity: delta,
                                    stockLocation: { id: input.stockLocationId },
                                    productVariant: { id: productVariantId },
                                }))];
                        case 6:
                            adjustment = _a.sent();
                            return [4 /*yield*/, this.stockLevelService.updateStockOnHandForLocation(ctx, productVariantId, input.stockLocationId, delta)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new stock_movement_event_1.StockMovementEvent(ctx, [adjustment]))];
                        case 8:
                            _a.sent();
                            adjustments.push(adjustment);
                            _a.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 4];
                        case 10: return [2 /*return*/, adjustments];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new {@link Allocation} for each OrderLine in the Order. For ProductVariants
         * which are configured to track stock levels, the `ProductVariant.stockAllocated` value is
         * increased, indicating that this quantity of stock is allocated and cannot be sold.
         */
        StockMovementService_1.prototype.createAllocationsForOrder = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var lines;
                return __generator(this, function (_a) {
                    lines = order.lines.map(function (orderLine) { return ({
                        orderLineId: orderLine.id,
                        quantity: orderLine.quantity,
                    }); });
                    return [2 /*return*/, this.createAllocationsForOrderLines(ctx, lines)];
                });
            });
        };
        /**
         * @description
         * Creates a new {@link Allocation} for each of the given OrderLines. For ProductVariants
         * which are configured to track stock levels, the `ProductVariant.stockAllocated` value is
         * increased, indicating that this quantity of stock is allocated and cannot be sold.
         */
        StockMovementService_1.prototype.createAllocationsForOrderLines = function (ctx, lines) {
            return __awaiter(this, void 0, void 0, function () {
                var allocations, globalTrackInventory, _i, lines_1, _a, orderLineId, quantity, orderLine, productVariant, allocationLocations, _b, allocationLocations_1, allocationLocation, allocation, savedAllocations;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            allocations = [];
                            return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 1:
                            globalTrackInventory = (_c.sent()).trackInventory;
                            _i = 0, lines_1 = lines;
                            _c.label = 2;
                        case 2:
                            if (!(_i < lines_1.length)) return [3 /*break*/, 10];
                            _a = lines_1[_i], orderLineId = _a.orderLineId, quantity = _a.quantity;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, order_line_entity_1.OrderLine, orderLineId)];
                        case 3:
                            orderLine = _c.sent();
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, orderLine.productVariantId)];
                        case 4:
                            productVariant = _c.sent();
                            return [4 /*yield*/, this.stockLocationService.getAllocationLocations(ctx, orderLine, quantity)];
                        case 5:
                            allocationLocations = _c.sent();
                            _b = 0, allocationLocations_1 = allocationLocations;
                            _c.label = 6;
                        case 6:
                            if (!(_b < allocationLocations_1.length)) return [3 /*break*/, 9];
                            allocationLocation = allocationLocations_1[_b];
                            allocation = new allocation_entity_1.Allocation({
                                productVariant: new product_variant_entity_1.ProductVariant({ id: orderLine.productVariantId }),
                                stockLocation: allocationLocation.location,
                                quantity: allocationLocation.quantity,
                                orderLine: orderLine,
                            });
                            allocations.push(allocation);
                            if (!this.trackInventoryForVariant(productVariant, globalTrackInventory)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.stockLevelService.updateStockAllocatedForLocation(ctx, orderLine.productVariantId, allocationLocation.location.id, allocationLocation.quantity)];
                        case 7:
                            _c.sent();
                            _c.label = 8;
                        case 8:
                            _b++;
                            return [3 /*break*/, 6];
                        case 9:
                            _i++;
                            return [3 /*break*/, 2];
                        case 10: return [4 /*yield*/, this.connection.getRepository(ctx, allocation_entity_1.Allocation).save(allocations)];
                        case 11:
                            savedAllocations = _c.sent();
                            if (!savedAllocations.length) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.eventBus.publish(new stock_movement_event_1.StockMovementEvent(ctx, savedAllocations))];
                        case 12:
                            _c.sent();
                            _c.label = 13;
                        case 13: return [2 /*return*/, savedAllocations];
                    }
                });
            });
        };
        /**
         * @description
         * Creates {@link Sale}s for each OrderLine in the Order. For ProductVariants
         * which are configured to track stock levels, the `ProductVariant.stockAllocated` value is
         * reduced and the `stockOnHand` value is also reduced by the OrderLine quantity, indicating
         * that the stock is no longer allocated, but is actually sold and no longer available.
         */
        StockMovementService_1.prototype.createSalesForOrder = function (ctx, lines) {
            return __awaiter(this, void 0, void 0, function () {
                var sales, globalTrackInventory, orderLines, _loop_1, this_1, _i, lines_2, lineRow, savedSales;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sales = [];
                            return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 1:
                            globalTrackInventory = (_a.sent()).trackInventory;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_line_entity_1.OrderLine)
                                    .find({ where: { id: (0, typeorm_1.In)(lines.map(function (line) { return line.orderLineId; })) } })];
                        case 2:
                            orderLines = _a.sent();
                            _loop_1 = function (lineRow) {
                                var orderLine, productVariant, saleLocations, _b, saleLocations_1, saleLocation, sale;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            orderLine = orderLines.find(function (line) { return (0, utils_1.idsAreEqual)(line.id, lineRow.orderLineId); });
                                            if (!orderLine) {
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [4 /*yield*/, this_1.connection.getEntityOrThrow(ctx, product_variant_entity_1.ProductVariant, orderLine.productVariantId, { includeSoftDeleted: true })];
                                        case 1:
                                            productVariant = _c.sent();
                                            return [4 /*yield*/, this_1.stockLocationService.getSaleLocations(ctx, orderLine, lineRow.quantity)];
                                        case 2:
                                            saleLocations = _c.sent();
                                            _b = 0, saleLocations_1 = saleLocations;
                                            _c.label = 3;
                                        case 3:
                                            if (!(_b < saleLocations_1.length)) return [3 /*break*/, 7];
                                            saleLocation = saleLocations_1[_b];
                                            sale = new sale_entity_1.Sale({
                                                productVariant: productVariant,
                                                quantity: lineRow.quantity * -1,
                                                orderLine: orderLine,
                                                stockLocation: saleLocation.location,
                                            });
                                            sales.push(sale);
                                            if (!this_1.trackInventoryForVariant(productVariant, globalTrackInventory)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, this_1.stockLevelService.updateStockAllocatedForLocation(ctx, orderLine.productVariantId, saleLocation.location.id, -saleLocation.quantity)];
                                        case 4:
                                            _c.sent();
                                            return [4 /*yield*/, this_1.stockLevelService.updateStockOnHandForLocation(ctx, orderLine.productVariantId, saleLocation.location.id, -saleLocation.quantity)];
                                        case 5:
                                            _c.sent();
                                            _c.label = 6;
                                        case 6:
                                            _b++;
                                            return [3 /*break*/, 3];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, lines_2 = lines;
                            _a.label = 3;
                        case 3:
                            if (!(_i < lines_2.length)) return [3 /*break*/, 6];
                            lineRow = lines_2[_i];
                            return [5 /*yield**/, _loop_1(lineRow)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, sale_entity_1.Sale).save(sales)];
                        case 7:
                            savedSales = _a.sent();
                            if (!savedSales.length) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.eventBus.publish(new stock_movement_event_1.StockMovementEvent(ctx, savedSales))];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2 /*return*/, savedSales];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a {@link Cancellation} for each of the specified OrderItems. For ProductVariants
         * which are configured to track stock levels, the `ProductVariant.stockOnHand` value is
         * increased for each Cancellation, allowing that stock to be sold again.
         */
        StockMovementService_1.prototype.createCancellationsForOrderLines = function (ctx, lineInputs) {
            return __awaiter(this, void 0, void 0, function () {
                var orderLines, cancellations, globalTrackInventory, _loop_2, this_2, _i, orderLines_1, orderLine, savedCancellations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).find({
                                where: {
                                    id: (0, typeorm_1.In)(lineInputs.map(function (l) { return l.orderLineId; })),
                                },
                                relations: ['productVariant'],
                            })];
                        case 1:
                            orderLines = _a.sent();
                            cancellations = [];
                            return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 2:
                            globalTrackInventory = (_a.sent()).trackInventory;
                            _loop_2 = function (orderLine) {
                                var lineInput, cancellationLocations, _b, cancellationLocations_1, cancellationLocation, cancellation;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            lineInput = lineInputs.find(function (l) { return (0, utils_1.idsAreEqual)(l.orderLineId, orderLine.id); });
                                            if (!lineInput) {
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [4 /*yield*/, this_2.stockLocationService.getCancellationLocations(ctx, orderLine, lineInput.quantity)];
                                        case 1:
                                            cancellationLocations = _c.sent();
                                            _b = 0, cancellationLocations_1 = cancellationLocations;
                                            _c.label = 2;
                                        case 2:
                                            if (!(_b < cancellationLocations_1.length)) return [3 /*break*/, 5];
                                            cancellationLocation = cancellationLocations_1[_b];
                                            cancellation = new cancellation_entity_1.Cancellation({
                                                productVariant: orderLine.productVariant,
                                                quantity: lineInput.quantity,
                                                orderLine: orderLine,
                                                stockLocation: cancellationLocation.location,
                                            });
                                            cancellations.push(cancellation);
                                            if (!this_2.trackInventoryForVariant(orderLine.productVariant, globalTrackInventory)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this_2.stockLevelService.updateStockOnHandForLocation(ctx, orderLine.productVariantId, cancellationLocation.location.id, cancellationLocation.quantity)];
                                        case 3:
                                            _c.sent();
                                            _c.label = 4;
                                        case 4:
                                            _b++;
                                            return [3 /*break*/, 2];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            };
                            this_2 = this;
                            _i = 0, orderLines_1 = orderLines;
                            _a.label = 3;
                        case 3:
                            if (!(_i < orderLines_1.length)) return [3 /*break*/, 6];
                            orderLine = orderLines_1[_i];
                            return [5 /*yield**/, _loop_2(orderLine)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, cancellation_entity_1.Cancellation).save(cancellations)];
                        case 7:
                            savedCancellations = _a.sent();
                            if (!savedCancellations.length) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.eventBus.publish(new stock_movement_event_1.StockMovementEvent(ctx, savedCancellations))];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2 /*return*/, savedCancellations];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a {@link Release} for each of the specified OrderItems. For ProductVariants
         * which are configured to track stock levels, the `ProductVariant.stockAllocated` value is
         * reduced, indicating that this stock is once again available to buy.
         */
        StockMovementService_1.prototype.createReleasesForOrderLines = function (ctx, lineInputs) {
            return __awaiter(this, void 0, void 0, function () {
                var releases, orderLines, globalTrackInventory, variantsMap, _loop_3, this_3, _i, orderLines_2, orderLine, savedReleases;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            releases = [];
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).find({
                                    where: { id: (0, typeorm_1.In)(lineInputs.map(function (l) { return l.orderLineId; })) },
                                    relations: ['productVariant'],
                                })];
                        case 1:
                            orderLines = _a.sent();
                            return [4 /*yield*/, this.globalSettingsService.getSettings(ctx)];
                        case 2:
                            globalTrackInventory = (_a.sent()).trackInventory;
                            variantsMap = new Map();
                            _loop_3 = function (orderLine) {
                                var lineInput, releaseLocations, _b, releaseLocations_1, releaseLocation, release;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            lineInput = lineInputs.find(function (l) { return (0, utils_1.idsAreEqual)(l.orderLineId, orderLine.id); });
                                            if (!lineInput) {
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [4 /*yield*/, this_3.stockLocationService.getReleaseLocations(ctx, orderLine, lineInput.quantity)];
                                        case 1:
                                            releaseLocations = _c.sent();
                                            _b = 0, releaseLocations_1 = releaseLocations;
                                            _c.label = 2;
                                        case 2:
                                            if (!(_b < releaseLocations_1.length)) return [3 /*break*/, 5];
                                            releaseLocation = releaseLocations_1[_b];
                                            release = new release_entity_1.Release({
                                                productVariant: orderLine.productVariant,
                                                quantity: lineInput.quantity,
                                                orderLine: orderLine,
                                                stockLocation: releaseLocation.location,
                                            });
                                            releases.push(release);
                                            if (!this_3.trackInventoryForVariant(orderLine.productVariant, globalTrackInventory)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this_3.stockLevelService.updateStockAllocatedForLocation(ctx, orderLine.productVariantId, releaseLocation.location.id, -releaseLocation.quantity)];
                                        case 3:
                                            _c.sent();
                                            _c.label = 4;
                                        case 4:
                                            _b++;
                                            return [3 /*break*/, 2];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            };
                            this_3 = this;
                            _i = 0, orderLines_2 = orderLines;
                            _a.label = 3;
                        case 3:
                            if (!(_i < orderLines_2.length)) return [3 /*break*/, 6];
                            orderLine = orderLines_2[_i];
                            return [5 /*yield**/, _loop_3(orderLine)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, this.connection.getRepository(ctx, release_entity_1.Release).save(releases)];
                        case 7:
                            savedReleases = _a.sent();
                            if (!savedReleases.length) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.eventBus.publish(new stock_movement_event_1.StockMovementEvent(ctx, savedReleases))];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2 /*return*/, savedReleases];
                    }
                });
            });
        };
        StockMovementService_1.prototype.trackInventoryForVariant = function (variant, globalTrackInventory) {
            return (variant.trackInventory === generated_types_1.GlobalFlag.TRUE ||
                (variant.trackInventory === generated_types_1.GlobalFlag.INHERIT && globalTrackInventory));
        };
        return StockMovementService_1;
    }());
    __setFunctionName(_classThis, "StockMovementService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StockMovementService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StockMovementService = _classThis;
}();
exports.StockMovementService = StockMovementService;
