"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobListIndexService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const bullmq_1 = require("bullmq");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
/**
 * @description
 * In order to efficiently query jobs in the job queue, we use a "sorted set" in Redis to track jobs
 * added to each queue. This allows to quickly fetch a list of jobs in a given queue without needing
 * to iterate over all jobs in the queue and read the job data.
 *
 * By using this approach we can achieve a several order of magnitude improvement in performance
 * over the former approach of iterating over all jobs via the custom LUA script.
 *
 * This also means that we need to periodically clean up the sorted sets to remove jobs that have
 * been removed from the queue (via the automatic removal features of BullMQ). Why do we need to
 * do this scheduled cleanup? Because currently BullMQ does not provide an event for when a job
 * is automatically removed from the queue, so we cannot listen for that event and remove. The
 * "removed" event is only emitted when a job is removed manually via the `remove()` method.
 * See https://github.com/taskforcesh/bullmq/issues/3209#issuecomment-2795102551
 */
let JobListIndexService = class JobListIndexService {
    constructor(options, processContext) {
        this.options = options;
        this.processContext = processContext;
        this.BATCH_SIZE = 100;
        this.allStates = [
            'wait',
            'active',
            'completed',
            'failed',
            'delayed',
            'waiting-children',
            'prioritized',
        ];
    }
    /**
     * @description
     * Should be called by the BullMQJobQueueStrategy as soon as the Redis connection and Queue
     * object are available in the init() function.
     */
    register(redisConnection, queue) {
        this.redis = redisConnection;
        this.queue = queue;
        this.queueEvents = new bullmq_1.QueueEvents(queue.name, { connection: redisConnection });
        this.setupEventListeners();
        void this.migrateExistingJobs();
    }
    setupEventListeners() {
        if (this.processContext.isServer)
            return;
        if (!this.queueEvents || !this.queue)
            return;
        // When a job is added to the queue
        this.queueEvents.on('waiting', ({ jobId }) => {
            void this.updateJobIndex(jobId, 'wait');
        });
        this.queueEvents.on('waiting-children', ({ jobId }) => {
            void this.updateJobIndex(jobId, 'waiting-children');
        });
        // When a job starts processing
        this.queueEvents.on('active', ({ jobId }) => {
            void this.updateJobIndex(jobId, 'active');
        });
        // When a job completes successfully
        this.queueEvents.on('completed', ({ jobId }) => {
            void this.updateJobIndex(jobId, 'completed');
        });
        // When a job fails
        this.queueEvents.on('failed', ({ jobId }) => {
            void this.updateJobIndex(jobId, 'failed');
        });
        // When a job is delayed
        this.queueEvents.on('delayed', ({ jobId }) => {
            void this.updateJobIndex(jobId, 'delayed');
        });
        // When a job is removed
        this.queueEvents.on('removed', ({ jobId }) => {
            void this.removeJobFromAllIndices(jobId);
        });
    }
    /**
     * When a job's state changes, we need to update the indexed set
     * to reflect the new state of the job.
     */
    async updateJobIndex(jobId, state) {
        if (!this.redis || !this.queue)
            return;
        try {
            const job = await this.queue.getJob(jobId);
            if (!job)
                return;
            const timestamp = job.timestamp;
            const targetKey = this.createSortedSetKey(job.name, state);
            // Remove from all state indices first
            await this.removeJobFromAllIndices(jobId);
            // Add to the specific state index
            const result = await this.redis.zadd(targetKey, timestamp, jobId);
            if (result === 1) {
                core_1.Logger.debug(`Added job ${jobId} to indexed key: ${targetKey}`, constants_1.loggerCtx);
            }
        }
        catch (err) {
            const error = err;
            core_1.Logger.error(`Failed to update job index: ${error.message}`, constants_1.loggerCtx);
        }
    }
    async removeJobFromAllIndices(jobId) {
        if (!this.redis || !this.queue)
            return;
        try {
            const job = await this.queue.getJob(jobId);
            if (!job)
                return;
            const pipeline = this.redis.pipeline();
            for (const state of this.allStates) {
                const indexedKey = this.createSortedSetKey(job.name, state);
                pipeline.zrem(indexedKey, jobId);
            }
            await pipeline.exec();
        }
        catch (err) {
            const error = err;
            core_1.Logger.error(`Failed to remove job from indices: ${error.message}`, constants_1.loggerCtx);
        }
    }
    /**
     * @description
     * This method is used to migrate existing jobs to use the indexed set method of tracking jobs.
     * When the app bootstraps, we check to see if the existing jobs in the queue have a corresponding
     * indexed set. If not, we create the indexed set and add the jobs to it.
     */
    async migrateExistingJobs() {
        var _a;
        if (this.processContext.isServer) {
            // We only want to perform this work on the worker.
            return;
        }
        if (!this.redis || !this.queue) {
            throw new Error('Redis and Queue must be registered before migrating jobs');
        }
        core_1.Logger.debug('Starting migration of existing jobs to indexed sets...', constants_1.loggerCtx);
        // Get counts of jobs in each state
        const counts = await this.queue.getJobCounts();
        core_1.Logger.debug(`Found job counts: ${JSON.stringify(counts)}`, constants_1.loggerCtx);
        let totalMigrated = 0;
        // Get all jobs from each state
        for (const state of this.allStates) {
            if (counts[state] > 0) {
                core_1.Logger.debug(`Processing ${counts[state]} jobs in ${state} state`, constants_1.loggerCtx);
                if (!this.queue) {
                    core_1.Logger.error('Queue is not initialized', constants_1.loggerCtx);
                    continue;
                }
                try {
                    const jobs = await this.queue.getJobs([state], 0, counts[state]);
                    if (!jobs) {
                        core_1.Logger.error(`getJobs returned undefined for state ${state}`, constants_1.loggerCtx);
                        continue;
                    }
                    core_1.Logger.debug(`Retrieved ${jobs.length} jobs for state ${state}`, constants_1.loggerCtx);
                    // Group jobs by queue name
                    const jobsByQueue = new Map();
                    for (const job of jobs) {
                        if (!job) {
                            core_1.Logger.error('Null job found in results', constants_1.loggerCtx);
                            continue;
                        }
                        if (!jobsByQueue.has(job.name)) {
                            jobsByQueue.set(job.name, []);
                        }
                        (_a = jobsByQueue.get(job.name)) === null || _a === void 0 ? void 0 : _a.push(job);
                    }
                    // Create sorted sets for each queue in this state
                    for (const [queueName, queueJobs] of jobsByQueue) {
                        const indexedKey = this.createSortedSetKey(queueName, state);
                        const exists = await this.redis.exists(indexedKey);
                        if (exists === 0) {
                            core_1.Logger.info(`Creating indexed set for queue: ${queueName} in state: ${state}`, constants_1.loggerCtx);
                            const pipeline = this.redis.pipeline();
                            // Add jobs in batches
                            for (let i = 0; i < queueJobs.length; i += this.BATCH_SIZE) {
                                const batch = queueJobs.slice(i, i + this.BATCH_SIZE);
                                const args = batch
                                    .flatMap(job => [job.timestamp, job.id])
                                    .filter((id) => id != null);
                                pipeline.zadd(indexedKey, ...args);
                            }
                            await pipeline.exec();
                            totalMigrated += queueJobs.length;
                        }
                    }
                }
                catch (err) {
                    const error = err;
                    core_1.Logger.error(`Failed to migrate jobs: ${error.message}`, constants_1.loggerCtx);
                }
            }
        }
        if (totalMigrated > 0) {
            core_1.Logger.info(`Successfully migrated ${totalMigrated} jobs to indexed sets`, constants_1.loggerCtx);
        }
    }
    /**
     * @description
     * This method is used to clean up the indexed sets to remove jobs that have been removed from the queue.
     * This is done by checking each job in the indexed set to see if it still exists in the queue. If it does not,
     * it is removed from the indexed set.
     */
    async cleanupIndexedSets() {
        if (!this.redis || !this.queue) {
            throw new Error('Redis and Queue must be registered before cleaning up indexed sets');
        }
        // Get all queue names from our indexed sets
        const allStateKeys = this.createSortedSetKey('*');
        const keys = [];
        let scanCursor = '0';
        do {
            const [nextCursor, foundKeys] = await this.redis.scan(scanCursor, 'MATCH', allStateKeys, 'COUNT', this.BATCH_SIZE);
            scanCursor = nextCursor;
            keys.push(...foundKeys);
        } while (scanCursor !== '0');
        const result = [];
        const startTime = Date.now();
        core_1.Logger.verbose(`Cleaning up ${keys.length} indexed sets`, constants_1.loggerCtx);
        for (const key of keys) {
            let cursor = '0';
            let jobsRemoved = 0;
            // Use ZSCAN to iterate over the set in batches
            do {
                const [nextCursor, elements] = await this.redis.zscan(key, cursor, 'COUNT', this.BATCH_SIZE);
                cursor = nextCursor;
                if (elements.length > 0) {
                    // Extract job IDs from the elements (they come as [score, id] pairs)
                    const jobIds = elements.filter((_, i) => i % 2 === 0);
                    // Check existence of jobs directly in Redis
                    const pipeline = this.redis.pipeline();
                    for (const jobId of jobIds) {
                        pipeline.exists(this.createQueueItemKey(jobId));
                    }
                    const existsResults = await pipeline.exec();
                    // Filter out non-existent jobs
                    const jobsToRemove = jobIds.filter((jobId, i) => {
                        var _a;
                        const exists = ((_a = existsResults === null || existsResults === void 0 ? void 0 : existsResults[i]) === null || _a === void 0 ? void 0 : _a[1]) === 1;
                        return !exists;
                    });
                    if (jobsToRemove.length > 0) {
                        await this.redis.zrem(key, ...jobsToRemove);
                        jobsRemoved += jobsToRemove.length;
                    }
                }
            } while (cursor !== '0');
            if (jobsRemoved > 0) {
                core_1.Logger.verbose(`Cleaned up ${jobsRemoved} non-existent jobs from indexed key: ${key}`, constants_1.loggerCtx);
            }
            result.push({ queueName: key, jobsRemoved });
        }
        const endTime = Date.now();
        core_1.Logger.verbose(`Cleaned up ${keys.length} indexed sets in ${endTime - startTime}ms`, constants_1.loggerCtx);
        return result;
    }
    createSortedSetKey(queueName, state) {
        const prefix = (0, utils_1.getPrefix)(this.options);
        if (!this.queue) {
            throw new Error('Queue is not initialized');
        }
        let key = `${prefix}:${this.queue.name}:queue:${queueName}`;
        if (state) {
            key += `:${state}`;
        }
        return key;
    }
    createQueueItemKey(jobId) {
        const prefix = (0, utils_1.getPrefix)(this.options);
        if (!this.queue) {
            throw new Error('Queue is not initialized');
        }
        return `${prefix}:${this.queue.name}:${jobId}`;
    }
};
exports.JobListIndexService = JobListIndexService;
exports.JobListIndexService = JobListIndexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.BULLMQ_PLUGIN_OPTIONS)),
    __metadata("design:paramtypes", [Object, core_1.ProcessContext])
], JobListIndexService);
//# sourceMappingURL=job-list-index.service.js.map