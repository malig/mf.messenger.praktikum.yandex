import { Block } from '../../helpers/Block.js';
import { tpl } from './MessengerPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { AddChat } from '../../components/AddChat/AddChat.js';
import { ChatList } from '../../components/ChatList/ChatList.js';
import { Dropdown } from '../../components/Dropdown/Dropdown.js';
import { chatsController, router, PATH, authController } from '../../app.js';
export class MessengerPage extends Block {
    constructor() {
        super(tpl, { chats: [] });
    }
    componentDidMount() {
        this._children = {
            chatList: new ChatList({
                chats: [],
                onChatDelete: (chatId => chatsController.deleteChat(chatId))
            }),
            addChat: new AddChat({
                onChange: (chatTitle) => chatsController.createChat(chatTitle)
            }),
            dropdown: new Dropdown(),
            sendButton: new Button({
                faIco: 'fa-paper-plane-o',
                className: 'btn_round',
            }),
            profileButton: new Button({
                faIco: 'fa-bars',
                className: 'btn_ico',
                onClick: () => router.go(PATH.PROFILE)
            }),
            logoutButton: new Button({
                faIco: 'fa-sign-out',
                className: 'btn_ico',
                onClick: () => authController.logout()
            })
        };
        chatsController.on(({ chats }) => {
            this.setProps({ chats });
        });
        chatsController.fetchChats();
    }
    render() {
        const { chatList, addChat, sendButton, profileButton, logoutButton, dropdown } = this._children;
        return this.compile({
            chatList: chatList.render({ chats: this.props.chats }),
            addChat: addChat.render(),
            sendButton: sendButton.render(),
            profileButton: profileButton.render(),
            logoutButton: logoutButton.render(),
            dropdown: dropdown.render()
        });
    }
}
//# sourceMappingURL=MessengerPage.js.map