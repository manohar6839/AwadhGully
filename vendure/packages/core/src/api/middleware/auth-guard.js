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
exports.AuthGuard = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var errors_1 = require("../../common/error/errors");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var customer_entity_1 = require("../../entity/customer/customer.entity");
var extract_session_token_1 = require("../common/extract-session-token");
var is_field_resolver_1 = require("../common/is-field-resolver");
var parse_context_1 = require("../common/parse-context");
var request_context_1 = require("../common/request-context");
var set_session_token_1 = require("../common/set-session-token");
var allow_decorator_1 = require("../decorators/allow.decorator");
/**
 * @description
 * A guard which:
 *
 * 1. checks for the existence of a valid session token in the request and if found,
 * attaches the current User entity to the request.
 * 2. enforces any permissions required by the target handler (resolver, field resolver or route),
 * and throws a ForbiddenError if those permissions are not present.
 */
var AuthGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthGuard = _classThis = /** @class */ (function () {
        function AuthGuard_1(reflector, configService, requestContextService, sessionService, customerService, channelService) {
            this.reflector = reflector;
            this.configService = configService;
            this.requestContextService = requestContextService;
            this.sessionService = sessionService;
            this.customerService = customerService;
            this.channelService = channelService;
        }
        AuthGuard_1.prototype.canActivate = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, req, res, info, targetIsFieldResolver, permissions, authDisabled, isPublic, hasOwnerPermission, requestContext, session, requestContextShouldBeReinitialized, canActivate;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = (0, parse_context_1.parseContext)(context), req = _a.req, res = _a.res, info = _a.info;
                            targetIsFieldResolver = (0, is_field_resolver_1.isFieldResolver)(info);
                            permissions = this.reflector.get(allow_decorator_1.PERMISSIONS_METADATA_KEY, context.getHandler());
                            if (targetIsFieldResolver && !permissions) {
                                return [2 /*return*/, true];
                            }
                            authDisabled = this.configService.authOptions.disableAuth;
                            isPublic = !!permissions && permissions.includes(generated_types_1.Permission.Public);
                            hasOwnerPermission = !!permissions && permissions.includes(generated_types_1.Permission.Owner);
                            if (!targetIsFieldResolver) return [3 /*break*/, 1];
                            requestContext = (0, request_context_1.internal_getRequestContext)(req);
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, this.getSession(req, res, hasOwnerPermission)];
                        case 2:
                            session = _b.sent();
                            return [4 /*yield*/, this.requestContextService.fromRequest(req, info, permissions, session)];
                        case 3:
                            requestContext = _b.sent();
                            return [4 /*yield*/, this.setActiveChannel(requestContext, session)];
                        case 4:
                            requestContextShouldBeReinitialized = _b.sent();
                            if (!requestContextShouldBeReinitialized) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.requestContextService.fromRequest(req, info, permissions, session)];
                        case 5:
                            requestContext = _b.sent();
                            _b.label = 6;
                        case 6:
                            (0, request_context_1.internal_setRequestContext)(req, requestContext, context);
                            _b.label = 7;
                        case 7:
                            if (authDisabled || !permissions || isPublic) {
                                return [2 /*return*/, true];
                            }
                            else {
                                canActivate = requestContext.userHasPermissions(permissions) || requestContext.authorizedAsOwnerOnly;
                                if (!canActivate) {
                                    throw new errors_1.ForbiddenError(vendure_logger_1.LogLevel.Verbose);
                                }
                                else {
                                    return [2 /*return*/, canActivate];
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthGuard_1.prototype.setActiveChannel = function (requestContext, session) {
            return __awaiter(this, void 0, void 0, function () {
                var activeChannelShouldBeSet, customer, e_1, isDuplicateError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!session) {
                                return [2 /*return*/, false];
                            }
                            activeChannelShouldBeSet = !session.activeChannelId || session.activeChannelId !== requestContext.channelId;
                            if (!activeChannelShouldBeSet) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.sessionService.setActiveChannel(session, requestContext.channel)];
                        case 1:
                            _a.sent();
                            if (!requestContext.activeUserId) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.customerService.findOneByUserId(requestContext, requestContext.activeUserId, false)];
                        case 2:
                            customer = _a.sent();
                            if (!customer) return [3 /*break*/, 6];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.channelService.assignToChannels(requestContext, customer_entity_1.Customer, customer.id, [
                                    requestContext.channelId,
                                ])];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            isDuplicateError = e_1.code === 'ER_DUP_ENTRY' /* mySQL/MariaDB */ ||
                                e_1.code === '23505';
                            if (isDuplicateError) {
                                // For a duplicate error, this means that concurrent requests have resulted in attempting to
                                // assign the Customer to the channel more than once. In this case we can safely ignore the
                                // error as the Customer was successfully assigned in the earlier call.
                                // See https://github.com/vendurehq/vendure/issues/834
                            }
                            else {
                                throw e_1;
                            }
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, true];
                        case 7: return [2 /*return*/, false];
                    }
                });
            });
        };
        AuthGuard_1.prototype.getSession = function (req, res, hasOwnerPermission) {
            return __awaiter(this, void 0, void 0, function () {
                var sessionToken, serializedSession;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sessionToken = (0, extract_session_token_1.extractSessionToken)(req, this.configService.authOptions.tokenMethod);
                            if (!sessionToken) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sessionService.getSessionFromToken(sessionToken)];
                        case 1:
                            serializedSession = _a.sent();
                            if (serializedSession) {
                                return [2 /*return*/, serializedSession];
                            }
                            // if there is a token but it cannot be validated to a Session,
                            // then the token is no longer valid and should be unset.
                            (0, set_session_token_1.setSessionToken)({
                                req: req,
                                res: res,
                                authOptions: this.configService.authOptions,
                                rememberMe: false,
                                sessionToken: '',
                            });
                            _a.label = 2;
                        case 2:
                            if (!(hasOwnerPermission && !serializedSession)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.sessionService.createAnonymousSession()];
                        case 3:
                            serializedSession = _a.sent();
                            (0, set_session_token_1.setSessionToken)({
                                sessionToken: serializedSession.token,
                                rememberMe: true,
                                authOptions: this.configService.authOptions,
                                req: req,
                                res: res,
                            });
                            _a.label = 4;
                        case 4: return [2 /*return*/, serializedSession];
                    }
                });
            });
        };
        return AuthGuard_1;
    }());
    __setFunctionName(_classThis, "AuthGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthGuard = _classThis;
}();
exports.AuthGuard = AuthGuard;
