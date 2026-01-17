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
exports.EntityDuplicatorService = void 0;
var common_1 = require("@nestjs/common");
var generated_graphql_admin_errors_1 = require("../../../common/error/generated-graphql-admin-errors");
var vendure_logger_1 = require("../../../config/logger/vendure-logger");
/**
 * @description
 * This service is used to duplicate entities using one of the configured
 * {@link EntityDuplicator} functions.
 *
 * @docsCategory service-helpers
 * @since 2.2.0
 */
var EntityDuplicatorService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EntityDuplicatorService = _classThis = /** @class */ (function () {
        function EntityDuplicatorService_1(configService, configArgService, connection) {
            this.configService = configService;
            this.configArgService = configArgService;
            this.connection = connection;
        }
        /**
         * @description
         * Returns all configured {@link EntityDuplicator} definitions.
         */
        EntityDuplicatorService_1.prototype.getEntityDuplicators = function (ctx) {
            return this.configArgService.getDefinitions('EntityDuplicator').map(function (x) { return (__assign(__assign({}, x.toGraphQlType(ctx)), { __typename: 'EntityDuplicatorDefinition', forEntities: x.forEntities, requiresPermission: x.requiresPermission })); });
        };
        /**
         * @description
         * Duplicates an entity using the specified {@link EntityDuplicator}. The duplication is performed
         * within a transaction, so if an error occurs, the transaction will be rolled back.
         */
        EntityDuplicatorService_1.prototype.duplicateEntity = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var duplicator, parsedInput;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            duplicator = this.configService.entityOptions.entityDuplicators.find(function (s) { return s.forEntities.includes(input.entityName) && s.code === input.duplicatorInput.code; });
                            if (!duplicator) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.DuplicateEntityError({
                                        duplicationError: ctx.translate("message.entity-duplication-no-strategy-found", {
                                            entityName: input.entityName,
                                            code: input.duplicatorInput.code,
                                        }),
                                    })];
                            }
                            // Check permissions
                            if (duplicator.requiresPermission.length === 0 ||
                                !ctx.userHasPermissions(duplicator.requiresPermission)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.DuplicateEntityError({
                                        duplicationError: ctx.translate("message.entity-duplication-no-permission"),
                                    })];
                            }
                            parsedInput = this.configArgService.parseInput('EntityDuplicator', input.duplicatorInput);
                            return [4 /*yield*/, this.connection.withTransaction(ctx, function (innerCtx) { return __awaiter(_this, void 0, void 0, function () {
                                    var newEntity, e_1;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 2, , 4]);
                                                return [4 /*yield*/, duplicator.duplicate({
                                                        ctx: innerCtx,
                                                        entityName: input.entityName,
                                                        id: input.entityId,
                                                        args: parsedInput.args,
                                                    })];
                                            case 1:
                                                newEntity = _b.sent();
                                                return [2 /*return*/, { newEntityId: newEntity.id }];
                                            case 2:
                                                e_1 = _b.sent();
                                                return [4 /*yield*/, this.connection.rollBackTransaction(innerCtx)];
                                            case 3:
                                                _b.sent();
                                                vendure_logger_1.Logger.error(e_1.message, undefined, e_1.stack);
                                                return [2 /*return*/, new generated_graphql_admin_errors_1.DuplicateEntityError({
                                                        duplicationError: (_a = e_1.message) !== null && _a !== void 0 ? _a : e_1.toString(),
                                                    })];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return EntityDuplicatorService_1;
    }());
    __setFunctionName(_classThis, "EntityDuplicatorService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EntityDuplicatorService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EntityDuplicatorService = _classThis;
}();
exports.EntityDuplicatorService = EntityDuplicatorService;
