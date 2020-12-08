
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
        this.checkEvent(event);

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit<Args>(event: Event, ...args: Args[]) {
        this.checkEvent(event);

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }

    checkEvent(event: string) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
    }
}