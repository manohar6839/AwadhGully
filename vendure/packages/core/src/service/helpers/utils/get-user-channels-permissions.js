"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChannelsPermissions = getUserChannelsPermissions;
exports.getChannelPermissions = getChannelPermissions;
var unique_1 = require("@vendure/common/lib/unique");
/**
 * Returns an array of Channels and permissions on those Channels for the given User.
 */
function getUserChannelsPermissions(user) {
    return getChannelPermissions(user.roles);
}
/**
 * @description
 * Returns an array of Channels and permissions on those Channels for the given Roles.
 */
function getChannelPermissions(roles) {
    var channelsMap = {};
    for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
        var role = roles_1[_i];
        for (var _a = 0, _b = role.channels; _a < _b.length; _a++) {
            var channel = _b[_a];
            if (!channelsMap[channel.code]) {
                channelsMap[channel.code] = {
                    id: channel.id,
                    token: channel.token,
                    code: channel.code,
                    permissions: [],
                };
            }
            channelsMap[channel.code].permissions = (0, unique_1.unique)(__spreadArray(__spreadArray([], channelsMap[channel.code].permissions, true), role.permissions, true));
        }
    }
    return Object.values(channelsMap).sort(function (a, b) { return (a.id < b.id ? -1 : 1); });
}
