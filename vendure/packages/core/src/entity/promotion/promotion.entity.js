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
exports.Promotion = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var round_money_1 = require("../../common/round-money");
var adjustment_source_1 = require("../../common/types/adjustment-source");
var config_helpers_1 = require("../../config/config-helpers");
var promotion_action_1 = require("../../config/promotion/promotion-action");
var channel_entity_1 = require("../channel/channel.entity");
var custom_entity_fields_1 = require("../custom-entity-fields");
var order_entity_1 = require("../order/order.entity");
var promotion_translation_entity_1 = require("./promotion-translation.entity");
/**
 * @description
 * A Promotion is used to define a set of conditions under which promotions actions (typically discounts)
 * will be applied to an Order.
 *
 * Each assigned {@link PromotionCondition} is checked against the Order, and if they all return `true`,
 * then each assign {@link PromotionItemAction} / {@link PromotionLineAction} / {@link PromotionOrderAction} / {@link PromotionShippingAction} is applied to the Order.
 *
 * @docsCategory entities
 */
var Promotion = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = adjustment_source_1.AdjustmentSource;
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _startsAt_decorators;
    var _startsAt_initializers = [];
    var _startsAt_extraInitializers = [];
    var _endsAt_decorators;
    var _endsAt_initializers = [];
    var _endsAt_extraInitializers = [];
    var _couponCode_decorators;
    var _couponCode_initializers = [];
    var _couponCode_extraInitializers = [];
    var _perCustomerUsageLimit_decorators;
    var _perCustomerUsageLimit_initializers = [];
    var _perCustomerUsageLimit_extraInitializers = [];
    var _usageLimit_decorators;
    var _usageLimit_initializers = [];
    var _usageLimit_extraInitializers = [];
    var _translations_decorators;
    var _translations_initializers = [];
    var _translations_extraInitializers = [];
    var _enabled_decorators;
    var _enabled_initializers = [];
    var _enabled_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _orders_decorators;
    var _orders_initializers = [];
    var _orders_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _conditions_decorators;
    var _conditions_initializers = [];
    var _conditions_extraInitializers = [];
    var _actions_decorators;
    var _actions_initializers = [];
    var _actions_extraInitializers = [];
    var _priorityScore_decorators;
    var _priorityScore_initializers = [];
    var _priorityScore_extraInitializers = [];
    var Promotion = _classThis = /** @class */ (function (_super) {
        __extends(Promotion_1, _super);
        function Promotion_1(input) {
            var _this = _super.call(this, input) || this;
            _this.type = generated_types_1.AdjustmentType.PROMOTION;
            _this.allConditions = {};
            _this.allActions = {};
            _this.deletedAt = __runInitializers(_this, _deletedAt_initializers, void 0);
            _this.startsAt = (__runInitializers(_this, _deletedAt_extraInitializers), __runInitializers(_this, _startsAt_initializers, void 0));
            _this.endsAt = (__runInitializers(_this, _startsAt_extraInitializers), __runInitializers(_this, _endsAt_initializers, void 0));
            _this.couponCode = (__runInitializers(_this, _endsAt_extraInitializers), __runInitializers(_this, _couponCode_initializers, void 0));
            _this.perCustomerUsageLimit = (__runInitializers(_this, _couponCode_extraInitializers), __runInitializers(_this, _perCustomerUsageLimit_initializers, void 0));
            _this.usageLimit = (__runInitializers(_this, _perCustomerUsageLimit_extraInitializers), __runInitializers(_this, _usageLimit_initializers, void 0));
            _this.name = __runInitializers(_this, _usageLimit_extraInitializers);
            _this.translations = __runInitializers(_this, _translations_initializers, void 0);
            _this.enabled = (__runInitializers(_this, _translations_extraInitializers), __runInitializers(_this, _enabled_initializers, void 0));
            _this.channels = (__runInitializers(_this, _enabled_extraInitializers), __runInitializers(_this, _channels_initializers, void 0));
            _this.orders = (__runInitializers(_this, _channels_extraInitializers), __runInitializers(_this, _orders_initializers, void 0));
            _this.customFields = (__runInitializers(_this, _orders_extraInitializers), __runInitializers(_this, _customFields_initializers, void 0));
            _this.conditions = (__runInitializers(_this, _customFields_extraInitializers), __runInitializers(_this, _conditions_initializers, void 0));
            _this.actions = (__runInitializers(_this, _conditions_extraInitializers), __runInitializers(_this, _actions_initializers, void 0));
            /**
             * @description
             * The PriorityScore is used to determine the sequence in which multiple promotions are tested
             * on a given order. A higher number moves the Promotion towards the end of the sequence.
             *
             * The score is derived from the sum of the priorityValues of the PromotionConditions and
             * PromotionActions comprising this Promotion.
             *
             * An example illustrating the need for a priority is this:
             *
             *
             * Consider 2 Promotions, 1) buy 1 get one free and 2) 10% off when order total is over $50.
             * If Promotion 2 is evaluated prior to Promotion 1, then it can trigger the 10% discount even
             * if the subsequent application of Promotion 1 brings the order total down to way below $50.
             */
            _this.priorityScore = (__runInitializers(_this, _actions_extraInitializers), __runInitializers(_this, _priorityScore_initializers, void 0));
            __runInitializers(_this, _priorityScore_extraInitializers);
            var conditions = (input && input.promotionConditions) || (0, config_helpers_1.getConfig)().promotionOptions.promotionConditions || [];
            var actions = (input && input.promotionActions) || (0, config_helpers_1.getConfig)().promotionOptions.promotionActions || [];
            _this.allConditions = conditions.reduce(function (hash, o) {
                var _a;
                return (__assign(__assign({}, hash), (_a = {}, _a[o.code] = o, _a)));
            }, {});
            _this.allActions = actions.reduce(function (hash, o) {
                var _a;
                return (__assign(__assign({}, hash), (_a = {}, _a[o.code] = o, _a)));
            }, {});
            return _this;
        }
        Promotion_1.prototype.apply = function (ctx, args, state) {
            return __awaiter(this, void 0, void 0, function () {
                var amount, _i, _a, action, promotionAction, orderLine, _b, _c, orderLine, _d, _e, order, _f, _g, shippingLine, order, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            amount = 0;
                            state = state || {};
                            _i = 0, _a = this.actions;
                            _k.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 13];
                            action = _a[_i];
                            promotionAction = this.allActions[action.code];
                            if (!(promotionAction instanceof promotion_action_1.PromotionItemAction)) return [3 /*break*/, 4];
                            if (!this.isOrderItemArg(args)) return [3 /*break*/, 3];
                            orderLine = args.orderLine;
                            _b = amount;
                            _c = round_money_1.roundMoney;
                            return [4 /*yield*/, promotionAction.execute(ctx, orderLine, action.args, state, this)];
                        case 2:
                            amount = _b + _c.apply(void 0, [_k.sent(), orderLine.quantity]);
                            _k.label = 3;
                        case 3: return [3 /*break*/, 12];
                        case 4:
                            if (!(promotionAction instanceof promotion_action_1.PromotionLineAction)) return [3 /*break*/, 7];
                            if (!this.isOrderLineArg(args)) return [3 /*break*/, 6];
                            orderLine = args.orderLine;
                            _d = amount;
                            _e = round_money_1.roundMoney;
                            return [4 /*yield*/, promotionAction.execute(ctx, orderLine, action.args, state, this)];
                        case 5:
                            amount = _d + _e.apply(void 0, [_k.sent()]);
                            _k.label = 6;
                        case 6: return [3 /*break*/, 12];
                        case 7:
                            if (!(promotionAction instanceof promotion_action_1.PromotionOrderAction)) return [3 /*break*/, 10];
                            if (!this.isOrderArg(args)) return [3 /*break*/, 9];
                            order = args.order;
                            _f = amount;
                            _g = round_money_1.roundMoney;
                            return [4 /*yield*/, promotionAction.execute(ctx, order, action.args, state, this)];
                        case 8:
                            amount = _f + _g.apply(void 0, [_k.sent()]);
                            _k.label = 9;
                        case 9: return [3 /*break*/, 12];
                        case 10:
                            if (!(promotionAction instanceof promotion_action_1.PromotionShippingAction)) return [3 /*break*/, 12];
                            if (!this.isShippingArg(args)) return [3 /*break*/, 12];
                            shippingLine = args.shippingLine, order = args.order;
                            _h = amount;
                            _j = round_money_1.roundMoney;
                            return [4 /*yield*/, promotionAction.execute(ctx, shippingLine, order, action.args, state, this)];
                        case 11:
                            amount = _h + _j.apply(void 0, [_k.sent()]);
                            _k.label = 12;
                        case 12:
                            _i++;
                            return [3 /*break*/, 1];
                        case 13:
                            if (amount !== 0) {
                                return [2 /*return*/, {
                                        amount: amount,
                                        type: this.type,
                                        description: this.name,
                                        adjustmentSource: this.getSourceId(),
                                        data: {},
                                    }];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Promotion_1.prototype.test = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var promotionState, _i, _a, condition, promotionCondition, applicableOrConditionState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.endsAt && this.endsAt < new Date()) {
                                return [2 /*return*/, false];
                            }
                            if (this.startsAt && this.startsAt > new Date()) {
                                return [2 /*return*/, false];
                            }
                            if (this.couponCode && !order.couponCodes.includes(this.couponCode)) {
                                return [2 /*return*/, false];
                            }
                            promotionState = {};
                            _i = 0, _a = this.conditions;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            condition = _a[_i];
                            promotionCondition = this.allConditions[condition.code];
                            if (!promotionCondition) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, promotionCondition.check(ctx, order, condition.args, this)];
                        case 2:
                            applicableOrConditionState = _b.sent();
                            if (!applicableOrConditionState) {
                                return [2 /*return*/, false];
                            }
                            if (typeof applicableOrConditionState === 'object') {
                                promotionState[condition.code] = applicableOrConditionState;
                            }
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, promotionState];
                    }
                });
            });
        };
        Promotion_1.prototype.activate = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, action, promotionAction;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.actions;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            action = _a[_i];
                            promotionAction = this.allActions[action.code];
                            return [4 /*yield*/, promotionAction.onActivate(ctx, order, action.args, this)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Promotion_1.prototype.deactivate = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, action, promotionAction;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.actions;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            action = _a[_i];
                            promotionAction = this.allActions[action.code];
                            return [4 /*yield*/, promotionAction.onDeactivate(ctx, order, action.args, this)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Promotion_1.prototype.isShippingAction = function (value) {
            return value instanceof promotion_action_1.PromotionShippingAction;
        };
        Promotion_1.prototype.isOrderArg = function (value) {
            return !this.isOrderItemArg(value) && !this.isShippingArg(value);
        };
        Promotion_1.prototype.isOrderLineArg = function (value) {
            return value.hasOwnProperty('orderLine');
        };
        Promotion_1.prototype.isOrderItemArg = function (value) {
            return value.hasOwnProperty('orderLine');
        };
        Promotion_1.prototype.isShippingArg = function (value) {
            return value.hasOwnProperty('shippingLine');
        };
        return Promotion_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Promotion");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deletedAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _startsAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _endsAt_decorators = [(0, typeorm_1.Column)({ type: Date, nullable: true })];
        _couponCode_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _perCustomerUsageLimit_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _usageLimit_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _translations_decorators = [(0, typeorm_1.OneToMany)(function (type) { return promotion_translation_entity_1.PromotionTranslation; }, function (translation) { return translation.base; }, { eager: true })];
        _enabled_decorators = [(0, typeorm_1.Column)()];
        _channels_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return channel_entity_1.Channel; }, function (channel) { return channel.promotions; }), (0, typeorm_1.JoinTable)()];
        _orders_decorators = [(0, typeorm_1.ManyToMany)(function (type) { return order_entity_1.Order; }, function (order) { return order.promotions; })];
        _customFields_decorators = [(0, typeorm_1.Column)(function (type) { return custom_entity_fields_1.CustomPromotionFields; })];
        _conditions_decorators = [(0, typeorm_1.Column)('simple-json')];
        _actions_decorators = [(0, typeorm_1.Column)('simple-json')];
        _priorityScore_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _startsAt_decorators, { kind: "field", name: "startsAt", static: false, private: false, access: { has: function (obj) { return "startsAt" in obj; }, get: function (obj) { return obj.startsAt; }, set: function (obj, value) { obj.startsAt = value; } }, metadata: _metadata }, _startsAt_initializers, _startsAt_extraInitializers);
        __esDecorate(null, null, _endsAt_decorators, { kind: "field", name: "endsAt", static: false, private: false, access: { has: function (obj) { return "endsAt" in obj; }, get: function (obj) { return obj.endsAt; }, set: function (obj, value) { obj.endsAt = value; } }, metadata: _metadata }, _endsAt_initializers, _endsAt_extraInitializers);
        __esDecorate(null, null, _couponCode_decorators, { kind: "field", name: "couponCode", static: false, private: false, access: { has: function (obj) { return "couponCode" in obj; }, get: function (obj) { return obj.couponCode; }, set: function (obj, value) { obj.couponCode = value; } }, metadata: _metadata }, _couponCode_initializers, _couponCode_extraInitializers);
        __esDecorate(null, null, _perCustomerUsageLimit_decorators, { kind: "field", name: "perCustomerUsageLimit", static: false, private: false, access: { has: function (obj) { return "perCustomerUsageLimit" in obj; }, get: function (obj) { return obj.perCustomerUsageLimit; }, set: function (obj, value) { obj.perCustomerUsageLimit = value; } }, metadata: _metadata }, _perCustomerUsageLimit_initializers, _perCustomerUsageLimit_extraInitializers);
        __esDecorate(null, null, _usageLimit_decorators, { kind: "field", name: "usageLimit", static: false, private: false, access: { has: function (obj) { return "usageLimit" in obj; }, get: function (obj) { return obj.usageLimit; }, set: function (obj, value) { obj.usageLimit = value; } }, metadata: _metadata }, _usageLimit_initializers, _usageLimit_extraInitializers);
        __esDecorate(null, null, _translations_decorators, { kind: "field", name: "translations", static: false, private: false, access: { has: function (obj) { return "translations" in obj; }, get: function (obj) { return obj.translations; }, set: function (obj, value) { obj.translations = value; } }, metadata: _metadata }, _translations_initializers, _translations_extraInitializers);
        __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: function (obj) { return "enabled" in obj; }, get: function (obj) { return obj.enabled; }, set: function (obj, value) { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _orders_decorators, { kind: "field", name: "orders", static: false, private: false, access: { has: function (obj) { return "orders" in obj; }, get: function (obj) { return obj.orders; }, set: function (obj, value) { obj.orders = value; } }, metadata: _metadata }, _orders_initializers, _orders_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _conditions_decorators, { kind: "field", name: "conditions", static: false, private: false, access: { has: function (obj) { return "conditions" in obj; }, get: function (obj) { return obj.conditions; }, set: function (obj, value) { obj.conditions = value; } }, metadata: _metadata }, _conditions_initializers, _conditions_extraInitializers);
        __esDecorate(null, null, _actions_decorators, { kind: "field", name: "actions", static: false, private: false, access: { has: function (obj) { return "actions" in obj; }, get: function (obj) { return obj.actions; }, set: function (obj, value) { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
        __esDecorate(null, null, _priorityScore_decorators, { kind: "field", name: "priorityScore", static: false, private: false, access: { has: function (obj) { return "priorityScore" in obj; }, get: function (obj) { return obj.priorityScore; }, set: function (obj, value) { obj.priorityScore = value; } }, metadata: _metadata }, _priorityScore_initializers, _priorityScore_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Promotion = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Promotion = _classThis;
}();
exports.Promotion = Promotion;
