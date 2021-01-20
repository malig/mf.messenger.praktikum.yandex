import { WEB_SOCKET_HOST } from '../consts';

enum Status {
    Disconnected,
    Connected,
    Closed,
    Aborted,
}

export enum MessageType {
    Message = 'message',
    GetOld = 'get old',
}

export type Message = {
    content: string;
    type?: MessageType;
    user_id?: number;
    userId?: number;
};

export class Socket {
    private status: Status = Status.Disconnected;

    private socket: WebSocket | null = null;

    connect(userId: number, chatId: number, chatToken: string) {
        this.socket = new WebSocket(`${WEB_SOCKET_HOST}/ws/chats/${userId}/${chatId}/${chatToken}`);

        return new Promise((resolve, reject) => {
            this.socket?.addEventListener('open', () => {
                this.status = Status.Connected;

                resolve(this.status);
            });

            this.socket?.addEventListener('close', (event) => {
                if (event.wasClean) {
                    this.status = Status.Closed;
                } else {
                    this.status = Status.Aborted;
                }

                reject(this.status);
            });
        });
    }

    addMessageObserver(observer: (data: Message | Message[]) => void) {
        this.socket?.addEventListener('message', (event) => {
            observer(JSON.parse(event.data));
        });
    }

    send(message: Message) {
        if (this.status === Status.Connected) {
            this.socket?.send(JSON.stringify(message));
        }
    }
}
