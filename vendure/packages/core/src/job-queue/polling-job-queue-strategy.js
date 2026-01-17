"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.PollingJobQueueStrategy = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var vendure_logger_1 = require("../config/logger/vendure-logger");
var injectable_job_queue_strategy_1 = require("./injectable-job-queue-strategy");
var job_1 = require("./job");
var queue_name_process_storage_1 = require("./queue-name-process-storage");
var STOP_SIGNAL = Symbol('STOP_SIGNAL');
var ActiveQueue = /** @class */ (function () {
    function ActiveQueue(queueName, process, jobQueueStrategy) {
        this.queueName = queueName;
        this.process = process;
        this.jobQueueStrategy = jobQueueStrategy;
        this.running = false;
        this.activeJobs = [];
        this.errorNotifier$ = new rxjs_1.Subject();
        this.queueStopped$ = new rxjs_1.Subject();
        this.pollInterval =
            typeof this.jobQueueStrategy.pollInterval === 'function'
                ? this.jobQueueStrategy.pollInterval(queueName)
                : this.jobQueueStrategy.pollInterval;
    }
    ActiveQueue.prototype.start = function () {
        var _this = this;
        vendure_logger_1.Logger.debug("Starting JobQueue \"".concat(this.queueName, "\""));
        this.subscription = this.errorNotifier$.pipe((0, operators_1.throttleTime)(3000)).subscribe(function (_a) {
            var message = _a[0], stack = _a[1];
            vendure_logger_1.Logger.error(message);
            vendure_logger_1.Logger.debug(stack);
        });
        this.running = true;
        var runNextJobs = function () { return __awaiter(_this, void 0, void 0, function () {
            var runningJobsCount, _loop_1, this_1, i, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        runningJobsCount = this.activeJobs.length;
                        _loop_1 = function (i) {
                            var nextJob, onProgress_1, cancellationSub_1, stopSignal$;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.jobQueueStrategy.next(this_1.queueName)];
                                    case 1:
                                        nextJob = _b.sent();
                                        if (!nextJob) return [3 /*break*/, 3];
                                        this_1.activeJobs.push(nextJob);
                                        return [4 /*yield*/, this_1.jobQueueStrategy.update(nextJob)];
                                    case 2:
                                        _b.sent();
                                        onProgress_1 = function (job) { return _this.jobQueueStrategy.update(job); };
                                        nextJob.on('progress', onProgress_1);
                                        cancellationSub_1 = (0, rxjs_1.interval)(this_1.pollInterval * 5)
                                            .pipe(
                                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                        (0, operators_1.switchMap)(function () { return _this.jobQueueStrategy.findOne(nextJob.id); }), (0, operators_1.filter)(function (job) { return (job === null || job === void 0 ? void 0 : job.state) === generated_types_1.JobState.CANCELLED; }), (0, operators_1.take)(1))
                                            .subscribe(function () {
                                            nextJob.cancel();
                                        });
                                        stopSignal$ = this_1.queueStopped$.pipe((0, operators_1.take)(1));
                                        (0, rxjs_1.race)((0, rxjs_1.from)(this_1.process(nextJob)), stopSignal$)
                                            .toPromise()
                                            .then(function (result) {
                                            if (result === STOP_SIGNAL) {
                                                nextJob.defer();
                                            }
                                            else if (result instanceof job_1.Job && result.state === generated_types_1.JobState.CANCELLED) {
                                                nextJob.cancel();
                                            }
                                            else {
                                                nextJob.complete(result);
                                            }
                                        }, function (err) {
                                            nextJob.fail(err);
                                        })
                                            .finally(function () {
                                            // if (!this.running && nextJob.state !== JobState.PENDING) {
                                            //     return;
                                            // }
                                            nextJob.off('progress', onProgress_1);
                                            cancellationSub_1.unsubscribe();
                                            return _this.onFailOrComplete(nextJob);
                                        })
                                            .catch(function (err) {
                                            vendure_logger_1.Logger.warn("Error updating job info: ".concat(JSON.stringify(err)));
                                        });
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = runningJobsCount;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.jobQueueStrategy.concurrency)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.errorNotifier$.next([
                            "Job queue \"".concat(this.queueName, "\" encountered an error (set log level to Debug for trace): ").concat(JSON.stringify(e_1.message)),
                            e_1.stack,
                        ]);
                        return [3 /*break*/, 6];
                    case 6:
                        if (this.running) {
                            this.timer = setTimeout(runNextJobs, this.pollInterval);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        void runNextJobs();
    };
    ActiveQueue.prototype.stop = function () {
        return __awaiter(this, arguments, void 0, function (stopActiveQueueTimeout) {
            if (stopActiveQueueTimeout === void 0) { stopActiveQueueTimeout = 20000; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.running = false;
                        clearTimeout(this.timer);
                        return [4 /*yield*/, this.awaitRunningJobsOrTimeout(stopActiveQueueTimeout)];
                    case 1:
                        _a.sent();
                        vendure_logger_1.Logger.info("Stopped queue: ".concat(this.queueName));
                        this.subscription.unsubscribe();
                        // Allow any job status changes to be persisted
                        // before we permit the application shutdown to continue.
                        // Otherwise, the DB connection will close before our
                        // changes are persisted.
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 2:
                        // Allow any job status changes to be persisted
                        // before we permit the application shutdown to continue.
                        // Otherwise, the DB connection will close before our
                        // changes are persisted.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ActiveQueue.prototype.awaitRunningJobsOrTimeout = function (stopActiveQueueTimeout) {
        var _this = this;
        if (stopActiveQueueTimeout === void 0) { stopActiveQueueTimeout = 20000; }
        var start = +new Date();
        var timeout;
        return new Promise(function (resolve) {
            var lastStatusUpdate = +new Date();
            var pollActiveJobs = function () {
                var now = +new Date();
                var timedOut = stopActiveQueueTimeout === undefined ? false : now - start > stopActiveQueueTimeout;
                if (_this.activeJobs.length === 0) {
                    clearTimeout(timeout);
                    resolve();
                    return;
                }
                if (timedOut) {
                    vendure_logger_1.Logger.warn("Timed out (".concat(stopActiveQueueTimeout, "ms) waiting for ").concat(_this.activeJobs.length, " active jobs in queue \"").concat(_this.queueName, "\" to complete. Forcing stop..."));
                    _this.queueStopped$.next(STOP_SIGNAL);
                    clearTimeout(timeout);
                    resolve();
                    return;
                }
                if (_this.activeJobs.length > 0) {
                    if (now - lastStatusUpdate > 2000) {
                        vendure_logger_1.Logger.info("Stopping queue: ".concat(_this.queueName, " - waiting for ").concat(_this.activeJobs.length, " active jobs to complete..."));
                        lastStatusUpdate = now;
                    }
                }
                timeout = setTimeout(pollActiveJobs, 200);
            };
            void pollActiveJobs();
        });
    };
    ActiveQueue.prototype.onFailOrComplete = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobQueueStrategy.update(job)];
                    case 1:
                        _a.sent();
                        this.removeJobFromActive(job);
                        return [2 /*return*/];
                }
            });
        });
    };
    ActiveQueue.prototype.removeJobFromActive = function (job) {
        var index = this.activeJobs.indexOf(job);
        if (index !== -1) {
            this.activeJobs.splice(index, 1);
        }
    };
    return ActiveQueue;
}());
/**
 * @description
 * This class allows easier implementation of {@link JobQueueStrategy} in a polling style.
 * Instead of providing {@link JobQueueStrategy} `start()` you should provide a `next` method.
 *
 * This class should be extended by any strategy which does not support a push-based system
 * to notify on new jobs. It is used by the {@link SqlJobQueueStrategy} and {@link InMemoryJobQueueStrategy}.
 *
 * @docsCategory JobQueue
 */
var PollingJobQueueStrategy = /** @class */ (function (_super) {
    __extends(PollingJobQueueStrategy, _super);
    function PollingJobQueueStrategy(concurrencyOrConfig, maybePollInterval) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this) || this;
        _this.activeQueues = new queue_name_process_storage_1.QueueNameProcessStorage();
        if (concurrencyOrConfig && (0, shared_utils_1.isObject)(concurrencyOrConfig)) {
            _this.concurrency = (_a = concurrencyOrConfig.concurrency) !== null && _a !== void 0 ? _a : 1;
            _this.pollInterval = (_b = concurrencyOrConfig.pollInterval) !== null && _b !== void 0 ? _b : 200;
            _this.backOffStrategy = (_c = concurrencyOrConfig.backoffStrategy) !== null && _c !== void 0 ? _c : (function () { return 1000; });
            _this.setRetries = (_d = concurrencyOrConfig.setRetries) !== null && _d !== void 0 ? _d : (function (_, job) { return job.retries; });
            _this.gracefulShutdownTimeout = (_e = concurrencyOrConfig.gracefulShutdownTimeout) !== null && _e !== void 0 ? _e : 20000;
        }
        else {
            _this.concurrency = concurrencyOrConfig !== null && concurrencyOrConfig !== void 0 ? concurrencyOrConfig : 1;
            _this.pollInterval = maybePollInterval !== null && maybePollInterval !== void 0 ? maybePollInterval : 200;
            _this.setRetries = function (_, job) { return job.retries; };
            _this.gracefulShutdownTimeout = 20000;
        }
        return _this;
    }
    PollingJobQueueStrategy.prototype.start = function (queueName, process) {
        return __awaiter(this, void 0, void 0, function () {
            var active;
            return __generator(this, function (_a) {
                if (!this.hasInitialized) {
                    this.started.set(queueName, process);
                    return [2 /*return*/];
                }
                if (this.activeQueues.has(queueName, process)) {
                    return [2 /*return*/];
                }
                active = new ActiveQueue(queueName, process, this);
                active.start();
                this.activeQueues.set(queueName, process, active);
                return [2 /*return*/];
            });
        });
    };
    PollingJobQueueStrategy.prototype.stop = function (queueName, process) {
        return __awaiter(this, void 0, void 0, function () {
            var active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        active = this.activeQueues.getAndDelete(queueName, process);
                        if (!active) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, active.stop(this.gracefulShutdownTimeout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PollingJobQueueStrategy.prototype.cancelJob = function (jobId) {
        return __awaiter(this, void 0, void 0, function () {
            var job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(jobId)];
                    case 1:
                        job = _a.sent();
                        if (!job) return [3 /*break*/, 3];
                        job.cancel();
                        return [4 /*yield*/, this.update(job)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, job];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PollingJobQueueStrategy;
}(injectable_job_queue_strategy_1.InjectableJobQueueStrategy));
exports.PollingJobQueueStrategy = PollingJobQueueStrategy;
