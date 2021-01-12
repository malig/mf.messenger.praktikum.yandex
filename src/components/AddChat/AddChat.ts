import { Block } from '../../helpers/Block';
import { tpl } from './AddChat.tpl';
import { Button } from '../Button/Button';

type SearchProps = {
    onChange: (title: string) => void,
    changeTitleEventName?: string
}

export class AddChat extends Block<SearchProps> {
    static EVENTS = {
        ...Block.EVENTS,
        CHANGE_TITLE: 'change-title',
    };

    title: string = ''

    constructor(props: SearchProps) {
        super(tpl, props);
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico add-chat__btn zero-border',
                onClick: () => {
                    this.props.onChange(this.title);
                }
            }),
        }

        window.eventBus.on(this.uniq(AddChat.EVENTS.CHANGE_TITLE), (e: Event) => {
            this.title = (e.target as HTMLInputElement).value;
        });
    }

    render(): string {
        return this.compile({
            button: this._children.button.render(),
            changeTitleEventName: this.uniq(AddChat.EVENTS.CHANGE_TITLE),
        });
    }
}