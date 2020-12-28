import { Block } from '../../helpers/Block.js';
import { tpl } from './Search.tpl.js';
import { Button } from '../Button/Button.js';

type SearchProps = {
    button?: string;
}

export class Search extends Block<SearchProps> {
    constructor() {
        super(tpl, {});
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-search',
                className: 'btn_ico input-btn__btn zero-border',
            }),
        }
    }

    render(): string {
        return this.compile({
            button: this._children?.button.render()
        });
    }
}