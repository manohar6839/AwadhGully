"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCodec = void 0;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var ID_KEYS = ['id'];
/**
 * This service is responsible for encoding/decoding entity IDs according to the configured EntityIdStrategy.
 * It should only need to be used in resolvers - the design is that once a request hits the business logic layer
 * (ProductService etc) all entity IDs are in the form used as the primary key in the database.
 */
var IdCodec = /** @class */ (function () {
    function IdCodec(entityIdStrategy) {
        this.entityIdStrategy = entityIdStrategy;
    }
    /**
     * Decode an id from the client into the format used as the database primary key.
     * Acts recursively on all objects containing an "id" property.
     *
     * @param target - The object to be decoded
     * @param transformKeys - An optional array of keys of the target to be decoded. If not defined,
     * then the default recursive behaviour will be used.
     * @return A decoded clone of the target
     */
    IdCodec.prototype.decode = function (target, transformKeys) {
        var _this = this;
        var transformKeysWithId = __spreadArray(__spreadArray([], (transformKeys || []), true), ID_KEYS, true);
        return this.transformRecursive(target, function (input) { return _this.entityIdStrategy.decodeId(input); }, transformKeysWithId);
    };
    /**
     * Encode any entity ids according to the encode.
     * Acts recursively on all objects containing an "id" property.
     *
     * @param target - The object to be encoded
     * @param transformKeys - An optional array of keys of the target to be encoded. If not defined,
     * then the default recursive behaviour will be used.
     * @return An encoded clone of the target
     */
    IdCodec.prototype.encode = function (target, transformKeys) {
        var _this = this;
        var transformKeysWithId = __spreadArray(__spreadArray([], (transformKeys || []), true), ID_KEYS, true);
        return this.transformRecursive(target, function (input) { return _this.entityIdStrategy.encodeId(input); }, transformKeysWithId);
    };
    IdCodec.prototype.transformRecursive = function (target, transformFn, transformKeys) {
        // noinspection SuspiciousInstanceOfGuard
        if (target == null ||
            typeof target === 'boolean' ||
            target instanceof Promise ||
            target instanceof Date ||
            target instanceof RegExp) {
            return target;
        }
        if (typeof target === 'string' || typeof target === 'number') {
            return transformFn(target);
        }
        if (Array.isArray(target)) {
            target = target.slice(0);
            if (target.length === 0 ||
                typeof target[0] === 'string' ||
                typeof target[0] === 'number' ||
                typeof target[0] === 'boolean' ||
                target[0] == null) {
                return target;
            }
            var isSimpleObject = this.isSimpleObject(target[0]);
            if (isSimpleObject) {
                var length_1 = target.length;
                for (var i = 0; i < length_1; i++) {
                    target[i] = this.transform(target[i], transformFn, transformKeys);
                }
            }
            else {
                var length_2 = target.length;
                for (var i = 0; i < length_2; i++) {
                    target[i] = this.transformRecursive(target[i], transformFn, transformKeys);
                }
            }
        }
        else {
            target = this.transform(target, transformFn, transformKeys);
            if ((0, shared_utils_1.isObject)(target)) {
                for (var _i = 0, _a = Object.keys(target); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (this.isObject(target[key])) {
                        target[key] = this.transformRecursive(target[key], transformFn, transformKeys);
                    }
                }
            }
        }
        return target;
    };
    IdCodec.prototype.transform = function (target, transformFn, transformKeys) {
        if (target == null || !this.isObject(target) || Array.isArray(target)) {
            return target;
        }
        var clone = Object.assign({}, target);
        if (transformKeys) {
            for (var _i = 0, transformKeys_1 = transformKeys; _i < transformKeys_1.length; _i++) {
                var key = transformKeys_1[_i];
                if (target[key]) {
                    var val = target[key];
                    if (Array.isArray(val)) {
                        clone[key] = val.map(function (v) { return transformFn(v); });
                    }
                    else {
                        clone[key] = transformFn(val);
                    }
                }
            }
        }
        return clone;
    };
    IdCodec.prototype.isSimpleObject = function (target) {
        if (!target) {
            return true;
        }
        var values = Object.values(target);
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (this.isObject(value) || value === null) {
                return false;
            }
        }
        return true;
    };
    IdCodec.prototype.isObject = function (target) {
        return typeof target === 'object' && target != null;
    };
    return IdCodec;
}());
exports.IdCodec = IdCodec;
