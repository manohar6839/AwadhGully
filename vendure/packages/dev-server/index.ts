import { bootstrap } from '@vendure/core';
import { devConfig } from './dev-config';

bootstrap(devConfig)
    .then(app => {
        console.log('Vendure server started on port 3000');
    })
    .catch(err => {
        console.log(err);
    });
