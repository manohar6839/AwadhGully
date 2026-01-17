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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalConnection = void 0;
var common_1 = require("@nestjs/common");
var request_context_1 = require("../api/common/request-context");
var constants_1 = require("../common/constants");
var errors_1 = require("../common/error/errors");
var tree_relations_qb_joiner_1 = require("../service/helpers/utils/tree-relations-qb-joiner");
var find_options_object_to_array_1 = require("./find-options-object-to-array");
/**
 * @description
 * The TransactionalConnection is a wrapper around the TypeORM `Connection` object which works in conjunction
 * with the {@link Transaction} decorator to implement per-request transactions. All services which access the
 * database should use this class rather than the raw TypeORM connection, to ensure that db changes can be
 * easily wrapped in transactions when required.
 *
 * The service layer does not need to know about the scope of a transaction, as this is covered at the
 * API by the use of the `Transaction` decorator.
 *
 * @docsCategory data-access
 */
var TransactionalConnection = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionalConnection = _classThis = /** @class */ (function () {
        function TransactionalConnection_1(dataSource, transactionWrapper) {
            this.dataSource = dataSource;
            this.transactionWrapper = transactionWrapper;
        }
        Object.defineProperty(TransactionalConnection_1.prototype, "rawConnection", {
            /**
             * @description
             * The plain TypeORM Connection object. Should be used carefully as any operations
             * performed with this connection will not be performed within any outer
             * transactions.
             */
            get: function () {
                return this.dataSource;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description
         * Returns a TypeORM repository. Depending on the parameters passed, it will either be transaction-aware
         * or not. If `RequestContext` is provided, the repository is bound to any ongoing transactions. The
         * `options` parameter allows further customization, such as selecting the replication mode (e.g., 'master').
         *
         * @param ctxOrTarget - Either the RequestContext, which binds the repository to ongoing transactions, or the entity type/schema.
         * @param maybeTarget - The entity type or schema for which the repository is returned (if `ctxOrTarget` is a RequestContext).
         * @param options - Additional options for configuring the repository, such as the `replicationMode`.
         *
         * @returns A TypeORM repository for the specified entity type.
         */
        TransactionalConnection_1.prototype.getRepository = function (ctxOrTarget, maybeTarget, options) {
            if (ctxOrTarget instanceof request_context_1.RequestContext) {
                var transactionManager = this.getTransactionManager(ctxOrTarget);
                if (transactionManager) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return transactionManager.getRepository(maybeTarget);
                }
                if (ctxOrTarget.replicationMode === 'master' || (options === null || options === void 0 ? void 0 : options.replicationMode) === 'master') {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return this.dataSource.createQueryRunner('master').manager.getRepository(maybeTarget);
                }
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return this.rawConnection.getRepository(maybeTarget);
            }
            else {
                if ((options === null || options === void 0 ? void 0 : options.replicationMode) === 'master') {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return this.dataSource
                        .createQueryRunner(options.replicationMode)
                        .manager.getRepository(maybeTarget);
                }
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return this.rawConnection.getRepository(ctxOrTarget !== null && ctxOrTarget !== void 0 ? ctxOrTarget : maybeTarget);
            }
        };
        TransactionalConnection_1.prototype.withTransaction = function (ctxOrWork, maybeWork) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, work;
                return __generator(this, function (_a) {
                    if (ctxOrWork instanceof request_context_1.RequestContext) {
                        ctx = ctxOrWork;
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        work = maybeWork;
                    }
                    else {
                        ctx = request_context_1.RequestContext.empty();
                        work = ctxOrWork;
                    }
                    return [2 /*return*/, this.transactionWrapper.executeInTransaction(ctx, work, 'auto', undefined, this.rawConnection)];
                });
            });
        };
        /**
         * @description
         * Manually start a transaction if one is not already in progress. This method should be used in
         * conjunction with the `'manual'` mode of the {@link Transaction} decorator.
         */
        TransactionalConnection_1.prototype.startTransaction = function (ctx, isolationLevel) {
            return __awaiter(this, void 0, void 0, function () {
                var transactionManager;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            transactionManager = this.getTransactionManager(ctx);
                            if (!(((_a = transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isTransactionActive) === false)) return [3 /*break*/, 2];
                            return [4 /*yield*/, transactionManager.queryRunner.startTransaction(isolationLevel)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Manually commits any open transaction. Should be very rarely needed, since the {@link Transaction} decorator
         * and the internal TransactionInterceptor take care of this automatically. Use-cases include situations
         * in which the worker thread needs to access changes made in the current transaction, or when using the
         * Transaction decorator in manual mode.
         */
        TransactionalConnection_1.prototype.commitOpenTransaction = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var transactionManager;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            transactionManager = this.getTransactionManager(ctx);
                            if (!((_a = transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isTransactionActive)) return [3 /*break*/, 2];
                            return [4 /*yield*/, transactionManager.queryRunner.commitTransaction()];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Manually rolls back any open transaction. Should be very rarely needed, since the {@link Transaction} decorator
         * and the internal TransactionInterceptor take care of this automatically. Use-cases include when using the
         * Transaction decorator in manual mode.
         */
        TransactionalConnection_1.prototype.rollBackTransaction = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var transactionManager;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            transactionManager = this.getTransactionManager(ctx);
                            if (!((_a = transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isTransactionActive)) return [3 /*break*/, 2];
                            return [4 /*yield*/, transactionManager.queryRunner.rollbackTransaction()];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Finds an entity of the given type by ID, or throws an `EntityNotFoundError` if none
         * is found.
         */
        TransactionalConnection_1.prototype.getEntityOrThrow = function (ctx_1, entityType_1, id_1) {
            return __awaiter(this, arguments, void 0, function (ctx, entityType, id, options) {
                var retries, retryDelay, err, retriesInt, delay_1, attempt, result, e_1;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            retries = options.retries, retryDelay = options.retryDelay;
                            if (!(retries == null || retries <= 0)) return [3 /*break*/, 1];
                            return [2 /*return*/, this.getEntityOrThrowInternal(ctx, entityType, id, options)];
                        case 1:
                            err = void 0;
                            retriesInt = Math.ceil(retries);
                            delay_1 = Math.ceil(Math.max(retryDelay || 25, 1));
                            attempt = 0;
                            _a.label = 2;
                        case 2:
                            if (!(attempt < retriesInt)) return [3 /*break*/, 9];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 8]);
                            return [4 /*yield*/, this.getEntityOrThrowInternal(ctx, entityType, id, options)];
                        case 4:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 5:
                            e_1 = _a.sent();
                            err = e_1;
                            if (!(attempt < retriesInt - 1)) return [3 /*break*/, 7];
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [3 /*break*/, 8];
                        case 8:
                            attempt++;
                            return [3 /*break*/, 2];
                        case 9: throw err;
                    }
                });
            });
        };
        TransactionalConnection_1.prototype.getEntityOrThrowInternal = function (ctx_1, entityType_1, id_1) {
            return __awaiter(this, arguments, void 0, function (ctx, entityType, id, options) {
                var entity, channelId, optionsWithoutChannelId, optionsWithId;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options.channelId != null)) return [3 /*break*/, 2];
                            channelId = options.channelId, optionsWithoutChannelId = __rest(options, ["channelId"]);
                            return [4 /*yield*/, this.findOneInChannel(ctx, entityType, id, options.channelId, optionsWithoutChannelId)];
                        case 1:
                            entity = _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            optionsWithId = __assign(__assign({}, options), { where: __assign(__assign({}, (options.where || {})), { id: id }) });
                            return [4 /*yield*/, this.getRepository(ctx, entityType)
                                    .findOne(optionsWithId)
                                    .then(function (result) { return result !== null && result !== void 0 ? result : undefined; })];
                        case 3:
                            entity = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!entity ||
                                (entity.hasOwnProperty('deletedAt') &&
                                    entity.deletedAt !== null &&
                                    options.includeSoftDeleted !== true)) {
                                throw new errors_1.EntityNotFoundError(entityType.name, id);
                            }
                            return [2 /*return*/, entity];
                    }
                });
            });
        };
        /**
         * @description
         * Like the TypeOrm `Repository.findOne()` method, but limits the results to
         * the given Channel.
         */
        TransactionalConnection_1.prototype.findOneInChannel = function (ctx, entity, id, channelId, options) {
            if (options === void 0) { options = {}; }
            var qb = this.getRepository(ctx, entity).createQueryBuilder('entity');
            if (options.relations) {
                var joinedRelations_1 = (0, tree_relations_qb_joiner_1.joinTreeRelationsDynamically)(qb, entity, options.relations);
                // Remove any relations which are related to the 'collection' tree, as these are handled separately
                // to avoid duplicate joins.
                options.relations = (0, find_options_object_to_array_1.findOptionsObjectToArray)(options.relations).filter(function (relationPath) { return !joinedRelations_1.has(relationPath); });
            }
            qb.setFindOptions(__assign({ relationLoadStrategy: 'query' }, options));
            qb.leftJoin('entity.channels', '__channel')
                .andWhere('entity.id = :id', { id: id })
                .andWhere('__channel.id = :channelId', { channelId: channelId });
            return qb.getOne().then(function (result) {
                return result !== null && result !== void 0 ? result : undefined;
            });
        };
        /**
         * @description
         * Like the TypeOrm `Repository.findByIds()` method, but limits the results to
         * the given Channel.
         */
        TransactionalConnection_1.prototype.findByIdsInChannel = function (ctx, entity, ids, channelId, options) {
            // the syntax described in https://github.com/typeorm/typeorm/issues/1239#issuecomment-366955628
            // breaks if the array is empty
            if (ids.length === 0) {
                return Promise.resolve([]);
            }
            var qb = this.getRepository(ctx, entity).createQueryBuilder('entity');
            if (Array.isArray(options.relations) && options.relations.length > 0) {
                var joinedRelations_2 = (0, tree_relations_qb_joiner_1.joinTreeRelationsDynamically)(qb, entity, options.relations);
                // Remove any relations which are related to the 'collection' tree, as these are handled separately
                // to avoid duplicate joins.
                options.relations = options.relations.filter(function (relationPath) { return !joinedRelations_2.has(relationPath); });
            }
            qb.setFindOptions(__assign({ relationLoadStrategy: 'query' }, options));
            return qb
                .leftJoin('entity.channels', 'channel')
                .andWhere('entity.id IN (:...ids)', { ids: ids })
                .andWhere('channel.id = :channelId', { channelId: channelId })
                .getMany();
        };
        TransactionalConnection_1.prototype.getTransactionManager = function (ctx) {
            return ctx[constants_1.TRANSACTION_MANAGER_KEY];
        };
        return TransactionalConnection_1;
    }());
    __setFunctionName(_classThis, "TransactionalConnection");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionalConnection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionalConnection = _classThis;
}();
exports.TransactionalConnection = TransactionalConnection;
