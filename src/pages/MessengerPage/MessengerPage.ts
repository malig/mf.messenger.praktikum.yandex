import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './MessengerPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { Search } from '../../components/Search/Search.js';
import { ChatList } from '../../components/ChatList/ChatList.js';
import { Dropdown } from '../../components/Dropdown/Dropdown.js';

type MessengerPageProps = {
    title: string;
    sendButton: Button;
    profileButton: Button;
    search: Search;
    chatList: ChatList;
    dropdown: Dropdown;
}

class MessengerPage extends Block<MessengerPageProps> {
    constructor() {
        super(tpl, {
            title: 'Мессенджер',
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
        });
    }

    render(): string {
        const { title, sendButton, profileButton, search, chatList, dropdown } = this.props as MessengerPageProps;

        return this.compile({
            title,
            sendButton: sendButton.render(),
            profileButton: profileButton.render(),
            search: search.render(),
            chatList: chatList.render(),
            dropdown: dropdown.render()
        });
    }
}

render('.app', new MessengerPage());