"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAssetNamingStrategy = void 0;
var normalize_string_1 = require("@vendure/common/lib/normalize-string");
var path_1 = require("path");
/**
 * @description
 * The default strategy normalizes the file names to remove unwanted characters and
 * in the case of conflicts, increments a counter suffix.
 *
 * @docsCategory assets
 */
var DefaultAssetNamingStrategy = /** @class */ (function () {
    function DefaultAssetNamingStrategy() {
        this.numberingRe = /__(\d+)(\.[^.]+)?$/;
    }
    DefaultAssetNamingStrategy.prototype.generateSourceFileName = function (ctx, originalFileName, conflictFileName) {
        var normalized = (0, normalize_string_1.normalizeString)(originalFileName, '-');
        if (!conflictFileName) {
            return normalized;
        }
        else {
            return this.incrementOrdinalSuffix(normalized, conflictFileName);
        }
    };
    DefaultAssetNamingStrategy.prototype.generatePreviewFileName = function (ctx, sourceFileName, conflictFileName) {
        var previewSuffix = '__preview';
        var previewFileName = this.isSupportedImageFormat(sourceFileName)
            ? this.addSuffix(sourceFileName, previewSuffix)
            : this.addSuffix(sourceFileName, previewSuffix) + '.png';
        if (!conflictFileName) {
            return previewFileName;
        }
        else {
            return this.incrementOrdinalSuffix(previewFileName, conflictFileName);
        }
    };
    /**
     * A "supported format" means that the Sharp library can transform it and output the same
     * file type. Unsupported images and other non-image files will be converted to png.
     *
     * See http://sharp.pixelplumbing.com/en/stable/api-output/#tobuffer
     */
    DefaultAssetNamingStrategy.prototype.isSupportedImageFormat = function (fileName) {
        var imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif', '.gif'];
        var ext = path_1.default.extname(fileName);
        return imageExtensions.includes(ext);
    };
    DefaultAssetNamingStrategy.prototype.incrementOrdinalSuffix = function (baseFileName, conflictFileName) {
        var matches = conflictFileName.match(this.numberingRe);
        var ord = Number(matches && matches[1]) || 1;
        return this.addOrdinalSuffix(baseFileName, ord + 1);
    };
    DefaultAssetNamingStrategy.prototype.addOrdinalSuffix = function (fileName, order) {
        var paddedOrder = order.toString(10).padStart(2, '0');
        return this.addSuffix(fileName, "__".concat(paddedOrder));
    };
    DefaultAssetNamingStrategy.prototype.addSuffix = function (fileName, suffix) {
        var ext = path_1.default.extname(fileName);
        var baseName = path_1.default.basename(fileName, ext);
        return "".concat(baseName).concat(suffix).concat(ext);
    };
    return DefaultAssetNamingStrategy;
}());
exports.DefaultAssetNamingStrategy = DefaultAssetNamingStrategy;
