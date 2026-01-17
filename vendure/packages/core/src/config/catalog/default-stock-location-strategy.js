"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.DefaultStockLocationStrategy = exports.BaseStockLocationStrategy = void 0;
var utils_1 = require("../../common/utils");
var transactional_connection_1 = require("../../connection/transactional-connection");
var allocation_entity_1 = require("../../entity/stock-movement/allocation.entity");
var BaseStockLocationStrategy = /** @class */ (function () {
    function BaseStockLocationStrategy() {
    }
    BaseStockLocationStrategy.prototype.init = function (injector) {
        this.connection = injector.get(transactional_connection_1.TransactionalConnection);
    };
    BaseStockLocationStrategy.prototype.forCancellation = function (ctx, stockLocations, orderLine, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLocationsBasedOnAllocations(ctx, stockLocations, orderLine, quantity)];
            });
        });
    };
    BaseStockLocationStrategy.prototype.forRelease = function (ctx, stockLocations, orderLine, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLocationsBasedOnAllocations(ctx, stockLocations, orderLine, quantity)];
            });
        });
    };
    BaseStockLocationStrategy.prototype.forSale = function (ctx, stockLocations, orderLine, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLocationsBasedOnAllocations(ctx, stockLocations, orderLine, quantity)];
            });
        });
    };
    BaseStockLocationStrategy.prototype.getLocationsBasedOnAllocations = function (ctx, stockLocations, orderLine, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var allocations, unallocated, quantityByLocationId, _i, allocations_1, allocation, qtyAtLocation, qtyToAdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.getRepository(ctx, allocation_entity_1.Allocation).find({
                            where: {
                                orderLine: { id: orderLine.id },
                            },
                        })];
                    case 1:
                        allocations = _a.sent();
                        unallocated = quantity;
                        quantityByLocationId = new Map();
                        for (_i = 0, allocations_1 = allocations; _i < allocations_1.length; _i++) {
                            allocation = allocations_1[_i];
                            if (unallocated <= 0) {
                                break;
                            }
                            qtyAtLocation = quantityByLocationId.get(allocation.stockLocationId);
                            qtyToAdd = Math.min(allocation.quantity, unallocated);
                            if (qtyAtLocation != null) {
                                quantityByLocationId.set(allocation.stockLocationId, qtyAtLocation + qtyToAdd);
                            }
                            else {
                                quantityByLocationId.set(allocation.stockLocationId, qtyToAdd);
                            }
                            unallocated -= qtyToAdd;
                        }
                        return [2 /*return*/, __spreadArray([], quantityByLocationId.entries(), true).map(function (_a) {
                                var locationId = _a[0], qty = _a[1];
                                return ({
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    location: stockLocations.find(function (l) { return (0, utils_1.idsAreEqual)(l.id, locationId); }),
                                    quantity: qty,
                                });
                            })];
                }
            });
        });
    };
    return BaseStockLocationStrategy;
}());
exports.BaseStockLocationStrategy = BaseStockLocationStrategy;
/**
 * @description
 * The DefaultStockLocationStrategy was the default implementation of the {@link StockLocationStrategy}
 * prior to the introduction of the {@link MultiChannelStockLocationStrategy}.
 * It assumes only a single StockLocation and that all stock is allocated from that location. When
 * more than one StockLocation or Channel is used, it will not behave as expected.
 *
 * @docsCategory products & stock
 * @since 2.0.0
 */
var DefaultStockLocationStrategy = /** @class */ (function (_super) {
    __extends(DefaultStockLocationStrategy, _super);
    function DefaultStockLocationStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultStockLocationStrategy.prototype.init = function (injector) {
        _super.prototype.init.call(this, injector);
    };
    DefaultStockLocationStrategy.prototype.getAvailableStock = function (ctx, productVariantId, stockLevels) {
        var stockOnHand = 0;
        var stockAllocated = 0;
        for (var _i = 0, stockLevels_1 = stockLevels; _i < stockLevels_1.length; _i++) {
            var stockLevel = stockLevels_1[_i];
            stockOnHand += stockLevel.stockOnHand;
            stockAllocated += stockLevel.stockAllocated;
        }
        return { stockOnHand: stockOnHand, stockAllocated: stockAllocated };
    };
    DefaultStockLocationStrategy.prototype.forAllocation = function (ctx, stockLocations, orderLine, quantity) {
        return [{ location: stockLocations[0], quantity: quantity }];
    };
    return DefaultStockLocationStrategy;
}(BaseStockLocationStrategy));
exports.DefaultStockLocationStrategy = DefaultStockLocationStrategy;
