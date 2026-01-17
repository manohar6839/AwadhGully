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
exports.ProductOptionGroupService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var typeorm_1 = require("typeorm");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var vendure_logger_1 = require("../../config/logger/vendure-logger");
var product_option_group_translation_entity_1 = require("../../entity/product-option-group/product-option-group-translation.entity");
var product_option_group_entity_1 = require("../../entity/product-option-group/product-option-group.entity");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var product_entity_1 = require("../../entity/product/product.entity");
var product_option_group_event_1 = require("../../event-bus/events/product-option-group-event");
/**
 * @description
 * Contains methods relating to {@link ProductOptionGroup} entities.
 *
 * @docsCategory services
 */
var ProductOptionGroupService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductOptionGroupService = _classThis = /** @class */ (function () {
        function ProductOptionGroupService_1(connection, translatableSaver, customFieldRelationService, productOptionService, eventBus, translator) {
            this.connection = connection;
            this.translatableSaver = translatableSaver;
            this.customFieldRelationService = customFieldRelationService;
            this.productOptionService = productOptionService;
            this.eventBus = eventBus;
            this.translator = translator;
        }
        ProductOptionGroupService_1.prototype.findAll = function (ctx, filterTerm, relations) {
            var _this = this;
            var findOptions = {
                relations: relations !== null && relations !== void 0 ? relations : ['options'],
                where: {
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
            };
            if (filterTerm) {
                findOptions.where = __assign({ code: (0, typeorm_1.Like)("%".concat(filterTerm, "%")) }, findOptions.where);
            }
            return this.connection
                .getRepository(ctx, product_option_group_entity_1.ProductOptionGroup)
                .find(findOptions)
                .then(function (groups) { return groups.map(function (group) { return _this.translator.translate(group, ctx, ['options']); }); });
        };
        ProductOptionGroupService_1.prototype.findOne = function (ctx, id, relations, findOneOptions) {
            var _this = this;
            return this.connection
                .getRepository(ctx, product_option_group_entity_1.ProductOptionGroup)
                .findOne({
                where: {
                    id: id,
                    deletedAt: !(findOneOptions === null || findOneOptions === void 0 ? void 0 : findOneOptions.includeSoftDeleted) ? (0, typeorm_1.IsNull)() : undefined,
                },
                relations: relations !== null && relations !== void 0 ? relations : ['options'],
            })
                .then(function (group) { var _a; return (_a = (group && _this.translator.translate(group, ctx, ['options']))) !== null && _a !== void 0 ? _a : undefined; });
        };
        ProductOptionGroupService_1.prototype.getOptionGroupsByProductId = function (ctx, id) {
            var _this = this;
            return this.connection
                .getRepository(ctx, product_option_group_entity_1.ProductOptionGroup)
                .find({
                relations: ['options'],
                where: {
                    product: { id: id },
                    deletedAt: (0, typeorm_1.IsNull)(),
                },
                order: {
                    id: 'ASC',
                },
            })
                .then(function (groups) { return groups.map(function (group) { return _this.translator.translate(group, ctx, ['options']); }); });
        };
        ProductOptionGroupService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var group, groupWithRelations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.create({
                                ctx: ctx,
                                input: input,
                                entityType: product_option_group_entity_1.ProductOptionGroup,
                                translationType: product_option_group_translation_entity_1.ProductOptionGroupTranslation,
                            })];
                        case 1:
                            group = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_option_group_entity_1.ProductOptionGroup, input, group)];
                        case 2:
                            groupWithRelations = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_option_group_event_1.ProductOptionGroupEvent(ctx, groupWithRelations, 'created', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, group.id))];
                    }
                });
            });
        };
        ProductOptionGroupService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.update({
                                ctx: ctx,
                                input: input,
                                entityType: product_option_group_entity_1.ProductOptionGroup,
                                translationType: product_option_group_translation_entity_1.ProductOptionGroupTranslation,
                            })];
                        case 1:
                            group = _a.sent();
                            return [4 /*yield*/, this.customFieldRelationService.updateRelations(ctx, product_option_group_entity_1.ProductOptionGroup, input, group)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new product_option_group_event_1.ProductOptionGroupEvent(ctx, group, 'updated', input))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, group.id))];
                    }
                });
            });
        };
        /**
         * @description
         * Deletes the ProductOptionGroup and any associated ProductOptions. If the ProductOptionGroup
         * is still referenced by a soft-deleted Product, then a soft-delete will be used to preserve
         * referential integrity. Otherwise a hard-delete will be performed.
         */
        ProductOptionGroupService_1.prototype.deleteGroupAndOptionsFromProduct = function (ctx, id, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var optionGroup, deletedOptionGroup, inUseByActiveProducts, optionsToDelete, _i, optionsToDelete_1, option, _a, result, message, hasOptionsWhichAreInUse, product, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, product_option_group_entity_1.ProductOptionGroup, id, {
                                relationLoadStrategy: 'query',
                                loadEagerRelations: false,
                                relations: ['options', 'product'],
                            })];
                        case 1:
                            optionGroup = _b.sent();
                            deletedOptionGroup = new product_option_group_entity_1.ProductOptionGroup(optionGroup);
                            return [4 /*yield*/, this.isInUseByOtherProducts(ctx, optionGroup, productId)];
                        case 2:
                            inUseByActiveProducts = _b.sent();
                            if (0 < inUseByActiveProducts) {
                                return [2 /*return*/, {
                                        result: generated_types_1.DeletionResult.NOT_DELETED,
                                        message: ctx.translate('message.product-option-group-used', {
                                            code: optionGroup.code,
                                            count: inUseByActiveProducts,
                                        }),
                                    }];
                            }
                            optionsToDelete = optionGroup.options && optionGroup.options.filter(function (group) { return !group.deletedAt; });
                            _i = 0, optionsToDelete_1 = optionsToDelete;
                            _b.label = 3;
                        case 3:
                            if (!(_i < optionsToDelete_1.length)) return [3 /*break*/, 7];
                            option = optionsToDelete_1[_i];
                            return [4 /*yield*/, this.productOptionService.delete(ctx, option.id)];
                        case 4:
                            _a = _b.sent(), result = _a.result, message = _a.message;
                            if (!(result === generated_types_1.DeletionResult.NOT_DELETED)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.connection.rollBackTransaction(ctx)];
                        case 5:
                            _b.sent();
                            return [2 /*return*/, { result: result, message: message }];
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7: return [4 /*yield*/, this.groupOptionsAreInUse(ctx, optionGroup)];
                        case 8:
                            hasOptionsWhichAreInUse = _b.sent();
                            if (!(0 < hasOptionsWhichAreInUse)) return [3 /*break*/, 10];
                            // soft delete
                            optionGroup.deletedAt = new Date();
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_option_group_entity_1.ProductOptionGroup).save(optionGroup, { reload: false })];
                        case 9:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 10: return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).findOne({
                                relationLoadStrategy: 'query',
                                loadEagerRelations: false,
                                where: { id: productId },
                                relations: ['optionGroups'],
                            })];
                        case 11:
                            product = _b.sent();
                            if (!product) return [3 /*break*/, 13];
                            product.optionGroups = product.optionGroups.filter(function (og) { return !(0, utils_1.idsAreEqual)(og.id, id); });
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_entity_1.Product).save(product, { reload: false })];
                        case 12:
                            _b.sent();
                            _b.label = 13;
                        case 13:
                            _b.trys.push([13, 15, , 16]);
                            return [4 /*yield*/, this.connection.getRepository(ctx, product_option_group_entity_1.ProductOptionGroup).remove(optionGroup)];
                        case 14:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 15:
                            e_1 = _b.sent();
                            vendure_logger_1.Logger.error(e_1.message, undefined, e_1.stack);
                            return [3 /*break*/, 16];
                        case 16: return [4 /*yield*/, this.eventBus.publish(new product_option_group_event_1.ProductOptionGroupEvent(ctx, deletedOptionGroup, 'deleted', id))];
                        case 17:
                            _b.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                }];
                    }
                });
            });
        };
        ProductOptionGroupService_1.prototype.isInUseByOtherProducts = function (ctx, productOptionGroup, targetProductId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .getRepository(ctx, product_entity_1.Product)
                            .createQueryBuilder('product')
                            .leftJoin('product.optionGroups', 'optionGroup')
                            .where('product.deletedAt IS NULL')
                            .andWhere('optionGroup.id = :id', { id: productOptionGroup.id })
                            .andWhere('product.id != :productId', { productId: targetProductId })
                            .getCount()];
                });
            });
        };
        ProductOptionGroupService_1.prototype.groupOptionsAreInUse = function (ctx, productOptionGroup) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection
                            .getRepository(ctx, product_variant_entity_1.ProductVariant)
                            .createQueryBuilder('variant')
                            .leftJoin('variant.options', 'option')
                            .where('option.groupId = :groupId', { groupId: productOptionGroup.id })
                            .getCount()];
                });
            });
        };
        return ProductOptionGroupService_1;
    }());
    __setFunctionName(_classThis, "ProductOptionGroupService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductOptionGroupService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductOptionGroupService = _classThis;
}();
exports.ProductOptionGroupService = ProductOptionGroupService;
