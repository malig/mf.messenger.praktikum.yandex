import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './MessengerPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { Search } from '../../components/Search/Search.js';
import { ChatList } from '../../components/ChatList/ChatList.js';
import { Dropdown } from '../../components/Dropdown/Dropdown.js';
class MessengerPage extends Block {
    constructor() {
        super(tpl, { title: 'Мессенджер' });
    }
    componentDidMount() {
        this._children = {
            search: new Search(),
            dropdown: new Dropdown(),
            chatList: new ChatList(),
            sendButton: new Button({
                faIco: 'fa-paper-plane-o',
                className: 'btn_round',
            }),
            profileButton: new Button({
                faIco: 'fa-bars',
                className: 'btn_ico',
                onClick: () => document.location.href = '/pages/ProfilePage'
            })
        };
    }
    render() {
        var _a, _b, _c, _d, _e;
        const { title } = this.props;
        return this.compile({
            title,
            sendButton: (_a = this._children) === null || _a === void 0 ? void 0 : _a.sendButton.render(),
            profileButton: (_b = this._children) === null || _b === void 0 ? void 0 : _b.profileButton.render(),
            search: (_c = this._children) === null || _c === void 0 ? void 0 : _c.search.render(),
            chatList: (_d = this._children) === null || _d === void 0 ? void 0 : _d.chatList.render(),
            dropdown: (_e = this._children) === null || _e === void 0 ? void 0 : _e.dropdown.render()
        });
    }
}
render('.app', new MessengerPage());
//# sourceMappingURL=MessengerPage.js.map