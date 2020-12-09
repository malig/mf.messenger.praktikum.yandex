import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './MessengerPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { Search } from '../../components/Search/Search.js';
import { ChatList } from '../../components/ChatList/ChatList.js';
import { Dropdown } from '../../components/Dropdown/Dropdown.js';

type MessengerPageProps = {
    title: string;
    sendButton?: string;
    profileButton?: string;
    search?: string;
    chatList?: string;
    dropdown?: string;
}

class MessengerPage extends Block<MessengerPageProps> {
    constructor() {
        super(tpl, { title: 'Мессенджер' });
    }

    componentDidMount() {
        this._children = {
            search: new Search(),
            dropdown: new Dropdown(),
            chatList: new ChatList(),
            sendButton: new Button({
                faIco: 'fa-paper-plane-o',
                className: 'btn_round',
            }),
            profileButton: new Button({
                faIco: 'fa-bars',
                className: 'btn_ico',
                onClick: () => document.location.href = '/pages/ProfilePage'
            })
        }
    }

    render(): string {
        const { title } = this.props;

        return this.compile({
            title,
            sendButton: this._children?.sendButton.render(),
            profileButton: this._children?.profileButton.render(),
            search: this._children?.search.render(),
            chatList: this._children?.chatList.render(),
            dropdown: this._children?.dropdown.render()
        });
    }
}

render('.app', new MessengerPage());