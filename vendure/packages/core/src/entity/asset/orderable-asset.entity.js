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
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderableAsset = void 0;
var typeorm_1 = require("typeorm");
var asset_entity_1 = require("../asset/asset.entity");
var base_entity_1 = require("../base/base.entity");
/**
 * @description
 * This base class is extended in order to enable specific ordering of the one-to-many
 * Entity -> Assets relation. Using a many-to-many relation does not provide a way
 * to guarantee order of the Assets, so this entity is used in place of the
 * usual join table that would be created by TypeORM.
 * See https://typeorm.io/#/many-to-many-relations/many-to-many-relations-with-custom-properties
 *
 * @docsCategory entities
 */
var OrderableAsset = function () {
    var _a;
    var _classSuper = base_entity_1.VendureEntity;
    var _assetId_decorators;
    var _assetId_initializers = [];
    var _assetId_extraInitializers = [];
    var _asset_decorators;
    var _asset_initializers = [];
    var _asset_extraInitializers = [];
    var _position_decorators;
    var _position_initializers = [];
    var _position_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(OrderableAsset, _super);
            function OrderableAsset(input) {
                var _this = _super.call(this, input) || this;
                _this.assetId = __runInitializers(_this, _assetId_initializers, void 0);
                _this.asset = (__runInitializers(_this, _assetId_extraInitializers), __runInitializers(_this, _asset_initializers, void 0));
                _this.position = (__runInitializers(_this, _asset_extraInitializers), __runInitializers(_this, _position_initializers, void 0));
                __runInitializers(_this, _position_extraInitializers);
                return _this;
            }
            return OrderableAsset;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _assetId_decorators = [(0, typeorm_1.Column)()];
            _asset_decorators = [(0, typeorm_1.Index)(), (0, typeorm_1.ManyToOne)(function (type) { return asset_entity_1.Asset; }, { eager: true, onDelete: 'CASCADE' })];
            _position_decorators = [(0, typeorm_1.Column)()];
            __esDecorate(null, null, _assetId_decorators, { kind: "field", name: "assetId", static: false, private: false, access: { has: function (obj) { return "assetId" in obj; }, get: function (obj) { return obj.assetId; }, set: function (obj, value) { obj.assetId = value; } }, metadata: _metadata }, _assetId_initializers, _assetId_extraInitializers);
            __esDecorate(null, null, _asset_decorators, { kind: "field", name: "asset", static: false, private: false, access: { has: function (obj) { return "asset" in obj; }, get: function (obj) { return obj.asset; }, set: function (obj, value) { obj.asset = value; } }, metadata: _metadata }, _asset_initializers, _asset_extraInitializers);
            __esDecorate(null, null, _position_decorators, { kind: "field", name: "position", static: false, private: false, access: { has: function (obj) { return "position" in obj; }, get: function (obj) { return obj.position; }, set: function (obj, value) { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.OrderableAsset = OrderableAsset;
