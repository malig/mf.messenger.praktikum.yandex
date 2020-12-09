import { EventBus } from './EventBus.js';
import { TplCompiler, ITplCompiler } from './TplCompiler.js';

interface IMeta<Props> {
    tpl: string;
    props: Props;
}

export class Block<Props extends Object> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'low:component-did-update'
    };

    _id: number
    _meta: IMeta<Props>;
    _element: HTMLElement;
    _children: {[key: string]: Block<any>} | null = null;

    tplCompiler: () => ITplCompiler;
    eventBus: () => EventBus;
    props: Props;

    constructor(tpl: string, props: Props, tplCompiler: ITplCompiler = new TplCompiler()) {
        this._id = new Date().getTime();
        this._meta = { tpl, props };
        this._element = this._createDocumentElement('div');

        this.props = this._makePropsProxy(props);

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
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    _render() {
        this._element.innerHTML = this.render();
    }

    render(): string {
        return this.compile(this.props);
    }

    compile(props: Props): string {
        return this.tplCompiler().compile(this._meta.tpl, props);
    }

    getContent(): HTMLElement {
        return this.element;
    }

    _makePropsProxy(props: Props) {
        const self = this;

        return new Proxy<Props>(props, {
            set(target, prop, value) {
                target[prop as keyof typeof target] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self.props, target);

                return true
            },
            deleteProperty() {
                throw Error('Нет доступа');
            },
        });
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {

    };

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        return oldProps !== newProps;
    }

    setProps = (nextProps: {[key: string]: string}) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    get id(): number {
        return this._id;
    }

    uniq(str: string) {
        return `${str}:${this.id}`;
    }
}