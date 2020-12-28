import { Block } from '../../helpers/Block.js';
import { tpl } from './ChatList.tpl.js';
import { Chat } from '../../api/ChatsApi.js';

type ChatListProps = {
    chats: Chat[],
    chatDeleteEventName?: string,
    onChatDelete: (chatId: number) => void
};

export class ChatList extends Block<ChatListProps> {
    static EVENTS = {
        ...Block.EVENTS,
        CHAT_DELETE: 'chat-delete',
    };

    constructor(props: ChatListProps) {
        super(tpl, props);
    }

    componentDidMount() {
        window.eventBus.on(this.uniq(ChatList.EVENTS.CHAT_DELETE), (id: number) => this.props.onChatDelete(id));
    }

    render(props: ChatListProps): string {
        const chats = (props || this.props).chats;

        return this.compile({
            chats,
            chatDeleteEventName: this.uniq(ChatList.EVENTS.CHAT_DELETE),
        });
    }
}