import { Block } from '../../helpers/Block.js';
import { tpl } from './Button.tpl.js';

type ButtonProps = {
    title?: string;
    onClick?: () => void;
    className?: string;
    faIco?: string;
}

export class Button extends Block<ButtonProps> {
    static EVENTS = {
        ...Block.EVENTS,
        CLICK: 'click',
    };

    constructor(props: ButtonProps) {
        super(tpl, props);

        const { onClick = () => {} } = props;
        window.eventBus.on(this.uniq(Button.EVENTS.CLICK), onClick);
    }

    render(): string {
        const { title, className = '', faIco } = this.props as ButtonProps;

        return this.compile({
            title,
            faIco,
            className: `btn ${className}`.trim(),
            clickEventName: this.uniq(Button.EVENTS.CLICK)
        });
    }
}