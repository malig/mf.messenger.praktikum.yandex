import { Block } from '../../helpers/Block.js';
import { tpl } from './NotFoundPage.tpl.js';
export class NotFoundPage extends Block {
    constructor() {
        super(tpl, {
            title: 'Такой страницы не существует',
            code: 404
        });
    }
}
//# sourceMappingURL=NotFoundPage.js.map