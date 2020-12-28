import { Controller } from '../helpers/Controller.js';
import { ChatsApi } from '../api/ChatsApi.js';
const chatsApi = new ChatsApi();
var ACTION;
(function (ACTION) {
    ACTION["SET_CHATS"] = "setChats";
})(ACTION || (ACTION = {}));
export class ChatsController extends Controller {
    constructor() {
        super(...arguments);
        this.initialState = {
            chats: []
        };
        this.reducers = {
            [ACTION.SET_CHATS]: (state, payload) => {
                state.chats = payload;
                return state;
            }
        };
    }
    fetchChats() {
        chatsApi.list().then((chats) => {
            this.dispatch(ACTION.SET_CHATS, chats);
        });
    }
    createChat(chatTitle) {
        chatsApi.create(chatTitle).then(() => {
            this.fetchChats();
        });
    }
    deleteChat(chatId) {
        chatsApi.delete(chatId).then(() => {
            this.fetchChats();
        });
    }
}
//# sourceMappingURL=ChatsController.js.map