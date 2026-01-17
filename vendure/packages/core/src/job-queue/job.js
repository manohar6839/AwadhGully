"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var vendure_logger_1 = require("../config/logger/vendure-logger");
/**
 * @description
 * A Job represents a piece of work to be run in the background, i.e. outside the request-response cycle.
 * It is intended to be used for long-running work triggered by API requests. Jobs should now generally
 * be directly instantiated. Rather, the {@link JobQueue} `add()` method should be used to create and
 * add a new Job to a queue.
 *
 * @docsCategory JobQueue
 * @docsPage Job
 * @docsWeight 0
 */
var Job = /** @class */ (function () {
    function Job(config) {
        this.eventListeners = {
            progress: [],
        };
        this.queueName = config.queueName;
        this._data = this.ensureDataIsSerializable(config.data);
        this.id = config.id || null;
        this._state = config.state || generated_types_1.JobState.PENDING;
        this.retries = config.retries || 0;
        this._attempts = config.attempts || 0;
        this._progress = config.progress || 0;
        this.createdAt = config.createdAt || new Date();
        this._result = config.result;
        this._error = config.error;
        this._startedAt = config.startedAt;
        this._settledAt = config.settledAt;
    }
    Object.defineProperty(Job.prototype, "name", {
        get: function () {
            return this.queueName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "result", {
        get: function () {
            return this._result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "isSettled", {
        get: function () {
            return (!!this._settledAt &&
                (this._state === generated_types_1.JobState.COMPLETED ||
                    this._state === generated_types_1.JobState.FAILED ||
                    this._state === generated_types_1.JobState.CANCELLED));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "startedAt", {
        get: function () {
            return this._startedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "settledAt", {
        get: function () {
            return this._settledAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "duration", {
        get: function () {
            if (this.state === generated_types_1.JobState.PENDING || this.state === generated_types_1.JobState.RETRYING) {
                return 0;
            }
            var end = this._settledAt || new Date();
            return +end - +(this._startedAt || end);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Job.prototype, "attempts", {
        get: function () {
            return this._attempts;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description
     * Calling this signifies that the job work has started. This method should be
     * called in the {@link JobQueueStrategy} `next()` method.
     */
    Job.prototype.start = function () {
        var _a, _b;
        if (this._state === generated_types_1.JobState.PENDING || this._state === generated_types_1.JobState.RETRYING) {
            this._state = generated_types_1.JobState.RUNNING;
            this._startedAt = new Date();
            this._attempts++;
            vendure_logger_1.Logger.debug("Job ".concat((_b = (_a = this.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'null', " [").concat(this.queueName, "] starting (attempt ").concat(this._attempts, " of ").concat(this.retries + 1, ")"));
        }
    };
    /**
     * @description
     * Sets the progress (0 - 100) of the job.
     */
    Job.prototype.setProgress = function (percent) {
        this._progress = Math.min(percent || 0, 100);
        this.fireEvent('progress');
    };
    /**
     * @description
     * Calling this method signifies that the job succeeded. The result
     * will be stored in the `Job.result` property.
     */
    Job.prototype.complete = function (result) {
        var _a, _b;
        this._result = result;
        this._progress = 100;
        this._state = generated_types_1.JobState.COMPLETED;
        this._settledAt = new Date();
        vendure_logger_1.Logger.debug("Job ".concat((_b = (_a = this.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'null', " [").concat(this.queueName, "] completed"));
    };
    /**
     * @description
     * Calling this method signifies that the job failed.
     */
    Job.prototype.fail = function (err) {
        var _a, _b, _c, _d;
        this._error = (err === null || err === void 0 ? void 0 : err.message) ? err.message : String(err);
        this._progress = 0;
        if (this.retries >= this._attempts) {
            this._state = generated_types_1.JobState.RETRYING;
            vendure_logger_1.Logger.warn("Job ".concat((_b = (_a = this.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'null', " [").concat(this.queueName, "] failed (attempt ").concat(this._attempts, " of ").concat(this.retries + 1, ")"));
        }
        else {
            if (this._state !== generated_types_1.JobState.CANCELLED) {
                this._state = generated_types_1.JobState.FAILED;
                vendure_logger_1.Logger.warn("Job ".concat((_d = (_c = this.id) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : 'null', " [").concat(this.queueName, "] failed and will not retry."));
            }
            this._settledAt = new Date();
        }
    };
    Job.prototype.cancel = function () {
        this._settledAt = new Date();
        this._state = generated_types_1.JobState.CANCELLED;
    };
    /**
     * @description
     * Sets a RUNNING job back to PENDING. Should be used when the JobQueue is being
     * destroyed before the job has been completed.
     */
    Job.prototype.defer = function () {
        var _a, _b;
        if (this._state === generated_types_1.JobState.RUNNING) {
            this._state = generated_types_1.JobState.PENDING;
            this._attempts = 0;
            vendure_logger_1.Logger.debug("Job ".concat((_b = (_a = this.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'null', " [").concat(this.queueName, "] deferred back to PENDING state"));
        }
    };
    /**
     * @description
     * Used to register event handler for job events
     */
    Job.prototype.on = function (eventType, listener) {
        this.eventListeners[eventType].push(listener);
    };
    Job.prototype.off = function (eventType, listener) {
        var idx = this.eventListeners[eventType].indexOf(listener);
        if (idx !== -1) {
            this.eventListeners[eventType].splice(idx, 1);
        }
    };
    Job.prototype.fireEvent = function (eventType) {
        for (var _i = 0, _a = this.eventListeners[eventType]; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this);
        }
    };
    /**
     * All data in a job must be serializable. This method handles certain problem cases such as when
     * the data is a class instance with getters. Even though technically the "data" object should
     * already be serializable per the TS type, in practice data can slip through due to loss of
     * type safety.
     */
    Job.prototype.ensureDataIsSerializable = function (data, depth, seen, path) {
        var _this = this;
        if (depth === void 0) { depth = 0; }
        if (seen === void 0) { seen = new WeakMap(); }
        if (path === void 0) { path = []; }
        if (10 < depth) {
            return '[max depth reached]';
        }
        if (data === null || data === undefined) {
            return data;
        }
        // Handle Date objects
        if (data instanceof Date) {
            return data.toISOString();
        }
        if (typeof data === 'object' && data !== null) {
            var seenData = seen.get(data);
            if (seenData && seenData.length < path.length) {
                return "[circular *".concat(path.join('.'), "]");
            }
            seen.set(data, path);
        }
        depth++;
        var output;
        if ((0, shared_utils_1.isObject)(data)) {
            output = {};
            // If the object has a `.toJSON()` function defined, then
            // prefer it to any other type of serialization.
            if (this.hasToJSONFunction(data)) {
                output = data.toJSON();
            }
            else {
                for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                    var key = _a[_i];
                    output[key] = this.ensureDataIsSerializable(data[key], depth, seen, path.concat(key));
                }
                if ((0, shared_utils_1.isClassInstance)(data)) {
                    var descriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(data));
                    for (var _b = 0, _c = Object.keys(descriptors); _b < _c.length; _b++) {
                        var name_1 = _c[_b];
                        var descriptor = descriptors[name_1];
                        if (typeof descriptor.get === 'function') {
                            output[name_1] = data[name_1];
                        }
                    }
                }
            }
        }
        else if (Array.isArray(data)) {
            if (!output) {
                output = [];
            }
            data.forEach(function (item, i) {
                output[i] = _this.ensureDataIsSerializable(item, depth, seen, path.concat(i.toString()));
            });
        }
        else {
            return data;
        }
        return output;
    };
    Job.prototype.hasToJSONFunction = function (obj) {
        return typeof (obj === null || obj === void 0 ? void 0 : obj.toJSON) === 'function';
    };
    return Job;
}());
exports.Job = Job;
