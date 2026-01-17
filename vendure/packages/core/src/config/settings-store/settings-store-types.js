"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsStoreScopes = void 0;
/**
 * @description
 * Pre-built scope functions for common scoping patterns.
 *
 * @example
 * ```ts
 * const config: VendureConfig = {
 *   settingsStoreFields: {
 *     dashboard: [
 *       {
 *         name: 'theme',
 *         scope: SettingsStoreScopes.user, // User-specific
 *       },
 *       {
 *         name: 'currency',
 *         scope: SettingsStoreScopes.channel, // Channel-specific
 *       },
 *       {
 *         name: 'tableFilters',
 *         scope: SettingsStoreScopes.userAndChannel, // User-specific per channel
 *       }
 *     ]
 *   }
 * };
 * ```
 *
 * @docsCategory SettingsStore
 * @since 3.4.0
 */
exports.SettingsStoreScopes = {
    /**
     * @description
     * Global scoping - no isolation, single value for all users and channels.
     */
    global: function () { return ''; },
    /**
     * @description
     * User-specific scoping - separate values per user.
     */
    user: function (_a) {
        var ctx = _a.ctx;
        return "user:".concat(ctx.activeUserId || 'unknown');
    },
    /**
     * @description
     * Channel-specific scoping - separate values per channel.
     */
    channel: function (_a) {
        var ctx = _a.ctx;
        return "channel:".concat(ctx.channelId || 'unknown');
    },
    /**
     * @description
     * User and channel specific scoping - separate values per user per channel.
     */
    userAndChannel: function (_a) {
        var ctx = _a.ctx;
        return "user:".concat(ctx.activeUserId || '', ":channel:").concat(ctx.channelId || '');
    },
};
