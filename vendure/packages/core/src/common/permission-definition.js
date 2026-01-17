"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RwPermissionDefinition = exports.CrudPermissionDefinition = exports.PermissionDefinition = void 0;
/**
 * @description
 * Defines a new Permission with which to control access to GraphQL resolvers & REST controllers.
 * Used in conjunction with the {@link Allow} decorator (see example below).
 *
 * **Note:** To define CRUD permissions, use the {@link CrudPermissionDefinition}.
 *
 * @example
 * ```ts
 * export const sync = new PermissionDefinition({
 *   name: 'SyncInventory',
 *   description: 'Allows syncing stock levels via Admin API'
 * });
 * ```
 *
 * ```ts
 * const config: VendureConfig = {
 *   authOptions: {
 *     customPermissions: [sync],
 *   },
 * }
 * ```
 *
 * ```ts
 * \@Resolver()
 * export class ExternalSyncResolver {
 *
 *   \@Allow(sync.Permission)
 *   \@Mutation()
 *   syncStockLevels() {
 *     // ...
 *   }
 * }
 * ```
 * @docsCategory auth
 * @docsPage PermissionDefinition
 * @docsWeight 0
 */
var PermissionDefinition = /** @class */ (function () {
    function PermissionDefinition(config) {
        this.config = config;
    }
    /** @internal */
    PermissionDefinition.prototype.getMetadata = function () {
        var _a = this.config, name = _a.name, description = _a.description, assignable = _a.assignable, internal = _a.internal;
        return [
            {
                name: name,
                description: description || "Grants permissions on ".concat(name, " operations"),
                assignable: assignable !== null && assignable !== void 0 ? assignable : true,
                internal: internal !== null && internal !== void 0 ? internal : false,
            },
        ];
    };
    Object.defineProperty(PermissionDefinition.prototype, "Permission", {
        /**
         * @description
         * Returns the permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    return PermissionDefinition;
}());
exports.PermissionDefinition = PermissionDefinition;
/**
 * @description
 * Defines a set of CRUD Permissions for the given name, i.e. a `name` of 'Wishlist' will create
 * 4 Permissions: 'CreateWishlist', 'ReadWishlist', 'UpdateWishlist' & 'DeleteWishlist'.
 *
 * @example
 * ```ts
 * export const wishlist = new CrudPermissionDefinition('Wishlist');
 * ```
 *
 * ```ts
 * const config: VendureConfig = {
 *   authOptions: {
 *     customPermissions: [wishlist],
 *   },
 * }
 * ```
 *
 * ```ts
 * \@Resolver()
 * export class WishlistResolver {
 *
 *   \@Allow(wishlist.Create)
 *   \@Mutation()
 *   createWishlist() {
 *     // ...
 *   }
 * }
 * ```
 *
 * @docsCategory auth
 * @docsPage PermissionDefinition
 * @docsWeight 1
 */
var CrudPermissionDefinition = /** @class */ (function (_super) {
    __extends(CrudPermissionDefinition, _super);
    function CrudPermissionDefinition(name, descriptionFn) {
        var _this = _super.call(this, { name: name }) || this;
        _this.descriptionFn = descriptionFn;
        return _this;
    }
    /** @internal */
    CrudPermissionDefinition.prototype.getMetadata = function () {
        var _this = this;
        return ['Create', 'Read', 'Update', 'Delete'].map(function (operation) { return ({
            name: "".concat(operation).concat(_this.config.name),
            description: typeof _this.descriptionFn === 'function'
                ? _this.descriptionFn(operation.toLocaleLowerCase())
                : "Grants permission to ".concat(operation.toLocaleLowerCase(), " ").concat(_this.config.name),
            assignable: true,
            internal: false,
        }); });
    };
    Object.defineProperty(CrudPermissionDefinition.prototype, "Create", {
        /**
         * @description
         * Returns the 'Create' CRUD permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return "Create".concat(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrudPermissionDefinition.prototype, "Read", {
        /**
         * @description
         * Returns the 'Read' CRUD permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return "Read".concat(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrudPermissionDefinition.prototype, "Update", {
        /**
         * @description
         * Returns the 'Update' CRUD permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return "Update".concat(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrudPermissionDefinition.prototype, "Delete", {
        /**
         * @description
         * Returns the 'Delete' CRUD permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return "Delete".concat(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    return CrudPermissionDefinition;
}(PermissionDefinition));
exports.CrudPermissionDefinition = CrudPermissionDefinition;
/**
 * @description
 * Defines a set of Read-Write Permissions for the given name, i.e. a `name` of 'DashboardSavedViews' will create
 * 2 Permissions: 'ReadDashboardSavedViews' and 'WriteDashboardSavedViews'.
 *
 * @example
 * ```ts
 * export const dashboardSavedViews = new RwPermissionDefinition('DashboardSavedViews');
 * ```
 *
 * ```ts
 * const config: VendureConfig = {
 *   authOptions: {
 *     customPermissions: [dashboardSavedViews],
 *   },
 * }
 * ```
 *
 * ```ts
 * \@Resolver()
 * export class DashboardResolver {
 *
 *   \@Allow(dashboardSavedViews.Read)
 *   \@Query()
 *   getDashboardSavedViews() {
 *     // ...
 *   }
 *
 *   \@Allow(dashboardSavedViews.Write)
 *   \@Mutation()
 *   saveDashboardView() {
 *     // ...
 *   }
 * }
 * ```
 *
 * @docsCategory auth
 * @docsPage PermissionDefinition
 * @docsWeight 2
 * @since 3.5.0
 */
var RwPermissionDefinition = /** @class */ (function (_super) {
    __extends(RwPermissionDefinition, _super);
    function RwPermissionDefinition(name, descriptionFn) {
        var _this = _super.call(this, { name: name }) || this;
        _this.descriptionFn = descriptionFn;
        return _this;
    }
    /** @internal */
    RwPermissionDefinition.prototype.getMetadata = function () {
        var _this = this;
        return ['Read', 'Write'].map(function (operation) { return ({
            name: "".concat(operation).concat(_this.config.name),
            description: typeof _this.descriptionFn === 'function'
                ? _this.descriptionFn(operation.toLocaleLowerCase())
                : "Grants permission to ".concat(operation.toLocaleLowerCase(), " ").concat(_this.config.name),
            assignable: true,
            internal: false,
        }); });
    };
    Object.defineProperty(RwPermissionDefinition.prototype, "Read", {
        /**
         * @description
         * Returns the 'Read' permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return "Read".concat(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RwPermissionDefinition.prototype, "Write", {
        /**
         * @description
         * Returns the 'Write' permission defined by this definition, for use in the
         * {@link Allow} decorator.
         */
        get: function () {
            return "Write".concat(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    return RwPermissionDefinition;
}(PermissionDefinition));
exports.RwPermissionDefinition = RwPermissionDefinition;
