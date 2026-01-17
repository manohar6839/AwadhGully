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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSubscriber = exports.TransactionSubscriberError = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * This error should be thrown by an event subscription if types do not match
 *
 * @internal
 */
var TransactionSubscriberError = /** @class */ (function (_super) {
    __extends(TransactionSubscriberError, _super);
    function TransactionSubscriberError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransactionSubscriberError;
}(Error));
exports.TransactionSubscriberError = TransactionSubscriberError;
/**
 * This subscriber listens to all transaction commit/rollback events emitted by TypeORM
 * so that we can be notified as soon as a particular queryRunner's transactions ends.
 *
 * This is used by the {@link EventBus} to prevent events from being published until their
 * associated transactions are complete.
 */
var TransactionSubscriber = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionSubscriber = _classThis = /** @class */ (function () {
        function TransactionSubscriber_1(connection) {
            this.connection = connection;
            this.subject$ = new rxjs_1.Subject();
            if (!connection.subscribers.find(function (subscriber) { return subscriber.constructor === TransactionSubscriber; })) {
                connection.subscribers.push(this);
            }
        }
        TransactionSubscriber_1.prototype.afterTransactionCommit = function (event) {
            this.subject$.next(__assign({ type: 'commit' }, event));
        };
        TransactionSubscriber_1.prototype.afterTransactionRollback = function (event) {
            this.subject$.next(__assign({ type: 'rollback' }, event));
        };
        TransactionSubscriber_1.prototype.awaitCommit = function (queryRunner) {
            return this.awaitTransactionEvent(queryRunner, 'commit');
        };
        TransactionSubscriber_1.prototype.awaitRollback = function (queryRunner) {
            return this.awaitTransactionEvent(queryRunner, 'rollback');
        };
        TransactionSubscriber_1.prototype.awaitRelease = function (queryRunner) {
            return this.awaitTransactionEvent(queryRunner);
        };
        TransactionSubscriber_1.prototype.awaitTransactionEvent = function (queryRunner, type) {
            if (queryRunner.isTransactionActive) {
                return (0, rxjs_1.lastValueFrom)(this.subject$
                    .pipe((0, operators_1.filter)(function (event) { return !event.queryRunner.isTransactionActive && event.queryRunner === queryRunner; }), (0, operators_1.take)(1), (0, operators_1.tap)(function (event) {
                    if (type && event.type !== type) {
                        throw new TransactionSubscriberError("Unexpected event type: ".concat(event.type, ". Expected ").concat(type, "."));
                    }
                }), (0, operators_1.map)(function (event) { return event.queryRunner; }), 
                // This `delay(0)` call appears to be necessary with the upgrade to TypeORM
                // v0.2.41, otherwise an active queryRunner can still get picked up in an event
                // subscriber function. This is manifested by the e2e test
                // "Transaction infrastructure › passing transaction via EventBus" failing
                // in the database-transactions.e2e-spec.ts suite, and a bunch of errors
                // in the default-search-plugin.e2e-spec.ts suite when using sqljs.
                (0, operators_1.delay)(0)));
            }
            else {
                return Promise.resolve(queryRunner);
            }
        };
        return TransactionSubscriber_1;
    }());
    __setFunctionName(_classThis, "TransactionSubscriber");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionSubscriber = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionSubscriber = _classThis;
}();
exports.TransactionSubscriber = TransactionSubscriber;
