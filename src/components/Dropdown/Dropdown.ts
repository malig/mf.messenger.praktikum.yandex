import { Block } from '../../helpers/Block.js';
import { tpl } from './Dropdown.tpl.js';
import { Button } from '../Button/Button.js';

type DropdownProps = {
    button: Button;
}

export class Dropdown extends Block<DropdownProps> {
    constructor() {
        super(tpl, {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico',
            }),
        });
    }

    render(): string {
        const { button } = this.props as DropdownProps;

        return this.compile({
            button: button.render()
        });
    }
}