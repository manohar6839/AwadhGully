"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomFieldsConfigWithoutInterfaces = getCustomFieldsConfigWithoutInterfaces;
var graphql_1 = require("graphql");
/**
 * @description
 * Because the "Region" entity is an interface, it cannot be extended directly, so we need to
 * replace it if found in the custom field config with its concrete implementations.
 *
 * Same goes for the "StockMovement" entity.
 */
function getCustomFieldsConfigWithoutInterfaces(customFieldConfig, schema) {
    var _a;
    var entries = Object.entries(customFieldConfig);
    var interfaceEntities = ['Region', 'StockMovement'];
    var _loop_1 = function (entityName) {
        var index = entries.findIndex(function (_a) {
            var name = _a[0];
            return name === entityName;
        });
        if (index !== -1) {
            // An interface type such as Region or StockMovement cannot directly be extended.
            // Instead, we will use the concrete types that implement it.
            var interfaceType = schema.getType(entityName);
            if ((0, graphql_1.isInterfaceType)(interfaceType)) {
                var implementations = schema.getImplementations(interfaceType);
                // Remove the interface from the list of entities to which custom fields can be added
                entries.splice(index, 1);
                for (var _b = 0, _c = implementations.objects; _b < _c.length; _b++) {
                    var implementation = _c[_b];
                    entries.push([implementation.name, (_a = customFieldConfig[entityName]) !== null && _a !== void 0 ? _a : []]);
                }
            }
        }
    };
    for (var _i = 0, interfaceEntities_1 = interfaceEntities; _i < interfaceEntities_1.length; _i++) {
        var entityName = interfaceEntities_1[_i];
        _loop_1(entityName);
    }
    return entries;
}
