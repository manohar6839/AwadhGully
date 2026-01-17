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
exports.EntitySlugService = void 0;
var common_1 = require("@nestjs/common");
var errors_1 = require("../../common/error/errors");
/**
 * @description
 * A service that handles slug generation for entities, ensuring uniqueness
 * and handling conflicts by appending numbers.
 *
 * @docsCategory services
 * @since 3.5.0
 */
var EntitySlugService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EntitySlugService = _classThis = /** @class */ (function () {
        function EntitySlugService_1(slugService, connection) {
            this.slugService = slugService;
            this.connection = connection;
        }
        /**
         * @description
         * Generates a slug from input value for an entity, ensuring uniqueness.
         * Automatically detects if the field exists on the base entity or its translation entity.
         *
         * @param ctx The request context
         * @param params Parameters for slug generation
         * @returns A unique slug string
         */
        EntitySlugService_1.prototype.generateSlugFromInput = function (ctx, params) {
            return __awaiter(this, void 0, void 0, function () {
                var entityName, fieldName, inputValue, entityId, baseSlug, _a, entityMetadata, resolvedColumnName, isTranslationEntity, ownerRelationColumnName, repository, slug, counter, exclusionConfig;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            entityName = params.entityName, fieldName = params.fieldName, inputValue = params.inputValue, entityId = params.entityId;
                            return [4 /*yield*/, this.slugService.generate(ctx, {
                                    value: inputValue,
                                    entityName: entityName,
                                    fieldName: fieldName,
                                })];
                        case 1:
                            baseSlug = _b.sent();
                            if (!baseSlug) {
                                return [2 /*return*/, baseSlug];
                            }
                            _a = this.findEntityWithField(entityName, fieldName), entityMetadata = _a.entityMetadata, resolvedColumnName = _a.resolvedColumnName, isTranslationEntity = _a.isTranslationEntity, ownerRelationColumnName = _a.ownerRelationColumnName;
                            repository = this.connection.getRepository(ctx, entityMetadata.target);
                            slug = baseSlug;
                            counter = 1;
                            exclusionConfig = isTranslationEntity && entityId && ownerRelationColumnName
                                ? { columnName: ownerRelationColumnName, value: entityId }
                                : entityId
                                    ? { columnName: 'id', value: entityId }
                                    : undefined;
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.fieldValueExists(ctx, repository, resolvedColumnName, slug, exclusionConfig)];
                        case 3:
                            if (!_b.sent()) return [3 /*break*/, 4];
                            slug = "".concat(baseSlug, "-").concat(counter);
                            counter++;
                            return [3 /*break*/, 2];
                        case 4: return [2 /*return*/, slug];
                    }
                });
            });
        };
        /**
         * @description
         * Finds the entity metadata for the given entity name and field name.
         * If the field doesn't exist on the base entity, it checks the translation entity.
         *
         * @param entityName The base entity name
         * @param fieldName The field name to find
         * @returns Object containing entityMetadata, actualEntityName, resolvedColumnName, and isTranslationEntity
         */
        EntitySlugService_1.prototype.findEntityWithField = function (entityName, fieldName) {
            var _a, _b;
            // First, try to find the base entity
            var entityMetadata = this.connection.rawConnection.entityMetadatas.find(function (metadata) { return metadata.name === entityName; });
            if (!entityMetadata) {
                throw new errors_1.UserInputError("error.entity-not-found", {
                    entityName: entityName,
                });
            }
            // Check if the field exists on the base entity
            var baseEntityColumn = entityMetadata.columns.find(function (col) { return col.propertyName === fieldName; });
            if (baseEntityColumn) {
                return {
                    entityMetadata: entityMetadata,
                    actualEntityName: entityName,
                    resolvedColumnName: baseEntityColumn.databaseName,
                    isTranslationEntity: false,
                };
            }
            // If field doesn't exist on base entity, try to find the translation entity through relations
            var translationRelation = entityMetadata.relations.find(function (r) { return r.propertyName === 'translations'; });
            if (!translationRelation) {
                throw new errors_1.UserInputError("error.entity-has-no-field", {
                    entityName: entityName,
                    fieldName: fieldName,
                });
            }
            // Get the translation entity metadata from the relation
            var translationMetadata = this.connection.rawConnection.getMetadata(translationRelation.type);
            if (!translationMetadata) {
                throw new errors_1.UserInputError("error.entity-has-no-field", {
                    entityName: entityName,
                    fieldName: fieldName,
                });
            }
            var translationColumn = translationMetadata.columns.find(function (col) { return col.propertyName === fieldName; });
            if (translationColumn) {
                // Find the owner relation column (e.g., 'baseId', 'productId', etc.)
                var ownerRelation = translationMetadata.relations.find(function (r) { return r.type === entityMetadata.target; });
                var ownerColumnName = ((_b = (_a = ownerRelation === null || ownerRelation === void 0 ? void 0 : ownerRelation.joinColumns) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.databaseName) || 'baseId';
                return {
                    entityMetadata: translationMetadata,
                    actualEntityName: translationMetadata.name,
                    resolvedColumnName: translationColumn.databaseName,
                    isTranslationEntity: true,
                    ownerRelationColumnName: ownerColumnName,
                };
            }
            throw new errors_1.UserInputError("error.entity-has-no-field", {
                entityName: entityName,
                fieldName: fieldName,
            });
        };
        EntitySlugService_1.prototype.fieldValueExists = function (_ctx, repository, resolvedColumnName, value, exclusionConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = repository
                                .createQueryBuilder('entity')
                                .where("entity.".concat(resolvedColumnName, " = :value"), { value: value });
                            if (exclusionConfig) {
                                qb.andWhere("entity.".concat(exclusionConfig.columnName, " != :excludeValue"), {
                                    excludeValue: exclusionConfig.value,
                                });
                            }
                            return [4 /*yield*/, qb.getCount()];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, count > 0];
                    }
                });
            });
        };
        return EntitySlugService_1;
    }());
    __setFunctionName(_classThis, "EntitySlugService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EntitySlugService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EntitySlugService = _classThis;
}();
exports.EntitySlugService = EntitySlugService;
