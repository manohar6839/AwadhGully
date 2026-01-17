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
exports.addGraphQLCustomFields = addGraphQLCustomFields;
exports.addServerConfigCustomFields = addServerConfigCustomFields;
exports.addActiveAdministratorCustomFields = addActiveAdministratorCustomFields;
exports.addRegisterCustomerCustomFieldsInput = addRegisterCustomerCustomFieldsInput;
exports.addModifyOrderCustomFields = addModifyOrderCustomFields;
exports.addOrderLineCustomFieldsInput = addOrderLineCustomFieldsInput;
exports.addShippingMethodQuoteCustomFields = addShippingMethodQuoteCustomFields;
exports.addPaymentMethodQuoteCustomFields = addPaymentMethodQuoteCustomFields;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var graphql_1 = require("graphql");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var get_custom_fields_config_without_interfaces_1 = require("./get-custom-fields-config-without-interfaces");
/**
 * Given a CustomFields config object, generates an SDL string extending the built-in
 * types with a customFields property for all entities, translations and inputs for which
 * custom fields are defined.
 */
function addGraphQLCustomFields(typeDefsOrSchema, customFieldConfig, publicOnly) {
    var _a;
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var customFieldTypeDefs = '';
    if (!schema.getType('JSON')) {
        customFieldTypeDefs += "\n            scalar JSON\n        ";
    }
    if (!schema.getType('DateTime')) {
        customFieldTypeDefs += "\n            scalar DateTime\n        ";
    }
    var customFieldsConfig = (0, get_custom_fields_config_without_interfaces_1.getCustomFieldsConfigWithoutInterfaces)(customFieldConfig, schema);
    var entitiesWithPublicTypes = ["ShippingMethod", "PaymentMethod"];
    for (var _i = 0, customFieldsConfig_1 = customFieldsConfig; _i < customFieldsConfig_1.length; _i++) {
        var _b = customFieldsConfig_1[_i], entityName = _b[0], customFields = _b[1];
        var gqlType = schema.getType(entityName);
        if ((0, graphql_1.isObjectType)(gqlType) && gqlType.getFields().customFields) {
            vendure_logger_1.Logger.warn("The entity type \"".concat(entityName, "\" already has a \"customFields\" field defined. Skipping automatic custom field extension."));
            continue;
        }
        var customEntityFields = customFields.filter(function (config) {
            return !config.internal && (publicOnly === true ? config.public !== false : true);
        });
        for (var _c = 0, customEntityFields_1 = customEntityFields; _c < customEntityFields_1.length; _c++) {
            var fieldDef = customEntityFields_1[_c];
            if (fieldDef.type === 'relation') {
                var graphQlTypeName = fieldDef.graphQLType || fieldDef.entity.name;
                if (!schema.getType(graphQlTypeName)) {
                    var customFieldPath = "".concat(entityName, ".").concat(fieldDef.name);
                    var errorMessage = "The GraphQL type \"".concat(graphQlTypeName !== null && graphQlTypeName !== void 0 ? graphQlTypeName : '(unknown)', "\" specified by the ").concat(customFieldPath, " custom field does not exist in the ").concat(publicOnly ? 'Shop API' : 'Admin API', " schema.");
                    vendure_logger_1.Logger.warn(errorMessage);
                    if (publicOnly) {
                        vendure_logger_1.Logger.warn([
                            "This can be resolved by either:",
                            "  - setting `public: false` in the ".concat(customFieldPath, " custom field config"),
                            "  - defining the \"".concat(graphQlTypeName, "\" type in the Shop API schema"),
                        ].join('\n'));
                    }
                    throw new Error(errorMessage);
                }
            }
        }
        var localizedFields = customEntityFields.filter(function (field) { return field.type === 'localeString' || field.type === 'localeText'; });
        var nonLocalizedFields = customEntityFields.filter(function (field) { return field.type !== 'localeString' && field.type !== 'localeText'; });
        var writeableLocalizedFields = localizedFields.filter(function (field) { return !field.readonly; });
        var writeableNonLocalizedFields = nonLocalizedFields.filter(function (field) { return !field.readonly; });
        var sortableFields = customEntityFields.filter(function (field) { return field.list !== true && field.type !== 'struct'; });
        var filterableFields = customEntityFields.filter(function (field) { return field.type !== 'relation' && field.type !== 'struct'; });
        var structCustomFields = customEntityFields.filter(function (f) { return f.type === 'struct'; });
        if (schema.getType(entityName)) {
            if (customEntityFields.length) {
                for (var _d = 0, structCustomFields_1 = structCustomFields; _d < structCustomFields_1.length; _d++) {
                    var structCustomField = structCustomFields_1[_d];
                    customFieldTypeDefs += "\n                        type ".concat(getStructTypeName(entityName, structCustomField), " {\n                            ").concat(mapToStructFields(structCustomField.fields, wrapListType(getGraphQlTypeForStructField)), "\n                        }\n                    ");
                }
                customFieldTypeDefs += "\n                    type ".concat(entityName, "CustomFields {\n                        ").concat(mapToFields(customEntityFields, wrapListType(getGraphQlType(entityName))), "\n                    }\n\n                    extend type ").concat(entityName, " {\n                        customFields: ").concat(entityName, "CustomFields\n                    }\n                ");
            }
            else {
                customFieldTypeDefs += "\n                    extend type ".concat(entityName, " {\n                        customFields: JSON\n                    }\n                ");
            }
        }
        if (localizedFields.length && schema.getType("".concat(entityName, "Translation"))) {
            customFieldTypeDefs += "\n                    type ".concat(entityName, "TranslationCustomFields {\n                         ").concat(mapToFields(localizedFields, wrapListType(getGraphQlType(entityName))), "\n                    }\n\n                    extend type ").concat(entityName, "Translation {\n                        customFields: ").concat(entityName, "TranslationCustomFields\n                    }\n                ");
        }
        var hasCreateInputType = schema.getType("Create".concat(entityName, "Input"));
        var hasUpdateInputType = schema.getType("Update".concat(entityName, "Input"));
        if ((hasCreateInputType || hasUpdateInputType) && writeableNonLocalizedFields.length) {
            // Define any Struct input types that are required by
            // the create and/or update input types.
            for (var _e = 0, structCustomFields_2 = structCustomFields; _e < structCustomFields_2.length; _e++) {
                var structCustomField = structCustomFields_2[_e];
                customFieldTypeDefs += "\n                        input ".concat(getStructInputName(entityName, structCustomField), " {\n                            ").concat(mapToStructFields(structCustomField.fields, wrapListType(getGraphQlInputType(entityName))), "\n                        }\n                    ");
            }
        }
        if (hasCreateInputType) {
            if (writeableNonLocalizedFields.length) {
                var createCustomFieldsInputType = "Create".concat(entityName, "CustomFieldsInput");
                if (!schema.getType(createCustomFieldsInputType)) {
                    customFieldTypeDefs += "\n                        input ".concat(createCustomFieldsInputType, " {\n                           ").concat(mapToFields(writeableNonLocalizedFields, wrapListType(getGraphQlInputType(entityName)), shared_utils_1.getGraphQlInputName), "\n                        }\n                    ");
                }
                else {
                    customFieldTypeDefs += "\n                        extend input ".concat(createCustomFieldsInputType, " {\n                           ").concat(mapToFields(writeableNonLocalizedFields, wrapListType(getGraphQlInputType(entityName)), shared_utils_1.getGraphQlInputName), "\n                        }\n                    ");
                }
                customFieldTypeDefs += "\n                    extend input Create".concat(entityName, "Input {\n                        customFields: ").concat(createCustomFieldsInputType, "\n                    }\n                ");
            }
            else {
                customFieldTypeDefs += "\n                   extend input Create".concat(entityName, "Input {\n                       customFields: JSON\n                   }\n               ");
            }
        }
        if (hasUpdateInputType) {
            if (writeableNonLocalizedFields.length) {
                var updateCustomFieldsInputType = "Update".concat(entityName, "CustomFieldsInput");
                if (!schema.getType(updateCustomFieldsInputType)) {
                    customFieldTypeDefs += "\n                        input ".concat(updateCustomFieldsInputType, " {\n                           ").concat(mapToFields(writeableNonLocalizedFields, wrapListType(getGraphQlInputType(entityName)), shared_utils_1.getGraphQlInputName), "\n                        }\n                    ");
                }
                else {
                    customFieldTypeDefs += "\n                        extend input ".concat(updateCustomFieldsInputType, " {\n                           ").concat(mapToFields(writeableNonLocalizedFields, wrapListType(getGraphQlInputType(entityName)), shared_utils_1.getGraphQlInputName), "\n                        }\n                    ");
                }
                customFieldTypeDefs += "\n                    extend input Update".concat(entityName, "Input {\n                        customFields: ").concat(updateCustomFieldsInputType, "\n                    }\n                ");
            }
            else {
                customFieldTypeDefs += "\n                    extend input Update".concat(entityName, "Input {\n                        customFields: JSON\n                    }\n                ");
            }
        }
        if (sortableFields.length && schema.getType("".concat(entityName, "SortParameter"))) {
            // Sorting list fields makes no sense, so we only add "sort" fields
            // to non-list fields.
            customFieldTypeDefs += "\n                    extend input ".concat(entityName, "SortParameter {\n                         ").concat(mapToFields(sortableFields, function () { return 'SortOrder'; }), "\n                    }\n                ");
        }
        if (filterableFields.length && schema.getType("".concat(entityName, "FilterParameter"))) {
            customFieldTypeDefs += "\n                    extend input ".concat(entityName, "FilterParameter {\n                         ").concat(mapToFields(filterableFields, getFilterOperator), "\n                    }\n                ");
        }
        if (writeableLocalizedFields) {
            var translationInputs = [
                "".concat(entityName, "TranslationInput"),
                "Create".concat(entityName, "TranslationInput"),
                "Update".concat(entityName, "TranslationInput"),
            ];
            for (var _f = 0, translationInputs_1 = translationInputs; _f < translationInputs_1.length; _f++) {
                var inputName = translationInputs_1[_f];
                if (schema.getType(inputName)) {
                    if (writeableLocalizedFields.length) {
                        customFieldTypeDefs += "\n                            input ".concat(inputName, "CustomFields {\n                                ").concat(mapToFields(writeableLocalizedFields, wrapListType(getGraphQlType(entityName))), "\n                            }\n\n                            extend input ").concat(inputName, " {\n                                customFields: ").concat(inputName, "CustomFields\n                            }\n                        ");
                    }
                    else {
                        customFieldTypeDefs += "\n                            extend input ".concat(inputName, " {\n                                customFields: JSON\n                            }\n                        ");
                    }
                }
            }
        }
        var publicEntityName = "Public".concat(entityName);
        if (schema.getType(publicEntityName) && entitiesWithPublicTypes.includes(entityName)) {
            if (customEntityFields.length) {
                for (var _g = 0, structCustomFields_3 = structCustomFields; _g < structCustomFields_3.length; _g++) {
                    var structCustomField = structCustomFields_3[_g];
                    customFieldTypeDefs += "\n                        type ".concat(getStructTypeName(publicEntityName, structCustomField), " {\n                            ").concat(mapToStructFields(structCustomField.fields, wrapListType(getGraphQlTypeForStructField)), "\n                        }\n                    ");
                }
                customFieldTypeDefs += "\n                    type ".concat(publicEntityName, "CustomFields {\n                        ").concat(mapToFields(customEntityFields, wrapListType(getGraphQlType(entityName))), "\n                    }\n\n                    extend type ").concat(publicEntityName, " {\n                        customFields: ").concat(publicEntityName, "CustomFields\n                    }\n                ");
            }
            else {
                customFieldTypeDefs += "\n                    extend type ".concat(publicEntityName, " {\n                        customFields: JSON\n                    }\n                ");
            }
        }
    }
    var publicAddressFields = (_a = customFieldConfig.Address) === null || _a === void 0 ? void 0 : _a.filter(function (config) { return !config.internal && (publicOnly === true ? config.public !== false : true); });
    var writeablePublicAddressFields = publicAddressFields === null || publicAddressFields === void 0 ? void 0 : publicAddressFields.filter(function (field) { return !field.readonly; });
    if (publicAddressFields === null || publicAddressFields === void 0 ? void 0 : publicAddressFields.length) {
        // For custom fields on the Address entity, we also extend the OrderAddress
        // type (which is used to store address snapshots on Orders)
        if (schema.getType('OrderAddress')) {
            customFieldTypeDefs += "\n                extend type OrderAddress {\n                    customFields: AddressCustomFields\n                }\n            ";
        }
        if (schema.getType('UpdateOrderAddressInput') && (writeablePublicAddressFields === null || writeablePublicAddressFields === void 0 ? void 0 : writeablePublicAddressFields.length)) {
            customFieldTypeDefs += "\n                extend input UpdateOrderAddressInput {\n                    customFields: UpdateAddressCustomFieldsInput\n                }\n            ";
        }
    }
    else {
        if (schema.getType('OrderAddress')) {
            customFieldTypeDefs += "\n                extend type OrderAddress {\n                    customFields: JSON\n                }\n        ";
        }
    }
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(customFieldTypeDefs));
}
function addServerConfigCustomFields(typeDefsOrSchema, customFieldConfig) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var customFieldTypeDefs = "\n            \"\"\"\n            This type is deprecated in v2.2 in favor of the EntityCustomFields type,\n            which allows custom fields to be defined on user-supplied entities.\n            \"\"\"\n            type CustomFields {\n                ".concat(Object.keys(customFieldConfig).reduce(function (output, name) { return output + name + ': [CustomFieldConfig!]!\n'; }, ''), "\n            }\n\n            type EntityCustomFields {\n                entityName: String!\n                customFields: [CustomFieldConfig!]!\n            }\n\n            extend type ServerConfig {\n                \"\"\"\n                This field is deprecated in v2.2 in favor of the entityCustomFields field,\n                which allows custom fields to be defined on user-supplies entities.\n                \"\"\"\n                customFieldConfig: CustomFields!\n                entityCustomFields: [EntityCustomFields!]!\n            }\n        ");
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(customFieldTypeDefs));
}
function addActiveAdministratorCustomFields(typeDefsOrSchema, administratorCustomFields) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var writableCustomFields = administratorCustomFields === null || administratorCustomFields === void 0 ? void 0 : administratorCustomFields.filter(function (field) { return field.readonly !== true && field.internal !== true; });
    var extension = "\n        extend input UpdateActiveAdministratorInput {\n            customFields: ".concat(0 < (writableCustomFields === null || writableCustomFields === void 0 ? void 0 : writableCustomFields.length) ? 'UpdateAdministratorCustomFieldsInput' : 'JSON', "\n        }\n    ");
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(extension));
}
/**
 * If CustomFields are defined on the Customer entity, then an extra `customFields` field is added to
 * the `RegisterCustomerInput` so that public writable custom fields can be set when a new customer
 * is registered.
 */
function addRegisterCustomerCustomFieldsInput(typeDefsOrSchema, customerCustomFields) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    if (!customerCustomFields || customerCustomFields.length === 0) {
        return schema;
    }
    var publicWritableCustomFields = customerCustomFields.filter(function (fieldDef) {
        return fieldDef.public !== false && !fieldDef.readonly && !fieldDef.internal;
    });
    if (publicWritableCustomFields.length < 1) {
        return schema;
    }
    var customFieldTypeDefs = "\n        input RegisterCustomerCustomFieldsInput {\n            ".concat(mapToFields(publicWritableCustomFields, wrapListType(getGraphQlInputType('Customer')), shared_utils_1.getGraphQlInputName), "\n        }\n\n        extend input RegisterCustomerInput {\n            customFields: RegisterCustomerCustomFieldsInput\n        }\n    ");
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(customFieldTypeDefs));
}
/**
 * If CustomFields are defined on the Order entity, we add a `customFields` field to the ModifyOrderInput
 * type.
 */
function addModifyOrderCustomFields(typeDefsOrSchema, orderCustomFields) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    if (!orderCustomFields || orderCustomFields.length === 0) {
        return schema;
    }
    if (schema.getType('ModifyOrderInput') && schema.getType('UpdateOrderCustomFieldsInput')) {
        var customFieldTypeDefs = "\n                extend input ModifyOrderInput {\n                    customFields: UpdateOrderCustomFieldsInput\n                }\n            ";
        return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(customFieldTypeDefs));
    }
    return schema;
}
/**
 * If CustomFields are defined on the OrderLine entity, then an extra `customFields` argument
 * must be added to the `addItemToOrder` and `adjustOrderLine` mutations, as well as the related
 * fields in the `ModifyOrderInput` type.
 */
function addOrderLineCustomFieldsInput(typeDefsOrSchema, orderLineCustomFields, publicOnly) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    orderLineCustomFields = orderLineCustomFields.filter(function (f) { return f.internal !== true; });
    var publicCustomFields = orderLineCustomFields.filter(function (f) { return f.public !== false; });
    var customFields = publicOnly ? publicCustomFields : orderLineCustomFields;
    if (!customFields || customFields.length === 0) {
        return schema;
    }
    var schemaConfig = schema.toConfig();
    var mutationType = schemaConfig.mutation;
    if (!mutationType) {
        return schema;
    }
    var structFields = orderLineCustomFields.filter(function (f) { return f.type === 'struct'; });
    var structInputTypes = [];
    if (0 < structFields.length) {
        for (var _i = 0, structFields_1 = structFields; _i < structFields_1.length; _i++) {
            var structField = structFields_1[_i];
            var structInputName = getStructInputName('OrderLine', structField);
            structInputTypes.push(new graphql_1.GraphQLInputObjectType({
                name: structInputName,
                fields: structField.fields.reduce(function (fields, field) {
                    var _a;
                    var name = (0, shared_utils_1.getGraphQlInputName)(field);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    var primitiveType = schema.getType(getGraphQlInputType('OrderLine')(field));
                    var type = field.list === true ? new graphql_1.GraphQLList(primitiveType) : primitiveType;
                    return __assign(__assign({}, fields), (_a = {}, _a[name] = { type: type }, _a));
                }, {}),
            }));
        }
    }
    var input = new graphql_1.GraphQLInputObjectType({
        name: 'OrderLineCustomFieldsInput',
        fields: customFields.reduce(function (fields, field) {
            var _a;
            var _b;
            var name = (0, shared_utils_1.getGraphQlInputName)(field);
            var inputTypeName = getGraphQlInputType('OrderLine')(field);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            var inputType = (_b = schema.getType(getGraphQlInputType('OrderLine')(field))) !== null && _b !== void 0 ? _b : structInputTypes.find(function (t) { return t.name === inputTypeName; });
            if (!inputType) {
                throw new Error("Could not find input type for field ".concat(field.name));
            }
            var type = field.list === true ? new graphql_1.GraphQLList(inputType) : inputType;
            return __assign(__assign({}, fields), (_a = {}, _a[name] = { type: type }, _a));
        }, {}),
    });
    schemaConfig.types = __spreadArray(__spreadArray(__spreadArray([], schemaConfig.types, true), structInputTypes, true), [input], false);
    var addItemToOrderMutation = mutationType.getFields().addItemToOrder;
    var adjustOrderLineMutation = mutationType.getFields().adjustOrderLine;
    if (addItemToOrderMutation) {
        addItemToOrderMutation.args = __spreadArray(__spreadArray([], addItemToOrderMutation.args, true), [
            {
                name: 'customFields',
                type: input,
                description: null,
                defaultValue: null,
                extensions: {},
                astNode: null,
                deprecationReason: null,
            },
        ], false);
    }
    if (adjustOrderLineMutation) {
        adjustOrderLineMutation.args = __spreadArray(__spreadArray([], adjustOrderLineMutation.args, true), [
            {
                name: 'customFields',
                type: input,
                description: null,
                defaultValue: null,
                extensions: {},
                astNode: null,
                deprecationReason: null,
            },
        ], false);
    }
    var extendedSchema = new graphql_1.GraphQLSchema(schemaConfig);
    if (schema.getType('AddItemInput')) {
        var customFieldTypeDefs = "\n            extend input AddItemInput {\n                customFields: OrderLineCustomFieldsInput\n            }\n        ";
        extendedSchema = (0, graphql_1.extendSchema)(extendedSchema, (0, graphql_1.parse)(customFieldTypeDefs));
    }
    if (schema.getType('OrderLineInput')) {
        var customFieldTypeDefs = "\n            extend input OrderLineInput {\n                customFields: OrderLineCustomFieldsInput\n            }\n        ";
        extendedSchema = (0, graphql_1.extendSchema)(extendedSchema, (0, graphql_1.parse)(customFieldTypeDefs));
    }
    if (schema.getType('AddItemToDraftOrderInput')) {
        var customFieldTypeDefs = "\n            extend input AddItemToDraftOrderInput {\n                customFields: OrderLineCustomFieldsInput\n            }\n        ";
        extendedSchema = (0, graphql_1.extendSchema)(extendedSchema, (0, graphql_1.parse)(customFieldTypeDefs));
    }
    if (schema.getType('AdjustDraftOrderLineInput')) {
        var customFieldTypeDefs = "\n            extend input AdjustDraftOrderLineInput {\n                customFields: OrderLineCustomFieldsInput\n            }\n        ";
        extendedSchema = (0, graphql_1.extendSchema)(extendedSchema, (0, graphql_1.parse)(customFieldTypeDefs));
    }
    return extendedSchema;
}
function addShippingMethodQuoteCustomFields(typeDefsOrSchema, shippingMethodCustomFields) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var customFieldTypeDefs = '';
    var publicCustomFields = shippingMethodCustomFields.filter(function (f) { return f.public !== false; });
    if (0 < publicCustomFields.length) {
        customFieldTypeDefs = "\n            extend type ShippingMethodQuote {\n                customFields: ShippingMethodCustomFields\n            }\n        ";
    }
    else {
        customFieldTypeDefs = "\n            extend type ShippingMethodQuote {\n                customFields: JSON\n            }\n        ";
    }
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(customFieldTypeDefs));
}
function addPaymentMethodQuoteCustomFields(typeDefsOrSchema, paymentMethodCustomFields) {
    var schema = typeof typeDefsOrSchema === 'string' ? (0, graphql_1.buildSchema)(typeDefsOrSchema) : typeDefsOrSchema;
    var customFieldTypeDefs = '';
    var publicCustomFields = paymentMethodCustomFields.filter(function (f) { return f.public !== false; });
    if (0 < publicCustomFields.length) {
        customFieldTypeDefs = "\n            extend type PaymentMethodQuote {\n                customFields: PaymentMethodCustomFields\n            }\n        ";
    }
    else {
        customFieldTypeDefs = "\n            extend type PaymentMethodQuote {\n                customFields: JSON\n            }\n        ";
    }
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(customFieldTypeDefs));
}
/**
 * Maps an array of CustomFieldConfig objects into a string of SDL fields.
 */
function mapToFields(fieldDefs, typeFn, nameFn) {
    var res = fieldDefs
        .map(function (field) {
        var type = typeFn(field);
        if (!type) {
            return;
        }
        var name = nameFn ? nameFn(field) : field.name;
        var deprecationDirective = getDeprecationDirective(field);
        return "".concat(name, ": ").concat(type, " ").concat(deprecationDirective);
    })
        .filter(function (x) { return x != null; });
    return res.join('\n');
}
/**
 * Maps an array of CustomFieldConfig objects into a string of SDL fields.
 */
function mapToStructFields(fieldDefs, typeFn, nameFn) {
    var res = fieldDefs
        .map(function (field) {
        var type = typeFn(field);
        if (!type) {
            return;
        }
        var name = nameFn ? nameFn(field) : field.name;
        // Note: Struct fields don't currently support deprecation in the type system,
        // but we keep this consistent for future extensibility
        return "".concat(name, ": ").concat(type);
    })
        .filter(function (x) { return x != null; });
    return res.join('\n');
}
function getFilterOperator(config) {
    switch (config.type) {
        case 'datetime':
            return config.list ? 'DateListOperators' : 'DateOperators';
        case 'string':
        case 'localeString':
        case 'text':
        case 'localeText':
            return config.list ? 'StringListOperators' : 'StringOperators';
        case 'boolean':
            return config.list ? 'BooleanListOperators' : 'BooleanOperators';
        case 'int':
        case 'float':
            return config.list ? 'NumberListOperators' : 'NumberOperators';
        case 'relation':
        case 'struct':
            return undefined;
        default:
            (0, shared_utils_1.assertNever)(config);
    }
}
function getGraphQlInputType(entityName) {
    return function (config) {
        switch (config.type) {
            case 'relation':
                return 'ID';
            case 'struct':
                return getStructInputName(entityName, config);
            default:
                return getGraphQlType(entityName)(config);
        }
    };
}
function wrapListType(getTypeFn) {
    return function (def) {
        var type = getTypeFn(def);
        if (!type) {
            return;
        }
        return def.list ? "[".concat(type, "!]") : type;
    };
}
function getGraphQlType(entityName) {
    return function (config) {
        switch (config.type) {
            case 'string':
            case 'localeString':
            case 'text':
            case 'localeText':
                return 'String';
            case 'datetime':
                return 'DateTime';
            case 'boolean':
                return 'Boolean';
            case 'int':
                return 'Int';
            case 'float':
                return 'Float';
            case 'relation':
                return config.graphQLType || config.entity.name;
            case 'struct':
                return getStructTypeName(entityName, config);
            default:
                (0, shared_utils_1.assertNever)(config);
        }
    };
}
function getGraphQlTypeForStructField(config) {
    switch (config.type) {
        case 'string':
        case 'text':
            return 'String';
        case 'datetime':
            return 'DateTime';
        case 'boolean':
            return 'Boolean';
        case 'int':
            return 'Int';
        case 'float':
            return 'Float';
        default:
            (0, shared_utils_1.assertNever)(config);
    }
}
function getStructTypeName(entityName, fieldDef) {
    return "".concat(entityName).concat(pascalCase(fieldDef.name), "Struct");
}
function getStructInputName(entityName, fieldDef) {
    return "".concat(entityName).concat(pascalCase(fieldDef.name), "StructInput");
}
function pascalCase(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
function getDeprecationDirective(field) {
    if (!field.deprecated) {
        return '';
    }
    if (typeof field.deprecated === 'string') {
        // Escape quotes in the deprecation reason
        var escapedReason = field.deprecated.replace(/"/g, '\\"');
        return "@deprecated(reason: \"".concat(escapedReason, "\")");
    }
    return '@deprecated';
}
