"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAssetPreviewStrategy = void 0;
var errors_1 = require("../../common/error/errors");
/**
 * A placeholder strategy which will simply throw an error when used.
 */
var NoAssetPreviewStrategy = /** @class */ (function () {
    function NoAssetPreviewStrategy() {
    }
    NoAssetPreviewStrategy.prototype.generatePreviewImage = function (ctx, mimeType, data) {
        throw new errors_1.InternalServerError('error.no-asset-preview-strategy-configured');
    };
    return NoAssetPreviewStrategy;
}());
exports.NoAssetPreviewStrategy = NoAssetPreviewStrategy;
