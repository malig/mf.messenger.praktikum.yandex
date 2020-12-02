import {EventBus} from "./EventBus";

interface IMeta<Props> {
    tagName: string;
    props?: Props;
}

type ComponentDidMount = <Props>(oldProps?: Props) => void
type ComponentDidUpdate = <Props>(oldProps: Props, newProps: Props) => boolean

interface MyProxyConstructor {
    new <T, H extends object>(target: T, handler: ProxyHandler<H>): H
}
const MyProxy = Proxy as MyProxyConstructor

export class Block<Props> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    _element: HTMLElement;
    _meta: IMeta<Props>;

    eventBus: () => EventBus;
    props;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props: Props) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;

        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount: ComponentDidMount

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate: ComponentDidUpdate = () => true;

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);

        this.eventBus().emit<unknown>(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = this.render();
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return '';
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        //const self = this;

        return new MyProxy<typeof props, { [name: string]: () => number }>(props, {
            set(target, prop, value) {
                target[prop as string] = value;
                return true
            },
            deleteProperty() {
                throw Error('нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}