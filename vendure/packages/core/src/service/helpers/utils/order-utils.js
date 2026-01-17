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
exports.orderTotalIsCovered = orderTotalIsCovered;
exports.totalCoveredByPayments = totalCoveredByPayments;
exports.orderItemsAreDelivered = orderItemsAreDelivered;
exports.orderItemsArePartiallyDelivered = orderItemsArePartiallyDelivered;
exports.orderItemsArePartiallyShipped = orderItemsArePartiallyShipped;
exports.orderItemsAreShipped = orderItemsAreShipped;
exports.orderLinesAreAllCancelled = orderLinesAreAllCancelled;
exports.getOrdersFromLines = getOrdersFromLines;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var errors_1 = require("../../../common/error/errors");
var utils_1 = require("../../../common/utils");
var order_line_entity_1 = require("../../../entity/order-line/order-line.entity");
/**
 * Returns true if the Order total is covered by Payments in the specified state.
 */
function orderTotalIsCovered(order, state) {
    var paymentsTotal = totalCoveredByPayments(order, state);
    return paymentsTotal >= order.totalWithTax;
}
/**
 * Returns the total amount covered by all Payments (minus any refunds)
 */
function totalCoveredByPayments(order, state) {
    var _a, _b;
    var payments = state
        ? Array.isArray(state)
            ? order.payments.filter(function (p) { return state.includes(p.state); })
            : order.payments.filter(function (p) { return p.state === state; })
        : order.payments.filter(function (p) { return p.state !== 'Error' && p.state !== 'Declined' && p.state !== 'Cancelled'; });
    var total = 0;
    for (var _i = 0, payments_1 = payments; _i < payments_1.length; _i++) {
        var payment = payments_1[_i];
        var settledRefunds = (_b = (_a = payment.refunds) === null || _a === void 0 ? void 0 : _a.filter(function (refund) { return refund.state === 'Settled'; })) !== null && _b !== void 0 ? _b : [];
        var settledRefundTotal = (0, shared_utils_1.summate)(settledRefunds, 'total');
        total += payment.amount - Math.abs(settledRefundTotal);
    }
    return total;
}
/**
 * Returns true if all (non-cancelled) OrderItems are delivered.
 */
function orderItemsAreDelivered(order) {
    return (getOrderLinesFulfillmentStates(order).every(function (state) { return state === 'Delivered'; }) &&
        !isOrderPartiallyFulfilled(order));
}
/**
 * Returns true if at least one, but not all (non-cancelled) OrderItems are delivered.
 */
function orderItemsArePartiallyDelivered(order) {
    var states = getOrderLinesFulfillmentStates(order);
    return (states.some(function (state) { return state === 'Delivered'; }) &&
        (!states.every(function (state) { return state === 'Delivered'; }) || isOrderPartiallyFulfilled(order)));
}
function getOrderLinesFulfillmentStates(order) {
    var fulfillmentLines = getOrderFulfillmentLines(order);
    var states = (0, unique_1.unique)(order.lines
        .filter(function (line) { return line.quantity !== 0; })
        .map(function (line) {
        var matchingFulfillmentLines = fulfillmentLines.filter(function (fl) {
            return (0, utils_1.idsAreEqual)(fl.orderLineId, line.id);
        });
        var totalFulfilled = (0, shared_utils_1.summate)(matchingFulfillmentLines, 'quantity');
        if (0 < totalFulfilled) {
            return matchingFulfillmentLines.map(function (l) { return l.fulfillment.state; });
        }
        else {
            return undefined;
        }
    })
        .flat());
    return states;
}
/**
 * Returns true if at least one, but not all (non-cancelled) OrderItems are shipped.
 */
function orderItemsArePartiallyShipped(order) {
    var states = getOrderLinesFulfillmentStates(order);
    return (states.some(function (state) { return state === 'Shipped'; }) &&
        (!states.every(function (state) { return state === 'Shipped'; }) || isOrderPartiallyFulfilled(order)));
}
/**
 * Returns true if all (non-cancelled) OrderItems are shipped.
 */
function orderItemsAreShipped(order) {
    return (getOrderLinesFulfillmentStates(order).every(function (state) { return state === 'Shipped'; }) &&
        !isOrderPartiallyFulfilled(order));
}
/**
 * Returns true if all OrderItems in the order are cancelled
 */
function orderLinesAreAllCancelled(order) {
    return order.lines.every(function (line) { return line.quantity === 0; });
}
function getOrderFulfillmentLines(order) {
    return order.fulfillments
        .filter(function (f) { return f.state !== 'Cancelled'; })
        .reduce(function (fulfillmentLines, fulfillment) { return __spreadArray(__spreadArray([], fulfillmentLines, true), fulfillment.lines, true); }, []);
}
/**
 * Returns true if Fulfillments exist for only some but not all of the
 * order items.
 */
function isOrderPartiallyFulfilled(order) {
    var fulfillmentLines = getOrderFulfillmentLines(order);
    var lines = fulfillmentLines.reduce(function (acc, item) {
        acc[item.orderLineId] = (acc[item.orderLineId] || 0) + item.quantity;
        return acc;
    }, {});
    return order.lines.some(function (line) { return line.quantity > lines[line.id]; });
}
function getOrdersFromLines(ctx, connection, orderLinesInput) {
    return __awaiter(this, void 0, void 0, function () {
        var orders, lines, _loop_1, _i, lines_1, line;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orders = new Map();
                    return [4 /*yield*/, connection.getRepository(ctx, order_line_entity_1.OrderLine).find({
                            where: { id: (0, typeorm_1.In)(orderLinesInput.map(function (l) { return l.orderLineId; })) },
                            relations: ['order', 'order.channels'],
                            order: { id: 'ASC' },
                        })];
                case 1:
                    lines = _a.sent();
                    _loop_1 = function (line) {
                        var inputLine = orderLinesInput.find(function (l) { return (0, utils_1.idsAreEqual)(l.orderLineId, line.id); });
                        if (!inputLine) {
                            return "continue";
                        }
                        var order = line.order;
                        if (!order.channels.some(function (channel) { return channel.id === ctx.channelId; })) {
                            throw new errors_1.EntityNotFoundError('Order', order.id);
                        }
                        if (!orders.has(order.id)) {
                            orders.set(order.id, order);
                        }
                    };
                    for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        line = lines_1[_i];
                        _loop_1(line);
                    }
                    return [2 /*return*/, Array.from(orders.values())];
            }
        });
    });
}
