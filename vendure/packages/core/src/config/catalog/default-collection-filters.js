"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCollectionFilters = exports.productIdCollectionFilter = exports.variantIdCollectionFilter = exports.variantNameCollectionFilter = exports.facetValueCollectionFilter = exports.combineWithAndArg = void 0;
exports.randomSuffix = randomSuffix;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var errors_1 = require("../../common/error/errors");
var product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
var collection_filter_1 = require("./collection-filter");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var customAlphabet = require('nanoid').customAlphabet;
/**
 * @description
 * Used to created unique key names for DB query parameters, to avoid conflicts if the
 * same filter is applied multiple times.
 */
function randomSuffix(prefix) {
    var nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 6);
    return "".concat(prefix, "_").concat(nanoid());
}
/**
 * @description
 * Add this to your CollectionFilter `args` object to display the standard UI component
 * for selecting the combination mode when working with multiple filters.
 */
exports.combineWithAndArg = {
    type: 'boolean',
    label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Combination mode' }],
    description: [
        {
            languageCode: generated_types_1.LanguageCode.en,
            // eslint-disable-next-line max-len
            value: 'If this filter is being combined with other filters, do all conditions need to be satisfied (AND), or just one or the other (OR)?',
        },
    ],
    defaultValue: true,
    ui: {
        component: 'combination-mode-form-input',
    },
};
/**
 * Filters for ProductVariants having the given facetValueIds (including parent Product)
 */
exports.facetValueCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        facetValueIds: {
            type: 'ID',
            list: true,
            ui: {
                component: 'facet-value-form-input',
            },
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Facet values' }],
        },
        containsAny: {
            type: 'boolean',
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Contains any' }],
            description: [
                {
                    languageCode: generated_types_1.LanguageCode.en,
                    value: 'If checked, product variants must have at least one of the selected facet values. ' +
                        'If not checked, the variant must have all selected values.',
                },
            ],
        },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'facet-value-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Filter by facet values' }],
    apply: function (qb, args) {
        var _a;
        var ids = args.facetValueIds;
        if (ids.length) {
            // uuid IDs can include `-` chars, which we cannot use in a TypeORM key name.
            var safeIdsConcat = ids.join('_').replace(/-/g, '_');
            var idsName = "ids_".concat(safeIdsConcat);
            var countName = "count_".concat(safeIdsConcat);
            var productFacetValues = qb.connection
                .createQueryBuilder(product_variant_entity_1.ProductVariant, 'product_variant')
                .select('product_variant.id', 'variant_id')
                .addSelect('facet_value.id', 'facet_value_id')
                .leftJoin('product_variant.facetValues', 'facet_value')
                .where("facet_value.id IN (:...".concat(idsName, ")"));
            var variantFacetValues = qb.connection
                .createQueryBuilder(product_variant_entity_1.ProductVariant, 'product_variant')
                .select('product_variant.id', 'variant_id')
                .addSelect('facet_value.id', 'facet_value_id')
                .leftJoin('product_variant.product', 'product')
                .leftJoin('product.facetValues', 'facet_value')
                .where("facet_value.id IN (:...".concat(idsName, ")"));
            var union = qb.connection
                .createQueryBuilder()
                .select('union_table.variant_id')
                .from("(".concat(productFacetValues.getQuery(), " UNION ").concat(variantFacetValues.getQuery(), ")"), 'union_table')
                .groupBy('variant_id')
                .having("COUNT(*) >= :".concat(countName));
            var variantIds = qb.connection
                .createQueryBuilder()
                .select('variant_ids_table.variant_id')
                .from("(".concat(union.getQuery(), ")"), 'variant_ids_table');
            var clause = "productVariant.id IN (".concat(variantIds.getQuery(), ")");
            var params = (_a = {},
                _a[idsName] = ids,
                _a[countName] = args.containsAny ? 1 : ids.length,
                _a);
            if (args.combineWithAnd !== false) {
                qb.andWhere(clause).setParameters(params);
            }
            else {
                qb.orWhere(clause).setParameters(params);
            }
        }
        else {
            // If no facetValueIds are specified, no ProductVariants will be matched.
            if (args.combineWithAnd !== false) {
                qb.andWhere('1 = 0');
            }
        }
        return qb;
    },
});
exports.variantNameCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        operator: {
            type: 'string',
            ui: {
                component: 'select-form-input',
                options: [
                    { value: 'startsWith' },
                    { value: 'endsWith' },
                    { value: 'contains' },
                    { value: 'doesNotContain' },
                ],
            },
        },
        term: { type: 'string' },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'variant-name-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Filter by product variant name' }],
    apply: function (qb, args) {
        var _a, _b, _c, _d;
        var translationAlias = 'variant_name_filter_translation';
        var termName = randomSuffix('term');
        var translationsJoin = qb.expressionMap.joinAttributes.find(function (ja) { return ja.entityOrProperty === 'productVariant.translations'; });
        if (!translationsJoin) {
            qb.leftJoin('productVariant.translations', translationAlias);
        }
        else {
            translationAlias = translationsJoin.alias.name;
        }
        var LIKE = qb.connection.options.type === 'postgres' ? 'ILIKE' : 'LIKE';
        var clause;
        var params;
        switch (args.operator) {
            case 'contains':
                clause = "".concat(translationAlias, ".name ").concat(LIKE, " :").concat(termName);
                params = (_a = {},
                    _a[termName] = "%".concat(args.term, "%"),
                    _a);
                break;
            case 'doesNotContain':
                clause = "".concat(translationAlias, ".name NOT ").concat(LIKE, " :").concat(termName);
                params = (_b = {},
                    _b[termName] = "%".concat(args.term, "%"),
                    _b);
                break;
            case 'startsWith':
                clause = "".concat(translationAlias, ".name ").concat(LIKE, " :").concat(termName);
                params = (_c = {},
                    _c[termName] = "".concat(args.term, "%"),
                    _c);
                break;
            case 'endsWith':
                clause = "".concat(translationAlias, ".name ").concat(LIKE, " :").concat(termName);
                params = (_d = {},
                    _d[termName] = "%".concat(args.term),
                    _d);
                break;
            default:
                throw new errors_1.UserInputError("".concat(args.operator, " is not a valid operator"));
        }
        if (args.combineWithAnd === false) {
            return qb.orWhere(clause, params);
        }
        else {
            return qb.andWhere(clause, params);
        }
    },
});
exports.variantIdCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        variantIds: {
            type: 'ID',
            list: true,
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Product variants' }],
            ui: {
                component: 'product-multi-form-input',
                selectionMode: 'variant',
            },
        },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'variant-id-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Manually select product variants' }],
    apply: function (qb, args) {
        var _a;
        var emptyIds = args.variantIds.length === 0;
        var variantIdsKey = randomSuffix('variantIds');
        var clause = "productVariant.id IN (:...".concat(variantIdsKey, ")");
        var params = (_a = {}, _a[variantIdsKey] = args.variantIds, _a);
        if (args.combineWithAnd === false) {
            if (emptyIds) {
                return qb;
            }
            return qb.orWhere(clause, params);
        }
        else {
            if (emptyIds) {
                return qb.andWhere('1 = 0');
            }
            return qb.andWhere(clause, params);
        }
    },
});
exports.productIdCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        productIds: {
            type: 'ID',
            list: true,
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Products' }],
            ui: {
                component: 'product-multi-form-input',
                selectionMode: 'product',
            },
        },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'product-id-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Manually select products' }],
    apply: function (qb, args) {
        var _a;
        var emptyIds = args.productIds.length === 0;
        var productIdsKey = randomSuffix('productIds');
        var clause = "productVariant.productId IN (:...".concat(productIdsKey, ")");
        var params = (_a = {}, _a[productIdsKey] = args.productIds, _a);
        if (args.combineWithAnd === false) {
            if (emptyIds) {
                return qb;
            }
            return qb.orWhere(clause, params);
        }
        else {
            if (emptyIds) {
                return qb.andWhere('1 = 0');
            }
            return qb.andWhere(clause, params);
        }
    },
});
exports.defaultCollectionFilters = [
    exports.facetValueCollectionFilter,
    exports.variantNameCollectionFilter,
    exports.variantIdCollectionFilter,
    exports.productIdCollectionFilter,
];
