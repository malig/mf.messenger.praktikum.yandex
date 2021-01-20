import { Block } from '../../helpers/Block';
import { tpl } from './ChatList.tpl';
import { Chat } from '../../api/ChatsApi';

import './ChatList.less';

type ChatListProperties = {
    chats: Chat[];
    selected?: number;
    chatDeleteEventName?: string;
    onChatDelete: (chatId: number) => void;
    onChatSelect: (chatId: number) => void;
};

export class ChatList extends Block<ChatListProperties> {
    static EVENTS = {
        ...Block.EVENTS,
        CHAT_DELETE: 'chat-delete',
        CHAT_SELECT: 'chat-select',
    };

    constructor(properties: ChatListProperties) {
        super(tpl, properties);
    }

    componentDidMount() {
        window.eventBus.on(this.uniq(ChatList.EVENTS.CHAT_DELETE), (id: number) =>
            this.props.onChatDelete(id),
        );

        window.eventBus.on(this.uniq(ChatList.EVENTS.CHAT_SELECT), (id: number) =>
            this.props.onChatSelect(id),
        );
    }

    render(properties: ChatListProperties): string {
        const { chats, selected } = properties || this.props;

        return this.compile({
            chats,
            selected,
            chatDeleteEventName: this.uniq(ChatList.EVENTS.CHAT_DELETE),
            chatSelectEventName: this.uniq(ChatList.EVENTS.CHAT_SELECT),
        });
    }
}
