import { Block } from '../../helpers/Block.js';
import { tpl } from './Dialog.tpl.js';

type DialogProps = {
    title: string;
}

export class Dialog extends Block<DialogProps> {
    constructor() {
        super(tpl, {
            title: 'Вы уверены, что хотите удалить этот чат?',
        });
    }
}