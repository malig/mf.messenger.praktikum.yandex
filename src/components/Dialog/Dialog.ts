import { Block } from '../../helpers/Block';
import { tpl } from './Dialog.tpl';

import './Dialog.less';

type DialogProperties = {
    title: string;
};

export class Dialog extends Block<DialogProperties> {
    constructor() {
        super(tpl, {
            title: 'Вы уверены, что хотите удалить этот чат?',
        });
    }
}
