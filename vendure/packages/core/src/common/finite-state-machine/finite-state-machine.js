"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSM = void 0;
var utils_1 = require("../utils");
/**
 * @description
 * A simple type-safe finite state machine. This is used internally to control the Order process, ensuring that
 * the state of Orders, Payments, Fulfillments and Refunds follows a well-defined behaviour.
 *
 * @docsCategory StateMachine
 */
var FSM = /** @class */ (function () {
    function FSM(config, initialState) {
        this.config = config;
        this._currentState = initialState;
        this._initialState = initialState;
    }
    Object.defineProperty(FSM.prototype, "initialState", {
        /**
         * Returns the state with which the FSM was initialized.
         */
        get: function () {
            return this._initialState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FSM.prototype, "currentState", {
        /**
         * Returns the current state.
         */
        get: function () {
            return this._currentState;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Attempts to transition from the current state to the given state. If this transition is not allowed
     * per the config, then an error will be logged.
     */
    FSM.prototype.transitionTo = function (state, data) {
        return __awaiter(this, void 0, void 0, function () {
            var finalizeNoop, canTransition, fromState_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalizeNoop = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/];
                            });
                        }); };
                        if (!this.canTransitionTo(state)) return [3 /*break*/, 5];
                        if (!(typeof this.config.onTransitionStart === 'function')) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(this.config.onTransitionStart(this._currentState, state, data))];
                    case 1:
                        canTransition = _a.sent();
                        if (!(canTransition === false)) return [3 /*break*/, 2];
                        return [2 /*return*/, { finalize: finalizeNoop }];
                    case 2:
                        if (!(typeof canTransition === 'string')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.onError(this._currentState, state, canTransition)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { finalize: finalizeNoop }];
                    case 4:
                        fromState_1 = this._currentState;
                        // All is well, so transition to the new state.
                        this._currentState = state;
                        // If the onTransitionEnd callback is defined, invoke it.
                        return [2 /*return*/, {
                                finalize: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(typeof this.config.onTransitionEnd === 'function')) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(this.config.onTransitionEnd(fromState_1, state, data))];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); },
                            }];
                    case 5: return [4 /*yield*/, this.onError(this._currentState, state)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, { finalize: finalizeNoop }];
                }
            });
        });
    };
    /**
     * Jumps from the current state to the given state without regard to whether this transition is allowed or not.
     * None of the lifecycle callbacks will be invoked.
     */
    FSM.prototype.jumpTo = function (state) {
        this._currentState = state;
    };
    /**
     * Returns an array of state to which the machine may transition from the current state.
     */
    FSM.prototype.getNextStates = function () {
        var _a, _b;
        return (_b = (_a = this.config.transitions[this._currentState]) === null || _a === void 0 ? void 0 : _a.to) !== null && _b !== void 0 ? _b : [];
    };
    /**
     * Returns true if the machine can transition from its current state to the given state.
     */
    FSM.prototype.canTransitionTo = function (state) {
        return -1 < this.config.transitions[this._currentState].to.indexOf(state);
    };
    FSM.prototype.onError = function (fromState, toState, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof this.config.onError === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(this.config.onError(fromState, toState, message))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return FSM;
}());
exports.FSM = FSM;
