export type Event = string;

export type Listeners = {
    [key: string]: (<T extends any[]>(...arguments_: T) => void)[];
};

export type Callback<Arguments> = (...arguments_: Arguments[]) => void;

export class EventBus {
    listeners: Listeners;

    constructor() {
        this.listeners = {};
    }

    on<Arguments>(event: Event, callback: Callback<Arguments>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off<Arguments>(event: Event, callback: Callback<Arguments>) {
        const listeners = this.listeners[event];

        if (listeners) {
            this.listeners[event] = listeners.filter((listener) => listener !== callback);
        }
    }

    emit<Arguments>(event: Event, ...arguments_: Arguments[]) {
        const listeners = this.listeners[event];

        if (listeners) {
            listeners.forEach((listener) => {
                listener(...arguments_);
            });
        }
    }
}
