import { EventBus } from './EventBus.js';
export class Store {
    constructor() {
        this.reducerStore = {};
        this.state = {};
        this.eventBus = new EventBus();
    }
    init(controllers) {
        controllers.forEach((controller) => {
            const { initialState, reducers, namespace } = controller;
            this.state = Object.assign(Object.assign({}, this.state), { [namespace]: initialState });
            this.reducerStore = Object.assign(Object.assign({}, this.reducerStore), { [namespace]: reducers });
        });
        this.makeProxy();
    }
    dispatch(actionName, nameSpace, payload) {
        if (this.reducerStore.hasOwnProperty(nameSpace) && this.reducerStore[nameSpace].hasOwnProperty(actionName)) {
            const reducers = this.reducerStore[nameSpace];
            const action = reducers[actionName];
            const newState = action(this.state[nameSpace], payload);
            this.state = Object.assign(this.state, { [nameSpace]: newState });
        }
        return true;
    }
    makeProxy() {
        const self = this;
        this.state = new Proxy(this.state, {
            set: function (target, prop, value) {
                target[prop] = value;
                self.eventBus.emit(Store.EVENTS.CHANGE, value);
                return true;
            }
        });
    }
    getState(namespace) {
        const state = Object.assign({}, this.state);
        return state[namespace];
    }
}
Store.EVENTS = {
    CHANGE: 'state-change',
};
//# sourceMappingURL=Store.js.map