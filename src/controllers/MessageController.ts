import { Controller } from '../helpers/Controller';
import { Socket, MessageType, Message } from '../helpers/Socket';

type MessageInitialState = {
    messages: Message[];
};

const socket = new Socket();

enum ACTION {
    SET_MESSAGES = 'setMessages',
    SET_MESSAGE = 'setMessage',
}

export class MessageController extends Controller<MessageInitialState> {
    initialState: MessageInitialState = {
        messages: [],
    };

    reducers = {
        [ACTION.SET_MESSAGES]: (state: MessageInitialState, payload: Message[]) => {
            state.messages = payload;
            return state;
        },
        [ACTION.SET_MESSAGE]: (state: MessageInitialState, payload: Message) => {
            state.messages.push(payload);
            return state;
        },
    };

    setMessages(messages: Message[]) {
        this.dispatch(ACTION.SET_MESSAGES, messages);
    }

    setMessage(message: Message) {
        this.dispatch(ACTION.SET_MESSAGE, message);
    }

    sendMessage(message: string) {
        socket.send({
            content: message,
            type: MessageType.Message,
        });
    }

    clear() {
        this.setMessages([]);
    }

    connect(userId: number, chatId: number, chatToken: string) {
        socket.connect(userId, chatId, chatToken).then(() => {
            socket.send({
                content: '0',
                type: MessageType.GetOld,
            });
        });

        socket.addMessageObserver((messageData) => {
            if (Array.isArray(messageData)) {
                this.setMessages(messageData.reverse());
            } else if (messageData.type === MessageType.Message) {
                this.setMessage({ ...messageData, user_id: messageData.userId });
            }
        });
    }
}
