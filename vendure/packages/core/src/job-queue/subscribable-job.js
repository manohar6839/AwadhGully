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
exports.SubscribableJob = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var pick_1 = require("@vendure/common/lib/pick");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var ms_1 = require("ms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var errors_1 = require("../common/error/errors");
var index_1 = require("../config/index");
var inspectable_job_queue_strategy_1 = require("../config/job-queue/inspectable-job-queue-strategy");
var job_1 = require("./job");
/**
 * @description
 * This is a type of Job object that allows you to subscribe to updates to the Job. It is returned
 * by the {@link JobQueue}'s `add()` method. Note that the subscription capability is only supported
 * if the {@link JobQueueStrategy} implements the {@link InspectableJobQueueStrategy} interface (e.g.
 * the {@link SqlJobQueueStrategy} does support this).
 *
 * @docsCategory JobQueue
 */
var SubscribableJob = /** @class */ (function (_super) {
    __extends(SubscribableJob, _super);
    function SubscribableJob(job, jobQueueStrategy) {
        var _this = this;
        var config = __assign(__assign({}, job), { state: job.state, data: job.data, id: job.id || undefined });
        _this = _super.call(this, config) || this;
        _this.jobQueueStrategy = jobQueueStrategy;
        return _this;
    }
    /**
     * @description
     * Returns an Observable stream of updates to the Job. Works by polling the current JobQueueStrategy's `findOne()` method
     * to obtain updates. If the updates are not subscribed to, then no polling occurs.
     *
     * Polling interval, timeout and other options may be configured with an options arguments {@link JobUpdateOptions}.
     *
     */
    SubscribableJob.prototype.updates = function (options) {
        var _this = this;
        var _a, _b;
        var pollInterval = Math.max(50, (_a = options === null || options === void 0 ? void 0 : options.pollInterval) !== null && _a !== void 0 ? _a : 200);
        var timeoutMs = Math.max(1, (_b = options === null || options === void 0 ? void 0 : options.timeoutMs) !== null && _b !== void 0 ? _b : (0, ms_1.default)('1h'));
        var strategy = this.jobQueueStrategy;
        if (!(0, inspectable_job_queue_strategy_1.isInspectableJobQueueStrategy)(strategy)) {
            throw new errors_1.InternalServerError("The configured JobQueueStrategy (".concat(strategy.constructor.name, ") is not inspectable, so Job updates cannot be subscribed to"));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            var updates$ = (0, rxjs_1.interval)(pollInterval).pipe((0, operators_1.switchMap)(function () {
                var id = _this.id;
                if (!id) {
                    throw new Error('Cannot subscribe to update: Job does not have an ID');
                }
                return strategy.findOne(id);
            }), (0, operators_1.filter)(shared_utils_1.notNullOrUndefined), (0, operators_1.distinctUntilChanged)(function (a, b) { return (a === null || a === void 0 ? void 0 : a.progress) === (b === null || b === void 0 ? void 0 : b.progress) && (a === null || a === void 0 ? void 0 : a.state) === (b === null || b === void 0 ? void 0 : b.state); }), (0, operators_1.takeWhile)(function (job) {
                return (job === null || job === void 0 ? void 0 : job.state) !== generated_types_1.JobState.FAILED &&
                    job.state !== generated_types_1.JobState.COMPLETED &&
                    job.state !== generated_types_1.JobState.CANCELLED;
            }, true), (0, operators_1.tap)(function (job) {
                var _a;
                if (job.state === generated_types_1.JobState.FAILED && ((_a = options === null || options === void 0 ? void 0 : options.errorOnFail) !== null && _a !== void 0 ? _a : true)) {
                    throw new Error(job.error);
                }
            }), (0, operators_1.map)(function (job) { return (0, pick_1.pick)(job, ['id', 'state', 'progress', 'result', 'error', 'data']); }));
            var timeout$ = (0, rxjs_1.timer)(timeoutMs).pipe((0, operators_1.tap)(function (i) {
                var _a;
                index_1.Logger.error("Job ".concat((_a = _this.id) !== null && _a !== void 0 ? _a : '', " SubscribableJob update polling timed out after ").concat(timeoutMs, "ms. The job may still be running."));
            }), (0, operators_1.map)(function () {
                return ({
                    id: _this.id,
                    state: generated_types_1.JobState.RUNNING,
                    data: _this.data,
                    error: _this.error,
                    progress: _this.progress,
                    result: 'Job subscription timed out. The job may still be running',
                });
            }));
            // Use race() to return whichever observable emits first and follow it to completion.
            // - If updates$ emits first, it will continue emitting until the job settles
            // - If timeout$ emits first, it will emit the timeout message and complete
            return (0, rxjs_1.race)(updates$, timeout$);
        }
    };
    return SubscribableJob;
}(job_1.Job));
exports.SubscribableJob = SubscribableJob;
