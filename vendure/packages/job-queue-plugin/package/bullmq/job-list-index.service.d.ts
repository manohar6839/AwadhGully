import { ProcessContext } from '@vendure/core';
import { Queue } from 'bullmq';
import Redis, { Cluster } from 'ioredis';
import { BullMQPluginOptions } from './types';
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
export declare class JobListIndexService {
    private readonly options;
    private readonly processContext;
    private readonly BATCH_SIZE;
    private redis;
    private queue;
    private queueEvents;
    private allStates;
    constructor(options: BullMQPluginOptions, processContext: ProcessContext);
    /**
     * @description
     * Should be called by the BullMQJobQueueStrategy as soon as the Redis connection and Queue
     * object are available in the init() function.
     */
    register(redisConnection: Redis | Cluster, queue: Queue): void;
    private setupEventListeners;
    /**
     * When a job's state changes, we need to update the indexed set
     * to reflect the new state of the job.
     */
    private updateJobIndex;
    private removeJobFromAllIndices;
    /**
     * @description
     * This method is used to migrate existing jobs to use the indexed set method of tracking jobs.
     * When the app bootstraps, we check to see if the existing jobs in the queue have a corresponding
     * indexed set. If not, we create the indexed set and add the jobs to it.
     */
    migrateExistingJobs(): Promise<void>;
    /**
     * @description
     * This method is used to clean up the indexed sets to remove jobs that have been removed from the queue.
     * This is done by checking each job in the indexed set to see if it still exists in the queue. If it does not,
     * it is removed from the indexed set.
     */
    cleanupIndexedSets(): Promise<{
        queueName: string;
        jobsRemoved: number;
    }[]>;
    private createSortedSetKey;
    private createQueueItemKey;
}
