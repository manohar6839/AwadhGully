"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryGeneratedId = PrimaryGeneratedId;
exports.EntityId = EntityId;
exports.getIdColumnsFor = getIdColumnsFor;
exports.getPrimaryGeneratedIdColumn = getPrimaryGeneratedIdColumn;
var idColumnRegistry = new Map();
var primaryGeneratedColumn;
/**
 * Decorates a property which should be marked as a generated primary key.
 * Designed to be applied to the VendureEntity id property.
 */
function PrimaryGeneratedId() {
    return function (entity, propertyName) {
        primaryGeneratedColumn = {
            entity: entity,
            name: propertyName,
        };
    };
}
/**
 * @description
 * Decorates a property which points to another entity by ID. This custom decorator is needed
 * because we do not know the data type of the ID column until runtime, when we have access
 * to the configured EntityIdStrategy.
 *
 * @docsCategory configuration
 * @docsPage EntityId Decorator
 */
function EntityId(options) {
    return function (entity, propertyName) {
        var idColumns = idColumnRegistry.get(entity);
        var entry = { name: propertyName, entity: entity, options: options };
        if (idColumns) {
            idColumns.push(entry);
        }
        else {
            idColumnRegistry.set(entity, [entry]);
        }
    };
}
/**
 * Returns any columns on the entity which have been decorated with the {@link EntityId}
 * decorator.
 */
function getIdColumnsFor(entityType) {
    var match = Array.from(idColumnRegistry.entries()).find(function (_a) {
        var entity = _a[0], columns = _a[1];
        return entity.constructor === entityType;
    });
    return match ? match[1] : [];
}
/**
 * Returns the entity and property name that was decorated with the {@link PrimaryGeneratedId}
 * decorator.
 */
function getPrimaryGeneratedIdColumn() {
    if (!primaryGeneratedColumn) {
        throw new Error('primaryGeneratedColumn is undefined. The base VendureEntity must have the @PrimaryGeneratedId() decorator set on its id property.');
    }
    return primaryGeneratedColumn;
}
