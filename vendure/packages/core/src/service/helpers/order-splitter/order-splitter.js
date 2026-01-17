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
exports.OrderSplitter = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var pick_1 = require("@vendure/common/lib/pick");
var channel_entity_1 = require("../../../entity/channel/channel.entity");
var order_entity_1 = require("../../../entity/order/order.entity");
var order_line_entity_1 = require("../../../entity/order-line/order-line.entity");
var shipping_line_entity_1 = require("../../../entity/shipping-line/shipping-line.entity");
var OrderSplitter = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderSplitter = _classThis = /** @class */ (function () {
        function OrderSplitter_1(connection, configService, channelService, orderService) {
            this.connection = connection;
            this.configService = configService;
            this.channelService = channelService;
            this.orderService = orderService;
        }
        OrderSplitter_1.prototype.createSellerOrders = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var orderSellerStrategy, partialOrders, defaultChannel, sellerOrders, _i, partialOrders_1, partialOrder, lines, _a, _b, line, _c, _d, shippingLines, _e, _f, shippingLine, newShippingLine, _g, lines_1, line, sellerOrder, _h, _j, _k;
                var _l;
                var _m, _o;
                return __generator(this, function (_p) {
                    switch (_p.label) {
                        case 0:
                            orderSellerStrategy = this.configService.orderOptions.orderSellerStrategy;
                            return [4 /*yield*/, ((_m = orderSellerStrategy.splitOrder) === null || _m === void 0 ? void 0 : _m.call(orderSellerStrategy, ctx, order))];
                        case 1:
                            partialOrders = _p.sent();
                            if (!partialOrders || partialOrders.length === 0) {
                                // No split is needed
                                return [2 /*return*/, []];
                            }
                            return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 2:
                            defaultChannel = _p.sent();
                            order.type = generated_types_1.OrderType.Aggregate;
                            sellerOrders = [];
                            _i = 0, partialOrders_1 = partialOrders;
                            _p.label = 3;
                        case 3:
                            if (!(_i < partialOrders_1.length)) return [3 /*break*/, 21];
                            partialOrder = partialOrders_1[_i];
                            lines = [];
                            _a = 0, _b = partialOrder.lines;
                            _p.label = 4;
                        case 4:
                            if (!(_a < _b.length)) return [3 /*break*/, 7];
                            line = _b[_a];
                            _d = (_c = lines).push;
                            return [4 /*yield*/, this.duplicateOrderLine(ctx, line)];
                        case 5:
                            _d.apply(_c, [_p.sent()]);
                            _p.label = 6;
                        case 6:
                            _a++;
                            return [3 /*break*/, 4];
                        case 7:
                            shippingLines = [];
                            _e = 0, _f = partialOrder.shippingLines;
                            _p.label = 8;
                        case 8:
                            if (!(_e < _f.length)) return [3 /*break*/, 15];
                            shippingLine = _f[_e];
                            return [4 /*yield*/, this.duplicateShippingLine(ctx, shippingLine)];
                        case 9:
                            newShippingLine = _p.sent();
                            _g = 0, lines_1 = lines;
                            _p.label = 10;
                        case 10:
                            if (!(_g < lines_1.length)) return [3 /*break*/, 13];
                            line = lines_1[_g];
                            if (!(shippingLine.id === line.shippingLineId)) return [3 /*break*/, 12];
                            line.shippingLineId = newShippingLine.id;
                            return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(line)];
                        case 11:
                            _p.sent();
                            _p.label = 12;
                        case 12:
                            _g++;
                            return [3 /*break*/, 10];
                        case 13:
                            shippingLines.push(newShippingLine);
                            _p.label = 14;
                        case 14:
                            _e++;
                            return [3 /*break*/, 8];
                        case 15:
                            _j = (_h = this.connection.getRepository(ctx, order_entity_1.Order)).save;
                            _k = order_entity_1.Order.bind;
                            _l = {
                                type: generated_types_1.OrderType.Seller,
                                aggregateOrderId: order.id
                            };
                            return [4 /*yield*/, this.configService.orderOptions.orderCodeStrategy.generate(ctx)];
                        case 16: return [4 /*yield*/, _j.apply(_h, [new (_k.apply(order_entity_1.Order, [void 0, (_l.code = _p.sent(),
                                        _l.active = false,
                                        _l.orderPlacedAt = new Date(),
                                        _l.customer = order.customer,
                                        _l.channels = [new channel_entity_1.Channel({ id: partialOrder.channelId }), defaultChannel],
                                        _l.state = partialOrder.state,
                                        _l.lines = lines,
                                        _l.surcharges = [],
                                        _l.shippingLines = shippingLines,
                                        _l.couponCodes = order.couponCodes,
                                        _l.modifications = [],
                                        _l.shippingAddress = order.shippingAddress,
                                        _l.billingAddress = order.billingAddress,
                                        _l.subTotal = 0,
                                        _l.subTotalWithTax = 0,
                                        _l.currencyCode = order.currencyCode,
                                        _l)]))()])];
                        case 17:
                            sellerOrder = _p.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, order_entity_1.Order)
                                    .createQueryBuilder()
                                    .relation('sellerOrders')
                                    .of(order)
                                    .add(sellerOrder)];
                        case 18:
                            _p.sent();
                            return [4 /*yield*/, this.orderService.applyPriceAdjustments(ctx, sellerOrder)];
                        case 19:
                            _p.sent();
                            sellerOrders.push(sellerOrder);
                            _p.label = 20;
                        case 20:
                            _i++;
                            return [3 /*break*/, 3];
                        case 21: return [4 /*yield*/, ((_o = orderSellerStrategy.afterSellerOrdersCreated) === null || _o === void 0 ? void 0 : _o.call(orderSellerStrategy, ctx, order, sellerOrders))];
                        case 22:
                            _p.sent();
                            return [2 /*return*/, order.sellerOrders];
                    }
                });
            });
        };
        OrderSplitter_1.prototype.duplicateOrderLine = function (ctx, line) {
            return __awaiter(this, void 0, void 0, function () {
                var newLine;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, order_line_entity_1.OrderLine).save(new order_line_entity_1.OrderLine(__assign({}, (0, pick_1.pick)(line, [
                                'quantity',
                                'productVariant',
                                'productVariantId',
                                'taxCategory',
                                'taxCategoryId',
                                'featuredAsset',
                                'shippingLine',
                                'shippingLineId',
                                'customFields',
                                'sellerChannel',
                                'sellerChannelId',
                                'initialListPrice',
                                'listPrice',
                                'listPriceIncludesTax',
                                'adjustments',
                                'taxLines',
                                'orderPlacedQuantity',
                            ]))))];
                        case 1:
                            newLine = _a.sent();
                            return [2 /*return*/, newLine];
                    }
                });
            });
        };
        OrderSplitter_1.prototype.duplicateShippingLine = function (ctx, shippingLine) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, shipping_line_entity_1.ShippingLine).save(new shipping_line_entity_1.ShippingLine(__assign({}, (0, pick_1.pick)(shippingLine, [
                                'shippingMethodId',
                                'order',
                                'listPrice',
                                'listPriceIncludesTax',
                                'adjustments',
                                'taxLines',
                            ]))))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return OrderSplitter_1;
    }());
    __setFunctionName(_classThis, "OrderSplitter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderSplitter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderSplitter = _classThis;
}();
exports.OrderSplitter = OrderSplitter;
