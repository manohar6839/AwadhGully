"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ZoneService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var request_context_1 = require("../../api/common/request-context");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var self_refreshing_cache_1 = require("../../common/self-refreshing-cache");
var utils_1 = require("../../common/utils");
var entity_1 = require("../../entity");
var country_entity_1 = require("../../entity/region/country.entity");
var zone_entity_1 = require("../../entity/zone/zone.entity");
var zone_event_1 = require("../../event-bus/events/zone-event");
var zone_members_event_1 = require("../../event-bus/events/zone-members-event");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link Zone} entities.
 *
 * @docsCategory services
 */
var ZoneService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ZoneService = _classThis = /** @class */ (function () {
        function ZoneService_1(connection, configService, eventBus, translator, listQueryBuilder, customFieldRelationService) {
            this.connection = connection;
            this.configService = configService;
            this.eventBus = eventBus;
            this.translator = translator;
            this.listQueryBuilder = listQueryBuilder;
            this.customFieldRelationService = customFieldRelationService;
        }
        /** @internal */
        ZoneService_1.prototype.initZones = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureCacheExists()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates a zones cache, that can be used to reduce number of zones queries to database
         *
         * @internal
         */
        ZoneService_1.prototype.createCache = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, self_refreshing_cache_1.createSelfRefreshingCache)({
                                name: 'ZoneService.zones',
                                ttl: this.configService.entityOptions.zoneCacheTtl,
                                refresh: {
                                    fn: function (ctx) {
                                        return _this.connection.getRepository(ctx, zone_entity_1.Zone).find({
                                            relations: ['members'],
                                        });
                                    },
                                    defaultArgs: [request_context_1.RequestContext.empty()],
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ZoneService_1.prototype.findAll = function (ctx, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.listQueryBuilder
                            .build(zone_entity_1.Zone, options, { relations: ['members'], ctx: ctx })
                            .getManyAndCount()
                            .then(function (_a) {
                            var items = _a[0], totalItems = _a[1];
                            var translated = items.map(function (zone, i) {
                                var cloneZone = __assign({}, zone);
                                cloneZone.members = zone.members.map(function (country) { return _this.translator.translate(country, ctx); });
                                return cloneZone;
                            });
                            return {
                                items: translated,
                                totalItems: totalItems,
                            };
                        })];
                });
            });
        };
        ZoneService_1.prototype.findOne = function (ctx, zoneId) {
            var _this = this;
            return this.connection
                .getRepository(ctx, zone_entity_1.Zone)
                .findOne({
                where: { id: zoneId },
                relations: ['members'],
            })
                .then(function (zone) {
                if (zone) {
                    zone.members = zone.members.map(function (country) { return _this.translator.translate(country, ctx); });
                    return zone;
                }
            });
        };
        ZoneService_1.prototype.getAllWithMembers = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.zones.memoize([], [ctx], function (zones) {
                            return zones.map(function (zone, i) {
                                var cloneZone = __assign({}, zone);
                                cloneZone.members = zone.members.map(function (country) { return _this.translator.translate(country, ctx); });
                                return cloneZone;
                            });
                        })];
                });
            });
        };
        ZoneService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var zone, _a, newZone;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            zone = new zone_entity_1.Zone(input);
                            if (!input.memberIds) return [3 /*break*/, 2];
                            _a = zone;
                            return [4 /*yield*/, this.getCountriesFromIds(ctx, input.memberIds)];
                        case 1:
                            _a.members = _b.sent();
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.connection.getRepository(ctx, zone_entity_1.Zone).save(zone)];
                        case 3:
                            newZone = _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, zone_entity_1.Zone, input, newZone)];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, this.zones.refresh(ctx)];
                        case 5:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new zone_event_1.ZoneEvent(ctx, newZone, 'created', input))];
                        case 6:
                            _b.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, newZone.id))];
                    }
                });
            });
        };
        ZoneService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var zone, updatedZone;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.id)];
                        case 1:
                            zone = _a.sent();
                            updatedZone = (0, patch_entity_1.patchEntity)(zone, input);
                            return [4 /*yield*/, this.connection.getRepository(ctx, zone_entity_1.Zone).save(updatedZone, { reload: false })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, zone_entity_1.Zone, input, updatedZone)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.zones.refresh(ctx)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new zone_event_1.ZoneEvent(ctx, zone, 'updated', input))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, zone.id))];
                    }
                });
            });
        };
        ZoneService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var zone, deletedZone, channelsUsingZone, taxRatesUsingZone;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, id)];
                        case 1:
                            zone = _a.sent();
                            deletedZone = new zone_entity_1.Zone(zone);
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entity_1.Channel)
                                    .createQueryBuilder('channel')
                                    .where('channel.defaultTaxZone = :id', { id: id })
                                    .orWhere('channel.defaultShippingZone = :id', { id: id })
                                    .getMany()];
                        case 2:
                            channelsUsingZone = _a.sent();
                            if (0 < channelsUsingZone.length) {
                                return [2 /*return*/, {
                                        result: generated_types_1.DeletionResult.NOT_DELETED,
                                        message: ctx.translate('message.zone-used-in-channels', {
                                            channelCodes: channelsUsingZone.map(function (t) { return t.code; }).join(', '),
                                        }),
                                    }];
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entity_1.TaxRate)
                                    .createQueryBuilder('taxRate')
                                    .where('taxRate.zone = :id', { id: id })
                                    .getMany()];
                        case 3:
                            taxRatesUsingZone = _a.sent();
                            if (!(0 < taxRatesUsingZone.length)) return [3 /*break*/, 4];
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: ctx.translate('message.zone-used-in-tax-rates', {
                                        taxRateNames: taxRatesUsingZone.map(function (t) { return t.name; }).join(', '),
                                    }),
                                }];
                        case 4: return [4 /*yield*/, this.connection.getRepository(ctx, zone_entity_1.Zone).remove(zone)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.zones.refresh(ctx)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new zone_event_1.ZoneEvent(ctx, deletedZone, 'deleted', id))];
                        case 7:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                    message: '',
                                }];
                    }
                });
            });
        };
        ZoneService_1.prototype.addMembersToZone = function (ctx_1, _a) {
            return __awaiter(this, arguments, void 0, function (ctx, _b) {
                var countries, zone, members;
                var memberIds = _b.memberIds, zoneId = _b.zoneId;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getCountriesFromIds(ctx, memberIds)];
                        case 1:
                            countries = _c.sent();
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, zoneId, {
                                    relations: ['members'],
                                })];
                        case 2:
                            zone = _c.sent();
                            members = (0, unique_1.unique)(zone.members.concat(countries), 'id');
                            zone.members = members;
                            return [4 /*yield*/, this.connection.getRepository(ctx, zone_entity_1.Zone).save(zone, { reload: false })];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, this.zones.refresh(ctx)];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new zone_members_event_1.ZoneMembersEvent(ctx, zone, 'assigned', memberIds))];
                        case 5:
                            _c.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, zone.id))];
                    }
                });
            });
        };
        ZoneService_1.prototype.removeMembersFromZone = function (ctx_1, _a) {
            return __awaiter(this, arguments, void 0, function (ctx, _b) {
                var zone;
                var memberIds = _b.memberIds, zoneId = _b.zoneId;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, zoneId, {
                                relations: ['members'],
                            })];
                        case 1:
                            zone = _c.sent();
                            zone.members = zone.members.filter(function (country) { return !memberIds.includes(country.id); });
                            return [4 /*yield*/, this.connection.getRepository(ctx, zone_entity_1.Zone).save(zone, { reload: false })];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, this.zones.refresh(ctx)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, this.eventBus.publish(new zone_members_event_1.ZoneMembersEvent(ctx, zone, 'removed', memberIds))];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, zone.id))];
                    }
                });
            });
        };
        ZoneService_1.prototype.getCountriesFromIds = function (ctx, ids) {
            return this.connection.getRepository(ctx, country_entity_1.Country).find({ where: { id: (0, typeorm_1.In)(ids) } });
        };
        /**
         * Ensures zones cache exists. If not, this method creates one.
         */
        ZoneService_1.prototype.ensureCacheExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.zones) {
                                return [2 /*return*/];
                            }
                            _a = this;
                            return [4 /*yield*/, this.createCache()];
                        case 1:
                            _a.zones = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ZoneService_1;
    }());
    __setFunctionName(_classThis, "ZoneService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ZoneService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ZoneService = _classThis;
}();
exports.ZoneService = ZoneService;
