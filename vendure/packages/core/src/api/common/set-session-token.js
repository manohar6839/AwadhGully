"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSessionToken = setSessionToken;
var ms_1 = require("ms");
/**
 * Sets the authToken either as a cookie or as a response header, depending on the
 * config settings.
 */
function setSessionToken(options) {
    var sessionToken = options.sessionToken, rememberMe = options.rememberMe, authOptions = options.authOptions, req = options.req, res = options.res;
    var usingCookie = authOptions.tokenMethod === 'cookie' ||
        (Array.isArray(authOptions.tokenMethod) && authOptions.tokenMethod.includes('cookie'));
    var usingBearer = authOptions.tokenMethod === 'bearer' ||
        (Array.isArray(authOptions.tokenMethod) && authOptions.tokenMethod.includes('bearer'));
    if (usingCookie) {
        if (req.session) {
            if (rememberMe) {
                req.sessionOptions.maxAge = (0, ms_1.default)('1y');
            }
            req.session.token = sessionToken;
        }
    }
    if (usingBearer) {
        res.set(authOptions.authTokenHeaderKey, sessionToken);
    }
}
