"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.CustomerService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var error_result_1 = require("../../common/error/error-result");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var native_authentication_strategy_1 = require("../../config/auth/native-authentication-strategy");
var address_entity_1 = require("../../entity/address/address.entity");
var native_authentication_method_entity_1 = require("../../entity/authentication-method/native-authentication-method.entity");
var channel_entity_1 = require("../../entity/channel/channel.entity");
var customer_entity_1 = require("../../entity/customer/customer.entity");
var user_entity_1 = require("../../entity/user/user.entity");
var account_registration_event_1 = require("../../event-bus/events/account-registration-event");
var account_verified_event_1 = require("../../event-bus/events/account-verified-event");
var customer_address_event_1 = require("../../event-bus/events/customer-address-event");
var customer_event_1 = require("../../event-bus/events/customer-event");
var identifier_change_event_1 = require("../../event-bus/events/identifier-change-event");
var identifier_change_request_event_1 = require("../../event-bus/events/identifier-change-request-event");
var password_reset_event_1 = require("../../event-bus/events/password-reset-event");
var password_reset_verified_event_1 = require("../../event-bus/events/password-reset-verified-event");
var address_to_line_1 = require("../helpers/utils/address-to-line");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link Customer} entities.
 *
 * @docsCategory services
 */
var CustomerService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomerService = _classThis = /** @class */ (function () {
        function CustomerService_1(connection, configService, userService, countryService, listQueryBuilder, eventBus, historyService, channelService, customFieldRelationService, translator) {
            this.connection = connection;
            this.configService = configService;
            this.userService = userService;
            this.countryService = countryService;
            this.listQueryBuilder = listQueryBuilder;
            this.eventBus = eventBus;
            this.historyService = historyService;
            this.channelService = channelService;
            this.customFieldRelationService = customFieldRelationService;
            this.translator = translator;
        }
        CustomerService_1.prototype.findAll = function (ctx, options, relations) {
            if (relations === void 0) { relations = []; }
            var customPropertyMap = {};
            var hasPostalCodeFilter = this.listQueryBuilder.filterObjectHasProperty(options === null || options === void 0 ? void 0 : options.filter, 'postalCode');
            if (hasPostalCodeFilter) {
                relations.push('addresses');
                customPropertyMap.postalCode = 'addresses.postalCode';
            }
            return this.listQueryBuilder
                .build(customer_entity_1.Customer, options, {
                relations: relations,
                channelId: ctx.channelId,
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                ctx: ctx,
                customPropertyMap: customPropertyMap,
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({ items: items, totalItems: totalItems });
            });
        };
        CustomerService_1.prototype.findOne = function (ctx, id, relations) {
            if (relations === void 0) { relations = []; }
            return this.connection
                .findOneInChannel(ctx, customer_entity_1.Customer, id, ctx.channelId, {
                relations: relations,
                where: { deletedAt: (0, typeorm_1.IsNull)() },
            })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        /**
         * @description
         * Returns the Customer entity associated with the given userId, if one exists.
         * Setting `filterOnChannel` to `true` will limit the results to Customers which are assigned
         * to the current active Channel only.
         */
        CustomerService_1.prototype.findOneByUserId = function (ctx, userId, filterOnChannel) {
            if (filterOnChannel === void 0) { filterOnChannel = true; }
            var query = this.connection
                .getRepository(ctx, customer_entity_1.Customer)
                .createQueryBuilder('customer')
                .leftJoin('customer.channels', 'channel')
                .leftJoinAndSelect('customer.user', 'user')
                .where('user.id = :userId', { userId: userId })
                .andWhere('customer.deletedAt is null');
            if (filterOnChannel) {
                query = query.andWhere('channel.id = :channelId', { channelId: ctx.channelId });
            }
            return query.getOne().then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        /**
         * @description
         * Returns all {@link Address} entities associated with the specified Customer.
         */
        CustomerService_1.prototype.findAddressesByCustomerId = function (ctx, customerId) {
            var _this = this;
            return this.connection
                .getRepository(ctx, address_entity_1.Address)
                .createQueryBuilder('address')
                .leftJoinAndSelect('address.country', 'country')
                .leftJoinAndSelect('country.translations', 'countryTranslation')
                .where('address.customer = :id', { id: customerId })
                .getMany()
                .then(function (addresses) {
                addresses.forEach(function (address) {
                    address.country = _this.translator.translate(address.country, ctx);
                });
                return addresses;
            });
        };
        /**
         * @description
         * Returns a list of all {@link CustomerGroup} entities.
         */
        CustomerService_1.prototype.getCustomerGroups = function (ctx, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var customerWithGroups;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.findOneInChannel(ctx, customer_entity_1.Customer, customerId, ctx === null || ctx === void 0 ? void 0 : ctx.channelId, {
                                relations: ['groups'],
                                where: {
                                    deletedAt: (0, typeorm_1.IsNull)(),
                                },
                            })];
                        case 1:
                            customerWithGroups = _a.sent();
                            if (customerWithGroups) {
                                return [2 /*return*/, customerWithGroups.groups];
                            }
                            else {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new Customer, including creation of a new User with the special `customer` Role.
         *
         * If the `password` argument is specified, the Customer will be immediately verified. If not,
         * then an {@link AccountRegistrationEvent} is published, so that the customer can have their
         * email address verified and set their password in a later step using the `verifyCustomerEmailAddress()`
         * method.
         *
         * This method is intended to be used in admin-created Customer flows.
         */
        CustomerService_1.prototype.create = function (ctx, input, password) {
            return __awaiter(this, void 0, void 0, function () {
                var customer, existingCustomerInChannel, existingCustomer, existingUser, updatedCustomer, customerUser, verificationToken, result, createdCustomer;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            input.emailAddress = (0, utils_1.normalizeEmailAddress)(input.emailAddress);
                            customer = new customer_entity_1.Customer(input);
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, customer_entity_1.Customer)
                                    .createQueryBuilder('customer')
                                    .leftJoin('customer.channels', 'channel')
                                    .where('channel.id = :channelId', { channelId: ctx.channelId })
                                    .andWhere('customer.emailAddress = :emailAddress', { emailAddress: input.emailAddress })
                                    .andWhere('customer.deletedAt is null')
                                    .getOne()];
                        case 1:
                            existingCustomerInChannel = _b.sent();
                            if (existingCustomerInChannel) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.EmailAddressConflictError()];
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).findOne({
                                    relations: ['channels'],
                                    where: {
                                        emailAddress: input.emailAddress,
                                        deletedAt: (0, typeorm_1.IsNull)(),
                                    },
                                })];
                        case 2:
                            existingCustomer = _b.sent();
                            return [4 /*yield*/, this.userService.getUserByEmailAddress(ctx, input.emailAddress, 'customer')];
                        case 3:
                            existingUser = _b.sent();
                            if (existingCustomer && existingUser) {
                                updatedCustomer = (0, patch_entity_1.patchEntity)(existingCustomer, input);
                                updatedCustomer.channels.push(ctx.channel);
                                return [2 /*return*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(updatedCustomer)];
                            }
                            else if (existingCustomer || existingUser) {
                                // Not sure when this situation would occur
                                return [2 /*return*/, new generated_graphql_admin_errors_1.EmailAddressConflictError()];
                            }
                            return [4 /*yield*/, this.userService.createCustomerUser(ctx, input.emailAddress, password)];
                        case 4:
                            customerUser = _b.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(customerUser)) {
                                throw customerUser;
                            }
                            customer.user = customerUser;
                            if (!(password && password !== '')) return [3 /*break*/, 6];
                            verificationToken = customer.user.getNativeAuthenticationMethod().verificationToken;
                            if (!verificationToken) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.userService.verifyUserByToken(ctx, verificationToken)];
                        case 5:
                            result = _b.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                // In theory this should never be reached, so we will just
                                // throw the result
                                throw result;
                            }
                            else {
                                customer.user = result;
                            }
                            _b.label = 6;
                        case 6: return [4 /*yield*/, this.eventBus.publish(new account_registration_event_1.AccountRegistrationEvent(ctx, customer.user))];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(customer, ctx)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer)];
                        case 9:
                            createdCustomer = _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, customer_entity_1.Customer, input, createdCustomer)];
                        case 10:
                            _b.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    ctx: ctx,
                                    customerId: createdCustomer.id,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_REGISTERED,
                                    data: {
                                        strategy: native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME,
                                    },
                                })];
                        case 11:
                            _b.sent();
                            if (!((_a = customer.user) === null || _a === void 0 ? void 0 : _a.verified)) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    ctx: ctx,
                                    customerId: createdCustomer.id,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_VERIFIED,
                                    data: {
                                        strategy: native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME,
                                    },
                                })];
                        case 12:
                            _b.sent();
                            _b.label = 13;
                        case 13: return [4 /*yield*/, this.eventBus.publish(new customer_event_1.CustomerEvent(ctx, createdCustomer, 'created', input))];
                        case 14:
                            _b.sent();
                            return [2 /*return*/, createdCustomer];
                    }
                });
            });
        };
        CustomerService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasEmailAddress, customer, existingCustomerInChannel, existingUserWithEmailAddress, updatedCustomer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hasEmailAddress = function (i) {
                                return Object.hasOwnProperty.call(i, 'emailAddress');
                            };
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_entity_1.Customer, input.id, {
                                    channelId: ctx.channelId,
                                })];
                        case 1:
                            customer = _a.sent();
                            if (!hasEmailAddress(input)) return [3 /*break*/, 5];
                            input.emailAddress = (0, utils_1.normalizeEmailAddress)(input.emailAddress);
                            if (!(input.emailAddress !== customer.emailAddress)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, customer_entity_1.Customer)
                                    .createQueryBuilder('customer')
                                    .leftJoin('customer.channels', 'channel')
                                    .where('channel.id = :channelId', { channelId: ctx.channelId })
                                    .andWhere('customer.emailAddress = :emailAddress', {
                                    emailAddress: input.emailAddress,
                                })
                                    .andWhere('customer.id != :customerId', { customerId: input.id })
                                    .andWhere('customer.deletedAt is null')
                                    .getOne()];
                        case 2:
                            existingCustomerInChannel = _a.sent();
                            if (existingCustomerInChannel) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.EmailAddressConflictError()];
                            }
                            if (!customer.user) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.userService.getUserByEmailAddress(ctx, input.emailAddress, 'customer')];
                        case 3:
                            existingUserWithEmailAddress = _a.sent();
                            if (existingUserWithEmailAddress &&
                                !(0, utils_1.idsAreEqual)(customer.user.id, existingUserWithEmailAddress.id)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.EmailAddressConflictError()];
                            }
                            return [4 /*yield*/, this.userService.changeUserAndNativeIdentifier(ctx, customer.user.id, input.emailAddress)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            updatedCustomer = (0, patch_entity_1.patchEntity)(customer, input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(updatedCustomer, { reload: false })];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, customer_entity_1.Customer, input, updatedCustomer)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_DETAIL_UPDATED,
                                    data: {
                                        input: input,
                                    },
                                })];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_event_1.CustomerEvent(ctx, customer, 'updated', input))];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, customer.id))];
                    }
                });
            });
        };
        /**
         * @description
         * Registers a new Customer account with the {@link NativeAuthenticationStrategy} and starts
         * the email verification flow (unless {@link AuthOptions} `requireVerification` is set to `false`)
         * by publishing an {@link AccountRegistrationEvent}.
         *
         * This method is intended to be used in storefront Customer-creation flows.
         */
        CustomerService_1.prototype.registerCustomerAccount = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var user, hasNativeAuthMethod, customFields, customer, customerUser, addAuthenticationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.configService.authOptions.requireVerification) {
                                if (!input.password) {
                                    return [2 /*return*/, new generated_graphql_shop_errors_1.MissingPasswordError()];
                                }
                            }
                            return [4 /*yield*/, this.userService.getUserByEmailAddress(ctx, input.emailAddress)];
                        case 1:
                            user = _a.sent();
                            hasNativeAuthMethod = !!(user === null || user === void 0 ? void 0 : user.authenticationMethods.find(function (m) { return m instanceof native_authentication_method_entity_1.NativeAuthenticationMethod; }));
                            if (user && user.verified) {
                                if (hasNativeAuthMethod) {
                                    // If the user has already been verified and has already
                                    // registered with the native authentication strategy, do nothing.
                                    return [2 /*return*/, { success: true }];
                                }
                            }
                            customFields = input.customFields;
                            return [4 /*yield*/, this.createOrUpdate(ctx, __assign({ emailAddress: input.emailAddress, title: input.title || '', firstName: input.firstName || '', lastName: input.lastName || '', phoneNumber: input.phoneNumber || '' }, (customFields ? { customFields: customFields } : {})))];
                        case 2:
                            customer = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(customer)) {
                                return [2 /*return*/, customer];
                            }
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_REGISTERED,
                                    data: {
                                        strategy: native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME,
                                    },
                                })];
                        case 3:
                            _a.sent();
                            if (!!user) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.userService.createCustomerUser(ctx, input.emailAddress, input.password || undefined)];
                        case 4:
                            customerUser = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(customerUser)) {
                                return [2 /*return*/, customerUser];
                            }
                            else {
                                user = customerUser;
                            }
                            _a.label = 5;
                        case 5:
                            if (!!hasNativeAuthMethod) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.userService.addNativeAuthenticationMethod(ctx, user, input.emailAddress, input.password || undefined)];
                        case 6:
                            addAuthenticationResult = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(addAuthenticationResult)) {
                                return [2 /*return*/, addAuthenticationResult];
                            }
                            else {
                                user = addAuthenticationResult;
                            }
                            _a.label = 7;
                        case 7:
                            if (!!user.verified) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.userService.setVerificationToken(ctx, user)];
                        case 8:
                            user = _a.sent();
                            _a.label = 9;
                        case 9:
                            customer.user = user;
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(user, { reload: false })];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer, { reload: false })];
                        case 11:
                            _a.sent();
                            if (!!user.verified) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.eventBus.publish(new account_registration_event_1.AccountRegistrationEvent(ctx, user))];
                        case 12:
                            _a.sent();
                            return [3 /*break*/, 15];
                        case 13: return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                customerId: customer.id,
                                ctx: ctx,
                                type: generated_types_1.HistoryEntryType.CUSTOMER_VERIFIED,
                                data: {
                                    strategy: native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME,
                                },
                            })];
                        case 14:
                            _a.sent();
                            _a.label = 15;
                        case 15: return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        /**
         * @description
         * Refreshes a stale email address verification token by generating a new one and
         * publishing a {@link AccountRegistrationEvent}.
         */
        CustomerService_1.prototype.refreshVerificationToken = function (ctx, emailAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.getUserByEmailAddress(ctx, emailAddress)];
                        case 1:
                            user = _a.sent();
                            if (!(user && !user.verified)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.userService.setVerificationToken(ctx, user)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new account_registration_event_1.AccountRegistrationEvent(ctx, user))];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Given a valid verification token which has been published in an {@link AccountRegistrationEvent}, this
         * method is used to set the Customer as `verified` as part of the account registration flow.
         */
        CustomerService_1.prototype.verifyCustomerEmailAddress = function (ctx, verificationToken, password) {
            return __awaiter(this, void 0, void 0, function () {
                var result, customer, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.verifyUserByToken(ctx, verificationToken, password)];
                        case 1:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            return [4 /*yield*/, this.findOneByUserId(ctx, result.id, false)];
                        case 2:
                            customer = _a.sent();
                            if (!customer) {
                                throw new errors_1.InternalServerError('error.cannot-locate-customer-for-user');
                            }
                            if (!ctx.channelId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.channelService.assignToChannels(ctx, customer_entity_1.Customer, customer.id, [ctx.channelId])];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                customerId: customer.id,
                                ctx: ctx,
                                type: generated_types_1.HistoryEntryType.CUSTOMER_VERIFIED,
                                data: {
                                    strategy: native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME,
                                },
                            })];
                        case 5:
                            _a.sent();
                            user = (0, utils_1.assertFound)(this.findOneByUserId(ctx, result.id));
                            return [4 /*yield*/, this.eventBus.publish(new account_verified_event_1.AccountVerifiedEvent(ctx, customer))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @description
         * Publishes a new {@link PasswordResetEvent} for the given email address. This event creates
         * a token which can be used in the `resetPassword()` method.
         */
        CustomerService_1.prototype.requestPasswordReset = function (ctx, emailAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var user, customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.setPasswordResetToken(ctx, emailAddress)];
                        case 1:
                            user = _a.sent();
                            if (!user) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.eventBus.publish(new password_reset_event_1.PasswordResetEvent(ctx, user))];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.findOneByUserId(ctx, user.id)];
                        case 3:
                            customer = _a.sent();
                            if (!customer) {
                                throw new errors_1.InternalServerError('error.cannot-locate-customer-for-user');
                            }
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_PASSWORD_RESET_REQUESTED,
                                    data: {},
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Given a valid password reset token created by a call to the `requestPasswordReset()` method,
         * this method will change the Customer's password to that given as the `password` argument.
         */
        CustomerService_1.prototype.resetPassword = function (ctx, passwordResetToken, password) {
            return __awaiter(this, void 0, void 0, function () {
                var result, customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.resetPasswordByToken(ctx, passwordResetToken, password)];
                        case 1:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            return [4 /*yield*/, this.findOneByUserId(ctx, result.id)];
                        case 2:
                            customer = _a.sent();
                            if (!customer) {
                                throw new errors_1.InternalServerError('error.cannot-locate-customer-for-user');
                            }
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_PASSWORD_RESET_VERIFIED,
                                    data: {},
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new password_reset_verified_event_1.PasswordResetVerifiedEvent(ctx, result))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @description
         * Publishes a {@link IdentifierChangeRequestEvent} for the given User. This event contains a token
         * which is then used in the `updateEmailAddress()` method to change the email address of the User &
         * Customer.
         */
        CustomerService_1.prototype.requestUpdateEmailAddress = function (ctx, userId, newEmailAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedEmailAddress, userWithConflictingIdentifier, user, customer, oldEmailAddress, oldIdentifier;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizedEmailAddress = (0, utils_1.normalizeEmailAddress)(newEmailAddress);
                            return [4 /*yield*/, this.userService.getUserByEmailAddress(ctx, newEmailAddress)];
                        case 1:
                            userWithConflictingIdentifier = _a.sent();
                            if (userWithConflictingIdentifier) {
                                return [2 /*return*/, new generated_graphql_shop_errors_1.EmailAddressConflictError()];
                            }
                            return [4 /*yield*/, this.userService.getUserById(ctx, userId)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.findOneByUserId(ctx, user.id)];
                        case 3:
                            customer = _a.sent();
                            if (!customer) {
                                return [2 /*return*/, false];
                            }
                            oldEmailAddress = customer.emailAddress;
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_EMAIL_UPDATE_REQUESTED,
                                    data: {
                                        oldEmailAddress: oldEmailAddress,
                                        newEmailAddress: normalizedEmailAddress,
                                    },
                                })];
                        case 4:
                            _a.sent();
                            if (!this.configService.authOptions.requireVerification) return [3 /*break*/, 7];
                            user.getNativeAuthenticationMethod().pendingIdentifier = normalizedEmailAddress;
                            return [4 /*yield*/, this.userService.setIdentifierChangeToken(ctx, user)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new identifier_change_request_event_1.IdentifierChangeRequestEvent(ctx, user))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 7:
                            oldIdentifier = user.identifier;
                            user.identifier = normalizedEmailAddress;
                            customer.emailAddress = normalizedEmailAddress;
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(user, { reload: false })];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer, { reload: false })];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new identifier_change_event_1.IdentifierChangeEvent(ctx, user, oldIdentifier))];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_EMAIL_UPDATE_VERIFIED,
                                    data: {
                                        oldEmailAddress: oldEmailAddress,
                                        newEmailAddress: normalizedEmailAddress,
                                    },
                                })];
                        case 11:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @description
         * Given a valid email update token published in a {@link IdentifierChangeRequestEvent}, this method
         * will update the Customer & User email address.
         */
        CustomerService_1.prototype.updateEmailAddress = function (ctx, token) {
            return __awaiter(this, void 0, void 0, function () {
                var result, user, oldIdentifier, customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.changeIdentifierByToken(ctx, token)];
                        case 1:
                            result = _a.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(result)) {
                                return [2 /*return*/, result];
                            }
                            user = result.user, oldIdentifier = result.oldIdentifier;
                            if (!user) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.findOneByUserId(ctx, user.id)];
                        case 2:
                            customer = _a.sent();
                            if (!customer) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.eventBus.publish(new identifier_change_event_1.IdentifierChangeEvent(ctx, user, oldIdentifier))];
                        case 3:
                            _a.sent();
                            customer.emailAddress = user.identifier;
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer, { reload: false })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_EMAIL_UPDATE_VERIFIED,
                                    data: {
                                        oldEmailAddress: oldIdentifier,
                                        newEmailAddress: customer.emailAddress,
                                    },
                                })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @description
         * For guest checkouts, we assume that a matching email address is the same customer.
         */
        CustomerService_1.prototype.createOrUpdate = function (ctx_1, input_1) {
            return __awaiter(this, arguments, void 0, function (ctx, input, errorOnExistingUser) {
                var customer, existing, _a, _b;
                if (errorOnExistingUser === void 0) { errorOnExistingUser = false; }
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            input.emailAddress = (0, utils_1.normalizeEmailAddress)(input.emailAddress);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).findOne({
                                    relations: ['channels'],
                                    where: {
                                        emailAddress: input.emailAddress,
                                        deletedAt: (0, typeorm_1.IsNull)(),
                                    },
                                })];
                        case 1:
                            existing = _c.sent();
                            if (!existing) return [3 /*break*/, 3];
                            if (existing.user && errorOnExistingUser) {
                                // It is not permitted to modify an existing *registered* Customer
                                return [2 /*return*/, new generated_graphql_shop_errors_1.EmailAddressConflictError()];
                            }
                            customer = (0, patch_entity_1.patchEntity)(existing, input);
                            _b = (_a = customer.channels).push;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, channel_entity_1.Channel, ctx.channelId)];
                        case 2:
                            _b.apply(_a, [_c.sent()]);
                            return [3 /*break*/, 7];
                        case 3: return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(new customer_entity_1.Customer(input))];
                        case 4:
                            customer = _c.sent();
                            return [4 /*yield*/, this.channelService.assignToCurrentChannel(customer, ctx)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new customer_event_1.CustomerEvent(ctx, customer, 'created', input))];
                        case 6:
                            _c.sent();
                            _c.label = 7;
                        case 7: return [2 /*return*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer)];
                    }
                });
            });
        };
        /**
         * @description
         * Creates a new {@link Address} for the given Customer.
         */
        CustomerService_1.prototype.createAddress = function (ctx, customerId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var customer, country, address, createdAddress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_entity_1.Customer, customerId, {
                                where: { deletedAt: (0, typeorm_1.IsNull)() },
                                relations: ['addresses'],
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            customer = _a.sent();
                            return [4 /*yield*/, this.countryService.findOneByCode(ctx, input.countryCode)];
                        case 2:
                            country = _a.sent();
                            address = new address_entity_1.Address(__assign(__assign({}, input), { country: country }));
                            return [4 /*yield*/, this.connection.getRepository(ctx, address_entity_1.Address).save(address)];
                        case 3:
                            createdAddress = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, address_entity_1.Address, input, createdAddress)];
                        case 4:
                            _a.sent();
                            customer.addresses.push(createdAddress);
                            return [4 /*yield*/, this.connection.getRepository(ctx, customer_entity_1.Customer).save(customer, { reload: false })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.enforceSingleDefaultAddress(ctx, createdAddress.id, input)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_ADDRESS_CREATED,
                                    data: { address: (0, address_to_line_1.addressToLine)(createdAddress) },
                                })];
                        case 7:
                            _a.sent();
                            createdAddress.customer = customer;
                            return [4 /*yield*/, this.eventBus.publish(new customer_address_event_1.CustomerAddressEvent(ctx, createdAddress, 'created', input))];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, createdAddress];
                    }
                });
            });
        };
        CustomerService_1.prototype.updateAddress = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var address, customer, _a, updatedAddress;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, address_entity_1.Address, input.id, {
                                relations: ['customer', 'country'],
                            })];
                        case 1:
                            address = _b.sent();
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, customer_entity_1.Customer, address.customer.id, ctx.channelId)];
                        case 2:
                            customer = _b.sent();
                            if (!customer) {
                                throw new errors_1.EntityNotFoundError('Address', input.id);
                            }
                            if (!(input.countryCode && input.countryCode !== address.country.code)) return [3 /*break*/, 4];
                            _a = address;
                            return [4 /*yield*/, this.countryService.findOneByCode(ctx, input.countryCode)];
                        case 3:
                            _a.country = _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            address.country = this.translator.translate(address.country, ctx);
                            _b.label = 5;
                        case 5:
                            updatedAddress = (0, patch_entity_1.patchEntity)(address, input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, address_entity_1.Address).save(updatedAddress)];
                        case 6:
                            updatedAddress = _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, address_entity_1.Address, input, updatedAddress)];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, this.enforceSingleDefaultAddress(ctx, input.id, input)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: address.customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_ADDRESS_UPDATED,
                                    data: {
                                        address: (0, address_to_line_1.addressToLine)(updatedAddress),
                                        input: input,
                                    },
                                })];
                        case 9:
                            _b.sent();
                            updatedAddress.customer = customer;
                            return [4 /*yield*/, this.eventBus.publish(new customer_address_event_1.CustomerAddressEvent(ctx, updatedAddress, 'updated', input))];
                        case 10:
                            _b.sent();
                            return [2 /*return*/, updatedAddress];
                    }
                });
            });
        };
        CustomerService_1.prototype.deleteAddress = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var address, customer, deletedAddress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, address_entity_1.Address, id, {
                                relations: ['customer', 'country'],
                            })];
                        case 1:
                            address = _a.sent();
                            return [4 /*yield*/, this.connection.findOneInChannel(ctx, customer_entity_1.Customer, address.customer.id, ctx.channelId)];
                        case 2:
                            customer = _a.sent();
                            if (!customer) {
                                throw new errors_1.EntityNotFoundError('Address', id);
                            }
                            address.country = this.translator.translate(address.country, ctx);
                            return [4 /*yield*/, this.reassignDefaultsForDeletedAddress(ctx, address)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    customerId: address.customer.id,
                                    ctx: ctx,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_ADDRESS_DELETED,
                                    data: {
                                        address: (0, address_to_line_1.addressToLine)(address),
                                    },
                                })];
                        case 4:
                            _a.sent();
                            deletedAddress = new address_entity_1.Address(address);
                            return [4 /*yield*/, this.connection.getRepository(ctx, address_entity_1.Address).remove(address)];
                        case 5:
                            _a.sent();
                            address.customer = customer;
                            return [4 /*yield*/, this.eventBus.publish(new customer_address_event_1.CustomerAddressEvent(ctx, deletedAddress, 'deleted', id))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        CustomerService_1.prototype.softDelete = function (ctx, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_entity_1.Customer, customerId, {
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            customer = _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, customer_entity_1.Customer)
                                    .update({ id: customerId }, { deletedAt: new Date() })];
                        case 2:
                            _a.sent();
                            if (!customer.user) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.userService.softDelete(ctx, customer.user.id)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [4 /*yield*/, this.eventBus.publish(new customer_event_1.CustomerEvent(ctx, customer, 'deleted', customerId))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * If the Customer associated with the given Order does not yet have any Addresses,
         * this method will create new Address(es) based on the Order's shipping & billing
         * addresses.
         */
        CustomerService_1.prototype.createAddressesForNewCustomer = function (ctx, order) {
            return __awaiter(this, void 0, void 0, function () {
                var addresses, shippingAddress, billingAddress, hasSeparateBillingAddress;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!order.customer) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.findAddressesByCustomerId(ctx, order.customer.id)];
                        case 1:
                            addresses = _b.sent();
                            if (!(addresses.length === 0 && ((_a = order.shippingAddress) === null || _a === void 0 ? void 0 : _a.country))) return [3 /*break*/, 5];
                            shippingAddress = order.shippingAddress;
                            billingAddress = order.billingAddress;
                            hasSeparateBillingAddress = (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.streetLine1) && !this.addressesAreEqual(shippingAddress, billingAddress);
                            if (!shippingAddress.streetLine1) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.createAddress(ctx, order.customer.id, __assign(__assign({}, shippingAddress), { company: shippingAddress.company || '', streetLine1: shippingAddress.streetLine1 || '', streetLine2: shippingAddress.streetLine2 || '', countryCode: shippingAddress.countryCode || '', defaultBillingAddress: !hasSeparateBillingAddress, defaultShippingAddress: true }))];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            if (!hasSeparateBillingAddress) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.createAddress(ctx, order.customer.id, __assign(__assign({}, billingAddress), { company: billingAddress.company || '', streetLine1: billingAddress.streetLine1 || '', streetLine2: billingAddress.streetLine2 || '', countryCode: billingAddress.countryCode || '', defaultBillingAddress: true, defaultShippingAddress: false }))];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        CustomerService_1.prototype.addressesAreEqual = function (address1, address2) {
            return (address1.streetLine1 === address2.streetLine1 &&
                address1.streetLine2 === address2.streetLine2 &&
                address1.postalCode === address2.postalCode);
        };
        CustomerService_1.prototype.addNoteToCustomer = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, customer_entity_1.Customer, input.id, {
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            customer = _a.sent();
                            return [4 /*yield*/, this.historyService.createHistoryEntryForCustomer({
                                    ctx: ctx,
                                    customerId: customer.id,
                                    type: generated_types_1.HistoryEntryType.CUSTOMER_NOTE,
                                    data: {
                                        note: input.note,
                                    },
                                }, input.isPublic)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, customer];
                    }
                });
            });
        };
        CustomerService_1.prototype.updateCustomerNote = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.historyService.updateCustomerHistoryEntry(ctx, {
                            type: generated_types_1.HistoryEntryType.CUSTOMER_NOTE,
                            data: input.note ? { note: input.note } : undefined,
                            ctx: ctx,
                            entryId: input.noteId,
                        })];
                });
            });
        };
        CustomerService_1.prototype.deleteCustomerNote = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.historyService.deleteCustomerHistoryEntry(ctx, id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                        case 2:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: e_1.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        CustomerService_1.prototype.enforceSingleDefaultAddress = function (ctx, addressId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var result, customerAddressIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, address_entity_1.Address)
                                .findOne({ where: { id: addressId }, relations: ['customer', 'customer.addresses'] })];
                        case 1:
                            result = _a.sent();
                            if (!result) return [3 /*break*/, 5];
                            customerAddressIds = result.customer.addresses
                                .map(function (a) { return a.id; })
                                .filter(function (id) { return !(0, utils_1.idsAreEqual)(id, addressId); });
                            if (!customerAddressIds.length) return [3 /*break*/, 5];
                            if (!(input.defaultBillingAddress === true)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.connection.getRepository(ctx, address_entity_1.Address).update(customerAddressIds, {
                                    defaultBillingAddress: false,
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(input.defaultShippingAddress === true)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.connection.getRepository(ctx, address_entity_1.Address).update(customerAddressIds, {
                                    defaultShippingAddress: false,
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * If a Customer Address is to be deleted, check if it is assigned as a default for shipping or
         * billing. If so, attempt to transfer default status to one of the other addresses if there are
         * any.
         */
        CustomerService_1.prototype.reassignDefaultsForDeletedAddress = function (ctx, addressToDelete) {
            return __awaiter(this, void 0, void 0, function () {
                var result, customerAddresses, otherAddresses;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!addressToDelete.defaultBillingAddress && !addressToDelete.defaultShippingAddress) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, address_entity_1.Address)
                                    .findOne({ where: { id: addressToDelete.id }, relations: ['customer', 'customer.addresses'] })];
                        case 1:
                            result = _a.sent();
                            if (!result) return [3 /*break*/, 3];
                            customerAddresses = result.customer.addresses;
                            if (!(1 < customerAddresses.length)) return [3 /*break*/, 3];
                            otherAddresses = customerAddresses
                                .filter(function (address) { return !(0, utils_1.idsAreEqual)(address.id, addressToDelete.id); })
                                .sort(function (a, b) { return (a.id < b.id ? -1 : 1); });
                            if (addressToDelete.defaultShippingAddress) {
                                otherAddresses[0].defaultShippingAddress = true;
                            }
                            if (addressToDelete.defaultBillingAddress) {
                                otherAddresses[0].defaultBillingAddress = true;
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, address_entity_1.Address).save(otherAddresses[0], { reload: false })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return CustomerService_1;
    }());
    __setFunctionName(_classThis, "CustomerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerService = _classThis;
}();
exports.CustomerService = CustomerService;
