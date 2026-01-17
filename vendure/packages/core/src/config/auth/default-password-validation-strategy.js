"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPasswordValidationStrategy = void 0;
/**
 * @description
 * The DefaultPasswordValidationStrategy allows you to specify a minimum length and/or
 * a regular expression to match passwords against. The default `maxLength` is `72`.
 *
 * TODO:
 * By default, the `minLength` will be set to `4`. This is rather permissive and is only
 * this way in order to reduce the risk of backward-compatibility breaks. In the next major version
 * this default will be made more strict.
 *
 * @docsCategory auth
 * @since 1.5.0
 */
var DefaultPasswordValidationStrategy = /** @class */ (function () {
    function DefaultPasswordValidationStrategy(options) {
        this.options = options;
    }
    DefaultPasswordValidationStrategy.prototype.validate = function (ctx, password) {
        var _a = this.options, minLength = _a.minLength, maxLength = _a.maxLength, regexp = _a.regexp;
        if (minLength != null) {
            if (password.length < minLength) {
                return false;
            }
        }
        if (maxLength != null) {
            if (password.length > maxLength) {
                return false;
            }
        }
        if (regexp != null) {
            if (!regexp.test(password)) {
                return false;
            }
        }
        return true;
    };
    return DefaultPasswordValidationStrategy;
}());
exports.DefaultPasswordValidationStrategy = DefaultPasswordValidationStrategy;
