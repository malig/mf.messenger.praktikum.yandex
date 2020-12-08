import { Block } from '../../helpers/Block.js';
import { tpl } from './Dialog.tpl.js';
export class Dialog extends Block {
    constructor() {
        super(tpl, {
            title: 'Вы уверены, что хотите удалить этот чат?',
        });
    }
}
//# sourceMappingURL=Dialog.js.map