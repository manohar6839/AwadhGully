"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlInitializer = void 0;
const path_1 = __importDefault(require("path"));
class MysqlInitializer {
    async init(testFileName, connectionOptions) {
        const dbName = this.getDbNameFromFilename(testFileName);
        this.conn = await this.getMysqlConnection(connectionOptions);
        connectionOptions.database = dbName;
        connectionOptions.synchronize = true;
        await this.conn.query(`DROP DATABASE IF EXISTS ${dbName}`);
        await this.conn.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        return connectionOptions;
    }
    async populate(populateFn) {
        await populateFn();
    }
    async destroy() {
        await this.conn.end();
    }
    async getMysqlConnection(connectionOptions) {
        const { createConnection } = await import('mysql2/promise');
        const conn = createConnection({
            host: connectionOptions.host,
            port: connectionOptions.port,
            user: connectionOptions.username,
            password: connectionOptions.password,
        });
        return conn;
    }
    getDbNameFromFilename(filename) {
        return 'e2e_' + path_1.default.basename(filename).replace(/[^a-z0-9_]/gi, '_');
    }
}
exports.MysqlInitializer = MysqlInitializer;
//# sourceMappingURL=mysql-initializer.js.map