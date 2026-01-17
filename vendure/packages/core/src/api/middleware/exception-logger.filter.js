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
exports.ExceptionLoggerFilter = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("../../config");
var constants_1 = require("../../health-check/constants");
var i18n_error_1 = require("../../i18n/i18n-error");
var parse_context_1 = require("../common/parse-context");
/**
 * Logs thrown I18nErrors via the configured VendureLogger.
 */
var ExceptionLoggerFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExceptionLoggerFilter = _classThis = /** @class */ (function () {
        function ExceptionLoggerFilter_1(configService) {
            this.configService = configService;
        }
        ExceptionLoggerFilter_1.prototype.catch = function (exception, host) {
            for (var _i = 0, _a = this.configService.systemOptions.errorHandlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                void handler.handleServerError(exception, { host: host });
            }
            var _b = (0, parse_context_1.parseContext)(host), req = _b.req, res = _b.res, info = _b.info, isGraphQL = _b.isGraphQL;
            var message = '';
            var statusCode = 500;
            if (exception instanceof i18n_error_1.I18nError) {
                var code = exception.code, msg = exception.message, logLevel = exception.logLevel;
                message = "".concat(code || 'Error', ": ").concat(msg);
                statusCode = this.errorCodeToStatusCode(code);
                switch (logLevel) {
                    case config_1.LogLevel.Error:
                        config_1.Logger.error(JSON.stringify({ message: message, variables: exception.variables }, null, 2), undefined, exception.stack);
                        break;
                    case config_1.LogLevel.Warn:
                        config_1.Logger.warn(message);
                        break;
                    case config_1.LogLevel.Info:
                        config_1.Logger.info(message);
                        break;
                    case config_1.LogLevel.Debug:
                        config_1.Logger.debug(message);
                        break;
                    case config_1.LogLevel.Verbose:
                        config_1.Logger.verbose(message);
                        break;
                }
                if (exception.stack) {
                    config_1.Logger.debug(exception.stack);
                }
                if (isGraphQL) {
                    return exception;
                }
            }
            else if (exception instanceof common_1.HttpException) {
                // Handle other Nestjs errors
                statusCode = exception.getStatus();
                message = exception.message;
                if (statusCode === 404) {
                    config_1.Logger.verbose(exception.message);
                }
                else {
                    config_1.Logger.error(message, undefined, exception.stack);
                }
            }
            else {
                config_1.Logger.error(exception.message, undefined, exception.stack);
            }
            if (exception instanceof common_1.HttpException && req.path.startsWith('/' + constants_1.HEALTH_CHECK_ROUTE)) {
                // Special case for the health check error, since we want to display the response only
                // so it matches the format of the success case.
                res.status(exception.getStatus()).send(exception.getResponse());
            }
            else if (!isGraphQL) {
                // In the GraphQL context, we can let the error pass
                // through to the next layer, where Apollo Server will
                // return a response for us. But when in the REST context,
                // we must explicitly send the response, otherwise the server
                // will hang.
                res.status(statusCode).json({
                    statusCode: statusCode,
                    message: message,
                    timestamp: new Date().toISOString(),
                    path: req.url,
                });
            }
        };
        /**
         * For a given I18nError.code, returns a corresponding HTTP
         * status code.
         */
        ExceptionLoggerFilter_1.prototype.errorCodeToStatusCode = function (errorCode) {
            switch (errorCode) {
                case 'FORBIDDEN':
                    return 403;
                case 'UNAUTHORIZED':
                    return 401;
                case 'USER_INPUT_ERROR':
                case 'ILLEGAL_OPERATION':
                    return 400;
                default:
                    return 500;
            }
        };
        return ExceptionLoggerFilter_1;
    }());
    __setFunctionName(_classThis, "ExceptionLoggerFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExceptionLoggerFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExceptionLoggerFilter = _classThis;
}();
exports.ExceptionLoggerFilter = ExceptionLoggerFilter;
