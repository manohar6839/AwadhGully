"use strict";
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
exports.ConnectionModule = exports.ConnectionCoreModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var config_module_1 = require("../config/config.module");
var config_service_1 = require("../config/config.service");
var typeorm_logger_1 = require("../config/logger/typeorm-logger");
var custom_fields_validation_subscriber_1 = require("./custom-fields-validation-subscriber");
var transaction_subscriber_1 = require("./transaction-subscriber");
var transaction_wrapper_1 = require("./transaction-wrapper");
var transactional_connection_1 = require("./transactional-connection");
var defaultTypeOrmModule;
var ConnectionCoreModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [config_module_1.ConfigModule],
            providers: [
                transactional_connection_1.TransactionalConnection,
                transaction_subscriber_1.TransactionSubscriber,
                transaction_wrapper_1.TransactionWrapper,
                custom_fields_validation_subscriber_1.CustomFieldsValidationSubscriber,
            ],
            exports: [
                transactional_connection_1.TransactionalConnection,
                transaction_subscriber_1.TransactionSubscriber,
                transaction_wrapper_1.TransactionWrapper,
                custom_fields_validation_subscriber_1.CustomFieldsValidationSubscriber,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConnectionCoreModule = _classThis = /** @class */ (function () {
        function ConnectionCoreModule_1() {
        }
        return ConnectionCoreModule_1;
    }());
    __setFunctionName(_classThis, "ConnectionCoreModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConnectionCoreModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConnectionCoreModule = _classThis;
}();
exports.ConnectionCoreModule = ConnectionCoreModule;
var ConnectionModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [ConnectionCoreModule],
            exports: [ConnectionCoreModule],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConnectionModule = _classThis = /** @class */ (function () {
        function ConnectionModule_1() {
        }
        ConnectionModule_1.forRoot = function () {
            if (!defaultTypeOrmModule) {
                defaultTypeOrmModule = typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_module_1.ConfigModule],
                    useFactory: function (configService) {
                        var dbConnectionOptions = configService.dbConnectionOptions;
                        var logger = ConnectionModule.getTypeOrmLogger(dbConnectionOptions);
                        return __assign(__assign({}, dbConnectionOptions), { logger: logger });
                    },
                    inject: [config_service_1.ConfigService],
                });
            }
            return {
                module: ConnectionModule,
                imports: [defaultTypeOrmModule],
            };
        };
        ConnectionModule_1.forPlugin = function () {
            return {
                module: ConnectionModule,
                imports: [typeorm_1.TypeOrmModule.forFeature()],
            };
        };
        ConnectionModule_1.getTypeOrmLogger = function (dbConnectionOptions) {
            if (!dbConnectionOptions.logger) {
                return new typeorm_logger_1.TypeOrmLogger(dbConnectionOptions.logging);
            }
            else {
                return dbConnectionOptions.logger;
            }
        };
        return ConnectionModule_1;
    }());
    __setFunctionName(_classThis, "ConnectionModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConnectionModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConnectionModule = _classThis;
}();
exports.ConnectionModule = ConnectionModule;
