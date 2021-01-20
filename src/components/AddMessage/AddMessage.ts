import { Block } from '../../helpers/Block';
import { tpl } from './AddMessage.tpl';
import { Button } from '../Button/Button';

type AddMessageProperties = {
    onAdd: (message: string) => void;
    changeMessageEventName?: string;
};

export class AddMessage extends Block<AddMessageProperties> {
    static EVENTS = {
        ...Block.EVENTS,
        CHANGE_MESSAGE: 'change-message',
    };

    private message = '';

    constructor(properties: AddMessageProperties) {
        super(tpl, properties);
    }

    clear() {
        this.message = '';
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-paper-plane-o',
                className: 'btn_round',
                onClick: () => {
                    if (this.message.trim()) {
                        this.props.onAdd(this.message);
                        this.clear();
                    } else {
                        alert('Напиши что-нибудь');
                    }
                },
            }),
        };

        window.eventBus.on(this.uniq(AddMessage.EVENTS.CHANGE_MESSAGE), (e: Event) => {
            this.message = (e.target as HTMLInputElement).value;
        });
    }

    render(): string {
        return this.compile({
            button: this._children.button.render(),
            changeMessageEventName: this.uniq(AddMessage.EVENTS.CHANGE_MESSAGE),
        });
    }
}
