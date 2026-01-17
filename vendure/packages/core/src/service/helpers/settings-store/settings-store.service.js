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
exports.SettingsStoreService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var ms_1 = require("ms");
var request_context_1 = require("../../../api/common/request-context");
var errors_1 = require("../../../common/error/errors");
var injector_1 = require("../../../common/injector");
var vendure_logger_1 = require("../../../config/logger/vendure-logger");
var settings_store_types_1 = require("../../../config/settings-store/settings-store-types");
var settings_store_entry_entity_1 = require("../../../entity/settings-store-entry/settings-store-entry.entity");
/**
 * @description
 * The SettingsStoreService provides a flexible settings storage system with support for
 * scoping, permissions, and validation. It allows plugins and the core system to
 * store and retrieve configuration data with fine-grained control over access and isolation.
 *
 * ## Usage
 *
 * Values are automatically scoped according to their field configuration:
 *
 * @example
 * ```ts
 * // In a service
 * const userTheme = await this.settingsStoreService.get('dashboard.theme', ctx);
 * await this.settingsStoreService.set('dashboard.theme', 'dark', ctx);
 *
 * // Get multiple values
 * const settings = await this.settingsStoreService.getMany([
 *   'dashboard.theme',
 *   'dashboard.tableFilters'
 * ], ctx);
 * ```
 *
 * @docsCategory services
 * @since 3.4.0
 */
var SettingsStoreService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SettingsStoreService = _classThis = /** @class */ (function () {
        function SettingsStoreService_1(connection, moduleRef, configService) {
            this.connection = connection;
            this.moduleRef = moduleRef;
            this.configService = configService;
            this.fieldRegistry = new Map();
            this.injector = new injector_1.Injector(this.moduleRef);
        }
        SettingsStoreService_1.prototype.onModuleInit = function () {
            this.initializeFieldRegistrations();
        };
        /**
         * @description
         * Initialize field registrations from the Vendure configuration.
         * Called during module initialization.
         */
        SettingsStoreService_1.prototype.initializeFieldRegistrations = function () {
            var settingsStoreFields = this.configService.settingsStoreFields || {};
            for (var _i = 0, _a = Object.entries(settingsStoreFields); _i < _a.length; _i++) {
                var _b = _a[_i], namespace = _b[0], fields = _b[1];
                this.register({ namespace: namespace, fields: fields });
            }
        };
        /**
         * @description
         * Register settings store fields. This is typically called during application
         * bootstrap when processing the VendureConfig.
         */
        SettingsStoreService_1.prototype.register = function (registration) {
            for (var _i = 0, _a = registration.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                var fullKey = "".concat(registration.namespace, ".").concat(field.name);
                this.fieldRegistry.set(fullKey, field);
                vendure_logger_1.Logger.debug("Registered settings store field: ".concat(fullKey));
            }
        };
        SettingsStoreService_1.prototype.get = function (keyOrCtx, ctxOrKey) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, ctx, key, fieldConfig, scope, entry;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.determineCtx(keyOrCtx, ctxOrKey), ctx = _a.ctx, key = _a.other;
                            fieldConfig = this.getFieldConfig(key);
                            scope = this.generateScope(key, undefined, ctx, fieldConfig);
                            return [4 /*yield*/, this.connection.getRepository(ctx, settings_store_entry_entity_1.SettingsStoreEntry).findOne({
                                    where: { key: key, scope: scope },
                                })];
                        case 1:
                            entry = _b.sent();
                            return [2 /*return*/, entry === null || entry === void 0 ? void 0 : entry.value];
                    }
                });
            });
        };
        SettingsStoreService_1.prototype.getMany = function (keysOrCtx, ctxOrKeys) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, ctx, keys, result, queries, _i, keys_1, key, fieldConfig, scope, qb, orConditions, entries, _b, entries_1, entry;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.determineCtx(keysOrCtx, ctxOrKeys), ctx = _a.ctx, keys = _a.other;
                            result = {};
                            queries = [];
                            for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                key = keys_1[_i];
                                fieldConfig = this.getFieldConfig(key);
                                scope = this.generateScope(key, undefined, ctx, fieldConfig);
                                queries.push({ key: key, scope: scope });
                            }
                            if (queries.length === 0) {
                                return [2 /*return*/, result];
                            }
                            qb = this.connection.getRepository(ctx, settings_store_entry_entity_1.SettingsStoreEntry).createQueryBuilder('entry');
                            orConditions = queries
                                .map(function (q, index) { return "(entry.key = :key".concat(index, " AND entry.scope = :scope").concat(index, ")"); })
                                .join(' OR ');
                            if (orConditions) {
                                qb.where(orConditions);
                                // Add parameters
                                queries.forEach(function (q, index) {
                                    qb.setParameter("key".concat(index), q.key);
                                    qb.setParameter("scope".concat(index), q.scope);
                                });
                            }
                            return [4 /*yield*/, qb.getMany()];
                        case 1:
                            entries = _c.sent();
                            // Map results back to keys
                            for (_b = 0, entries_1 = entries; _b < entries_1.length; _b++) {
                                entry = entries_1[_b];
                                result[entry.key] = entry.value;
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        SettingsStoreService_1.prototype.set = function (keyOrCtx, keyOrValue, ctxOrValue) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, key, value, fieldConfig, scope, repo, entry, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ctx = keyOrCtx instanceof request_context_1.RequestContext ? keyOrCtx : ctxOrValue;
                            key = keyOrCtx instanceof request_context_1.RequestContext ? keyOrValue : keyOrCtx;
                            value = ctxOrValue instanceof request_context_1.RequestContext ? keyOrValue : ctxOrValue;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 8, , 9]);
                            fieldConfig = this.getFieldConfig(key);
                            // Validate the value
                            return [4 /*yield*/, this.validateValue(key, value, ctx)];
                        case 2:
                            // Validate the value
                            _a.sent();
                            scope = this.generateScope(key, value, ctx, fieldConfig);
                            repo = this.connection.getRepository(ctx, settings_store_entry_entity_1.SettingsStoreEntry);
                            return [4 /*yield*/, repo.findOne({
                                    where: { key: key, scope: scope },
                                })];
                        case 3:
                            entry = _a.sent();
                            if (!entry) return [3 /*break*/, 5];
                            entry.value = value;
                            return [4 /*yield*/, repo.save(entry)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, repo.save({
                                key: key,
                                scope: scope,
                                value: value,
                            })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [2 /*return*/, {
                                key: key,
                                result: true,
                            }];
                        case 8:
                            error_1 = _a.sent();
                            return [2 /*return*/, {
                                    key: key,
                                    result: false,
                                    error: error_1 instanceof Error ? error_1.message : 'Unknown error occurred',
                                }];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        SettingsStoreService_1.prototype.setMany = function (valuesOrCtx, ctxOrValues) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, ctx, values, results, _i, _b, _c, key, value, result;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.determineCtx(valuesOrCtx, ctxOrValues), ctx = _a.ctx, values = _a.other;
                            results = [];
                            _i = 0, _b = Object.entries(values);
                            _d.label = 1;
                        case 1:
                            if (!(_i < _b.length)) return [3 /*break*/, 4];
                            _c = _b[_i], key = _c[0], value = _c[1];
                            return [4 /*yield*/, this.set(ctx, key, value)];
                        case 2:
                            result = _d.sent();
                            results.push(result);
                            _d.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, results];
                    }
                });
            });
        };
        /**
         * @description
         * Get the field configuration for a key.
         */
        SettingsStoreService_1.prototype.getFieldDefinition = function (key) {
            return this.fieldRegistry.get(key);
        };
        /**
         * @description
         * Validate a value against its field definition.
         */
        SettingsStoreService_1.prototype.validateValue = function (key, value, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var fieldConfig, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fieldConfig = this.fieldRegistry.get(key);
                            if (!(fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.validate)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, fieldConfig.validate(value, this.injector, ctx)];
                        case 1:
                            result = _a.sent();
                            if (typeof result === 'string') {
                                throw new errors_1.UserInputError("Validation failed for ".concat(key, ": ").concat(result));
                            }
                            if (Array.isArray(result)) {
                                throw new errors_1.UserInputError("Validation failed for ".concat(key, ": ").concat(JSON.stringify(result)));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Generate the scope key for a given field and context.
         */
        SettingsStoreService_1.prototype.generateScope = function (key, value, ctx, fieldConfig) {
            var scopeFunction = fieldConfig.scope || settings_store_types_1.SettingsStoreScopes.global;
            return scopeFunction({ key: key, value: value, ctx: ctx });
        };
        /**
         * @description
         * Get field configuration, throwing if not found.
         */
        SettingsStoreService_1.prototype.getFieldConfig = function (key) {
            var config = this.fieldRegistry.get(key);
            if (!config) {
                throw new errors_1.InternalServerError("Settings store field not registered: ".concat(key));
            }
            return config;
        };
        /**
         * @description
         * Find orphaned settings store entries that no longer have corresponding field definitions.
         *
         * @param options - Options for filtering orphaned entries
         * @returns Array of orphaned entries
         */
        SettingsStoreService_1.prototype.findOrphanedEntries = function () {
            return __awaiter(this, arguments, void 0, function (options) {
                var _a, olderThan, _b, maxDeleteCount, cutoffDate, qb, allEntries, orphanedEntries, _i, allEntries_1, entry, fieldConfig;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = options.olderThan, olderThan = _a === void 0 ? '7d' : _a, _b = options.maxDeleteCount, maxDeleteCount = _b === void 0 ? 1000 : _b;
                            cutoffDate = this.parseDuration(olderThan);
                            qb = this.connection.rawConnection
                                .getRepository(settings_store_entry_entity_1.SettingsStoreEntry)
                                .createQueryBuilder('entry')
                                .where('entry.updatedAt < :cutoffDate', { cutoffDate: cutoffDate })
                                .orderBy('entry.updatedAt', 'ASC')
                                .limit(maxDeleteCount);
                            return [4 /*yield*/, qb.getMany()];
                        case 1:
                            allEntries = _c.sent();
                            orphanedEntries = [];
                            // Check each entry against registered fields
                            for (_i = 0, allEntries_1 = allEntries; _i < allEntries_1.length; _i++) {
                                entry = allEntries_1[_i];
                                fieldConfig = this.fieldRegistry.get(entry.key);
                                if (!fieldConfig) {
                                    // This entry has no field definition - it's orphaned
                                    orphanedEntries.push({
                                        key: entry.key,
                                        scope: entry.scope || '',
                                        updatedAt: entry.updatedAt,
                                        valuePreview: this.getValuePreview(entry.value),
                                    });
                                }
                            }
                            return [2 /*return*/, orphanedEntries];
                    }
                });
            });
        };
        /**
         * @description
         * Clean up orphaned settings store entries from the database.
         *
         * @param options - Options for the cleanup operation
         * @returns Result of the cleanup operation
         */
        SettingsStoreService_1.prototype.cleanupOrphanedEntries = function () {
            return __awaiter(this, arguments, void 0, function (options) {
                var _a, dryRun, _b, batchSize, _c, maxDeleteCount, orphanedEntries, totalDeleted, sampleDeletedEntries, i, batch, conditions;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = options.dryRun, dryRun = _a === void 0 ? false : _a, _b = options.batchSize, batchSize = _b === void 0 ? 100 : _b, _c = options.maxDeleteCount, maxDeleteCount = _c === void 0 ? 1000 : _c;
                            return [4 /*yield*/, this.findOrphanedEntries(options)];
                        case 1:
                            orphanedEntries = _d.sent();
                            if (dryRun) {
                                return [2 /*return*/, {
                                        deletedCount: orphanedEntries.length,
                                        dryRun: true,
                                        deletedEntries: orphanedEntries.slice(0, 10), // Sample for preview
                                    }];
                            }
                            totalDeleted = 0;
                            sampleDeletedEntries = [];
                            i = 0;
                            _d.label = 2;
                        case 2:
                            if (!(i < orphanedEntries.length && totalDeleted < maxDeleteCount)) return [3 /*break*/, 5];
                            batch = orphanedEntries.slice(i, i + batchSize);
                            conditions = batch.map(function (entry) { return ({ key: entry.key, scope: entry.scope }); });
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(settings_store_entry_entity_1.SettingsStoreEntry).delete(conditions)];
                        case 3:
                            _d.sent();
                            totalDeleted += batch.length;
                            // Keep first batch as sample
                            if (i === 0) {
                                sampleDeletedEntries.push.apply(sampleDeletedEntries, batch.slice(0, 10));
                            }
                            vendure_logger_1.Logger.verbose("Deleted batch of ".concat(batch.length, " orphaned settings store entries"));
                            _d.label = 4;
                        case 4:
                            i += batchSize;
                            return [3 /*break*/, 2];
                        case 5:
                            vendure_logger_1.Logger.info("Cleanup completed: deleted ".concat(totalDeleted, " orphaned settings store entries"));
                            return [2 /*return*/, {
                                    deletedCount: totalDeleted,
                                    dryRun: false,
                                    deletedEntries: sampleDeletedEntries,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * Parse a duration string (e.g., '7d', '30m', '2h') into a Date object.
         */
        SettingsStoreService_1.prototype.parseDuration = function (duration) {
            var milliseconds = (0, ms_1.default)(duration);
            if (!milliseconds) {
                throw new Error("Invalid duration format: ".concat(duration, ". Use format like '7d', '2h', '30m'"));
            }
            return new Date(Date.now() - milliseconds);
        };
        /**
         * @description
         * Get a preview of a value for logging purposes, truncating if too large.
         */
        SettingsStoreService_1.prototype.getValuePreview = function (value) {
            var stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            return stringValue.length > 100 ? stringValue.substring(0, 100) + '...' : stringValue;
        };
        /**
         * @description
         * Check if the current user has permission to access a field.
         * This is not called internally in the get and set methods, so should
         * be used by any methods which are exposing these methods via the GraphQL
         * APIs.
         * @deprecated Use `hasReadPermission` or `hasWritePermission` for granular control
         */
        SettingsStoreService_1.prototype.hasPermission = function (ctx, key) {
            // For backwards compatibility, check both read and write permissions
            return this.hasReadPermission(ctx, key) && this.hasWritePermission(ctx, key);
        };
        /**
         * @description
         * Check if the current user has permission to read a field.
         * @since 3.5.0
         */
        SettingsStoreService_1.prototype.hasReadPermission = function (ctx, key) {
            // Get field config first - let validation errors (like unregistered keys) bubble up
            var fieldConfig = this.getFieldConfig(key);
            try {
                var requiredPermissions = fieldConfig.requiresPermission;
                if (requiredPermissions) {
                    if (this.isReadWritePermissionObject(requiredPermissions)) {
                        var readPerms = requiredPermissions.read;
                        if (readPerms) {
                            return this.checkSimplePermissions(ctx, readPerms);
                        }
                        // If no read permission specified but write is, fall back to authenticated
                        if (requiredPermissions.write) {
                            return ctx.userHasPermissions([generated_types_1.Permission.Authenticated]);
                        }
                    }
                    else {
                        return this.checkSimplePermissions(ctx, requiredPermissions);
                    }
                }
                return ctx.userHasPermissions([generated_types_1.Permission.Authenticated]);
            }
            catch (error) {
                // Only catch permission evaluation errors, not field validation errors
                vendure_logger_1.Logger.error("Error evaluating read permissions for settings store key \"".concat(key, "\": ").concat(JSON.stringify(error)));
                return false;
            }
        };
        /**
         * @description
         * Check if the current user has permission to write a field.
         * @since 3.5.0
         */
        SettingsStoreService_1.prototype.hasWritePermission = function (ctx, key) {
            var fieldConfig = this.getFieldConfig(key); // Let validation errors bubble up
            try {
                var requiredPermissions = fieldConfig.requiresPermission;
                if (requiredPermissions) {
                    if (this.isReadWritePermissionObject(requiredPermissions)) {
                        var writePerms = requiredPermissions.write;
                        if (writePerms) {
                            return this.checkSimplePermissions(ctx, writePerms);
                        }
                        // If no write permission specified but read is, fall back to authenticated
                        if (requiredPermissions.read) {
                            return ctx.userHasPermissions([generated_types_1.Permission.Authenticated]);
                        }
                    }
                    else {
                        return this.checkSimplePermissions(ctx, requiredPermissions);
                    }
                }
                return ctx.userHasPermissions([generated_types_1.Permission.Authenticated]);
            }
            catch (error) {
                vendure_logger_1.Logger.error("Error evaluating write permissions for settings store key \"".concat(key, "\": ").concat(JSON.stringify(error)));
                return false;
            }
        };
        /**
         * @description
         * Helper method to check if a permission configuration is a read/write object.
         */
        SettingsStoreService_1.prototype.isReadWritePermissionObject = function (permissions) {
            return (typeof permissions === 'object' &&
                !Array.isArray(permissions) &&
                ('read' in permissions || 'write' in permissions));
        };
        /**
         * @description
         * Helper method to check simple permissions (single permission, array, or string).
         */
        SettingsStoreService_1.prototype.checkSimplePermissions = function (ctx, permissions) {
            var permissionArray = Array.isArray(permissions) ? permissions : [permissions];
            return ctx.userHasPermissions(permissionArray);
        };
        /**
         * @description
         * Returns true if the settings field has the `readonly: true` configuration.
         */
        SettingsStoreService_1.prototype.isReadonly = function (key) {
            try {
                var fieldConfig = this.getFieldConfig(key);
                return fieldConfig.readonly === true;
            }
            catch (error) {
                return false;
            }
        };
        /**
         * This unfortunate workaround is here because in the first version of the SettingsStore we have the
         * ctx arg last, which goes against all patterns in the rest of the code base. In v3.4.2 we overload
         * the methods to allow the correct ordering, and deprecate the original order.
         */
        SettingsStoreService_1.prototype.determineCtx = function (a, b) {
            var ctx = a instanceof request_context_1.RequestContext ? a : b;
            var other = a instanceof request_context_1.RequestContext ? b : a;
            return { other: other, ctx: ctx };
        };
        return SettingsStoreService_1;
    }());
    __setFunctionName(_classThis, "SettingsStoreService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SettingsStoreService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SettingsStoreService = _classThis;
}();
exports.SettingsStoreService = SettingsStoreService;
