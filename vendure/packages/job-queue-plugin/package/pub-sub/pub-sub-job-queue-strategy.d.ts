import { InjectableJobQueueStrategy, Injector, Job, JobData, JobQueueStrategy } from '@vendure/core';
/**
 * @description
 * This JobQueueStrategy uses Google Cloud Pub/Sub to implement a job queue for Vendure.
 * It should not be used alone, but as part of the {@link PubSubPlugin}.
 *
 * Note: To use this strategy, you need to manually install the `@google-cloud/pubsub` package:
 *
 * ```shell
 * npm install @google-cloud/pubsub@^4.11.0
 * ```
 *
 * @docsCategory core plugins/JobQueuePlugin
 */
export declare class PubSubJobQueueStrategy extends InjectableJobQueueStrategy implements JobQueueStrategy {
    private concurrency;
    private queueNamePubSubPair;
    private pubSubClient;
    private topics;
    private subscriptions;
    private listeners;
    init(injector: Injector): void;
    destroy(): void;
    add<Data extends JobData<Data> = object>(job: Job<Data>): Promise<Job<Data>>;
    start<Data extends JobData<Data> = object>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    stop<Data extends JobData<Data> = object>(queueName: string, process: (job: Job<Data>) => Promise<any>): Promise<void>;
    private topic;
    private subscription;
}
