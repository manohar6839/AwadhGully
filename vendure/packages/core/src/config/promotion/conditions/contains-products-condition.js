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
exports.containsProducts = void 0;
var generated_types_1 = require("@vendure/common/lib/generated-types");
var utils_1 = require("../../../common/utils");
var promotion_condition_1 = require("../promotion-condition");
exports.containsProducts = new promotion_condition_1.PromotionCondition({
    code: 'contains_products',
    description: [
        { languageCode: generated_types_1.LanguageCode.en, value: 'Buy at least { minimum } of the specified products' },
    ],
    args: {
        minimum: {
            type: 'int',
            defaultValue: 1,
            ui: { component: '', min: 0 },
        },
        productVariantIds: {
            type: 'ID',
            list: true,
            ui: { component: 'product-selector-form-input' },
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Product variants' }],
        },
    },
    check: function (ctx, order, args) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, matches, _i, _a, line;
            return __generator(this, function (_b) {
                ids = args.productVariantIds;
                matches = 0;
                for (_i = 0, _a = order.lines; _i < _a.length; _i++) {
                    line = _a[_i];
                    if (lineContainsIds(ids, line)) {
                        matches += line.quantity;
                    }
                }
                return [2 /*return*/, args.minimum <= matches];
            });
        });
    },
});
function lineContainsIds(ids, line) {
    return !!ids.find(function (id) { return (0, utils_1.idsAreEqual)(id, line.productVariant.id); });
}
