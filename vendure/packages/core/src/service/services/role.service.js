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
exports.RoleService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_constants_1 = require("@vendure/common/lib/shared-constants");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var request_context_1 = require("../../api/common/request-context");
var constants_1 = require("../../common/constants");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var channel_entity_1 = require("../../entity/channel/channel.entity");
var role_entity_1 = require("../../entity/role/role.entity");
var user_entity_1 = require("../../entity/user/user.entity");
var role_event_1 = require("../../event-bus/events/role-event");
var get_user_channels_permissions_1 = require("../helpers/utils/get-user-channels-permissions");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link Role} entities.
 *
 * @docsCategory services
 */
var RoleService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RoleService = _classThis = /** @class */ (function () {
        function RoleService_1(connection, channelService, listQueryBuilder, configService, eventBus, requestContextCache, cacheService) {
            var _this = this;
            this.connection = connection;
            this.channelService = channelService;
            this.listQueryBuilder = listQueryBuilder;
            this.configService = configService;
            this.eventBus = eventBus;
            this.requestContextCache = requestContextCache;
            this.cacheService = cacheService;
            this.rolesCacheKey = 'RoleService.allRoles';
            this.rolesCache = this.cacheService.createCache({
                getKey: function () { return _this.rolesCacheKey; },
                options: {
                    ttl: 1000 * 60 * 60, // 1 hour
                },
            });
            // When a Role is created, updated or deleted, we need to invalidate the roles cache
            this.eventBus.ofType(role_event_1.RoleEvent).subscribe(function (event) {
                void _this.rolesCache.delete(_this.rolesCacheKey);
            });
        }
        RoleService_1.prototype.initRoles = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureSuperAdminRoleExists()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.ensureCustomerRoleExists()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.ensureRolesHaveValidPermissions()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleService_1.prototype.findAll = function (ctx, options, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var allRoles, visibleRoleIds, _i, allRoles_1, role, _a, items, totalItems;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getAllRolesWithChannels(ctx)];
                        case 1:
                            allRoles = _b.sent();
                            visibleRoleIds = [];
                            _i = 0, allRoles_1 = allRoles;
                            _b.label = 2;
                        case 2:
                            if (!(_i < allRoles_1.length)) return [3 /*break*/, 5];
                            role = allRoles_1[_i];
                            return [4 /*yield*/, this.activeUserCanReadRole(ctx, role)];
                        case 3:
                            if (_b.sent()) {
                                visibleRoleIds.push(role.id);
                            }
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            if (visibleRoleIds.length === 0) {
                                return [2 /*return*/, { items: [], totalItems: 0 }];
                            }
                            return [4 /*yield*/, this.listQueryBuilder
                                    .build(role_entity_1.Role, options, {
                                    relations: (0, unique_1.unique)(__spreadArray(__spreadArray([], (relations !== null && relations !== void 0 ? relations : []), true), ['channels'], false)),
                                    ctx: ctx,
                                })
                                    .andWhere({ id: (0, typeorm_1.In)(visibleRoleIds) })
                                    .getManyAndCount()];
                        case 6:
                            _a = _b.sent(), items = _a[0], totalItems = _a[1];
                            return [2 /*return*/, { items: items, totalItems: totalItems }];
                    }
                });
            });
        };
        RoleService_1.prototype.findOne = function (ctx, roleId, relations) {
            var _this = this;
            return this.connection
                .getRepository(ctx, role_entity_1.Role)
                .findOne({
                where: { id: roleId },
                relations: (0, unique_1.unique)(__spreadArray(__spreadArray([], (relations !== null && relations !== void 0 ? relations : []), true), ['channels'], false)),
            })
                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = result;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.activeUserCanReadRole(ctx, result)];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            if (_a) {
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        RoleService_1.prototype.getChannelsForRole = function (ctx, roleId) {
            return this.findOne(ctx, roleId).then(function (role) { return (role ? role.channels : []); });
        };
        /**
         * @description
         * Returns the special SuperAdmin Role, which always exists in Vendure.
         */
        RoleService_1.prototype.getSuperAdminRole = function (ctx) {
            return this.getRoleByCode(ctx, shared_constants_1.SUPER_ADMIN_ROLE_CODE).then(function (role) {
                if (!role) {
                    throw new errors_1.InternalServerError('error.super-admin-role-not-found');
                }
                return role;
            });
        };
        /**
         * @description
         * Returns the special Customer Role, which always exists in Vendure.
         */
        RoleService_1.prototype.getCustomerRole = function (ctx) {
            return this.getRoleByCode(ctx, shared_constants_1.CUSTOMER_ROLE_CODE).then(function (role) {
                if (!role) {
                    throw new errors_1.InternalServerError('error.customer-role-not-found');
                }
                return role;
            });
        };
        /**
         * @description
         * Returns all the valid Permission values
         */
        RoleService_1.prototype.getAllPermissions = function () {
            return Object.values(generated_types_1.Permission);
        };
        /**
         * @description
         * Returns true if the User has the specified permission on that Channel
         */
        RoleService_1.prototype.userHasPermissionOnChannel = function (ctx, channelId, permission) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userHasAnyPermissionsOnChannel(ctx, channelId, [permission])];
                });
            });
        };
        /**
         * @description
         * Returns true if the User has any of the specified permissions on that Channel
         */
        RoleService_1.prototype.userHasAnyPermissionsOnChannel = function (ctx, channelId, permissions) {
            return __awaiter(this, void 0, void 0, function () {
                var permissionsOnChannel, _i, permissions_1, permission;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getActiveUserPermissionsOnChannel(ctx, channelId)];
                        case 1:
                            permissionsOnChannel = _a.sent();
                            for (_i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
                                permission = permissions_1[_i];
                                if (permissionsOnChannel.includes(permission)) {
                                    return [2 /*return*/, true];
                                }
                            }
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        RoleService_1.prototype.activeUserCanReadRole = function (ctx, role) {
            return __awaiter(this, void 0, void 0, function () {
                var permissionsRequired, _i, permissionsRequired_1, channelPermissions, activeUserHasRequiredPermissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            permissionsRequired = (0, get_user_channels_permissions_1.getChannelPermissions)([role]);
                            _i = 0, permissionsRequired_1 = permissionsRequired;
                            _a.label = 1;
                        case 1:
                            if (!(_i < permissionsRequired_1.length)) return [3 /*break*/, 4];
                            channelPermissions = permissionsRequired_1[_i];
                            return [4 /*yield*/, this.userHasAllPermissionsOnChannel(ctx, channelPermissions.id, channelPermissions.permissions)];
                        case 2:
                            activeUserHasRequiredPermissions = _a.sent();
                            if (!activeUserHasRequiredPermissions) {
                                return [2 /*return*/, false];
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, true];
                    }
                });
            });
        };
        RoleService_1.prototype.getAllRolesWithChannels = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var allRolesJson;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.rolesCache.get(this.rolesCacheKey, function () { return __awaiter(_this, void 0, void 0, function () {
                                var roles;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, role_entity_1.Role).find({ relations: ['channels'] })];
                                        case 1:
                                            roles = _a.sent();
                                            return [2 /*return*/, JSON.stringify(roles)];
                                    }
                                });
                            }); })];
                        case 1:
                            allRolesJson = _a.sent();
                            return [2 /*return*/, JSON.parse(allRolesJson)];
                    }
                });
            });
        };
        /**
         * @description
         * Returns true if the User has all the specified permissions on that Channel
         */
        RoleService_1.prototype.userHasAllPermissionsOnChannel = function (ctx, channelId, permissions) {
            return __awaiter(this, void 0, void 0, function () {
                var permissionsOnChannel, _i, permissions_2, permission;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getActiveUserPermissionsOnChannel(ctx, channelId)];
                        case 1:
                            permissionsOnChannel = _a.sent();
                            for (_i = 0, permissions_2 = permissions; _i < permissions_2.length; _i++) {
                                permission = permissions_2[_i];
                                if (!permissionsOnChannel.includes(permission)) {
                                    return [2 /*return*/, false];
                                }
                            }
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        RoleService_1.prototype.getActiveUserPermissionsOnChannel = function (ctx, channelId) {
            return __awaiter(this, void 0, void 0, function () {
                var activeUserId, userChannels, channel;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            activeUserId = ctx.activeUserId;
                            if (activeUserId == null) {
                                return [2 /*return*/, []];
                            }
                            return [4 /*yield*/, this.requestContextCache.get(ctx, "RoleService.getActiveUserPermissionsOnChannel.user(".concat(activeUserId, ")"), function () { return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, user_entity_1.User, activeUserId, {
                                                    relations: ['roles', 'roles.channels'],
                                                })];
                                            case 1:
                                                user = _a.sent();
                                                return [2 /*return*/, (0, get_user_channels_permissions_1.getUserChannelsPermissions)(user)];
                                        }
                                    });
                                }); })];
                        case 1:
                            userChannels = _a.sent();
                            channel = userChannels.find(function (c) { return (0, utils_1.idsAreEqual)(c.id, channelId); });
                            if (!channel) {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/, channel.permissions];
                    }
                });
            });
        };
        RoleService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var targetChannels, role;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.checkPermissionsAreValid(input.permissions);
                            targetChannels = [];
                            if (!input.channelIds) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getPermittedChannels(ctx, input.channelIds)];
                        case 1:
                            targetChannels = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            targetChannels = [ctx.channel];
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.checkActiveUserHasSufficientPermissions(ctx, targetChannels, input.permissions)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.createRoleForChannels(ctx, input, targetChannels)];
                        case 5:
                            role = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new role_event_1.RoleEvent(ctx, role, 'created', input))];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, role];
                    }
                });
            });
        };
        RoleService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var role, targetChannels, _a, updatedRole;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.checkPermissionsAreValid(input.permissions);
                            return [4 /*yield*/, this.findOne(ctx, input.id)];
                        case 1:
                            role = _b.sent();
                            if (!role) {
                                throw new errors_1.EntityNotFoundError('Role', input.id);
                            }
                            if (role.code === shared_constants_1.SUPER_ADMIN_ROLE_CODE || role.code === shared_constants_1.CUSTOMER_ROLE_CODE) {
                                throw new errors_1.InternalServerError('error.cannot-modify-role', { roleCode: role.code });
                            }
                            if (!input.channelIds) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getPermittedChannels(ctx, input.channelIds)];
                        case 2:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = undefined;
                            _b.label = 4;
                        case 4:
                            targetChannels = _a;
                            if (!input.permissions) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.checkActiveUserHasSufficientPermissions(ctx, targetChannels !== null && targetChannels !== void 0 ? targetChannels : role.channels, input.permissions)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            (0, patch_entity_1.patchEntity)(role, {
                                code: input.code,
                                description: input.description,
                                permissions: input.permissions
                                    ? (0, unique_1.unique)(__spreadArray([generated_types_1.Permission.Authenticated], input.permissions, true))
                                    : undefined,
                            });
                            if (targetChannels) {
                                role.channels = targetChannels;
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, role_entity_1.Role).save(role, { reload: false })];
                        case 7:
                            _b.sent();
                            return [4 /*yield*/, (0, utils_1.assertFound)(this.findOne(ctx, role.id))];
                        case 8:
                            updatedRole = _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new role_event_1.RoleEvent(ctx, updatedRole, 'updated', input))];
                        case 9:
                            _b.sent();
                            return [2 /*return*/, updatedRole];
                    }
                });
            });
        };
        RoleService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var role, deletedRole;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, id)];
                        case 1:
                            role = _a.sent();
                            if (!role) {
                                throw new errors_1.EntityNotFoundError('Role', id);
                            }
                            if (role.code === shared_constants_1.SUPER_ADMIN_ROLE_CODE || role.code === shared_constants_1.CUSTOMER_ROLE_CODE) {
                                throw new errors_1.InternalServerError('error.cannot-delete-role', { roleCode: role.code });
                            }
                            deletedRole = new role_entity_1.Role(role);
                            return [4 /*yield*/, this.connection.getRepository(ctx, role_entity_1.Role).remove(role)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new role_event_1.RoleEvent(ctx, deletedRole, 'deleted', id))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        RoleService_1.prototype.assignRoleToChannel = function (ctx, roleId, channelId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.channelService.assignToChannels(ctx, role_entity_1.Role, roleId, [channelId])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RoleService_1.prototype.getPermittedChannels = function (ctx, channelIds) {
            return __awaiter(this, void 0, void 0, function () {
                var permittedChannels, _i, channelIds_1, channelId, channel, hasPermission;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            permittedChannels = [];
                            _i = 0, channelIds_1 = channelIds;
                            _a.label = 1;
                        case 1:
                            if (!(_i < channelIds_1.length)) return [3 /*break*/, 5];
                            channelId = channelIds_1[_i];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, channel_entity_1.Channel, channelId)];
                        case 2:
                            channel = _a.sent();
                            return [4 /*yield*/, this.userHasPermissionOnChannel(ctx, channelId, generated_types_1.Permission.CreateAdministrator)];
                        case 3:
                            hasPermission = _a.sent();
                            if (!hasPermission) {
                                throw new errors_1.ForbiddenError();
                            }
                            permittedChannels = __spreadArray(__spreadArray([], permittedChannels, true), [channel], false);
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, permittedChannels];
                    }
                });
            });
        };
        RoleService_1.prototype.checkPermissionsAreValid = function (permissions) {
            if (!permissions) {
                return;
            }
            var allAssignablePermissions = this.getAllAssignablePermissions();
            for (var _i = 0, permissions_3 = permissions; _i < permissions_3.length; _i++) {
                var permission = permissions_3[_i];
                if (!allAssignablePermissions.includes(permission) || permission === generated_types_1.Permission.SuperAdmin) {
                    throw new errors_1.UserInputError('error.permission-invalid', { permission: permission });
                }
            }
        };
        /**
         * @description
         * Checks that the active User has sufficient Permissions on the target Channels to create
         * a Role with the given Permissions. The rule is that an Administrator may only grant
         * Permissions that they themselves already possess.
         */
        RoleService_1.prototype.checkActiveUserHasSufficientPermissions = function (ctx, targetChannels, permissions) {
            return __awaiter(this, void 0, void 0, function () {
                var permissionsRequired, _i, permissionsRequired_2, channelPermissions, activeUserHasRequiredPermissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            permissionsRequired = (0, get_user_channels_permissions_1.getChannelPermissions)([
                                new role_entity_1.Role({
                                    permissions: (0, unique_1.unique)(__spreadArray([generated_types_1.Permission.Authenticated], permissions, true)),
                                    channels: targetChannels,
                                }),
                            ]);
                            _i = 0, permissionsRequired_2 = permissionsRequired;
                            _a.label = 1;
                        case 1:
                            if (!(_i < permissionsRequired_2.length)) return [3 /*break*/, 4];
                            channelPermissions = permissionsRequired_2[_i];
                            return [4 /*yield*/, this.userHasAllPermissionsOnChannel(ctx, channelPermissions.id, channelPermissions.permissions)];
                        case 2:
                            activeUserHasRequiredPermissions = _a.sent();
                            if (!activeUserHasRequiredPermissions) {
                                throw new errors_1.UserInputError('error.active-user-does-not-have-sufficient-permissions');
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RoleService_1.prototype.getRoleByCode = function (ctx, code) {
            var repository = ctx
                ? this.connection.getRepository(ctx, role_entity_1.Role)
                : this.connection.rawConnection.getRepository(role_entity_1.Role);
            return repository.findOne({
                where: { code: code },
            });
        };
        /**
         * Ensure that the SuperAdmin role exists and that it has all possible Permissions.
         */
        RoleService_1.prototype.ensureSuperAdminRoleExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var assignablePermissions, superAdminRole, err_1, defaultChannel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            assignablePermissions = this.getAllAssignablePermissions();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 7]);
                            return [4 /*yield*/, this.getSuperAdminRole()];
                        case 2:
                            superAdminRole = _a.sent();
                            superAdminRole.permissions = assignablePermissions;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(role_entity_1.Role).save(superAdminRole, { reload: false })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 4:
                            err_1 = _a.sent();
                            return [4 /*yield*/, this.channelService.getDefaultChannel()];
                        case 5:
                            defaultChannel = _a.sent();
                            return [4 /*yield*/, this.createRoleForChannels(request_context_1.RequestContext.empty(), {
                                    code: shared_constants_1.SUPER_ADMIN_ROLE_CODE,
                                    description: shared_constants_1.SUPER_ADMIN_ROLE_DESCRIPTION,
                                    permissions: assignablePermissions,
                                }, [defaultChannel])];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * The Customer Role is a special case which must always exist.
         */
        RoleService_1.prototype.ensureCustomerRoleExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var err_2, defaultChannel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 5]);
                            return [4 /*yield*/, this.getCustomerRole()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 2:
                            err_2 = _a.sent();
                            return [4 /*yield*/, this.channelService.getDefaultChannel()];
                        case 3:
                            defaultChannel = _a.sent();
                            return [4 /*yield*/, this.createRoleForChannels(request_context_1.RequestContext.empty(), {
                                    code: shared_constants_1.CUSTOMER_ROLE_CODE,
                                    description: shared_constants_1.CUSTOMER_ROLE_DESCRIPTION,
                                    permissions: [generated_types_1.Permission.Authenticated],
                                }, [defaultChannel])];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Since custom permissions can be added and removed by config, there may exist one or more Roles with
         * invalid permissions (i.e. permissions that were set previously to a custom permission, which has been
         * subsequently removed from config). This method should run on startup to ensure that any such invalid
         * permissions are removed from those Roles.
         */
        RoleService_1.prototype.ensureRolesHaveValidPermissions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var roles, assignablePermissions, _i, roles_1, role, invalidPermissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.rawConnection.getRepository(role_entity_1.Role).find()];
                        case 1:
                            roles = _a.sent();
                            assignablePermissions = this.getAllAssignablePermissions();
                            _i = 0, roles_1 = roles;
                            _a.label = 2;
                        case 2:
                            if (!(_i < roles_1.length)) return [3 /*break*/, 5];
                            role = roles_1[_i];
                            invalidPermissions = role.permissions.filter(function (p) { return !assignablePermissions.includes(p); });
                            if (!invalidPermissions.length) return [3 /*break*/, 4];
                            role.permissions = role.permissions.filter(function (p) { return assignablePermissions.includes(p); });
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(role_entity_1.Role).save(role)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        RoleService_1.prototype.createRoleForChannels = function (ctx, input, channels) {
            var role = new role_entity_1.Role({
                code: input.code,
                description: input.description,
                permissions: (0, unique_1.unique)(__spreadArray([generated_types_1.Permission.Authenticated], input.permissions, true)),
            });
            role.channels = channels;
            return this.connection.getRepository(ctx, role_entity_1.Role).save(role);
        };
        RoleService_1.prototype.getAllAssignablePermissions = function () {
            return (0, constants_1.getAllPermissionsMetadata)(this.configService.authOptions.customPermissions)
                .filter(function (p) { return p.assignable; })
                .map(function (p) { return p.name; });
        };
        return RoleService_1;
    }());
    __setFunctionName(_classThis, "RoleService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoleService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoleService = _classThis;
}();
exports.RoleService = RoleService;
