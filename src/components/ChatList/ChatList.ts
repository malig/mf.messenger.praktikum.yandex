import { Block } from '../../helpers/Block.js';
import { tpl } from './ChatList.tpl.js';

type ChatListProps = {};

export class ChatList extends Block<ChatListProps> {
    constructor() {
        super(tpl, {});
    }
}