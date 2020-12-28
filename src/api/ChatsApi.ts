import { Http } from '../helpers/Http.js';
import { BaseApi, baseUrl } from './BaseApi.js';

const chatPath = '/chats';
const http = new Http(`${baseUrl}`);

export type Chat = {
    id: number,
    title: string,
    avatar: string
}

export class ChatsApi extends BaseApi {
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