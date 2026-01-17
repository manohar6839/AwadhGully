"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.samplesEach = samplesEach;
/**
 * Returns true if and only if exactly one item from each
 * of the "groups" arrays appears in the "sample" array.
 */
function samplesEach(sample, groups) {
    if (sample.length !== groups.length) {
        return false;
    }
    return groups.every(function (group) {
        for (var _i = 0, sample_1 = sample; _i < sample_1.length; _i++) {
            var item = sample_1[_i];
            if (group.includes(item)) {
                return true;
            }
        }
        return false;
    });
}
