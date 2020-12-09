import { Block } from '../../helpers/Block.js';
import { tpl } from './Dropdown.tpl.js';
import { Button } from '../Button/Button.js';

type DropdownProps = {
    button?: string;
}

export class Dropdown extends Block<DropdownProps> {
    constructor() {
        super(tpl, {});
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico',
            }),
        }
    }

    render(): string {
        return this.compile({
            button: this._children?.button.render()
        });
    }
}