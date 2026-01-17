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
exports.InMemoryJobQueueStrategy = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var vendure_logger_1 = require("../config/logger/vendure-logger");
var process_context_1 = require("../process-context/process-context");
var polling_job_queue_strategy_1 = require("./polling-job-queue-strategy");
/**
 * @description
 * An in-memory {@link JobQueueStrategy}. This is the default strategy if not using a dedicated
 * JobQueue plugin (e.g. {@link DefaultJobQueuePlugin}). Not recommended for production, since
 * the queue will be cleared when the server stops, and can only be used when the JobQueueService is
 * started from the main server process:
 *
 * @example
 * ```ts
 * bootstrap(config)
 *   .then(app => app.get(JobQueueService).start());
 * ```
 *
 * Attempting to use this strategy when running the worker in a separate process (using `bootstrapWorker()`)
 * will result in an error on startup.
 *
 * Completed jobs will be evicted from the store every 2 hours to prevent a memory leak.
 *
 * @docsCategory JobQueue
 */
var InMemoryJobQueueStrategy = /** @class */ (function (_super) {
    __extends(InMemoryJobQueueStrategy, _super);
    function InMemoryJobQueueStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jobs = new Map();
        _this.unsettledJobs = {};
        _this.evictJobsAfterMs = 1000 * 60 * 60 * 2; // 2 hours
        _this.processContextChecked = false;
        /**
         * Delete old jobs from the `jobs` Map if they are settled and older than the value
         * defined in `this.pruneJobsAfterMs`. This prevents a memory leak as the job queue
         * grows indefinitely.
         */
        _this.evictSettledJobs = function () {
            var nowMs = +new Date();
            var olderThanMs = nowMs - _this.evictJobsAfterMs;
            void _this.removeSettledJobs([], new Date(olderThanMs));
            _this.timer = setTimeout(_this.evictSettledJobs, _this.evictJobsAfterMs);
        };
        return _this;
    }
    InMemoryJobQueueStrategy.prototype.init = function (injector) {
        _super.prototype.init.call(this, injector);
        this.processContext = injector.get(process_context_1.ProcessContext);
        this.timer = setTimeout(this.evictSettledJobs, this.evictJobsAfterMs);
    };
    InMemoryJobQueueStrategy.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        clearTimeout(this.timer);
    };
    InMemoryJobQueueStrategy.prototype.add = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!job.id) {
                    job.id = Math.floor(Math.random() * 1000000000)
                        .toString()
                        .padEnd(10, '0');
                }
                job.retries = this.setRetries(job.queueName, job);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.jobs.set(job.id, job);
                if (!this.unsettledJobs[job.queueName]) {
                    this.unsettledJobs[job.queueName] = [];
                }
                this.unsettledJobs[job.queueName].push({ job: job, updatedAt: new Date() });
                return [2 /*return*/, job];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.jobs.get(id)];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.findMany = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                items = __spreadArray([], this.jobs.values(), true);
                if (options) {
                    if (options.sort) {
                        items = this.applySort(items, options.sort);
                    }
                    if (options.filter) {
                        items = this.applyFilters(items, options.filter);
                    }
                    if (options.skip || options.take) {
                        items = this.applyPagination(items, options.skip, options.take);
                    }
                }
                return [2 /*return*/, {
                        items: items,
                        totalItems: items.length,
                    }];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.findManyById = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, ids.map(function (id) { return _this.jobs.get(id); }).filter(shared_utils_1.notNullOrUndefined)];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.next = function (queueName_1) {
        return __awaiter(this, arguments, void 0, function (queueName, waitingJobs) {
            var nextIndex, next, msSinceLastFailure, backOffDelayMs;
            var _a, _b, _c;
            if (waitingJobs === void 0) { waitingJobs = []; }
            return __generator(this, function (_d) {
                this.checkProcessContext();
                nextIndex = (_a = this.unsettledJobs[queueName]) === null || _a === void 0 ? void 0 : _a.findIndex(function (item) { return !waitingJobs.includes(item.job); });
                if (nextIndex === -1) {
                    return [2 /*return*/];
                }
                next = (_b = this.unsettledJobs[queueName]) === null || _b === void 0 ? void 0 : _b.splice(nextIndex, 1)[0];
                if (next) {
                    if (next.job.state === generated_types_1.JobState.RETRYING && typeof this.backOffStrategy === 'function') {
                        msSinceLastFailure = Date.now() - +next.updatedAt;
                        backOffDelayMs = this.backOffStrategy(queueName, next.job.attempts, next.job);
                        if (msSinceLastFailure < backOffDelayMs) {
                            (_c = this.unsettledJobs[queueName]) === null || _c === void 0 ? void 0 : _c.push(next);
                            return [2 /*return*/];
                        }
                    }
                    next.job.start();
                    return [2 /*return*/, next.job];
                }
                return [2 /*return*/];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.update = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (job.state === generated_types_1.JobState.RETRYING || job.state === generated_types_1.JobState.PENDING) {
                    this.unsettledJobs[job.queueName].unshift({ job: job, updatedAt: new Date() });
                }
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.jobs.set(job.id, job);
                return [2 /*return*/];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.removeSettledJobs = function () {
        return __awaiter(this, arguments, void 0, function (queueNames, olderThan) {
            var removed, _i, _a, job;
            if (queueNames === void 0) { queueNames = []; }
            return __generator(this, function (_b) {
                removed = 0;
                for (_i = 0, _a = this.jobs.values(); _i < _a.length; _i++) {
                    job = _a[_i];
                    if (0 < queueNames.length && !queueNames.includes(job.queueName)) {
                        continue;
                    }
                    if (job.isSettled) {
                        if (olderThan) {
                            if (job.settledAt && job.settledAt < olderThan) {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                this.jobs.delete(job.id);
                                removed++;
                            }
                        }
                        else {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            this.jobs.delete(job.id);
                            removed++;
                        }
                    }
                }
                return [2 /*return*/, removed];
            });
        });
    };
    InMemoryJobQueueStrategy.prototype.applySort = function (items, sort) {
        var _loop_1 = function (prop, direction) {
            var key = prop;
            var dir = direction === 'ASC' ? -1 : 1;
            items = items.sort(function (a, b) { return ((a[key] || 0) < (b[key] || 0) ? 1 * dir : -1 * dir); });
        };
        for (var _i = 0, _a = Object.entries(sort); _i < _a.length; _i++) {
            var _b = _a[_i], prop = _b[0], direction = _b[1];
            _loop_1(prop, direction);
        }
        return items;
    };
    InMemoryJobQueueStrategy.prototype.applyFilters = function (items, filters) {
        var _loop_2 = function (prop, operator) {
            var key = prop;
            if (Array.isArray(operator)) {
                return "continue";
            }
            if ((operator === null || operator === void 0 ? void 0 : operator.eq) !== undefined) {
                items = items.filter(function (i) { return i[key] === operator.eq; });
            }
            var contains = operator === null || operator === void 0 ? void 0 : operator.contains;
            if (contains) {
                items = items.filter(function (i) { return i[key].includes(contains); });
            }
            var gt = operator === null || operator === void 0 ? void 0 : operator.gt;
            if (gt) {
                items = items.filter(function (i) { return i[key] > gt; });
            }
            var gte = operator === null || operator === void 0 ? void 0 : operator.gte;
            if (gte) {
                items = items.filter(function (i) { return i[key] >= gte; });
            }
            var lt = operator === null || operator === void 0 ? void 0 : operator.lt;
            if (lt) {
                items = items.filter(function (i) { return i[key] < lt; });
            }
            var lte = operator === null || operator === void 0 ? void 0 : operator.lte;
            if (lte) {
                items = items.filter(function (i) { return i[key] <= lte; });
            }
            var before = operator === null || operator === void 0 ? void 0 : operator.before;
            if (before) {
                items = items.filter(function (i) { return i[key] <= before; });
            }
            var after = operator === null || operator === void 0 ? void 0 : operator.after;
            if (after) {
                items = items.filter(function (i) { return i[key] >= after; });
            }
            var between = operator === null || operator === void 0 ? void 0 : operator.between;
            if (between) {
                items = items.filter(function (i) {
                    var num = i[key];
                    return num > between.start && num < between.end;
                });
            }
        };
        for (var _i = 0, _a = Object.entries(filters); _i < _a.length; _i++) {
            var _b = _a[_i], prop = _b[0], operator = _b[1];
            _loop_2(prop, operator);
        }
        return items;
    };
    InMemoryJobQueueStrategy.prototype.applyPagination = function (items, skip, take) {
        var start = skip || 0;
        var end = take != null ? start + take : undefined;
        return items.slice(start, end);
    };
    InMemoryJobQueueStrategy.prototype.checkProcessContext = function () {
        if (!this.processContextChecked) {
            if (this.processContext.isWorker) {
                vendure_logger_1.Logger.error('The InMemoryJobQueueStrategy will not work when running job queues outside the main server process!');
                process.kill(process.pid, 'SIGINT');
            }
            this.processContextChecked = true;
        }
    };
    return InMemoryJobQueueStrategy;
}(polling_job_queue_strategy_1.PollingJobQueueStrategy));
exports.InMemoryJobQueueStrategy = InMemoryJobQueueStrategy;
