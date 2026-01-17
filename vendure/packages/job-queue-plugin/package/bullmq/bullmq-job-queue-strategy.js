"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMQJobQueueStrategy = void 0;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const shared_utils_1 = require("@vendure/common/lib/shared-utils");
const core_1 = require("@vendure/core");
const bullmq_1 = require("bullmq");
const events_1 = require("events");
const ioredis_1 = require("ioredis");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const constants_1 = require("./constants");
const job_list_index_service_1 = require("./job-list-index.service");
const redis_health_indicator_1 = require("./redis-health-indicator");
const get_jobs_by_type_1 = require("./scripts/get-jobs-by-type");
const utils_1 = require("./utils");
/**
 * @description
 * This JobQueueStrategy uses [BullMQ](https://docs.bullmq.io/) to implement a push-based job queue
 * on top of Redis. It should not be used alone, but as part of the {@link BullMQJobQueuePlugin}.
 *
 * Note: To use this strategy, you need to manually install the `bullmq` package:
 *
 * ```shell
 * npm install bullmq@^5.4.2
 * ```
 *
 * @docsCategory core plugins/JobQueuePlugin
 */
class BullMQJobQueueStrategy {
    constructor() {
        this.queueNameProcessFnMap = new Map();
        this.cancelRunningJob$ = new rxjs_1.Subject();
        this.CANCEL_JOB_CHANNEL = 'cancel-job';
        this.CANCELLED_JOB_LIST_NAME = 'vendure:cancelled-jobs';
        this.subscribeToCancellationEvents = (channel, jobId) => {
            if (channel === this.CANCEL_JOB_CHANNEL && jobId) {
                this.cancelRunningJob$.next(jobId);
            }
        };
        this.stopped = false;
    }
    async init(injector) {
        var _a, _b, _c, _d, _e;
        const options = injector.get(constants_1.BULLMQ_PLUGIN_OPTIONS);
        this.jobListIndexService = injector.get(job_list_index_service_1.JobListIndexService);
        this.options = Object.assign(Object.assign({}, options), { workerOptions: Object.assign(Object.assign({}, options.workerOptions), { removeOnComplete: (_b = (_a = options.workerOptions) === null || _a === void 0 ? void 0 : _a.removeOnComplete) !== null && _b !== void 0 ? _b : {
                    age: 60 * 60 * 24 * 30,
                    count: 5000,
                }, removeOnFail: (_d = (_c = options.workerOptions) === null || _c === void 0 ? void 0 : _c.removeOnFail) !== null && _d !== void 0 ? _d : { age: 60 * 60 * 24 * 30, count: 5000 } }) });
        this.connectionOptions =
            (_e = options.connection) !== null && _e !== void 0 ? _e : { host: 'localhost', port: 6379, maxRetriesPerRequest: null };
        this.redisConnection =
            this.connectionOptions instanceof events_1.EventEmitter
                ? this.connectionOptions
                : new ioredis_1.Redis(this.connectionOptions);
        this.defineCustomLuaScripts();
        const redisHealthIndicator = injector.get(redis_health_indicator_1.RedisHealthIndicator);
        core_1.Logger.info('Checking Redis connection...', constants_1.loggerCtx);
        const health = await redisHealthIndicator.isHealthy('redis');
        if (health.redis.status === 'down') {
            core_1.Logger.error('Could not connect to Redis', constants_1.loggerCtx);
        }
        else {
            core_1.Logger.info('Connected to Redis ✔', constants_1.loggerCtx);
        }
        this.queue = new bullmq_1.Queue(constants_1.QUEUE_NAME, Object.assign(Object.assign({}, options.queueOptions), { connection: this.redisConnection }))
            .on('error', (e) => core_1.Logger.error(`BullMQ Queue error: ${JSON.stringify(e.message)}`, constants_1.loggerCtx, e.stack))
            .on('resumed', () => core_1.Logger.verbose('BullMQ Queue resumed', constants_1.loggerCtx))
            .on('paused', () => core_1.Logger.verbose('BullMQ Queue paused', constants_1.loggerCtx));
        if (await this.queue.isPaused()) {
            await this.queue.resume();
        }
        this.workerProcessor = async (bullJob) => {
            var _a, _b, _c;
            const queueName = bullJob.name;
            core_1.Logger.debug(`Job ${(_a = bullJob.id) !== null && _a !== void 0 ? _a : ''} [${queueName}] starting (attempt ${bullJob.attemptsMade + 1} of ${(_b = bullJob.opts.attempts) !== null && _b !== void 0 ? _b : 1})`);
            const processFn = this.queueNameProcessFnMap.get(queueName);
            if (processFn) {
                const job = await this.createVendureJob(bullJob);
                const completed$ = new rxjs_1.Subject();
                try {
                    // eslint-disable-next-line
                    job.on('progress', _job => bullJob.updateProgress(_job.progress));
                    this.cancelRunningJob$
                        .pipe((0, operators_1.filter)(jobId => jobId === job.id), (0, operators_1.takeUntil)(completed$))
                        .subscribe(() => {
                        var _a;
                        core_1.Logger.info(`Setting job ${(_a = job.id) !== null && _a !== void 0 ? _a : ''} as cancelled`, constants_1.loggerCtx);
                        job.cancel();
                    });
                    const result = await processFn(job);
                    await bullJob.updateProgress(100);
                    return result;
                }
                catch (e) {
                    throw e;
                }
                finally {
                    if (job.id) {
                        await this.redisConnection.srem(this.CANCELLED_JOB_LIST_NAME, (_c = job.id) === null || _c === void 0 ? void 0 : _c.toString());
                    }
                    completed$.next();
                    completed$.complete();
                }
            }
            throw new core_1.InternalServerError(`No processor defined for the queue "${queueName}"`);
        };
        // Subscription-mode Redis connection for the cancellation messages
        this.cancellationSub = new ioredis_1.Redis(this.connectionOptions);
        this.jobListIndexService.register(this.redisConnection, this.queue);
    }
    async destroy() {
        var _a;
        await Promise.all([this.queue.close(), (_a = this.worker) === null || _a === void 0 ? void 0 : _a.close()]);
    }
    async add(job) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const retries = (_d = (_c = (_b = (_a = this.options).setRetries) === null || _b === void 0 ? void 0 : _b.call(_a, job.queueName, job)) !== null && _c !== void 0 ? _c : job.retries) !== null && _d !== void 0 ? _d : 0;
        const backoff = (_g = (_f = (_e = this.options).setBackoff) === null || _f === void 0 ? void 0 : _f.call(_e, job.queueName, job)) !== null && _g !== void 0 ? _g : {
            delay: 1000,
            type: 'exponential',
        };
        const customJobOptions = (_k = (_j = (_h = this.options).setJobOptions) === null || _j === void 0 ? void 0 : _j.call(_h, job.queueName, job)) !== null && _k !== void 0 ? _k : {};
        const bullJob = await this.queue.add(job.queueName, job.data, Object.assign({ attempts: typeof retries === 'number' ? retries + 1 : 1, backoff: typeof backoff === 'number' || 'type' in backoff ? backoff : undefined }, customJobOptions));
        return this.createVendureJob(bullJob);
    }
    async cancelJob(jobId) {
        const bullJob = await this.queue.getJob(jobId);
        if (bullJob) {
            if (await bullJob.isActive()) {
                await this.setActiveJobAsCancelled(jobId);
                return this.createVendureJob(bullJob);
            }
            else {
                try {
                    const job = await this.createVendureJob(bullJob);
                    await bullJob.remove();
                    return job;
                }
                catch (e) {
                    const message = `Error when cancelling job: ${JSON.stringify(e.message)}`;
                    core_1.Logger.error(message, constants_1.loggerCtx);
                    throw new core_1.InternalServerError(message);
                }
            }
        }
    }
    async findMany(options) {
        var _a, _b, _c, _d, _e, _f, _g;
        const skip = (_a = options === null || options === void 0 ? void 0 : options.skip) !== null && _a !== void 0 ? _a : 0;
        const take = (_b = options === null || options === void 0 ? void 0 : options.take) !== null && _b !== void 0 ? _b : 10;
        let jobTypes = constants_1.ALL_JOB_TYPES;
        const stateFilter = (_c = options === null || options === void 0 ? void 0 : options.filter) === null || _c === void 0 ? void 0 : _c.state;
        if (stateFilter === null || stateFilter === void 0 ? void 0 : stateFilter.eq) {
            switch (stateFilter.eq) {
                case 'PENDING':
                    jobTypes = ['wait', 'waiting-children', 'prioritized'];
                    break;
                case 'RUNNING':
                    jobTypes = ['active'];
                    break;
                case 'COMPLETED':
                    jobTypes = ['completed'];
                    break;
                case 'RETRYING':
                    jobTypes = ['repeat'];
                    break;
                case 'FAILED':
                    jobTypes = ['failed'];
                    break;
                case 'CANCELLED':
                    jobTypes = ['failed'];
                    break;
            }
        }
        const settledFilter = (_d = options === null || options === void 0 ? void 0 : options.filter) === null || _d === void 0 ? void 0 : _d.isSettled;
        if ((settledFilter === null || settledFilter === void 0 ? void 0 : settledFilter.eq) != null) {
            jobTypes =
                settledFilter.eq === true
                    ? ['completed', 'failed']
                    : ['wait', 'waiting-children', 'active', 'repeat', 'delayed', 'paused', 'prioritized'];
        }
        let items = [];
        let totalItems = 0;
        try {
            const [total, jobIds] = await this.callCustomScript(get_jobs_by_type_1.getJobsByType, [
                skip,
                take,
                (_g = (_f = (_e = options === null || options === void 0 ? void 0 : options.filter) === null || _e === void 0 ? void 0 : _e.queueName) === null || _f === void 0 ? void 0 : _f.eq) !== null && _g !== void 0 ? _g : '',
                ...jobTypes,
            ]);
            items = (await Promise.all(jobIds.map(id => {
                return bullmq_1.Job.fromId(this.queue, id);
            }))).filter(shared_utils_1.notNullOrUndefined);
            totalItems = total;
        }
        catch (e) {
            throw new core_1.InternalServerError(e.message);
        }
        return { items: await Promise.all(items.map(bullJob => this.createVendureJob(bullJob))), totalItems };
    }
    async findManyById(ids) {
        const bullJobs = await Promise.all(ids.map(id => this.queue.getJob(id.toString())));
        return Promise.all(bullJobs.filter(shared_utils_1.notNullOrUndefined).map(j => this.createVendureJob(j)));
    }
    async findOne(id) {
        const bullJob = await this.queue.getJob(id.toString());
        if (bullJob) {
            return this.createVendureJob(bullJob);
        }
    }
    // TODO V2: actually make it use the olderThan parameter
    async removeSettledJobs(queueNames, olderThan) {
        try {
            const jobCounts = await this.queue.getJobCounts('completed', 'failed');
            await this.queue.clean(100, 0, 'completed');
            await this.queue.clean(100, 0, 'failed');
            return Object.values(jobCounts).reduce((sum, num) => sum + num, 0);
        }
        catch (e) {
            core_1.Logger.error(e.message, constants_1.loggerCtx, e.stack);
            return 0;
        }
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async start(queueName, process) {
        this.queueNameProcessFnMap.set(queueName, process);
        if (!this.worker) {
            const options = Object.assign(Object.assign({ concurrency: constants_1.DEFAULT_CONCURRENCY }, this.options.workerOptions), { connection: this.redisConnection });
            this.worker = new bullmq_1.Worker(constants_1.QUEUE_NAME, this.workerProcessor, options)
                .on('error', e => core_1.Logger.error(`BullMQ Worker error: ${e.message}`, constants_1.loggerCtx, e.stack))
                .on('closing', e => core_1.Logger.verbose(`BullMQ Worker closing: ${e}`, constants_1.loggerCtx))
                .on('closed', () => core_1.Logger.verbose('BullMQ Worker closed', constants_1.loggerCtx))
                .on('failed', (job, error) => {
                var _a, _b, _c, _d;
                core_1.Logger.warn(`Job ${(_a = job === null || job === void 0 ? void 0 : job.id) !== null && _a !== void 0 ? _a : '(unknown id)'} [${(_b = job === null || job === void 0 ? void 0 : job.name) !== null && _b !== void 0 ? _b : 'unknown name'}] failed (attempt ${(_c = job === null || job === void 0 ? void 0 : job.attemptsMade) !== null && _c !== void 0 ? _c : 'unknown'} of ${(_d = job === null || job === void 0 ? void 0 : job.opts.attempts) !== null && _d !== void 0 ? _d : 1})`, constants_1.loggerCtx);
            })
                .on('stalled', (jobId) => {
                core_1.Logger.warn(`BullMQ Worker: job ${jobId} stalled`, constants_1.loggerCtx);
            })
                .on('completed', (job) => {
                var _a;
                core_1.Logger.debug(`Job ${(_a = job === null || job === void 0 ? void 0 : job.id) !== null && _a !== void 0 ? _a : 'unknown id'} [${job.name}] completed`, constants_1.loggerCtx);
            });
            await this.cancellationSub.subscribe(this.CANCEL_JOB_CHANNEL);
            this.cancellationSub.on('message', this.subscribeToCancellationEvents);
        }
    }
    async stop(queueName, process) {
        if (!this.stopped) {
            this.stopped = true;
            try {
                core_1.Logger.info(`Closing worker`, constants_1.loggerCtx);
                let timer;
                const checkActive = async () => {
                    const activeCount = await this.queue.getActiveCount();
                    if (0 < activeCount) {
                        const activeJobs = await this.queue.getActive();
                        core_1.Logger.info(`Waiting on ${activeCount} active ${activeCount > 1 ? 'jobs' : 'job'} (${activeJobs.map(j => j.id).join(', ')})...`, constants_1.loggerCtx);
                        timer = setTimeout(() => {
                            void checkActive();
                        }, 2000);
                    }
                };
                timer = setTimeout(() => {
                    void checkActive();
                }, 2000);
                await this.worker.close();
                core_1.Logger.info(`Worker closed`, constants_1.loggerCtx);
                await this.queue.close();
                clearTimeout(timer);
                core_1.Logger.info(`Queue closed`, constants_1.loggerCtx);
                this.cancellationSub.off('message', this.subscribeToCancellationEvents);
            }
            catch (e) {
                core_1.Logger.error(e, constants_1.loggerCtx, e.stack);
            }
        }
    }
    async setActiveJobAsCancelled(jobId) {
        // Not yet possible natively in BullMQ, see
        // https://github.com/taskforcesh/bullmq/issues/632
        // So we have our own custom method of marking a job as cancelled.
        await this.redisConnection.publish(this.CANCEL_JOB_CHANNEL, jobId);
        await this.redisConnection.sadd(this.CANCELLED_JOB_LIST_NAME, jobId.toString());
    }
    async createVendureJob(bullJob) {
        const jobJson = bullJob.toJSON();
        return new core_1.Job({
            queueName: bullJob.name,
            id: bullJob.id,
            state: await this.getState(bullJob),
            data: bullJob.data,
            attempts: bullJob.attemptsMade,
            createdAt: new Date(jobJson.timestamp),
            startedAt: jobJson.processedOn ? new Date(jobJson.processedOn) : undefined,
            settledAt: jobJson.finishedOn ? new Date(jobJson.finishedOn) : undefined,
            error: jobJson.failedReason,
            progress: +jobJson.progress,
            result: jobJson.returnvalue,
            retries: bullJob.opts.attempts ? bullJob.opts.attempts - 1 : 0,
        });
    }
    async getState(bullJob) {
        var _a;
        const jobId = (_a = bullJob.id) === null || _a === void 0 ? void 0 : _a.toString();
        const state = await bullJob.getState();
        switch (state) {
            case 'completed':
                return generated_types_1.JobState.COMPLETED;
            case 'failed':
                return generated_types_1.JobState.FAILED;
            case 'waiting':
            case 'waiting-children':
            case 'prioritized':
                return generated_types_1.JobState.PENDING;
            case 'delayed':
                return generated_types_1.JobState.RETRYING;
            case 'active': {
                const isCancelled = jobId && (await this.redisConnection.sismember(this.CANCELLED_JOB_LIST_NAME, jobId));
                return isCancelled ? generated_types_1.JobState.CANCELLED : generated_types_1.JobState.RUNNING;
            }
            case 'unknown':
            default: {
                core_1.Logger.error(`Could not determine job state for job ${jobId !== null && jobId !== void 0 ? jobId : '(unknown ID)'}: ${state}`, constants_1.loggerCtx);
                // We need to return a valid state, so we default to FAILED.
                return generated_types_1.JobState.FAILED;
            }
        }
    }
    callCustomScript(scriptDef, args) {
        return new Promise((resolve, reject) => {
            const prefix = (0, utils_1.getPrefix)(this.options);
            this.redisConnection[scriptDef.name](`${prefix}:${this.queue.name}:`, ...args, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    defineCustomLuaScripts() {
        const redis = this.redisConnection;
        redis.defineCommand(get_jobs_by_type_1.getJobsByType.name, {
            numberOfKeys: get_jobs_by_type_1.getJobsByType.numberOfKeys,
            lua: get_jobs_by_type_1.getJobsByType.script,
        });
    }
}
exports.BullMQJobQueueStrategy = BullMQJobQueueStrategy;
//# sourceMappingURL=bullmq-job-queue-strategy.js.map