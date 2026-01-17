"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopSchedulerStrategy = void 0;
var vendure_logger_1 = require("../config/logger/vendure-logger");
var NoopSchedulerStrategy = /** @class */ (function () {
    function NoopSchedulerStrategy() {
    }
    NoopSchedulerStrategy.prototype.getTasks = function () {
        return Promise.resolve([]);
    };
    NoopSchedulerStrategy.prototype.getTask = function (id) {
        return Promise.resolve(undefined);
    };
    NoopSchedulerStrategy.prototype.executeTask = function (task) {
        vendure_logger_1.Logger.warn("No task scheduler is configured! The task ".concat(task.id, " will not be executed."));
        return function () { return Promise.resolve(); };
    };
    NoopSchedulerStrategy.prototype.updateTask = function (input) {
        throw new Error("Not implemented");
    };
    NoopSchedulerStrategy.prototype.triggerTask = function (task) {
        throw new Error("Not implemented");
    };
    return NoopSchedulerStrategy;
}());
exports.NoopSchedulerStrategy = NoopSchedulerStrategy;
