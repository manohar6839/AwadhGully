"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateEntity = translateEntity;
exports.translateDeep = translateDeep;
exports.translateTree = translateTree;
var constants_1 = require("../../../common/constants");
var errors_1 = require("../../../common/error/errors");
/**
 * Converts a Translatable entity into the public-facing entity by unwrapping
 * the translated strings from the matching Translation entity.
 */
function translateEntity(translatable, languageCode) {
    var translation;
    if (translatable.translations) {
        if (Array.isArray(languageCode)) {
            var _loop_1 = function (lc) {
                translation = translatable.translations.find(function (t) { return t.languageCode === lc; });
                if (translation)
                    return "break";
            };
            for (var _i = 0, languageCode_1 = languageCode; _i < languageCode_1.length; _i++) {
                var lc = languageCode_1[_i];
                var state_1 = _loop_1(lc);
                if (state_1 === "break")
                    break;
            }
        }
        else {
            translation = translatable.translations.find(function (t) { return t.languageCode === languageCode; });
        }
        if (!translation && languageCode !== constants_1.DEFAULT_LANGUAGE_CODE) {
            translation = translatable.translations.find(function (t) { return t.languageCode === constants_1.DEFAULT_LANGUAGE_CODE; });
        }
        if (!translation) {
            // If we cannot find any suitable translation, just return the first one to at least
            // prevent graphql errors when returning the entity.
            translation = translatable.translations[0];
        }
    }
    if (!translation) {
        throw new errors_1.InternalServerError('error.entity-has-no-translation-in-language', {
            entityName: translatable.constructor.name,
            languageCode: Array.isArray(languageCode) ? languageCode.join() : languageCode,
        });
    }
    var translated = Object.create(Object.getPrototypeOf(translatable), Object.getOwnPropertyDescriptors(translatable));
    for (var _a = 0, _b = Object.entries(translation); _a < _b.length; _a++) {
        var _c = _b[_a], key = _c[0], value = _c[1];
        if (key === 'customFields') {
            if (!translated.customFields) {
                translated.customFields = {};
            }
            Object.assign(translated.customFields, value);
        }
        else if (key !== 'base' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
            translated[key] = value !== null && value !== void 0 ? value : '';
        }
    }
    return translated;
}
/**
 * Translates an entity and its deeply-nested translatable properties. Supports up to 2 levels of nesting.
 */
function translateDeep(translatable, languageCode, translatableRelations) {
    if (translatableRelations === void 0) { translatableRelations = []; }
    var translatedEntity;
    try {
        translatedEntity = translateEntity(translatable, languageCode);
    }
    catch (e) {
        translatedEntity = translatable;
    }
    var _loop_2 = function (path) {
        var object;
        var property;
        var value = void 0;
        if (Array.isArray(path) && path.length === 2) {
            var _a = path, path0_1 = _a[0], path1_1 = _a[1];
            var valueLevel0 = translatable[path0_1];
            if (Array.isArray(valueLevel0)) {
                valueLevel0.forEach(function (nested1, index) {
                    object = translatedEntity[path0_1][index];
                    property = path1_1;
                    object[property] = translateLeaf(object, property, languageCode);
                });
                property = '';
                object = null;
            }
            else {
                object = translatedEntity[path0_1];
                property = path1_1;
                value = translateLeaf(object, property, languageCode);
            }
        }
        else {
            object = translatedEntity;
            property = path;
            value = translateLeaf(object, property, languageCode);
        }
        if (object && property) {
            object[property] = value;
        }
    };
    for (var _i = 0, translatableRelations_1 = translatableRelations; _i < translatableRelations_1.length; _i++) {
        var path = translatableRelations_1[_i];
        _loop_2(path);
    }
    return translatedEntity;
}
function translateLeaf(object, property, languageCode) {
    if (object && object[property]) {
        if (Array.isArray(object[property])) {
            return object[property].map(function (nested2) { return translateEntity(nested2, languageCode); });
        }
        else if (object[property]) {
            return translateEntity(object[property], languageCode);
        }
    }
}
/**
 * Translates a tree structure of Translatable entities
 */
function translateTree(node, languageCode, translatableRelations) {
    if (translatableRelations === void 0) { translatableRelations = []; }
    var output = translateDeep(node, languageCode, translatableRelations);
    if (Array.isArray(output.children)) {
        output.children = output.children.map(function (child) {
            return translateTree(child, languageCode, translatableRelations);
        });
    }
    return output;
}
