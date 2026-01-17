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
exports.EntityHydrator = void 0;
var common_1 = require("@nestjs/common");
var unique_1 = require("@vendure/common/lib/unique");
var errors_1 = require("../../../common/error/errors");
var product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
var tree_relations_qb_joiner_1 = require("../utils/tree-relations-qb-joiner");
var merge_deep_1 = require("./merge-deep");
/**
 * @description
 * This is a helper class which is used to "hydrate" entity instances, which means to populate them
 * with the specified relations. This is useful when writing plugin code which receives an entity,
 * and you need to ensure that one or more relations are present.
 *
 * @example
 * ```ts
 * import { Injectable } from '\@nestjs/common';
 * import { ID, RequestContext, EntityHydrator, ProductVariantService } from '\@vendure/core';
 *
 * \@Injectable()
 * export class MyService {
 *
 *   constructor(
 *      // highlight-next-line
 *      private entityHydrator: EntityHydrator,
 *      private productVariantService: ProductVariantService,
 *   ) {}
 *
 *   myMethod(ctx: RequestContext, variantId: ID) {
 *     const product = await this.productVariantService
 *       .getProductForVariant(ctx, variantId);
 *
 *     // at this stage, we don't know which of the Product relations
 *     // will be joined at runtime.
 *
 *     // highlight-start
 *     await this.entityHydrator
 *       .hydrate(ctx, product, { relations: ['facetValues.facet' ]});
 *
 *     // You can be sure now that the `facetValues` & `facetValues.facet` relations are populated
 *     // highlight-end
 *   }
 * }
 *```
 *
 * In this above example, the `product` instance will now have the `facetValues` relation
 * available, and those FacetValues will have their `facet` relations joined too.
 *
 * This `hydrate` method will _also_ automatically take care or translating any
 * translatable entities (e.g. Product, Collection, Facet), and if the `applyProductVariantPrices`
 * options is used (see {@link HydrateOptions}), any related ProductVariant will have the correct
 * Channel-specific prices applied to them.
 *
 * Custom field relations may also be hydrated:
 *
 * @example
 * ```ts
 * const customer = await this.customerService
 *   .findOne(ctx, id);
 *
 * await this.entityHydrator
 *   .hydrate(ctx, customer, { relations: ['customFields.avatar' ]});
 * ```
 *
 * @docsCategory data-access
 * @since 1.3.0
 */
var EntityHydrator = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EntityHydrator = _classThis = /** @class */ (function () {
        function EntityHydrator_1(connection, productPriceApplicator, translator) {
            this.connection = connection;
            this.productPriceApplicator = productPriceApplicator;
            this.translator = translator;
        }
        /**
         * @description
         * Hydrates (joins) the specified relations to the target entity instance. This method
         * mutates the `target` entity.
         *
         * @example
         * ```ts
         * await this.entityHydrator.hydrate(ctx, product, {
         *   relations: [
         *     'variants.stockMovements'
         *     'optionGroups.options',
         *     'featuredAsset',
         *   ],
         *   applyProductVariantPrices: true,
         * });
         * ```
         *
         * @since 1.3.0
         */
        EntityHydrator_1.prototype.hydrate = function (ctx, target, options) {
            return __awaiter(this, void 0, void 0, function () {
                var missingRelations, productVariantPriceRelations, hydratedQb, joinedRelations_1, hydrated, propertiesToAdd, _i, propertiesToAdd_1, prop, relationsWithEntities, _a, relationsWithEntities_1, relationWithEntities, entity, translateDeepRelations;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!options.relations) return [3 /*break*/, 9];
                            missingRelations = this.getMissingRelations(target, options);
                            if (options.applyProductVariantPrices === true) {
                                productVariantPriceRelations = this.getRequiredProductVariantRelations(target, missingRelations);
                                missingRelations = (0, unique_1.unique)(__spreadArray(__spreadArray([], missingRelations, true), productVariantPriceRelations, true));
                            }
                            if (!missingRelations.length) return [3 /*break*/, 9];
                            hydratedQb = this.connection
                                .getRepository(ctx, target.constructor)
                                .createQueryBuilder(target.constructor.name);
                            joinedRelations_1 = (0, tree_relations_qb_joiner_1.joinTreeRelationsDynamically)(hydratedQb, target.constructor, missingRelations);
                            hydratedQb.setFindOptions({
                                relationLoadStrategy: 'query',
                                where: { id: target.id },
                                relations: missingRelations.filter(function (relationPath) { return !joinedRelations_1.has(relationPath); }),
                            });
                            return [4 /*yield*/, hydratedQb.getOne()];
                        case 1:
                            hydrated = _b.sent();
                            propertiesToAdd = (0, unique_1.unique)(missingRelations.map(function (relation) { return relation.split('.')[0]; }));
                            for (_i = 0, propertiesToAdd_1 = propertiesToAdd; _i < propertiesToAdd_1.length; _i++) {
                                prop = propertiesToAdd_1[_i];
                                target[prop] = (0, merge_deep_1.mergeDeep)(target[prop], hydrated[prop]);
                            }
                            relationsWithEntities = missingRelations.map(function (relation) { return ({
                                entity: _this.getRelationEntityAtPath(target, relation.split('.')),
                                relation: relation,
                            }); });
                            if (!(options.applyProductVariantPrices === true)) return [3 /*break*/, 8];
                            _a = 0, relationsWithEntities_1 = relationsWithEntities;
                            _b.label = 2;
                        case 2:
                            if (!(_a < relationsWithEntities_1.length)) return [3 /*break*/, 8];
                            relationWithEntities = relationsWithEntities_1[_a];
                            entity = relationWithEntities.entity;
                            if (!entity) return [3 /*break*/, 7];
                            if (!Array.isArray(entity)) return [3 /*break*/, 5];
                            if (!(entity[0] instanceof product_variant_entity_1.ProductVariant)) return [3 /*break*/, 4];
                            return [4 /*yield*/, Promise.all(entity.map(function (e) {
                                    return _this.productPriceApplicator.applyChannelPriceAndTax(e, ctx);
                                }))];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            if (!(entity instanceof product_variant_entity_1.ProductVariant)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.productPriceApplicator.applyChannelPriceAndTax(entity, ctx)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            _a++;
                            return [3 /*break*/, 2];
                        case 8:
                            translateDeepRelations = relationsWithEntities
                                .filter(function (item) { return _this.isTranslatable(item.entity); })
                                .map(function (item) { return item.relation.split('.'); });
                            this.assignSettableProperties(target, this.translator.translate(target, ctx, translateDeepRelations));
                            _b.label = 9;
                        case 9: return [2 /*return*/, target];
                    }
                });
            });
        };
        EntityHydrator_1.prototype.assignSettableProperties = function (target, source) {
            for (var _i = 0, _a = Object.entries(Object.getOwnPropertyDescriptors(target)); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], descriptor = _b[1];
                if (typeof descriptor.get === 'function' && typeof descriptor.set !== 'function') {
                    // If the entity property has a getter only, we will skip it otherwise
                    // we will get an error of the form:
                    // `Cannot set property <name> of #<Entity> which has only a getter`
                    continue;
                }
                target[key] = source[key];
            }
            return target;
        };
        /**
         * Compares the requested relations against the actual existing relations on the target entity,
         * and returns an array of all missing relation paths that would need to be fetched.
         */
        EntityHydrator_1.prototype.getMissingRelations = function (target, options) {
            var missingRelations = [];
            for (var _i = 0, _a = options.relations.slice().sort(); _i < _a.length; _i++) {
                var relation = _a[_i];
                if (typeof relation === 'string') {
                    var parts = relation.split('.');
                    var entity = target;
                    var path = [];
                    for (var _b = 0, parts_1 = parts; _b < parts_1.length; _b++) {
                        var part = parts_1[_b];
                        path.push(part);
                        // null = the relation has been fetched but was null in the database.
                        // undefined = the relation has not been fetched.
                        if (entity && entity[part] === null) {
                            break;
                        }
                        if (entity && entity[part]) {
                            entity = Array.isArray(entity[part]) ? entity[part][0] : entity[part];
                        }
                        else {
                            var allParts = path.reduce(function (result, p, i) {
                                if (i === 0) {
                                    return [p];
                                }
                                else {
                                    return __spreadArray(__spreadArray([], result, true), [[result[result.length - 1], p].join('.')], false);
                                }
                            }, []);
                            missingRelations.push.apply(missingRelations, allParts);
                            entity = undefined;
                        }
                    }
                }
            }
            return (0, unique_1.unique)(missingRelations.filter(function (relation) { return !relation.endsWith('.customFields'); }));
        };
        EntityHydrator_1.prototype.getRequiredProductVariantRelations = function (target, missingRelations) {
            var relationsToAdd = [];
            for (var _i = 0, missingRelations_1 = missingRelations; _i < missingRelations_1.length; _i++) {
                var relation = missingRelations_1[_i];
                var entityType = this.getRelationEntityTypeAtPath(target, relation);
                if (entityType === product_variant_entity_1.ProductVariant) {
                    relationsToAdd.push([relation, 'taxCategory'].join('.'));
                    relationsToAdd.push([relation, 'productVariantPrices'].join('.'));
                }
            }
            return relationsToAdd;
        };
        /**
         * Returns an instance of the related entity at the given path. E.g. a path of `['variants', 'featuredAsset']`
         * will return an Asset instance.
         */
        EntityHydrator_1.prototype.getRelationEntityAtPath = function (entity, path) {
            var isArrayResult = false;
            var result = [];
            function visit(parent, parts) {
                if (parts.length === 0) {
                    return;
                }
                var part = parts.shift();
                var target = parent[part];
                if (Array.isArray(target)) {
                    isArrayResult = true;
                    if (parts.length === 0) {
                        result.push.apply(result, target);
                    }
                    else {
                        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
                            var item = target_1[_i];
                            visit(item, parts.slice());
                        }
                    }
                }
                else if (target === null) {
                    result.push(target);
                }
                else {
                    if (parts.length === 0) {
                        result.push(target);
                    }
                    else {
                        visit(target, parts.slice());
                    }
                }
            }
            visit(entity, path.slice());
            return isArrayResult ? result : result[0];
        };
        EntityHydrator_1.prototype.getRelationEntityTypeAtPath = function (entity, path) {
            var entityMetadatas = this.connection.rawConnection.entityMetadatas;
            var targetMetadata = entityMetadatas.find(function (m) { return m.target === entity.constructor; });
            if (!targetMetadata) {
                throw new errors_1.InternalServerError("Cannot find entity metadata for entity \"".concat(entity.constructor.name, "\""));
            }
            var currentMetadata = targetMetadata;
            for (var _i = 0, _a = path.split('.'); _i < _a.length; _i++) {
                var pathPart = _a[_i];
                var relationMetadata = currentMetadata.findRelationWithPropertyPath(pathPart);
                if (relationMetadata) {
                    currentMetadata = relationMetadata.inverseEntityMetadata;
                }
                else {
                    throw new errors_1.InternalServerError("Cannot find relation metadata for entity \"".concat(currentMetadata.targetName, "\" at path \"").concat(pathPart, "\""));
                }
            }
            return currentMetadata.target;
        };
        EntityHydrator_1.prototype.isTranslatable = function (input) {
            var _a, _b, _c;
            return Array.isArray(input)
                ? (_b = (_a = input[0]) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('translations')) !== null && _b !== void 0 ? _b : false
                : (_c = input === null || input === void 0 ? void 0 : input.hasOwnProperty('translations')) !== null && _c !== void 0 ? _c : false;
        };
        return EntityHydrator_1;
    }());
    __setFunctionName(_classThis, "EntityHydrator");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EntityHydrator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EntityHydrator = _classThis;
}();
exports.EntityHydrator = EntityHydrator;
