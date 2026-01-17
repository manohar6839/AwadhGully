"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
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
exports.RefundStateMachine = void 0;
var common_1 = require("@nestjs/common");
var errors_1 = require("../../../common/error/errors");
var finite_state_machine_1 = require("../../../common/finite-state-machine/finite-state-machine");
var merge_transition_definitions_1 = require("../../../common/finite-state-machine/merge-transition-definitions");
var validate_transition_definition_1 = require("../../../common/finite-state-machine/validate-transition-definition");
var utils_1 = require("../../../common/utils");
var vendure_logger_1 = require("../../../config/logger/vendure-logger");
var RefundStateMachine = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RefundStateMachine = _classThis = /** @class */ (function () {
        function RefundStateMachine_1(configService) {
            this.configService = configService;
            this.initialState = 'Pending';
            this.config = this.initConfig();
        }
        RefundStateMachine_1.prototype.getInitialState = function () {
            return this.initialState;
        };
        RefundStateMachine_1.prototype.getNextStates = function (refund) {
            var fsm = new finite_state_machine_1.FSM(this.config, refund.state);
            return fsm.getNextStates();
        };
        RefundStateMachine_1.prototype.transition = function (ctx, order, refund, state) {
            return __awaiter(this, void 0, void 0, function () {
                var fsm, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fsm = new finite_state_machine_1.FSM(this.config, refund.state);
                            return [4 /*yield*/, fsm.transitionTo(state, { ctx: ctx, order: order, refund: refund })];
                        case 1:
                            result = _a.sent();
                            refund.state = state;
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        RefundStateMachine_1.prototype.initConfig = function () {
            var _this = this;
            var _a;
            var processes = __spreadArray([], ((_a = this.configService.paymentOptions.refundProcess) !== null && _a !== void 0 ? _a : []), true);
            var allTransitions = processes.reduce(function (transitions, process) {
                return (0, merge_transition_definitions_1.mergeTransitionDefinitions)(transitions, process.transitions);
            }, {});
            var validationResult = (0, validate_transition_definition_1.validateTransitionDefinition)(allTransitions, this.initialState);
            if (!validationResult.valid && validationResult.error) {
                vendure_logger_1.Logger.error("The refund process has an invalid configuration:");
                throw new Error(validationResult.error);
            }
            if (validationResult.valid && validationResult.error) {
                vendure_logger_1.Logger.warn("Refund process: ".concat(validationResult.error));
            }
            return {
                transitions: allTransitions,
                onTransitionStart: function (fromState, toState, data) { return __awaiter(_this, void 0, void 0, function () {
                    var _i, processes_1, process_1, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, processes_1 = processes;
                                _a.label = 1;
                            case 1:
                                if (!(_i < processes_1.length)) return [3 /*break*/, 4];
                                process_1 = processes_1[_i];
                                if (!(typeof process_1.onTransitionStart === 'function')) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(process_1.onTransitionStart(fromState, toState, data))];
                            case 2:
                                result = _a.sent();
                                if (result === false || typeof result === 'string') {
                                    return [2 /*return*/, result];
                                }
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); },
                onTransitionEnd: function (fromState, toState, data) { return __awaiter(_this, void 0, void 0, function () {
                    var _i, processes_2, process_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, processes_2 = processes;
                                _a.label = 1;
                            case 1:
                                if (!(_i < processes_2.length)) return [3 /*break*/, 4];
                                process_2 = processes_2[_i];
                                if (!(typeof process_2.onTransitionEnd === 'function')) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(process_2.onTransitionEnd(fromState, toState, data))];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); },
                onError: function (fromState, toState, message) { return __awaiter(_this, void 0, void 0, function () {
                    var _i, processes_3, process_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, processes_3 = processes;
                                _a.label = 1;
                            case 1:
                                if (!(_i < processes_3.length)) return [3 /*break*/, 4];
                                process_3 = processes_3[_i];
                                if (!(typeof process_3.onTransitionError === 'function')) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, utils_1.awaitPromiseOrObservable)(process_3.onTransitionError(fromState, toState, message))];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: throw new errors_1.IllegalOperationError(message || 'error.cannot-transition-refund-from-to', {
                                fromState: fromState,
                                toState: toState,
                            });
                        }
                    });
                }); },
            };
        };
        return RefundStateMachine_1;
    }());
    __setFunctionName(_classThis, "RefundStateMachine");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RefundStateMachine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RefundStateMachine = _classThis;
}();
exports.RefundStateMachine = RefundStateMachine;
