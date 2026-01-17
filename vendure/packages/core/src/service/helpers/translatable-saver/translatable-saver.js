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
exports.TranslatableSaver = void 0;
var common_1 = require("@nestjs/common");
var omit_1 = require("@vendure/common/lib/omit");
var patch_entity_1 = require("../utils/patch-entity");
var translation_differ_1 = require("./translation-differ");
/**
 * @description
 * A helper which contains methods for creating and updating entities which implement the {@link Translatable} interface.
 *
 * @example
 * ```ts
 * export class MyService {
 *   constructor(private translatableSaver: TranslatableSaver) {}
 *
 *   async create(ctx: RequestContext, input: CreateFacetInput): Promise<Translated<Facet>> {
 *     const facet = await this.translatableSaver.create({
 *       ctx,
 *       input,
 *       entityType: Facet,
 *       translationType: FacetTranslation,
 *       beforeSave: async f => {
 *           f.code = await this.ensureUniqueCode(ctx, f.code);
 *       },
 *     });
 *     return facet;
 *   }
 *
 *   // ...
 * }
 * ```
 *
 * @docsCategory service-helpers
 */
var TranslatableSaver = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TranslatableSaver = _classThis = /** @class */ (function () {
        function TranslatableSaver_1(connection) {
            this.connection = connection;
        }
        /**
         * @description
         * Create a translatable entity, including creating any translation entities according
         * to the `translations` array.
         */
        TranslatableSaver_1.prototype.create = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, entityType, translationType, input, beforeSave, typeOrmSubscriberData, entity, translations, _i, _a, translationInput, translation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            ctx = options.ctx, entityType = options.entityType, translationType = options.translationType, input = options.input, beforeSave = options.beforeSave, typeOrmSubscriberData = options.typeOrmSubscriberData;
                            entity = new entityType(input);
                            translations = [];
                            if (!input.translations) return [3 /*break*/, 4];
                            _i = 0, _a = input.translations;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            translationInput = _a[_i];
                            translation = new translationType(translationInput);
                            translations.push(translation);
                            return [4 /*yield*/, this.connection.getRepository(ctx, translationType).save(translation)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            entity.translations = translations;
                            if (!(typeof beforeSave === 'function')) return [3 /*break*/, 6];
                            return [4 /*yield*/, beforeSave(entity)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6: return [4 /*yield*/, this.connection
                                .getRepository(ctx, entityType)
                                .save(entity, { data: typeOrmSubscriberData })];
                        case 7: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        /**
         * @description
         * Update a translatable entity. Performs a diff of the `translations` array in order to
         * perform the correct operation on the translations.
         */
        TranslatableSaver_1.prototype.update = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var ctx, entityType, translationType, input, beforeSave, typeOrmSubscriberData, existingTranslations, differ, diff, entity, updatedEntity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ctx = options.ctx, entityType = options.entityType, translationType = options.translationType, input = options.input, beforeSave = options.beforeSave, typeOrmSubscriberData = options.typeOrmSubscriberData;
                            return [4 /*yield*/, this.connection.getRepository(ctx, translationType).find({
                                    relationLoadStrategy: 'query',
                                    loadEagerRelations: false,
                                    where: { base: { id: input.id } },
                                    relations: ['base'],
                                })];
                        case 1:
                            existingTranslations = _a.sent();
                            differ = new translation_differ_1.TranslationDiffer(translationType, this.connection);
                            diff = differ.diff(existingTranslations, input.translations);
                            return [4 /*yield*/, differ.applyDiff(ctx, new entityType(__assign(__assign({}, input), { translations: existingTranslations })), diff)];
                        case 2:
                            entity = _a.sent();
                            entity.updatedAt = new Date();
                            updatedEntity = (0, patch_entity_1.patchEntity)(entity, (0, omit_1.omit)(input, ['translations']));
                            if (!(typeof beforeSave === 'function')) return [3 /*break*/, 4];
                            return [4 /*yield*/, beforeSave(entity)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, this.connection
                                .getRepository(ctx, entityType)
                                .save(updatedEntity, { data: typeOrmSubscriberData })];
                    }
                });
            });
        };
        return TranslatableSaver_1;
    }());
    __setFunctionName(_classThis, "TranslatableSaver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TranslatableSaver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TranslatableSaver = _classThis;
}();
exports.TranslatableSaver = TranslatableSaver;
