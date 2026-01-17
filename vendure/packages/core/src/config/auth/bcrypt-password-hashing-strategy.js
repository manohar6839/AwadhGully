"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordHashingStrategy = void 0;
var SALT_ROUNDS = 12;
/**
 * @description
 * A hashing strategy which uses bcrypt (https://en.wikipedia.org/wiki/Bcrypt) to hash plaintext password strings.
 *
 * @docsCategory auth
 * @since 1.3.0
 */
var BcryptPasswordHashingStrategy = /** @class */ (function () {
    function BcryptPasswordHashingStrategy() {
    }
    BcryptPasswordHashingStrategy.prototype.hash = function (plaintext) {
        this.getBcrypt();
        return this.bcrypt.hash(plaintext, SALT_ROUNDS);
    };
    BcryptPasswordHashingStrategy.prototype.check = function (plaintext, hash) {
        this.getBcrypt();
        return this.bcrypt.compare(plaintext, hash);
    };
    BcryptPasswordHashingStrategy.prototype.getBcrypt = function () {
        if (!this.bcrypt) {
            // The bcrypt lib is lazily loaded so that if we want to run Vendure
            // in an environment that does not support native Node modules
            // (such as an online sandbox like Stackblitz) the bcrypt dependency
            // does not get loaded when linking the source files on startup.
            this.bcrypt = require('bcrypt');
        }
    };
    return BcryptPasswordHashingStrategy;
}());
exports.BcryptPasswordHashingStrategy = BcryptPasswordHashingStrategy;
