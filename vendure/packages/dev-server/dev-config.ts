/* eslint-disable no-console */
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { ADMIN_API_PATH, API_PORT, SHOP_API_PATH } from '@vendure/common/lib/shared-constants';
import {
    DefaultJobQueuePlugin,
    DefaultLogger,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    dummyPaymentHandler,
    LogLevel,
    SettingsStoreScopes,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import 'dotenv/config';
import path from 'path';
import { DataSourceOptions } from 'typeorm';

export const devConfig: VendureConfig = {
    apiOptions: {
        hostname: '0.0.0.0',
        port: 3000,
        adminApiPath: ADMIN_API_PATH,
        adminApiPlayground: { settings: { 'request.credentials': 'include' } },
        adminApiDebug: true,
        shopApiPath: SHOP_API_PATH,
        shopApiPlayground: { settings: { 'request.credentials': 'include' } },
        shopApiDebug: true,
        cors: {
            origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://143.110.191.214', 'http://143.110.191.214:3001', 'http://143.110.191.214:3000', 'http://awadhgully.com', 'https://awadhgully.com', 'http://www.awadhgully.com', 'https://www.awadhgully.com'],
            credentials: true,
        },
    },
    authOptions: {
        disableAuth: false,
        tokenMethod: ['bearer', 'cookie'] as const,
        requireVerification: true,
        customPermissions: [],
        cookieOptions: { secret: 'abc' },
    },
    dbConnectionOptions: {
        synchronize: false,
        logging: false,
        migrations: [path.join(__dirname, 'migrations/*.ts')],
        ...getDbConfig(),
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    settingsStoreFields: {
        MyPlugin: [
            { name: 'globalVal' },
            { name: 'userVal', scope: SettingsStoreScopes.user },
        ],
    },
    customFields: {},
    logger: new DefaultLogger({ level: LogLevel.Verbose }),
    importExportOptions: {
        importAssetsDir: path.join(__dirname, 'import-assets'),
    },
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../../assets'),
        }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: false }),
        DefaultJobQueuePlugin.init({}),
        DefaultSchedulerPlugin.init({}),
        EmailPlugin.init({
            devMode: true, // Keeping devMode for now to log to file, effectively serving as a 'mock' until SMTP is provided.
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../email-plugin/templates')),
            outputPath: path.join(__dirname, 'test-emails'),
            globalTemplateVars: {
                verifyEmailAddressUrl: 'https://awadhgully.com/verify-email',
                passwordResetUrl: 'https://awadhgully.com/reset-password',
                changeEmailAddressUrl: 'https://awadhgully.com/change-email-address',
            },
        }),
    ],
};

function getDbConfig(): DataSourceOptions {
    const dbType = process.env.DB || 'mysql';
    switch (dbType) {
        case 'postgres':
            console.log('Using postgres connection');
            return {
                synchronize: true,
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: Number(process.env.DB_PORT) || 5432,
                username: process.env.DB_USERNAME || 'vendure',
                password: process.env.DB_PASSWORD || 'password',
                database: process.env.DB_NAME || 'vendure-dev',
                schema: process.env.DB_SCHEMA || 'public',
            };
        default:
             return {
                synchronize: true,
                type: 'better-sqlite3',
                database: path.join(__dirname, 'vendure.sqlite'),
            };
    }
}
