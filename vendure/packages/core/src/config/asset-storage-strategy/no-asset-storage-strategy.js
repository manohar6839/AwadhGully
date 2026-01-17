"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAssetStorageStrategy = void 0;
var errors_1 = require("../../common/error/errors");
var errorMessage = 'error.no-asset-storage-strategy-configured';
/**
 * A placeholder strategy which will simply throw an error when used.
 */
var NoAssetStorageStrategy = /** @class */ (function () {
    function NoAssetStorageStrategy() {
    }
    NoAssetStorageStrategy.prototype.writeFileFromStream = function (fileName, data) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    NoAssetStorageStrategy.prototype.writeFileFromBuffer = function (fileName, data) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    NoAssetStorageStrategy.prototype.readFileToBuffer = function (identifier) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    NoAssetStorageStrategy.prototype.readFileToStream = function (identifier) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    NoAssetStorageStrategy.prototype.deleteFile = function (identifier) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    NoAssetStorageStrategy.prototype.toAbsoluteUrl = function (request, identifier) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    NoAssetStorageStrategy.prototype.fileExists = function (fileName) {
        throw new errors_1.InternalServerError(errorMessage);
    };
    return NoAssetStorageStrategy;
}());
exports.NoAssetStorageStrategy = NoAssetStorageStrategy;
