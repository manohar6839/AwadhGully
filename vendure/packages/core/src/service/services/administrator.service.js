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
exports.AdministratorService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var common_2 = require("../../common");
var errors_1 = require("../../common/error/errors");
var utils_1 = require("../../common/utils");
var administrator_entity_1 = require("../../entity/administrator/administrator.entity");
var native_authentication_method_entity_1 = require("../../entity/authentication-method/native-authentication-method.entity");
var role_entity_1 = require("../../entity/role/role.entity");
var user_entity_1 = require("../../entity/user/user.entity");
var administrator_event_1 = require("../../event-bus/events/administrator-event");
var role_change_event_1 = require("../../event-bus/events/role-change-event");
var get_user_channels_permissions_1 = require("../helpers/utils/get-user-channels-permissions");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link Administrator} entities.
 *
 * @docsCategory services
 */
var AdministratorService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, common_2.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdministratorService = _classThis = /** @class */ (function () {
        function AdministratorService_1(connection, configService, listQueryBuilder, passwordCipher, userService, roleService, customFieldRelationService, eventBus, requestContextService) {
            this.connection = connection;
            this.configService = configService;
            this.listQueryBuilder = listQueryBuilder;
            this.passwordCipher = passwordCipher;
            this.userService = userService;
            this.roleService = roleService;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
            this.requestContextService = requestContextService;
        }
        /** @internal */
        AdministratorService_1.prototype.initAdministrators = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureSuperAdminExists()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Get a paginated list of Administrators.
         */
        AdministratorService_1.prototype.findAll = function (ctx, options, relations) {
            return this.listQueryBuilder
                .build(administrator_entity_1.Administrator, options, {
                relations: relations !== null && relations !== void 0 ? relations : ['user', 'user.roles'],
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                ctx: ctx,
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items,
                    totalItems: totalItems,
                });
            });
        };
        /**
         * @description
         * Get an Administrator by id.
         */
        AdministratorService_1.prototype.findOne = function (ctx, administratorId, relations) {
            return this.connection
                .getRepository(ctx, administrator_entity_1.Administrator)
                .findOne({
                relations: relations !== null && relations !== void 0 ? relations : ['user', 'user.roles'],
                where: {
                    id: administratorId,
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
            })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        /**
         * @description
         * Get an Administrator based on the User id.
         */
        AdministratorService_1.prototype.findOneByUserId = function (ctx, userId, relations) {
            return this.connection
                .getRepository(ctx, administrator_entity_1.Administrator)
                .findOne({
                relations: relations,
                where: {
                    user: { id: userId },
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
            })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        /**
         * @description
         * Create a new Administrator.
         */
        AdministratorService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var administrator, _a, createdAdministrator, _i, _b, roleId;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.checkActiveUserCanGrantRoles(ctx, input.roleIds)];
                        case 1:
                            _c.sent();
                            administrator = new administrator_entity_1.Administrator(input);
                            administrator.emailAddress = (0, utils_1.normalizeEmailAddress)(input.emailAddress);
                            _a = administrator;
                            return [4 /*yield*/, this.userService.createAdminUser(ctx, input.emailAddress, input.password)];
                        case 2:
                            _a.user = _c.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, administrator_entity_1.Administrator)
                                    .save(administrator)];
                        case 3:
                            createdAdministrator = _c.sent();
                            _i = 0, _b = input.roleIds;
                            _c.label = 4;
                        case 4:
                            if (!(_i < _b.length)) return [3 /*break*/, 7];
                            roleId = _b[_i];
                            return [4 /*yield*/, this.assignRole(ctx, createdAdministrator.id, roleId)];
                        case 5:
                            createdAdministrator = _c.sent();
                            _c.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 4];
                        case 7: return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, administrator_entity_1.Administrator, input, createdAdministrator)];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new administrator_event_1.AdministratorEvent(ctx, createdAdministrator, 'created', input))];
                        case 9:
                            _c.sent();
                            return [2 /*return*/, createdAdministrator];
                    }
                });
            });
        };
        /**
         * @description
         * Update an existing Administrator.
         */
        AdministratorService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var administrator, updatedAdministrator, user, nativeAuthMethod, _a, isSoleSuperAdmin, superAdminRole_1, removeIds, addIds, _i, _b, roleId;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, input.id)];
                        case 1:
                            administrator = _c.sent();
                            if (!administrator) {
                                throw new errors_1.EntityNotFoundError('Administrator', input.id);
                            }
                            if (!input.roleIds) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.checkActiveUserCanGrantRoles(ctx, input.roleIds)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            updatedAdministrator = (0, patch_entity_1.patchEntity)(administrator, input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, administrator_entity_1.Administrator).save(administrator, { reload: false })];
                        case 4:
                            _c.sent();
                            if (!input.emailAddress) return [3 /*break*/, 6];
                            updatedAdministrator.user.identifier = input.emailAddress;
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(updatedAdministrator.user)];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6:
                            if (!input.password) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.userService.getUserById(ctx, administrator.user.id)];
                        case 7:
                            user = _c.sent();
                            if (!user) return [3 /*break*/, 10];
                            nativeAuthMethod = user.getNativeAuthenticationMethod();
                            _a = nativeAuthMethod;
                            return [4 /*yield*/, this.passwordCipher.hash(input.password)];
                        case 8:
                            _a.passwordHash = _c.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod)];
                        case 9:
                            _c.sent();
                            _c.label = 10;
                        case 10:
                            if (!input.roleIds) return [3 /*break*/, 21];
                            return [4 /*yield*/, this.isSoleSuperadmin(ctx, input.id)];
                        case 11:
                            isSoleSuperAdmin = _c.sent();
                            if (!isSoleSuperAdmin) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.roleService.getSuperAdminRole(ctx)];
                        case 12:
                            superAdminRole_1 = _c.sent();
                            if (!input.roleIds.find(function (id) { return (0, utils_1.idsAreEqual)(id, superAdminRole_1.id); })) {
                                throw new errors_1.InternalServerError('error.superadmin-must-have-superadmin-role');
                            }
                            _c.label = 13;
                        case 13:
                            removeIds = administrator.user.roles
                                .map(function (role) { return role.id; })
                                .filter(function (roleId) { return input.roleIds.indexOf(roleId) === -1; });
                            addIds = input.roleIds.filter(function (roleId) { return !administrator.user.roles.some(function (role) { return role.id === roleId; }); });
                            administrator.user.roles = [];
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(administrator.user, { reload: false })];
                        case 14:
                            _c.sent();
                            _i = 0, _b = input.roleIds;
                            _c.label = 15;
                        case 15:
                            if (!(_i < _b.length)) return [3 /*break*/, 18];
                            roleId = _b[_i];
                            return [4 /*yield*/, this.assignRole(ctx, administrator.id, roleId)];
                        case 16:
                            updatedAdministrator = _c.sent();
                            _c.label = 17;
                        case 17:
                            _i++;
                            return [3 /*break*/, 15];
                        case 18: return [4 /*yield*/, this.eventBus.publish(new role_change_event_1.RoleChangeEvent(ctx, administrator, addIds, 'assigned'))];
                        case 19:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new role_change_event_1.RoleChangeEvent(ctx, administrator, removeIds, 'removed'))];
                        case 20:
                            _c.sent();
                            _c.label = 21;
                        case 21: return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, administrator_entity_1.Administrator, input, updatedAdministrator)];
                        case 22:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new administrator_event_1.AdministratorEvent(ctx, administrator, 'updated', input))];
                        case 23:
                            _c.sent();
                            return [2 /*return*/, updatedAdministrator];
                    }
                });
            });
        };
        /**
         * @description
         * Checks that the active user is allowed to grant the specified Roles when creating or
         * updating an Administrator.
         */
        AdministratorService_1.prototype.checkActiveUserCanGrantRoles = function (ctx, roleIds) {
            return __awaiter(this, void 0, void 0, function () {
                var roles, permissionsRequired, _i, permissionsRequired_1, channelPermissions, activeUserHasRequiredPermissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, role_entity_1.Role).find({
                                where: { id: (0, typeorm_1.In)(roleIds) },
                                relations: { channels: true },
                            })];
                        case 1:
                            roles = _a.sent();
                            permissionsRequired = (0, get_user_channels_permissions_1.getChannelPermissions)(roles);
                            _i = 0, permissionsRequired_1 = permissionsRequired;
                            _a.label = 2;
                        case 2:
                            if (!(_i < permissionsRequired_1.length)) return [3 /*break*/, 5];
                            channelPermissions = permissionsRequired_1[_i];
                            return [4 /*yield*/, this.roleService.userHasAllPermissionsOnChannel(ctx, channelPermissions.id, channelPermissions.permissions)];
                        case 3:
                            activeUserHasRequiredPermissions = _a.sent();
                            if (!activeUserHasRequiredPermissions) {
                                throw new errors_1.UserInputError('error.active-user-does-not-have-sufficient-permissions');
                            }
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Assigns a Role to the Administrator's User entity.
         */
        AdministratorService_1.prototype.assignRole = function (ctx, administratorId, roleId) {
            return __awaiter(this, void 0, void 0, function () {
                var administrator, role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, administratorId)];
                        case 1:
                            administrator = _a.sent();
                            if (!administrator) {
                                throw new errors_1.EntityNotFoundError('Administrator', administratorId);
                            }
                            return [4 /*yield*/, this.roleService.findOne(ctx, roleId)];
                        case 2:
                            role = _a.sent();
                            if (!role) {
                                throw new errors_1.EntityNotFoundError('Role', roleId);
                            }
                            administrator.user.roles.push(role);
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(administrator.user, { reload: false })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, administrator];
                    }
                });
            });
        };
        /**
         * @description
         * Soft deletes an Administrator (sets the `deletedAt` field).
         */
        AdministratorService_1.prototype.softDelete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var administrator, isSoleSuperadmin;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, administrator_entity_1.Administrator, id, {
                                relations: ['user'],
                            })];
                        case 1:
                            administrator = _a.sent();
                            return [4 /*yield*/, this.isSoleSuperadmin(ctx, id)];
                        case 2:
                            isSoleSuperadmin = _a.sent();
                            if (isSoleSuperadmin) {
                                throw new errors_1.InternalServerError('error.cannot-delete-sole-superadmin');
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, administrator_entity_1.Administrator).update({ id: id }, { deletedAt: new Date() })];
                        case 3:
                            _a.sent();
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            return [4 /*yield*/, this.userService.softDelete(ctx, administrator.user.id)];
                        case 4:
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new administrator_event_1.AdministratorEvent(ctx, administrator, 'deleted', id))];
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
         * Resolves to `true` if the administrator ID belongs to the only Administrator
         * with SuperAdmin permissions.
         */
        AdministratorService_1.prototype.isSoleSuperadmin = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var superAdminRole, allAdmins, superAdmins;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roleService.getSuperAdminRole(ctx)];
                        case 1:
                            superAdminRole = _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, administrator_entity_1.Administrator).find({
                                    relations: ['user', 'user.roles'],
                                })];
                        case 2:
                            allAdmins = _a.sent();
                            superAdmins = allAdmins.filter(function (admin) { return !!admin.user.roles.find(function (r) { return r.id === superAdminRole.id; }); });
                            if (1 < superAdmins.length) {
                                return [2 /*return*/, false];
                            }
                            else {
                                return [2 /*return*/, (0, utils_1.idsAreEqual)(superAdmins[0].id, id)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * There must always exist a SuperAdmin, otherwise full administration via API will
         * no longer be possible.
         *
         * @internal
         */
        AdministratorService_1.prototype.ensureSuperAdminExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var superadminCredentials, superAdminUser, ctx, superAdminRole, administrator, _a, id, createdAdministrator, superAdministrator, administrator, createdAdministrator;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            superadminCredentials = this.configService.authOptions.superadminCredentials;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(user_entity_1.User).findOne({
                                    where: {
                                        identifier: superadminCredentials.identifier,
                                    },
                                })];
                        case 1:
                            superAdminUser = _b.sent();
                            if (!!superAdminUser) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.requestContextService.create({ apiType: 'admin' })];
                        case 2:
                            ctx = _b.sent();
                            return [4 /*yield*/, this.roleService.getSuperAdminRole()];
                        case 3:
                            superAdminRole = _b.sent();
                            administrator = new administrator_entity_1.Administrator({
                                emailAddress: superadminCredentials.identifier,
                                firstName: 'Super',
                                lastName: 'Admin',
                            });
                            _a = administrator;
                            return [4 /*yield*/, this.userService.createAdminUser(ctx, superadminCredentials.identifier, superadminCredentials.password)];
                        case 4:
                            _a.user = _b.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, administrator_entity_1.Administrator).save(administrator)];
                        case 5:
                            id = (_b.sent()).id;
                            return [4 /*yield*/, (0, utils_1.assertFound)(this.findOne(ctx, id))];
                        case 6:
                            createdAdministrator = _b.sent();
                            createdAdministrator.user.roles.push(superAdminRole);
                            return [4 /*yield*/, this.connection.getRepository(ctx, user_entity_1.User).save(createdAdministrator.user, { reload: false })];
                        case 7:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 8: return [4 /*yield*/, this.connection.rawConnection
                                .getRepository(administrator_entity_1.Administrator)
                                .findOne({
                                where: {
                                    user: {
                                        id: superAdminUser.id,
                                    },
                                },
                            })];
                        case 9:
                            superAdministrator = _b.sent();
                            if (!!superAdministrator) return [3 /*break*/, 12];
                            administrator = new administrator_entity_1.Administrator({
                                emailAddress: superadminCredentials.identifier,
                                firstName: 'Super',
                                lastName: 'Admin',
                            });
                            return [4 /*yield*/, this.connection.rawConnection
                                    .getRepository(administrator_entity_1.Administrator)
                                    .save(administrator)];
                        case 10:
                            createdAdministrator = _b.sent();
                            createdAdministrator.user = superAdminUser;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(administrator_entity_1.Administrator).save(createdAdministrator)];
                        case 11:
                            _b.sent();
                            return [3 /*break*/, 14];
                        case 12:
                            if (!(superAdministrator.deletedAt != null)) return [3 /*break*/, 14];
                            superAdministrator.deletedAt = null;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(administrator_entity_1.Administrator).save(superAdministrator)];
                        case 13:
                            _b.sent();
                            _b.label = 14;
                        case 14:
                            if (!(superAdminUser.deletedAt != null)) return [3 /*break*/, 16];
                            superAdminUser.deletedAt = null;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(user_entity_1.User).save(superAdminUser)];
                        case 15:
                            _b.sent();
                            _b.label = 16;
                        case 16: return [2 /*return*/];
                    }
                });
            });
        };
        return AdministratorService_1;
    }());
    __setFunctionName(_classThis, "AdministratorService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdministratorService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdministratorService = _classThis;
}();
exports.AdministratorService = AdministratorService;
