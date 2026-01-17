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
exports.JobQueue = void 0;
var common_1 = require("../common");
var job_1 = require("./job");
var subscribable_job_1 = require("./subscribable-job");
/**
 * @description
 * A JobQueue is used to process {@link Job}s. A job is added to the queue via the
 * `.add()` method, and the configured {@link JobQueueStrategy} will check for new jobs and process each
 * according to the defined `process` function.
 *
 * *Note*: JobQueue instances should not be directly instantiated. Rather, the
 * {@link JobQueueService} `createQueue()` method should be used (see that service
 * for example usage).
 *
 * @docsCategory JobQueue
 */
var JobQueue = function () {
    var _classDecorators = [(0, common_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var JobQueue = _classThis = /** @class */ (function () {
        function JobQueue_1(options, jobQueueStrategy, jobBufferService) {
            this.options = options;
            this.jobQueueStrategy = jobQueueStrategy;
            this.jobBufferService = jobBufferService;
            this.running = false;
        }
        Object.defineProperty(JobQueue_1.prototype, "name", {
            get: function () {
                return this.options.name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JobQueue_1.prototype, "started", {
            get: function () {
                return this.running;
            },
            enumerable: false,
            configurable: true
        });
        /** @internal */
        JobQueue_1.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.running) {
                                return [2 /*return*/];
                            }
                            this.running = true;
                            return [4 /*yield*/, this.jobQueueStrategy.start(this.options.name, this.options.process)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** @internal */
        JobQueue_1.prototype.stop = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.running) {
                        return [2 /*return*/];
                    }
                    this.running = false;
                    return [2 /*return*/, this.jobQueueStrategy.stop(this.options.name, this.options.process)];
                });
            });
        };
        /**
         * @description
         * Adds a new {@link Job} to the queue. The resolved {@link SubscribableJob} allows the
         * calling code to subscribe to updates to the Job:
         *
         * @example
         * ```ts
         * const job = await this.myQueue.add({ intervalMs, shouldFail }, { retries: 2 });
         * return job.updates().pipe(
         *   map(update => {
         *     // The returned Observable will emit a value for every update to the job
         *     // such as when the `progress` or `status` value changes.
         *     Logger.info(`Job ${update.id}: progress: ${update.progress}`);
         *     if (update.state === JobState.COMPLETED) {
         *       Logger.info(`COMPLETED ${update.id}: ${update.result}`);
         *     }
         *     return update.result;
         *   }),
         *   catchError(err => of(err.message)),
         * );
         * ```
         *
         * Alternatively, if you aren't interested in the intermediate
         * `progress` changes, you can convert to a Promise like this:
         *
         * @example
         * ```ts
         * const job = await this.myQueue.add({ intervalMs, shouldFail }, { retries: 2 });
         * return job.updates().toPromise()
         *   .then(update => update.result),
         *   .catch(err => err.message);
         * ```
         */
        JobQueue_1.prototype.add = function (data, options) {
            return __awaiter(this, void 0, void 0, function () {
                var job, isBuffered, addedJob, bufferedJob;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            job = new job_1.Job({
                                data: data,
                                queueName: this.options.name,
                                retries: (_a = options === null || options === void 0 ? void 0 : options.retries) !== null && _a !== void 0 ? _a : 0,
                            });
                            return [4 /*yield*/, this.jobBufferService.add(job)];
                        case 1:
                            isBuffered = _b.sent();
                            if (!!isBuffered) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.jobQueueStrategy.add(job, options)];
                        case 2:
                            addedJob = _b.sent();
                            return [2 /*return*/, new subscribable_job_1.SubscribableJob(addedJob, this.jobQueueStrategy)];
                        case 3:
                            bufferedJob = new job_1.Job(__assign(__assign({}, job), { data: job.data, id: 'buffered' }));
                            return [2 /*return*/, new subscribable_job_1.SubscribableJob(bufferedJob, this.jobQueueStrategy)];
                    }
                });
            });
        };
        return JobQueue_1;
    }());
    __setFunctionName(_classThis, "JobQueue");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JobQueue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JobQueue = _classThis;
}();
exports.JobQueue = JobQueue;
