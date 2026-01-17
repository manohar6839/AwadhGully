"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingCacheTtlProvider = exports.DefaultCacheTtlProvider = void 0;
/**
 * @description
 * The default implementation of the {@link CacheTtlProvider} which
 * simply returns the current time.
 */
var DefaultCacheTtlProvider = /** @class */ (function () {
    function DefaultCacheTtlProvider() {
    }
    /**
     * @description
     * Returns the current timestamp in milliseconds.
     */
    DefaultCacheTtlProvider.prototype.getTime = function () {
        return new Date().getTime();
    };
    return DefaultCacheTtlProvider;
}());
exports.DefaultCacheTtlProvider = DefaultCacheTtlProvider;
/**
 * @description
 * A testing implementation of the {@link CacheTtlProvider} which
 * allows the time to be set manually.
 */
var TestingCacheTtlProvider = /** @class */ (function () {
    function TestingCacheTtlProvider() {
        this.time = 0;
    }
    TestingCacheTtlProvider.prototype.setTime = function (timestampInMs) {
        this.time = timestampInMs;
    };
    TestingCacheTtlProvider.prototype.incrementTime = function (ms) {
        this.time += ms;
    };
    TestingCacheTtlProvider.prototype.getTime = function () {
        return this.time;
    };
    return TestingCacheTtlProvider;
}());
exports.TestingCacheTtlProvider = TestingCacheTtlProvider;
