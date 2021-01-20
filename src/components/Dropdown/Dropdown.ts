import { Block } from '../../helpers/Block';
import { tpl } from './Dropdown.tpl';
import { Button } from '../Button/Button';

import './Dropdown.less';

type DropdownProperties = {
    button?: string;
};

export class Dropdown extends Block<DropdownProperties> {
    constructor() {
        super(tpl, {});
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico',
            }),
        };
    }

    render(): string {
        return this.compile({
            button: this._children?.button.render(),
        });
    }
}
