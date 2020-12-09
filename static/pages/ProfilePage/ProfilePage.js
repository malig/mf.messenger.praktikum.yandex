import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './ProfilePage.tpl.js';
import { Validation } from '../../helpers/Validation.js';
import { Button } from '../../components/Button/Button.js';
class ProfilePage extends Block {
    constructor() {
        super(tpl, { title: 'Профиль' });
    }
    componentDidMount() {
        this._children = {
            saveButton: new Button({ title: 'Сохранить' }),
            cancelButton: new Button({ title: 'Отмена' }),
        };
        const validator = new Validation();
        const validate = (e) => validator.validate([e.target]);
        const submit = (e) => {
            const errorsCount = validator.validate(e.target.elements);
            if (!!errorsCount) {
                e.preventDefault();
            }
        };
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.SUBMIT), submit);
    }
    render() {
        var _a, _b;
        const { title } = this.props;
        return this.compile({
            title,
            saveButton: (_a = this._children) === null || _a === void 0 ? void 0 : _a.saveButton.render(),
            cancelButton: (_b = this._children) === null || _b === void 0 ? void 0 : _b.cancelButton.render(),
            blurEventName: this.uniq(ProfilePage.EVENTS.BLUR),
            focusEventName: this.uniq(ProfilePage.EVENTS.FOCUS),
            submitEventName: this.uniq(ProfilePage.EVENTS.SUBMIT),
        });
    }
}
ProfilePage.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { BLUR: 'blur', FOCUS: 'focus', SUBMIT: 'submit' });
render('.app', new ProfilePage());
//# sourceMappingURL=ProfilePage.js.map