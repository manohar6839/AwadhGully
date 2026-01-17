"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOrderByCodeAccessStrategy = void 0;
var ms_1 = require("ms");
/**
 * @description
 * The default OrderByCodeAccessStrategy used by Vendure. It permitts permanent access to
 * the Customer owning the Order and anyone within a given time period after placing the Order
 * (defaults to 2h).
 *
 * @param anonymousAccessDuration value for [ms](https://github.com/vercel/ms), e.g. `2h` for 2 hours or `5d` for 5 days
 *
 * @docsCategory orders
 * @docsPage OrderByCodeAccessStrategy
 */
var DefaultOrderByCodeAccessStrategy = /** @class */ (function () {
    function DefaultOrderByCodeAccessStrategy(anonymousAccessDuration) {
        this.anonymousAccessDuration = anonymousAccessDuration;
    }
    DefaultOrderByCodeAccessStrategy.prototype.canAccessOrder = function (ctx, order) {
        var _this = this;
        var _a, _b;
        // Order owned by active user
        var activeUserMatches = ((_b = (_a = order === null || order === void 0 ? void 0 : order.customer) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) === ctx.activeUserId;
        // For guest Customers, allow access to the Order for the following
        // time period
        var anonymousAccessPermitted = function () {
            var anonymousAccessLimit = (0, ms_1.default)(_this.anonymousAccessDuration);
            var orderPlaced = order.orderPlacedAt ? +order.orderPlacedAt : 0;
            var now = Date.now();
            return now - orderPlaced < anonymousAccessLimit;
        };
        return (ctx.activeUserId && activeUserMatches) || (!ctx.activeUserId && anonymousAccessPermitted());
    };
    return DefaultOrderByCodeAccessStrategy;
}());
exports.DefaultOrderByCodeAccessStrategy = DefaultOrderByCodeAccessStrategy;
