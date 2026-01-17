"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.NativeAuthenticationStrategy = exports.NATIVE_AUTH_STRATEGY_NAME = void 0;
var graphql_tag_1 = require("graphql-tag");
var transactional_connection_1 = require("../../connection/transactional-connection");
var native_authentication_method_entity_1 = require("../../entity/authentication-method/native-authentication-method.entity");
var user_entity_1 = require("../../entity/user/user.entity");
exports.NATIVE_AUTH_STRATEGY_NAME = 'native';
/**
 * @description
 * This strategy implements a username/password credential-based authentication, with the credentials
 * being stored in the Vendure database. This is the default method of authentication, and it is advised
 * to keep it configured unless there is a specific reason not to.
 *
 * @docsCategory auth
 */
var NativeAuthenticationStrategy = /** @class */ (function () {
    function NativeAuthenticationStrategy() {
        this.name = exports.NATIVE_AUTH_STRATEGY_NAME;
    }
    NativeAuthenticationStrategy.prototype.init = function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var PasswordCipher, UserService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connection = injector.get(transactional_connection_1.TransactionalConnection);
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/helpers/password-cipher/password-cipher.js'); })];
                    case 1:
                        PasswordCipher = (_a.sent()).PasswordCipher;
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../../service/services/user.service.js'); })];
                    case 2:
                        UserService = (_a.sent()).UserService;
                        this.passwordCipher = injector.get(PasswordCipher);
                        this.userService = injector.get(UserService);
                        return [2 /*return*/];
                }
            });
        });
    };
    NativeAuthenticationStrategy.prototype.defineInputType = function () {
        return (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            input NativeAuthInput {\n                username: String!\n                password: String!\n            }\n        "], ["\n            input NativeAuthInput {\n                username: String!\n                password: String!\n            }\n        "])));
    };
    NativeAuthenticationStrategy.prototype.authenticate = function (ctx, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getUserByEmailAddress(ctx, data.username)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.verifyUserPassword(ctx, user.id, data.password)];
                    case 2:
                        passwordMatch = _a.sent();
                        if (!passwordMatch) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * Verify the provided password against the one we have for the given user.
     */
    NativeAuthenticationStrategy.prototype.verifyUserPassword = function (ctx, userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, nativeAuthMethod, pw, passwordMatches;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).findOne({
                            where: { id: userId },
                            relations: ['authenticationMethods'],
                        })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            return [2 /*return*/, false];
                        }
                        nativeAuthMethod = user.getNativeAuthenticationMethod(false);
                        if (!nativeAuthMethod) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).findOne({
                                where: { id: nativeAuthMethod.id },
                                select: ['passwordHash'],
                            })];
                    case 2:
                        pw = (_b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.passwordHash) !== null && _b !== void 0 ? _b : '';
                        return [4 /*yield*/, this.passwordCipher.check(password, pw)];
                    case 3:
                        passwordMatches = _c.sent();
                        if (!passwordMatches) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return NativeAuthenticationStrategy;
}());
exports.NativeAuthenticationStrategy = NativeAuthenticationStrategy;
var templateObject_1;
