"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultEntityDuplicators = void 0;
var collection_duplicator_1 = require("./collection-duplicator");
var facet_duplicator_1 = require("./facet-duplicator");
var product_duplicator_1 = require("./product-duplicator");
var promotion_duplicator_1 = require("./promotion-duplicator");
exports.defaultEntityDuplicators = [
    product_duplicator_1.productDuplicator,
    collection_duplicator_1.collectionDuplicator,
    facet_duplicator_1.facetDuplicator,
    promotion_duplicator_1.promotionDuplicator,
];
