import { Block } from '../../helpers/Block';
import { tpl } from './AddChat.tpl';
import { Button } from '../Button/Button';

import './AddChat.less';

type SearchProperties = {
    onAdd: (title: string) => void;
    changeTitleEventName?: string;
};

export class AddChat extends Block<SearchProperties> {
    static EVENTS = {
        ...Block.EVENTS,
        CHANGE_TITLE: 'change-title',
    };

    private title = '';

    constructor(properties: SearchProperties) {
        super(tpl, properties);
    }

    clear() {
        this.title = '';
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico add-chat__btn zero-border',
                onClick: () => {
                    if (this.title.trim()) {
                        this.props.onAdd(this.title);
                        this.clear();
                    } else {
                        alert('Введи название чата');
                    }
                },
            }),
        };

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
