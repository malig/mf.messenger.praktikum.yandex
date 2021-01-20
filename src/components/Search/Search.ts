import { Block } from '../../helpers/Block';
import { tpl } from './Search.tpl';
import { Button } from '../Button/Button';

type SearchProperties = {
    button?: string;
};

export class Search extends Block<SearchProperties> {
    constructor() {
        super(tpl, {});
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-search',
                className: 'btn_ico input-btn__btn zero-border',
            }),
        };
    }

    render(): string {
        return this.compile({
            button: this._children?.button.render(),
        });
    }
}
