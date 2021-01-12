import { Block } from '../../helpers/Block';
import { tpl } from './Button.tpl';

type ButtonProps = {
    title?: string;
    onClick?: (e: Event) => void;
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
        const { title, className = '', faIco } = this.props;

        return this.compile({
            title,
            faIco,
            className: `btn ${className}`.trim(),
            clickEventName: this.uniq(Button.EVENTS.CLICK)
        });
    }
}