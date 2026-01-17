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
exports.ScheduledTask = void 0;
var request_context_service_1 = require("../service/helpers/request-context/request-context.service");
var channel_service_1 = require("../service/services/channel.service");
/**
 * @description
 * Use this class to define a scheduled task that will be executed at a given cron schedule.
 *
 * @example
 * ```ts
 * import { ScheduledTask } from '\@vendure/core';
 *
 * const task = new ScheduledTask({
 *     id: 'test-job',
 *     schedule: cron => cron.every(2).minutes(),
 *     execute: async ({ injector, scheduledContext, params }) => {
 *         // some logic here
 *     },
 * });
 * ```
 *
 * @since 3.3.0
 * @docsCategory scheduled-tasks
 * @docsPage ScheduledTask
 * @docsWeight 0
 */
var ScheduledTask = /** @class */ (function () {
    function ScheduledTask(config) {
        this.config = config;
    }
    Object.defineProperty(ScheduledTask.prototype, "id", {
        get: function () {
            return this.config.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScheduledTask.prototype, "options", {
        get: function () {
            return this.config;
        },
        enumerable: false,
        configurable: true
    });
    ScheduledTask.prototype.execute = function (injector) {
        return __awaiter(this, void 0, void 0, function () {
            var requestContextService, channelService, defaultChannel, scheduledContext;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestContextService = injector.get(request_context_service_1.RequestContextService);
                        channelService = injector.get(channel_service_1.ChannelService);
                        return [4 /*yield*/, channelService.getDefaultChannel()];
                    case 1:
                        defaultChannel = _b.sent();
                        return [4 /*yield*/, requestContextService.create({
                                apiType: 'admin',
                                channelOrToken: defaultChannel,
                            })];
                    case 2:
                        scheduledContext = _b.sent();
                        return [2 /*return*/, this.config.execute({
                                injector: injector,
                                scheduledContext: scheduledContext,
                                params: (_a = this.config.params) !== null && _a !== void 0 ? _a : {},
                            })];
                }
            });
        });
    };
    /**
     * @description
     * This method allows you to further configure existing scheduled tasks. For example, you may
     * wish to change the schedule or timeout of a task, without having to define a new task.
     *
     * @example
     * ```ts
     * import { ScheduledTask } from '\@vendure/core';
     *
     * const task = new ScheduledTask({
     *     id: 'test-job',
     *     schedule: cron => cron.every(2).minutes(),
     *     execute: async ({ injector, scheduledContext, params }) => {
     *         // some logic here
     *     },
     * });
     *
     * // later, you can configure the task
     * task.configure({ schedule: cron => cron.every(5).minutes() });
     * ```
     */
    ScheduledTask.prototype.configure = function (additionalConfig) {
        if (additionalConfig.schedule) {
            this.config.schedule = additionalConfig.schedule;
        }
        if (additionalConfig.timeout) {
            this.config.timeout = additionalConfig.timeout;
        }
        if (additionalConfig.params) {
            this.config.params = additionalConfig.params;
        }
        return this;
    };
    return ScheduledTask;
}());
exports.ScheduledTask = ScheduledTask;
