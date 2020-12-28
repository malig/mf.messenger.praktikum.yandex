import { Http } from '../helpers/Http.js';
import { BASE_URL } from '../consts.js';
const chatPath = '/chats';
const http = new Http(`${BASE_URL}`);
export class ChatsApi {
    list() {
        return http.get(chatPath);
    }
    create(title) {
        return http.post(chatPath, { data: { title } });
    }
    delete(chatId) {
        return http.delete(chatPath, { data: { chatId } });
    }
}
//# sourceMappingURL=ChatsApi.js.map