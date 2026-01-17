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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransitionDefinition = validateTransitionDefinition;
/**
 * This function validates a finite state machine transition graph to ensure
 * that all states are reachable from the given initial state.
 */
function validateTransitionDefinition(transitions, initialState) {
    if (!transitions[initialState]) {
        return {
            valid: false,
            error: "The initial state \"".concat(initialState, "\" is not defined"),
        };
    }
    var states = Object.keys(transitions);
    var result = states.reduce(function (res, state) {
        var _a;
        return __assign(__assign({}, res), (_a = {}, _a[state] = { reachable: false }, _a));
    }, {});
    // walk the state graph starting with the initialState and
    // check whether all states are reachable.
    function allStatesReached() {
        return Object.values(result).every(function (r) { return r.reachable; });
    }
    function walkGraph(state) {
        var candidates = transitions[state].to;
        result[state].reachable = true;
        if (allStatesReached()) {
            return true;
        }
        for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
            var candidate = candidates_1[_i];
            if (result[candidate] === undefined) {
                throw new Error("The state \"".concat(state, "\" has a transition to an unknown state \"").concat(candidate, "\""));
            }
            if (!result[candidate].reachable) {
                walkGraph(candidate);
            }
        }
    }
    try {
        walkGraph(initialState);
    }
    catch (e) {
        return {
            valid: false,
            error: e.message,
        };
    }
    var error = !allStatesReached()
        ? "The following states are unreachable: ".concat(Object.entries(result)
            .filter(function (_a) {
            var s = _a[0], v = _a[1];
            return !v.reachable;
        })
            .map(function (_a) {
            var s = _a[0];
            return s;
        })
            .join(', '))
        : undefined;
    return {
        valid: true,
        error: error,
    };
}
