import { Block } from '../../helpers/Block';
import { tpl } from './Button.tpl';

import './Button.less';

type ButtonProperties = {
    title?: string;
    onClick?: (e: Event) => void;
    className?: string;
    faIco?: string;
};

export class Button extends Block<ButtonProperties> {
    static EVENTS = {
        ...Block.EVENTS,
        CLICK: 'click',
    };

    constructor(properties: ButtonProperties) {
        super(tpl, properties);

        const { onClick = () => {} } = properties;
        window.eventBus.on(this.uniq(Button.EVENTS.CLICK), onClick);
    }

    render(): string {
        const { title, className = '', faIco } = this.props;

        return this.compile({
            title,
            faIco,
            className: `btn ${className}`.trim(),
            clickEventName: this.uniq(Button.EVENTS.CLICK),
        });
    }
}
