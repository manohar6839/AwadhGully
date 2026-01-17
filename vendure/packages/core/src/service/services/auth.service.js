"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var native_authentication_strategy_1 = require("../../config/auth/native-authentication-strategy");
var external_authentication_method_entity_1 = require("../../entity/authentication-method/external-authentication-method.entity");
var authenticated_session_entity_1 = require("../../entity/session/authenticated-session.entity");
var user_entity_1 = require("../../entity/user/user.entity");
var attempted_login_event_1 = require("../../event-bus/events/attempted-login-event");
var login_event_1 = require("../../event-bus/events/login-event");
var logout_event_1 = require("../../event-bus/events/logout-event");
/**
 * @description
 * Contains methods relating to {@link Session}, {@link AuthenticatedSession} & {@link AnonymousSession} entities.
 *
 * @docsCategory services
 */
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(connection, configService, sessionService, eventBus) {
            this.connection = connection;
            this.configService = configService;
            this.sessionService = sessionService;
            this.eventBus = eventBus;
        }
        /**
         * @description
         * Authenticates a user's credentials and if okay, creates a new {@link AuthenticatedSession}.
         */
        AuthService_1.prototype.authenticate = function (ctx, apiType, authenticationMethod, authenticationData) {
            return __awaiter(this, void 0, void 0, function () {
                var authenticationStrategy, authenticateResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.eventBus.publish(new attempted_login_event_1.AttemptedLoginEvent(ctx, authenticationMethod, authenticationMethod === native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME
                                ? authenticationData.username
                                : undefined))];
                        case 1:
                            _a.sent();
                            authenticationStrategy = this.getAuthenticationStrategy(apiType, authenticationMethod);
                            return [4 /*yield*/, authenticationStrategy.authenticate(ctx, authenticationData)];
                        case 2:
                            authenticateResult = _a.sent();
                            if (typeof authenticateResult === 'string') {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.InvalidCredentialsError({ authenticationError: authenticateResult })];
                            }
                            if (!authenticateResult) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.InvalidCredentialsError({ authenticationError: '' })];
                            }
                            return [2 /*return*/, this.createAuthenticatedSessionForUser(ctx, authenticateResult, authenticationStrategy.name)];
                    }
                });
            });
        };
        AuthService_1.prototype.createAuthenticatedSessionForUser = function (ctx, user, authenticationStrategyName) {
            return __awaiter(this, void 0, void 0, function () {
                var userWithRoles, extAuths, session;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(!user.roles || !((_a = user.roles[0]) === null || _a === void 0 ? void 0 : _a.channels))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, user_entity_1.User)
                                    .createQueryBuilder('user')
                                    .leftJoinAndSelect('user.roles', 'role')
                                    .leftJoinAndSelect('role.channels', 'channel')
                                    .where('user.id = :userId', { userId: user.id })
                                    .getOne()];
                        case 1:
                            userWithRoles = _c.sent();
                            user.roles = (userWithRoles === null || userWithRoles === void 0 ? void 0 : userWithRoles.roles) || [];
                            _c.label = 2;
                        case 2:
                            extAuths = ((_b = user.authenticationMethods) !== null && _b !== void 0 ? _b : []).filter(function (am) { return am instanceof external_authentication_method_entity_1.ExternalAuthenticationMethod; });
                            if (!extAuths.length && this.configService.authOptions.requireVerification && !user.verified) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.NotVerifiedError()];
                            }
                            if (!(ctx.session && ctx.session.activeOrderId)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.sessionService.deleteSessionsByActiveOrderId(ctx, ctx.session.activeOrderId)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4:
                            user.lastLogin = new Date();
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(user)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, this.sessionService.createNewAuthenticatedSession(ctx, user, authenticationStrategyName)];
                        case 6:
                            session = _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new login_event_1.LoginEvent(ctx, user))];
                        case 7:
                            _c.sent();
                            return [2 /*return*/, session];
                    }
                });
            });
        };
        /**
         * @description
         * Verify the provided password against the one we have for the given user. Requires
         * the {@link NativeAuthenticationStrategy} to be configured.
         */
        AuthService_1.prototype.verifyUserPassword = function (ctx, userId, password) {
            return __awaiter(this, void 0, void 0, function () {
                var nativeAuthenticationStrategy, passwordMatches;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nativeAuthenticationStrategy = this.getAuthenticationStrategy('shop', native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME);
                            return [4 /*yield*/, nativeAuthenticationStrategy.verifyUserPassword(ctx, userId, password)];
                        case 1:
                            passwordMatches = _a.sent();
                            if (!passwordMatches) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.InvalidCredentialsError({ authenticationError: '' })];
                            }
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes all sessions for the user associated with the given session token.
         */
        AuthService_1.prototype.destroyAuthenticatedSession = function (ctx, sessionToken) {
            return __awaiter(this, void 0, void 0, function () {
                var session, authenticationStrategy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, authenticated_session_entity_1.AuthenticatedSession).findOne({
                                where: { token: sessionToken },
                                relations: ['user', 'user.authenticationMethods'],
                            })];
                        case 1:
                            session = _a.sent();
                            if (!session) return [3 /*break*/, 5];
                            authenticationStrategy = this.getAuthenticationStrategy(ctx.apiType, session.authenticationStrategy);
                            if (!(typeof authenticationStrategy.onLogOut === 'function')) return [3 /*break*/, 3];
                            return [4 /*yield*/, authenticationStrategy.onLogOut(ctx, session.user)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.eventBus.publish(new logout_event_1.LogoutEvent(ctx))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.sessionService.deleteSessionsByUser(ctx, session.user)];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.getAuthenticationStrategy = function (apiType, method) {
            var authOptions = this.configService.authOptions;
            var strategies = apiType === 'admin'
                ? authOptions.adminAuthenticationStrategy
                : authOptions.shopAuthenticationStrategy;
            var match = strategies.find(function (s) { return s.name === method; });
            if (!match) {
                throw new errors_1.InternalServerError('error.unrecognized-authentication-strategy', { name: method });
            }
            return match;
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
