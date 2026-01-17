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
exports.ImportParser = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var normalize_string_1 = require("@vendure/common/lib/normalize-string");
var unique_1 = require("@vendure/common/lib/unique");
var csv_parse_1 = require("csv-parse");
var errors_1 = require("../../../common/error/errors");
var baseTranslatableColumns = [
    'name',
    'slug',
    'description',
    'facets',
    'optionGroups',
    'optionValues',
    'variantFacets',
];
var requiredColumns = [
    'name',
    'slug',
    'description',
    'assets',
    'facets',
    'optionGroups',
    'optionValues',
    'sku',
    'price',
    'taxCategory',
    'variantAssets',
    'variantFacets',
];
/**
 * @description
 * Validates and parses CSV files into a data structure which can then be used to created new entities.
 * This is used internally by the {@link Importer}.
 *
 * @docsCategory import-export
 * @docsPage ImportParser
 * @docsWeight 0
 */
var ImportParser = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ImportParser = _classThis = /** @class */ (function () {
        /** @internal */
        function ImportParser_1(configService) {
            this.configService = configService;
        }
        /**
         * @description
         * Parses the contents of the [product import CSV file](/guides/developer-guide/importing-data/#product-import-format) and
         * returns a data structure which can then be used to populate Vendure using the {@link FastImporterService}.
         */
        ImportParser_1.prototype.parseProducts = function (input_1) {
            return __awaiter(this, arguments, void 0, function (input, mainLanguage) {
                var options;
                var _this = this;
                if (mainLanguage === void 0) { mainLanguage = this.configService.defaultLanguageCode; }
                return __generator(this, function (_a) {
                    options = {
                        trim: true,
                        relax_column_count: true,
                    };
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var errors = [];
                            if (typeof input === 'string') {
                                (0, csv_parse_1.parse)(input, options, function (err, records) {
                                    if (err) {
                                        errors = errors.concat(err);
                                    }
                                    if (records) {
                                        var parseResult = _this.processRawRecords(records, mainLanguage);
                                        errors = errors.concat(parseResult.errors);
                                        resolve({ results: parseResult.results, errors: errors, processed: parseResult.processed });
                                    }
                                    else {
                                        resolve({ results: [], errors: errors, processed: 0 });
                                    }
                                });
                            }
                            else {
                                var parser_1 = (0, csv_parse_1.parse)(options);
                                var records_1 = [];
                                // input.on('open', () => input.pipe(parser));
                                input.pipe(parser_1);
                                parser_1.on('readable', function () {
                                    var record;
                                    // eslint-disable-next-line no-cond-assign
                                    while ((record = parser_1.read())) {
                                        records_1.push(record);
                                    }
                                });
                                parser_1.on('error', reject);
                                parser_1.on('end', function () {
                                    var parseResult = _this.processRawRecords(records_1, mainLanguage);
                                    errors = errors.concat(parseResult.errors);
                                    resolve({ results: parseResult.results, errors: errors, processed: parseResult.processed });
                                });
                            }
                        })];
                });
            });
        };
        ImportParser_1.prototype.processRawRecords = function (records, mainLanguage) {
            var results = [];
            var errors = [];
            var currentRow;
            var headerRow = records[0];
            var rest = records.slice(1);
            var totalProducts = rest.map(function (row) { return row[0]; }).filter(function (name) { return name.trim() !== ''; }).length;
            var customFieldErrors = this.validateCustomFields(headerRow);
            if (customFieldErrors.length > 0) {
                return { results: [], errors: customFieldErrors, processed: 0 };
            }
            var translationError = this.validateHeaderTranslations(headerRow);
            if (translationError) {
                return { results: [], errors: [translationError], processed: 0 };
            }
            var columnError = validateRequiredColumns(headerRow);
            if (columnError) {
                return { results: [], errors: [columnError], processed: 0 };
            }
            var usedLanguages = usedLanguageCodes(headerRow);
            var line = 1;
            for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
                var record = rest_1[_i];
                line++;
                var columnCountError = validateColumnCount(headerRow, record);
                if (columnCountError) {
                    errors.push(columnCountError + " on line ".concat(line));
                    continue;
                }
                var r = mapRowToObject(headerRow, record);
                if (getRawMainTranslation(r, 'name', mainLanguage)) {
                    if (currentRow) {
                        populateOptionGroupValues(currentRow);
                        results.push(currentRow);
                    }
                    currentRow = {
                        product: this.parseProductFromRecord(r, usedLanguages, mainLanguage),
                        variants: [this.parseVariantFromRecord(r, usedLanguages, mainLanguage)],
                    };
                }
                else {
                    if (currentRow) {
                        currentRow.variants.push(this.parseVariantFromRecord(r, usedLanguages, mainLanguage));
                    }
                }
                var optionError = validateOptionValueCount(r, currentRow);
                if (optionError) {
                    errors.push(optionError + " on line ".concat(line));
                }
            }
            if (currentRow) {
                populateOptionGroupValues(currentRow);
                results.push(currentRow);
            }
            return { results: results, errors: errors, processed: totalProducts };
        };
        ImportParser_1.prototype.validateCustomFields = function (rowKeys) {
            var errors = [];
            var _loop_1 = function (rowKey) {
                var baseKey = getBaseKey(rowKey);
                var parts = baseKey.split(':');
                if (parts.length === 1) {
                    return "continue";
                }
                if (parts.length === 2) {
                    var customFieldConfigs = [];
                    if (parts[0] === 'product') {
                        customFieldConfigs = this_1.configService.customFields.Product;
                    }
                    else if (parts[0] === 'variant') {
                        customFieldConfigs = this_1.configService.customFields.ProductVariant;
                    }
                    else {
                        return "continue";
                    }
                    var customFieldConfig = customFieldConfigs.find(function (config) { return config.name === parts[1]; });
                    if (customFieldConfig) {
                        return "continue";
                    }
                }
                errors.push("Invalid custom field: ".concat(rowKey));
            };
            var this_1 = this;
            for (var _i = 0, rowKeys_1 = rowKeys; _i < rowKeys_1.length; _i++) {
                var rowKey = rowKeys_1[_i];
                _loop_1(rowKey);
            }
            return errors;
        };
        ImportParser_1.prototype.isTranslatable = function (baseKey) {
            var parts = baseKey.split(':');
            if (parts.length === 1) {
                return baseTranslatableColumns.includes(baseKey);
            }
            if (parts.length === 2) {
                var customFieldConfigs = void 0;
                if (parts[0] === 'product') {
                    customFieldConfigs = this.configService.customFields.Product;
                }
                else if (parts[0] === 'variant') {
                    customFieldConfigs = this.configService.customFields.ProductVariant;
                }
                else {
                    throw new errors_1.InternalServerError("Invalid column header '".concat(baseKey, "'"));
                }
                var customFieldConfig = customFieldConfigs.find(function (config) { return config.name === parts[1]; });
                if (!customFieldConfig) {
                    throw new errors_1.InternalServerError("Could not find custom field config for column header '".concat(baseKey, "'"));
                }
                return customFieldConfig.type === 'localeString';
            }
            throw new errors_1.InternalServerError("Invalid column header '".concat(baseKey, "'"));
        };
        ImportParser_1.prototype.validateHeaderTranslations = function (rowKeys) {
            var missing = [];
            var languageCodes = usedLanguageCodes(rowKeys);
            var baseKeys = usedBaseKeys(rowKeys);
            var _loop_2 = function (baseKey) {
                var translatedKeys = languageCodes.map(function (code) { return [baseKey, code].join(':'); });
                if (rowKeys.includes(baseKey)) {
                    // Untranslated column header is used -> there should be no translated ones
                    if (rowKeys.some(function (key) { return translatedKeys.includes(key); })) {
                        return { value: "The import file must not contain both translated and untranslated columns for field '".concat(baseKey, "'") };
                    }
                }
                else {
                    if (!this_2.isTranslatable(baseKey) && translatedKeys.some(function (key) { return rowKeys.includes(key); })) {
                        return { value: "The '".concat(baseKey, "' field is not translatable.") };
                    }
                    // All column headers must exist for all translations
                    for (var _a = 0, translatedKeys_1 = translatedKeys; _a < translatedKeys_1.length; _a++) {
                        var translatedKey = translatedKeys_1[_a];
                        if (!rowKeys.includes(translatedKey)) {
                            missing.push(translatedKey);
                        }
                    }
                }
            };
            var this_2 = this;
            for (var _i = 0, baseKeys_1 = baseKeys; _i < baseKeys_1.length; _i++) {
                var baseKey = baseKeys_1[_i];
                var state_1 = _loop_2(baseKey);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (missing.length) {
                return "The import file is missing the following translations: ".concat(missing
                    .map(function (m) { return "\"".concat(m, "\""); })
                    .join(', '));
            }
        };
        ImportParser_1.prototype.parseProductFromRecord = function (r, usedLanguages, mainLanguage) {
            var translationCodes = usedLanguages.length === 0 ? [mainLanguage] : usedLanguages;
            var optionGroups = [];
            for (var _i = 0, translationCodes_1 = translationCodes; _i < translationCodes_1.length; _i++) {
                var languageCode = translationCodes_1[_i];
                var rawTranslOptionGroups = r.hasOwnProperty("optionGroups:".concat(languageCode))
                    ? r["optionGroups:".concat(languageCode)]
                    : r.optionGroups;
                var translatedOptionGroups = parseStringArray(rawTranslOptionGroups);
                if (optionGroups.length === 0) {
                    for (var _a = 0, translatedOptionGroups_1 = translatedOptionGroups; _a < translatedOptionGroups_1.length; _a++) {
                        var translatedOptionGroup = translatedOptionGroups_1[_a];
                        optionGroups.push({ translations: [] });
                    }
                }
                for (var _b = 0, _c = optionGroups.map(function (optionGroup, index) { return index; }); _b < _c.length; _b++) {
                    var i = _c[_b];
                    optionGroups[i].translations.push({
                        languageCode: languageCode,
                        name: translatedOptionGroups[i],
                        values: [],
                    });
                }
            }
            var facets = [];
            for (var _d = 0, translationCodes_2 = translationCodes; _d < translationCodes_2.length; _d++) {
                var languageCode = translationCodes_2[_d];
                var rawTranslatedFacets = r.hasOwnProperty("facets:".concat(languageCode))
                    ? r["facets:".concat(languageCode)]
                    : r.facets;
                var translatedFacets = parseStringArray(rawTranslatedFacets);
                if (facets.length === 0) {
                    for (var _e = 0, translatedFacets_1 = translatedFacets; _e < translatedFacets_1.length; _e++) {
                        var translatedFacet = translatedFacets_1[_e];
                        facets.push({ translations: [] });
                    }
                }
                for (var _f = 0, _g = facets.map(function (facet, index) { return index; }); _f < _g.length; _f++) {
                    var i = _g[_f];
                    var _h = translatedFacets[i].split(':'), facet = _h[0], value = _h[1];
                    facets[i].translations.push({
                        languageCode: languageCode,
                        facet: facet,
                        value: value,
                    });
                }
            }
            var translations = translationCodes.map(function (languageCode) {
                var translatedFields = getRawTranslatedFields(r, languageCode);
                var parsedTranslatedCustomFields = parseCustomFields('product', translatedFields);
                var parsedUntranslatedCustomFields = parseCustomFields('product', getRawUntranslatedFields(r));
                var parsedCustomFields = __assign(__assign({}, parsedUntranslatedCustomFields), parsedTranslatedCustomFields);
                var name = translatedFields.hasOwnProperty('name')
                    ? parseString(translatedFields.name)
                    : r.name;
                var slug;
                if (translatedFields.hasOwnProperty('slug')) {
                    slug = parseString(translatedFields.slug);
                }
                else {
                    slug = parseString(r.slug);
                }
                if (slug.length === 0) {
                    slug = (0, normalize_string_1.normalizeString)(name, '-');
                }
                return {
                    languageCode: languageCode,
                    name: name,
                    slug: slug,
                    description: translatedFields.hasOwnProperty('description')
                        ? parseString(translatedFields.description)
                        : r.description,
                    customFields: parsedCustomFields,
                };
            });
            var parsedProduct = {
                assetPaths: parseStringArray(r.assets),
                optionGroups: optionGroups,
                facets: facets,
                translations: translations,
            };
            return parsedProduct;
        };
        ImportParser_1.prototype.parseVariantFromRecord = function (r, usedLanguages, mainLanguage) {
            var translationCodes = usedLanguages.length === 0 ? [mainLanguage] : usedLanguages;
            var facets = [];
            for (var _i = 0, translationCodes_3 = translationCodes; _i < translationCodes_3.length; _i++) {
                var languageCode = translationCodes_3[_i];
                var rawTranslatedFacets = r.hasOwnProperty("variantFacets:".concat(languageCode))
                    ? r["variantFacets:".concat(languageCode)]
                    : r.variantFacets;
                var translatedFacets = parseStringArray(rawTranslatedFacets);
                if (facets.length === 0) {
                    for (var _a = 0, translatedFacets_2 = translatedFacets; _a < translatedFacets_2.length; _a++) {
                        var translatedFacet = translatedFacets_2[_a];
                        facets.push({ translations: [] });
                    }
                }
                for (var _b = 0, _c = facets.map(function (facet, index) { return index; }); _b < _c.length; _b++) {
                    var i = _c[_b];
                    var _d = translatedFacets[i].split(':'), facet = _d[0], value = _d[1];
                    facets[i].translations.push({
                        languageCode: languageCode,
                        facet: facet,
                        value: value,
                    });
                }
            }
            var translations = translationCodes.map(function (languageCode) {
                var rawTranslOptionValues = r.hasOwnProperty("optionValues:".concat(languageCode))
                    ? r["optionValues:".concat(languageCode)]
                    : r.optionValues;
                var translatedOptionValues = parseStringArray(rawTranslOptionValues);
                var translatedFields = getRawTranslatedFields(r, languageCode);
                var parsedTranslatedCustomFields = parseCustomFields('variant', translatedFields);
                var parsedUntranslatedCustomFields = parseCustomFields('variant', getRawUntranslatedFields(r));
                var parsedCustomFields = __assign(__assign({}, parsedUntranslatedCustomFields), parsedTranslatedCustomFields);
                return {
                    languageCode: languageCode,
                    optionValues: translatedOptionValues,
                    customFields: parsedCustomFields,
                };
            });
            var parsedVariant = {
                sku: parseString(r.sku),
                price: parseNumber(r.price),
                taxCategory: parseString(r.taxCategory),
                stockOnHand: parseNumber(r.stockOnHand),
                trackInventory: r.trackInventory == null || r.trackInventory === ''
                    ? generated_types_1.GlobalFlag.INHERIT
                    : parseBoolean(r.trackInventory)
                        ? generated_types_1.GlobalFlag.TRUE
                        : generated_types_1.GlobalFlag.FALSE,
                assetPaths: parseStringArray(r.variantAssets),
                facets: facets,
                translations: translations,
            };
            return parsedVariant;
        };
        return ImportParser_1;
    }());
    __setFunctionName(_classThis, "ImportParser");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImportParser = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImportParser = _classThis;
}();
exports.ImportParser = ImportParser;
function populateOptionGroupValues(currentRow) {
    var _loop_3 = function (translation) {
        var values = currentRow.variants.map(function (variant) {
            var variantTranslation = variant.translations.find(function (t) { return t.languageCode === translation.languageCode; });
            if (!variantTranslation) {
                throw new errors_1.InternalServerError("No translation '".concat(translation.languageCode, "' for variant SKU '").concat(variant.sku, "'"));
            }
            return variantTranslation.optionValues;
        });
        currentRow.product.optionGroups.forEach(function (og, i) {
            var ogTranslation = og.translations.find(function (t) { return t.languageCode === translation.languageCode; });
            if (!ogTranslation) {
                throw new errors_1.InternalServerError("No translation '".concat(translation.languageCode, "' for option groups'"));
            }
            ogTranslation.values = (0, unique_1.unique)(values.map(function (v) { return v[i]; }));
        });
    };
    for (var _i = 0, _a = currentRow.product.translations; _i < _a.length; _i++) {
        var translation = _a[_i];
        _loop_3(translation);
    }
}
function getLanguageCode(rowKey) {
    var parts = rowKey.split(':');
    if (parts.length === 2) {
        if (parts[1] in generated_types_1.LanguageCode) {
            return parts[1];
        }
    }
    if (parts.length === 3) {
        if (['product', 'productVariant'].includes(parts[0]) && parts[2] in generated_types_1.LanguageCode) {
            return parts[2];
        }
    }
}
function getBaseKey(rowKey) {
    var parts = rowKey.split(':');
    if (getLanguageCode(rowKey)) {
        parts.pop();
        return parts.join(':');
    }
    else {
        return rowKey;
    }
}
function usedLanguageCodes(rowKeys) {
    var languageCodes = [];
    for (var _i = 0, rowKeys_2 = rowKeys; _i < rowKeys_2.length; _i++) {
        var rowKey = rowKeys_2[_i];
        var languageCode = getLanguageCode(rowKey);
        if (languageCode && !languageCodes.includes(languageCode)) {
            languageCodes.push(languageCode);
        }
    }
    return languageCodes;
}
function usedBaseKeys(rowKeys) {
    var baseKeys = [];
    for (var _i = 0, rowKeys_3 = rowKeys; _i < rowKeys_3.length; _i++) {
        var rowKey = rowKeys_3[_i];
        var baseKey = getBaseKey(rowKey);
        if (!baseKeys.includes(baseKey)) {
            baseKeys.push(baseKey);
        }
    }
    return baseKeys;
}
function validateRequiredColumns(r) {
    var rowKeys = r;
    var missing = [];
    var languageCodes = usedLanguageCodes(rowKeys);
    for (var _i = 0, requiredColumns_1 = requiredColumns; _i < requiredColumns_1.length; _i++) {
        var col = requiredColumns_1[_i];
        if (!rowKeys.includes(col)) {
            if (languageCodes.length > 0 && rowKeys.includes("".concat(col, ":").concat(languageCodes[0]))) {
                continue; // If one translation is present, they are all present (we did 'validateHeaderTranslations' before)
            }
            missing.push(col);
        }
    }
    if (missing.length) {
        return "The import file is missing the following columns: ".concat(missing.map(function (m) { return "\"".concat(m, "\""); }).join(', '));
    }
}
function validateColumnCount(columns, row) {
    if (columns.length !== row.length) {
        return "Invalid Record Length: header length is ".concat(columns.length, ", got ").concat(row.length);
    }
}
function mapRowToObject(columns, row) {
    return row.reduce(function (obj, val, i) {
        var _a;
        return __assign(__assign({}, obj), (_a = {}, _a[columns[i]] = val, _a));
    }, {});
}
function validateOptionValueCount(r, currentRow) {
    if (!currentRow) {
        return;
    }
    var optionValueKeys = Object.keys(r).filter(function (key) { return key.startsWith('optionValues'); });
    for (var _i = 0, optionValueKeys_1 = optionValueKeys; _i < optionValueKeys_1.length; _i++) {
        var key = optionValueKeys_1[_i];
        var optionValues = parseStringArray(r[key]);
        if (currentRow.product.optionGroups.length !== optionValues.length) {
            return "The number of optionValues in column '".concat(key, "' must match the number of optionGroups");
        }
    }
}
function getRawMainTranslation(r, field, mainLanguage) {
    if (r.hasOwnProperty(field)) {
        return r[field];
    }
    else {
        return r["".concat(field, ":").concat(mainLanguage)];
    }
}
function getRawTranslatedFields(r, languageCode) {
    return Object.entries(r)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return key.endsWith(":".concat(languageCode));
    })
        .reduce(function (output, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        var fieldName = key.replace(":".concat(languageCode), '');
        return __assign(__assign({}, output), (_b = {}, _b[fieldName] = value, _b));
    }, {});
}
function getRawUntranslatedFields(r) {
    return Object.entries(r)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return !getLanguageCode(key);
    })
        .reduce(function (output, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return __assign(__assign({}, output), (_b = {}, _b[key] = value, _b));
    }, {});
}
function isRelationObject(value) {
    try {
        var parsed = JSON.parse(value);
        return parsed && parsed.hasOwnProperty('id');
    }
    catch (e) {
        return false;
    }
}
function parseCustomFields(prefix, r) {
    return Object.entries(r)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return key.indexOf("".concat(prefix, ":")) === 0;
    })
        .reduce(function (output, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        var fieldName = key.replace("".concat(prefix, ":"), '');
        return __assign(__assign({}, output), (_b = {}, _b[fieldName] = isRelationObject(value) ? JSON.parse(value) : value, _b));
    }, {});
}
function parseString(input) {
    return (input || '').trim();
}
function parseNumber(input) {
    return +(input || '').trim();
}
function parseBoolean(input) {
    if (input == null) {
        return false;
    }
    switch (input.toLowerCase()) {
        case 'true':
        case '1':
        case 'yes':
            return true;
        default:
            return false;
    }
}
function parseStringArray(input, separator) {
    if (separator === void 0) { separator = '|'; }
    return (input || '')
        .trim()
        .split(separator)
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s !== ''; });
}
