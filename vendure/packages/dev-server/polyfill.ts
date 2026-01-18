import crypto from 'crypto';

// @ts-ignore
if (typeof global.crypto === 'undefined') {
    // @ts-ignore
    global.crypto = crypto;
    console.log('Polyfilled global.crypto');
}
