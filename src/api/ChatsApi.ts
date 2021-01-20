import { Http } from '../helpers/Http';
import { BASE_URL } from '../consts';

const chatPath = '/chats';
const http = new Http(`${BASE_URL}`);

export type Chat = {
    id: number;
    title: string;
    avatar: string;
};

export class ChatsApi {
    list(): Promise<Chat[]> {
        return http.get(chatPath);
    }

    create(title: string) {
        return http.post(chatPath, { data: { title } });
    }

    delete(chatId: number) {
        return http.delete(chatPath, { data: { chatId } }).catch(() => {
            alert('Ты не можешь удалить этот чат');
        });
    }

    addUser(userId: number, chatId: number) {
        return http.put(`${chatPath}/users`, {
            data: {
                users: [userId],
                chatId,
            },
        });
    }

    getChatToken(chatId: number): Promise<{ token: string }> {
        return http.post(`${chatPath}/token/${chatId}`);
    }
}
