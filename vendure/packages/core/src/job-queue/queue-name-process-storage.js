"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueNameProcessStorage = void 0;
var QueueNameProcessStorage = /** @class */ (function () {
    function QueueNameProcessStorage() {
        this.items = new Map();
    }
    QueueNameProcessStorage.prototype.set = function (queueName, process, listener) {
        var items = this.items.get(queueName);
        if (!items) {
            items = new Map();
            this.items.set(queueName, items);
        }
        items.set(process, listener);
    };
    QueueNameProcessStorage.prototype.has = function (queueName, process) {
        var items = this.items.get(queueName);
        if (!items) {
            return false;
        }
        return items.has(process);
    };
    QueueNameProcessStorage.prototype.getAndDelete = function (queueName, process) {
        var items = this.items.get(queueName);
        if (!items) {
            return;
        }
        var item = items.get(process);
        if (!item) {
            return;
        }
        items.delete(process);
        if (items.size === 0) {
            this.items.delete(queueName);
        }
        return item;
    };
    return QueueNameProcessStorage;
}());
exports.QueueNameProcessStorage = QueueNameProcessStorage;
