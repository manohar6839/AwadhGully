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
exports.EntityDuplicator = void 0;
var configurable_operation_1 = require("../../common/configurable-operation");
/**
 * @description
 * An EntityDuplicator is used to define the logic for duplicating entities when the `duplicateEntity` mutation is called.
 * This allows you to add support for duplication of both core and custom entities.
 *
 * @example
 * ```ts title=src/config/custom-collection-duplicator.ts
 * import { Collection, LanguageCode, Permission
 *   EntityDuplicator, TransactionalConnection, CollectionService } from '\@vendure/core';
 *
 * let collectionService: CollectionService;
 * let connection: TransactionalConnection;
 *
 * // This is just an example - we already ship with a built-in duplicator for Collections.
 * const customCollectionDuplicator = new EntityDuplicator({
 *     code: 'custom-collection-duplicator',
 *     description: [{ languageCode: LanguageCode.en, value: 'Custom collection duplicator' }],
 *     args: {
 *         throwError: {
 *             type: 'boolean',
 *             defaultValue: false,
 *         },
 *     },
 *     forEntities: ['Collection'],
 *     requiresPermission: [Permission.UpdateCollection],
 *     init(injector) {
 *         collectionService = injector.get(CollectionService);
 *         connection = injector.get(TransactionalConnection);
 *     },
 *     duplicate: async input => {
 *         const { ctx, id, args } = input;
 *
 *         const original = await connection.getEntityOrThrow(ctx, Collection, id, {
 *             relations: {
 *                 assets: true,
 *                 featuredAsset: true,
 *             },
 *         });
 *         const newCollection = await collectionService.create(ctx, {
 *             isPrivate: original.isPrivate,
 *             customFields: original.customFields,
 *             assetIds: original.assets.map(a => a.id),
 *             featuredAssetId: original.featuredAsset?.id,
 *             parentId: original.parentId,
 *             filters: original.filters.map(f => ({
 *                 code: f.code,
 *                 arguments: f.args,
 *             })),
 *             inheritFilters: original.inheritFilters,
 *             translations: original.translations.map(t => ({
 *                 languageCode: t.languageCode,
 *                 name: `${t.name} (copy)`,
 *                 slug: `${t.slug}-copy`,
 *                 description: t.description,
 *                 customFields: t.customFields,
 *             })),
 *         });
 *
 *         if (args.throwError) {
 *             // If an error is thrown at any point during the duplication process, the entire
 *             // transaction will get automatically rolled back, and the mutation will return
 *             // an ErrorResponse containing the error message.
 *             throw new Error('Dummy error');
 *         }
 *
 *         return newCollection;
 *     },
 * });
 * ```
 *
 * The duplicator then gets passed to your VendureConfig object:
 *
 * ```ts title=src/vendure-config.ts
 * import { VendureConfig, defaultEntityDuplicators } from '\@vendure/core';
 * import { customCollectionDuplicator } from './config/custom-collection-duplicator';
 *
 * export const config: VendureConfig = {
 *    // ...
 *    entityOptions: {
 *      entityDuplicators: [
 *          ...defaultEntityDuplicators,
 *          customCollectionDuplicator,
 *      ],
 *    },
 * };
 * ```
 *
 * @docsPage EntityDuplicator
 * @docsWeight 0
 * @docsCategory configuration
 * @since 2.2.0
 */
var EntityDuplicator = /** @class */ (function (_super) {
    __extends(EntityDuplicator, _super);
    function EntityDuplicator(config) {
        var _this = _super.call(this, config) || this;
        _this._forEntities = config.forEntities;
        _this._requiresPermission = config.requiresPermission;
        _this.duplicateFn = config.duplicate;
        return _this;
    }
    /** @internal */
    EntityDuplicator.prototype.canDuplicate = function (entityName) {
        return this._forEntities.includes(entityName);
    };
    Object.defineProperty(EntityDuplicator.prototype, "forEntities", {
        /** @internal */
        get: function () {
            return this._forEntities;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityDuplicator.prototype, "requiresPermission", {
        /** @internal */
        get: function () {
            return (Array.isArray(this._requiresPermission)
                ? this._requiresPermission
                : [this._requiresPermission]);
        },
        enumerable: false,
        configurable: true
    });
    EntityDuplicator.prototype.duplicate = function (input) {
        return this.duplicateFn(__assign(__assign({}, input), { args: this.argsArrayToHash(input.args) }));
    };
    return EntityDuplicator;
}(configurable_operation_1.ConfigurableOperationDef));
exports.EntityDuplicator = EntityDuplicator;
