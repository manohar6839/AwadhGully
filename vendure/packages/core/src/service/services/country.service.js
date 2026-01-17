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
exports.CountryService = void 0;
var common_1 = require("@nestjs/common");
var generated_types_1 = require("@vendure/common/lib/generated-types");
var errors_1 = require("../../common/error/errors");
var instrument_decorator_1 = require("../../common/instrument-decorator");
var utils_1 = require("../../common/utils");
var entity_1 = require("../../entity");
var country_entity_1 = require("../../entity/region/country.entity");
var region_translation_entity_1 = require("../../entity/region/region-translation.entity");
var country_event_1 = require("../../event-bus/events/country-event");
/**
 * @description
 * Contains methods relating to {@link Country} entities.
 *
 * @docsCategory services
 */
var CountryService = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, instrument_decorator_1.Instrument)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CountryService = _classThis = /** @class */ (function () {
        function CountryService_1(connection, listQueryBuilder, translatableSaver, eventBus, translator) {
            this.connection = connection;
            this.listQueryBuilder = listQueryBuilder;
            this.translatableSaver = translatableSaver;
            this.eventBus = eventBus;
            this.translator = translator;
        }
        CountryService_1.prototype.findAll = function (ctx, options, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            return this.listQueryBuilder
                .build(country_entity_1.Country, options, { ctx: ctx, relations: relations })
                .getManyAndCount()
                .then(function (_a) {
                var countries = _a[0], totalItems = _a[1];
                var items = countries.map(function (country) { return _this.translator.translate(country, ctx); });
                return {
                    items: items,
                    totalItems: totalItems,
                };
            });
        };
        CountryService_1.prototype.findOne = function (ctx, countryId, relations) {
            var _this = this;
            if (relations === void 0) { relations = []; }
            return this.connection
                .getRepository(ctx, country_entity_1.Country)
                .findOne({ where: { id: countryId }, relations: relations })
                .then(function (country) { var _a; return (_a = (country && _this.translator.translate(country, ctx))) !== null && _a !== void 0 ? _a : undefined; });
        };
        /**
         * @description
         * Returns an array of enabled Countries, intended for use in a public-facing (ie. Shop) API.
         */
        CountryService_1.prototype.findAllAvailable = function (ctx) {
            var _this = this;
            return this.connection
                .getRepository(ctx, country_entity_1.Country)
                .find({ where: { enabled: true } })
                .then(function (items) { return items.map(function (country) { return _this.translator.translate(country, ctx); }); });
        };
        /**
         * @description
         * Returns a Country based on its ISO country code.
         */
        CountryService_1.prototype.findOneByCode = function (ctx, countryCode) {
            return __awaiter(this, void 0, void 0, function () {
                var country;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getRepository(ctx, country_entity_1.Country).findOne({
                                where: {
                                    code: countryCode,
                                },
                            })];
                        case 1:
                            country = _a.sent();
                            if (!country) {
                                throw new errors_1.UserInputError('error.country-code-not-valid', { countryCode: countryCode });
                            }
                            return [2 /*return*/, this.translator.translate(country, ctx)];
                    }
                });
            });
        };
        CountryService_1.prototype.create = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var country;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.create({
                                ctx: ctx,
                                input: input,
                                entityType: country_entity_1.Country,
                                translationType: region_translation_entity_1.RegionTranslation,
                            })];
                        case 1:
                            country = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new country_event_1.CountryEvent(ctx, country, 'created', input))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, country.id))];
                    }
                });
            });
        };
        CountryService_1.prototype.update = function (ctx, input) {
            return __awaiter(this, void 0, void 0, function () {
                var country;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.translatableSaver.update({
                                ctx: ctx,
                                input: input,
                                entityType: country_entity_1.Country,
                                translationType: region_translation_entity_1.RegionTranslation,
                            })];
                        case 1:
                            country = _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new country_event_1.CountryEvent(ctx, country, 'updated', input))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, (0, utils_1.assertFound)(this.findOne(ctx, country.id))];
                    }
                });
            });
        };
        CountryService_1.prototype.delete = function (ctx, id) {
            return __awaiter(this, void 0, void 0, function () {
                var country, addressesUsingCountry, deletedCountry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.getEntityOrThrow(ctx, country_entity_1.Country, id)];
                        case 1:
                            country = _a.sent();
                            return [4 /*yield*/, this.connection
                                    .getRepository(ctx, entity_1.Address)
                                    .createQueryBuilder('address')
                                    .where('address.country = :id', { id: id })
                                    .getCount()];
                        case 2:
                            addressesUsingCountry = _a.sent();
                            if (!(0 < addressesUsingCountry)) return [3 /*break*/, 3];
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.NOT_DELETED,
                                    message: ctx.translate('message.country-used-in-addresses', { count: addressesUsingCountry }),
                                }];
                        case 3:
                            deletedCountry = new country_entity_1.Country(country);
                            return [4 /*yield*/, this.connection.getRepository(ctx, country_entity_1.Country).remove(country)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.eventBus.publish(new country_event_1.CountryEvent(ctx, deletedCountry, 'deleted', id))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {
                                    result: generated_types_1.DeletionResult.DELETED,
                                    message: '',
                                }];
                    }
                });
            });
        };
        return CountryService_1;
    }());
    __setFunctionName(_classThis, "CountryService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CountryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CountryService = _classThis;
}();
exports.CountryService = CountryService;
