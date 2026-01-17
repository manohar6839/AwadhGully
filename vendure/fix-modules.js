const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'node_modules');

function crawl(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        if (item.startsWith('.')) continue; // skip .bin etc
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (item.startsWith('@')) {
                crawl(fullPath); // Scope folders
            } else {
                checkPackage(fullPath);
                // Don't recurse deeper into normal packages unless they have nested node_modules
                if (fs.existsSync(path.join(fullPath, 'node_modules'))) {
                    crawl(path.join(fullPath, 'node_modules'));
                }
            }
        }
    }
}

function checkPackage(pkgDir) {
    const pkgFile = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgFile)) return;

    try {
        const content = fs.readFileSync(pkgFile, 'utf8');
        const json = JSON.parse(content);

        // Targeted Fix Criteria
        const isTarget = json.name && (
            json.name.startsWith('@graphql-tools') || 
            json.name.startsWith('@whatwg-node') || 
            json.name === 'cross-inspect' ||
            json.name === 'dset' ||
            json.name === 'glob' ||
            json.name === 'minimatch' ||
            json.name === 'picomatch' ||
            json.name === 'path-scurry' ||
            json.name === 'lru-cache' ||
            json.name === 'minipass' ||
            json.name === 'i18next-fs-backend' ||
            json.name === 'i18next-http-middleware' ||
            json.name === 'i18next-icu' ||
            json.name === 'parse5' ||
            json.name === 'entities' ||
            json.name === 'parse5-htmlparser2-tree-adapter' ||
            json.name === 'tar' ||
            json.name === '@apollo/server' ||
            json.name === '@apollo/server-plugin-landing-page-graphql-playground' ||
            json.name === 'graphql-scalars' ||
            json.name === '@apollo/usage-reporting-protobuf'
        );

        if (isTarget && json.type === 'module') {
            console.log(`Fixing ${json.name} in ${pkgDir}...`);
            delete json.type;
            fs.writeFileSync(pkgFile, JSON.stringify(json, null, 2));
        }
    } catch (e) {
        // ignore errors
    }
}

console.log('Scanning for broken ESM packages...');
crawl(ROOT);
console.log('Done.');
