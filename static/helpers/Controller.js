import { Store } from './Store.js';
export class Controller {
    constructor(store, namespace) {
        this.initialState = {};
        this.reducers = {};
        this.store = store;
        this.namespace = namespace;
    }
    on(callback) {
        this.store.eventBus.on(Store.EVENTS.CHANGE, callback);
    }
    dispatch(action, payload) {
        this.store.dispatch(action, this.namespace, payload);
    }
    getState() {
        return this.store.getState(this.namespace);
    }
}
//# sourceMappingURL=Controller.js.map