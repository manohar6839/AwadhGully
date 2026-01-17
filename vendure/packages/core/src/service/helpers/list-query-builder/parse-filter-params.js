"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFilterParams = parseFilterParams;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var DateUtils_1 = require("typeorm/util/DateUtils");
var errors_1 = require("../../../common/error/errors");
var connection_utils_1 = require("./connection-utils");
var get_calculated_columns_1 = require("./get-calculated-columns");
/**
 * @description
 * Parses filter parameters from a GraphQL query and converts them into SQL WHERE conditions.
 *
 * For custom property fields that map to *-to-Many relations, all conditions will be marked
 * for EXISTS subquery treatment to ensure correct AND semantics when filtering across
 * multiple related rows.
 */
function parseFilterParams(options) {
    var connection = options.connection, entity = options.entity, filterParams = options.filterParams, customPropertyMap = options.customPropertyMap, originalCustomPropertyMap = options.originalCustomPropertyMap, entityAlias = options.entityAlias;
    if (!filterParams) {
        return [];
    }
    var _a = (0, connection_utils_1.getColumnMetadata)(connection, entity), columns = _a.columns, translationColumns = _a.translationColumns, defaultAlias = _a.alias;
    var alias = entityAlias !== null && entityAlias !== void 0 ? entityAlias : defaultAlias;
    var calculatedColumns = (0, get_calculated_columns_1.getCalculatedColumns)(entity);
    var dbType = connection.options.type;
    var argIndex = 1;
    // Detect which custom property fields map to *-to-Many relations.
    // All filter conditions on these fields will use EXISTS subqueries for correct AND semantics.
    var toManyRelationCustomProperties = getToManyRelationCustomProperties(connection, entity, originalCustomPropertyMap, filterParams);
    function buildConditionsForField(key, operation) {
        var output = [];
        var calculatedColumnDef = calculatedColumns.find(function (c) { return c.name === key; });
        var instruction = calculatedColumnDef === null || calculatedColumnDef === void 0 ? void 0 : calculatedColumnDef.listQuery;
        var calculatedColumnExpression = instruction === null || instruction === void 0 ? void 0 : instruction.expression;
        // Mark ALL conditions on *-to-Many relation custom properties for EXISTS subquery treatment.
        // This ensures correct AND semantics regardless of how many times the field is used.
        var isToManyCustomProperty = toManyRelationCustomProperties.has(key) && (originalCustomPropertyMap === null || originalCustomPropertyMap === void 0 ? void 0 : originalCustomPropertyMap[key]);
        for (var _i = 0, _a = Object.entries(operation); _i < _a.length; _i++) {
            var _b = _a[_i], operator = _b[0], operand = _b[1];
            var fieldName = void 0;
            if (columns.find(function (c) { return c.propertyName === key; })) {
                fieldName = "".concat(alias, ".").concat(key);
            }
            else if (translationColumns.find(function (c) { return c.propertyName === key; })) {
                var translationsAlias = [alias, 'translations'].join('__');
                fieldName = "".concat(translationsAlias, ".").concat(key);
            }
            else if (calculatedColumnExpression) {
                fieldName = (0, connection_utils_1.escapeCalculatedColumnExpression)(connection, calculatedColumnExpression);
            }
            else if (customPropertyMap === null || customPropertyMap === void 0 ? void 0 : customPropertyMap[key]) {
                fieldName = customPropertyMap[key];
            }
            else {
                throw new errors_1.UserInputError('error.invalid-filter-field');
            }
            var condition = buildWhereCondition(fieldName, operator, operand, argIndex, dbType);
            // Mark *-to-Many custom property fields for EXISTS subquery treatment
            if (isToManyCustomProperty) {
                condition.isExistsCondition = {
                    customPropertyKey: key,
                    customPropertyPath: originalCustomPropertyMap[key],
                };
            }
            output.push(condition);
            argIndex++;
        }
        return output;
    }
    function processFilterParameter(param) {
        var result = [];
        for (var _i = 0, _a = Object.entries(param); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], operation = _b[1];
            if (key === '_and' || key === '_or') {
                var isAndOperator = key === '_and';
                result.push({
                    operator: isAndOperator ? generated_types_1.LogicalOperator.AND : generated_types_1.LogicalOperator.OR,
                    conditions: operation.map(function (o) { return processFilterParameter(o); }).flat(),
                });
            }
            else if (operation && !Array.isArray(operation)) {
                result.push.apply(result, buildConditionsForField(key, operation));
            }
        }
        return result;
    }
    return processFilterParameter(filterParams);
}
/**
 * @description
 * Identifies which custom property keys map to *-to-Many relations (OneToMany or ManyToMany).
 * These fields require EXISTS subqueries for correct AND semantics when filtering across
 * multiple related rows.
 *
 * @see https://github.com/vendurehq/vendure/issues/3267
 */
function getToManyRelationCustomProperties(connection, entity, originalCustomPropertyMap, filterParams) {
    var toManyProperties = new Set();
    if (!originalCustomPropertyMap) {
        return toManyProperties;
    }
    var metadata = connection.getMetadata(entity);
    for (var _i = 0, _a = Object.entries(originalCustomPropertyMap); _i < _a.length; _i++) {
        var _b = _a[_i], property = _b[0], path = _b[1];
        // Only check properties that are actually being used in filters
        if (!isPropertyUsedInFilter(property, filterParams)) {
            continue;
        }
        // Parse the path to get the relation name (e.g., 'facetValues.id' -> 'facetValues')
        var pathParts = path.split('.');
        if (pathParts.length < 2) {
            continue;
        }
        var relationName = pathParts[0];
        var relationMetadata = metadata.findRelationWithPropertyPath(relationName);
        if (relationMetadata && (relationMetadata.isOneToMany || relationMetadata.isManyToMany)) {
            toManyProperties.add(property);
        }
    }
    return toManyProperties;
}
/**
 * Checks if a property is used anywhere in the filter parameters,
 * including nested _and/_or blocks.
 */
function isPropertyUsedInFilter(property, filter) {
    if (!filter) {
        return false;
    }
    if (filter[property]) {
        return true;
    }
    if (filter._and) {
        for (var _i = 0, _a = filter._and; _i < _a.length; _i++) {
            var nestedFilter = _a[_i];
            if (isPropertyUsedInFilter(property, nestedFilter)) {
                return true;
            }
        }
    }
    if (filter._or) {
        for (var _b = 0, _c = filter._or; _b < _c.length; _b++) {
            var nestedFilter = _c[_b];
            if (isPropertyUsedInFilter(property, nestedFilter)) {
                return true;
            }
        }
    }
    return false;
}
function buildWhereCondition(fieldName, operator, operand, argIndex, dbType) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    switch (operator) {
        case 'eq':
            return {
                clause: "".concat(fieldName, " = :arg").concat(argIndex),
                parameters: (_a = {}, _a["arg".concat(argIndex)] = convertDate(operand), _a),
            };
        case 'notEq':
            return {
                clause: "".concat(fieldName, " != :arg").concat(argIndex),
                parameters: (_b = {}, _b["arg".concat(argIndex)] = convertDate(operand), _b),
            };
        case 'inList':
        case 'contains': {
            var LIKE = dbType === 'postgres' ? 'ILIKE' : 'LIKE';
            return {
                clause: "".concat(fieldName, " ").concat(LIKE, " :arg").concat(argIndex),
                parameters: (_c = {},
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    _c["arg".concat(argIndex)] = "%".concat(typeof operand === 'string' ? operand.trim() : operand, "%"),
                    _c),
            };
        }
        case 'notContains': {
            var LIKE = dbType === 'postgres' ? 'ILIKE' : 'LIKE';
            return {
                clause: "".concat(fieldName, " NOT ").concat(LIKE, " :arg").concat(argIndex),
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                parameters: (_d = {}, _d["arg".concat(argIndex)] = "%".concat(operand.trim(), "%"), _d),
            };
        }
        case 'in': {
            if (Array.isArray(operand) && operand.length) {
                return {
                    clause: "".concat(fieldName, " IN (:...arg").concat(argIndex, ")"),
                    parameters: (_e = {}, _e["arg".concat(argIndex)] = operand, _e),
                };
            }
            else {
                // "in" with an empty set should always return nothing
                return {
                    clause: '1 = 0',
                    parameters: {},
                };
            }
        }
        case 'notIn': {
            if (Array.isArray(operand) && operand.length) {
                return {
                    clause: "".concat(fieldName, " NOT IN (:...arg").concat(argIndex, ")"),
                    parameters: (_f = {}, _f["arg".concat(argIndex)] = operand, _f),
                };
            }
            else {
                // "notIn" with an empty set should always return all
                return {
                    clause: '1 = 1',
                    parameters: {},
                };
            }
        }
        case 'regex':
            return {
                clause: getRegexpClause(fieldName, argIndex, dbType),
                parameters: (_g = {}, _g["arg".concat(argIndex)] = operand, _g),
            };
        case 'lt':
        case 'before':
            return {
                clause: "".concat(fieldName, " < :arg").concat(argIndex),
                parameters: (_h = {}, _h["arg".concat(argIndex)] = convertDate(operand), _h),
            };
        case 'gt':
        case 'after':
            return {
                clause: "".concat(fieldName, " > :arg").concat(argIndex),
                parameters: (_j = {}, _j["arg".concat(argIndex)] = convertDate(operand), _j),
            };
        case 'lte':
            return {
                clause: "".concat(fieldName, " <= :arg").concat(argIndex),
                parameters: (_k = {}, _k["arg".concat(argIndex)] = operand, _k),
            };
        case 'gte':
            return {
                clause: "".concat(fieldName, " >= :arg").concat(argIndex),
                parameters: (_l = {}, _l["arg".concat(argIndex)] = operand, _l),
            };
        case 'between':
            return {
                clause: "".concat(fieldName, " BETWEEN :arg").concat(argIndex, "_a AND :arg").concat(argIndex, "_b"),
                parameters: (_m = {},
                    _m["arg".concat(argIndex, "_a")] = convertDate(operand.start),
                    _m["arg".concat(argIndex, "_b")] = convertDate(operand.end),
                    _m),
            };
        case 'isNull':
            return {
                clause: operand === true ? "".concat(fieldName, " IS NULL") : "".concat(fieldName, " IS NOT NULL"),
                parameters: {},
            };
        default:
            (0, shared_utils_1.assertNever)(operator);
    }
    return {
        clause: '1',
        parameters: {},
    };
}
/**
 * Converts a JS Date object to a string format recognized by all DB engines.
 * See https://github.com/vendurehq/vendure/issues/251
 */
function convertDate(input) {
    if (input instanceof Date) {
        return DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(input);
    }
    return input;
}
/**
 * Returns a valid regexp clause based on the current DB driver type.
 */
function getRegexpClause(fieldName, argIndex, dbType) {
    switch (dbType) {
        case 'mariadb':
        case 'mysql':
        case 'sqljs':
        case 'better-sqlite3':
        case 'aurora-mysql':
            return "".concat(fieldName, " REGEXP :arg").concat(argIndex);
        case 'postgres':
        case 'aurora-postgres':
        case 'cockroachdb':
            return "".concat(fieldName, " ~* :arg").concat(argIndex);
        // The node-sqlite3 driver does not support user-defined functions
        // and therefore we are unable to define a custom regexp
        // function. See https://github.com/mapbox/node-sqlite3/issues/140
        case 'sqlite':
        default:
            throw new errors_1.InternalServerError("The 'regex' filter is not available when using the '".concat(dbType, "' driver"));
    }
}
