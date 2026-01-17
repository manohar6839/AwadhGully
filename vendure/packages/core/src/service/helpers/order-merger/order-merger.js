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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMerger = void 0;
var common_1 = require("@nestjs/common");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var utils_1 = require("../../../common/utils");
var OrderMerger = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderMerger = _classThis = /** @class */ (function () {
        function OrderMerger_1(configService) {
            this.configService = configService;
        }
        /**
         * Applies the configured OrderMergeStrategy to the supplied guestOrder and existingOrder. Returns an object
         * containing entities which then need to be persisted to the database by the OrderService methods.
         */
        OrderMerger_1.prototype.merge = function (ctx, guestOrder, existingOrder) {
            if (guestOrder && !this.orderEmpty(guestOrder) && existingOrder && !this.orderEmpty(existingOrder)) {
                var mergeStrategy = this.configService.orderOptions.mergeStrategy;
                var mergedLines = mergeStrategy.merge(ctx, guestOrder, existingOrder);
                return {
                    order: existingOrder,
                    linesToInsert: this.getLinesToInsert(guestOrder, existingOrder, mergedLines),
                    linesToModify: this.getLinesToModify(guestOrder, existingOrder, mergedLines),
                    linesToDelete: this.getLinesToDelete(guestOrder, existingOrder, mergedLines),
                    orderToDelete: guestOrder,
                };
            }
            else if (guestOrder &&
                !this.orderEmpty(guestOrder) &&
                (!existingOrder || (existingOrder && this.orderEmpty(existingOrder)))) {
                return {
                    order: guestOrder,
                    orderToDelete: existingOrder,
                };
            }
            else {
                return {
                    order: existingOrder,
                    orderToDelete: guestOrder,
                };
            }
        };
        OrderMerger_1.prototype.getLinesToInsert = function (guestOrder, existingOrder, mergedLines) {
            return guestOrder.lines
                .map(function (guestLine) {
                var mergedLine = mergedLines.find(function (ml) { return (0, utils_1.idsAreEqual)(ml.orderLineId, guestLine.id); });
                if (!mergedLine) {
                    return;
                }
                return {
                    productVariantId: guestLine.productVariant.id,
                    quantity: mergedLine.quantity,
                    customFields: mergedLine.customFields,
                };
            })
                .filter(shared_utils_1.notNullOrUndefined);
        };
        OrderMerger_1.prototype.getLinesToModify = function (guestOrder, existingOrder, mergedLines) {
            return existingOrder.lines
                .map(function (existingLine) {
                var mergedLine = mergedLines.find(function (ml) { return (0, utils_1.idsAreEqual)(ml.orderLineId, existingLine.id); });
                if (!mergedLine) {
                    return;
                }
                var lineIsModified = mergedLine.quantity !== existingLine.quantity ||
                    JSON.stringify(mergedLine.customFields) !== JSON.stringify(existingLine.customFields);
                if (!lineIsModified) {
                    return;
                }
                return {
                    orderLineId: mergedLine.orderLineId,
                    quantity: mergedLine.quantity,
                    customFields: mergedLine.customFields,
                };
            })
                .filter(shared_utils_1.notNullOrUndefined);
        };
        OrderMerger_1.prototype.getLinesToDelete = function (guestOrder, existingOrder, mergedLines) {
            return existingOrder.lines
                .filter(function (existingLine) { return !mergedLines.find(function (ml) { return (0, utils_1.idsAreEqual)(ml.orderLineId, existingLine.id); }); })
                .map(function (existingLine) { return ({ orderLineId: existingLine.id }); });
        };
        OrderMerger_1.prototype.orderEmpty = function (order) {
            return !order || !order.lines || !order.lines.length;
        };
        return OrderMerger_1;
    }());
    __setFunctionName(_classThis, "OrderMerger");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderMerger = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderMerger = _classThis;
}();
exports.OrderMerger = OrderMerger;
