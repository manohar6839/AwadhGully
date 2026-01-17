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
exports.JobQueueService = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("../common");
var config_1 = require("../config");
var constants_1 = require("./constants");
var job_queue_1 = require("./job-queue");
/**
 * @description
 * The JobQueueService is used to create new {@link JobQueue} instances and access
 * existing jobs.
 *
 * @example
 * ```ts
 * // A service which transcodes video files
 * class VideoTranscoderService {
 *
 *   private jobQueue: JobQueue<{ videoId: string; }>;
 *
 *   async onModuleInit() {
 *     // The JobQueue is created on initialization
 *     this.jobQueue = await this.jobQueueService.createQueue({
 *       name: 'transcode-video',
 *       process: async job => {
 *         return await this.transcodeVideo(job.data.videoId);
 *       },
 *     });
 *   }
 *
 *   addToTranscodeQueue(videoId: string) {
 *     this.jobQueue.add({ videoId, })
 *   }
 *
 *   private async transcodeVideo(videoId: string) {
 *     // e.g. call some external transcoding service
 *   }
 *
 * }
 * ```
 *
 * @docsCategory JobQueue
 */
var JobQueueService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, common_2.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var JobQueueService = _classThis = /** @class */ (function () {
        function JobQueueService_1(configService, jobBufferService) {
            this.configService = configService;
            this.jobBufferService = jobBufferService;
            this.queues = [];
            this.hasStarted = false;
        }
        Object.defineProperty(JobQueueService_1.prototype, "jobQueueStrategy", {
            get: function () {
                return this.configService.jobQueueOptions.jobQueueStrategy;
            },
            enumerable: false,
            configurable: true
        });
        /** @internal */
        JobQueueService_1.prototype.onModuleDestroy = function () {
            this.hasStarted = false;
            return Promise.all(this.queues.map(function (q) { return q.stop(); }));
        };
        /**
         * @description
         * Configures and creates a new {@link JobQueue} instance.
         */
        JobQueueService_1.prototype.createQueue = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var wrappedProcessFn, queue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.configService.jobQueueOptions.prefix) {
                                options = __assign(__assign({}, options), { name: "".concat(this.configService.jobQueueOptions.prefix).concat(options.name) });
                            }
                            wrappedProcessFn = this.createWrappedProcessFn(options.process);
                            options = __assign(__assign({}, options), { process: wrappedProcessFn });
                            queue = new job_queue_1.JobQueue(options, this.jobQueueStrategy, this.jobBufferService);
                            if (!(this.hasStarted && this.shouldStartQueue(queue.name))) return [3 /*break*/, 2];
                            return [4 /*yield*/, queue.start()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.queues.push(queue);
                            return [2 /*return*/, queue];
                    }
                });
            });
        };
        JobQueueService_1.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, queue;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.hasStarted = true;
                            _i = 0, _a = this.queues;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            queue = _a[_i];
                            if (!(!queue.started && this.shouldStartQueue(queue.name))) return [3 /*break*/, 3];
                            config_1.Logger.info("Starting queue: ".concat(queue.name), constants_1.loggerCtx);
                            return [4 /*yield*/, queue.start()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Adds a {@link JobBuffer}, which will make it active and begin collecting
         * jobs to buffer.
         *
         * @since 1.3.0
         */
        JobQueueService_1.prototype.addBuffer = function (buffer) {
            this.jobBufferService.addBuffer(buffer);
        };
        /**
         * @description
         * Removes a {@link JobBuffer}, prevent it from collecting and buffering any
         * subsequent jobs.
         *
         * @since 1.3.0
         */
        JobQueueService_1.prototype.removeBuffer = function (buffer) {
            this.jobBufferService.removeBuffer(buffer);
        };
        /**
         * @description
         * Returns an object containing the number of buffered jobs arranged by bufferId. This
         * can be used to decide whether a particular buffer has any jobs to flush.
         *
         * Passing in JobBuffer instances _or_ ids limits the results to the specified JobBuffers.
         * If no argument is passed, sizes will be returned for _all_ JobBuffers.
         *
         * @example
         * ```ts
         * const sizes = await this.jobQueueService.bufferSize('buffer-1', 'buffer-2');
         *
         * // sizes = { 'buffer-1': 12, 'buffer-2': 3 }
         * ```
         *
         * @since 1.3.0
         */
        JobQueueService_1.prototype.bufferSize = function () {
            var forBuffers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                forBuffers[_i] = arguments[_i];
            }
            return this.jobBufferService.bufferSize(forBuffers);
        };
        /**
         * @description
         * Flushes the specified buffers, which means that the buffer is cleared and the jobs get
         * sent to the job queue for processing. Before sending the jobs to the job queue,
         * they will be passed through each JobBuffer's `reduce()` method, which is can be used
         * to optimize the amount of work to be done by e.g. de-duplicating identical jobs or
         * aggregating data over the collected jobs.
         *
         * Passing in JobBuffer instances _or_ ids limits the action to the specified JobBuffers.
         * If no argument is passed, _all_ JobBuffers will be flushed.
         *
         * Returns an array of all Jobs which were added to the job queue.
         *
         * @since 1.3.0
         */
        JobQueueService_1.prototype.flush = function () {
            var forBuffers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                forBuffers[_i] = arguments[_i];
            }
            return this.jobBufferService.flush(forBuffers);
        };
        /**
         * @description
         * Returns an array of `{ name: string; running: boolean; }` for each
         * registered JobQueue.
         */
        JobQueueService_1.prototype.getJobQueues = function () {
            return this.queues.map(function (queue) { return ({
                name: queue.name,
                running: queue.started,
            }); });
        };
        /**
         * We wrap the process function in order to catch any errors thrown and pass them to
         * any configured ErrorHandlerStrategies.
         */
        JobQueueService_1.prototype.createWrappedProcessFn = function (processFn) {
            var _this = this;
            var errorHandlers = this.configService.systemOptions.errorHandlers;
            return function (job) { return __awaiter(_this, void 0, void 0, function () {
                var e_1, _i, errorHandlers_1, handler;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, processFn(job)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_1 = _a.sent();
                            for (_i = 0, errorHandlers_1 = errorHandlers; _i < errorHandlers_1.length; _i++) {
                                handler = errorHandlers_1[_i];
                                if (e_1 instanceof Error) {
                                    void handler.handleWorkerError(e_1, { job: job });
                                }
                            }
                            throw e_1;
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        JobQueueService_1.prototype.shouldStartQueue = function (queueName) {
            if (this.configService.jobQueueOptions.activeQueues.length > 0) {
                if (!this.configService.jobQueueOptions.activeQueues.includes(queueName)) {
                    return false;
                }
            }
            return true;
        };
        return JobQueueService_1;
    }());
    __setFunctionName(_classThis, "JobQueueService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JobQueueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JobQueueService = _classThis;
}();
exports.JobQueueService = JobQueueService;
