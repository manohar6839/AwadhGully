"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENDURE_ADMIN_API_TYPE_PATHS = exports.VENDURE_SHOP_API_TYPE_PATHS = void 0;
var path_1 = require("path");
exports.VENDURE_SHOP_API_TYPE_PATHS = ['shop-api', 'common'].map(function (p) {
    return path_1.default.join(__dirname, 'schema', p, '*.graphql');
});
exports.VENDURE_ADMIN_API_TYPE_PATHS = ['admin-api', 'common'].map(function (p) {
    return path_1.default.join(__dirname, 'schema', p, '*.graphql');
});
