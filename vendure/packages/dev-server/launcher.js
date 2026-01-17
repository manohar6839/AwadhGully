
// CRITICAL FIX: Patch global exports to prevent @graphql-tools crash in CJS/ESM mixed env
Object.defineProperty(global, 'exports', { value: {} });

console.log('Running CJS Launcher for Population Script...');

// We need to ensure we can find the compiled file.
// Based on dist structure: packages/dev-server/dist/dev-server/populate-awadh.js
try {
    require('./dist/dev-server/populate-awadh.js');
} catch (e) {
    console.error('Launcher failed to require script:', e);
}
