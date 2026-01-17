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
exports.ProductOptionService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var product_option_group_entity_1 = require("../../entity/product-option-group/product-option-group.entity");
var product_option_translation_entity_1 = require("../../entity/product-option/product-option-translation.entity");
var product_option_entity_1 = require("../../entity/product-option/product-option.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var product_option_event_1 = require("../../event-bus/events/product-option-event");
/**
 * @description
 * Contains methods relating to {@link ProductOption} entities.
 *
 * @docsCategory services
 */
var ProductOptionService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductOptionService = _classThis = /** @class */ (function () {
        function ProductOptionService_1(connection, translatableSaver, customFieldRelationService, eventBus, translator, listQueryBuilder) {
            this.connection = connection;
            this.translatableSaver = translatableSaver;
            this.customFieldRelationService = customFieldRelationService;
            this.eventBus = eventBus;
            this.translator = translator;
            this.listQueryBuilder = listQueryBuilder;
        }
        ProductOptionService_1.prototype.findAll = function (ctx, options, groupId, relations) {
            var _this = this;
            var qb = this.listQueryBuilder.build(product_option_entity_1.ProductOption, options, {
                entityAlias: 'option',
                ctx: ctx,
                where: {
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
                relations: relations,
            });
            if (groupId) {
                qb.andWhere('option.groupId = :groupId', { groupId: groupId });
            }
            return qb.getManyAndCount().then(function (_a) {
                var items = _a[0], totalItems = _a[1];
                return ({
                    items: items.map(function (option) { return _this.translator.translate(option, ctx); }),
                    totalItems: totalItems,
                });
            });
        };
        ProductOptionService_1.prototype.findOne = function (ctx, id, relations) {
            var _this = this;
            return this.connection
                .getRepository(ctx, product_option_entity_1.ProductOption)
                .findOne({
                where: { id: id, deletedAt: (0, typeorm_1.IsNull)() },
                relations: relations !== null && relations !== void 0 ? relations : ['group'],
            })
                .then(function (option) { var _a; return (_a = (option && _this.translator.translate(option, ctx))) !== null && _a !== void 0 ? _a : undefined; });
        };
        ProductOptionService_1.prototype.create = function (ctx, group, input) {
            return __awaiter(this, void 0, void 0, function () {
                var productOptionGroup, _a, option, optionWithRelations;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(group instanceof product_option_group_entity_1.ProductOptionGroup)) return [3 /*break*/, 1];
                            _a = group;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_option_group_entity_1.ProductOptionGroup, group)];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            productOptionGroup = _a;
                            return [4 /*yield*/, this.translatableSaver.create({
                                    ctx: ctx,
                                    input: input,
                                    entityType: product_option_entity_1.ProductOption,
                                    translationType: product_option_translation_entity_1.ProductOptionTranslation,
                                    beforeSave: function (po) { return (po.group = productOptionGroup); },
                                })];
                        case 4:
                            option = _b.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_option_entity_1.ProductOption, input, option)];
                        case 5:
                            optionWithRelations = _b.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_option_event_1.ProductOptionEvent(ctx, optionWithRelations, 'created', input))];
                        case 6:
                            _b.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, option.id))];
                    }
                });
            });
        };
        ProductOptionService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var option;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.update({
                                ctx: ctx,
                                input: input,
                                entityType: product_option_entity_1.ProductOption,
                                translationType: product_option_translation_entity_1.ProductOptionTranslation,
                            })];
                        case 1:
                            option = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_option_entity_1.ProductOption, input, option)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_option_event_1.ProductOptionEvent(ctx, option, 'updated', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, option.id))];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes a ProductOption.
         *
         * - If the ProductOption is used by any ProductVariants, the deletion will fail.
         * - If the ProductOption is used only by soft-deleted ProductVariants, the option will itself
         *   be soft-deleted.
         * - If the ProductOption is not used by any ProductVariant at all, it will be hard-deleted.
         */
        ProductOptionService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var productOption, deletedProductOption, inUseByActiveVariants, isInUseBySoftDeletedVariants, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_option_entity_1.ProductOption, id)];
                        case 1:
                            productOption = _a.sent();
                            deletedProductOption = new product_option_entity_1.ProductOption(productOption);
                            return [4 /*yield*/, this.isInUse(ctx, productOption, 'active')];
                        case 2:
                            inUseByActiveVariants = _a.sent();
                            if (0 < inUseByActiveVariants) {
                                return [2 /*return*/, {
                                        result: generated_types_1.DeletionResult.NOT_DELETED,
                                        message: ctx.translate('message.product-option-used', {
                                            code: productOption.code,
                                            count: inUseByActiveVariants,
                                        }),
                                    }];
                            }
                            return [4 /*yield*/, this.isInUse(ctx, productOption, 'soft-deleted')];
                        case 3:
                            isInUseBySoftDeletedVariants = _a.sent();
                            if (!(0 < isInUseBySoftDeletedVariants)) return [3 /*break*/, 5];
                            // soft delete
                            productOption.deletedAt = new Date();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_option_entity_1.ProductOption).save(productOption, { reload: false })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_option_entity_1.ProductOption).remove(productOption)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            e_1 = _a.sent();
                            vendure_logger_1.Logger.error(e_1.message, undefined, e_1.stack);
                            return [3 /*break*/, 8];
                        case 8: return [4 /*yield*/, this.eventBus.publish(new product_option_event_1.ProductOptionEvent(ctx, deletedProductOption, 'deleted', id))];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        ProductOptionService_1.prototype.isInUse = function (ctx, productOption, variantState) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .getRepository(ctx, product_variant_entity_1.ProductVariant)
                            .createQueryBuilder('variant')
                            .leftJoin('variant.options', 'option')
                            .where(variantState === 'active' ? 'variant.deletedAt IS NULL' : 'variant.deletedAt IS NOT NULL')
                            .andWhere('option.id = :id', { id: productOption.id })
                            .getCount()];
                });
            });
        };
        return ProductOptionService_1;
    }());
    __setFunctionName(_classThis, "ProductOptionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductOptionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductOptionService = _classThis;
}();
exports.ProductOptionService = ProductOptionService;
