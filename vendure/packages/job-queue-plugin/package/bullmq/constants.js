"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_JOB_TYPES = exports.DEFAULT_CONCURRENCY = exports.QUEUE_NAME = exports.BULLMQ_PLUGIN_OPTIONS = exports.loggerCtx = void 0;
exports.loggerCtx = 'BullMQJobQueuePlugin';
exports.BULLMQ_PLUGIN_OPTIONS = Symbol('BULLMQ_PLUGIN_OPTIONS');
exports.QUEUE_NAME = 'vendure-job-queue';
exports.DEFAULT_CONCURRENCY = 3;
exports.ALL_JOB_TYPES = [
    'completed',
    'failed',
    'delayed',
    'repeat',
    'waiting-children',
    'active',
    'wait',
    'paused',
    'prioritized',
];
//# sourceMappingURL=constants.js.map