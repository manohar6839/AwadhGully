"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmLogger = void 0;
var vendure_logger_1 = require("./vendure-logger");
var context = 'TypeORM';
var defaultLoggerOptions = ['error', 'warn', 'schema', 'migration'];
/**
 * A custom logger for TypeORM which delegates to the Vendure Logger service.
 */
var TypeOrmLogger = /** @class */ (function () {
    function TypeOrmLogger(options) {
        if (options === void 0) { options = defaultLoggerOptions; }
        this.options = options;
    }
    TypeOrmLogger.prototype.log = function (level, message, queryRunner) {
        switch (level) {
            case 'info':
                if (this.shouldDisplay('info')) {
                    vendure_logger_1.Logger.info(message, context);
                }
                break;
            case 'log':
                if (this.shouldDisplay('log')) {
                    vendure_logger_1.Logger.info(message, context);
                }
                break;
            case 'warn':
                if (this.shouldDisplay('warn')) {
                    vendure_logger_1.Logger.warn(message, context);
                }
                break;
        }
    };
    TypeOrmLogger.prototype.logMigration = function (message, queryRunner) {
        vendure_logger_1.Logger.info(message, context);
    };
    TypeOrmLogger.prototype.logQuery = function (query, parameters, queryRunner) {
        if (this.shouldDisplay('query')) {
            var sql = this.formatQueryWithParams(query, parameters);
            vendure_logger_1.Logger.debug("Query: ".concat(sql), context);
        }
    };
    TypeOrmLogger.prototype.logQueryError = function (error, query, parameters, queryRunner) {
        if (this.shouldDisplay('error')) {
            var sql = this.formatQueryWithParams(query, parameters);
            vendure_logger_1.Logger.error("Query error: ".concat(sql), context);
            vendure_logger_1.Logger.verbose(error, context);
        }
    };
    TypeOrmLogger.prototype.logQuerySlow = function (time, query, parameters, queryRunner) {
        var sql = this.formatQueryWithParams(query, parameters);
        vendure_logger_1.Logger.warn('Query is slow: ' + sql);
        vendure_logger_1.Logger.warn('Execution time: ' + time.toString());
    };
    TypeOrmLogger.prototype.logSchemaBuild = function (message, queryRunner) {
        if (this.shouldDisplay('schema')) {
            vendure_logger_1.Logger.info(message, context);
        }
    };
    TypeOrmLogger.prototype.shouldDisplay = function (logType) {
        return (this.options === 'all' ||
            this.options === true ||
            (Array.isArray(this.options) && this.options.includes(logType)));
    };
    TypeOrmLogger.prototype.formatQueryWithParams = function (query, parameters) {
        return (query +
            ((parameters === null || parameters === void 0 ? void 0 : parameters.length) ? ' -- PARAMETERS: ' + this.stringifyParams(parameters).toString() : ''));
    };
    /**
     * Converts parameters to a string.
     * Sometimes parameters can have circular objects and therefor we are handle this case too.
     */
    TypeOrmLogger.prototype.stringifyParams = function (parameters) {
        try {
            return JSON.stringify(parameters);
        }
        catch (error) {
            // most probably circular objects in parameters
            return parameters;
        }
    };
    return TypeOrmLogger;
}());
exports.TypeOrmLogger = TypeOrmLogger;
