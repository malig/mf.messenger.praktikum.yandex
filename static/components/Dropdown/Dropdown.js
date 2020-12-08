import { Block } from '../../helpers/Block.js';
import { tpl } from './Dropdown.tpl.js';
import { Button } from '../Button/Button.js';
export class Dropdown extends Block {
    constructor() {
        super(tpl, {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico',
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
//# sourceMappingURL=Dropdown.js.map