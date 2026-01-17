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
exports.FacetValueService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var request_context_1 = require("../../api/common/request-context");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var entity_1 = require("../../entity");
var facet_value_translation_entity_1 = require("../../entity/facet-value/facet-value-translation.entity");
var facet_value_entity_1 = require("../../entity/facet-value/facet-value.entity");
var facet_value_event_1 = require("../../event-bus/events/facet-value-event");
var translate_entity_1 = require("../helpers/utils/translate-entity");
/**
 * @description
 * Contains methods relating to {@link FacetValue} entities.
 *
 * @docsCategory services
 */
var FacetValueService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FacetValueService = _classThis = /** @class */ (function () {
        function FacetValueService_1(connection, translatableSaver, configService, customFieldRelationService, channelService, eventBus, translator, listQueryBuilder) {
            this.connection = connection;
            this.translatableSaver = translatableSaver;
            this.configService = configService;
            this.customFieldRelationService = customFieldRelationService;
            this.channelService = channelService;
            this.eventBus = eventBus;
            this.translator = translator;
            this.listQueryBuilder = listQueryBuilder;
        }
        FacetValueService_1.prototype.findAll = function (ctxOrLang, lang) {
            var _a = ctxOrLang instanceof request_context_1.RequestContext
                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    [this.connection.getRepository(ctxOrLang, facet_value_entity_1.FacetValue), lang]
                : [this.connection.rawConnection.getRepository(facet_value_entity_1.FacetValue), ctxOrLang], repository = _a[0], languageCode = _a[1];
            // TODO: Implement usage of channelLanguageCode
            return repository
                .find({
                relations: ['facet'],
            })
                .then(function (facetValues) {
                return facetValues.map(function (facetValue) { return (0, translate_entity_1.translateDeep)(facetValue, languageCode, ['facet']); });
            });
        };
        /**
         * @description
         * Returns a PaginatedList of FacetValues.
         *
         * TODO: in v2 this should replace the `findAll()` method.
         * A separate method was created just to avoid a breaking change in v1.9.
         */
        FacetValueService_1.prototype.findAllList = function (ctx, options, relations) {
            var _this = this;
            return this.listQueryBuilder
                .build(facet_value_entity_1.FacetValue, options, {
                ctx: ctx,
                relations: relations !== null && relations !== void 0 ? relations : ['facet'],
                channelId: ctx.channelId,
            })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return {
                    items: items.map(function (item) { return _this.translator.translate(item, ctx, ['facet']); }),
                    totalItems: totalItems,
                };
            });
        };
        FacetValueService_1.prototype.findOne = function (ctx, id) {
            var _this = this;
            return this.connection
                .getRepository(ctx, facet_value_entity_1.FacetValue)
                .findOne({
                where: { id: id },
                relations: ['facet'],
            })
                .then(function (facetValue) { var _a; return (_a = (facetValue && _this.translator.translate(facetValue, ctx, ['facet']))) !== null && _a !== void 0 ? _a : undefined; });
        };
        FacetValueService_1.prototype.findByIds = function (ctx, ids) {
            var _this = this;
            var facetValues = this.connection.findByIdsInChannel(ctx, facet_value_entity_1.FacetValue, ids, ctx.channelId, {
                relations: ['facet'],
            });
            return facetValues.then(function (values) {
                return values.map(function (facetValue) { return _this.translator.translate(facetValue, ctx, ['facet']); });
            });
        };
        /**
         * @description
         * Returns all FacetValues belonging to the Facet with the given id.
         */
        FacetValueService_1.prototype.findByFacetId = function (ctx, id) {
            var _this = this;
            return this.connection
                .getRepository(ctx, facet_value_entity_1.FacetValue)
                .find({
                where: {
                    facet: { id: id },
                },
            })
                .then(function (values) { return values.map(function (facetValue) { return _this.translator.translate(facetValue, ctx); }); });
        };
        /**
         * @description
         * Returns all FacetValues belonging to the Facet with the given id.
         */
        FacetValueService_1.prototype.findByFacetIdList = function (ctx, id, options, relations) {
            var _this = this;
            return this.listQueryBuilder
                .build(facet_value_entity_1.FacetValue, options, {
                ctx: ctx,
                relations: relations !== null && relations !== void 0 ? relations : ['facet'],
                channelId: ctx.channelId,
                entityAlias: 'facetValue',
            })
                .andWhere('facetValue.facetId = :id', { id: id })
                .getManyAndCount()
                .then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return {
                    items: items.map(function (item) { return _this.translator.translate(item, ctx, ['facet']); }),
                    totalItems: totalItems,
                };
            });
        };
        FacetValueService_1.prototype.create = function (ctx, facet, input) {
            return __awaiter(this, void 0, void 0, function () {
                var facetValue, facetValueWithRelations;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.create({
                                ctx: ctx,
                                input: input,
                                entityType: facet_value_entity_1.FacetValue,
                                translationType: facet_value_translation_entity_1.FacetValueTranslation,
                                beforeSave: function (fv) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                fv.facet = facet;
                                                return [4 /*yield*/, this.channelService.assignToCurrentChannel(fv, ctx)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            })];
                        case 1:
                            facetValue = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, facet_value_entity_1.FacetValue, input, facetValue)];
                        case 2:
                            facetValueWithRelations = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_value_event_1.FacetValueEvent(ctx, facetValueWithRelations, 'created', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, facetValue.id))];
                    }
                });
            });
        };
        FacetValueService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var facetValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.update({
                                ctx: ctx,
                                input: input,
                                entityType: facet_value_entity_1.FacetValue,
                                translationType: facet_value_translation_entity_1.FacetValueTranslation,
                            })];
                        case 1:
                            facetValue = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, facet_value_entity_1.FacetValue, input, facetValue)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_value_event_1.FacetValueEvent(ctx, facetValue, 'updated', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, facetValue.id))];
                    }
                });
            });
        };
        FacetValueService_1.prototype.delete = function (ctx_1, id_1) {
            return __awaiter(this, arguments, void 0, function (ctx, id, force) {
                var _a, productCount, variantCount, isInUse, both, message, result, facetValue, i18nVars, deletedFacetValue;
                if (force === void 0) { force = false; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.checkFacetValueUsage(ctx, [id])];
                        case 1:
                            _a = _b.sent(), productCount = _a.productCount, variantCount = _a.variantCount;
                            isInUse = !!(productCount || variantCount);
                            both = !!(productCount && variantCount) ? 'both' : 'single';
                            message = '';
                            return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, facet_value_entity_1.FacetValue, id)];
                        case 2:
                            facetValue = _b.sent();
                            i18nVars = {
                                products: productCount,
                                variants: variantCount,
                                both: both,
                                facetValueCode: facetValue.code,
                            };
                            deletedFacetValue = new facet_value_entity_1.FacetValue(facetValue);
                            if (!!isInUse) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.connection.getRepository(ctx, facet_value_entity_1.FacetValue).remove(facetValue)];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_value_event_1.FacetValueEvent(ctx, deletedFacetValue, 'deleted', id))];
                        case 4:
                            _b.sent();
                            result = generated_types_1.DeletionResult.DELETED;
                            return [3 /*break*/, 9];
                        case 5:
                            if (!force) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.connection.getRepository(ctx, facet_value_entity_1.FacetValue).remove(facetValue)];
                        case 6:
                            _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_value_event_1.FacetValueEvent(ctx, deletedFacetValue, 'deleted', id))];
                        case 7:
                            _b.sent();
                            message = ctx.translate('message.facet-value-force-deleted', i18nVars);
                            result = generated_types_1.DeletionResult.DELETED;
                            return [3 /*break*/, 9];
                        case 8:
                            message = ctx.translate('message.facet-value-used', i18nVars);
                            result = generated_types_1.DeletionResult.NOT_DELETED;
                            _b.label = 9;
                        case 9: return [2 /*return*/, {
                                result: result,
                                message: message,
                            }];
                    }
                });
            });
        };
        /**
         * @description
         * Checks for usage of the given FacetValues in any Products or Variants, and returns the counts.
         */
        FacetValueService_1.prototype.checkFacetValueUsage = function (ctx, facetValueIds, channelId) {
            return __awaiter(this, void 0, void 0, function () {
                var consumingProductsQb, consumingVariantsQb;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            consumingProductsQb = this.connection
                                .getRepository(ctx, entity_1.Product)
                                .createQueryBuilder('product')
                                .leftJoinAndSelect('product.facetValues', 'facetValues')
                                .where('facetValues.id IN (:...facetValueIds)', { facetValueIds: facetValueIds })
                                .andWhere('product.deletedAt IS NULL');
                            consumingVariantsQb = this.connection
                                .getRepository(ctx, entity_1.ProductVariant)
                                .createQueryBuilder('variant')
                                .leftJoinAndSelect('variant.facetValues', 'facetValues')
                                .where('facetValues.id IN (:...facetValueIds)', { facetValueIds: facetValueIds })
                                .andWhere('variant.deletedAt IS NULL');
                            if (channelId) {
                                consumingProductsQb
                                    .leftJoin('product.channels', 'product_channel')
                                    .leftJoin('facetValues.channels', 'channel')
                                    .andWhere('product_channel.id = :channelId')
                                    .andWhere('channel.id = :channelId')
                                    .setParameter('channelId', channelId);
                                consumingVariantsQb
                                    .leftJoin('variant.channels', 'variant_channel')
                                    .leftJoin('facetValues.channels', 'channel')
                                    .andWhere('variant_channel.id = :channelId')
                                    .andWhere('channel.id = :channelId')
                                    .setParameter('channelId', channelId);
                            }
                            _a = {};
                            return [4 /*yield*/, consumingProductsQb.getCount()];
                        case 1:
                            _a.productCount = _b.sent();
                            return [4 /*yield*/, consumingVariantsQb.getCount()];
                        case 2: return [2 /*return*/, (_a.variantCount = _b.sent(),
                                _a)];
                    }
                });
            });
        };
        return FacetValueService_1;
    }());
    __setFunctionName(_classThis, "FacetValueService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FacetValueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FacetValueService = _classThis;
}();
exports.FacetValueService = FacetValueService;
