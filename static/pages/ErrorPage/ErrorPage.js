import { Block } from '../../helpers/Block.js';
import { tpl } from './ErrorPage.tpl.js';
export class ErrorPage extends Block {
    constructor() {
        super(tpl, {
            title: 'Ты только не расстраивайся',
            code: 404
        });
    }
}
//# sourceMappingURL=ErrorPage.js.map