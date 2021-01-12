import { EventBus } from './EventBus'
import { Controller } from './Controller';

type BaseController = Controller<any>;
type Reducers = Record<string, <T, P>(state: T, payload: P) => T>
type ReducerStore = Record<string, Reducers>
type State = Record<string, unknown>

export class Store {
    static EVENTS = {
        CHANGE: 'state-change',
    };

    reducerStore: ReducerStore = {}
    state: State = {}
    eventBus: EventBus

    constructor() {
        this.eventBus = new EventBus();
    }

    init(controllers: BaseController[]) {
        controllers.forEach((controller) => {
            const { initialState, reducers, namespace } = controller;

            this.state = { ...this.state, [namespace]: initialState }
            this.reducerStore = { ...this.reducerStore, [namespace]: reducers }
        })

        this.makeProxy();
    }

    dispatch<T>(actionName: string, nameSpace: string, payload: T) {
        if (this.reducerStore.hasOwnProperty(nameSpace) && this.reducerStore[nameSpace].hasOwnProperty(actionName)) {
            const reducers = this.reducerStore[nameSpace];
            const action = reducers[actionName as keyof typeof reducers];
            const newState = action(this.state[nameSpace], payload);

            this.state = Object.assign(this.state, { [nameSpace]: newState });
        }

        return true;
    }

    private makeProxy() {
        const self = this;
        this.state = new Proxy(this.state, {
            set: function(target, prop, value) {
                target[prop as keyof typeof target] = value;

                self.eventBus.emit(Store.EVENTS.CHANGE, value);
                return true;
            }
        });
    }

    getState(namespace: string) {
        const state = { ...this.state };
        return state[namespace];
    }
}
