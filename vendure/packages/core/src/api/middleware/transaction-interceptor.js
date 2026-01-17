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
exports.TransactionInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var __1 = require("..");
var parse_context_1 = require("../common/parse-context");
var transaction_decorator_1 = require("../decorators/transaction.decorator");
/**
 * @description
 * Used by the {@link Transaction} decorator to create a transactional query runner
 * and attach it to the RequestContext.
 */
var TransactionInterceptor = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionInterceptor = _classThis = /** @class */ (function () {
        function TransactionInterceptor_1(connection, transactionWrapper, reflector) {
            this.connection = connection;
            this.transactionWrapper = transactionWrapper;
            this.reflector = reflector;
        }
        TransactionInterceptor_1.prototype.intercept = function (context, next) {
            var req = (0, parse_context_1.parseContext)(context).req;
            var ctx = (0, __1.internal_getRequestContext)(req, context);
            if (ctx) {
                var transactionMode = this.reflector.get(transaction_decorator_1.TRANSACTION_MODE_METADATA_KEY, context.getHandler());
                var transactionIsolationLevel = this.reflector.get(transaction_decorator_1.TRANSACTION_ISOLATION_LEVEL_METADATA_KEY, context.getHandler());
                return (0, rxjs_1.of)(this.transactionWrapper.executeInTransaction(ctx, function (_ctx) {
                    // Registers transactional request context associated
                    // with execution handler function
                    (0, __1.internal_setRequestContext)(req, _ctx, context);
                    return next.handle();
                }, transactionMode, transactionIsolationLevel, this.connection.rawConnection));
            }
            else {
                return next.handle();
            }
        };
        return TransactionInterceptor_1;
    }());
    __setFunctionName(_classThis, "TransactionInterceptor");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionInterceptor = _classThis;
}();
exports.TransactionInterceptor = TransactionInterceptor;
