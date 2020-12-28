import { EventBus } from './EventBus.js';
import { TplCompiler } from './TplCompiler.js';
export class Block {
    constructor(tpl, props, tplCompiler = new TplCompiler()) {
        this._children = {};
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
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
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    _render() {
        this._element.innerHTML = this.render();
    }
    render(props) {
        return this.compile(props || this.props);
    }
    compile(props) {
        return this.tplCompiler().compile(this._meta.tpl, props);
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self.props, target);
                return true;
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
    }
    ;
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(oldProps, newProps) {
        return oldProps !== newProps;
    }
    get element() {
        return this._element;
    }
    get id() {
        return this._id;
    }
    uniq(str) {
        return `${str}:${this.id}`;
    }
    destroy() {
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'low:component-did-update'
};
//# sourceMappingURL=Block.js.map