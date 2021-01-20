import { Controller } from '../helpers/Controller';
import { ChatsApi, Chat } from '../api/ChatsApi';

type ChatInitialState = {
    chats: Chat[];
    selectedChatId: number | null;
};

const chatsApi = new ChatsApi();

enum ACTION {
    SET_CHATS = 'setChats',
    SET_SELECTED_CHAT_ID = 'setSelectedChatId',
}

export class ChatsController extends Controller<ChatInitialState> {
    initialState: ChatInitialState = {
        chats: [],
        selectedChatId: null,
    };

    reducers = {
        [ACTION.SET_CHATS]: (state: ChatInitialState, payload: Chat[]) => {
            state.chats = payload;
            return state;
        },
        [ACTION.SET_SELECTED_CHAT_ID]: (state: ChatInitialState, payload: number) => {
            state.selectedChatId = payload;
            return state;
        },
    };

    fetchChats() {
        chatsApi.list().then((chats) => {
            this.dispatch(ACTION.SET_CHATS, chats);
        });
    }

    createChat(chatTitle: string) {
        chatsApi.create(chatTitle).then(() => {
            this.fetchChats();
        });
    }

    deleteChat(chatId: number) {
        return chatsApi.delete(chatId).then(() => {
            this.fetchChats();
        });
    }

    selectChat(chatId: number | null) {
        this.dispatch(ACTION.SET_SELECTED_CHAT_ID, chatId);
    }

    clear() {
        this.selectChat(null);
    }

    addUser(userId: number, chatId: number) {
        chatsApi.addUser(userId, chatId);
    }

    getChatToken(chatId: number) {
        return chatsApi.getChatToken(chatId);
    }
}
