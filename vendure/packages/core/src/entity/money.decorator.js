"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = Money;
exports.getMoneyColumnsFor = getMoneyColumnsFor;
var moneyColumnRegistry = new Map();
/**
 * @description
 * Use this decorator for any entity field that is storing a monetary value.
 * This allows the column type to be defined by the configured {@link MoneyStrategy}.
 *
 * @docsCategory money
 * @docsPage Money Decorator
 * @since 2.0.0
 */
function Money(options) {
    return function (entity, propertyName) {
        var idColumns = moneyColumnRegistry.get(entity);
        var entry = { name: propertyName, entity: entity, options: options };
        if (idColumns) {
            idColumns.push(entry);
        }
        else {
            moneyColumnRegistry.set(entity, [entry]);
        }
    };
}
/**
 * @description
 * Returns any columns on the entity which have been decorated with the {@link EntityId}
 * decorator.
 */
function getMoneyColumnsFor(entityType) {
    var match = Array.from(moneyColumnRegistry.entries()).find(function (_a) {
        var entity = _a[0], columns = _a[1];
        return entity.constructor === entityType;
    });
    return match ? match[1] : [];
}
