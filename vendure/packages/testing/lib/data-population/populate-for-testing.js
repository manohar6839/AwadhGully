"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateForTesting = populateForTesting;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const cli_1 = require("@vendure/core/cli");
const populate_customers_1 = require("./populate-customers");
/* eslint-disable @typescript-eslint/no-floating-promises */
/**
 * Clears all tables from the database and populates with (deterministic) random data.
 */
async function populateForTesting(config, bootstrapFn, options) {
    var _a;
    config.dbConnectionOptions.logging = false;
    const logging = options.logging === undefined ? true : options.logging;
    const originalRequireVerification = config.authOptions.requireVerification;
    config.authOptions.requireVerification = false;
    const app = await bootstrapFn(config);
    await awaitOutstandingJobs(app);
    const logFn = (message) => (logging ? console.log(message) : null);
    await (0, cli_1.populateInitialData)(app, options.initialData);
    await populateProducts(app, options.productsCsvPath, logging);
    await (0, cli_1.populateCollections)(app, options.initialData);
    await (0, populate_customers_1.populateCustomers)(app, (_a = options.customerCount) !== null && _a !== void 0 ? _a : 10, logFn);
    config.authOptions.requireVerification = originalRequireVerification;
    return app;
}
/**
 * Sometimes there will be jobs created during the bootstrap process, e.g. when
 * a plugin needs to create certain entities during bootstrap, which might then
 * trigger e.g. search index update jobs. This can lead to very hard-to-debug
 * failures in e2e tests suites (specifically at this moment, consistent failures
 * of the sql.js tests on Node v20).
 *
 * This function will wait for all outstanding jobs to finish before returning.
 */
async function awaitOutstandingJobs(app) {
    const { jobQueueStrategy } = app.get(core_1.ConfigService).jobQueueOptions;
    const maxAttempts = 10;
    let attempts = 0;
    if ((0, core_1.isInspectableJobQueueStrategy)(jobQueueStrategy)) {
        const inspectableJobQueueStrategy = jobQueueStrategy;
        function waitForJobQueueToBeIdle() {
            return new Promise(resolve => {
                const interval = setInterval(async () => {
                    attempts++;
                    const { items } = await inspectableJobQueueStrategy.findMany();
                    const jobsOutstanding = items.filter(i => i.state === 'RUNNING' || i.state === 'PENDING');
                    if (jobsOutstanding.length === 0 || attempts >= maxAttempts) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 500);
            });
        }
        await waitForJobQueueToBeIdle();
    }
}
async function populateProducts(app, productsCsvPath, logging) {
    if (!productsCsvPath) {
        if (logging) {
            console.log('\nNo product data provided, skipping product import');
        }
        return;
    }
    const importResult = await (0, cli_1.importProductsFromCsv)(app, productsCsvPath, generated_types_1.LanguageCode.en);
    if (importResult.errors && importResult.errors.length) {
        console.log(`${importResult.errors.length} errors encountered when importing product data:`);
        console.log(importResult.errors.join('\n'));
    }
    if (logging) {
        console.log(`\nImported ${importResult.imported} products`);
    }
}
//# sourceMappingURL=populate-for-testing.js.map