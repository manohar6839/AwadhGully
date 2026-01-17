"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAssetImportStrategy = void 0;
var fs_extra_1 = require("fs-extra");
var http_1 = require("http");
var https_1 = require("https");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var url_1 = require("url");
var config_service_1 = require("../config.service");
var vendure_logger_1 = require("../logger/vendure-logger");
function fetchUrl(urlString) {
    return new Promise(function (resolve, reject) {
        var url = new url_1.URL(urlString);
        var get = url.protocol.startsWith('https') ? https_1.default.get : http_1.default.get;
        get(url, {
            timeout: 5000,
        }, function (res) {
            var statusCode = res.statusCode;
            if (statusCode !== 200) {
                vendure_logger_1.Logger.error("Failed to fetch \"".concat(urlString.substr(0, 100), "\", statusCode: ").concat(statusCode || 'unknown'));
                reject(new Error("Request failed. Status code: ".concat(statusCode || 'unknown')));
            }
            else {
                resolve(res);
            }
        });
    });
}
/**
 * @description
 * The DefaultAssetImportStrategy is able to import paths from the local filesystem (taking into account the
 * `importExportOptions.importAssetsDir` setting) as well as remote http/https urls.
 *
 * @since 1.7.0
 * @docsCategory import-export
 */
var DefaultAssetImportStrategy = /** @class */ (function () {
    function DefaultAssetImportStrategy(options) {
        this.options = options;
    }
    DefaultAssetImportStrategy.prototype.init = function (injector) {
        this.configService = injector.get(config_service_1.ConfigService);
    };
    DefaultAssetImportStrategy.prototype.getStreamFromPath = function (assetPath) {
        if (/^https?:\/\//.test(assetPath)) {
            return this.getStreamFromUrl(assetPath);
        }
        else {
            return this.getStreamFromLocalFile(assetPath);
        }
    };
    DefaultAssetImportStrategy.prototype.getStreamFromUrl = function (assetUrl) {
        var _a;
        var _b = (_a = this.options) !== null && _a !== void 0 ? _a : {}, retryCount = _b.retryCount, retryDelayMs = _b.retryDelayMs;
        return (0, rxjs_1.lastValueFrom)((0, rxjs_1.from)(fetchUrl(assetUrl)).pipe((0, operators_1.retryWhen)(function (errors) {
            return errors.pipe((0, operators_1.tap)(function (value) {
                vendure_logger_1.Logger.verbose(value);
                vendure_logger_1.Logger.verbose("DefaultAssetImportStrategy: retrying fetchUrl for ".concat(assetUrl));
            }), (0, operators_1.delay)(retryDelayMs !== null && retryDelayMs !== void 0 ? retryDelayMs : 200), (0, operators_1.take)(retryCount !== null && retryCount !== void 0 ? retryCount : 3));
        })));
    };
    DefaultAssetImportStrategy.prototype.getStreamFromLocalFile = function (assetPath) {
        var importAssetsDir = this.configService.importExportOptions.importAssetsDir;
        var filename = path_1.default.join(importAssetsDir, assetPath);
        if (fs_extra_1.default.existsSync(filename)) {
            var fileStat = fs_extra_1.default.statSync(filename);
            if (fileStat.isFile()) {
                try {
                    var stream = fs_extra_1.default.createReadStream(filename);
                    return stream;
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                throw new Error("Could not find file \"".concat(filename, "\""));
            }
        }
        else {
            throw new Error("File \"".concat(filename, "\" does not exist"));
        }
    };
    return DefaultAssetImportStrategy;
}());
exports.DefaultAssetImportStrategy = DefaultAssetImportStrategy;
