"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = mergeDeep;
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var safe_assign_1 = require("../../../common/safe-assign");
/**
 * Merges properties into a target entity. This is needed for the cases in which a
 * property already exists on the target, but the hydrated version also contains that
 * property with a different set of properties. This prevents the original target
 * entity from having data overwritten.
 */
function mergeDeep(a, b, visited) {
    var _c;
    if (visited === void 0) { visited = new WeakSet(); }
    if (!a) {
        return b;
    }
    // Prevent circular references
    if ((0, shared_utils_1.isObject)(b)) {
        if (visited.has(b)) {
            return a;
        }
        visited.add(b);
    }
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.length > 1) {
        if (a[0].hasOwnProperty('id')) {
            // If the array contains entities, we can use the id to match them up
            // so that we ensure that we don't merge properties from different entities
            // with the same index.
            var aIds = a.map(function (e) { return e.id; });
            var bIds = b.map(function (e) { return e.id; });
            if (JSON.stringify(aIds) !== JSON.stringify(bIds)) {
                // The entities in the arrays are not in the same order, so we can't
                // safely merge them. We need to sort the `b` array so that the entities
                // are in the same order as the `a` array.
                var idToIndexMap_1 = new Map();
                a.forEach(function (item, index) {
                    idToIndexMap_1.set(item.id, index);
                });
                b.sort(function (_a, _b) {
                    return idToIndexMap_1.get(_a.id) - idToIndexMap_1.get(_b.id);
                });
            }
        }
    }
    for (var _i = 0, _d = Object.entries(b); _i < _d.length; _i++) {
        var _e = _d[_i], key = _e[0], value = _e[1];
        // Guard against prototype pollution - block dangerous property names
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
        }
        if ((_c = Object.getOwnPropertyDescriptor(b, key)) === null || _c === void 0 ? void 0 : _c.writable) {
            if (Array.isArray(value) || (0, shared_utils_1.isObject)(value)) {
                // Skip if we detect a circular reference
                if ((0, shared_utils_1.isObject)(value) && visited.has(value)) {
                    continue;
                }
                // Only merge recursively if the property exists as an own property in the destination object
                if (Object.prototype.hasOwnProperty.call(a, key) &&
                    (Array.isArray(a[key]) || (0, shared_utils_1.isObject)(a[key]))) {
                    var mergedValue = mergeDeep(a[key], b[key], visited);
                    (0, safe_assign_1.safeAssign)(a, key, mergedValue);
                }
                else {
                    (0, safe_assign_1.safeAssign)(a, key, value);
                }
            }
            else {
                (0, safe_assign_1.safeAssign)(a, key, value);
            }
        }
    }
    return a !== null && a !== void 0 ? a : b;
}
