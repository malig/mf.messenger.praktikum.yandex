
export type Event = string;

export type Listeners = {
    [key: string]: (<T extends any[]>(...args: T)=>void)[]
}

export type Callback<Args> = (...args: Args[]) => void

export class EventBus {
    listeners: Listeners

    constructor() {
        this.listeners = {};
    }

    on<Args>(event: Event, callback: Callback<Args>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off<Args>(event: Event, callback: Callback<Args>) {
        const listeners = this.listeners[event]

        if (listeners) {
            this.listeners[event] = listeners.filter(
                listener => listener !== callback
            );
        }
    }

    emit<Args>(event: Event, ...args: Args[]) {
        const listeners = this.listeners[event]

        if (listeners) {
            listeners.forEach(function(listener) {
                listener(...args);
            });
        }
    }
}