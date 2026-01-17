"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSessionToken = extractSessionToken;
/**
 * Get the session token from either the cookie or the Authorization header, depending
 * on the configured tokenMethod.
 */
function extractSessionToken(req, tokenMethod) {
    var tokenFromCookie = getFromCookie(req);
    var tokenFromHeader = getFromHeader(req);
    if (tokenMethod === 'cookie') {
        return tokenFromCookie;
    }
    else if (tokenMethod === 'bearer') {
        return tokenFromHeader;
    }
    if (tokenMethod.includes('cookie') && tokenFromCookie) {
        return tokenFromCookie;
    }
    if (tokenMethod.includes('bearer') && tokenFromHeader) {
        return tokenFromHeader;
    }
}
function getFromCookie(req) {
    if (req.session && req.session.token) {
        return req.session.token;
    }
}
function getFromHeader(req) {
    var authHeader = req.get('Authorization');
    if (authHeader) {
        var matches = authHeader.trim().match(/^bearer\s(.+)$/i);
        if (matches) {
            return matches[1];
        }
    }
}
