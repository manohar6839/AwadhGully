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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var shared_constants_1 = require("@vendure/common/lib/shared-constants");
var unique_1 = require("@vendure/common/lib/unique");
var request_context_1 = require("../../api/common/request-context");
var error_result_1 = require("../../common/error/error-result");
var errors_1 = require("../../common/error/errors");
var generated_graphql_admin_errors_1 = require("../../common/error/generated-graphql-admin-errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var self_refreshing_cache_1 = require("../../common/self-refreshing-cache");
var utils_1 = require("../../common/utils");
var channel_entity_1 = require("../../entity/channel/channel.entity");
var order_entity_1 = require("../../entity/order/order.entity");
var product_variant_price_entity_1 = require("../../entity/product-variant/product-variant-price.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var seller_entity_1 = require("../../entity/seller/seller.entity");
var session_entity_1 = require("../../entity/session/session.entity");
var zone_entity_1 = require("../../entity/zone/zone.entity");
var change_channel_event_1 = require("../../event-bus/events/change-channel-event");
var channel_event_1 = require("../../event-bus/events/channel-event");
var patch_entity_1 = require("../helpers/utils/patch-entity");
/**
 * @description
 * Contains methods relating to {@link Channel} entities.
 *
 * @docsCategory services
 */
var ChannelService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChannelService = _classThis = /** @class */ (function () {
        function ChannelService_1(connection, configService, globalSettingsService, customFieldRelationService, eventBus, listQueryBuilder) {
            this.connection = connection;
            this.configService = configService;
            this.globalSettingsService = globalSettingsService;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
            this.listQueryBuilder = listQueryBuilder;
        }
        /**
         * When the app is bootstrapped, ensure a default Channel exists and populate the
         * channel lookup array.
         *
         * @internal
         */
        ChannelService_1.prototype.initChannels = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureDefaultChannelExists()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.ensureCacheExists()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates a channels cache, that can be used to reduce number of channel queries to database
         *
         * @internal
         */
        ChannelService_1.prototype.createCache = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, self_refreshing_cache_1.createSelfRefreshingCache)({
                            name: 'ChannelService.allChannels',
                            ttl: this.configService.entityOptions.channelCacheTtl,
                            refresh: {
                                fn: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                                    var result;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.listQueryBuilder
                                                    .build(channel_entity_1.Channel, {}, {
                                                    ctx: ctx,
                                                    relations: ['defaultShippingZone', 'defaultTaxZone'],
                                                    ignoreQueryLimits: true,
                                                })
                                                    .getManyAndCount()
                                                    .then(function (_a) {
                                                    var items = _a[0], totalItems = _a[1];
                                                    return ({
                                                        items: items,
                                                        totalItems: totalItems,
                                                    });
                                                })];
                                            case 1:
                                                result = _a.sent();
                                                return [2 /*return*/, result.items];
                                        }
                                    });
                                }); },
                                defaultArgs: [request_context_1.RequestContext.empty()],
                            },
                        })];
                });
            });
        };
        /**
         * @description
         * Assigns a ChannelAware entity to the default Channel as well as any channel
         * specified in the RequestContext. This method will not save the entity to the database, but
         * assigns the `channels` property of the entity.
         */
        ChannelService_1.prototype.assignToCurrentChannel = function (entity, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var defaultChannel, channelIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getDefaultChannel(ctx)];
                        case 1:
                            defaultChannel = _a.sent();
                            channelIds = (0, unique_1.unique)([ctx.channelId, defaultChannel.id]);
                            entity.channels = channelIds.map(function (id) { return ({ id: id }); });
                            return [4 /*yield*/, this.eventBus.publish(new change_channel_event_1.ChangeChannelEvent(ctx, entity, [ctx.channelId], 'assigned'))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, entity];
                    }
                });
            });
        };
        /**
         * This method is used to bypass a bug with Typeorm when working with ManyToMany relationships.
         * For some reason, a regular query does not return all the channels that an entity has.
         * This is a most optimized way to get all the channels that an entity has.
         *
         * @param ctx - The RequestContext object.
         * @param entityType - The type of the entity.
         * @param entityId - The ID of the entity.
         * @returns A promise that resolves to an array of objects, each containing a channel ID.
         * @private
         */
        ChannelService_1.prototype.getAssignedEntityChannels = function (ctx, entityType, entityId) {
            return __awaiter(this, void 0, void 0, function () {
                var repository, metadata, channelsRelation, junctionTableName, junctionColumnName, inverseJunctionColumnName;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            repository = this.connection.getRepository(ctx, entityType);
                            metadata = repository.metadata;
                            channelsRelation = metadata.findRelationWithPropertyPath('channels');
                            if (!channelsRelation) {
                                throw new errors_1.InternalServerError("Could not find the channels relation for entity ".concat(metadata.name));
                            }
                            junctionTableName = (_a = channelsRelation.junctionEntityMetadata) === null || _a === void 0 ? void 0 : _a.tableName;
                            junctionColumnName = (_b = channelsRelation.junctionEntityMetadata) === null || _b === void 0 ? void 0 : _b.columns[0].databaseName;
                            inverseJunctionColumnName = (_c = channelsRelation.junctionEntityMetadata) === null || _c === void 0 ? void 0 : _c.inverseColumns[0].databaseName;
                            if (!junctionTableName || !junctionColumnName || !inverseJunctionColumnName) {
                                throw new errors_1.InternalServerError("Could not find necessary join table information for the channels relation of entity ".concat(metadata.name));
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entityType)
                                    .manager.createQueryBuilder()
                                    .select("channel.".concat(inverseJunctionColumnName), 'channelId')
                                    .from(junctionTableName, 'channel')
                                    .where("channel.".concat(junctionColumnName, " = :entityId"), { entityId: entityId })
                                    .execute()];
                        case 1: return [2 /*return*/, _d.sent()];
                    }
                });
            });
        };
        /**
         * @description
         * Assigns the entity to the given Channels and saves all changes to the database.
         */
        ChannelService_1.prototype.assignToChannels = function (ctx, entityType, entityId, channelIds) {
            return __awaiter(this, void 0, void 0, function () {
                var relations, entity, assignedChannels, newChannelIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relations = [];
                            // This is a work-around for https://github.com/vendurehq/vendure/issues/1391
                            // A better API would be to allow the consumer of this method to supply an entity instance
                            // so that this join could be done prior to invoking this method.
                            // TODO: overload the assignToChannels method to allow it to take an entity instance
                            if (entityType === order_entity_1.Order) {
                                relations.push('lines', 'shippingLines', 'surcharges');
                            }
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, entityType, entityId, {
                                    loadEagerRelations: false,
                                    relationLoadStrategy: 'query',
                                    where: {
                                        id: entityId,
                                    },
                                    relations: relations,
                                })];
                        case 1:
                            entity = _a.sent();
                            return [4 /*yield*/, this.getAssignedEntityChannels(ctx, entityType, entityId)];
                        case 2:
                            assignedChannels = _a.sent();
                            newChannelIds = channelIds.filter(function (id) { return !assignedChannels.some(function (ec) { return (0, utils_1.idsAreEqual)(ec.channelId, id); }); });
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entityType)
                                    .createQueryBuilder()
                                    .relation('channels')
                                    .of(entity.id)
                                    .add(newChannelIds)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new change_channel_event_1.ChangeChannelEvent(ctx, entity, channelIds, 'assigned', entityType))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, entity];
                    }
                });
            });
        };
        /**
         * @description
         * Removes the entity from the given Channels and saves.
         */
        ChannelService_1.prototype.removeFromChannels = function (ctx, entityType, entityId, channelIds) {
            return __awaiter(this, void 0, void 0, function () {
                var entity, assignedChannels, existingChannelIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, entityType).findOne({
                                loadEagerRelations: false,
                                relationLoadStrategy: 'query',
                                where: {
                                    id: entityId,
                                },
                            })];
                        case 1:
                            entity = _a.sent();
                            if (!entity) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.getAssignedEntityChannels(ctx, entityType, entityId)];
                        case 2:
                            assignedChannels = _a.sent();
                            existingChannelIds = channelIds.filter(function (id) {
                                return assignedChannels.some(function (ec) { return (0, utils_1.idsAreEqual)(ec.channelId, id); });
                            });
                            if (!existingChannelIds.length) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entityType)
                                    .createQueryBuilder()
                                    .relation('channels')
                                    .of(entity.id)
                                    .remove(existingChannelIds)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new change_channel_event_1.ChangeChannelEvent(ctx, entity, channelIds, 'removed', entityType))];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, entity];
                    }
                });
            });
        };
        ChannelService_1.prototype.getChannelFromToken = function (ctxOrToken, token) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, ctx, channelToken, allChannels, channel;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = 
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            ctxOrToken instanceof request_context_1.RequestContext ? [ctxOrToken, token] : [undefined, ctxOrToken], ctx = _a[0], channelToken = _a[1];
                            return [4 /*yield*/, this.allChannels.value(ctx)];
                        case 1:
                            allChannels = _b.sent();
                            if (allChannels.length === 1 || channelToken === '') {
                                // there is only the default channel, so return it
                                return [2 /*return*/, this.getDefaultChannel(ctx)];
                            }
                            channel = allChannels.find(function (c) { return c.token === channelToken; });
                            if (!channel) {
                                throw new errors_1.ChannelNotFoundError(channelToken);
                            }
                            return [2 /*return*/, channel];
                    }
                });
            });
        };
        /**
         * @description
         * Returns the default Channel.
         */
        ChannelService_1.prototype.getDefaultChannel = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var allChannels, defaultChannel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.allChannels.value(ctx)];
                        case 1:
                            allChannels = _a.sent();
                            defaultChannel = allChannels.find(function (channel) { return channel.code === shared_constants_1.DEFAULT_CHANNEL_CODE; });
                            if (!defaultChannel) {
                                throw new errors_1.InternalServerError('error.default-channel-not-found');
                            }
                            return [2 /*return*/, defaultChannel];
                    }
                });
            });
        };
        ChannelService_1.prototype.findAll = function (ctx, options, relations) {
            return this.listQueryBuilder
                .build(channel_entity_1.Channel, options, {
                relations: relations !== null && relations !== void 0 ? relations : ['defaultShippingZone', 'defaultTaxZone'],
                ctx: ctx,
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items,
                    totalItems: totalItems,
                });
            });
        };
        ChannelService_1.prototype.findOne = function (ctx, id) {
            return this.connection
                .getRepository(ctx, channel_entity_1.Channel)
                .findOne({ where: { id: id }, relations: ['defaultShippingZone', 'defaultTaxZone'] })
                .then(function (result) { return result !== null && result !== void 0 ? result : undefined; });
        };
        ChannelService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var defaultCurrencyCode, channel, defaultLanguageValidationResult, _a, _b, newChannel, seller;
                var _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            defaultCurrencyCode = input.defaultCurrencyCode || input.currencyCode;
                            if (!defaultCurrencyCode) {
                                throw new errors_1.UserInputError('Either a defaultCurrencyCode or currencyCode must be provided');
                            }
                            channel = new channel_entity_1.Channel(__assign(__assign({}, input), { defaultCurrencyCode: defaultCurrencyCode, availableCurrencyCodes: (_c = input.availableCurrencyCodes) !== null && _c !== void 0 ? _c : (defaultCurrencyCode ? [defaultCurrencyCode] : []), availableLanguageCodes: (_d = input.availableLanguageCodes) !== null && _d !== void 0 ? _d : [input.defaultLanguageCode] }));
                            return [4 /*yield*/, this.validateDefaultLanguageCode(ctx, input)];
                        case 1:
                            defaultLanguageValidationResult = _e.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(defaultLanguageValidationResult)) {
                                return [2 /*return*/, defaultLanguageValidationResult];
                            }
                            if (!input.defaultTaxZoneId) return [3 /*break*/, 3];
                            _a = channel;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.defaultTaxZoneId)];
                        case 2:
                            _a.defaultTaxZone = _e.sent();
                            _e.label = 3;
                        case 3:
                            if (!input.defaultShippingZoneId) return [3 /*break*/, 5];
                            _b = channel;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.defaultShippingZoneId)];
                        case 4:
                            _b.defaultShippingZone = _e.sent();
                            _e.label = 5;
                        case 5: return [4 /*yield*/, this.connection.getRepository(ctx, channel_entity_1.Channel).save(channel)];
                        case 6:
                            newChannel = _e.sent();
                            if (!input.sellerId) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, seller_entity_1.Seller, input.sellerId)];
                        case 7:
                            seller = _e.sent();
                            newChannel.seller = seller;
                            return [4 /*yield*/, this.connection.getRepository(ctx, channel_entity_1.Channel).save(newChannel)];
                        case 8:
                            _e.sent();
                            _e.label = 9;
                        case 9: return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, channel_entity_1.Channel, input, newChannel)];
                        case 10:
                            _e.sent();
                            return [4 /*yield*/, this.allChannels.refresh(ctx)];
                        case 11:
                            _e.sent();
                            return [4 /*yield*/, this.eventBus.publish(new channel_event_1.ChannelEvent(ctx, newChannel, 'created', input))];
                        case 12:
                            _e.sent();
                            return [2 /*return*/, newChannel];
                    }
                });
            });
        };
        ChannelService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var channel, originalDefaultCurrencyCode, defaultLanguageValidationResult, updatedChannel, _a, _b, seller, newCurrencyCode, _c, selectQbQuery, selectQbParams, qb;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.findOne(ctx, input.id)];
                        case 1:
                            channel = _d.sent();
                            if (!channel) {
                                throw new errors_1.EntityNotFoundError('Channel', input.id);
                            }
                            originalDefaultCurrencyCode = channel.defaultCurrencyCode;
                            return [4 /*yield*/, this.validateDefaultLanguageCode(ctx, input)];
                        case 2:
                            defaultLanguageValidationResult = _d.sent();
                            if ((0, error_result_1.isGraphQlErrorResult)(defaultLanguageValidationResult)) {
                                return [2 /*return*/, defaultLanguageValidationResult];
                            }
                            updatedChannel = (0, patch_entity_1.patchEntity)(channel, input);
                            if (!input.defaultTaxZoneId) return [3 /*break*/, 4];
                            _a = updatedChannel;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.defaultTaxZoneId)];
                        case 3:
                            _a.defaultTaxZone = _d.sent();
                            _d.label = 4;
                        case 4:
                            if (!input.defaultShippingZoneId) return [3 /*break*/, 6];
                            _b = updatedChannel;
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, zone_entity_1.Zone, input.defaultShippingZoneId)];
                        case 5:
                            _b.defaultShippingZone = _d.sent();
                            _d.label = 6;
                        case 6:
                            if (!input.sellerId) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, seller_entity_1.Seller, input.sellerId)];
                        case 7:
                            seller = _d.sent();
                            updatedChannel.seller = seller;
                            _d.label = 8;
                        case 8:
                            if (input.currencyCode) {
                                updatedChannel.defaultCurrencyCode = input.currencyCode;
                            }
                            if (!(input.currencyCode || input.defaultCurrencyCode)) return [3 /*break*/, 10];
                            newCurrencyCode = input.defaultCurrencyCode || input.currencyCode;
                            updatedChannel.availableCurrencyCodes = (0, unique_1.unique)(__spreadArray(__spreadArray([], updatedChannel.availableCurrencyCodes, true), [
                                updatedChannel.defaultCurrencyCode,
                            ], false));
                            if (!(originalDefaultCurrencyCode !== newCurrencyCode)) return [3 /*break*/, 10];
                            _c = this.connection
                                .getRepository(ctx, product_variant_entity_1.ProductVariant)
                                .createQueryBuilder('variant')
                                .select('variant.id', 'id')
                                .innerJoin(product_variant_price_entity_1.ProductVariantPrice, 'pvp', 'pvp.variantId = variant.id')
                                .andWhere('pvp.channelId = :channelId')
                                .andWhere('pvp.currencyCode = :newCurrencyCode')
                                .groupBy('variant.id')
                                .getQueryAndParameters(), selectQbQuery = _c[0], selectQbParams = _c[1];
                            qb = this.connection
                                .getRepository(ctx, product_variant_price_entity_1.ProductVariantPrice)
                                .createQueryBuilder('pvp')
                                .update()
                                .where('channelId = :channelId')
                                .andWhere('currencyCode = :oldCurrencyCode')
                                .set({ currencyCode: newCurrencyCode })
                                .setParameters({
                                channelId: channel.id,
                                oldCurrencyCode: originalDefaultCurrencyCode,
                                newCurrencyCode: newCurrencyCode,
                            });
                            if (this.connection.rawConnection.options.type === 'mysql') {
                                // MySQL does not support sub-queries joining the table that is being updated,
                                // it will cause a "You can't specify target table 'product_variant_price' for update in FROM clause" error.
                                // This is a work-around from https://stackoverflow.com/a/9843719/772859
                                qb.andWhere("variantId NOT IN (SELECT id FROM (".concat(selectQbQuery, ") as temp)"), selectQbParams);
                            }
                            else {
                                qb.andWhere("variantId NOT IN (".concat(selectQbQuery, ")"), selectQbParams);
                            }
                            return [4 /*yield*/, qb.execute()];
                        case 9:
                            _d.sent();
                            _d.label = 10;
                        case 10:
                            if (input.availableCurrencyCodes &&
                                !updatedChannel.availableCurrencyCodes.includes(updatedChannel.defaultCurrencyCode)) {
                                throw new errors_1.UserInputError("error.available-currency-codes-must-include-default", {
                                    defaultCurrencyCode: updatedChannel.defaultCurrencyCode,
                                });
                            }
                            return [4 /*yield*/, this.connection.getRepository(ctx, channel_entity_1.Channel).save(updatedChannel, { reload: false })];
                        case 11:
                            _d.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, channel_entity_1.Channel, input, updatedChannel)];
                        case 12:
                            _d.sent();
                            return [4 /*yield*/, this.allChannels.refresh(ctx)];
                        case 13:
                            _d.sent();
                            return [4 /*yield*/, this.eventBus.publish(new channel_event_1.ChannelEvent(ctx, channel, 'updated', input))];
                        case 14:
                            _d.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, channel.id))];
                    }
                });
            });
        };
        ChannelService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var channel, deletedChannel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, channel_entity_1.Channel, id)];
                        case 1:
                            channel = _a.sent();
                            if (channel.code === shared_constants_1.DEFAULT_CHANNEL_CODE)
                                return [2 /*return*/, {
                                        result: generated_types_1.DeletionResult.NOT_DELETED,
                                        message: ctx.translate('error.cannot-delete-default-channel'),
                                    }];
                            deletedChannel = new channel_entity_1.Channel(channel);
                            return [4 /*yield*/, this.connection.getRepository(ctx, session_entity_1.Session).delete({ activeChannelId: id })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, channel_entity_1.Channel).delete(id)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_variant_price_entity_1.ProductVariantPrice).delete({
                                    channelId: id,
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new channel_event_1.ChannelEvent(ctx, deletedChannel, 'deleted', id))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        /**
         * @description
         * Type guard method which returns true if the given entity is an
         * instance of a class which implements the {@link ChannelAware} interface.
         */
        ChannelService_1.prototype.isChannelAware = function (entity) {
            var entityType = Object.getPrototypeOf(entity).constructor;
            return !!this.connection.rawConnection
                .getMetadata(entityType)
                .relations.find(function (r) { return r.type === channel_entity_1.Channel && r.propertyName === 'channels'; });
        };
        /**
         * Ensures channel cache exists. If not, this method creates one.
         */
        ChannelService_1.prototype.ensureCacheExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.allChannels) {
                                return [2 /*return*/];
                            }
                            _a = this;
                            return [4 /*yield*/, this.createCache()];
                        case 1:
                            _a.allChannels = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * There must always be a default Channel. If none yet exists, this method creates one.
         * Also ensures the default Channel token matches the defaultChannelToken config setting.
         */
        ChannelService_1.prototype.ensureDefaultChannelExists = function () {
            return __awaiter(this, void 0, void 0, function () {
                var defaultChannelToken, defaultChannel, seller;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            defaultChannelToken = this.configService.defaultChannelToken;
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(channel_entity_1.Channel).findOne({
                                    where: {
                                        code: shared_constants_1.DEFAULT_CHANNEL_CODE,
                                    },
                                    relations: ['seller'],
                                })];
                        case 1:
                            defaultChannel = _a.sent();
                            if (!!defaultChannel) return [3 /*break*/, 2];
                            defaultChannel = new channel_entity_1.Channel({
                                code: shared_constants_1.DEFAULT_CHANNEL_CODE,
                                defaultLanguageCode: this.configService.defaultLanguageCode,
                                availableLanguageCodes: [this.configService.defaultLanguageCode],
                                pricesIncludeTax: false,
                                defaultCurrencyCode: generated_types_1.CurrencyCode.USD,
                                availableCurrencyCodes: [generated_types_1.CurrencyCode.USD],
                                token: defaultChannelToken,
                            });
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(defaultChannelToken && defaultChannel.token !== defaultChannelToken)) return [3 /*break*/, 4];
                            defaultChannel.token = defaultChannelToken;
                            return [4 /*yield*/, this.connection.rawConnection
                                    .getRepository(channel_entity_1.Channel)
                                    .save(defaultChannel, { reload: false })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!!defaultChannel.seller) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.connection.rawConnection.getRepository(seller_entity_1.Seller).find()];
                        case 5:
                            seller = _a.sent();
                            if (seller.length === 0) {
                                throw new errors_1.InternalServerError('No Sellers were found. Could not initialize default Channel.');
                            }
                            defaultChannel.seller = seller[0];
                            return [4 /*yield*/, this.connection.rawConnection
                                    .getRepository(channel_entity_1.Channel)
                                    .save(defaultChannel, { reload: false })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        ChannelService_1.prototype.validateDefaultLanguageCode = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var availableLanguageCodes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!input.defaultLanguageCode) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.globalSettingsService
                                    .getSettings(ctx)
                                    .then(function (s) { return s.availableLanguages; })];
                        case 1:
                            availableLanguageCodes = _a.sent();
                            if (!availableLanguageCodes.includes(input.defaultLanguageCode)) {
                                return [2 /*return*/, new generated_graphql_admin_errors_1.LanguageNotAvailableError({ languageCode: input.defaultLanguageCode })];
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return ChannelService_1;
    }());
    __setFunctionName(_classThis, "ChannelService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChannelService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChannelService = _classThis;
}();
exports.ChannelService = ChannelService;
