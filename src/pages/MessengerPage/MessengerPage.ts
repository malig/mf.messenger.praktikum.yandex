import { Block } from '../../helpers/Block';
import { Message } from '../../helpers/Socket';
import { tpl } from './MessengerPage.tpl';
import { Button } from '../../components/Button/Button';
import { AddChat } from '../../components/AddChat/AddChat';
import { AddMessage } from '../../components/AddMessage/AddMessage';
import { AddChatUser } from '../../components/AddChatUser/AddChatUser';
import { ChatList } from '../../components/ChatList/ChatList';
import { chatsController, router, PATH, authController, messageController } from '../../index';
import { Chat } from '../../api/ChatsApi';
import { User } from '../../api/AuthApi';

import './MessengerPage.less';

type MessengerPageProperties = {
    chats: Chat[];
    selectedChatId: number | null;
    messages: Message[];
    user: User | undefined;
    chatTitle: string;
};

export class MessengerPage extends Block<MessengerPageProperties> {
    constructor() {
        super(tpl, {
            chats: [],
            selectedChatId: null,
            messages: [],
            user: authController.getCurrentUser(),
            chatTitle: '',
        });
    }

    componentDidMount() {
        this._children = {
            chatList: new ChatList({
                chats: [],
                onChatDelete: (deletedChatId) => {
                    chatsController.deleteChat(deletedChatId).then(() => {
                        if (this.props.selectedChatId === deletedChatId) {
                            messageController.clear();
                            chatsController.clear();
                        }
                    });
                },
                onChatSelect: (chatId) => {
                    chatsController.selectChat(chatId);
                    chatsController.getChatToken(chatId).then(({ token }) => {
                        const userId = this.props.user?.id;

                        if (userId) {
                            messageController.connect(userId, chatId, token);
                        }
                    });
                },
            }),
            addChat: new AddChat({
                onAdd: (chatTitle) => chatsController.createChat(chatTitle),
            }),
            addMessage: new AddMessage({
                onAdd: (message) => {
                    messageController.sendMessage(message);
                },
            }),
            addChatUser: new AddChatUser({
                onAdd: (userId) => {
                    const { selectedChatId } = this.props;

                    if (selectedChatId) {
                        chatsController.addUser(userId, selectedChatId);
                    }
                },
            }),
            profileButton: new Button({
                faIco: 'fa-bars',
                className: 'btn_ico',
                onClick: () => router.go(PATH.PROFILE),
            }),
            logoutButton: new Button({
                faIco: 'fa-sign-out',
                className: 'btn_ico',
                onClick: () => authController.logout(),
            }),
        };

        chatsController.on(({ chats, selectedChatId }) => {
            const chatTitle = chats.find((chat) => chat.id === selectedChatId);
            this.setProps({ chats, selectedChatId, chatTitle: chatTitle ? chatTitle.title : '' });
        });

        messageController.on(({ messages }) => {
            this.setProps({ messages });
        });

        chatsController.fetchChats();
    }

    componentIsReady() {
        const messagesContainer = document.getElementsByClassName('messages-container')[0];

        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    render(): string {
        const { chats, selectedChatId, messages, user, chatTitle } = this.props;
        const {
            chatList,
            addChat,
            profileButton,
            logoutButton,
            addChatUser,
            addMessage,
        } = this._children;

        return this.compile({
            chatList: chatList.render({
                chats,
                selected: selectedChatId,
            }),
            addChat: addChat.render(),
            profileButton: profileButton.render(),
            logoutButton: logoutButton.render(),
            addChatUser: addChatUser.render({
                disabled: !selectedChatId,
            }),
            addMessage: addMessage.render(),
            messages,
            userId: user?.id,
            userName: user?.first_name,
            chatTitle,
        });
    }
}
