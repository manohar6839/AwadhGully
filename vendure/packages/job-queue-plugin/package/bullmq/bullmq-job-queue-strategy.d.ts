import { JobListOptions } from '@vendure/common/lib/generated-types';
import { ID, Injector, InspectableJobQueueStrategy, Job, JobData, PaginatedList } from '@vendure/core';
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
export declare class BullMQJobQueueStrategy implements InspectableJobQueueStrategy {
    private redisConnection;
    private connectionOptions;
    private queue;
    private worker;
    private workerProcessor;
    private options;
    private jobListIndexService;
    private readonly queueNameProcessFnMap;
    private cancellationSub;
    private readonly cancelRunningJob$;
    private readonly CANCEL_JOB_CHANNEL;
    private readonly CANCELLED_JOB_LIST_NAME;
    init(injector: Injector): Promise<void>;
    destroy(): Promise<void>;
    add<Data extends JobData<Data> = object>(job: Job<Data>): Promise<Job<Data>>;
    cancelJob(jobId: string): Promise<Job | undefined>;
    findMany(options?: JobListOptions): Promise<PaginatedList<Job>>;
    findManyById(ids: ID[]): Promise<Job[]>;
    findOne(id: ID): Promise<Job | undefined>;
    removeSettledJobs(queueNames?: string[], olderThan?: Date): Promise<number>;
    start<Data extends JobData<Data> = object>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    private readonly subscribeToCancellationEvents;
    private stopped;
    stop<Data extends JobData<Data> = object>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    private setActiveJobAsCancelled;
    private createVendureJob;
    private getState;
    private callCustomScript;
    private defineCustomLuaScripts;
}
