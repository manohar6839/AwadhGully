"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Populator = void 0;
var common_1 = require("@nestjs/common");
var normalize_string_1 = require("@vendure/common/lib/normalize-string");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
var request_context_1 = require("../../../api/common/request-context");
var config_1 = require("../../../config");
var manual_fulfillment_handler_1 = require("../../../config/fulfillment/manual-fulfillment-handler");
var entity_1 = require("../../../entity");
/**
 * @description
 * Responsible for populating the database with {@link InitialData}, i.e. non-product data such as countries, tax rates,
 * shipping methods, payment methods & roles.
 *
 * @docsCategory import-export
 */
var Populator = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var Populator = _classThis = /** @class */ (function () {
        /** @internal */
        function Populator_1(countryService, zoneService, channelService, taxRateService, taxCategoryService, shippingMethodService, paymentMethodService, collectionService, facetValueService, searchService, assetImporter, roleService, configService, connection, requestContextService) {
            this.countryService = countryService;
            this.zoneService = zoneService;
            this.channelService = channelService;
            this.taxRateService = taxRateService;
            this.taxCategoryService = taxCategoryService;
            this.shippingMethodService = shippingMethodService;
            this.paymentMethodService = paymentMethodService;
            this.collectionService = collectionService;
            this.facetValueService = facetValueService;
            this.searchService = searchService;
            this.assetImporter = assetImporter;
            this.roleService = roleService;
            this.configService = configService;
            this.connection = connection;
            this.requestContextService = requestContextService;
        }
        /**
         * @description
         * Should be run *before* populating the products, so that there are TaxRates by which
         * product prices can be set. If the `channel` argument is set, then any {@link ChannelAware}
         * entities will be assigned to that Channel.
         */
        Populator_1.prototype.populateInitialData = function (data, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, zoneMap, e_1, e_2, e_3, e_4, e_5, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createRequestContext(data, channel)];
                        case 1:
                            ctx = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.populateCountries(ctx, data.countries)];
                        case 3:
                            zoneMap = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            config_1.Logger.error('Could not populate countries');
                            config_1.Logger.error(e_1, 'populator', e_1.stack);
                            throw e_1;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.populateTaxRates(ctx, data.taxRates, zoneMap)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            e_2 = _a.sent();
                            config_1.Logger.error('Could not populate tax rates');
                            config_1.Logger.error(e_2, 'populator', e_2.stack);
                            return [3 /*break*/, 8];
                        case 8:
                            _a.trys.push([8, 10, , 11]);
                            return [4 /*yield*/, this.populateShippingMethods(ctx, data.shippingMethods)];
                        case 9:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            e_3 = _a.sent();
                            config_1.Logger.error('Could not populate shipping methods');
                            config_1.Logger.error(e_3, 'populator', e_3.stack);
                            return [3 /*break*/, 11];
                        case 11:
                            _a.trys.push([11, 13, , 14]);
                            return [4 /*yield*/, this.populatePaymentMethods(ctx, data.paymentMethods)];
                        case 12:
                            _a.sent();
                            return [3 /*break*/, 14];
                        case 13:
                            e_4 = _a.sent();
                            config_1.Logger.error('Could not populate payment methods');
                            config_1.Logger.error(e_4, 'populator', e_4.stack);
                            return [3 /*break*/, 14];
                        case 14:
                            _a.trys.push([14, 16, , 17]);
                            return [4 /*yield*/, this.setChannelDefaults(zoneMap, data, ctx.channel)];
                        case 15:
                            _a.sent();
                            return [3 /*break*/, 17];
                        case 16:
                            e_5 = _a.sent();
                            config_1.Logger.error('Could not set channel defaults');
                            config_1.Logger.error(e_5, 'populator', e_5.stack);
                            return [3 /*break*/, 17];
                        case 17:
                            _a.trys.push([17, 19, , 20]);
                            return [4 /*yield*/, this.populateRoles(ctx, data.roles)];
                        case 18:
                            _a.sent();
                            return [3 /*break*/, 20];
                        case 19:
                            e_6 = _a.sent();
                            config_1.Logger.error('Could not populate roles');
                            config_1.Logger.error(e_6, 'populator', e_6.stack);
                            return [3 /*break*/, 20];
                        case 20: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description
         * Should be run *after* the products have been populated, otherwise the expected FacetValues will not
         * yet exist.
         */
        Populator_1.prototype.populateCollections = function (data, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, allFacetValues, collectionMap, _i, _a, collectionDef, parent_1, parentId, assets, filters, collection;
                var _this = this;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.createRequestContext(data, channel)];
                        case 1:
                            ctx = _d.sent();
                            return [4 /*yield*/, this.facetValueService.findAll(ctx, ctx.languageCode)];
                        case 2:
                            allFacetValues = _d.sent();
                            collectionMap = new Map();
                            _i = 0, _a = data.collections;
                            _d.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            collectionDef = _a[_i];
                            parent_1 = collectionDef.parentName && collectionMap.get(collectionDef.parentName);
                            parentId = parent_1 ? parent_1.id.toString() : undefined;
                            return [4 /*yield*/, this.assetImporter.getAssets(collectionDef.assetPaths || [], ctx)];
                        case 4:
                            assets = (_d.sent()).assets;
                            filters = [];
                            try {
                                filters = (collectionDef.filters || []).map(function (filter) {
                                    return _this.processFilterDefinition(filter, allFacetValues);
                                });
                            }
                            catch (e) {
                                config_1.Logger.error(e.message);
                            }
                            return [4 /*yield*/, this.collectionService.create(ctx, {
                                    translations: [
                                        {
                                            languageCode: ctx.languageCode,
                                            name: collectionDef.name,
                                            description: collectionDef.description || '',
                                            slug: (_b = collectionDef.slug) !== null && _b !== void 0 ? _b : collectionDef.name,
                                        },
                                    ],
                                    isPrivate: collectionDef.private || false,
                                    parentId: parentId,
                                    assetIds: assets.map(function (a) { return a.id.toString(); }),
                                    featuredAssetId: assets.length ? assets[0].id.toString() : undefined,
                                    filters: filters,
                                    inheritFilters: (_c = collectionDef.inheritFilters) !== null && _c !== void 0 ? _c : true,
                                })];
                        case 5:
                            collection = _d.sent();
                            collectionMap.set(collectionDef.name, collection);
                            _d.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7: 
                        // Wait for the created collection operations to complete before running
                        // the reindex of the search index.
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                        case 8:
                            // Wait for the created collection operations to complete before running
                            // the reindex of the search index.
                            _d.sent();
                            return [4 /*yield*/, this.searchService.reindex(ctx)];
                        case 9:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Populator_1.prototype.processFilterDefinition = function (filter, allFacetValues) {
            switch (filter.code) {
                case 'facet-value-filter':
                    var facetValueIds = filter.args.facetValueNames
                        .map(function (name) {
                        return allFacetValues.find(function (fv) {
                            var _a;
                            var facetName;
                            var valueName = name;
                            if (name.includes(':')) {
                                _a = name.split(':'), facetName = _a[0], valueName = _a[1];
                                return ((fv.name === valueName || fv.code === valueName) &&
                                    (fv.facet.name === facetName || fv.facet.code === facetName));
                            }
                            else {
                                return fv.name === valueName || fv.code === valueName;
                            }
                        });
                    })
                        .filter(shared_utils_1.notNullOrUndefined)
                        .map(function (fv) { return fv.id; });
                    return {
                        code: filter.code,
                        arguments: [
                            {
                                name: 'facetValueIds',
                                value: JSON.stringify(facetValueIds),
                            },
                            {
                                name: 'containsAny',
                                value: filter.args.containsAny.toString(),
                            },
                        ],
                    };
                default:
                    throw new Error("Filter with code \"".concat(filter.code, "\" is not recognized."));
            }
        };
        Populator_1.prototype.createRequestContext = function (data, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var superadminCredentials, superAdminUser, ctx, _a, _b, _c;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            superadminCredentials = this.configService.authOptions.superadminCredentials;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(entity_1.User).findOne({
                                    where: {
                                        identifier: superadminCredentials.identifier,
                                    },
                                })];
                        case 1:
                            superAdminUser = _e.sent();
                            _b = (_a = this.requestContextService).create;
                            _d = {
                                user: superAdminUser !== null && superAdminUser !== void 0 ? superAdminUser : undefined,
                                apiType: 'admin',
                                languageCode: data.defaultLanguage
                            };
                            if (!(channel !== null && channel !== void 0)) return [3 /*break*/, 2];
                            _c = channel;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.channelService.getDefaultChannel()];
                        case 3:
                            _c = (_e.sent());
                            _e.label = 4;
                        case 4: return [4 /*yield*/, _b.apply(_a, [(_d.channelOrToken = _c,
                                    _d)])];
                        case 5:
                            ctx = _e.sent();
                            return [2 /*return*/, ctx];
                    }
                });
            });
        };
        Populator_1.prototype.setChannelDefaults = function (zoneMap, data, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var defaultZone, defaultZoneId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            defaultZone = zoneMap.get(data.defaultZone);
                            if (!defaultZone) {
                                throw new Error("The defaultZone (".concat(data.defaultZone, ") did not match any existing or created zone names"));
                            }
                            defaultZoneId = defaultZone.entity.id;
                            return [4 /*yield*/, this.channelService.update(request_context_1.RequestContext.empty(), {
                                    id: channel.id,
                                    defaultTaxZoneId: defaultZoneId,
                                    defaultShippingZoneId: defaultZoneId,
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Populator_1.prototype.populateCountries = function (ctx, countries) {
            return __awaiter(this, void 0, void 0, function () {
                var zoneMap, existingZones, _i, existingZones_1, zone, _a, countries_1, _b, name_1, code, zone, countryEntity, zoneItem, zoneEntity, _c, _d, zoneItem;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            zoneMap = new Map();
                            return [4 /*yield*/, this.zoneService.getAllWithMembers(ctx)];
                        case 1:
                            existingZones = _e.sent();
                            for (_i = 0, existingZones_1 = existingZones; _i < existingZones_1.length; _i++) {
                                zone = existingZones_1[_i];
                                zoneMap.set(zone.name, { entity: zone, members: zone.members.map(function (m) { return m.id; }) });
                            }
                            _a = 0, countries_1 = countries;
                            _e.label = 2;
                        case 2:
                            if (!(_a < countries_1.length)) return [3 /*break*/, 7];
                            _b = countries_1[_a], name_1 = _b.name, code = _b.code, zone = _b.zone;
                            return [4 /*yield*/, this.countryService.create(ctx, {
                                    code: code,
                                    enabled: true,
                                    translations: [{ languageCode: ctx.languageCode, name: name_1 }],
                                })];
                        case 3:
                            countryEntity = _e.sent();
                            zoneItem = zoneMap.get(zone);
                            if (!!zoneItem) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.zoneService.create(ctx, { name: zone })];
                        case 4:
                            zoneEntity = _e.sent();
                            zoneItem = { entity: zoneEntity, members: [] };
                            zoneMap.set(zone, zoneItem);
                            _e.label = 5;
                        case 5:
                            if (!zoneItem.members.includes(countryEntity.id)) {
                                zoneItem.members.push(countryEntity.id);
                            }
                            _e.label = 6;
                        case 6:
                            _a++;
                            return [3 /*break*/, 2];
                        case 7:
                            _c = 0, _d = zoneMap.values();
                            _e.label = 8;
                        case 8:
                            if (!(_c < _d.length)) return [3 /*break*/, 11];
                            zoneItem = _d[_c];
                            return [4 /*yield*/, this.zoneService.addMembersToZone(ctx, {
                                    zoneId: zoneItem.entity.id,
                                    memberIds: zoneItem.members,
                                })];
                        case 9:
                            _e.sent();
                            _e.label = 10;
                        case 10:
                            _c++;
                            return [3 /*break*/, 8];
                        case 11: return [2 /*return*/, zoneMap];
                    }
                });
            });
        };
        Populator_1.prototype.populateTaxRates = function (ctx, taxRates, zoneMap) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, taxRates_1, taxRate, category, _a, _b, entity;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, taxRates_1 = taxRates;
                            _c.label = 1;
                        case 1:
                            if (!(_i < taxRates_1.length)) return [3 /*break*/, 7];
                            taxRate = taxRates_1[_i];
                            return [4 /*yield*/, this.taxCategoryService.create(ctx, { name: taxRate.name })];
                        case 2:
                            category = _c.sent();
                            _a = 0, _b = zoneMap.values();
                            _c.label = 3;
                        case 3:
                            if (!(_a < _b.length)) return [3 /*break*/, 6];
                            entity = _b[_a].entity;
                            return [4 /*yield*/, this.taxRateService.create(ctx, {
                                    zoneId: entity.id,
                                    value: taxRate.percentage,
                                    categoryId: category.id,
                                    name: "".concat(taxRate.name, " ").concat(entity.name),
                                    enabled: true,
                                })];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            _a++;
                            return [3 /*break*/, 3];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        Populator_1.prototype.populateShippingMethods = function (ctx, shippingMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, shippingMethods_1, method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, shippingMethods_1 = shippingMethods;
                            _a.label = 1;
                        case 1:
                            if (!(_i < shippingMethods_1.length)) return [3 /*break*/, 4];
                            method = shippingMethods_1[_i];
                            return [4 /*yield*/, this.shippingMethodService.create(ctx, {
                                    fulfillmentHandler: manual_fulfillment_handler_1.manualFulfillmentHandler.code,
                                    checker: {
                                        code: config_1.defaultShippingEligibilityChecker.code,
                                        arguments: [{ name: 'orderMinimum', value: '0' }],
                                    },
                                    calculator: {
                                        code: config_1.defaultShippingCalculator.code,
                                        arguments: [
                                            { name: 'rate', value: method.price.toString() },
                                            { name: 'taxRate', value: method.taxRate ? method.taxRate.toString() : '0' },
                                            { name: 'includesTax', value: 'auto' },
                                        ],
                                    },
                                    code: (0, normalize_string_1.normalizeString)(method.name, '-'),
                                    translations: [{ languageCode: ctx.languageCode, name: method.name, description: '' }],
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Populator_1.prototype.populatePaymentMethods = function (ctx, paymentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, paymentMethods_1, method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, paymentMethods_1 = paymentMethods;
                            _a.label = 1;
                        case 1:
                            if (!(_i < paymentMethods_1.length)) return [3 /*break*/, 4];
                            method = paymentMethods_1[_i];
                            return [4 /*yield*/, this.paymentMethodService.create(ctx, {
                                    code: (0, normalize_string_1.normalizeString)(method.name, '-'),
                                    enabled: true,
                                    handler: method.handler,
                                    translations: [{ languageCode: ctx.languageCode, name: method.name, description: '' }],
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Populator_1.prototype.populateRoles = function (ctx, roles) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, roles_1, roleDef;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!roles) {
                                return [2 /*return*/];
                            }
                            _i = 0, roles_1 = roles;
                            _a.label = 1;
                        case 1:
                            if (!(_i < roles_1.length)) return [3 /*break*/, 4];
                            roleDef = roles_1[_i];
                            return [4 /*yield*/, this.roleService.create(ctx, roleDef)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return Populator_1;
    }());
    __setFunctionName(_classThis, "Populator");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Populator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Populator = _classThis;
}();
exports.Populator = Populator;
