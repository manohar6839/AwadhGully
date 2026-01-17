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
exports.customerGroup = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var ms_1 = require("ms");
var utils_1 = require("../../../common/utils");
var event_bus_1 = require("../../../event-bus/event-bus");
var customer_group_change_event_1 = require("../../../event-bus/events/customer-group-change-event");
var promotion_condition_1 = require("../promotion-condition");
var customerService;
var cacheService;
var subscription;
var groupIdCache;
exports.customerGroup = new promotion_condition_1.PromotionCondition({
    code: 'customer_group',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Customer is a member of the specified group' }],
    args: {
        customerGroupId: {
            type: 'ID',
            ui: { component: 'customer-group-form-input' },
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Customer group' }],
        },
    },
    init: function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var CustomerService, CacheService;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../../service/services/customer.service.js'); })];
                    case 1:
                        CustomerService = (_a.sent()).CustomerService;
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../../cache/cache.service.js'); })];
                    case 2:
                        CacheService = (_a.sent()).CacheService;
                        customerService = injector.get(CustomerService);
                        cacheService = injector.get(CacheService);
                        groupIdCache = cacheService.createCache({
                            getKey: function (id) { return "PromotionCondition:customer_group:".concat(id); },
                            options: { ttl: (0, ms_1.default)('1 week') },
                        });
                        subscription = injector
                            .get(event_bus_1.EventBus)
                            .ofType(customer_group_change_event_1.CustomerGroupChangeEvent)
                            .subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // When a customer is added to or removed from a group, we need
                                    // to invalidate the cache for that customer id
                                    return [4 /*yield*/, groupIdCache.delete(event.customers.map(function (c) { return c.id; }))];
                                    case 1:
                                        // When a customer is added to or removed from a group, we need
                                        // to invalidate the cache for that customer id
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    },
    destroy: function () {
        subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
    },
    check: function (ctx, order, args) {
        return __awaiter(this, void 0, void 0, function () {
            var customerId, groupIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!order.customer) {
                            return [2 /*return*/, false];
                        }
                        customerId = order.customer.id;
                        return [4 /*yield*/, groupIdCache.get(customerId, function () { return __awaiter(_this, void 0, void 0, function () {
                                var groups;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, customerService.getCustomerGroups(ctx, customerId)];
                                        case 1:
                                            groups = _a.sent();
                                            return [2 /*return*/, groups.map(function (g) { return g.id; })];
                                    }
                                });
                            }); })];
                    case 1:
                        groupIds = _a.sent();
                        return [2 /*return*/, !!groupIds.find(function (id) { return (0, utils_1.idsAreEqual)(id, args.customerGroupId); })];
                }
            });
        });
    },
});
