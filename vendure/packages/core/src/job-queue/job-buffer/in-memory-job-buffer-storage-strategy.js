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
exports.InMemoryJobBufferStorageStrategy = void 0;
/**
 * @description
 * A {@link JobBufferStorageStrategy} which keeps the buffered jobs in memory. Should
 * _not_ be used in production, since it will lose data in the event of the server
 * stopping.
 *
 * Instead, use the {@link DefaultJobQueuePlugin} with the `useDatabaseForBuffer: true` option set,
 * or the {@link BullMQJobQueuePlugin} or another custom strategy with persistent storage.
 *
 * @since 1.3.0
 * @docsCategory JobQueue
 */
var InMemoryJobBufferStorageStrategy = /** @class */ (function () {
    function InMemoryJobBufferStorageStrategy() {
        this.bufferStorage = new Map();
    }
    InMemoryJobBufferStorageStrategy.prototype.add = function (bufferId, job) {
        return __awaiter(this, void 0, void 0, function () {
            var set;
            return __generator(this, function (_a) {
                set = this.getSet(bufferId);
                set.add(job);
                return [2 /*return*/, job];
            });
        });
    };
    InMemoryJobBufferStorageStrategy.prototype.bufferSize = function (bufferIds) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, result, _i, ids_1, id, size;
            var _a, _b;
            return __generator(this, function (_c) {
                ids = bufferIds !== null && bufferIds !== void 0 ? bufferIds : Array.from(this.bufferStorage.keys());
                result = {};
                for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                    id = ids_1[_i];
                    size = (_b = (_a = this.bufferStorage.get(id)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
                    result[id] = size;
                }
                return [2 /*return*/, result];
            });
        });
    };
    InMemoryJobBufferStorageStrategy.prototype.flush = function (bufferIds) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, result, _i, ids_2, id, jobs;
            var _a, _b;
            return __generator(this, function (_c) {
                ids = bufferIds !== null && bufferIds !== void 0 ? bufferIds : Array.from(this.bufferStorage.keys());
                result = {};
                for (_i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
                    id = ids_2[_i];
                    jobs = Array.from((_a = this.bufferStorage.get(id)) !== null && _a !== void 0 ? _a : []);
                    (_b = this.bufferStorage.get(id)) === null || _b === void 0 ? void 0 : _b.clear();
                    result[id] = jobs;
                }
                return [2 /*return*/, result];
            });
        });
    };
    InMemoryJobBufferStorageStrategy.prototype.getSet = function (bufferId) {
        var set = this.bufferStorage.get(bufferId);
        if (set) {
            return set;
        }
        else {
            var newSet = new Set();
            this.bufferStorage.set(bufferId, newSet);
            return newSet;
        }
    };
    return InMemoryJobBufferStorageStrategy;
}());
exports.InMemoryJobBufferStorageStrategy = InMemoryJobBufferStorageStrategy;
