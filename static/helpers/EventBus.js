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
        const listeners = this.listeners[event];
        if (listeners) {
            this.listeners[event] = listeners.filter(listener => listener !== callback);
        }
    }
    emit(event, ...args) {
        const listeners = this.listeners[event];
        if (listeners) {
            listeners.forEach(function (listener) {
                listener(...args);
            });
        }
    }
}
//# sourceMappingURL=EventBus.js.map