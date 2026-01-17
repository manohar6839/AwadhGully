"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_INTERFACE_NAME = void 0;
exports.generateErrorCodeEnum = generateErrorCodeEnum;
var graphql_1 = require("graphql");
exports.ERROR_INTERFACE_NAME = 'ErrorResult';
/**
 * Generates the members of the `ErrorCode` enum dynamically, by getting the names of
 * all the types which inherit from the `ErrorResult` interface.
 */
function generateErrorCodeEnum(typeDefsOrSchema) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var errorNodes = Object.values(schema.getTypeMap())
        .map(function (type) { return type.astNode; })
        .filter(function (node) {
        var _a;
        return (node &&
            (node === null || node === void 0 ? void 0 : node.kind) === 'ObjectTypeDefinition' &&
            ((_a = node.interfaces) === null || _a === void 0 ? void 0 : _a.map(function (i) { return i.name.value; }).includes(exports.ERROR_INTERFACE_NAME)));
    });
    if (!errorNodes.length) {
        return schema;
    }
    var errorCodeEnum = "\n        extend enum ErrorCode {\n            ".concat(errorNodes.map(function (n) { return camelToUpperSnakeCase((n === null || n === void 0 ? void 0 : n.name.value) || ''); }).join('\n'), "\n        }");
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(errorCodeEnum));
}
function camelToUpperSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}
