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
exports.EntityNotFoundError = exports.ChannelNotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.IllegalOperationError = exports.UserInputError = exports.InternalServerError = void 0;
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var i18n_error_1 = require("../../i18n/i18n-error");
/**
 * @description
 * This error should be thrown when some unexpected and exceptional case is encountered.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, variables) {
        if (variables === void 0) { variables = {}; }
        return _super.call(this, message, variables, 'INTERNAL_SERVER_ERROR', vendure_logger_1.LogLevel.Error) || this;
    }
    return InternalServerError;
}(i18n_error_1.I18nError));
exports.InternalServerError = InternalServerError;
/**
 * @description
 * This error should be thrown when user input is not as expected.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var UserInputError = /** @class */ (function (_super) {
    __extends(UserInputError, _super);
    function UserInputError(message, variables) {
        if (variables === void 0) { variables = {}; }
        return _super.call(this, message, variables, 'USER_INPUT_ERROR', vendure_logger_1.LogLevel.Warn) || this;
    }
    return UserInputError;
}(i18n_error_1.I18nError));
exports.UserInputError = UserInputError;
/**
 * @description
 * This error should be thrown when an operation is attempted which is not allowed.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var IllegalOperationError = /** @class */ (function (_super) {
    __extends(IllegalOperationError, _super);
    function IllegalOperationError(message, variables) {
        if (variables === void 0) { variables = {}; }
        return _super.call(this, message, variables, 'ILLEGAL_OPERATION', vendure_logger_1.LogLevel.Warn) || this;
    }
    return IllegalOperationError;
}(i18n_error_1.I18nError));
exports.IllegalOperationError = IllegalOperationError;
/**
 * @description
 * This error should be thrown when the user's authentication credentials do not match.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super.call(this, 'error.unauthorized', {}, 'UNAUTHORIZED', vendure_logger_1.LogLevel.Info) || this;
    }
    return UnauthorizedError;
}(i18n_error_1.I18nError));
exports.UnauthorizedError = UnauthorizedError;
/**
 * @description
 * This error should be thrown when a user attempts to access a resource which is outside of
 * his or her privileges.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(logLevel) {
        if (logLevel === void 0) { logLevel = vendure_logger_1.LogLevel.Warn; }
        return _super.call(this, 'error.forbidden', {}, 'FORBIDDEN', logLevel) || this;
    }
    return ForbiddenError;
}(i18n_error_1.I18nError));
exports.ForbiddenError = ForbiddenError;
/**
 * @description
 * This error should be thrown when a {@link Channel} cannot be found based on the provided
 * channel token.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var ChannelNotFoundError = /** @class */ (function (_super) {
    __extends(ChannelNotFoundError, _super);
    function ChannelNotFoundError(token) {
        return _super.call(this, 'error.channel-not-found', { token: token }, 'CHANNEL_NOT_FOUND', vendure_logger_1.LogLevel.Info) || this;
    }
    return ChannelNotFoundError;
}(i18n_error_1.I18nError));
exports.ChannelNotFoundError = ChannelNotFoundError;
/**
 * @description
 * This error should be thrown when an entity cannot be found in the database, i.e. no entity of
 * the given entityName (Product, User etc.) exists with the provided id.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
var EntityNotFoundError = /** @class */ (function (_super) {
    __extends(EntityNotFoundError, _super);
    function EntityNotFoundError(entityName, id) {
        return _super.call(this, 'error.entity-with-id-not-found', { entityName: entityName, id: id }, 'ENTITY_NOT_FOUND', vendure_logger_1.LogLevel.Warn) || this;
    }
    return EntityNotFoundError;
}(i18n_error_1.I18nError));
exports.EntityNotFoundError = EntityNotFoundError;
