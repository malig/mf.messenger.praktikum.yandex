import { Block } from '../../helpers/Block.js';
import { tpl } from './AddChat.tpl.js';
import { Button } from '../Button/Button.js';
export class AddChat extends Block {
    constructor(props) {
        super(tpl, props);
        this.title = '';
    }
    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico add-chat__btn zero-border',
                onClick: () => {
                    this.props.onChange(this.title);
                }
            }),
        };
        window.eventBus.on(this.uniq(AddChat.EVENTS.CHANGE_TITLE), (e) => {
            this.title = e.target.value;
        });
    }
    render() {
        return this.compile({
            button: this._children.button.render(),
            changeTitleEventName: this.uniq(AddChat.EVENTS.CHANGE_TITLE),
        });
    }
}
AddChat.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { CHANGE_TITLE: 'change-title' });
//# sourceMappingURL=AddChat.js.map