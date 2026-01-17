"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relations = void 0;
var common_1 = require("@nestjs/common");
var unique_1 = require("@vendure/common/lib/unique");
var graphql_1 = require("graphql");
var typeorm_1 = require("typeorm");
var calculated_decorator_1 = require("../../common/calculated-decorator");
var errors_1 = require("../../common/error/errors");
var ttl_cache_1 = require("../../common/ttl-cache");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var graphqlFields = require('graphql-fields');
var DEFAULT_DEPTH = 3;
var cache = new ttl_cache_1.TtlCache({ cacheSize: 500, ttl: 5 * 60 * 1000 });
/**
 * @description
 * Resolver param decorator which returns an array of relation paths which can be passed through
 * to the TypeORM data layer in order to join only the required relations. This works by inspecting
 * the GraphQL `info` object, examining the field selection, and then comparing this with information
 * about the return type's relations.
 *
 * In addition to analyzing the field selection, this decorator also checks for any `@Calculated()`
 * properties on the entity, and additionally includes relations from the `relations` array of the calculated
 * metadata, if defined.
 *
 * So if, for example, the query only selects the `id` field of an Order, then no other relations need
 * be joined in the resulting SQL query. This can massively speed up execution time for queries which do
 * not include many deep nested relations.
 *
 * @example
 * ```ts
 * \@Query()
 * \@Allow(Permission.ReadOrder)
 * orders(
 *     \@Ctx() ctx: RequestContext,
 *     \@Args() args: QueryOrdersArgs,
 *     \@Relations(Order) relations: RelationPaths<Order>,
 * ): Promise<PaginatedList<Order>> {
 *     return this.orderService.findAll(ctx, args.options || undefined, relations);
 * }
 * ```
 *
 * In the above example, given the following query:
 *
 * @example
 * ```GraphQL
 * {
 *   orders(options: { take: 10 }) {
 *     items {
 *       id
 *       customer {
 *         id
 *         firstName
 *         lastName
 *       }
 *       totalQuantity
 *       totalWithTax
 *     }
 *   }
 * }
 * ```
 * then the value of `relations` will be
 *
 * ```
 * ['customer', 'lines'']
 * ```
 * The `'customer'` comes from the fact that the query is nesting the "customer" object, and the `'lines'` is taken
 * from the `Order` entity's `totalQuantity` property, which uses {@link Calculated} decorator and defines those relations as dependencies
 * for deriving the calculated value.
 *
 * ## Depth
 *
 * By default, when inspecting the GraphQL query, the Relations decorator will look 3 levels deep in any nested fields. So, e.g. if
 * the above `orders` query were changed to:
 *
 * @example
 * ```GraphQL
 * {
 *   orders(options: { take: 10 }) {
 *     items {
 *       id
 *       lines {
 *         productVariant {
 *           product {
 *             featuredAsset {
 *               preview
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 * then the `relations` array would include `'lines'`, `'lines.productVariant'`, & `'lines.productVariant.product'` - 3 levels deep - but it would
 * _not_ include `'lines.productVariant.product.featuredAsset'` since that exceeds the default depth. To specify a custom depth, you would
 * use the decorator like this:
 *
 * @example
 * ```ts
 * \@Relations({ entity: Order, depth: 2 }) relations: RelationPaths<Order>,
 * ```
 *
 * ## Omit
 *
 * The `omit` option is used to explicitly omit certain relations from the calculated relations array. This is useful in certain
 * cases where we know for sure that we need to run the field resolver _anyway_. A good example is the `Collection.productVariants` relation.
 * When a GraphQL query comes in for a Collection and also requests its `productVariants` field, there is no point using a lookahead to eagerly
 * join that relation, because we will throw that data away anyway when the `productVariants` field resolver executes, since it returns a
 * PaginatedList query rather than a simple array.
 *
 * @example
 * ```ts
 * \@Relations({ entity: Collection, omit: ['productVariant'] }) relations: RelationPaths<Collection>,
 * ```
 *
 * @docsCategory request
 * @docsPage Relations Decorator
 * @since 1.6.0
 */
exports.Relations = (0, common_1.createParamDecorator)(function (data, ctx) {
    var _a, _b, _c;
    var info = ctx.getArgByIndex(3);
    if (data == null) {
        throw new errors_1.InternalServerError('The @Relations() decorator requires an entity type argument');
    }
    if (!isGraphQLResolveInfo(info)) {
        return [];
    }
    var cacheKey = info.fieldName + '__' + ctx.getArgByIndex(2).req.body.query;
    var cachedResult = cache.get(cacheKey);
    if (cachedResult) {
        return cachedResult;
    }
    var fields = graphqlFields(info);
    var targetFields = isPaginatedListQuery(info) ? (_a = fields.items) !== null && _a !== void 0 ? _a : {} : fields;
    var entity = typeof data === 'function' ? data : data.entity;
    var maxDepth = typeof data === 'function' ? DEFAULT_DEPTH : (_b = data.depth) !== null && _b !== void 0 ? _b : DEFAULT_DEPTH;
    var omit = typeof data === 'function' ? [] : (_c = data.omit) !== null && _c !== void 0 ? _c : [];
    var relationFields = getRelationPaths(targetFields, entity, maxDepth);
    var result = (0, unique_1.unique)(relationFields);
    var _loop_1 = function (omitPath) {
        result = result.filter(function (resultPath) { return !resultPath.startsWith(omitPath); });
    };
    for (var _i = 0, omit_1 = omit; _i < omit_1.length; _i++) {
        var omitPath = omit_1[_i];
        _loop_1(omitPath);
    }
    cache.set(cacheKey, result);
    return result;
});
function getRelationPaths(fields, entity, maxDepth, depth) {
    var _a, _b;
    if (depth === void 0) { depth = 1; }
    var relations = (0, typeorm_1.getMetadataArgsStorage)().filterRelations(entity);
    var metadata = (0, typeorm_1.getMetadataArgsStorage)();
    var relationPaths = [];
    var _loop_2 = function (property, value) {
        if (property === 'customFields') {
            var customFieldEntity = (_a = metadata
                .filterEmbeddeds(entity)
                .find(function (e) { return e.propertyName === 'customFields'; })) === null || _a === void 0 ? void 0 : _a.type();
            if (customFieldEntity) {
                if (depth < maxDepth) {
                    depth++;
                    var subPaths = getRelationPaths(value, customFieldEntity, maxDepth, depth);
                    depth--;
                    for (var _e = 0, subPaths_1 = subPaths; _e < subPaths_1.length; _e++) {
                        var subPath = subPaths_1[_e];
                        relationPaths.push([property, subPath].join('.'));
                    }
                }
            }
        }
        else {
            var relationMetadata = relations.find(function (r) { return r.propertyName === property; });
            if (relationMetadata) {
                relationPaths.push(property);
                var relatedEntity = typeof relationMetadata.type === 'function'
                    ? // https://github.com/microsoft/TypeScript/issues/37663
                        relationMetadata.type()
                    : relationMetadata.type;
                if (depth < maxDepth) {
                    depth++;
                    var subPaths = getRelationPaths(value, relatedEntity, maxDepth, depth);
                    depth--;
                    for (var _f = 0, subPaths_2 = subPaths; _f < subPaths_2.length; _f++) {
                        var subPath = subPaths_2[_f];
                        relationPaths.push([property, subPath].join('.'));
                    }
                }
            }
            var calculatedProperties = (_b = Object.getPrototypeOf(new entity())[calculated_decorator_1.CALCULATED_PROPERTIES]) !== null && _b !== void 0 ? _b : [];
            var selectedFields_1 = new Set(Object.keys(fields));
            var dependencyRelations = calculatedProperties
                .filter(function (p) { var _a, _b; return selectedFields_1.has(p.name) && ((_b = (_a = p.listQuery) === null || _a === void 0 ? void 0 : _a.relations) === null || _b === void 0 ? void 0 : _b.length); })
                .map(function (p) { var _a, _b; return (_b = (_a = p.listQuery) === null || _a === void 0 ? void 0 : _a.relations) !== null && _b !== void 0 ? _b : []; })
                .flat();
            relationPaths.push.apply(relationPaths, dependencyRelations);
        }
    };
    for (var _i = 0, _c = Object.entries(fields); _i < _c.length; _i++) {
        var _d = _c[_i], property = _d[0], value = _d[1];
        _loop_2(property, value);
    }
    return relationPaths;
}
function isGraphQLResolveInfo(input) {
    return !!(input && typeof input === 'object' && input.schema instanceof graphql_1.GraphQLSchema);
}
function isPaginatedListQuery(info) {
    var returnType = (0, graphql_1.getNamedType)(info.returnType);
    return (0, graphql_1.isObjectType)(returnType) && !!returnType.getInterfaces().find(function (i) { return i.name === 'PaginatedList'; });
}
