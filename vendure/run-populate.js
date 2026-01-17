
const path = require('path');

// Change to dev-server directory so paths resolve correctly
process.chdir(path.join(__dirname, 'packages/dev-server'));

// Require tools (Node resolves these from run-populate.js location, i.e., root)
const tsNode = require('ts-node');
const tsConfigPaths = require('tsconfig-paths');

// Register ts-node
tsNode.register({
    project: 'tsconfig.json', // relative to newly set CWD
    transpileOnly: true
});

// Run the script
require('./packages/dev-server/populate-awadh.ts');
