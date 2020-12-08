export class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        this.checkEvent(event);
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
    emit(event, ...args) {
        this.checkEvent(event);
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
    checkEvent(event) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
    }
}
//# sourceMappingURL=EventBus.js.map