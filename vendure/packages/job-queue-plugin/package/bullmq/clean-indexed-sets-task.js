"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanIndexedSetsTask = void 0;
const core_1 = require("@vendure/core");
const job_list_index_service_1 = require("./job-list-index.service");
exports.cleanIndexedSetsTask = new core_1.ScheduledTask({
    id: 'clean-job-queue-index',
    description: 'Cleans up the index used to speed up job queue listing operations',
    schedule: cron => cron.everyMinute(),
    async execute({ injector }) {
        return injector.get(job_list_index_service_1.JobListIndexService).cleanupIndexedSets();
    },
});
//# sourceMappingURL=clean-indexed-sets-task.js.map