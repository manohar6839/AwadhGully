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
exports.ExternalAuthenticationService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var administrator_entity_1 = require("../../../entity/administrator/administrator.entity");
var external_authentication_method_entity_1 = require("../../../entity/authentication-method/external-authentication-method.entity");
var customer_entity_1 = require("../../../entity/customer/customer.entity");
var user_entity_1 = require("../../../entity/user/user.entity");
/**
 * @description
 * This is a helper service which exposes methods related to looking up and creating Users based on an
 * external {@link AuthenticationStrategy}.
 *
 * @docsCategory auth
 */
var ExternalAuthenticationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExternalAuthenticationService = _classThis = /** @class */ (function () {
        function ExternalAuthenticationService_1(connection, roleService, historyService, customerService, administratorService, channelService) {
            this.connection = connection;
            this.roleService = roleService;
            this.historyService = historyService;
            this.customerService = customerService;
            this.administratorService = administratorService;
            this.channelService = channelService;
        }
        /**
         * @description
         * Looks up a User based on their identifier from an external authentication
         * provider, ensuring this User is associated with a Customer account.
         *
         * By default, only customers in the currently-active Channel will be checked.
         * By passing `false` as the `checkCurrentChannelOnly` argument, _all_ channels
         * will be checked.
         */
        ExternalAuthenticationService_1.prototype.findCustomerUser = function (ctx_1, strategy_1, externalIdentifier_1) {
            return __awaiter(this, arguments, void 0, function (ctx, strategy, externalIdentifier, checkCurrentChannelOnly) {
                var user, customer;
                if (checkCurrentChannelOnly === void 0) { checkCurrentChannelOnly = true; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findUser(ctx, strategy, externalIdentifier)];
                        case 1:
                            user = _a.sent();
                            if (!user) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.customerService.findOneByUserId(ctx, user.id, checkCurrentChannelOnly)];
                        case 2:
                            customer = _a.sent();
                            if (customer) {
                                return [2 /*return*/, user];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Looks up a User based on their identifier from an external authentication
         * provider, ensuring this User is associated with an Administrator account.
         */
        ExternalAuthenticationService_1.prototype.findAdministratorUser = function (ctx, strategy, externalIdentifier) {
            return __awaiter(this, void 0, void 0, function () {
                var user, administrator;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findUser(ctx, strategy, externalIdentifier)];
                        case 1:
                            user = _a.sent();
                            if (!user) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.administratorService.findOneByUserId(ctx, user.id)];
                        case 2:
                            administrator = _a.sent();
                            if (administrator) {
                                return [2 /*return*/, user];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * If a customer has been successfully authenticated by an external authentication provider, yet cannot
         * be found using `findCustomerUser`, then we need to create a new User and
         * Customer record in Vendure for that user. This method encapsulates that logic as well as additional
         * housekeeping such as adding a record to the Customer's history.
         */
        ExternalAuthenticationService_1.prototype.createCustomerAndUser = function (ctx, config) {
            return __awaiter(this, void 0, void 0, function () {
                var user, existingUser, customerRole, authMethod, savedUser, customer, existingCustomer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findExistingCustomerUserByEmailAddress(ctx, config.emailAddress)];
                        case 1:
                            existingUser = _a.sent();
                            if (!existingUser) return [3 /*break*/, 2];
                            user = existingUser;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.roleService.getCustomerRole(ctx)];
                        case 3:
                            customerRole = _a.sent();
                            user = new user_entity_1.User({
                                identifier: config.emailAddress,
                                roles: [customerRole],
                                verified: config.verified || false,
                                authenticationMethods: [],
                            });
                            _a.label = 4;
                        case 4: return [4 /*yield*/, this.connection.getRepository(ctx, external_authentication_method_entity_1.ExternalAuthenticationMethod).save(new external_authentication_method_entity_1.ExternalAuthenticationMethod({
                                externalIdentifier: config.externalIdentifier,
                                strategy: config.strategy,
                            }))];
                        case 5:
                            authMethod = _a.sent();
                            user.authenticationMethods = __spreadArray(__spreadArray([], (user.authenticationMethods || []), true), [authMethod], false);
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(user)];
                        case 6:
                            savedUser = _a.sent();
                            return [4 /*yield*/, this.customerService.findOneByUserId(ctx, savedUser.id)];
                        case 7:
                            existingCustomer = _a.sent();
                            if (existingCustomer) {
                                customer = existingCustomer;
                            }
                            else {
                                customer = new customer_entity_1.Customer({
                                    emailAddress: config.emailAddress,
                                    firstName: config.firstName,
                                    lastName: config.lastName,
                                    user: savedUser,
                                });
                            }
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(customer, ctx)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer)];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_REGISTERED,
                                    data: {
                                        strategy: config.strategy,
                                    },
                                })];
                        case 10:
                            _a.sent();
                            if (!config.verified) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_VERIFIED,
                                    data: {
                                        strategy: config.strategy,
                                    },
                                })];
                        case 11:
                            _a.sent();
                            _a.label = 12;
                        case 12: return [2 /*return*/, savedUser];
                    }
                });
            });
        };
        /**
         * @description
         * If an administrator has been successfully authenticated by an external authentication provider, yet cannot
         * be found using `findAdministratorUser`, then we need to create a new User and
         * Administrator record in Vendure for that user.
         */
        ExternalAuthenticationService_1.prototype.createAdministratorAndUser = function (ctx, config) {
            return __awaiter(this, void 0, void 0, function () {
                var newUser, authMethod, savedUser, administrator;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newUser = new user_entity_1.User({
                                identifier: config.identifier,
                                roles: config.roles,
                                verified: true,
                            });
                            return [4 /*yield*/, this.connection.getRepository(ctx, external_authentication_method_entity_1.ExternalAuthenticationMethod).save(new external_authentication_method_entity_1.ExternalAuthenticationMethod({
                                    externalIdentifier: config.externalIdentifier,
                                    strategy: config.strategy,
                                }))];
                        case 1:
                            authMethod = _a.sent();
                            newUser.authenticationMethods = [authMethod];
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(newUser)];
                        case 2:
                            savedUser = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, administrator_entity_1.Administrator).save(new administrator_entity_1.Administrator({
                                    emailAddress: config.emailAddress,
                                    firstName: config.firstName,
                                    lastName: config.lastName,
                                    user: savedUser,
                                }))];
                        case 3:
                            administrator = _a.sent();
                            return [2 /*return*/, savedUser];
                    }
                });
            });
        };
        ExternalAuthenticationService_1.prototype.findUser = function (ctx, strategy, externalIdentifier) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, user_entity_1.User)
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.authenticationMethods', 'aums')
                                .leftJoin('user.authenticationMethods', 'authMethod')
                                .andWhere('authMethod.externalIdentifier = :externalIdentifier', { externalIdentifier: externalIdentifier })
                                .andWhere('authMethod.strategy = :strategy', { strategy: strategy })
                                .andWhere('user.deletedAt IS NULL')
                                .getOne()];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, user || undefined];
                    }
                });
            });
        };
        ExternalAuthenticationService_1.prototype.findExistingCustomerUserByEmailAddress = function (ctx, emailAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, customer_entity_1.Customer)
                                .createQueryBuilder('customer')
                                .leftJoinAndSelect('customer.user', 'user')
                                .leftJoin('customer.channels', 'channel')
                                .leftJoinAndSelect('user.authenticationMethods', 'authMethod')
                                .andWhere('customer.emailAddress = :emailAddress', { emailAddress: emailAddress })
                                .andWhere('user.deletedAt IS NULL')
                                .getOne()];
                        case 1:
                            customer = _a.sent();
                            return [2 /*return*/, customer === null || customer === void 0 ? void 0 : customer.user];
                    }
                });
            });
        };
        /**
         * @description
         * Looks up a User based on their identifier from an external authentication
         * provider. Creates the user if does not exist. Unlike `findCustomerUser` and `findAdministratorUser`,
         * this method does not enforce that the User is associated with a Customer or
         * Administrator account.
         *
         */
        ExternalAuthenticationService_1.prototype.createUser = function (ctx, config) {
            return __awaiter(this, void 0, void 0, function () {
                var user, newUser, authMethod, savedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findUser(ctx, config.strategy, config.externalIdentifier)];
                        case 1:
                            user = _a.sent();
                            if (user) {
                                return [2 /*return*/, user];
                            }
                            newUser = new user_entity_1.User();
                            return [4 /*yield*/, this.connection.getRepository(ctx, external_authentication_method_entity_1.ExternalAuthenticationMethod).save(new external_authentication_method_entity_1.ExternalAuthenticationMethod({
                                    externalIdentifier: config.externalIdentifier,
                                    strategy: config.strategy,
                                }))];
                        case 2:
                            authMethod = _a.sent();
                            newUser.identifier = config.externalIdentifier;
                            newUser.authenticationMethods = [authMethod];
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(newUser)];
                        case 3:
                            savedUser = _a.sent();
                            return [2 /*return*/, savedUser];
                    }
                });
            });
        };
        return ExternalAuthenticationService_1;
    }());
    __setFunctionName(_classThis, "ExternalAuthenticationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExternalAuthenticationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExternalAuthenticationService = _classThis;
}();
exports.ExternalAuthenticationService = ExternalAuthenticationService;
