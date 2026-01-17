"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOptionsObjectToArray = findOptionsObjectToArray;
/**
 * Some internal APIs depend on the TypeORM FindOptions `relations` property being a string array.
 * This function converts the new-style FindOptionsRelations object to a string array.
 */
function findOptionsObjectToArray(input, parentKey) {
    if (Array.isArray(input)) {
        return input;
    }
    var keys = Object.keys(input);
    return keys.reduce(function (acc, key) {
        var value = input[key];
        var path = parentKey ? "".concat(parentKey, ".").concat(key) : key;
        acc.push(path); // Push parent key instead of path
        if (typeof value === 'object' && value !== null) {
            var subKeys = findOptionsObjectToArray(value, path);
            acc.push.apply(acc, subKeys);
        }
        return acc;
    }, []);
}
