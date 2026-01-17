import { bootstrap, defaultConfig, JobQueueService, Logger, mergeConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { clearAllTables, populateCustomers } from '@vendure/testing';
import path from 'path';
import fs from 'fs';

import { initialData } from '../core/mock-data/data-sources/initial-data';

import { devConfig } from './dev-config';

/* eslint-disable no-console */

/**
 * A CLI script which populates the dev database with deterministic random data.
 */
if (require.main === module) {
    // Running from command line
    const populateConfig = mergeConfig(
        defaultConfig,
        mergeConfig(devConfig, {
            authOptions: {
                tokenMethod: 'bearer',
                requireVerification: false,
            },
            importExportOptions: {
                importAssetsDir: path.join(__dirname, '../core/mock-data/assets'),
            },
            customFields: {},
            dbConnectionOptions: {
                synchronize: true,
            },
        }),
    );
    clearAllTables(populateConfig, true)
        .then(() =>
            bootstrap(populateConfig).then(async app => {
                await app.get(JobQueueService).start();
                
                const {
                    LanguageCode,
                    CurrencyCode,
                    ProductService,
                    ProductVariantService,
                    CollectionService,
                    AdministratorService,
                    TaxRateService,
                    TaxCategoryService,
                    ShippingMethodService,
                    ChannelService,
                    PaymentMethodService,
                    ZoneService,
                    CountryService,
                    AssetService,
                    RequestContextService,
                    RequestContext
                } = require('@vendure/core');

                let ctx = await app.get(RequestContextService).create({
                    apiType: 'admin',
                });

                console.log('Creating initial data...');

                // Enable India country
                const countries = await app.get(CountryService).findAll(ctx, { filter: { code: { eq: 'IN' } } });
                if (countries.items.length === 0) {
                    await app.get(CountryService).create(ctx, {
                        code: 'IN',
                        enabled: true,
                        translations: [{ languageCode: LanguageCode.en, name: 'India' }],
                    });
                } else {
                    await app.get(CountryService).update(ctx, {
                        id: countries.items[0].id,
                        enabled: true,
                    });
                }

                // Create Zone
                const zone = await app.get(ZoneService).create(ctx, { name: 'India' });
                const india = await app.get(CountryService).findAll(ctx, { filter: { code: { eq: 'IN' } } });
                await app.get(ZoneService).addMembersToZone(ctx, { zoneId: zone.id, memberIds: [india.items[0].id] });
                
                // Assign Zone to Default Channel and set INR currency
                const channel = await app.get(ChannelService).getDefaultChannel(ctx);
                await app.get(ChannelService).update(ctx, {
                    id: channel.id,
                    defaultTaxZoneId: zone.id,
                    defaultShippingZoneId: zone.id,
                    availableCurrencyCodes: ['INR'],
                    defaultCurrencyCode: 'INR',
                });

                // Refresh Context
                ctx = await app.get(RequestContextService).create({
                    apiType: 'admin',
                });

                // Create Tax Category
                const taxCategory = await app.get(TaxCategoryService).create(ctx, { name: 'Standard Tax Category' });
                
                // Create Tax Rate
                await app.get(TaxRateService).create(ctx, { name: 'Standard Tax', value: 5, enabled: true, zoneId: zone.id, categoryId: taxCategory.id });

                // Create Shipping Method
                await app.get(ShippingMethodService).create(ctx, {
                    code: 'standard-shipping',
                    translations: [{ languageCode: LanguageCode.en, name: 'Standard Delivery', description: '' }],
                    checker: { code: 'default-shipping-eligibility-checker', arguments: [{ name: 'orderMinimum', value: '0' }] },
                    calculator: { code: 'default-shipping-calculator', arguments: [{ name: 'rate', value: '5000' }, { name: 'taxRate', value: '5' }] },
                });

                // Create Collection
                const collection = await app.get(CollectionService).create(ctx, {
                    translations: [{ languageCode: LanguageCode.en, name: 'Signature Creations', slug: 'signature-creations', description: 'Our finest dishes.' }],
                    filters: [{ code: 'variant-name-filter', arguments: [{ name: 'operator', value: 'contains' }, { name: 'term', value: 'Global' }] }],
                });

                // Create Products
                const products = [
                    {
                        name: 'Royal Galouti Kebab',
                        description: 'Melt-in-mouth texture. Finely minced lamb marinated with 160 secret spices, smoked with cloves, and pan-seared in ghee.',
                        slug: 'royal-galouti-kebab',
                        price: 45000, // 450.00
                        assets: ['galouti.jpg']
                    },
                    {
                        name: 'Nawabi Dum Biryani',
                        description: 'Aromatic & Subtle. Long-grain basmati and succulent meat, slow-cooked in a sealed \'handi\' to trap the aroma of saffron and ittar.',
                        slug: 'nawabi-dum-biryani',
                        price: 55000, // 550.00
                        assets: ['biryani.jpg']
                    },
                    {
                        name: 'Saffron Phirni',
                        description: 'Sweet Conclusion. Creamy ground rice pudding enriched with saffron, cardamom, and garnished with silver leaf and nuts.',
                        slug: 'saffron-phirni',
                        price: 25000, // 250.00
                        assets: ['phirni.jpg']
                    }
                ];

                console.log('Tax Category Created:', JSON.stringify(taxCategory));

                for (const p of products) {
                    const assetIds: any[] = [];
                    if (p.assets) {
                        for (const assetFilename of p.assets) {
                            const assetPath = path.join(__dirname, '../core/mock-data/assets', assetFilename);
                            if (fs.existsSync(assetPath)) {
                                try {
                                    const file = {
                                        filename: assetFilename,
                                        mimetype: 'image/jpeg',
                                        encoding: '7bit',
                                        createReadStream: () => fs.createReadStream(assetPath),
                                    };
                                    const asset = await app.get(AssetService).create(ctx, { file });
                                    if (asset && !(asset instanceof Error)) {
                                         assetIds.push(asset.id);
                                         console.log(`Created asset: ${assetFilename}`);
                                    } else {
                                        console.log(`Failed to create asset ${assetFilename}:`, asset);
                                    }
                                } catch (e) {
                                    console.log(`Error creating asset ${assetFilename}:`, e);
                                }
                            } else {
                                console.log(`Asset file not found: ${assetPath}`);
                            }
                        }
                    }

                    const product = await app.get(ProductService).create(ctx, {
                        translations: [{ languageCode: LanguageCode.en, name: p.name, slug: p.slug, description: p.description }],
                        assetIds: assetIds,
                        featuredAssetId: assetIds.length > 0 ? assetIds[0] : undefined,
                    });
                    console.log(`Created Product ${p.name}:`, product.id);
                    
                    try {
                        await app.get(ProductVariantService).create(ctx, [{
                            productId: product.id,
                            sku: p.slug.toUpperCase(),
                            price: p.price,
                            taxCategoryId: taxCategory.id,
                            stockOnHand: 100,
                            translations: [{ languageCode: LanguageCode.en, name: p.name }]
                        }]);
                    } catch (e) {
                        console.error(`Failed to create variant for ${p.name}`, e);
                        throw e;
                    }

                    // Assign to collection
                    await app.get(CollectionService).update(ctx, {
                        id: collection.id,
                        filters: [{ code: 'variant-name-filter', arguments: [{ name: 'operator', value: 'contains' }, { name: 'term', value: 'a' }] }] // Broad filter to catch all for now, or use specific IDs if feasible
                    });
                }

                 // Create Payment Method
                const paymentMethods = await app.get(PaymentMethodService).findAll(ctx);
                if (!paymentMethods.items.find((m: any) => m.code === 'standard-payment')) {
                    await app.get(PaymentMethodService).create(ctx, {
                        code: 'standard-payment',
                        enabled: true,
                        handler: {
                            code: 'dummy-payment-handler',
                            arguments: [{ name: 'automaticSettle', value: 'true' }],
                        },
                        translations: [{ languageCode: LanguageCode.en, name: 'Standard Payment', description: 'A dummy payment method for testing' }],
                    });
                }

                return app;
            })
        )
        .then(async app => {
            console.log('populating customers...');
            await populateCustomers(app, 10, message => Logger.error(message));
            return app.close();
        })
        .then(
            () => process.exit(0),
            err => {
                console.log(err);
                process.exit(1);
            },
        );
}
