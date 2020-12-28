import { Store } from './Store.js';

type Reducers<T> = Record<string, (state: T, payload: any) => T>

export class Controller<InitialState> {
    initialState: InitialState = {} as InitialState
    reducers: Reducers<InitialState> = {} as Reducers<InitialState>
    namespace: string

    protected store: Store

    constructor(store: Store, namespace: string) {
        this.store = store;
        this.namespace = namespace;
    }

    on(callback: (state: InitialState) => void) {
        this.store.eventBus.on(Store.EVENTS.CHANGE, callback);
    }

    protected dispatch<Payload>(action: string, payload: Payload) {
        this.store.dispatch(action, this.namespace, payload);
    }

    protected getState() {
        return this.store.getState(this.namespace) as InitialState;
    }
}