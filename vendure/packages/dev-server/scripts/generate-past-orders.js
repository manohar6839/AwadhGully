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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@vendure/core");
var dayjs_1 = require("dayjs");
var dev_config_1 = require("../dev-config");
var loggerCtx = 'DataSync script';
generatePastOrders()
    .then(function () { return process.exit(0); })
    .catch(function () { return process.exit(1); });
var DAYS_TO_COVER = 30;
var MIN_ORDERS_PER_DAY = 5;
var MAX_ORDERS_PER_DAY = 10;
var MAX_RETRIES = 3;
// This script generates a large number of past Orders over the past <DAYS_TO_COVER> days.
// It is useful for testing scenarios where there are a large number of Orders in the system.
function generatePastOrders() {
    return __awaiter(this, void 0, void 0, function () {
        var app, requestContextService, orderService, customerService, productVariantService, shippingMethodService, connection, ctx, ctxAdmin, variants, customers, i, targetDate, numberOfOrders, successfulOrders, retryCount, customer, order, result, eligibleShippingMethods, transitionResult, eligiblePaymentMethods, paymentResult, randomHourOfDay, placedAt, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, core_1.bootstrapWorker)(dev_config_1.devConfig)];
                case 1:
                    app = (_a.sent()).app;
                    requestContextService = app.get(core_1.RequestContextService);
                    orderService = app.get(core_1.OrderService);
                    customerService = app.get(core_1.CustomerService);
                    productVariantService = app.get(core_1.ProductVariantService);
                    shippingMethodService = app.get(core_1.ShippingMethodService);
                    connection = app.get(core_1.TransactionalConnection);
                    return [4 /*yield*/, requestContextService.create({
                            apiType: 'shop',
                        })];
                case 2:
                    ctx = _a.sent();
                    return [4 /*yield*/, requestContextService.create({
                            apiType: 'admin',
                        })];
                case 3:
                    ctxAdmin = _a.sent();
                    return [4 /*yield*/, productVariantService.findAll(ctxAdmin, { take: 500 })];
                case 4:
                    variants = (_a.sent()).items;
                    return [4 /*yield*/, customerService.findAll(ctxAdmin, { take: 500 }, ['user'])];
                case 5:
                    customers = (_a.sent()).items;
                    i = DAYS_TO_COVER;
                    _a.label = 6;
                case 6:
                    if (!(i > 0)) return [3 /*break*/, 21];
                    targetDate = (0, dayjs_1.default)().subtract(DAYS_TO_COVER - i, 'day');
                    numberOfOrders = Math.floor(Math.random() * (MAX_ORDERS_PER_DAY - MIN_ORDERS_PER_DAY + 1)) + MIN_ORDERS_PER_DAY;
                    core_1.Logger.info("Generating ".concat(numberOfOrders, " orders for ").concat(targetDate.format('YYYY-MM-DD')));
                    successfulOrders = 0;
                    retryCount = 0;
                    _a.label = 7;
                case 7:
                    if (!(successfulOrders < numberOfOrders && retryCount < MAX_RETRIES)) return [3 /*break*/, 19];
                    customer = getRandomItem(customers);
                    if (!customer.user) {
                        retryCount++;
                        return [3 /*break*/, 7];
                    }
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 17, , 18]);
                    return [4 /*yield*/, orderService.create(ctx, customer.user.id)];
                case 9:
                    order = _a.sent();
                    return [4 /*yield*/, orderService.addItemToOrder(ctx, order.id, getRandomItem(variants).id, Math.floor(Math.random() * 3) + 1)];
                case 10:
                    result = _a.sent();
                    if ((0, core_1.isGraphQlErrorResult)(result)) {
                        core_1.Logger.error("Failed to add item to order: ".concat(result.message));
                        retryCount++;
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, orderService.getEligibleShippingMethods(ctx, order.id)];
                case 11:
                    eligibleShippingMethods = _a.sent();
                    if (eligibleShippingMethods.length === 0) {
                        core_1.Logger.error('No eligible shipping methods found');
                        retryCount++;
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, orderService.setShippingMethod(ctx, order.id, [
                            getRandomItem(eligibleShippingMethods).id,
                        ])];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, orderService.transitionToState(ctx, order.id, 'ArrangingPayment')];
                case 13:
                    transitionResult = _a.sent();
                    if ((0, core_1.isGraphQlErrorResult)(transitionResult)) {
                        core_1.Logger.error("Failed to transition order state: ".concat(transitionResult.message));
                        retryCount++;
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, orderService.getEligiblePaymentMethods(ctx, order.id)];
                case 14:
                    eligiblePaymentMethods = _a.sent();
                    if (eligiblePaymentMethods.length === 0) {
                        core_1.Logger.error('No eligible payment methods found');
                        retryCount++;
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, orderService.addPaymentToOrder(ctx, order.id, {
                            method: getRandomItem(eligiblePaymentMethods).code,
                            metadata: {},
                        })];
                case 15:
                    paymentResult = _a.sent();
                    if ((0, core_1.isGraphQlErrorResult)(paymentResult)) {
                        core_1.Logger.error("Failed to add payment: ".concat(paymentResult.message));
                        retryCount++;
                        return [3 /*break*/, 7];
                    }
                    randomHourOfDay = Math.floor(Math.random() * 24);
                    placedAt = targetDate.startOf('day').add(randomHourOfDay, 'hour').toDate();
                    return [4 /*yield*/, connection.getRepository(ctx, 'Order').update(order.id, {
                            orderPlacedAt: placedAt,
                        })];
                case 16:
                    _a.sent();
                    successfulOrders++;
                    retryCount = 0; // Reset retry count on success
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _a.sent();
                    core_1.Logger.error("Error creating order: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    retryCount++;
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 7];
                case 19:
                    if (successfulOrders < numberOfOrders) {
                        core_1.Logger.warn("Failed to generate all ".concat(numberOfOrders, " orders for ").concat(targetDate.format('YYYY-MM-DD'), ". Generated ").concat(successfulOrders, " orders."));
                    }
                    else {
                        core_1.Logger.info("Successfully generated ".concat(successfulOrders, " orders for ").concat(targetDate.format('YYYY-MM-DD')));
                    }
                    _a.label = 20;
                case 20:
                    i--;
                    return [3 /*break*/, 6];
                case 21: return [2 /*return*/];
            }
        });
    });
}
// get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
