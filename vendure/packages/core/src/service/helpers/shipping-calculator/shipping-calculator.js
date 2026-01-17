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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingCalculator = void 0;
var common_1 = require("@nestjs/common");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var ShippingCalculator = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ShippingCalculator = _classThis = /** @class */ (function () {
        function ShippingCalculator_1(shippingMethodService) {
            this.shippingMethodService = shippingMethodService;
        }
        /**
         * Returns an array of each eligible ShippingMethod for the given Order and sorts them by
         * price, with the cheapest first.
         *
         * The `skipIds` argument is used to skip ShippingMethods with those IDs from being checked and calculated.
         */
        ShippingCalculator_1.prototype.getEligibleShippingMethods = function (ctx_1, order_1) {
            return __awaiter(this, arguments, void 0, function (ctx, order, skipIds) {
                var shippingMethods, checkEligibilityPromises, eligibleMethods;
                var _this = this;
                if (skipIds === void 0) { skipIds = []; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.shippingMethodService.getActiveShippingMethods(ctx)];
                        case 1:
                            shippingMethods = (_a.sent()).filter(function (method) { return !skipIds.includes(method.id); });
                            checkEligibilityPromises = shippingMethods.map(function (method) {
                                return _this.checkEligibilityByShippingMethod(ctx, order, method);
                            });
                            return [4 /*yield*/, Promise.all(checkEligibilityPromises)];
                        case 2:
                            eligibleMethods = _a.sent();
                            return [2 /*return*/, eligibleMethods.filter(shared_utils_1.notNullOrUndefined).sort(function (a, b) { return a.result.price - b.result.price; })];
                    }
                });
            });
        };
        ShippingCalculator_1.prototype.getMethodIfEligible = function (ctx, order, shippingMethodId) {
            return __awaiter(this, void 0, void 0, function () {
                var method, eligible;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.shippingMethodService.findOne(ctx, shippingMethodId)];
                        case 1:
                            method = _a.sent();
                            if (!method) return [3 /*break*/, 3];
                            return [4 /*yield*/, method.test(ctx, order)];
                        case 2:
                            eligible = _a.sent();
                            if (eligible) {
                                return [2 /*return*/, method];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ShippingCalculator_1.prototype.checkEligibilityByShippingMethod = function (ctx, order, method) {
            return __awaiter(this, void 0, void 0, function () {
                var eligible, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, method.test(ctx, order)];
                        case 1:
                            eligible = _a.sent();
                            if (!eligible) return [3 /*break*/, 3];
                            return [4 /*yield*/, method.apply(ctx, order)];
                        case 2:
                            result = _a.sent();
                            if (result) {
                                return [2 /*return*/, { method: method, result: result }];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return ShippingCalculator_1;
    }());
    __setFunctionName(_classThis, "ShippingCalculator");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShippingCalculator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShippingCalculator = _classThis;
}();
exports.ShippingCalculator = ShippingCalculator;
