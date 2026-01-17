"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeTransitionDefinitions = mergeTransitionDefinitions;
var simple_deep_clone_1 = require("@vendure/common/lib/simple-deep-clone");
/**
 * Merges two state machine Transitions definitions.
 */
function mergeTransitionDefinitions(a, b) {
    if (!b) {
        return a;
    }
    var merged = (0, simple_deep_clone_1.simpleDeepClone)(a);
    for (var _i = 0, _a = Object.keys(b); _i < _a.length; _i++) {
        var k = _a[_i];
        var key = k;
        if (merged.hasOwnProperty(key)) {
            if (b[key].mergeStrategy === 'replace') {
                merged[key].to = b[key].to;
            }
            else {
                merged[key].to = merged[key].to.concat(b[key].to);
            }
        }
        else {
            merged[key] = b[key];
        }
    }
    return merged;
}
