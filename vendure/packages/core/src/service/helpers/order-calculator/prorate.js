"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prorate = prorate;
/**
 * @description
 * "Prorate" means "to divide, distribute, or calculate proportionately."
 *
 * This function is used to distribute the `total` into parts proportional
 * to the `distribution` array. This is required to split up an Order-level
 * discount between OrderLines, and then between OrderItems in the line.
 *
 * Based on https://stackoverflow.com/a/12844927/772859
 */
function prorate(weights, amount) {
    var totalWeight = weights.reduce(function (total, val) { return total + val; }, 0);
    var length = weights.length;
    var actual = [];
    var error = [];
    var rounded = [];
    var added = 0;
    var i = 0;
    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
        var w = weights_1[_i];
        actual[i] = totalWeight === 0 ? amount / weights.length : amount * (w / totalWeight);
        rounded[i] = Math.floor(actual[i]);
        error[i] = actual[i] - rounded[i];
        added += rounded[i];
        i += 1;
    }
    while (added < amount) {
        var maxError = 0.0;
        var maxErrorIndex = -1;
        for (var e = 0; e < length; ++e) {
            if (error[e] > maxError) {
                maxError = error[e];
                maxErrorIndex = e;
            }
        }
        rounded[maxErrorIndex] += 1;
        error[maxErrorIndex] -= 1;
        added += 1;
    }
    return rounded;
}
