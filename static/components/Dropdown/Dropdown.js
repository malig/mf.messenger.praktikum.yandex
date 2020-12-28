import { Block } from '../../helpers/Block.js';
import { tpl } from './Dropdown.tpl.js';
import { Button } from '../Button/Button.js';
export class Dropdown extends Block {
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
    render() {
        var _a;
        return this.compile({
            button: (_a = this._children) === null || _a === void 0 ? void 0 : _a.button.render()
        });
    }
}
//# sourceMappingURL=Dropdown.js.map