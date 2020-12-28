import { Http } from '../helpers/Http.js';
import { BaseApi, baseUrl } from './BaseApi.js';
const chatPath = '/chats';
const http = new Http(`${baseUrl}`);
export class ChatsApi extends BaseApi {
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