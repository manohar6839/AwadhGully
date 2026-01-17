"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnMetadata = getColumnMetadata;
exports.getEntityAlias = getEntityAlias;
exports.escapeCalculatedColumnExpression = escapeCalculatedColumnExpression;
/**
 * @description
 * Returns TypeORM ColumnMetadata for the given entity type.
 */
function getColumnMetadata(connection, entity) {
    var metadata = connection.getMetadata(entity);
    var columns = metadata.columns;
    var translationColumns = [];
    var relations = metadata.relations;
    var translationRelation = relations.find(function (r) { return r.propertyName === 'translations'; });
    if (translationRelation) {
        var commonFields_1 = [
            'id',
            'createdAt',
            'updatedAt',
            'languageCode',
        ];
        var translationMetadata = connection.getMetadata(translationRelation.type);
        translationColumns = translationColumns.concat(translationMetadata.columns.filter(function (c) { return !c.relationMetadata && !commonFields_1.includes(c.propertyName); }));
    }
    var alias = metadata.name.toLowerCase();
    return { columns: columns, translationColumns: translationColumns, alias: alias };
}
function getEntityAlias(connection, entity) {
    return connection.getMetadata(entity).name.toLowerCase();
}
/**
 * @description
 * Escapes identifiers in an expression according to the current database driver.
 */
function escapeCalculatedColumnExpression(connection, expression) {
    return expression.replace(/\b([a-z]+[A-Z]\w+)\b/g, function (substring) { return connection.driver.escape(substring); });
}
