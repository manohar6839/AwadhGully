"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectableJobQueueStrategy = void 0;
/**
 * @description
 * This is a helper class for implementations of {@link JobQueueStrategy} that need to
 * have init called before they can start a queue.
 * It simply collects calls to {@link JobQueueStrategy} `start()` and calls `start()` again after init.
 * When using the class `start()` should start with this snippet
 *
 * ```
 * Typescript
 * if (!this.hasInitialized) {
 *   this.started.set(queueName, process);
 *   return;
 * }
 * ```
 */
var InjectableJobQueueStrategy = /** @class */ (function () {
    function InjectableJobQueueStrategy() {
        this.started = new Map();
        this.hasInitialized = false;
    }
    InjectableJobQueueStrategy.prototype.init = function (injector) {
        this.hasInitialized = true;
        for (var _i = 0, _a = this.started; _i < _a.length; _i++) {
            var _b = _a[_i], queueName = _b[0], process_1 = _b[1];
            this.start(queueName, process_1);
        }
        this.started.clear();
    };
    InjectableJobQueueStrategy.prototype.destroy = function () {
        this.hasInitialized = false;
    };
    return InjectableJobQueueStrategy;
}());
exports.InjectableJobQueueStrategy = InjectableJobQueueStrategy;
