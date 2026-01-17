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
exports.generateAuthenticationTypes = generateAuthenticationTypes;
var stitch_1 = require("@graphql-tools/stitch");
var graphql_1 = require("graphql");
var errors_1 = require("../../common/error/errors");
/**
 * This function is responsible for constructing the `AuthenticationInput` GraphQL input type.
 * It does so based on the inputs defined by the configured AuthenticationStrategy defineInputType
 * methods, dynamically building a mapped input type of the format:
 *
 *```
 * {
 *     [strategy_name]: strategy_input_type
 * }
 * ```
 */
function generateAuthenticationTypes(schema, authenticationStrategies) {
    var fields = {};
    var strategySchemas = [];
    for (var _i = 0, authenticationStrategies_1 = authenticationStrategies; _i < authenticationStrategies_1.length; _i++) {
        var strategy = authenticationStrategies_1[_i];
        var inputSchema = (0, graphql_1.buildASTSchema)(strategy.defineInputType());
        var inputType = Object.values(inputSchema.getTypeMap()).find(function (type) { return (0, graphql_1.isInputObjectType)(type); });
        if (!inputType) {
            throw new errors_1.InternalServerError("".concat(strategy.constructor.name, ".defineInputType() does not define a GraphQL Input type"));
        }
        fields[strategy.name] = { type: inputType };
        strategySchemas.push(inputSchema);
    }
    var authenticationInput = new graphql_1.GraphQLInputObjectType({
        name: 'AuthenticationInput',
        fields: fields,
    });
    return (0, stitch_1.stitchSchemas)({
        subschemas: __spreadArray([schema], strategySchemas, true),
        types: [authenticationInput],
        typeMergingOptions: { validationSettings: { validationLevel: stitch_1.ValidationLevel.Off } },
    });
}
