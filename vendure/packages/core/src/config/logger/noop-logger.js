"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopLogger = void 0;
/**
 * A logger that does not log.
 */
var NoopLogger = /** @class */ (function () {
    function NoopLogger() {
    }
    NoopLogger.prototype.debug = function (message, context) {
        // noop!
    };
    NoopLogger.prototype.error = function (message, context, trace) {
        // noop!
    };
    NoopLogger.prototype.info = function (message, context) {
        // noop!
    };
    NoopLogger.prototype.verbose = function (message, context) {
        // noop!
    };
    NoopLogger.prototype.warn = function (message, context) {
        // noop!
    };
    return NoopLogger;
}());
exports.NoopLogger = NoopLogger;
