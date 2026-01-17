"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_METADATA = void 0;
exports.getEntitiesFromPlugins = getEntitiesFromPlugins;
exports.getModuleMetadata = getModuleMetadata;
exports.getPluginAPIExtensions = getPluginAPIExtensions;
exports.getPluginDashboardExtensions = getPluginDashboardExtensions;
exports.getCompatibility = getCompatibility;
exports.getConfigurationFunction = getConfigurationFunction;
exports.graphQLResolversFor = graphQLResolversFor;
exports.isDynamicModule = isDynamicModule;
var constants_1 = require("@nestjs/common/constants");
var shared_utils_1 = require("@vendure/common/lib/shared-utils");
exports.PLUGIN_METADATA = {
    CONFIGURATION: 'configuration',
    SHOP_API_EXTENSIONS: 'shopApiExtensions',
    ADMIN_API_EXTENSIONS: 'adminApiExtensions',
    ENTITIES: 'entities',
    COMPATIBILITY: 'compatibility',
    DASHBOARD: 'dashboard',
};
function getEntitiesFromPlugins(plugins) {
    if (!plugins) {
        return [];
    }
    return plugins
        .map(function (p) { return reflectMetadata(p, exports.PLUGIN_METADATA.ENTITIES); })
        .reduce(function (all, entities) {
        var resolvedEntities = typeof entities === 'function' ? entities() : (entities !== null && entities !== void 0 ? entities : []);
        return __spreadArray(__spreadArray([], all, true), resolvedEntities, true);
    }, []);
}
function getModuleMetadata(module) {
    return {
        controllers: Reflect.getMetadata(constants_1.MODULE_METADATA.CONTROLLERS, module) || [],
        providers: Reflect.getMetadata(constants_1.MODULE_METADATA.PROVIDERS, module) || [],
        imports: Reflect.getMetadata(constants_1.MODULE_METADATA.IMPORTS, module) || [],
        exports: Reflect.getMetadata(constants_1.MODULE_METADATA.EXPORTS, module) || [],
    };
}
function getPluginAPIExtensions(plugins, apiType) {
    var extensions = apiType === 'shop'
        ? plugins.map(function (p) { return reflectMetadata(p, exports.PLUGIN_METADATA.SHOP_API_EXTENSIONS); })
        : plugins.map(function (p) { return reflectMetadata(p, exports.PLUGIN_METADATA.ADMIN_API_EXTENSIONS); });
    return extensions.filter(shared_utils_1.notNullOrUndefined);
}
function getPluginDashboardExtensions(plugins) {
    return plugins.map(function (p) { return reflectMetadata(p, exports.PLUGIN_METADATA.DASHBOARD); }).filter(shared_utils_1.notNullOrUndefined);
}
function getCompatibility(plugin) {
    return reflectMetadata(plugin, exports.PLUGIN_METADATA.COMPATIBILITY);
}
function getConfigurationFunction(plugin) {
    return reflectMetadata(plugin, exports.PLUGIN_METADATA.CONFIGURATION);
}
function graphQLResolversFor(plugin, apiType) {
    var _a;
    var apiExtensions = apiType === 'shop'
        ? reflectMetadata(plugin, exports.PLUGIN_METADATA.SHOP_API_EXTENSIONS)
        : reflectMetadata(plugin, exports.PLUGIN_METADATA.ADMIN_API_EXTENSIONS);
    return apiExtensions
        ? typeof apiExtensions.resolvers === 'function'
            ? apiExtensions.resolvers()
            : ((_a = apiExtensions.resolvers) !== null && _a !== void 0 ? _a : [])
        : [];
}
function reflectMetadata(metatype, metadataKey) {
    if (isDynamicModule(metatype)) {
        return Reflect.getMetadata(metadataKey, metatype.module);
    }
    else {
        return Reflect.getMetadata(metadataKey, metatype);
    }
}
function isDynamicModule(input) {
    return !!input.module;
}
