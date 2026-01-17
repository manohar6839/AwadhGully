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
exports.moveToIndex = moveToIndex;
var utils_1 = require("../../../common/utils");
/**
 * Moves the target Orderable entity to the given index amongst its siblings.
 * Returns the siblings (including the target) which should then be
 * persisted to the database.
 */
function moveToIndex(index, target, siblings) {
    var normalizedIndex = Math.max(Math.min(index, siblings.length), 0);
    var currentIndex = siblings.findIndex(function (sibling) { return (0, utils_1.idsAreEqual)(sibling.id, target.id); });
    var orderedSiblings = __spreadArray([], siblings, true).sort(function (a, b) { return (a.position > b.position ? 1 : -1); });
    var siblingsWithTarget = currentIndex < 0 ? __spreadArray(__spreadArray([], orderedSiblings, true), [target], false) : __spreadArray([], orderedSiblings, true);
    currentIndex = siblingsWithTarget.findIndex(function (sibling) { return (0, utils_1.idsAreEqual)(sibling.id, target.id); });
    if (currentIndex !== normalizedIndex) {
        siblingsWithTarget.splice(normalizedIndex, 0, siblingsWithTarget.splice(currentIndex, 1)[0]);
        siblingsWithTarget.forEach(function (collection, i) {
            collection.position = i;
            if (target.id === collection.id) {
                target.position = i;
            }
        });
    }
    return siblingsWithTarget;
}
