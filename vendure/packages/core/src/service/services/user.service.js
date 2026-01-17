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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var error_result_1 = require("../../common/error/error-result");
var errors_1 = require("../../common/error/errors");
var generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var native_authentication_method_entity_1 = require("../../entity/authentication-method/native-authentication-method.entity");
var user_entity_1 = require("../../entity/user/user.entity");
/**
 * @description
 * Contains methods relating to {@link User} entities.
 *
 * @docsCategory services
 */
var UserService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserService = _classThis = /** @class */ (function () {
        function UserService_1(connection, configService, roleService, passwordCipher, verificationTokenGenerator, moduleRef) {
            this.connection = connection;
            this.configService = configService;
            this.roleService = roleService;
            this.passwordCipher = passwordCipher;
            this.verificationTokenGenerator = verificationTokenGenerator;
            this.moduleRef = moduleRef;
        }
        UserService_1.prototype.getUserById = function (ctx, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .getRepository(ctx, user_entity_1.User)
                            .findOne({
                            where: { id: userId },
                            relations: {
                                roles: {
                                    channels: true,
                                },
                                authenticationMethods: true,
                            },
                        })
                            .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                });
            });
        };
        UserService_1.prototype.getUserByEmailAddress = function (ctx, emailAddress, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var entity, table, qb;
                var _a;
                return __generator(this, function (_b) {
                    entity = userType !== null && userType !== void 0 ? userType : (ctx.apiType === 'admin' ? 'administrator' : 'customer');
                    table = "".concat((_a = this.configService.dbConnectionOptions.entityPrefix) !== null && _a !== void 0 ? _a : '').concat(entity);
                    qb = this.connection
                        .getRepository(ctx, user_entity_1.User)
                        .createQueryBuilder('user')
                        .innerJoin(table, table, "".concat(table, ".userId = user.id"))
                        .leftJoinAndSelect('user.roles', 'roles')
                        .leftJoinAndSelect('roles.channels', 'channels')
                        .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethods')
                        .where('user.deletedAt IS NULL');
                    if ((0, utils_1.isEmailAddressLike)(emailAddress)) {
                        qb.andWhere('LOWER(user.identifier) = :identifier', {
                            identifier: (0, utils_1.normalizeEmailAddress)(emailAddress),
                        });
                    }
                    else {
                        qb.andWhere('user.identifier = :identifier', {
                            identifier: emailAddress,
                        });
                    }
                    return [2 /*return*/, qb.getOne().then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                });
            });
        };
        /**
         * @description
         * Creates a new User with the special `customer` Role and using the {@link NativeAuthenticationStrategy}.
         */
        UserService_1.prototype.createCustomerUser = function (ctx, identifier, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, customerRole, addNativeAuthResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = new user_entity_1.User();
                            user.identifier = (0, utils_1.normalizeEmailAddress)(identifier);
                            return [4 /*yield*/, this.roleService.getCustomerRole(ctx)];
                        case 1:
                            customerRole = _a.sent();
                            user.roles = [customerRole];
                            return [4 /*yield*/, this.addNativeAuthenticationMethod(ctx, user, identifier, password)];
                        case 2:
                            addNativeAuthResult = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(addNativeAuthResult)) {
                                return [2 /*return*/, addNativeAuthResult];
                            }
                            return [2 /*return*/, this.connection.getRepository(ctx, user_entity_1.User).save(addNativeAuthResult)];
                    }
                });
            });
        };
        /**
         * @description
         * Adds a new {@link NativeAuthenticationMethod} to the User. If the {@link AuthOptions} `requireVerification`
         * is set to `true` (as is the default), the User will be marked as unverified until the email verification
         * flow is completed.
         */
        UserService_1.prototype.addNativeAuthenticationMethod = function (ctx, user, identifier, password) {
            return __awaiter(this, void 0, void 0, function () {
                var checkUser, _a, authenticationMethod, _b, passwordValidationResult, _c;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = user.id != null;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getUserById(ctx, user.id)];
                        case 1:
                            _a = (_e.sent());
                            _e.label = 2;
                        case 2:
                            checkUser = _a;
                            if (checkUser) {
                                if (!!checkUser.authenticationMethods.find(function (m) { return m instanceof native_authentication_method_entity_1.NativeAuthenticationMethod; })) {
                                    // User already has a NativeAuthenticationMethod registered, so just return.
                                    return [2 /*return*/, user];
                                }
                            }
                            authenticationMethod = new native_authentication_method_entity_1.NativeAuthenticationMethod();
                            if (!this.configService.authOptions.requireVerification) return [3 /*break*/, 4];
                            _b = authenticationMethod;
                            return [4 /*yield*/, this.verificationTokenGenerator.generateVerificationToken(ctx)];
                        case 3:
                            _b.verificationToken =
                                _e.sent();
                            user.verified = false;
                            return [3 /*break*/, 5];
                        case 4:
                            user.verified = true;
                            _e.label = 5;
                        case 5:
                            if (!password) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.validatePassword(ctx, password)];
                        case 6:
                            passwordValidationResult = _e.sent();
                            if (passwordValidationResult !== true) {
                                return [2 /*return*/, passwordValidationResult];
                            }
                            _c = authenticationMethod;
                            return [4 /*yield*/, this.passwordCipher.hash(password)];
                        case 7:
                            _c.passwordHash = _e.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            authenticationMethod.passwordHash = '';
                            _e.label = 9;
                        case 9:
                            authenticationMethod.identifier = (0, utils_1.normalizeEmailAddress)(identifier);
                            authenticationMethod.user = user;
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(authenticationMethod)];
                        case 10:
                            _e.sent();
                            user.authenticationMethods = __spreadArray(__spreadArray([], ((_d = user.authenticationMethods) !== null && _d !== void 0 ? _d : []), true), [authenticationMethod], false);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new verified User using the {@link NativeAuthenticationStrategy}.
         */
        UserService_1.prototype.createAdminUser = function (ctx, identifier, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, authenticationMethod, _a, _b, _c;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            user = new user_entity_1.User({
                                identifier: (0, utils_1.normalizeEmailAddress)(identifier),
                                verified: true,
                            });
                            _b = (_a = this.connection
                                .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod))
                                .save;
                            _c = native_authentication_method_entity_1.NativeAuthenticationMethod.bind;
                            _d = {
                                identifier: (0, utils_1.normalizeEmailAddress)(identifier)
                            };
                            return [4 /*yield*/, this.passwordCipher.hash(password)];
                        case 1: return [4 /*yield*/, _b.apply(_a, [new (_c.apply(native_authentication_method_entity_1.NativeAuthenticationMethod, [void 0, (_d.passwordHash = _e.sent(),
                                        _d)]))()])];
                        case 2:
                            authenticationMethod = _e.sent();
                            user.authenticationMethods = [authenticationMethod];
                            return [2 /*return*/, this.connection.getRepository(ctx, user_entity_1.User).save(user)];
                    }
                });
            });
        };
        UserService_1.prototype.softDelete = function (ctx, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = this.moduleRef)
                                .get;
                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./session.service.js'); })];
                        case 1: 
                        // Dynamic import to avoid the circular dependency of SessionService
                        return [4 /*yield*/, _b.apply(_a, [(_c.sent()).SessionService])
                                .deleteSessionsByUser(ctx, new user_entity_1.User({ id: userId }))];
                        case 2:
                            // Dynamic import to avoid the circular dependency of SessionService
                            _c.sent();
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, user_entity_1.User, userId)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).update({ id: userId }, { deletedAt: new Date() })];
                        case 4:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the {@link NativeAuthenticationMethod} `verificationToken` as part of the User email verification
         * flow.
         */
        UserService_1.prototype.setVerificationToken = function (ctx, user) {
            return __awaiter(this, void 0, void 0, function () {
                var nativeAuthMethod, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.verificationTokenGenerator.generateVerificationToken(ctx)];
                        case 1:
                            _a.verificationToken =
                                _b.sent();
                            user.verified = false;
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, this.connection.getRepository(ctx, user_entity_1.User).save(user)];
                    }
                });
            });
        };
        /**
         * @description
         * Verifies a verificationToken by looking for a User which has previously had it set using the
         * `setVerificationToken()` method, and checks that the token is valid and has not expired.
         *
         * If valid, the User will be set to `verified: true`.
         */
        UserService_1.prototype.verifyUserByToken = function (ctx, verificationToken, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isTokenValid, nativeAuthMethod, passwordValidationResult, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, user_entity_1.User)
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.authenticationMethods', 'aums')
                                .leftJoin('user.authenticationMethods', 'authenticationMethod')
                                .addSelect('aums.passwordHash')
                                .where('authenticationMethod.verificationToken = :verificationToken', { verificationToken: verificationToken })
                                .getOne()];
                        case 1:
                            user = _b.sent();
                            if (!user) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.verificationTokenGenerator.verifyVerificationToken(ctx, verificationToken)];
                        case 2:
                            isTokenValid = _b.sent();
                            if (!isTokenValid) return [3 /*break*/, 8];
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            if (!!password) return [3 /*break*/, 3];
                            if (!nativeAuthMethod.passwordHash) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.MissingPasswordError()];
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            if (!!nativeAuthMethod.passwordHash) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.PasswordAlreadySetError()];
                            }
                            return [4 /*yield*/, this.validatePassword(ctx, password)];
                        case 4:
                            passwordValidationResult = _b.sent();
                            if (passwordValidationResult !== true) {
                                return [2 /*return*/, passwordValidationResult];
                            }
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.passwordCipher.hash(password)];
                        case 5:
                            _a.passwordHash = _b.sent();
                            _b.label = 6;
                        case 6:
                            nativeAuthMethod.verificationToken = null;
                            user.verified = true;
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod)];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, this.connection.getRepository(ctx, user_entity_1.User).save(user)];
                        case 8: return [2 /*return*/, new generated_graphql_shop_errors_1.VerificationTokenExpiredError()];
                        case 9: return [3 /*break*/, 11];
                        case 10: return [2 /*return*/, new generated_graphql_shop_errors_1.VerificationTokenInvalidError()];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the {@link NativeAuthenticationMethod} `passwordResetToken` as part of the User password reset
         * flow.
         */
        UserService_1.prototype.setPasswordResetToken = function (ctx, emailAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var user, nativeAuthMethod, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getUserByEmailAddress(ctx, emailAddress)];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                return [2 /*return*/];
                            }
                            nativeAuthMethod = user.getNativeAuthenticationMethod(false);
                            if (!nativeAuthMethod) {
                                return [2 /*return*/, undefined];
                            }
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.verificationTokenGenerator.generateVerificationToken(ctx)];
                        case 2:
                            _a.passwordResetToken =
                                _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @description
         * Verifies a passwordResetToken by looking for a User which has previously had it set using the
         * `setPasswordResetToken()` method, and checks that the token is valid and has not expired.
         *
         * If valid, the User's credentials will be updated with the new password.
         */
        UserService_1.prototype.resetPasswordByToken = function (ctx, passwordResetToken, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, passwordValidationResult, isTokenValid, nativeAuthMethod, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, user_entity_1.User)
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.authenticationMethods', 'aums')
                                .leftJoin('user.authenticationMethods', 'authenticationMethod')
                                .where('authenticationMethod.passwordResetToken = :passwordResetToken', { passwordResetToken: passwordResetToken })
                                .getOne()];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.PasswordResetTokenInvalidError()];
                            }
                            return [4 /*yield*/, this.validatePassword(ctx, password)];
                        case 2:
                            passwordValidationResult = _b.sent();
                            if (passwordValidationResult !== true) {
                                return [2 /*return*/, passwordValidationResult];
                            }
                            return [4 /*yield*/, this.verificationTokenGenerator.verifyVerificationToken(ctx, passwordResetToken)];
                        case 3:
                            isTokenValid = _b.sent();
                            if (!isTokenValid) return [3 /*break*/, 6];
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.passwordCipher.hash(password)];
                        case 4:
                            _a.passwordHash = _b.sent();
                            nativeAuthMethod.passwordResetToken = null;
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod)];
                        case 5:
                            _b.sent();
                            if (user.verified === false && this.configService.authOptions.requireVerification) {
                                // This code path represents an edge-case in which the Customer creates an account,
                                // but prior to verifying their email address, they start the password reset flow.
                                // Since the password reset flow makes the exact same guarantee as the email verification
                                // flow (i.e. the person controls the specified email account), we can also consider it
                                // a verification.
                                user.verified = true;
                            }
                            return [2 /*return*/, this.connection.getRepository(ctx, user_entity_1.User).save(user)];
                        case 6: return [2 /*return*/, new generated_graphql_shop_errors_1.PasswordResetTokenExpiredError()];
                    }
                });
            });
        };
        /**
         * @description
         * Changes the User identifier without an email verification step, so this should be only used when
         * an Administrator is setting a new email address.
         */
        UserService_1.prototype.changeUserAndNativeIdentifier = function (ctx, userId, newIdentifier) {
            return __awaiter(this, void 0, void 0, function () {
                var user, nativeAuthMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getUserById(ctx, userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/];
                            }
                            nativeAuthMethod = user.authenticationMethods.find(function (m) { return m instanceof native_authentication_method_entity_1.NativeAuthenticationMethod; });
                            if (!nativeAuthMethod) return [3 /*break*/, 3];
                            nativeAuthMethod.identifier = newIdentifier;
                            nativeAuthMethod.identifierChangeToken = null;
                            nativeAuthMethod.pendingIdentifier = null;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod)
                                    .save(nativeAuthMethod, { reload: false })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            user.identifier = newIdentifier;
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(user, { reload: false })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Sets the {@link NativeAuthenticationMethod} `identifierChangeToken` as part of the User email address change
         * flow.
         */
        UserService_1.prototype.setIdentifierChangeToken = function (ctx, user) {
            return __awaiter(this, void 0, void 0, function () {
                var nativeAuthMethod, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.verificationTokenGenerator.generateVerificationToken(ctx)];
                        case 1:
                            _a.identifierChangeToken =
                                _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @description
         * Changes the User identifier as part of the storefront flow used by Customers to set a
         * new email address, with the token previously set using the `setIdentifierChangeToken()` method.
         */
        UserService_1.prototype.changeIdentifierByToken = function (ctx, token) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isTokenValid, nativeAuthMethod, pendingIdentifier, oldIdentifier;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, user_entity_1.User)
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.authenticationMethods', 'aums')
                                .leftJoin('user.authenticationMethods', 'authenticationMethod')
                                .where('authenticationMethod.identifierChangeToken = :identifierChangeToken', {
                                identifierChangeToken: token,
                            })
                                .getOne()];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.IdentifierChangeTokenInvalidError()];
                            }
                            return [4 /*yield*/, this.verificationTokenGenerator.verifyVerificationToken(ctx, token)];
                        case 2:
                            isTokenValid = _a.sent();
                            if (!isTokenValid) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.IdentifierChangeTokenExpiredError()];
                            }
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            pendingIdentifier = nativeAuthMethod.pendingIdentifier;
                            if (!pendingIdentifier) {
                                throw new errors_1.InternalServerError('error.pending-identifier-missing');
                            }
                            oldIdentifier = user.identifier;
                            user.identifier = pendingIdentifier;
                            nativeAuthMethod.identifier = pendingIdentifier;
                            nativeAuthMethod.identifierChangeToken = null;
                            nativeAuthMethod.pendingIdentifier = null;
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod)
                                    .save(nativeAuthMethod, { reload: false })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(user, { reload: false })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, { user: user, oldIdentifier: oldIdentifier }];
                    }
                });
            });
        };
        /**
         * @description
         * Updates the password for a User with the {@link NativeAuthenticationMethod}.
         */
        UserService_1.prototype.updatePassword = function (ctx, userId, currentPassword, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var user, password, passwordValidationResult, nativeAuthMethod, matches, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, user_entity_1.User)
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethods')
                                .addSelect('authenticationMethods.passwordHash')
                                .where('user.id = :id', { id: userId })
                                .getOne()];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new errors_1.EntityNotFoundError('User', userId);
                            }
                            password = newPassword;
                            return [4 /*yield*/, this.validatePassword(ctx, password)];
                        case 2:
                            passwordValidationResult = _b.sent();
                            if (passwordValidationResult !== true) {
                                return [2 /*return*/, passwordValidationResult];
                            }
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            return [4 /*yield*/, this.passwordCipher.check(currentPassword, nativeAuthMethod.passwordHash)];
                        case 3:
                            matches = _b.sent();
                            if (!matches) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.InvalidCredentialsError({ authenticationError: '' })];
                            }
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.passwordCipher.hash(newPassword)];
                        case 4:
                            _a.passwordHash = _b.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod)
                                    .save(nativeAuthMethod, { reload: false })];
                        case 5:
                            _b.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        UserService_1.prototype.validatePassword = function (ctx, password) {
            return __awaiter(this, void 0, void 0, function () {
                var passwordValidationResult, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.configService.authOptions.passwordValidationStrategy.validate(ctx, password)];
                        case 1:
                            passwordValidationResult = _a.sent();
                            if (passwordValidationResult !== true) {
                                message = typeof passwordValidationResult === 'string'
                                    ? passwordValidationResult
                                    : 'Password is invalid';
                                return [2 /*return*/, new generated_graphql_shop_errors_1.PasswordValidationError({ validationErrorMessage: message })];
                            }
                            else {
                                return [2 /*return*/, true];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return UserService_1;
    }());
    __setFunctionName(_classThis, "UserService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserService = _classThis;
}();
exports.UserService = UserService;
