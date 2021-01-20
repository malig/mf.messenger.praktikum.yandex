import { EventBus } from './EventBus';
import { TplCompiler, ITplCompiler } from './TplCompiler';

interface IMeta<Properties> {
    tpl: string;
    props: Properties;
}

export class Block<Properties extends Object> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_READY: 'flow:component-is-ready',
    };

    _id: number;

    _meta: IMeta<Properties>;

    _element: HTMLElement;

    _children: { [key: string]: Block<any> } = {};

    tplCompiler: () => ITplCompiler;

    eventBus: () => EventBus;

    props: Properties;

    constructor(
        tpl: string,
        properties: Properties,
        tplCompiler: ITplCompiler = new TplCompiler(),
    ) {
        this._id = Date.now();
        this._meta = { tpl, props: properties };
        this._element = this._createDocumentElement('div');

        this.props = this._makePropsProxy(properties);

        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        this.tplCompiler = () => tplCompiler;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_READY, this._componentIsReady.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    _render() {
        this._element.innerHTML = this.render();
        this.eventBus().emit(Block.EVENTS.FLOW_READY);
    }

    render(properties?: Properties): string {
        return this.compile(properties || this.props);
    }

    compile<T>(properties: T): string {
        return this.tplCompiler().compile(this._meta.tpl, properties);
    }

    getContent(): HTMLElement {
        return this.element;
    }

    _makePropsProxy(properties: Properties) {
        const self = this;

        return new Proxy<Properties>(properties, {
            set(target, property, value) {
                target[property as keyof typeof target] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self.props, target);

                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {}

    _componentIsReady() {
        this.componentIsReady();
    }

    componentIsReady() {}

    _componentDidUpdate(oldProperties: Properties, newProperties: Properties) {
        const response = this.componentDidUpdate(oldProperties, newProperties);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProperties: Properties, newProperties: Properties) {
        return oldProperties !== newProperties;
    }

    setProps = (nextProperties: { [key: string]: any }) => {
        if (!nextProperties) {
            return;
        }

        Object.assign(this.props, nextProperties);
    };

    get element(): HTMLElement {
        return this._element;
    }

    get id(): number {
        return this._id;
    }

    uniq(string: string) {
        return `${string}:${this.id}`;
    }

    destroy() {}
}
