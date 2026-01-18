
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';

// Compile Admin UI to the Nginx alias directory
compileUiExtensions({
    outputPath: path.join(__dirname, '../admin-ui/dist/browser'),
    extensions: [],
    devMode: false,
}).compile?.().then(() => {
    console.log('Admin UI compiled successfully');
    process.exit(0);
}).catch((err: any) => {
    console.error(err);
    process.exit(1);
});
