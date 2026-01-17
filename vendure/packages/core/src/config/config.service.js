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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var config_helpers_1 = require("./config-helpers");
var vendure_logger_1 = require("./logger/vendure-logger");
var ConfigService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConfigService = _classThis = /** @class */ (function () {
        function ConfigService_1() {
            this.activeConfig = (0, config_helpers_1.getConfig)();
            if (this.activeConfig.authOptions.disableAuth) {
                // eslint-disable-next-line
                vendure_logger_1.Logger.warn('Auth has been disabled. This should never be the case for a production system!');
            }
        }
        Object.defineProperty(ConfigService_1.prototype, "apiOptions", {
            get: function () {
                return this.activeConfig.apiOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "authOptions", {
            get: function () {
                return this.activeConfig.authOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "catalogOptions", {
            get: function () {
                return this.activeConfig.catalogOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "defaultChannelToken", {
            get: function () {
                return this.activeConfig.defaultChannelToken;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "defaultLanguageCode", {
            get: function () {
                return this.activeConfig.defaultLanguageCode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "entityOptions", {
            get: function () {
                return this.activeConfig.entityOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "entityIdStrategy", {
            get: function () {
                return this.activeConfig.entityIdStrategy;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "assetOptions", {
            get: function () {
                return this.activeConfig.assetOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "dbConnectionOptions", {
            get: function () {
                return this.activeConfig.dbConnectionOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "promotionOptions", {
            get: function () {
                return this.activeConfig.promotionOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "shippingOptions", {
            get: function () {
                return this.activeConfig.shippingOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "orderOptions", {
            get: function () {
                return this.activeConfig.orderOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "paymentOptions", {
            get: function () {
                return this.activeConfig.paymentOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "taxOptions", {
            get: function () {
                return this.activeConfig.taxOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "importExportOptions", {
            get: function () {
                return this.activeConfig.importExportOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "customFields", {
            get: function () {
                if (!this.allCustomFieldsConfig) {
                    this.allCustomFieldsConfig = this.getCustomFieldsForAllEntities();
                }
                return this.allCustomFieldsConfig;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "plugins", {
            get: function () {
                return this.activeConfig.plugins;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "logger", {
            get: function () {
                return this.activeConfig.logger;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "jobQueueOptions", {
            get: function () {
                return this.activeConfig.jobQueueOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "schedulerOptions", {
            get: function () {
                return this.activeConfig.schedulerOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "systemOptions", {
            get: function () {
                return this.activeConfig.systemOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigService_1.prototype, "settingsStoreFields", {
            get: function () {
                var _a;
                return (_a = this.activeConfig.settingsStoreFields) !== null && _a !== void 0 ? _a : {};
            },
            enumerable: false,
            configurable: true
        });
        ConfigService_1.prototype.getCustomFieldsForAllEntities = function () {
            var definedCustomFields = this.activeConfig.customFields;
            var metadataArgsStorage = (0, typeorm_1.getMetadataArgsStorage)();
            // We need to check for any entities which have a "customFields" property but which are not
            // explicitly defined in the customFields config. This is because the customFields object
            // only includes the built-in entities. Any custom entities which have a "customFields"
            // must be dynamically added to the customFields object.
            if (Array.isArray(this.dbConnectionOptions.entities)) {
                for (var _i = 0, _a = this.dbConnectionOptions.entities; _i < _a.length; _i++) {
                    var entity = _a[_i];
                    if (typeof entity === 'function' && !definedCustomFields[entity.name]) {
                        var hasCustomFields = !!metadataArgsStorage
                            .filterEmbeddeds(entity)
                            .find(function (c) { return c.propertyName === 'customFields'; });
                        var isTranslationEntity = entity.name.endsWith('Translation') &&
                            metadataArgsStorage
                                .filterColumns(entity)
                                .find(function (c) { return c.propertyName === 'languageCode'; });
                        if (hasCustomFields && !isTranslationEntity) {
                            definedCustomFields[entity.name] = [];
                        }
                    }
                }
            }
            return definedCustomFields;
        };
        /**
         * This is a precaution against attempting to JSON.stringify() a reference to
         * this class, which can lead to a circular reference error.
         */
        ConfigService_1.prototype.toJSON = function () {
            return {};
        };
        return ConfigService_1;
    }());
    __setFunctionName(_classThis, "ConfigService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConfigService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConfigService = _classThis;
}();
exports.ConfigService = ConfigService;
