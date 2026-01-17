import { Type } from '@vendure/core';
import { PubSubOptions } from './options';
/**
 * @description
 * This plugin uses Google Cloud Pub/Sub to implement a job queue strategy for Vendure.
 *
 * ## Installation
 *
 * Note: To use this plugin, you need to manually install the `@google-cloud/pubsub` package:
 *
 * ```shell
 * npm install @google-cloud/pubsub@^2.8.0
 * ```
 *
 * @docsCategory core plugins/JobQueuePlugin
 */
export declare class PubSubPlugin {
    private static options;
    static init(options: PubSubOptions): Type<PubSubPlugin>;
}
