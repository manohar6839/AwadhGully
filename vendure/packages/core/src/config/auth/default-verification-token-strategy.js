"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultVerificationTokenStrategy = void 0;
var ms_1 = require("ms");
var generate_public_id_1 = require("../../common/generate-public-id");
var config_service_1 = require("../config.service");
/**
 * @description
 * The default VerificationTokenStrategy which generates a token consisting of the
 * base64-encoded current time concatenated with a random id. The token is considered
 * valid if the current time is within the configured `verificationTokenDuration` of the
 * time encoded in the token.
 *
 * @docsCategory auth
 * @since 3.2.0
 */
var DefaultVerificationTokenStrategy = /** @class */ (function () {
    function DefaultVerificationTokenStrategy() {
    }
    DefaultVerificationTokenStrategy.prototype.init = function (injector) {
        this.configService = injector.get(config_service_1.ConfigService);
    };
    /**
     * Generates a verification token which encodes the time of generation and concatenates it with a
     * random id.
     */
    DefaultVerificationTokenStrategy.prototype.generateVerificationToken = function (_ctx) {
        var now = new Date();
        var base64Now = Buffer.from(now.toJSON()).toString('base64');
        var id = (0, generate_public_id_1.generatePublicId)();
        return "".concat(base64Now, "_").concat(id);
    };
    /**
     * Checks the age of the verification token to see if it falls within the token duration
     * as specified in the VendureConfig.
     */
    DefaultVerificationTokenStrategy.prototype.verifyVerificationToken = function (_ctx, token) {
        var verificationTokenDuration = this.configService.authOptions.verificationTokenDuration;
        var verificationTokenDurationInMs = typeof verificationTokenDuration === 'string'
            ? (0, ms_1.default)(verificationTokenDuration)
            : verificationTokenDuration;
        var generatedOn = token.split('_')[0];
        var dateString = Buffer.from(generatedOn, 'base64').toString();
        var date = new Date(dateString);
        var elapsed = +new Date() - +date;
        return elapsed < verificationTokenDurationInMs;
    };
    return DefaultVerificationTokenStrategy;
}());
exports.DefaultVerificationTokenStrategy = DefaultVerificationTokenStrategy;
