import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './ErrorPage.tpl.js';
class ErrorPage extends Block {
    constructor(props) {
        super(tpl, props);
    }
}
render('.app', new ErrorPage({
    title: 'Ты только не расстраивайся',
    code: 404
}));
//# sourceMappingURL=ErrorPage.js.map