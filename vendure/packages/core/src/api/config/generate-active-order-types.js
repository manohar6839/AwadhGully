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
exports.generateActiveOrderTypes = generateActiveOrderTypes;
var stitch_1 = require("@graphql-tools/stitch");
var graphql_1 = require("graphql");
var errors_1 = require("../../common/error/errors");
var active_order_strategy_1 = require("../../config/order/active-order-strategy");
/**
 * This function is responsible for constructing the `ActiveOrderInput` GraphQL input type.
 * It does so based on the inputs defined by the configured ActiveOrderStrategy defineInputType
 * methods, dynamically building a mapped input type of the format:
 *
 *```
 * {
 *     [strategy_name]: strategy_input_type
 * }
 * ```
 */
function generateActiveOrderTypes(schema, activeOrderStrategies) {
    var fields = {};
    var strategySchemas = [];
    var strategiesArray = Array.isArray(activeOrderStrategies)
        ? activeOrderStrategies
        : [activeOrderStrategies];
    for (var _i = 0, strategiesArray_1 = strategiesArray; _i < strategiesArray_1.length; _i++) {
        var strategy = strategiesArray_1[_i];
        if (typeof strategy.defineInputType === 'function') {
            var inputSchema = (0, graphql_1.buildASTSchema)(strategy.defineInputType());
            var inputType = Object.values(inputSchema.getTypeMap()).find(function (type) { return (0, graphql_1.isInputObjectType)(type); });
            if (!inputType) {
                throw new errors_1.InternalServerError("".concat(strategy.constructor.name, ".defineInputType() does not define a GraphQL Input type"));
            }
            fields[strategy.name] = { type: inputType };
            strategySchemas.push(inputSchema);
        }
    }
    if (Object.keys(fields).length === 0) {
        return schema;
    }
    var activeOrderInput = new graphql_1.GraphQLInputObjectType({
        name: 'ActiveOrderInput',
        fields: fields,
    });
    var activeOrderOperations = [
        { name: 'activeOrder', isMutation: false },
        { name: 'eligibleShippingMethods', isMutation: false },
        { name: 'eligiblePaymentMethods', isMutation: false },
        { name: 'nextOrderStates', isMutation: false },
        { name: 'addItemToOrder', isMutation: true },
        { name: 'adjustOrderLine', isMutation: true },
        { name: 'removeOrderLine', isMutation: true },
        { name: 'removeAllOrderLines', isMutation: true },
        { name: 'applyCouponCode', isMutation: true },
        { name: 'removeCouponCode', isMutation: true },
        { name: 'addPaymentToOrder', isMutation: true },
        { name: 'setCustomerForOrder', isMutation: true },
        { name: 'setOrderShippingAddress', isMutation: true },
        { name: 'setOrderBillingAddress', isMutation: true },
        { name: 'setOrderShippingMethod', isMutation: true },
        { name: 'setOrderCustomFields', isMutation: true },
        { name: 'transitionOrderToState', isMutation: true },
        { name: 'unsetOrderShippingAddress', isMutation: true },
        { name: 'unsetOrderBillingAddress', isMutation: true },
    ];
    var queryType = schema.getQueryType();
    var mutationType = schema.getMutationType();
    var strategyNames = strategiesArray.map(function (s) { return s.name; }).join(', ');
    var description = "Inputs for the configured ".concat(strategiesArray.length === 1 ? 'ActiveOrderStrategy' : 'ActiveOrderStrategies', " ").concat(strategyNames);
    for (var _a = 0, activeOrderOperations_1 = activeOrderOperations; _a < activeOrderOperations_1.length; _a++) {
        var operation = activeOrderOperations_1[_a];
        var field = operation.isMutation
            ? mutationType === null || mutationType === void 0 ? void 0 : mutationType.getFields()[operation.name]
            : queryType === null || queryType === void 0 ? void 0 : queryType.getFields()[operation.name];
        if (!field) {
            throw new errors_1.InternalServerError("Could not find a GraphQL type definition for the field ".concat(operation.name));
        }
        // TODO: Figure out a non-hacky way to do this!
        field.args.push({
            name: active_order_strategy_1.ACTIVE_ORDER_INPUT_FIELD_NAME,
            type: activeOrderInput,
            description: description,
            defaultValue: null,
            extensions: null,
            astNode: null,
            deprecationReason: null,
        });
    }
    return (0, stitch_1.stitchSchemas)({
        subschemas: __spreadArray([schema], strategySchemas, true),
        types: [activeOrderInput],
        typeMergingOptions: { validationSettings: { validationLevel: stitch_1.ValidationLevel.Off } },
    });
}
