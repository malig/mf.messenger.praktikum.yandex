import { Block } from '../../helpers/Block.js';
import { tpl } from './Search.tpl.js';
import { Button } from '../Button/Button.js';
export class Search extends Block {
    constructor() {
        super(tpl, {
            button: new Button({
                faIco: 'fa-search',
                className: 'btn_ico search__btn zero-border',
            }),
        });
    }
    render() {
        const { button } = this.props;
        return this.compile({
            button: button.render()
        });
    }
}
//# sourceMappingURL=Search.js.map