"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
/**
 * @description
 * An enum of valid logging levels.
 *
 * @docsCategory Logger
 */
var LogLevel;
(function (LogLevel) {
    /**
     * @description
     * Log Errors only. These are usually indicative of some potentially
     * serious issue, so should be acted upon.
     */
    LogLevel[LogLevel["Error"] = 0] = "Error";
    /**
     * @description
     * Warnings indicate that some situation may require investigation
     * and handling. But not as serious as an Error.
     */
    LogLevel[LogLevel["Warn"] = 1] = "Warn";
    /**
     * @description
     * Logs general information such as startup messages.
     */
    LogLevel[LogLevel["Info"] = 2] = "Info";
    /**
     * @description
     * Logs additional information
     */
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    /**
     * @description
     * Logs detailed info useful in debug scenarios, including stack traces for
     * all errors. In production this would probably generate too much noise.
     */
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var noopLogger = {
    error: function () {
        /* */
    },
    warn: function () {
        /* */
    },
    info: function () {
        /* */
    },
    verbose: function () {
        /* */
    },
    debug: function () {
        /* */
    },
};
/**
 * @description
 * The Logger is responsible for all logging in a Vendure application.
 *
 * It is intended to be used as a static class:
 *
 * @example
 * ```ts
 * import { Logger } from '\@vendure/core';
 *
 * Logger.info(`Some log message`, 'My Vendure Plugin');
 * ```
 *
 * The actual implementation - where the logs are written to - is defined by the {@link VendureLogger}
 * instance configured in the {@link VendureConfig}. By default, the {@link DefaultLogger} is used, which
 * logs to the console.
 *
 * ## Implementing a custom logger
 *
 * A custom logger can be passed to the `logger` config option by creating a class which implements the
 * {@link VendureLogger} interface. For example, here is how you might go about implementing a logger which
 * logs to a file:
 *
 * @example
 * ```ts
 * import { VendureLogger } from '\@vendure/core';
 * import fs from 'fs';
 *
 * // A simple custom logger which writes all logs to a file.
 * export class SimpleFileLogger implements VendureLogger {
 *     private logfile: fs.WriteStream;
 *
 *     constructor(logfileLocation: string) {
 *         this.logfile = fs.createWriteStream(logfileLocation, { flags: 'w' });
 *     }
 *
 *     error(message: string, context?: string) {
 *         this.logfile.write(`ERROR: [${context}] ${message}\n`);
 *     }
 *     warn(message: string, context?: string) {
 *         this.logfile.write(`WARN: [${context}] ${message}\n`);
 *     }
 *     info(message: string, context?: string) {
 *         this.logfile.write(`INFO: [${context}] ${message}\n`);
 *     }
 *     verbose(message: string, context?: string) {
 *         this.logfile.write(`VERBOSE: [${context}] ${message}\n`);
 *     }
 *     debug(message: string, context?: string) {
 *         this.logfile.write(`DEBUG: [${context}] ${message}\n`);
 *     }
 * }
 *
 * // in the VendureConfig
 * export const config = {
 *     // ...
 *     logger: new SimpleFileLogger('server.log'),
 * }
 * ```
 *
 * @docsCategory Logger
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "logger", {
        get: function () {
            return this._logger || noopLogger;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "instance", {
        get: function () {
            var _instance = Logger._instance;
            return _instance;
        },
        enumerable: false,
        configurable: true
    });
    /** @internal */
    Logger.useLogger = function (logger) {
        Logger._logger = logger;
    };
    /** @internal */
    Logger.prototype.error = function (message, trace, context) {
        // Nestjs ExceptionHandler can't log Error instances properly, so we need to handle them separately.
        if (message instanceof Error) {
            var err = message;
            this.instance.error(err.message, context, err.stack);
        }
        else {
            this.instance.error(message, context, trace);
        }
    };
    /** @internal */
    Logger.prototype.warn = function (message, context) {
        this.instance.warn(message, context);
    };
    /** @internal */
    Logger.prototype.log = function (message, context) {
        this.instance.info(message, context);
    };
    /** @internal */
    Logger.prototype.verbose = function (message, context) {
        this.instance.verbose(message, context);
    };
    /** @internal */
    Logger.prototype.debug = function (message, context) {
        this.instance.debug(message, context);
    };
    Logger.error = function (message, context, trace) {
        Logger.logger.error(message, context, trace);
    };
    Logger.warn = function (message, context) {
        Logger.logger.warn(message, context);
    };
    Logger.info = function (message, context) {
        Logger.logger.info(message, context);
    };
    Logger.verbose = function (message, context) {
        Logger.logger.verbose(message, context);
    };
    Logger.debug = function (message, context) {
        Logger.logger.debug(message, context);
    };
    Logger._instance = Logger;
    return Logger;
}());
exports.Logger = Logger;
