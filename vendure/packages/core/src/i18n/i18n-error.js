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
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nError = void 0;
var graphql_1 = require("graphql");
var vendure_logger_1 = require("../config/logger/vendure-logger");
/**
 * @description
 * All errors thrown in the Vendure server must use or extend this error class. This allows the
 * error message to be translated before being served to the client.
 *
 * The error messages should be provided in the form of a string key which corresponds to
 * a key defined in the `i18n/messages/<languageCode>.json` files.
 *
 * Note that this class should not be directly used in code, but should be extended by
 * a more specific Error class.
 *
 * @docsCategory errors
 */
var I18nError = /** @class */ (function (_super) {
    __extends(I18nError, _super);
    function I18nError(message, variables, code, logLevel) {
        if (variables === void 0) { variables = {}; }
        if (logLevel === void 0) { logLevel = vendure_logger_1.LogLevel.Warn; }
        var _this = _super.call(this, message, {
            extensions: { code: code },
        }) || this;
        _this.message = message;
        _this.variables = variables;
        _this.code = code;
        _this.logLevel = logLevel;
        return _this;
    }
    return I18nError;
}(graphql_1.GraphQLError));
exports.I18nError = I18nError;
