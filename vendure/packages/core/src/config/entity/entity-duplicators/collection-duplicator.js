"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionDuplicator = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var transactional_connection_1 = require("../../../connection/transactional-connection");
var collection_entity_1 = require("../../../entity/collection/collection.entity");
var collection_service_1 = require("../../../service/services/collection.service");
var entity_duplicator_1 = require("../entity-duplicator");
var connection;
var collectionService;
/**
 * @description
 * Duplicates a Collection
 */
exports.collectionDuplicator = new entity_duplicator_1.EntityDuplicator({
    code: 'collection-duplicator',
    description: [
        {
            languageCode: generated_types_1.LanguageCode.en,
            value: 'Default duplicator for Collections',
        },
    ],
    requiresPermission: [generated_types_1.Permission.CreateCollection, generated_types_1.Permission.CreateCatalog],
    forEntities: ['Collection'],
    args: {},
    init: function (injector) {
        connection = injector.get(transactional_connection_1.TransactionalConnection);
        collectionService = injector.get(collection_service_1.CollectionService);
    },
    duplicate: function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var collection, translations, collectionInput, duplicatedCollection;
            var _c;
            var ctx = _b.ctx, id = _b.id;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, connection.getEntityOrThrow(ctx, collection_entity_1.Collection, id, {
                            relations: {
                                featuredAsset: true,
                                assets: true,
                                channels: true,
                            },
                        })];
                    case 1:
                        collection = _d.sent();
                        translations = collection.translations.map(function (translation) {
                            return {
                                name: translation.name + ' (copy)',
                                slug: translation.slug + '-copy',
                                description: translation.description,
                                languageCode: translation.languageCode,
                                customFields: translation.customFields,
                            };
                        });
                        collectionInput = {
                            featuredAssetId: (_c = collection.featuredAsset) === null || _c === void 0 ? void 0 : _c.id,
                            isPrivate: true,
                            assetIds: collection.assets.map(function (value) { return value.assetId; }),
                            parentId: collection.parentId,
                            translations: translations,
                            customFields: collection.customFields,
                            filters: collection.filters.map(function (filter) { return ({
                                code: filter.code,
                                arguments: filter.args,
                            }); }),
                        };
                        return [4 /*yield*/, collectionService.create(ctx, collectionInput)];
                    case 2:
                        duplicatedCollection = _d.sent();
                        return [2 /*return*/, duplicatedCollection];
                }
            });
        });
    },
});
