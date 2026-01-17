"use strict";
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
exports.joinTreeRelationsDynamically = joinTreeRelationsDynamically;
var DriverUtils_1 = require("typeorm/driver/DriverUtils");
var find_options_object_to_array_1 = require("../../../connection/find-options-object-to-array");
/**
 * @description
 * Check if the current entity uses TypeORM tree decorators (@Tree, @TreeParent, @TreeChildren).
 * @param metadata
 * @private
 */
function isTreeEntityMetadata(metadata) {
    if (metadata.treeType !== undefined) {
        return true;
    }
    for (var _i = 0, _a = metadata.relations; _i < _a.length; _i++) {
        var relation = _a[_i];
        if (relation.isTreeParent || relation.isTreeChildren) {
            return true;
        }
    }
    return false;
}
/**
 * Dynamically joins tree relations and their eager counterparts in a TypeORM SelectQueryBuilder, addressing
 * challenges of managing deeply nested relations and optimizing query efficiency. It leverages TypeORM tree
 * decorators (@TreeParent, @TreeChildren) to automate joins of self-related entities, including those marked for eager loading.
 * The process avoids duplicate joins and manual join specifications by using relation metadata.
 *
 * @param {SelectQueryBuilder<T>} qb - The query builder instance for joining relations.
 * @param {EntityTarget<T>} entity - The target entity class or schema name, used to access entity metadata.
 * @param {string[]} [requestedRelations=[]] - An array of relation paths (e.g., 'parent.children') to join dynamically.
 * @param {number} [maxEagerDepth=1] - Limits the depth of eager relation joins to avoid excessively deep joins.
 * @returns {Map<string, string>} - A Map of joined relation paths to their aliases, aiding in tracking and preventing duplicates.
 * @template T - The entity type, extending VendureEntity for compatibility with Vendure's data layer.
 *
 * Usage Notes:
 * - Only entities utilizing TypeORM tree decorators and having nested relations are supported.
 * - The `maxEagerDepth` parameter controls the recursion depth for eager relations, preventing performance issues.
 *
 * For more context on the issue this function addresses, refer to TypeORM issue #9936:
 * https://github.com/typeorm/typeorm/issues/9936
 *
 * Example:
 * ```typescript
 * const qb = repository.createQueryBuilder("entity");
 * joinTreeRelationsDynamically(qb, EntityClass, ["parent.children"], 2);
 * ```
 */
function joinTreeRelationsDynamically(qb, entity, requestedRelations, maxEagerDepth) {
    if (requestedRelations === void 0) { requestedRelations = {}; }
    if (maxEagerDepth === void 0) { maxEagerDepth = 1; }
    var joinedRelations = new Map();
    var relationsArray = (0, find_options_object_to_array_1.findOptionsObjectToArray)(requestedRelations);
    if (!relationsArray.length) {
        return joinedRelations;
    }
    var sourceMetadata = qb.connection.getMetadata(entity);
    var sourceMetadataIsTree = isTreeEntityMetadata(sourceMetadata);
    var processRelation = function (currentMetadata, parentMetadataIsTree, currentPath, currentAlias, parentPath, eagerDepth) {
        if (eagerDepth === void 0) { eagerDepth = 0; }
        if (currentPath === '') {
            return;
        }
        parentPath = parentPath === null || parentPath === void 0 ? void 0 : parentPath.filter(function (p) { return p !== ''; });
        var parts = currentPath.split('.');
        var part = parts.shift();
        if (!part || !currentMetadata)
            return;
        if (part === 'customFields' && parts.length > 0) {
            var relation = parts.shift();
            if (!relation)
                return;
            part += ".".concat(relation);
        }
        var relationMetadata = currentMetadata.findRelationWithPropertyPath(part);
        if (!relationMetadata) {
            return;
        }
        var currentMetadataIsTree = isTreeEntityMetadata(currentMetadata) || sourceMetadataIsTree || parentMetadataIsTree;
        var relationIsSelfReferencing = relationMetadata.inverseEntityMetadata === currentMetadata;
        // Only proceed with manual joining if:
        // 1. We're in a tree entity context (using @Tree, @TreeParent, @TreeChildren), OR
        // 2. This specific relation is self-referencing (either the relation is self-referencing or the relation is a custom field relation)
        if (!currentMetadataIsTree && !relationIsSelfReferencing) {
            return;
        }
        var joinConnector = '_';
        if (relationMetadata.isEager) {
            joinConnector = '__';
        }
        var nextAlias = DriverUtils_1.DriverUtils.buildAlias(qb.connection.driver, { shorten: false, joiner: joinConnector }, currentAlias, part.replace(/\./g, '_'));
        var nextPath = parts.join('.');
        var fullPath = __spreadArray(__spreadArray([], (parentPath || []), true), [part], false).join('.');
        if (!qb.expressionMap.joinAttributes.some(function (ja) { return ja.alias.name === nextAlias; })) {
            qb.leftJoinAndSelect("".concat(currentAlias, ".").concat(part), nextAlias);
            joinedRelations.set(fullPath, nextAlias);
        }
        var inverseEntityMetadataIsTree = isTreeEntityMetadata(relationMetadata.inverseEntityMetadata);
        var shouldProcessSubRelations = currentMetadataIsTree || inverseEntityMetadataIsTree || relationIsSelfReferencing;
        if (!shouldProcessSubRelations) {
            return;
        }
        var newEagerDepth = relationMetadata.isEager ? eagerDepth + 1 : eagerDepth;
        var propagatedTreeContext = currentMetadataIsTree || relationIsSelfReferencing;
        if (newEagerDepth <= maxEagerDepth) {
            relationMetadata.inverseEntityMetadata.relations.forEach(function (subRelation) {
                if (subRelation.isEager) {
                    processRelation(relationMetadata.inverseEntityMetadata, propagatedTreeContext, subRelation.propertyPath, nextAlias, [fullPath], newEagerDepth);
                }
            });
        }
        if (nextPath) {
            processRelation(relationMetadata.inverseEntityMetadata, propagatedTreeContext, nextPath, nextAlias, [fullPath]);
        }
    };
    relationsArray.forEach(function (relationPath) {
        if (!joinedRelations.has(relationPath)) {
            processRelation(sourceMetadata, sourceMetadataIsTree, relationPath, qb.alias);
        }
    });
    return joinedRelations;
}
