import { Block } from '../../helpers/Block.js';
import { tpl } from './Button.tpl.js';
export class Button extends Block {
    constructor(props) {
        super(tpl, props);
        const { onClick = () => { } } = props;
        window.eventBus.on(this.uniq(Button.EVENTS.CLICK), onClick);
    }
    render() {
        const { title, className = '', faIco } = this.props;
        return this.compile({
            title,
            faIco,
            className: `btn ${className}`.trim(),
            clickEventName: this.uniq(Button.EVENTS.CLICK)
        });
    }
}
Button.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { CLICK: 'click' });
//# sourceMappingURL=Button.js.map