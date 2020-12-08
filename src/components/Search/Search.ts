import { Block } from '../../helpers/Block.js';
import { tpl } from './Search.tpl.js';
import { Button } from '../Button/Button.js';

type SearchProps = {
    button: Button;
}

export class Search extends Block<SearchProps> {
    constructor() {
        super(tpl, {
            button: new Button({
                faIco: 'fa-search',
                className: 'btn_ico search__btn zero-border',
            }),
        });
    }

    render(): string {
        const { button } = this.props as SearchProps;

        return this.compile({
            button: button.render()
        });
    }
}