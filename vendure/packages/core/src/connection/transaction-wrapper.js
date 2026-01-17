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
exports.TransactionWrapper = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var TransactionAlreadyStartedError_1 = require("typeorm/error/TransactionAlreadyStartedError");
var constants_1 = require("../common/constants");
/**
 * @description
 * This helper class is used to wrap operations in a TypeORM transaction in order to ensure
 * atomic operations on the database.
 */
var TransactionWrapper = /** @class */ (function () {
    function TransactionWrapper() {
    }
    /**
     * @description
     * Executes the `work` function within the context of a transaction. If the `work` function
     * resolves / completes, then all the DB operations it contains will be committed. If it
     * throws an error or rejects, then all DB operations will be rolled back.
     *
     * @note
     * This function does not mutate your context. Instead, this function makes a copy and passes
     * context to work function.
     */
    TransactionWrapper.prototype.executeInTransaction = function (originalCtx, work, mode, isolationLevel, connection) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, entityManager, queryRunner, maxRetries_1, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = originalCtx.copy();
                        entityManager = ctx[constants_1.TRANSACTION_MANAGER_KEY];
                        queryRunner = entityManager === null || entityManager === void 0 ? void 0 : entityManager.queryRunner;
                        if (!queryRunner || queryRunner.isReleased) {
                            queryRunner = connection.createQueryRunner();
                        }
                        if (!(mode === 'auto')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.startTransaction(queryRunner, isolationLevel)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        ctx[constants_1.TRANSACTION_MANAGER_KEY] = queryRunner.manager;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, 10, 13]);
                        maxRetries_1 = 5;
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, rxjs_1.from)(work(ctx)).pipe((0, operators_1.retryWhen)(function (errors) {
                                return errors.pipe((0, operators_1.tap)(function (err) {
                                    if (!_this.isRetriableError(err)) {
                                        throw err;
                                    }
                                }), (0, operators_1.take)(maxRetries_1));
                            })))];
                    case 4:
                        result = _a.sent();
                        if (!queryRunner.isTransactionActive) return [3 /*break*/, 6];
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, result];
                    case 7:
                        error_1 = _a.sent();
                        if (!queryRunner.isTransactionActive) return [3 /*break*/, 9];
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: throw error_1;
                    case 10:
                        if (!(!queryRunner.isTransactionActive && queryRunner.isReleased === false)) return [3 /*break*/, 12];
                        // There is a check for an active transaction
                        // because this could be a nested transaction (savepoint).
                        return [4 /*yield*/, queryRunner.release()];
                    case 11:
                        // There is a check for an active transaction
                        // because this could be a nested transaction (savepoint).
                        _a.sent();
                        _a.label = 12;
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Attempts to start a DB transaction, with retry logic in the case that a transaction
     * is already started for the connection (which is mainly a problem with SQLite/Sql.js)
     */
    TransactionWrapper.prototype.startTransaction = function (queryRunner, isolationLevel) {
        return __awaiter(this, void 0, void 0, function () {
            // Returns false if a transaction is already in progress
            function attemptStartTransaction() {
                return __awaiter(this, void 0, void 0, function () {
                    var err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, queryRunner.startTransaction(isolationLevel)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, true];
                            case 2:
                                err_1 = _a.sent();
                                lastError = err_1;
                                if (err_1 instanceof TransactionAlreadyStartedError_1.TransactionAlreadyStartedError) {
                                    return [2 /*return*/, false];
                                }
                                throw err_1;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
            var maxRetries, attempts, lastError, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxRetries = 25;
                        attempts = 0;
                        _a.label = 1;
                    case 1:
                        if (!(attempts < maxRetries)) return [3 /*break*/, 4];
                        return [4 /*yield*/, attemptStartTransaction()];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/];
                        }
                        attempts++;
                        // insert an increasing delay before retrying
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, attempts * 20); })];
                    case 3:
                        // insert an increasing delay before retrying
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4: throw lastError;
                }
            });
        });
    };
    /**
     * If the resolver function throws an error, there are certain cases in which
     * we want to retry the whole thing again - notably in the case of a deadlock
     * situation, which can usually be retried with success.
     */
    TransactionWrapper.prototype.isRetriableError = function (err) {
        var mysqlDeadlock = err.code === 'ER_LOCK_DEADLOCK';
        var postgresDeadlock = err.code === 'deadlock_detected';
        return mysqlDeadlock || postgresDeadlock;
    };
    return TransactionWrapper;
}());
exports.TransactionWrapper = TransactionWrapper;
