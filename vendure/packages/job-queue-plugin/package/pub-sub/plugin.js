"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PubSubPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubPlugin = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const pub_sub_job_queue_strategy_1 = require("./pub-sub-job-queue-strategy");
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
let PubSubPlugin = PubSubPlugin_1 = class PubSubPlugin {
    static init(options) {
        this.options = options;
        return PubSubPlugin_1;
    }
};
exports.PubSubPlugin = PubSubPlugin;
exports.PubSubPlugin = PubSubPlugin = PubSubPlugin_1 = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        providers: [
            { provide: constants_1.PUB_SUB_OPTIONS, useFactory: () => PubSubPlugin.options },
            { provide: pubsub_1.PubSub, useFactory: () => new pubsub_1.PubSub() },
        ],
        configuration: config => {
            config.jobQueueOptions.jobQueueStrategy = new pub_sub_job_queue_strategy_1.PubSubJobQueueStrategy();
            return config;
        },
        compatibility: '^3.0.0',
    })
], PubSubPlugin);
//# sourceMappingURL=plugin.js.map