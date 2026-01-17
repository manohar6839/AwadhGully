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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
exports.internal_setRequestContext = internal_setRequestContext;
exports.internal_getRequestContext = internal_getRequestContext;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var constants_1 = require("../../common/constants");
var utils_1 = require("../../common/utils");
var channel_entity_1 = require("../../entity/channel/channel.entity");
/**
 * @description
 * This function is used to set the {@link RequestContext} on the `req` object. This is the underlying
 * mechanism by which we are able to access the `RequestContext` from different places.
 *
 * For example, here is a diagram to show how, in an incoming API request, we are able to store
 * and retrieve the `RequestContext` in a resolver:
 * ```
 * - query { product }
 * |
 * - AuthGuard.canActivate()
 * |  | creates a `RequestContext`, stores it on `req`
 * |
 * - product() resolver
 *    | @Ctx() decorator fetching `RequestContext` from `req`
 * ```
 *
 * We named it this way to discourage usage outside the framework internals.
 */
function internal_setRequestContext(req, ctx, executionContext) {
    var _a;
    // If we have access to the `ExecutionContext`, it means we are able to bind
    // the `ctx` object to the specific "handler", i.e. the resolver function (for GraphQL)
    // or controller (for REST).
    var item;
    if (executionContext && typeof executionContext.getHandler === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        var map = req[constants_1.REQUEST_CONTEXT_MAP_KEY] || new Map();
        item = map.get(executionContext.getHandler());
        var ctxHasTransaction = Object.getOwnPropertySymbols(ctx).includes(constants_1.TRANSACTION_MANAGER_KEY);
        if (item) {
            item.default = (_a = item.default) !== null && _a !== void 0 ? _a : ctx;
            if (ctxHasTransaction) {
                item.withTransactionManager = ctx;
            }
        }
        else {
            item = {
                default: ctx,
                withTransactionManager: ctxHasTransaction ? ctx : undefined,
            };
        }
        map.set(executionContext.getHandler(), item);
        req[constants_1.REQUEST_CONTEXT_MAP_KEY] = map;
    }
    // We also bind to a shared key so that we can access the `ctx` object
    // later even if we don't have a reference to the `ExecutionContext`
    req[constants_1.REQUEST_CONTEXT_KEY] = item !== null && item !== void 0 ? item : {
        default: ctx,
    };
}
/**
 * @description
 * Gets the {@link RequestContext} from the `req` object. See {@link internal_setRequestContext}
 * for more details on this mechanism.
 */
function internal_getRequestContext(req, executionContext) {
    var _a, _b;
    var item;
    if (executionContext && typeof executionContext.getHandler === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        var map = req[constants_1.REQUEST_CONTEXT_MAP_KEY];
        item = map === null || map === void 0 ? void 0 : map.get(executionContext.getHandler());
        // If we have a ctx associated with the current handler (resolver function), we
        // return it. Otherwise, we fall back to the shared key which will be there.
        if (item) {
            return item.withTransactionManager || item.default;
        }
    }
    if (!item) {
        item = req[constants_1.REQUEST_CONTEXT_KEY];
    }
    var transactionalCtx = (item === null || item === void 0 ? void 0 : item.withTransactionManager) &&
        ((_b = (_a = item.withTransactionManager[constants_1.TRANSACTION_MANAGER_KEY]) === null || _a === void 0 ? void 0 : _a.queryRunner) === null || _b === void 0 ? void 0 : _b.isReleased) === false
        ? item.withTransactionManager
        : undefined;
    return transactionalCtx || item.default;
}
/**
 * @description
 * The RequestContext holds information relevant to the current request, which may be
 * required at various points of the stack.
 *
 * It is a good practice to inject the RequestContext (using the {@link Ctx} decorator) into
 * _all_ resolvers & REST handler, and then pass it through to the service layer.
 *
 * This allows the service layer to access information about the current user, the active language,
 * the active Channel, and so on. In addition, the {@link TransactionalConnection} relies on the
 * presence of the RequestContext object in order to correctly handle per-request database transactions.
 *
 * The RequestContext also provides mechanisms for managing the database replication mode via the
 * `setReplicationMode` method and the `replicationMode` getter. This allows for finer control
 * over whether database queries within the context should be executed against the master or a replica
 * database, which can be particularly useful in distributed database environments.
 *
 * @example
 * ```ts
 * \@Query()
 * myQuery(\@Ctx() ctx: RequestContext) {
 *   return this.myService.getData(ctx);
 * }
 * ```
 *
 * @example
 * ```ts
 * \@Query()
 * myMutation(\@Ctx() ctx: RequestContext) {
 *   ctx.setReplicationMode('master');
 *   return this.myService.getData(ctx);
 * }
 * ```
 * @docsCategory request
 */
var RequestContext = /** @class */ (function () {
    /**
     * @internal
     */
    function RequestContext(options) {
        var req = options.req, apiType = options.apiType, channel = options.channel, session = options.session, languageCode = options.languageCode, currencyCode = options.currencyCode, translationFn = options.translationFn;
        this._req = req;
        this._apiType = apiType;
        this._channel = channel;
        this._session = session;
        this._languageCode = languageCode || (channel && channel.defaultLanguageCode);
        this._currencyCode = currencyCode || (channel && channel.defaultCurrencyCode);
        this._isAuthorized = options.isAuthorized;
        this._authorizedAsOwnerOnly = options.authorizedAsOwnerOnly;
        this._translationFn = translationFn || (function (key) { return key; });
    }
    /**
     * @description
     * Creates an "empty" RequestContext object. This is only intended to be used
     * when a service method must be called outside the normal request-response
     * cycle, e.g. when programmatically populating data. Usually a better alternative
     * is to use the {@link RequestContextService} `create()` method, which allows more control
     * over the resulting RequestContext object.
     */
    RequestContext.empty = function () {
        return new RequestContext({
            apiType: 'admin',
            authorizedAsOwnerOnly: false,
            channel: new channel_entity_1.Channel(),
            isAuthorized: true,
        });
    };
    /**
     * @description
     * Creates a new RequestContext object from a serialized object created by the
     * `serialize()` method.
     */
    RequestContext.deserialize = function (ctxObject) {
        var _a;
        return new RequestContext({
            req: ctxObject._req,
            apiType: ctxObject._apiType,
            channel: new channel_entity_1.Channel(ctxObject._channel),
            session: __assign(__assign({}, ctxObject._session), { expires: ((_a = ctxObject._session) === null || _a === void 0 ? void 0 : _a.expires) && new Date(ctxObject._session.expires) }),
            languageCode: ctxObject._languageCode,
            isAuthorized: ctxObject._isAuthorized,
            authorizedAsOwnerOnly: ctxObject._authorizedAsOwnerOnly,
        });
    };
    /**
     * @description
     * Returns `true` if there is an active Session & User associated with this request,
     * and that User has **at least one** of the specified permissions on the active Channel.
     *
     * This method uses OR logic - it checks if the user has ANY of the given permissions,
     * not ALL of them. For AND logic, use {@link userHasAllPermissions}.
     *
     * @example
     * ```ts
     * // Returns true if user has ReadProduct OR ReadCatalog
     * ctx.userHasPermissions([Permission.ReadProduct, Permission.ReadCatalog]);
     * ```
     */
    RequestContext.prototype.userHasPermissions = function (permissions) {
        var _this = this;
        var _a;
        var user = (_a = this.session) === null || _a === void 0 ? void 0 : _a.user;
        if (!user || !this.channelId) {
            return false;
        }
        var permissionsOnChannel = user.channelPermissions.find(function (c) { return (0, utils_1.idsAreEqual)(c.id, _this.channelId); });
        if (permissionsOnChannel) {
            return this.arraysIntersect(permissionsOnChannel.permissions, permissions);
        }
        return false;
    };
    /**
     * @description
     * Returns `true` if there is an active Session & User associated with this request,
     * and that User has **all** of the specified permissions on the active Channel.
     *
     * This method uses AND logic - it checks if the user has EVERY one of the given permissions.
     * For OR logic (any permission), use {@link userHasPermissions}.
     *
     * @example
     * ```ts
     * // Returns true only if user has BOTH ReadProduct AND UpdateProduct
     * ctx.userHasAllPermissions([Permission.ReadProduct, Permission.UpdateProduct]);
     * ```
     *
     * @since 3.6.0
     */
    RequestContext.prototype.userHasAllPermissions = function (permissions) {
        var _this = this;
        var _a;
        var user = (_a = this.session) === null || _a === void 0 ? void 0 : _a.user;
        if (!user || !this.channelId) {
            return false;
        }
        var permissionsOnChannel = user.channelPermissions.find(function (c) { return (0, utils_1.idsAreEqual)(c.id, _this.channelId); });
        if (permissionsOnChannel) {
            return permissions.every(function (permission) { return permissionsOnChannel.permissions.includes(permission); });
        }
        return false;
    };
    /**
     * @description
     * Serializes the RequestContext object into a JSON-compatible simple object.
     * This is useful when you need to send a RequestContext object to another
     * process, e.g. to pass it to the Job Queue via the {@link JobQueueService}.
     */
    RequestContext.prototype.serialize = function () {
        var serializableThis = Object.assign({}, this);
        if (this._req) {
            serializableThis._req = this.shallowCloneRequestObject(this._req);
        }
        return JSON.parse(JSON.stringify(serializableThis));
    };
    /**
     * @description
     * Creates a shallow copy of the RequestContext instance. This means that
     * mutations to the copy itself will not affect the original, but deep mutations
     * (e.g. copy.channel.code = 'new') *will* also affect the original.
     */
    RequestContext.prototype.copy = function () {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    };
    Object.defineProperty(RequestContext.prototype, "req", {
        /**
         * @description
         * The raw Express request object.
         */
        get: function () {
            return this._req;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "apiType", {
        /**
         * @description
         * Signals which API this request was received by, e.g. `admin` or `shop`.
         */
        get: function () {
            return this._apiType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "channel", {
        /**
         * @description
         * The active {@link Channel} of this request.
         */
        get: function () {
            return this._channel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "channelId", {
        get: function () {
            return this._channel.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "languageCode", {
        get: function () {
            return this._languageCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "currencyCode", {
        get: function () {
            return this._currencyCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "session", {
        get: function () {
            return this._session;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "activeUserId", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "isAuthorized", {
        /**
         * @description
         * True if the current session is authorized to access the current resolver method.
         *
         * @deprecated Use `userHasPermissions()` method instead.
         */
        get: function () {
            return this._isAuthorized;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestContext.prototype, "authorizedAsOwnerOnly", {
        /**
         * @description
         * True if the current anonymous session is only authorized to operate on entities that
         * are owned by the current session.
         */
        get: function () {
            return this._authorizedAsOwnerOnly;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description
     * Translate the given i18n key
     */
    RequestContext.prototype.translate = function (key, variables) {
        try {
            return this._translationFn(key, variables);
        }
        catch (e) {
            return "Translation format error: ".concat(JSON.stringify(e.message), "). Original key: ").concat(key);
        }
    };
    /**
     * Returns true if any element of arr1 appears in arr2.
     */
    RequestContext.prototype.arraysIntersect = function (arr1, arr2) {
        return arr1.reduce(function (intersects, role) {
            return intersects || arr2.includes(role);
        }, false);
    };
    /**
     * The Express "Request" object is huge and contains many circular
     * references. We will preserve just a subset of the whole, by preserving
     * only the serializable properties up to 2 levels deep.
     * @private
     */
    RequestContext.prototype.shallowCloneRequestObject = function (req) {
        function copySimpleFieldsToDepth(target, maxDepth, depth) {
            if (depth === void 0) { depth = 0; }
            var result = {};
            var _loop_1 = function (key) {
                if (key === 'host' && depth === 0) {
                    return "continue";
                }
                var val;
                try {
                    val = target[key];
                }
                catch (e) {
                    val = String(e);
                }
                if (Array.isArray(val)) {
                    depth++;
                    result[key] = val.map(function (v) {
                        if (!(0, shared_utils_1.isObject)(v) && typeof val !== 'function') {
                            return v;
                        }
                        else {
                            return copySimpleFieldsToDepth(v, maxDepth, depth);
                        }
                    });
                    depth--;
                }
                else if (!(0, shared_utils_1.isObject)(val) && typeof val !== 'function') {
                    result[key] = val;
                }
                else if (depth < maxDepth) {
                    depth++;
                    result[key] = copySimpleFieldsToDepth(val, maxDepth, depth);
                    depth--;
                }
            };
            // eslint-disable-next-line guard-for-in
            for (var key in target) {
                _loop_1(key);
            }
            return result;
        }
        return copySimpleFieldsToDepth(req, 1);
    };
    /**
     * @description
     * Sets the replication mode for the current RequestContext. This mode determines whether the operations
     * within this context should interact with the master database or a replica. Use this method to explicitly
     * define the replication mode for the context.
     *
     * @param mode - The replication mode to be set (e.g., 'master' or 'replica').
     */
    RequestContext.prototype.setReplicationMode = function (mode) {
        this._replicationMode = mode;
    };
    Object.defineProperty(RequestContext.prototype, "replicationMode", {
        /**
         * @description
         * Gets the current replication mode of the RequestContext. If no replication mode has been set,
         * it returns `undefined`. This property indicates whether the context is configured to interact with
         * the master database or a replica.
         *
         * @returns The current replication mode, or `undefined` if none is set.
         */
        get: function () {
            return this._replicationMode;
        },
        enumerable: false,
        configurable: true
    });
    return RequestContext;
}());
exports.RequestContext = RequestContext;
