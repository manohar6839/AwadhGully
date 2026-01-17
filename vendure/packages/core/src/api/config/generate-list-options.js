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
exports.generateListOptions = generateListOptions;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var index_js_1 = require("graphql/index.js");
// Using require here to prevent issues when running vitest tests also.
// eslint-disable-next-line @typescript-eslint/no-var-requires
var _a = require('@graphql-tools/stitch'), stitchSchemas = _a.stitchSchemas, ValidationLevel = _a.ValidationLevel;
/**
 * Generates ListOptions inputs for queries which return PaginatedList types.
 */
function generateListOptions(typeDefsOrSchema) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, index_js_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var queryType = schema.getQueryType();
    if (!queryType) {
        return schema;
    }
    var logicalOperatorEnum = schema.getType('LogicalOperator');
    var objectTypes = Object.values(schema.getTypeMap()).filter(index_js_1.isObjectType);
    var allFields = objectTypes.reduce(function (fields, type) {
        var typeFields = Object.values(type.getFields()).filter(function (f) { return isListQueryType(f.type); });
        return __spreadArray(__spreadArray([], fields, true), typeFields, true);
    }, []);
    var generatedTypes = [];
    var _loop_1 = function (query) {
        var targetTypeName = unwrapNonNullType(query.type).toString().replace(/List$/, '');
        var targetType = schema.getType(targetTypeName);
        if (targetType && (0, index_js_1.isObjectType)(targetType)) {
            var sortParameter = createSortParameter(schema, targetType);
            var filterParameter = createFilterParameter(schema, targetType);
            var existingListOptions = schema.getType("".concat(targetTypeName, "ListOptions"));
            var generatedListOptions = new index_js_1.GraphQLInputObjectType({
                name: "".concat(targetTypeName, "ListOptions"),
                fields: __assign(__assign({ skip: {
                        type: index_js_1.GraphQLInt,
                        description: 'Skips the first n results, for use in pagination',
                    }, take: { type: index_js_1.GraphQLInt, description: 'Takes n results, for use in pagination' }, sort: {
                        type: sortParameter,
                        description: 'Specifies which properties to sort the results by',
                    }, filter: { type: filterParameter, description: 'Allows the results to be filtered' } }, (logicalOperatorEnum
                    ? {
                        filterOperator: {
                            type: logicalOperatorEnum,
                            description: 'Specifies whether multiple top-level "filter" fields should be combined ' +
                                'with a logical AND or OR operation. Defaults to AND.',
                        },
                    }
                    : {})), (existingListOptions ? existingListOptions.getFields() : {})),
            });
            if (!query.args.find(function (a) { return a.type.toString() === "".concat(targetTypeName, "ListOptions"); })) {
                query.args = __spreadArray(__spreadArray([], query.args, true), [
                    {
                        name: 'options',
                        type: generatedListOptions,
                        description: null,
                        defaultValue: null,
                        extensions: {},
                        astNode: null,
                        deprecationReason: null,
                    },
                ], false);
            }
            generatedTypes.push(filterParameter);
            generatedTypes.push(sortParameter);
            generatedTypes.push(generatedListOptions);
        }
    };
    for (var _i = 0, allFields_1 = allFields; _i < allFields_1.length; _i++) {
        var query = allFields_1[_i];
        _loop_1(query);
    }
    return stitchSchemas({
        subschemas: [schema],
        types: generatedTypes,
        typeMergingOptions: { validationSettings: { validationLevel: ValidationLevel.Off } },
    });
}
function isListQueryType(type) {
    var innerType = unwrapNonNullType(type);
    return (0, index_js_1.isObjectType)(innerType) && !!innerType.getInterfaces().find(function (i) { return i.name === 'PaginatedList'; });
}
function createSortParameter(schema, targetType) {
    var fields = Object.values(targetType.getFields());
    var targetTypeName = targetType.name;
    var SortOrder = schema.getType('SortOrder');
    var inputName = "".concat(targetTypeName, "SortParameter");
    var existingInput = schema.getType(inputName);
    if ((0, index_js_1.isInputObjectType)(existingInput)) {
        fields.push.apply(fields, Object.values(existingInput.getFields()));
    }
    var sortableTypes = ['ID', 'String', 'Int', 'Float', 'DateTime', 'Money'];
    return new index_js_1.GraphQLInputObjectType({
        name: inputName,
        fields: fields
            .map(function (field) {
            if (unwrapNonNullType(field.type) === SortOrder) {
                return field;
            }
            else {
                var innerType = unwrapNonNullType(field.type);
                if ((0, index_js_1.isListType)(innerType)) {
                    return;
                }
                return sortableTypes.includes(innerType.name) ? field : undefined;
            }
        })
            .filter(shared_utils_1.notNullOrUndefined)
            .reduce(function (result, field) {
            var _a;
            var fieldConfig = {
                type: SortOrder,
            };
            return __assign(__assign({}, result), (_a = {}, _a[field.name] = fieldConfig, _a));
        }, {}),
    });
}
function createFilterParameter(schema, targetType) {
    var fields = Object.values(targetType.getFields());
    var targetTypeName = targetType.name;
    var _a = getCommonTypes(schema), StringOperators = _a.StringOperators, BooleanOperators = _a.BooleanOperators, NumberOperators = _a.NumberOperators, DateOperators = _a.DateOperators, IDOperators = _a.IDOperators;
    var inputName = "".concat(targetTypeName, "FilterParameter");
    var existingInput = schema.getType(inputName);
    if ((0, index_js_1.isInputObjectType)(existingInput)) {
        fields.push.apply(fields, Object.values(existingInput.getFields()));
    }
    function getFilterType(field) {
        var innerType = unwrapNonNullType(field.type);
        if ((0, index_js_1.isListType)(innerType)) {
            return;
        }
        if ((0, index_js_1.isEnumType)(innerType)) {
            return StringOperators;
        }
        switch (innerType.name) {
            case 'String':
                return StringOperators;
            case 'Boolean':
                return BooleanOperators;
            case 'Int':
            case 'Float':
            case 'Money':
                return NumberOperators;
            case 'DateTime':
                return DateOperators;
            case 'ID':
                return IDOperators;
            default:
                return;
        }
    }
    var FilterInputType = new index_js_1.GraphQLInputObjectType({
        name: inputName,
        fields: function () {
            var namedFields = fields.reduce(function (result, field) {
                var _a;
                var fieldType = field.type;
                var filterType = (0, index_js_1.isInputObjectType)(fieldType) ? fieldType : getFilterType(field);
                if (!filterType) {
                    return result;
                }
                var fieldConfig = {
                    type: filterType,
                };
                return __assign(__assign({}, result), (_a = {}, _a[field.name] = fieldConfig, _a));
            }, {});
            return __assign(__assign({}, namedFields), { _and: { type: new index_js_1.GraphQLList(new index_js_1.GraphQLNonNull(FilterInputType)) }, _or: { type: new index_js_1.GraphQLList(new index_js_1.GraphQLNonNull(FilterInputType)) } });
        },
    });
    return FilterInputType;
}
function getCommonTypes(schema) {
    var SortOrder = schema.getType('SortOrder');
    var StringOperators = schema.getType('StringOperators');
    var BooleanOperators = schema.getType('BooleanOperators');
    var NumberRange = schema.getType('NumberRange');
    var NumberOperators = schema.getType('NumberOperators');
    var DateRange = schema.getType('DateRange');
    var DateOperators = schema.getType('DateOperators');
    var IDOperators = schema.getType('IDOperators');
    if (!SortOrder ||
        !StringOperators ||
        !BooleanOperators ||
        !NumberRange ||
        !NumberOperators ||
        !DateRange ||
        !DateOperators ||
        !IDOperators) {
        throw new Error('A common type was not defined');
    }
    return {
        SortOrder: SortOrder,
        StringOperators: StringOperators,
        BooleanOperators: BooleanOperators,
        NumberOperators: NumberOperators,
        DateOperators: DateOperators,
        IDOperators: IDOperators,
    };
}
/**
 * Unwraps the inner type if it is inside a non-nullable type
 */
function unwrapNonNullType(type) {
    if ((0, index_js_1.isNonNullType)(type)) {
        return type.ofType;
    }
    return type;
}
