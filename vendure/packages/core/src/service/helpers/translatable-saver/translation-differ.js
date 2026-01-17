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
exports.TranslationDiffer = void 0;
var errors_1 = require("../../../common/error/errors");
var utils_1 = require("../../../common/utils");
/**
 * This class is to be used when performing an update on a Translatable entity.
 */
var TranslationDiffer = /** @class */ (function () {
    function TranslationDiffer(translationCtor, connection) {
        this.translationCtor = translationCtor;
        this.connection = connection;
    }
    /**
     * Compares the existing translations with the updated translations and produces a diff of
     * added, removed and updated translations.
     */
    TranslationDiffer.prototype.diff = function (existing, updated) {
        if (updated) {
            var translationEntities = this.translationInputsToEntities(updated, existing);
            var toAdd = translationEntities.filter((0, utils_1.not)((0, utils_1.foundIn)(existing, 'languageCode')));
            var toUpdate = translationEntities.filter((0, utils_1.foundIn)(existing, 'languageCode'));
            return { toUpdate: toUpdate, toAdd: toAdd };
        }
        else {
            return {
                toUpdate: [],
                toAdd: [],
            };
        }
    };
    TranslationDiffer.prototype.applyDiff = function (ctx_1, entity_1, _a) {
        return __awaiter(this, arguments, void 0, function (ctx, entity, _b) {
            var _loop_1, this_1, _i, toUpdate_1, translation, _c, toAdd_1, translation, newTranslation, err_1;
            var toUpdate = _b.toUpdate, toAdd = _b.toAdd;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!toUpdate.length) return [3 /*break*/, 4];
                        _loop_1 = function (translation) {
                            var updated, index;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, this_1.connection
                                            .getRepository(ctx, this_1.translationCtor)
                                            .save(translation)];
                                    case 1:
                                        updated = _e.sent();
                                        index = entity.translations.findIndex(function (t) { return t.languageCode === updated.languageCode; });
                                        entity.translations.splice(index, 1, updated);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, toUpdate_1 = toUpdate;
                        _d.label = 1;
                    case 1:
                        if (!(_i < toUpdate_1.length)) return [3 /*break*/, 4];
                        translation = toUpdate_1[_i];
                        return [5 /*yield**/, _loop_1(translation)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!toAdd.length) return [3 /*break*/, 11];
                        _c = 0, toAdd_1 = toAdd;
                        _d.label = 5;
                    case 5:
                        if (!(_c < toAdd_1.length)) return [3 /*break*/, 11];
                        translation = toAdd_1[_c];
                        translation.base = entity;
                        newTranslation = void 0;
                        _d.label = 6;
                    case 6:
                        _d.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.connection
                                .getRepository(ctx, this.translationCtor)
                                .save(translation)];
                    case 7:
                        newTranslation = _d.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _d.sent();
                        throw new errors_1.InternalServerError(err_1.message);
                    case 9:
                        entity.translations.push(newTranslation);
                        _d.label = 10;
                    case 10:
                        _c++;
                        return [3 /*break*/, 5];
                    case 11: return [2 /*return*/, entity];
                }
            });
        });
    };
    TranslationDiffer.prototype.translationInputsToEntities = function (inputs, existing) {
        var _this = this;
        return inputs.map(function (input) {
            var counterpart = existing.find(function (e) { return e.languageCode === input.languageCode; });
            // any cast below is required due to TS issue: https://github.com/Microsoft/TypeScript/issues/21592
            var entity = new _this.translationCtor(input);
            if (counterpart) {
                entity.id = counterpart.id;
                entity.base = counterpart.base;
            }
            return entity;
        });
    };
    return TranslationDiffer;
}());
exports.TranslationDiffer = TranslationDiffer;
