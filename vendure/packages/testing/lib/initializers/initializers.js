"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInitializer = registerInitializer;
exports.getInitializerFor = getInitializerFor;
const initializerRegistry = {};
/**
 * @description
 * Registers a {@link TestDbInitializer} for the given database type. Should be called before invoking
 * {@link createTestEnvironment}.
 *
 * @docsCategory testing
 */
function registerInitializer(type, initializer) {
    initializerRegistry[type] = initializer;
}
function getInitializerFor(type) {
    const initializer = initializerRegistry[type];
    if (!initializer) {
        throw new Error(`No initializer has been registered for the database type "${type}"`);
    }
    return initializer;
}
//# sourceMappingURL=initializers.js.map