"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisJobBufferStorageStrategy = void 0;
const core_1 = require("@vendure/core");
const ioredis_1 = require("ioredis");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const BUFFER_LIST_PREFIX = 'vendure-job-buffer';
class RedisJobBufferStorageStrategy {
    init(injector) {
        const options = injector.get(constants_1.BULLMQ_PLUGIN_OPTIONS);
        this.prefix = `${(0, utils_1.getPrefix)(options)}:`;
        if (options.connection instanceof ioredis_1.Redis) {
            this.redis = options.connection;
        }
        else if (options.connection instanceof ioredis_1.Cluster) {
            this.redis = options.connection;
        }
        else {
            this.redis = new ioredis_1.Redis(options.connection);
        }
    }
    async add(bufferId, job) {
        const result = await this.redis.lpush(this.keyName(bufferId), this.toJobConfigString(job));
        return job;
    }
    async bufferSize(bufferIds) {
        const ids = (bufferIds === null || bufferIds === void 0 ? void 0 : bufferIds.length) ? bufferIds : await this.getAllBufferIds();
        const result = {};
        for (const id of bufferIds || []) {
            const key = this.keyName(id);
            const count = await this.redis.llen(key);
            result[id] = count;
        }
        return result;
    }
    async flush(bufferIds) {
        const ids = (bufferIds === null || bufferIds === void 0 ? void 0 : bufferIds.length) ? bufferIds : await this.getAllBufferIds();
        const result = {};
        for (const id of bufferIds || []) {
            const key = this.keyName(id);
            const items = await this.redis.lrange(key, 0, -1);
            await this.redis.del(key);
            result[id] = items.map(item => this.toJob(item));
        }
        return result;
    }
    keyName(bufferId) {
        return `${this.prefix}${BUFFER_LIST_PREFIX}:${bufferId}`;
    }
    toJobConfigString(job) {
        var _a;
        const jobConfig = {
            queueName: job.queueName,
            data: job.data,
            retries: job.retries,
            attempts: job.attempts,
            state: job.state,
            progress: job.progress,
            result: job.result,
            error: job.error,
            createdAt: job.createdAt,
            startedAt: job.startedAt,
            settledAt: job.settledAt,
            id: (_a = job.id) !== null && _a !== void 0 ? _a : undefined,
        };
        return JSON.stringify(jobConfig);
    }
    toJob(jobConfigString) {
        try {
            const jobConfig = JSON.parse(jobConfigString);
            return new core_1.Job(jobConfig);
        }
        catch (e) {
            core_1.Logger.error(`Could not parse buffered job:\n${JSON.stringify(e.message)}`, constants_1.loggerCtx, e.stack);
            throw e;
        }
    }
    async getAllBufferIds() {
        const keyPrefix = `${this.prefix}${BUFFER_LIST_PREFIX}:`;
        const stream = this.redis instanceof ioredis_1.Redis
            ? this.redis.scanStream({ match: `${keyPrefix}*` })
            : this.redis.nodes()[0].scanStream({ match: `${keyPrefix}*` });
        const keys = await new Promise((resolve, reject) => {
            const allKeys = [];
            stream.on('data', _keys => allKeys.push(..._keys));
            stream.on('end', () => resolve(allKeys));
            stream.on('error', err => reject(err));
        });
        return keys.map(key => key.replace(keyPrefix, ''));
    }
}
exports.RedisJobBufferStorageStrategy = RedisJobBufferStorageStrategy;
//# sourceMappingURL=redis-job-buffer-storage-strategy.js.map