import { Controller } from '../helpers/Controller.js';
import { ChatsApi, Chat } from '../api/ChatsApi.js';

type ChatInitialState = {
    chats:  Chat[]
}

const chatsApi = new ChatsApi();

enum ACTION {
    SET_CHATS = 'setChats'
}

export class ChatsController extends Controller<ChatInitialState>{
    initialState: ChatInitialState = {
        chats: []
    }

    reducers = {
        [ACTION.SET_CHATS]: (state: ChatInitialState, payload: Chat[]) => {
            state.chats = payload;
            return state;
        }
    }

    fetchChats() {
        chatsApi.list().then((chats) => {
            this.dispatch(ACTION.SET_CHATS, chats)
        })
    }

    createChat(chatTitle: string) {
        chatsApi.create(chatTitle).then(() => {
            this.fetchChats()
        })
    }

    deleteChat(chatId: number) {
        chatsApi.delete(chatId).then(() => {
            this.fetchChats()
        })
    }
}