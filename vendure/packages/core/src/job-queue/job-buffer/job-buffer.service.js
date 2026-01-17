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
exports.JobBufferService = void 0;
var common_1 = require("@nestjs/common");
var errors_1 = require("../../common/error/errors");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
/**
 * @description
 * Used to manage {@link JobBuffer}s.Primarily intended to be used internally by the {@link JobQueueService}, which
 * exposes its public-facing functionality.
 */
var JobBufferService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var JobBufferService = _classThis = /** @class */ (function () {
        function JobBufferService_1(configService) {
            this.configService = configService;
            this.buffers = new Set();
            this.storageStrategy = configService.jobQueueOptions.jobBufferStorageStrategy;
        }
        JobBufferService_1.prototype.addBuffer = function (buffer) {
            var idAlreadyExists = Array.from(this.buffers).find(function (p) { return p.id === buffer.id; });
            if (idAlreadyExists) {
                throw new errors_1.InternalServerError("There is already a JobBufferProcessor with the id \"".concat(buffer.id, "\". Ids must be unique"));
            }
            this.buffers.add(buffer);
        };
        JobBufferService_1.prototype.removeBuffer = function (buffer) {
            this.buffers.delete(buffer);
        };
        JobBufferService_1.prototype.add = function (job) {
            return __awaiter(this, void 0, void 0, function () {
                var collected, _i, _a, buffer, shouldCollect;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            collected = false;
                            _i = 0, _a = this.buffers;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            buffer = _a[_i];
                            return [4 /*yield*/, buffer.collect(job)];
                        case 2:
                            shouldCollect = _b.sent();
                            if (!shouldCollect) return [3 /*break*/, 4];
                            collected = true;
                            return [4 /*yield*/, this.storageStrategy.add(buffer.id, job)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, collected];
                    }
                });
            });
        };
        JobBufferService_1.prototype.bufferSize = function (forBuffers) {
            var buffer = forBuffers !== null && forBuffers !== void 0 ? forBuffers : Array.from(this.buffers);
            return this.storageStrategy.bufferSize(buffer.map(function (p) { return (typeof p === 'string' ? p : p.id); }));
        };
        JobBufferService_1.prototype.flush = function (forBuffers) {
            return __awaiter(this, void 0, void 0, function () {
                var jobQueueStrategy, buffers, flushResult, result, _i, _a, buffer, jobsForBuffer, jobsToAdd, e_1, _b, jobsToAdd_1, job, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            jobQueueStrategy = this.configService.jobQueueOptions.jobQueueStrategy;
                            buffers = forBuffers !== null && forBuffers !== void 0 ? forBuffers : Array.from(this.buffers);
                            return [4 /*yield*/, this.storageStrategy.flush(buffers.map(function (p) { return (typeof p === 'string' ? p : p.id); }))];
                        case 1:
                            flushResult = _e.sent();
                            result = [];
                            _i = 0, _a = this.buffers;
                            _e.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 11];
                            buffer = _a[_i];
                            jobsForBuffer = flushResult[buffer.id];
                            if (!(jobsForBuffer === null || jobsForBuffer === void 0 ? void 0 : jobsForBuffer.length)) return [3 /*break*/, 10];
                            jobsToAdd = jobsForBuffer;
                            _e.label = 3;
                        case 3:
                            _e.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, buffer.reduce(jobsForBuffer)];
                        case 4:
                            jobsToAdd = _e.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _e.sent();
                            vendure_logger_1.Logger.error("Error encountered processing jobs in JobBuffer \"".concat(buffer.id, "\":\n").concat(JSON.stringify(e_1.message)), undefined, e_1.stack);
                            return [3 /*break*/, 6];
                        case 6:
                            _b = 0, jobsToAdd_1 = jobsToAdd;
                            _e.label = 7;
                        case 7:
                            if (!(_b < jobsToAdd_1.length)) return [3 /*break*/, 10];
                            job = jobsToAdd_1[_b];
                            _d = (_c = result).push;
                            return [4 /*yield*/, jobQueueStrategy.add(job)];
                        case 8:
                            _d.apply(_c, [_e.sent()]);
                            _e.label = 9;
                        case 9:
                            _b++;
                            return [3 /*break*/, 7];
                        case 10:
                            _i++;
                            return [3 /*break*/, 2];
                        case 11: return [2 /*return*/, result];
                    }
                });
            });
        };
        return JobBufferService_1;
    }());
    __setFunctionName(_classThis, "JobBufferService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JobBufferService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JobBufferService = _classThis;
}();
exports.JobBufferService = JobBufferService;
