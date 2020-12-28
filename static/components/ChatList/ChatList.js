import { Block } from '../../helpers/Block.js';
import { tpl } from './ChatList.tpl.js';
export class ChatList extends Block {
    constructor(props) {
        super(tpl, props);
    }
    componentDidMount() {
        window.eventBus.on(this.uniq(ChatList.EVENTS.CHAT_DELETE), (id) => this.props.onChatDelete(id));
    }
    render(props) {
        const chats = (props || this.props).chats;
        return this.compile({
            chats,
            chatDeleteEventName: this.uniq(ChatList.EVENTS.CHAT_DELETE),
        });
    }
}
ChatList.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { CHAT_DELETE: 'chat-delete' });
//# sourceMappingURL=ChatList.js.map