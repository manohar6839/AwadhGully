"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrefix = getPrefix;
function getPrefix(options) {
    var _a, _b;
    return (_b = (_a = options.workerOptions) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : 'bull';
}
//# sourceMappingURL=utils.js.map