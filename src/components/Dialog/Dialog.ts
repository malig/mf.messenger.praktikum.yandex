import { Block } from '../../helpers/Block';
import { tpl } from './Dialog.tpl';

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