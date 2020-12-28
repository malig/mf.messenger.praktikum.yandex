import { Http } from '../helpers/Http.js';
import { BASE_URL } from '../consts.js';

const chatPath = '/chats';
const http = new Http(`${BASE_URL}`);

export type Chat = {
    id: number,
    title: string,
    avatar: string
}

export class ChatsApi {
    list(): Promise<Chat[]> {
        return http.get(chatPath) as Promise<Chat[]>;
    }

    create(title: string) {
        return http.post(chatPath,{ data: { title } })
    }

    delete(chatId: number) {
        return http.delete(chatPath,{ data: { chatId } })
    }
}