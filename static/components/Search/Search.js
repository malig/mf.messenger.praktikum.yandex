import { Block } from '../../helpers/Block.js';
import { tpl } from './Search.tpl.js';
import { Button } from '../Button/Button.js';
export class Search extends Block {
    constructor() {
        super(tpl, {});
    }
    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-search',
                className: 'btn_ico search__btn zero-border',
            }),
        };
    }
    render() {
        var _a;
        return this.compile({
            button: (_a = this._children) === null || _a === void 0 ? void 0 : _a.button.render()
        });
    }
}
//# sourceMappingURL=Search.js.map