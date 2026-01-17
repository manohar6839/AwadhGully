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
exports.FacetService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var request_context_1 = require("../../api/common/request-context");
var common_2 = require("../../common");
var utils_1 = require("../../common/utils");
var facet_value_entity_1 = require("../../entity/facet-value/facet-value.entity");
var facet_translation_entity_1 = require("../../entity/facet/facet-translation.entity");
var facet_entity_1 = require("../../entity/facet/facet.entity");
var facet_event_1 = require("../../event-bus/events/facet-event");
var translate_entity_1 = require("../helpers/utils/translate-entity");
/**
 * @description
 * Contains methods relating to {@link Facet} entities.
 *
 * @docsCategory services
 */
var FacetService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, common_2.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FacetService = _classThis = /** @class */ (function () {
        function FacetService_1(connection, facetValueService, translatableSaver, listQueryBuilder, configService, channelService, customFieldRelationService, eventBus, translator, roleService) {
            this.connection = connection;
            this.facetValueService = facetValueService;
            this.translatableSaver = translatableSaver;
            this.listQueryBuilder = listQueryBuilder;
            this.configService = configService;
            this.channelService = channelService;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
            this.translator = translator;
            this.roleService = roleService;
        }
        FacetService_1.prototype.findAll = function (ctx, options, relations) {
            var _this = this;
            return this.listQueryBuilder
                .build(facet_entity_1.Facet, options, {
                relations: relations !== null && relations !== void 0 ? relations : ['values', 'values.facet', 'channels'],
                ctx: ctx,
                channelId: ctx.channelId,
            })
                .getManyAndCount()
                .then(function (_a) {
                var facets = _a[0], totalItems = _a[1];
                var items = facets.map(function (facet) {
                    return _this.translator.translate(facet, ctx, ['values', ['values', 'facet']]);
                });
                return {
                    items: items,
                    totalItems: totalItems,
                };
            });
        };
        FacetService_1.prototype.findOne = function (ctx, facetId, relations) {
            var _this = this;
            return this.connection
                .findOneInChannel(ctx, facet_entity_1.Facet, facetId, ctx.channelId, {
                relations: relations !== null && relations !== void 0 ? relations : ['values', 'values.facet', 'channels'],
            })
                .then(function (facet) {
                var _a;
                return (_a = (facet && _this.translator.translate(facet, ctx, ['values', ['values', 'facet']]))) !== null && _a !== void 0 ? _a : undefined;
            });
        };
        FacetService_1.prototype.findByCode = function (ctxOrFacetCode, facetCodeOrLang, lang) {
            var relations = ['values', 'values.facet'];
            var _a = ctxOrFacetCode instanceof request_context_1.RequestContext
                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    [this.connection.getRepository(ctxOrFacetCode, facet_entity_1.Facet), facetCodeOrLang, lang]
                : [
                    this.connection.rawConnection.getRepository(facet_entity_1.Facet),
                    ctxOrFacetCode,
                    facetCodeOrLang,
                ], repository = _a[0], facetCode = _a[1], languageCode = _a[2];
            // TODO: Implement usage of channelLanguageCode
            return repository
                .findOne({
                where: {
                    code: facetCode,
                },
                relations: relations,
            })
                .then(function (facet) {
                var _a;
                return (_a = (facet && (0, translate_entity_1.translateDeep)(facet, languageCode, ['values', ['values', 'facet']]))) !== null && _a !== void 0 ? _a : undefined;
            });
        };
        /**
         * @description
         * Returns the Facet which contains the given FacetValue id.
         */
        FacetService_1.prototype.findByFacetValueId = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var facet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection
                                .getRepository(ctx, facet_entity_1.Facet)
                                .createQueryBuilder('facet')
                                .leftJoinAndSelect('facet.translations', 'translations')
                                .leftJoin('facet.values', 'facetValue')
                                .where('facetValue.id = :id', { id: id })
                                .getOne()];
                        case 1:
                            facet = _a.sent();
                            if (facet) {
                                return [2 /*return*/, this.translator.translate(facet, ctx)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        FacetService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var facet, facetWithRelations;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.create({
                                ctx: ctx,
                                input: input,
                                entityType: facet_entity_1.Facet,
                                translationType: facet_translation_entity_1.FacetTranslation,
                                beforeSave: function (f) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = f;
                                                return [4 /*yield*/, this.ensureUniqueCode(ctx, f.code)];
                                            case 1:
                                                _a.code = _b.sent();
                                                return [4 /*yield*/, this.channelService.assignToCurrentChannel(f, ctx)];
                                            case 2:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            })];
                        case 1:
                            facet = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, facet_entity_1.Facet, input, facet)];
                        case 2:
                            facetWithRelations = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_event_1.FacetEvent(ctx, facetWithRelations, 'created', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, facet.id))];
                    }
                });
            });
        };
        FacetService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var facet;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.update({
                                ctx: ctx,
                                input: input,
                                entityType: facet_entity_1.Facet,
                                translationType: facet_translation_entity_1.FacetTranslation,
                                beforeSave: function (f) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!f.code) return [3 /*break*/, 2];
                                                _a = f;
                                                return [4 /*yield*/, this.ensureUniqueCode(ctx, f.code, f.id)];
                                            case 1:
                                                _a.code = _b.sent();
                                                _b.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); },
                            })];
                        case 1:
                            facet = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, facet_entity_1.Facet, input, facet)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_event_1.FacetEvent(ctx, facet, 'updated', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, facet.id))];
                    }
                });
            });
        };
        FacetService_1.prototype.delete = function (ctx_1, id_1) {
            return __awaiter(this, arguments, void 0, function (ctx, id, force) {
                var facet, productCount, variantCount, counts, isInUse, both, i18nVars, message, result, deletedFacet;
                if (force === void 0) { force = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, facet_entity_1.Facet, id, {
                                relations: ['values'],
                                channelId: ctx.channelId,
                            })];
                        case 1:
                            facet = _a.sent();
                            productCount = 0;
                            variantCount = 0;
                            if (!facet.values.length) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.facetValueService.checkFacetValueUsage(ctx, facet.values.map(function (fv) { return fv.id; }))];
                        case 2:
                            counts = _a.sent();
                            productCount = counts.productCount;
                            variantCount = counts.variantCount;
                            _a.label = 3;
                        case 3:
                            isInUse = !!(productCount || variantCount);
                            both = !!(productCount && variantCount) ? 'both' : 'single';
                            i18nVars = { products: productCount, variants: variantCount, both: both, facetCode: facet.code };
                            message = '';
                            deletedFacet = new facet_entity_1.Facet(facet);
                            if (!!isInUse) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.connection.getRepository(ctx, facet_entity_1.Facet).remove(facet)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_event_1.FacetEvent(ctx, deletedFacet, 'deleted', id))];
                        case 5:
                            _a.sent();
                            result = generated_types_1.DeletionResult.DELETED;
                            return [3 /*break*/, 10];
                        case 6:
                            if (!force) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.connection.getRepository(ctx, facet_entity_1.Facet).remove(facet)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new facet_event_1.FacetEvent(ctx, deletedFacet, 'deleted', id))];
                        case 8:
                            _a.sent();
                            message = ctx.translate('message.facet-force-deleted', i18nVars);
                            result = generated_types_1.DeletionResult.DELETED;
                            return [3 /*break*/, 10];
                        case 9:
                            message = ctx.translate('message.facet-used', i18nVars);
                            result = generated_types_1.DeletionResult.NOT_DELETED;
                            _a.label = 10;
                        case 10: return [2 /*return*/, {
                                result: result,
                                message: message,
                            }];
                    }
                });
            });
        };
        /**
         * Checks to ensure the Facet code is unique. If there is a conflict, then the code is suffixed
         * with an incrementing integer.
         */
        FacetService_1.prototype.ensureUniqueCode = function (ctx, code, id) {
            return __awaiter(this, void 0, void 0, function () {
                var candidate, suffix, conflict, alreadySuffixed, match;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            candidate = code;
                            suffix = 1;
                            conflict = false;
                            alreadySuffixed = /-\d+$/;
                            _a.label = 1;
                        case 1: return [4 /*yield*/, this.connection
                                .getRepository(ctx, facet_entity_1.Facet)
                                .findOne({ where: { code: candidate } })];
                        case 2:
                            match = _a.sent();
                            conflict = !!match && ((id != null && !(0, utils_1.idsAreEqual)(match.id, id)) || id == null);
                            if (conflict) {
                                suffix++;
                                if (alreadySuffixed.test(candidate)) {
                                    candidate = candidate.replace(alreadySuffixed, "-".concat(suffix));
                                }
                                else {
                                    candidate = "".concat(candidate, "-").concat(suffix);
                                }
                            }
                            _a.label = 3;
                        case 3:
                            if (conflict) return [3 /*break*/, 1];
                            _a.label = 4;
                        case 4: return [2 /*return*/, candidate];
                    }
                });
            });
        };
        /**
         * @description
         * Assigns Facets to the specified Channel
         */
        FacetService_1.prototype.assignFacetsToChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, facetsToAssign, valuesToAssign;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.UpdateFacet,
                                generated_types_1.Permission.UpdateCatalog,
                            ])];
                        case 1:
                            hasPermission = _a.sent();
                            if (!hasPermission) {
                                throw new common_2.ForbiddenError();
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, facet_entity_1.Facet)
                                    .find({ where: { id: (0, typeorm_1.In)(input.facetIds) }, relations: ['values'] })];
                        case 2:
                            facetsToAssign = _a.sent();
                            valuesToAssign = facetsToAssign.reduce(function (values, facet) { return __spreadArray(__spreadArray([], values, true), facet.values, true); }, []);
                            return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], facetsToAssign.map(function (facet) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, this.channelService.assignToChannels(ctx, facet_entity_1.Facet, facet.id, [input.channelId])];
                                    });
                                }); }), true), valuesToAssign.map(function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, this.channelService.assignToChannels(ctx, facet_value_entity_1.FacetValue, value.id, [input.channelId])];
                                }); }); }), true))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.connection
                                    .findByIdsInChannel(ctx, facet_entity_1.Facet, facetsToAssign.map(function (f) { return f.id; }), ctx.channelId, {})
                                    .then(function (facets) { return facets.map(function (facet) { return (0, translate_entity_1.translateDeep)(facet, ctx.languageCode); }); })];
                    }
                });
            });
        };
        /**
         * @description
         * Remove Facets from the specified Channel
         */
        FacetService_1.prototype.removeFacetsFromChannel = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var hasPermission, defaultChannel, facetsToRemove, results, _i, facetsToRemove_1, facet, productCount, variantCount, counts, isInUse, both, i18nVars, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roleService.userHasAnyPermissionsOnChannel(ctx, input.channelId, [
                                generated_types_1.Permission.DeleteFacet,
                                generated_types_1.Permission.DeleteCatalog,
                            ])];
                        case 1:
                            hasPermission = _a.sent();
                            if (!hasPermission) {
                                throw new common_2.ForbiddenError();
                            }
                            return [4 /*yield*/, this.channelService.getDefaultChannel(ctx)];
                        case 2:
                            defaultChannel = _a.sent();
                            if ((0, utils_1.idsAreEqual)(input.channelId, defaultChannel.id)) {
                                throw new common_2.UserInputError('error.items-cannot-be-removed-from-default-channel');
                            }
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, facet_entity_1.Facet)
                                    .find({ where: { id: (0, typeorm_1.In)(input.facetIds) }, relations: ['values'] })];
                        case 3:
                            facetsToRemove = _a.sent();
                            results = [];
                            _i = 0, facetsToRemove_1 = facetsToRemove;
                            _a.label = 4;
                        case 4:
                            if (!(_i < facetsToRemove_1.length)) return [3 /*break*/, 11];
                            facet = facetsToRemove_1[_i];
                            productCount = 0;
                            variantCount = 0;
                            if (!facet.values.length) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.facetValueService.checkFacetValueUsage(ctx, facet.values.map(function (fv) { return fv.id; }), input.channelId)];
                        case 5:
                            counts = _a.sent();
                            productCount = counts.productCount;
                            variantCount = counts.variantCount;
                            isInUse = !!(productCount || variantCount);
                            both = !!(productCount && variantCount) ? 'both' : 'single';
                            i18nVars = { products: productCount, variants: variantCount, both: both };
                            result = void 0;
                            if (!(!isInUse || input.force)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.channelService.removeFromChannels(ctx, facet_entity_1.Facet, facet.id, [input.channelId])];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, Promise.all(facet.values.map(function (fv) {
                                    return _this.channelService.removeFromChannels(ctx, facet_value_entity_1.FacetValue, fv.id, [input.channelId]);
                                }))];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this.findOne(ctx, facet.id)];
                        case 8:
                            result = _a.sent();
                            if (result) {
                                results.push(result);
                            }
                            return [3 /*break*/, 10];
                        case 9:
                            results.push(new common_2.FacetInUseError({ facetCode: facet.code, productCount: productCount, variantCount: variantCount }));
                            _a.label = 10;
                        case 10:
                            _i++;
                            return [3 /*break*/, 4];
                        case 11: return [2 /*return*/, results];
                    }
                });
            });
        };
        return FacetService_1;
    }());
    __setFunctionName(_classThis, "FacetService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FacetService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FacetService = _classThis;
}();
exports.FacetService = FacetService;
