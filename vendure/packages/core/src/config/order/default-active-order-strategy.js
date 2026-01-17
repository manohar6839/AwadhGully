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
exports.DefaultActiveOrderStrategy = void 0;
var errors_1 = require("../../common/error/errors");
var transactional_connection_1 = require("../../connection/transactional-connection");
var order_entity_1 = require("../../entity/order/order.entity");
/**
 * @description
 * The default {@link ActiveOrderStrategy}, which uses the current {@link Session} to determine
 * the active Order, and requires no additional input in the Shop API since it is based on the
 * session which is part of the RequestContext.
 *
 * @since 1.9.0
 * @docsCategory orders
 */
var DefaultActiveOrderStrategy = /** @class */ (function () {
    function DefaultActiveOrderStrategy() {
    }
    DefaultActiveOrderStrategy.prototype.init = function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var OrderService, SessionService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connection = injector.get(transactional_connection_1.TransactionalConnection);
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/services/order.service.js'); })];
                    case 1:
                        OrderService = (_a.sent()).OrderService;
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/services/session.service.js'); })];
                    case 2:
                        SessionService = (_a.sent()).SessionService;
                        this.orderService = injector.get(OrderService);
                        this.sessionService = injector.get(SessionService);
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultActiveOrderStrategy.prototype.createActiveOrder = function (ctx) {
        return this.orderService.create(ctx, ctx.activeUserId);
    };
    DefaultActiveOrderStrategy.prototype.determineActiveOrder = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var order, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!ctx.session) {
                            throw new errors_1.InternalServerError('error.no-active-session');
                        }
                        if (!ctx.session.activeOrderId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connection
                                .getRepository(ctx, order_entity_1.Order)
                                .createQueryBuilder('order')
                                .leftJoin('order.channels', 'channel')
                                .where('order.id = :orderId', { orderId: ctx.session.activeOrderId })
                                .andWhere('channel.id = :channelId', { channelId: ctx.channelId })
                                .getOne()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _b.label = 3;
                    case 3:
                        order = _a;
                        if (!(order && order.active === false)) return [3 /*break*/, 5];
                        // edge case where an inactive order may not have been
                        // removed from the session, i.e. the regular process was interrupted
                        return [4 /*yield*/, this.sessionService.unsetActiveOrder(ctx, ctx.session)];
                    case 4:
                        // edge case where an inactive order may not have been
                        // removed from the session, i.e. the regular process was interrupted
                        _b.sent();
                        order = undefined;
                        _b.label = 5;
                    case 5:
                        if (!!order) return [3 /*break*/, 7];
                        if (!ctx.activeUserId) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.orderService.getActiveOrderForUser(ctx, ctx.activeUserId)];
                    case 6:
                        order = _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/, order || undefined];
                }
            });
        });
    };
    return DefaultActiveOrderStrategy;
}());
exports.DefaultActiveOrderStrategy = DefaultActiveOrderStrategy;
