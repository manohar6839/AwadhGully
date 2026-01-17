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
exports.RequestContextService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var ms_1 = require("ms");
var get_api_type_1 = require("../../../api/common/get-api-type");
var request_context_1 = require("../../../api/common/request-context");
var errors_1 = require("../../../common/error/errors");
var utils_1 = require("../../../common/utils");
var channel_entity_1 = require("../../../entity/channel/channel.entity");
var get_user_channels_permissions_1 = require("../utils/get-user-channels-permissions");
/**
 * @description
 * Creates new {@link RequestContext} instances.
 *
 * @docsCategory request
 */
var RequestContextService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RequestContextService = _classThis = /** @class */ (function () {
        /** @internal */
        function RequestContextService_1(channelService, configService) {
            this.channelService = channelService;
            this.configService = configService;
        }
        /**
         * @description
         * Creates a RequestContext based on the config provided. This can be useful when interacting
         * with services outside the request-response cycle, for example in stand-alone scripts or in
         * worker jobs.
         *
         * @since 1.5.0
         */
        RequestContextService_1.prototype.create = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var req, apiType, channelOrToken, languageCode, currencyCode, user, activeOrderId, channel, session, channelPermissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            req = config.req, apiType = config.apiType, channelOrToken = config.channelOrToken, languageCode = config.languageCode, currencyCode = config.currencyCode, user = config.user, activeOrderId = config.activeOrderId;
                            if (!(channelOrToken instanceof channel_entity_1.Channel)) return [3 /*break*/, 1];
                            channel = channelOrToken;
                            return [3 /*break*/, 5];
                        case 1:
                            if (!(typeof channelOrToken === 'string')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.channelService.getChannelFromToken(channelOrToken)];
                        case 2:
                            channel = _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.channelService.getDefaultChannel()];
                        case 4:
                            channel = _a.sent();
                            _a.label = 5;
                        case 5:
                            if (user) {
                                channelPermissions = user.roles ? (0, get_user_channels_permissions_1.getUserChannelsPermissions)(user) : [];
                                session = {
                                    user: {
                                        id: user.id,
                                        identifier: user.identifier,
                                        verified: user.verified,
                                        channelPermissions: channelPermissions,
                                    },
                                    id: '__dummy_session_id__',
                                    token: '__dummy_session_token__',
                                    expires: new Date(Date.now() + (0, ms_1.default)('1y')),
                                    cacheExpiry: (0, ms_1.default)('1y'),
                                    activeOrderId: activeOrderId,
                                };
                            }
                            return [2 /*return*/, new request_context_1.RequestContext({
                                    req: req,
                                    apiType: apiType,
                                    channel: channel,
                                    languageCode: languageCode,
                                    currencyCode: currencyCode,
                                    session: session,
                                    isAuthorized: true,
                                    authorizedAsOwnerOnly: false,
                                })];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new RequestContext based on an Express request object. This is used internally
         * in the API layer by the AuthGuard, and creates the RequestContext which is then passed
         * to all resolvers & controllers.
         */
        RequestContextService_1.prototype.fromRequest = function (req, info, requiredPermissions, session) {
            return __awaiter(this, void 0, void 0, function () {
                var channelToken, channel, apiType, hasOwnerPermission, languageCode, currencyCode, user, isAuthorized, authorizedAsOwnerOnly, translationFn;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            channelToken = this.getChannelToken(req);
                            return [4 /*yield*/, this.channelService.getChannelFromToken(channelToken)];
                        case 1:
                            channel = _a.sent();
                            apiType = (0, get_api_type_1.getApiType)(info);
                            hasOwnerPermission = !!requiredPermissions && requiredPermissions.includes(generated_types_1.Permission.Owner);
                            languageCode = this.getLanguageCode(req, channel);
                            currencyCode = this.getCurrencyCode(req, channel);
                            user = session && session.user;
                            isAuthorized = this.userHasRequiredPermissionsOnChannel(requiredPermissions, channel, user);
                            authorizedAsOwnerOnly = !isAuthorized && hasOwnerPermission;
                            translationFn = req.t;
                            return [2 /*return*/, new request_context_1.RequestContext({
                                    req: req,
                                    apiType: apiType,
                                    channel: channel,
                                    languageCode: languageCode,
                                    currencyCode: currencyCode,
                                    session: session,
                                    isAuthorized: isAuthorized,
                                    authorizedAsOwnerOnly: authorizedAsOwnerOnly,
                                    translationFn: translationFn,
                                })];
                    }
                });
            });
        };
        RequestContextService_1.prototype.getChannelToken = function (req) {
            var tokenKey = this.configService.apiOptions.channelTokenKey;
            var channelToken = '';
            if (req && req.query && req.query[tokenKey]) {
                channelToken = req.query[tokenKey];
            }
            else if (req && req.headers && req.headers[tokenKey]) {
                channelToken = req.headers[tokenKey];
            }
            return channelToken;
        };
        RequestContextService_1.prototype.getLanguageCode = function (req, channel) {
            var _a, _b;
            return ((_b = (_a = (req.query && req.query.languageCode)) !== null && _a !== void 0 ? _a : channel.defaultLanguageCode) !== null && _b !== void 0 ? _b : this.configService.defaultLanguageCode);
        };
        RequestContextService_1.prototype.getCurrencyCode = function (req, channel) {
            var queryCurrencyCode = req.query && req.query.currencyCode;
            if (queryCurrencyCode && !channel.availableCurrencyCodes.includes(queryCurrencyCode)) {
                throw new errors_1.UserInputError('error.currency-not-available-in-channel', {
                    currencyCode: queryCurrencyCode,
                });
            }
            return queryCurrencyCode !== null && queryCurrencyCode !== void 0 ? queryCurrencyCode : channel.defaultCurrencyCode;
        };
        /**
         * TODO: Deprecate and remove, since this function is now handled internally in the RequestContext.
         * @private
         */
        RequestContextService_1.prototype.userHasRequiredPermissionsOnChannel = function (permissions, channel, user) {
            if (permissions === void 0) { permissions = []; }
            if (!user || !channel) {
                return false;
            }
            var permissionsOnChannel = user.channelPermissions.find(function (c) { return (0, utils_1.idsAreEqual)(c.id, channel.id); });
            if (permissionsOnChannel) {
                return this.arraysIntersect(permissionsOnChannel.permissions, permissions);
            }
            return false;
        };
        /**
         * Returns true if any element of arr1 appears in arr2.
         */
        RequestContextService_1.prototype.arraysIntersect = function (arr1, arr2) {
            return arr1.reduce(function (intersects, role) {
                return intersects || arr2.includes(role);
            }, false);
        };
        return RequestContextService_1;
    }());
    __setFunctionName(_classThis, "RequestContextService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RequestContextService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RequestContextService = _classThis;
}();
exports.RequestContextService = RequestContextService;
