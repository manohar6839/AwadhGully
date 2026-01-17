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
exports.SessionService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var ms_1 = require("ms");
var typeorm_1 = require("typeorm");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var config_1 = require("../../config");
var channel_entity_1 = require("../../entity/channel/channel.entity");
var role_entity_1 = require("../../entity/role/role.entity");
var anonymous_session_entity_1 = require("../../entity/session/anonymous-session.entity");
var authenticated_session_entity_1 = require("../../entity/session/authenticated-session.entity");
var session_entity_1 = require("../../entity/session/session.entity");
var get_user_channels_permissions_1 = require("../helpers/utils/get-user-channels-permissions");
/**
 * @description
 * Contains methods relating to {@link Session} entities.
 *
 * @docsCategory services
 */
var SessionService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SessionService = _classThis = /** @class */ (function () {
        function SessionService_1(connection, configService, orderService, jobQueueService, requestContextService) {
            this.connection = connection;
            this.configService = configService;
            this.orderService = orderService;
            this.jobQueueService = jobQueueService;
            this.requestContextService = requestContextService;
            this.sessionCacheTimeoutMs = 50;
            this.sessionCacheStrategy = this.configService.authOptions.sessionCacheStrategy;
            var sessionDuration = this.configService.authOptions.sessionDuration;
            this.sessionDurationInMs =
                typeof sessionDuration === 'string' ? (0, ms_1.default)(sessionDuration) : sessionDuration;
            // This allows us to register this class as a TypeORM Subscriber while also allowing
            // the injection on dependencies. See https://docs.nestjs.com/techniques/database#subscribers
            this.connection.rawConnection.subscribers.push(this);
        }
        SessionService_1.prototype.onApplicationBootstrap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.jobQueueService.createQueue({
                                    name: 'clean-sessions',
                                    process: function (job) { return __awaiter(_this, void 0, void 0, function () {
                                        var ctx, result;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.requestContextService.create({
                                                        apiType: 'admin',
                                                    })];
                                                case 1:
                                                    ctx = _a.sent();
                                                    return [4 /*yield*/, this.cleanExpiredSessions(ctx, job.data.batchSize)];
                                                case 2:
                                                    result = _a.sent();
                                                    return [2 /*return*/, {
                                                            batchSize: job.data.batchSize,
                                                            sessionsRemoved: result,
                                                        }];
                                            }
                                        });
                                    }); },
                                })];
                        case 1:
                            _a.cleanSessionsJobQueue = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** @internal */
        SessionService_1.prototype.afterInsert = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.clearSessionCacheOnDataChange(event)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** @internal */
        SessionService_1.prototype.afterRemove = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.clearSessionCacheOnDataChange(event)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** @internal */
        SessionService_1.prototype.afterUpdate = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.clearSessionCacheOnDataChange(event)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        SessionService_1.prototype.clearSessionCacheOnDataChange = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!event.entity) return [3 /*break*/, 2];
                            if (!(event.entity instanceof channel_entity_1.Channel || event.entity instanceof role_entity_1.Role)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.clear())];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new {@link AuthenticatedSession}. To be used after successful authentication.
         */
        SessionService_1.prototype.createNewAuthenticatedSession = function (ctx, user, authenticationStrategyName) {
            return __awaiter(this, void 0, void 0, function () {
                var token, guestOrder, _a, existingOrder, activeOrder, authenticatedSession;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.generateSessionToken()];
                        case 1:
                            token = _b.sent();
                            if (!(ctx.session && ctx.session.activeOrderId)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.orderService.findOne(ctx, ctx.session.activeOrderId)];
                        case 2:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = undefined;
                            _b.label = 4;
                        case 4:
                            guestOrder = _a;
                            return [4 /*yield*/, this.orderService.getActiveOrderForUser(ctx, user.id)];
                        case 5:
                            existingOrder = _b.sent();
                            return [4 /*yield*/, this.orderService.mergeOrders(ctx, user, guestOrder, existingOrder)];
                        case 6:
                            activeOrder = _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, authenticated_session_entity_1.AuthenticatedSession).save(new authenticated_session_entity_1.AuthenticatedSession({
                                    token: token,
                                    user: user,
                                    activeOrder: activeOrder,
                                    authenticationStrategy: authenticationStrategyName,
                                    expires: this.getExpiryDate(this.sessionDurationInMs),
                                    invalidated: false,
                                }))];
                        case 7:
                            authenticatedSession = _b.sent();
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.set(this.serializeSession(authenticatedSession)))];
                        case 8:
                            _b.sent();
                            return [2 /*return*/, authenticatedSession];
                    }
                });
            });
        };
        /**
         * @description
         * Create an {@link AnonymousSession} and caches it using the configured {@link SessionCacheStrategy},
         * and returns the cached session object.
         */
        SessionService_1.prototype.createAnonymousSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, session, newSession, serializedSession;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateSessionToken()];
                        case 1:
                            token = _a.sent();
                            session = new anonymous_session_entity_1.AnonymousSession({
                                token: token,
                                expires: this.getExpiryDate(this.sessionDurationInMs),
                                invalidated: false,
                            });
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(anonymous_session_entity_1.AnonymousSession).save(session)];
                        case 2:
                            newSession = _a.sent();
                            serializedSession = this.serializeSession(newSession);
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.set(serializedSession))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, serializedSession];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the cached session object matching the given session token.
         */
        SessionService_1.prototype.getSessionFromToken = function (sessionToken) {
            return __awaiter(this, void 0, void 0, function () {
                var serializedSession, stale, expired, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.get(sessionToken))];
                        case 1:
                            serializedSession = _a.sent();
                            stale = !!(serializedSession && serializedSession.cacheExpiry < new Date().getTime() / 1000);
                            expired = !!(serializedSession && serializedSession.expires < new Date());
                            if (!(!serializedSession || stale || expired)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.findSessionByToken(sessionToken)];
                        case 2:
                            session = _a.sent();
                            if (!session) return [3 /*break*/, 4];
                            serializedSession = this.serializeSession(session);
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.set(serializedSession))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, serializedSession];
                        case 4: return [2 /*return*/];
                        case 5: return [2 /*return*/, serializedSession];
                    }
                });
            });
        };
        /**
         * @description
         * Serializes a {@link Session} instance into a simplified plain object suitable for caching.
         */
        SessionService_1.prototype.serializeSession = function (session) {
            var sessionCacheTTL = this.configService.authOptions.sessionCacheTTL;
            var sessionCacheTTLSeconds = typeof sessionCacheTTL === 'string' ? (0, ms_1.default)(sessionCacheTTL) / 1000 : sessionCacheTTL;
            var expiry = new Date().getTime() / 1000 + sessionCacheTTLSeconds;
            var serializedSession = {
                cacheExpiry: expiry,
                id: session.id,
                token: session.token,
                expires: session.expires,
                activeOrderId: session.activeOrderId,
                activeChannelId: session.activeChannelId,
            };
            if (this.isAuthenticatedSession(session)) {
                serializedSession.authenticationStrategy = session.authenticationStrategy;
                var user = session.user;
                serializedSession.user = {
                    id: user.id,
                    identifier: user.identifier,
                    verified: user.verified,
                    channelPermissions: (0, get_user_channels_permissions_1.getUserChannelsPermissions)(user),
                };
            }
            return serializedSession;
        };
        /**
         * If the session cache is taking longer than say 50ms then something is wrong - it is supposed to
         * be very fast after all! So we will return undefined and let the request continue without a cached session.
         */
        SessionService_1.prototype.withTimeout = function (maybeSlow) {
            var _this = this;
            return Promise.race([
                new Promise(function (resolve) {
                    return setTimeout(function () { return resolve(undefined); }, _this.sessionCacheTimeoutMs);
                }),
                maybeSlow,
            ]);
        };
        /**
         * Looks for a valid session with the given token and returns one if found.
         */
        SessionService_1.prototype.findSessionByToken = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.rawConnection
                                .getRepository(session_entity_1.Session)
                                .createQueryBuilder('session')
                                .leftJoinAndSelect('session.user', 'user')
                                .leftJoinAndSelect('user.roles', 'roles')
                                .leftJoinAndSelect('roles.channels', 'channels')
                                .where('session.token = :token', { token: token })
                                .andWhere('session.invalidated = false')
                                .getOne()];
                        case 1:
                            session = _a.sent();
                            if (!(session && session.expires > new Date())) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.updateSessionExpiry(session)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, session];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the `activeOrder` on the given cached session object and updates the cache.
         */
        SessionService_1.prototype.setActiveOrder = function (ctx, serializedSession, order) {
            return __awaiter(this, void 0, void 0, function () {
                var session, updatedSerializedSession;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).findOne({
                                where: { id: serializedSession.id },
                                relations: ['user', 'user.roles', 'user.roles.channels'],
                            })];
                        case 1:
                            session = _a.sent();
                            if (!session) return [3 /*break*/, 4];
                            session.activeOrder = order;
                            return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).save(session, { reload: false })];
                        case 2:
                            _a.sent();
                            updatedSerializedSession = this.serializeSession(session);
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.set(updatedSerializedSession))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updatedSerializedSession];
                        case 4: return [2 /*return*/, serializedSession];
                    }
                });
            });
        };
        /**
         * @description
         * Clears the `activeOrder` on the given cached session object and updates the cache.
         */
        SessionService_1.prototype.unsetActiveOrder = function (ctx, serializedSession) {
            return __awaiter(this, void 0, void 0, function () {
                var session, updatedSerializedSession;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!serializedSession.activeOrderId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).findOne({
                                    where: { id: serializedSession.id },
                                    relations: ['user', 'user.roles', 'user.roles.channels'],
                                })];
                        case 1:
                            session = _a.sent();
                            if (!session) return [3 /*break*/, 4];
                            session.activeOrder = null;
                            return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).save(session)];
                        case 2:
                            _a.sent();
                            updatedSerializedSession = this.serializeSession(session);
                            return [4 /*yield*/, this.configService.authOptions.sessionCacheStrategy.set(updatedSerializedSession)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updatedSerializedSession];
                        case 4: return [2 /*return*/, serializedSession];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the `activeChannel` on the given cached session object and updates the cache.
         */
        SessionService_1.prototype.setActiveChannel = function (serializedSession, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var session, updatedSerializedSession;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.rawConnection.getRepository(session_entity_1.Session).findOne({
                                where: { id: serializedSession.id },
                                relations: ['user', 'user.roles', 'user.roles.channels'],
                            })];
                        case 1:
                            session = _a.sent();
                            if (!session) return [3 /*break*/, 4];
                            session.activeChannel = channel;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(session_entity_1.Session).save(session, { reload: false })];
                        case 2:
                            _a.sent();
                            updatedSerializedSession = this.serializeSession(session);
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.set(updatedSerializedSession))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updatedSerializedSession];
                        case 4: return [2 /*return*/, serializedSession];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes all existing sessions for the given user.
         */
        SessionService_1.prototype.deleteSessionsByUser = function (ctx, user) {
            return __awaiter(this, void 0, void 0, function () {
                var userSessions, _i, userSessions_1, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, authenticated_session_entity_1.AuthenticatedSession)
                                .find({ where: { user: { id: user.id } } })];
                        case 1:
                            userSessions = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, authenticated_session_entity_1.AuthenticatedSession).remove(userSessions)];
                        case 2:
                            _a.sent();
                            _i = 0, userSessions_1 = userSessions;
                            _a.label = 3;
                        case 3:
                            if (!(_i < userSessions_1.length)) return [3 /*break*/, 6];
                            session = userSessions_1[_i];
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.delete(session.token))];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes all existing sessions with the given activeOrder.
         */
        SessionService_1.prototype.deleteSessionsByActiveOrderId = function (ctx, activeOrderId) {
            return __awaiter(this, void 0, void 0, function () {
                var sessions, _i, sessions_1, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).find({ where: { activeOrderId: activeOrderId } })];
                        case 1:
                            sessions = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).remove(sessions)];
                        case 2:
                            _a.sent();
                            _i = 0, sessions_1 = sessions;
                            _a.label = 3;
                        case 3:
                            if (!(_i < sessions_1.length)) return [3 /*break*/, 6];
                            session = sessions_1[_i];
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.delete(session.token))];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Triggers the clean sessions job.
         */
        SessionService_1.prototype.triggerCleanSessionsJob = function (batchSize) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.cleanSessionsJobQueue.add({ batchSize: batchSize })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Cleans expired sessions from the database & the session cache.
         */
        SessionService_1.prototype.cleanExpiredSessions = function (ctx, batchSize) {
            return __awaiter(this, void 0, void 0, function () {
                var sessions, _i, sessions_2, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, session_entity_1.Session)
                                .createQueryBuilder('session')
                                .where('session.expires < :now', { now: new Date() })
                                .orWhere(new typeorm_1.Brackets(function (qb1) {
                                qb1.where('session.userId IS NULL')
                                    .andWhere('session.activeOrderId IS NULL')
                                    .andWhere('session.updatedAt < :updatedAt', {
                                    updatedAt: new Date(Date.now() - (0, ms_1.default)('7d')),
                                });
                            }))
                                .take(batchSize)
                                .getMany()];
                        case 1:
                            sessions = _a.sent();
                            config_1.Logger.verbose("Cleaning ".concat(sessions.length, " expired sessions"));
                            return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).remove(sessions)];
                        case 2:
                            _a.sent();
                            _i = 0, sessions_2 = sessions;
                            _a.label = 3;
                        case 3:
                            if (!(_i < sessions_2.length)) return [3 /*break*/, 6];
                            session = sessions_2[_i];
                            return [4 /*yield*/, this.withTimeout(this.sessionCacheStrategy.delete(session.token))];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            config_1.Logger.verbose("Cleaned ".concat(sessions.length, " expired sessions"));
                            return [2 /*return*/, sessions.length];
                    }
                });
            });
        };
        /**
         * If we are over half way to the current session's expiry date, then we update it.
         *
         * This ensures that the session will not expire when in active use, but prevents us from
         * needing to run an update query on *every* request.
         */
        SessionService_1.prototype.updateSessionExpiry = function (session) {
            return __awaiter(this, void 0, void 0, function () {
                var now, newExpiryDate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date().getTime();
                            if (!(session.expires.getTime() - now < this.sessionDurationInMs / 2)) return [3 /*break*/, 2];
                            newExpiryDate = this.getExpiryDate(this.sessionDurationInMs);
                            session.expires = newExpiryDate;
                            return [4 /*yield*/, this.connection.rawConnection
                                    .getRepository(session_entity_1.Session)
                                    .update({ id: session.id }, { expires: newExpiryDate })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns a future expiry date according timeToExpireInMs in the future.
         */
        SessionService_1.prototype.getExpiryDate = function (timeToExpireInMs) {
            return new Date(Date.now() + timeToExpireInMs);
        };
        /**
         * Generates a random session token.
         */
        SessionService_1.prototype.generateSessionToken = function () {
            return new Promise(function (resolve, reject) {
                crypto_1.default.randomBytes(32, function (err, buf) {
                    if (err) {
                        reject(err);
                    }
                    resolve(buf.toString('hex'));
                });
            });
        };
        SessionService_1.prototype.isAuthenticatedSession = function (session) {
            return session.hasOwnProperty('user') && !!session.user;
        };
        return SessionService_1;
    }());
    __setFunctionName(_classThis, "SessionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SessionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessionService = _classThis;
}();
exports.SessionService = SessionService;
