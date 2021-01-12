import { Block } from '../../helpers/Block';
import { tpl } from './MessengerPage.tpl';
import { Button } from '../../components/Button/Button';
import { AddChat } from '../../components/AddChat/AddChat';
import { ChatList } from '../../components/ChatList/ChatList';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import {chatsController, router, PATH, authController} from '../../app';
import { Chat } from '../../api/ChatsApi';

type MessengerPageProps = {
    chats: Chat[];
}

export class MessengerPage extends Block<MessengerPageProps> {
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
        }

        chatsController.on(({ chats }) => {
            this.setProps({ chats })
        })

        chatsController.fetchChats();
    }

    render(): string {
        const {
            chatList,
            addChat,
            sendButton,
            profileButton,
            logoutButton,
            dropdown
        } = this._children;

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