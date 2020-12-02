
export type Event = string;

export type Listeners = {
    [key: string]: Callback[]
}

export type Callback = <Payload>(payload?: Payload) => {}

export class EventBus {
    listeners: Listeners

    constructor() {
        this.listeners = {};
    }

    on(event: Event, callback: Callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: Event, callback: Callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit<Payload>(event: Event, payload?: Payload) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function(listener) {
            listener<Payload>(payload);
        });
    }
}