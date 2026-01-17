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
exports.ListQueryBuilder = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var unique_1 = require("@vendure/common/lib/unique");
var typeorm_1 = require("typeorm");
var common_2 = require("../../../common");
var instrument_decorator_1 = require("../../../common/instrument-decorator");
var config_1 = require("../../../config");
var tree_relations_qb_joiner_1 = require("../utils/tree-relations-qb-joiner");
var connection_utils_1 = require("./connection-utils");
var get_calculated_columns_1 = require("./get-calculated-columns");
var parse_filter_params_1 = require("./parse-filter-params");
var parse_sort_params_1 = require("./parse-sort-params");
/**
 * Counter for generating unique aliases in EXISTS subqueries.
 * Using a module-level counter ensures uniqueness across all queries in a session.
 */
var existsSubqueryCounter = 0;
/**
 * @description
 * This helper class is used when fetching entities the database from queries which return a {@link PaginatedList} type.
 * These queries all follow the same format:
 *
 * In the GraphQL definition, they return a type which implements the `Node` interface, and the query returns a
 * type which implements the `PaginatedList` interface:
 *
 * ```GraphQL
 * type BlogPost implements Node {
 *   id: ID!
 *   published: DateTime!
 *   title: String!
 *   body: String!
 * }
 *
 * type BlogPostList implements PaginatedList {
 *   items: [BlogPost!]!
 *   totalItems: Int!
 * }
 *
 * # Generated at run-time by Vendure
 * input BlogPostListOptions
 *
 * extend type Query {
 *    blogPosts(options: BlogPostListOptions): BlogPostList!
 * }
 * ```
 * When Vendure bootstraps, it will find the `BlogPostListOptions` input and, because it is used in a query
 * returning a `PaginatedList` type, it knows that it should dynamically generate this input. This means
 * all primitive field of the `BlogPost` type (namely, "published", "title" and "body") will have `filter` and
 * `sort` inputs created for them, as well a `skip` and `take` fields for pagination.
 *
 * Your resolver function will then look like this:
 *
 * ```ts
 * \@Resolver()
 * export class BlogPostResolver
 *   constructor(private blogPostService: BlogPostService) {}
 *
 *   \@Query()
 *   async blogPosts(
 *     \@Ctx() ctx: RequestContext,
 *     \@Args() args: any,
 *   ): Promise<PaginatedList<BlogPost>> {
 *     return this.blogPostService.findAll(ctx, args.options || undefined);
 *   }
 * }
 * ```
 *
 * and the corresponding service will use the ListQueryBuilder:
 *
 * ```ts
 * \@Injectable()
 * export class BlogPostService {
 *   constructor(private listQueryBuilder: ListQueryBuilder) {}
 *
 *   findAll(ctx: RequestContext, options?: ListQueryOptions<BlogPost>) {
 *     return this.listQueryBuilder
 *       .build(BlogPost, options)
 *       .getManyAndCount()
 *       .then(async ([items, totalItems]) => {
 *         return { items, totalItems };
 *       });
 *   }
 * }
 * ```
 *
 * @docsCategory data-access
 * @docsPage ListQueryBuilder
 * @docsWeight 0
 */
var ListQueryBuilder = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ListQueryBuilder = _classThis = /** @class */ (function () {
        function ListQueryBuilder_1(connection, configService) {
            this.connection = connection;
            this.configService = configService;
        }
        /** @internal */
        ListQueryBuilder_1.prototype.onApplicationBootstrap = function () {
            this.registerSQLiteRegexpFunction();
        };
        /**
         * @description
         * Used to determine whether a list query `filter` object contains the
         * given property, either at the top level or nested inside a boolean
         * `_and` or `_or` expression.
         *
         * This is useful when a custom property map is used to map a filter
         * field to a related entity, and we need to determine whether the
         * filter object contains that property, which then means we would need
         * to join that relation.
         */
        ListQueryBuilder_1.prototype.filterObjectHasProperty = function (filterObject, property) {
            if (!filterObject) {
                return false;
            }
            for (var key in filterObject) {
                if (!filterObject[key]) {
                    continue;
                }
                if (key === property) {
                    return true;
                }
                if (key === '_and' || key === '_or') {
                    var value = filterObject[key];
                    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                        var condition = value_1[_i];
                        if (this.filterObjectHasProperty(condition, property)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /*
         * @description
         * Creates and configures a SelectQueryBuilder for queries that return paginated lists of entities.
         */
        ListQueryBuilder_1.prototype.build = function (entity, options, extendedOptions) {
            var _this = this;
            var _a, _b, _c, _d;
            if (options === void 0) { options = {}; }
            if (extendedOptions === void 0) { extendedOptions = {}; }
            var apiType = (_b = (_a = extendedOptions.ctx) === null || _a === void 0 ? void 0 : _a.apiType) !== null && _b !== void 0 ? _b : 'shop';
            var _e = this.parseTakeSkipParams(apiType, options, extendedOptions.ignoreQueryLimits), take = _e.take, skip = _e.skip;
            var repo = extendedOptions.ctx
                ? this.connection.getRepository(extendedOptions.ctx, entity)
                : this.connection.rawConnection.getRepository(entity);
            var alias = extendedOptions.entityAlias || entity.name.toLowerCase();
            var minimumRequiredRelations = this.getMinimumRequiredRelations(repo, options, extendedOptions);
            var qb = repo.createQueryBuilder(alias);
            var relations = (0, unique_1.unique)(__spreadArray(__spreadArray([], minimumRequiredRelations, true), ((_c = extendedOptions === null || extendedOptions === void 0 ? void 0 : extendedOptions.relations) !== null && _c !== void 0 ? _c : []), true));
            // Special case for the 'collection' entity, which has a complex nested structure
            // and requires special handling to ensure that only the necessary relations are joined.
            // This is bypassed an issue in TypeORM where it would join the same relation multiple times.
            // See https://github.com/typeorm/typeorm/issues/9936 for more context.
            var processedRelations = (0, tree_relations_qb_joiner_1.joinTreeRelationsDynamically)(qb, entity, relations);
            // Remove any relations which are related to the 'collection' tree, as these are handled separately
            // to avoid duplicate joins.
            relations = relations.filter(function (relationPath) { return !processedRelations.has(relationPath); });
            qb.setFindOptions({
                relations: relations,
                take: take,
                skip: skip,
                where: extendedOptions.where || {},
                relationLoadStrategy: 'query',
            });
            // join the tables required by calculated columns
            this.joinCalculatedColumnRelations(qb, entity, options);
            var customPropertyMap = extendedOptions.customPropertyMap;
            // Store the original customPropertyMap before normalization for EXISTS subquery generation.
            // This is needed because normalizeCustomPropertyMap mutates customPropertyMap, but
            // parseFilterParams needs the original paths to detect *-to-Many relations.
            var originalCustomPropertyMap = customPropertyMap ? __assign({}, customPropertyMap) : undefined;
            if (customPropertyMap) {
                this.normalizeCustomPropertyMap(customPropertyMap, options, qb);
            }
            var customFieldsForType = this.configService.customFields[entity.name];
            var sortParams = Object.assign({}, options.sort, extendedOptions.orderBy);
            this.applyTranslationConditions(qb, entity, sortParams, extendedOptions.ctx);
            var sort = (0, parse_sort_params_1.parseSortParams)(qb.connection, entity, sortParams, customPropertyMap, qb.alias, customFieldsForType);
            var filter = (0, parse_filter_params_1.parseFilterParams)({
                connection: qb.connection,
                entity: entity,
                filterParams: options.filter,
                customPropertyMap: customPropertyMap,
                originalCustomPropertyMap: originalCustomPropertyMap,
                entityAlias: qb.alias,
            });
            if (filter.length) {
                var filterOperator_1 = (_d = options.filterOperator) !== null && _d !== void 0 ? _d : generated_types_1.LogicalOperator.AND;
                qb.andWhere(new typeorm_1.Brackets(function (qb1) {
                    for (var _i = 0, filter_1 = filter; _i < filter_1.length; _i++) {
                        var condition = filter_1[_i];
                        if ('conditions' in condition) {
                            _this.addNestedWhereClause(qb1, condition, filterOperator_1, qb, entity);
                        }
                        else {
                            _this.applyWhereCondition(qb1, condition, filterOperator_1, qb, entity);
                        }
                    }
                }));
            }
            if (extendedOptions.channelId) {
                qb.innerJoin("".concat(qb.alias, ".channels"), 'lqb__channel', 'lqb__channel.id = :channelId', {
                    channelId: extendedOptions.channelId,
                });
            }
            qb.orderBy(sort);
            return qb;
        };
        ListQueryBuilder_1.prototype.addNestedWhereClause = function (qb, whereGroup, parentOperator, mainQb, entity) {
            var _this = this;
            if (whereGroup.conditions.length) {
                var subQb = new typeorm_1.Brackets(function (qb1) {
                    whereGroup.conditions.forEach(function (condition) {
                        if ('conditions' in condition) {
                            _this.addNestedWhereClause(qb1, condition, whereGroup.operator, mainQb, entity);
                        }
                        else {
                            _this.applyWhereCondition(qb1, condition, whereGroup.operator, mainQb, entity);
                        }
                    });
                });
                if (parentOperator === generated_types_1.LogicalOperator.AND) {
                    qb.andWhere(subQb);
                }
                else {
                    qb.orWhere(subQb);
                }
            }
        };
        /**
         * Applies a WHERE condition to the query builder. For conditions that need EXISTS subquery
         * treatment (duplicate custom property fields in _and blocks), generates an EXISTS subquery
         * instead of a simple WHERE clause.
         */
        ListQueryBuilder_1.prototype.applyWhereCondition = function (qb, condition, operator, mainQb, entity) {
            if (condition.isExistsCondition) {
                // Generate EXISTS subquery for duplicate custom property conditions
                var existsClause = this.buildExistsSubquery(condition, mainQb, entity);
                if (existsClause) {
                    if (operator === generated_types_1.LogicalOperator.AND) {
                        qb.andWhere(existsClause.clause, existsClause.parameters);
                    }
                    else {
                        qb.orWhere(existsClause.clause, existsClause.parameters);
                    }
                    return;
                }
            }
            // Standard WHERE clause handling
            if (operator === generated_types_1.LogicalOperator.AND) {
                qb.andWhere(condition.clause, condition.parameters);
            }
            else {
                qb.orWhere(condition.clause, condition.parameters);
            }
        };
        /**
         * Builds an EXISTS subquery for a custom property condition on a *-to-Many relation.
         * This is necessary because a simple WHERE clause on a joined table cannot express
         * "entity has related item with value A AND entity has related item with value B"
         * when those are in separate rows of the related table.
         *
         * Supports both:
         * - ManyToMany relations (uses junction table)
         * - OneToMany relations (direct foreign key on the related table)
         *
         * @see https://github.com/vendurehq/vendure/issues/3267
         */
        ListQueryBuilder_1.prototype.buildExistsSubquery = function (condition, mainQb, entity) {
            var _a, _b, _c;
            if (!condition.isExistsCondition) {
                return null;
            }
            var customPropertyPath = condition.isExistsCondition.customPropertyPath;
            var pathParts = customPropertyPath.split('.');
            if (pathParts.length < 2) {
                return null;
            }
            var relationName = pathParts[0]; // e.g., 'facetValues' or 'orderLines'
            var columnName = pathParts[1]; // e.g., 'id'
            var metadata = (_a = mainQb.expressionMap.mainAlias) === null || _a === void 0 ? void 0 : _a.metadata;
            if (!metadata) {
                return null;
            }
            var relation = metadata.findRelationWithPropertyPath(relationName);
            if (!relation) {
                return null;
            }
            // Get the related entity's table and column info
            var inverseEntityMeta = relation.inverseEntityMetadata;
            var inverseTableName = inverseEntityMeta.tableName;
            // Generate unique alias using counter
            existsSubqueryCounter++;
            var aliasBase = "lqb_exists_".concat(existsSubqueryCounter);
            // Determine the comparison operator from the original clause
            var comparisonOperator = this.extractComparisonOperator(condition.clause);
            // Copy all parameters with 'exists_' prefix to ensure uniqueness.
            // This handles operators with multiple params like BETWEEN (arg1_a, arg1_b).
            var parameters = {};
            var paramKeys = Object.keys(condition.parameters);
            for (var _i = 0, paramKeys_1 = paramKeys; _i < paramKeys_1.length; _i++) {
                var key = paramKeys_1[_i];
                parameters["exists_".concat(key)] = condition.parameters[key];
            }
            // Use the first param key as the base for the WHERE clause construction.
            // For BETWEEN this will be 'exists_arg1' (we strip the _a/_b suffix).
            var baseParamKey = (_c = (_b = paramKeys[0]) === null || _b === void 0 ? void 0 : _b.replace(/_[ab]$/, '')) !== null && _c !== void 0 ? _c : 'arg';
            var newParamKey = "exists_".concat(baseParamKey);
            // Helper to escape identifiers for the current database driver (handles PostgreSQL quoting)
            var escapeId = function (name) { return mainQb.connection.driver.escape(name); };
            var existsQuery;
            if (relation.isManyToMany) {
                // ManyToMany: Uses a junction table
                var junctionMeta = relation.junctionEntityMetadata;
                if (!junctionMeta) {
                    return null;
                }
                var junctionTableName = junctionMeta.tableName;
                var ownerColumn = junctionMeta.ownerColumns[0];
                var inverseColumn = junctionMeta.inverseColumns[0];
                if (!ownerColumn || !inverseColumn) {
                    return null;
                }
                var junctionAlias = aliasBase;
                var relatedAlias = "".concat(aliasBase, "_related");
                var whereCondition = this.buildWhereConditionClause(relatedAlias, columnName, comparisonOperator, newParamKey, escapeId);
                // EXISTS (SELECT 1 FROM junction_table jt
                //         INNER JOIN related_table rt ON jt.inverseColumn = rt.id
                //         WHERE jt.ownerColumn = main_entity.id AND rt.columnName = :paramValue)
                existsQuery = "EXISTS (\n                SELECT 1 FROM ".concat(escapeId(junctionTableName), " ").concat(escapeId(junctionAlias), "\n                INNER JOIN ").concat(escapeId(inverseTableName), " ").concat(escapeId(relatedAlias), "\n                    ON ").concat(escapeId(junctionAlias), ".").concat(escapeId(inverseColumn.databaseName), " = ").concat(escapeId(relatedAlias), ".").concat(escapeId('id'), "\n                    WHERE ").concat(escapeId(junctionAlias), ".").concat(escapeId(ownerColumn.databaseName), " = ").concat(escapeId(mainQb.alias), ".").concat(escapeId('id'), " AND ").concat(whereCondition, "\n            )");
            }
            else if (relation.isOneToMany) {
                // OneToMany: The related table has a foreign key back to the main entity
                var relatedAlias = aliasBase;
                // Find the foreign key column on the related entity that points back to the main entity
                var inverseRelation = relation.inverseRelation;
                if (!inverseRelation) {
                    return null;
                }
                // Get the join columns from the inverse relation (ManyToOne side)
                var joinColumns = inverseRelation.joinColumns;
                if (!joinColumns || joinColumns.length === 0) {
                    return null;
                }
                var foreignKeyColumn = joinColumns[0].databaseName;
                if (!foreignKeyColumn) {
                    return null;
                }
                var whereCondition = this.buildWhereConditionClause(relatedAlias, columnName, comparisonOperator, newParamKey, escapeId);
                // EXISTS (SELECT 1 FROM related_table rt
                //         WHERE rt.foreignKey = main_entity.id AND rt.columnName = :paramValue)
                existsQuery = "EXISTS (\n                SELECT 1 FROM ".concat(escapeId(inverseTableName), " ").concat(escapeId(relatedAlias), "\n                WHERE ").concat(escapeId(relatedAlias), ".").concat(escapeId(foreignKeyColumn), " = ").concat(escapeId(mainQb.alias), ".").concat(escapeId('id'), " AND ").concat(whereCondition, "\n            )");
            }
            else {
                // Not a *-to-Many relation, shouldn't happen but fall back gracefully
                return null;
            }
            return {
                clause: existsQuery,
                parameters: parameters,
            };
        };
        /**
         * Extracts the comparison operator from a SQL clause string.
         */
        ListQueryBuilder_1.prototype.extractComparisonOperator = function (clause) {
            if (clause.includes('!=')) {
                return '!=';
            }
            else if (clause.includes('>=')) {
                return '>=';
            }
            else if (clause.includes('<=')) {
                return '<=';
            }
            else if (clause.includes('>')) {
                return '>';
            }
            else if (clause.includes('<')) {
                return '<';
            }
            else if (clause.includes(' IN ')) {
                return 'IN';
            }
            else if (clause.includes(' NOT IN ')) {
                return 'NOT IN';
            }
            else if (clause.includes(' ILIKE ')) {
                return 'ILIKE';
            }
            else if (clause.includes(' NOT LIKE ') || clause.includes(' NOT ILIKE ')) {
                return clause.includes('ILIKE') ? 'NOT ILIKE' : 'NOT LIKE';
            }
            else if (clause.includes(' LIKE ')) {
                return 'LIKE';
            }
            else if (clause.includes(' IS NULL')) {
                return 'IS NULL';
            }
            else if (clause.includes(' IS NOT NULL')) {
                return 'IS NOT NULL';
            }
            else if (clause.includes(' BETWEEN ')) {
                return 'BETWEEN';
            }
            return '=';
        };
        /**
         * Builds a WHERE condition clause string for the EXISTS subquery.
         */
        ListQueryBuilder_1.prototype.buildWhereConditionClause = function (alias, columnName, operator, paramKey, escapeId) {
            var col = "".concat(escapeId(alias), ".").concat(escapeId(columnName));
            if (operator === 'IN') {
                return "".concat(col, " IN (:...").concat(paramKey, ")");
            }
            else if (operator === 'NOT IN') {
                return "".concat(col, " NOT IN (:...").concat(paramKey, ")");
            }
            else if (operator === 'IS NULL') {
                return "".concat(col, " IS NULL");
            }
            else if (operator === 'IS NOT NULL') {
                return "".concat(col, " IS NOT NULL");
            }
            else if (operator === 'BETWEEN') {
                return "".concat(col, " BETWEEN :").concat(paramKey, "_a AND :").concat(paramKey, "_b");
            }
            return "".concat(col, " ").concat(operator, " :").concat(paramKey);
        };
        ListQueryBuilder_1.prototype.parseTakeSkipParams = function (apiType, options, ignoreQueryLimits) {
            var _a;
            if (ignoreQueryLimits === void 0) { ignoreQueryLimits = false; }
            var _b = this.configService.apiOptions, shopListQueryLimit = _b.shopListQueryLimit, adminListQueryLimit = _b.adminListQueryLimit;
            var takeLimit = ignoreQueryLimits
                ? Number.MAX_SAFE_INTEGER
                : apiType === 'admin'
                    ? adminListQueryLimit
                    : shopListQueryLimit;
            if (options.take && options.take > takeLimit) {
                throw new common_2.UserInputError('error.list-query-limit-exceeded', { limit: takeLimit });
            }
            var rawConnection = this.connection.rawConnection;
            var skip = Math.max((_a = options.skip) !== null && _a !== void 0 ? _a : 0, 0);
            // `take` must not be negative, and must not be greater than takeLimit
            var take = options.take == null ? takeLimit : Math.min(Math.max(options.take, 0), takeLimit);
            if (options.skip !== undefined && options.take === undefined) {
                take = takeLimit;
            }
            return { take: take, skip: skip };
        };
        /**
         * @description
         * As part of list optimization, we only join the minimum required relations which are needed to
         * get the base list query. Other relations are then joined individually in the patched `getManyAndCount()`
         * method.
         */
        ListQueryBuilder_1.prototype.getMinimumRequiredRelations = function (repository, options, extendedOptions) {
            var requiredRelations = [];
            if (extendedOptions.channelId) {
                requiredRelations.push('channels');
            }
            if (extendedOptions.customPropertyMap) {
                var metadata = repository.metadata;
                for (var _i = 0, _a = Object.entries(extendedOptions.customPropertyMap); _i < _a.length; _i++) {
                    var _b = _a[_i], property = _b[0], path = _b[1];
                    if (!this.customPropertyIsBeingUsed(property, options)) {
                        // If the custom property is not being used to filter or sort, then we don't need
                        // to join the associated relations.
                        continue;
                    }
                    var relationPath = path.split('.').slice(0, -1);
                    var targetMetadata = metadata;
                    var reconstructedPath = [];
                    for (var _c = 0, relationPath_1 = relationPath; _c < relationPath_1.length; _c++) {
                        var relationPathPart = relationPath_1[_c];
                        var relationMetadata = targetMetadata.findRelationWithPropertyPath(relationPathPart);
                        if (relationMetadata) {
                            reconstructedPath.push(relationMetadata.propertyName);
                            requiredRelations.push(reconstructedPath.join('.'));
                            targetMetadata = relationMetadata.inverseEntityMetadata;
                        }
                    }
                }
            }
            return (0, unique_1.unique)(requiredRelations);
        };
        ListQueryBuilder_1.prototype.customPropertyIsBeingUsed = function (property, options) {
            var _a;
            return !!(((_a = options.sort) === null || _a === void 0 ? void 0 : _a[property]) || this.isPropertyUsedInFilter(property, options.filter));
        };
        ListQueryBuilder_1.prototype.isPropertyUsedInFilter = function (property, filter) {
            var _this = this;
            var _a, _b;
            return !!(filter &&
                (filter[property] ||
                    ((_a = filter._and) === null || _a === void 0 ? void 0 : _a.some(function (nestedFilter) { return _this.isPropertyUsedInFilter(property, nestedFilter); })) ||
                    ((_b = filter._or) === null || _b === void 0 ? void 0 : _b.some(function (nestedFilter) { return _this.isPropertyUsedInFilter(property, nestedFilter); }))));
        };
        /**
         * If a customPropertyMap is provided, we need to take the path provided and convert it to the actual
         * relation aliases being used by the SelectQueryBuilder.
         *
         * This method mutates the customPropertyMap object.
         */
        ListQueryBuilder_1.prototype.normalizeCustomPropertyMap = function (customPropertyMap, options, qb) {
            var _a;
            for (var _i = 0, _b = Object.entries(customPropertyMap); _i < _b.length; _i++) {
                var _c = _b[_i], property = _c[0], value = _c[1];
                if (!this.customPropertyIsBeingUsed(property, options)) {
                    continue;
                }
                var parts = customPropertyMap[property].split('.');
                var normalizedRelationPath = [];
                var entityMetadata = (_a = qb.expressionMap.mainAlias) === null || _a === void 0 ? void 0 : _a.metadata;
                var entityAlias = qb.alias;
                while (parts.length > 1) {
                    var entityPart = 2 <= parts.length ? parts[0] : qb.alias;
                    var columnPart = parts[parts.length - 1];
                    if (!entityMetadata) {
                        config_1.Logger.error("Could not get metadata for entity ".concat(qb.alias));
                        continue;
                    }
                    var relationMetadata = entityMetadata.findRelationWithPropertyPath(entityPart);
                    if (!relationMetadata || !(relationMetadata === null || relationMetadata === void 0 ? void 0 : relationMetadata.propertyName)) {
                        config_1.Logger.error("The customPropertyMap entry \"".concat(property, ":").concat(value, "\" could not be resolved to a related table"));
                        delete customPropertyMap[property];
                        return;
                    }
                    var alias = "".concat(entityMetadata.tableName, "_").concat(relationMetadata.propertyName);
                    if (!this.isRelationAlreadyJoined(qb, alias)) {
                        qb.leftJoinAndSelect("".concat(entityAlias, ".").concat(relationMetadata.propertyName), alias);
                    }
                    parts = parts.slice(1);
                    entityMetadata = relationMetadata === null || relationMetadata === void 0 ? void 0 : relationMetadata.inverseEntityMetadata;
                    normalizedRelationPath.push(entityAlias);
                    if (parts.length === 1) {
                        normalizedRelationPath.push(alias, columnPart);
                    }
                    else {
                        entityAlias = alias;
                    }
                }
                customPropertyMap[property] = normalizedRelationPath.slice(-2).join('.');
            }
        };
        /**
         * Some calculated columns (those with the `@Calculated()` decorator) require extra joins in order
         * to derive the data needed for their expressions.
         */
        ListQueryBuilder_1.prototype.joinCalculatedColumnRelations = function (qb, entity, options) {
            var calculatedColumns = (0, get_calculated_columns_1.getCalculatedColumns)(entity);
            var filterAndSortFields = this.getFilterAndSortFields(options);
            var alias = (0, connection_utils_1.getEntityAlias)(this.connection.rawConnection, entity);
            var _loop_1 = function (field) {
                var calculatedColumnDef = calculatedColumns.find(function (c) { return c.name === field; });
                var instruction = calculatedColumnDef === null || calculatedColumnDef === void 0 ? void 0 : calculatedColumnDef.listQuery;
                if (instruction) {
                    var relations = instruction.relations || [];
                    var _loop_2 = function (relation) {
                        var relationIsAlreadyJoined = qb.expressionMap.joinAttributes.find(function (ja) { return ja.entityOrProperty === "".concat(alias, ".").concat(relation); });
                        if (!relationIsAlreadyJoined) {
                            var propertyPath = relation.includes('.') ? relation : "".concat(alias, ".").concat(relation);
                            var relationAlias = relation.includes('.')
                                ? relation.split('.').reverse()[0]
                                : relation;
                            qb.innerJoinAndSelect(propertyPath, relationAlias);
                        }
                    };
                    for (var _a = 0, relations_1 = relations; _a < relations_1.length; _a++) {
                        var relation = relations_1[_a];
                        _loop_2(relation);
                    }
                    if (typeof instruction.query === 'function') {
                        instruction.query(qb);
                    }
                }
            };
            for (var _i = 0, filterAndSortFields_1 = filterAndSortFields; _i < filterAndSortFields_1.length; _i++) {
                var field = filterAndSortFields_1[_i];
                _loop_1(field);
            }
        };
        ListQueryBuilder_1.prototype.getFilterAndSortFields = function (options) {
            var sortFields = Object.keys(options.sort || {});
            // filter fields can be immediate children of the filter object
            // or nested inside _and or _or
            var filterFields = this.getFilterFields(options.filter);
            return (0, unique_1.unique)(__spreadArray(__spreadArray([], sortFields, true), filterFields, true));
        };
        ListQueryBuilder_1.prototype.getFilterFields = function (filter) {
            if (!filter) {
                return [];
            }
            var filterFields = [];
            for (var key in filter) {
                if (key === '_and' || key === '_or') {
                    var value = filter[key];
                    for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                        var condition = value_2[_i];
                        filterFields.push.apply(filterFields, this.getFilterFields(condition));
                    }
                }
                else if (filter[key]) {
                    filterFields.push(key);
                }
            }
            return (0, unique_1.unique)(filterFields);
        };
        /**
         * @description
         * If this entity is Translatable, and we are sorting on one of the translatable fields,
         * then we need to apply appropriate WHERE clauses to limit
         * the joined translation relations.
         */
        ListQueryBuilder_1.prototype.applyTranslationConditions = function (qb, entity, sortParams, ctx) {
            var _this = this;
            var languageCode = (ctx === null || ctx === void 0 ? void 0 : ctx.languageCode) || this.configService.defaultLanguageCode;
            var translationColumns = (0, connection_utils_1.getColumnMetadata)(qb.connection, entity).translationColumns;
            var alias = qb.alias;
            var sortKeys = Object.keys(sortParams);
            var sortingOnTranslatableKey = false;
            for (var _i = 0, translationColumns_1 = translationColumns; _i < translationColumns_1.length; _i++) {
                var translationColumn = translationColumns_1[_i];
                if (sortKeys.includes(translationColumn.propertyName)) {
                    sortingOnTranslatableKey = true;
                }
            }
            if (translationColumns.length && sortingOnTranslatableKey) {
                var translationsAlias_1 = qb.connection.namingStrategy.joinTableName(alias, 'translations', '', '');
                if (!this.isRelationAlreadyJoined(qb, translationsAlias_1)) {
                    qb.leftJoinAndSelect("".concat(alias, ".translations"), translationsAlias_1);
                }
                qb.andWhere(new typeorm_1.Brackets(function (qb1) {
                    var _a;
                    qb1.where("".concat(translationsAlias_1, ".languageCode = :languageCode"), { languageCode: languageCode });
                    var defaultLanguageCode = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.channel.defaultLanguageCode) !== null && _a !== void 0 ? _a : _this.configService.defaultLanguageCode;
                    var translationEntity = translationColumns[0].entityMetadata.target;
                    if (languageCode !== defaultLanguageCode) {
                        // If the current languageCode is not the default, then we create a more
                        // complex WHERE clause to allow us to use the non-default translations and
                        // fall back to the default language if no translation exists.
                        qb1.orWhere(new typeorm_1.Brackets(function (qb2) {
                            var subQb1 = _this.connection.rawConnection
                                .createQueryBuilder(translationEntity, 'translation')
                                .where("translation.base = ".concat(alias, ".id"))
                                .andWhere('translation.languageCode = :defaultLanguageCode');
                            var subQb2 = _this.connection.rawConnection
                                .createQueryBuilder(translationEntity, 'translation')
                                .where("translation.base = ".concat(alias, ".id"))
                                .andWhere('translation.languageCode = :nonDefaultLanguageCode');
                            qb2.where("EXISTS (".concat(subQb1.getQuery(), ")")).andWhere("NOT EXISTS (".concat(subQb2.getQuery(), ")"));
                        }));
                    }
                    else {
                        qb1.orWhere(new typeorm_1.Brackets(function (qb2) {
                            var subQb1 = _this.connection.rawConnection
                                .createQueryBuilder(translationEntity, 'translation')
                                .where("translation.base = ".concat(alias, ".id"))
                                .andWhere('translation.languageCode = :defaultLanguageCode');
                            var subQb2 = _this.connection.rawConnection
                                .createQueryBuilder(translationEntity, 'translation')
                                .where("translation.base = ".concat(alias, ".id"))
                                .andWhere('translation.languageCode != :defaultLanguageCode');
                            qb2.where("NOT EXISTS (".concat(subQb1.getQuery(), ")")).andWhere("EXISTS (".concat(subQb2.getQuery(), ")"));
                        }));
                    }
                    qb.setParameters({
                        nonDefaultLanguageCode: languageCode,
                        defaultLanguageCode: defaultLanguageCode,
                    });
                }));
            }
        };
        /**
         * Registers a user-defined function (for flavors of SQLite driver that support it)
         * so that we can run regex filters on string fields.
         */
        ListQueryBuilder_1.prototype.registerSQLiteRegexpFunction = function () {
            var regexpFn = function (pattern, value) {
                var result = new RegExp("".concat(pattern), 'i').test(value);
                return result ? 1 : 0;
            };
            var dbType = this.connection.rawConnection.options.type;
            if (dbType === 'better-sqlite3') {
                var driver = this.connection.rawConnection.driver;
                driver.databaseConnection.function('regexp', regexpFn);
            }
            if (dbType === 'sqljs') {
                var driver = this.connection.rawConnection.driver;
                driver.databaseConnection.create_function('regexp', regexpFn);
            }
        };
        ListQueryBuilder_1.prototype.isRelationAlreadyJoined = function (qb, alias) {
            return qb.expressionMap.joinAttributes.some(function (ja) { return ja.alias.name === alias; });
        };
        return ListQueryBuilder_1;
    }());
    __setFunctionName(_classThis, "ListQueryBuilder");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListQueryBuilder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListQueryBuilder = _classThis;
}();
exports.ListQueryBuilder = ListQueryBuilder;
