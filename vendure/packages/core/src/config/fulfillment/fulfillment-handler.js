"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentHandler = void 0;
var configurable_operation_1 = require("../../common/configurable-operation");
/**
 * @description
 * A FulfillmentHandler is used when creating a new {@link Fulfillment}. When the `addFulfillmentToOrder` mutation
 * is executed, the specified handler will be used and it's `createFulfillment` method is called. This method
 * may perform async tasks such as calling a 3rd-party shipping API to register a new shipment and receive
 * a tracking code. This data can then be returned and will be incorporated into the created Fulfillment.
 *
 * If the `args` property is defined, this means that arguments passed to the `addFulfillmentToOrder` mutation
 * will be passed through to the `createFulfillment` method as the last argument.
 *
 * @example
 * ```ts
 * let shipomatic;
 *
 * export const shipomaticFulfillmentHandler = new FulfillmentHandler({
 *   code: 'ship-o-matic',
 *   description: [{
 *     languageCode: LanguageCode.en,
 *     value: 'Generate tracking codes via the Ship-o-matic API'
 *   }],
 *
 *   args: {
 *     preferredService: {
 *       type: 'string',
 *       ui: {
           component: 'select-form-input',
 *         options: [
 *           { value: 'first_class' },
 *           { value: 'priority'},
 *           { value: 'standard' },
 *         ],
 *       },
 *     }
 *   },
 *
 *   init: () => {
 *     // some imaginary shipping service
 *     shipomatic = new ShipomaticClient(API_KEY);
 *   },
 *
 *   createFulfillment: async (ctx, orders, lines, args) => {
 *
 *      const shipment = getShipmentFromOrders(orders, lines);
 *
 *      try {
 *        const transaction = await shipomatic.transaction.create({
 *          shipment,
 *          service_level: args.preferredService,
 *          label_file_type: 'png',
 *        })
 *
 *        return {
 *          method: `Ship-o-matic ${args.preferredService}`,
 *          trackingCode: transaction.tracking_code,
 *          customFields: {
 *            shippingTransactionId: transaction.id,
 *          }
 *        };
 *      } catch (e: any) {
 *        // Errors thrown from within this function will
 *        // result in a CreateFulfillmentError being returned
 *        throw e;
 *      }
 *   },
 *
 *   onFulfillmentTransition: async (fromState, toState, { fulfillment }) => {
 *     if (toState === 'Cancelled') {
 *       await shipomatic.transaction.cancel({
 *         transaction_id: fulfillment.customFields.shippingTransactionId,
 *       });
 *     }
 *   }
 * });
 * ```
 *
 * @docsCategory fulfillment
 * @docsPage FulfillmentHandler
 * @docsWeight 0
 */
var FulfillmentHandler = /** @class */ (function (_super) {
    __extends(FulfillmentHandler, _super);
    function FulfillmentHandler(config) {
        var _this = _super.call(this, config) || this;
        _this.createFulfillmentFn = config.createFulfillment;
        if (config.onFulfillmentTransition) {
            _this.onFulfillmentTransitionFn = config.onFulfillmentTransition;
        }
        return _this;
    }
    /**
     * @internal
     */
    FulfillmentHandler.prototype.createFulfillment = function (ctx, orders, lines, args) {
        return this.createFulfillmentFn(ctx, orders, lines, this.argsArrayToHash(args));
    };
    /**
     * @internal
     */
    FulfillmentHandler.prototype.onFulfillmentTransition = function (fromState, toState, data) {
        if (typeof this.onFulfillmentTransitionFn === 'function') {
            return this.onFulfillmentTransitionFn(fromState, toState, data);
        }
    };
    return FulfillmentHandler;
}(configurable_operation_1.ConfigurableOperationDef));
exports.FulfillmentHandler = FulfillmentHandler;
