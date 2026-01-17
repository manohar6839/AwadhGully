"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.not = not;
exports.foundIn = foundIn;
exports.assertFound = assertFound;
exports.idsAreEqual = idsAreEqual;
exports.getAssetType = getAssetType;
exports.normalizeEmailAddress = normalizeEmailAddress;
exports.isEmailAddressLike = isEmailAddressLike;
exports.awaitPromiseOrObservable = awaitPromiseOrObservable;
exports.asyncObservable = asyncObservable;
exports.convertRelationPaths = convertRelationPaths;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var rxjs_1 = require("rxjs");
/**
 * Takes a predicate function and returns a negated version.
 */
function not(predicate) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !predicate.apply(void 0, args);
    };
}
/**
 * Returns a predicate function which returns true if the item is found in the set,
 * as determined by a === equality check on the given compareBy property.
 */
function foundIn(set, compareBy) {
    return function (item) { return set.some(function (t) { return t[compareBy] === item[compareBy]; }); };
}
/**
 * Identity function which asserts to the type system that a promise which can resolve to T or undefined
 * does in fact resolve to T.
 * Used when performing a "find" operation on an entity which we are sure exists, as in the case that we
 * just successfully created or updated it.
 */
function assertFound(promise) {
    return promise;
}
/**
 * Compare ID values for equality, taking into account the fact that they may not be of matching types
 * (string or number).
 */
function idsAreEqual(id1, id2) {
    if (id1 == null || id2 == null) {
        return false;
    }
    return id1.toString() === id2.toString();
}
/**
 * Returns the AssetType based on the mime type.
 */
function getAssetType(mimeType) {
    var type = mimeType.split('/')[0];
    switch (type) {
        case 'image':
            return generated_types_1.AssetType.IMAGE;
        case 'video':
            return generated_types_1.AssetType.VIDEO;
        default:
            return generated_types_1.AssetType.BINARY;
    }
}
/**
 * A simple normalization for email addresses. Lowercases the whole address,
 * even though technically the local part (before the '@') is case-sensitive
 * per the spec. In practice, however, it seems safe to treat emails as
 * case-insensitive to allow for users who might vary the usage of
 * upper/lower case. See more discussion here: https://ux.stackexchange.com/a/16849
 */
function normalizeEmailAddress(input) {
    return isEmailAddressLike(input) ? input.trim().toLowerCase() : input.trim();
}
/**
 * This is a "good enough" check for whether the input is an email address.
 * From https://stackoverflow.com/a/32686261
 * It is used to determine whether to apply normalization (lower-casing)
 * when comparing identifiers in user lookups. This allows case-sensitive
 * identifiers for other authentication methods.
 */
function isEmailAddressLike(input) {
    if (input.length > 1000) {
        // This limit is in place to prevent abuse via a polynomial-time regex attack
        // See https://github.com/vendurehq/vendure/security/code-scanning/43
        throw new Error('Input too long');
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
}
/**
 * Converts a value that may be wrapped into a Promise or Observable into a Promise-wrapped
 * value.
 */
function awaitPromiseOrObservable(value) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, value];
                case 1:
                    result = _a.sent();
                    if (!(result instanceof rxjs_1.Observable)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, rxjs_1.lastValueFrom)(result)];
                case 2:
                    result = _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
/**
 * @description
 * Returns an observable which executes the given async work function and completes with
 * the returned value. This is useful in methods which need to return
 * an Observable but also want to work with async (Promise-returning) code.
 *
 * @example
 * ```ts
 * \@Controller()
 * export class MyWorkerController {
 *
 *     \@MessagePattern('test')
 *     handleTest() {
 *         return asyncObservable(async observer => {
 *             const value = await this.connection.fetchSomething();
 *             return value;
 *         });
 *     }
 * }
 * ```
 */
function asyncObservable(work) {
    var _this = this;
    return new rxjs_1.Observable(function (subscriber) {
        void (function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, work(subscriber)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            subscriber.next(result);
                        }
                        subscriber.complete();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        subscriber.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    });
}
function convertRelationPaths(relationPaths) {
    var result = {};
    if (relationPaths == null) {
        return undefined;
    }
    for (var _i = 0, relationPaths_1 = relationPaths; _i < relationPaths_1.length; _i++) {
        var path = relationPaths_1[_i];
        var parts = path.split('.');
        var current = result;
        for (var _a = 0, _b = Object.entries(parts); _a < _b.length; _a++) {
            var _c = _b[_a], i = _c[0], part = _c[1];
            if (!current[part]) {
                current[part] = +i === parts.length - 1 ? true : {};
            }
            current = current[part];
        }
    }
    return result;
}
