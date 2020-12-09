import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './RegistrationPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { Validation } from '../../helpers/Validation.js';
class RegistrationPage extends Block {
    constructor() {
        super(tpl, { title: 'Регистрация' });
    }
    componentDidMount() {
        this._children = {
            button: new Button({ title: 'Зарегистрироваться', className: 'full-width' })
        };
        const validator = new Validation();
        const validate = (e) => validator.validate([e.target]);
        const submit = (e) => {
            const errorsCount = validator.validate(e.target.elements);
            if (!!errorsCount) {
                e.preventDefault();
            }
        };
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.SUBMIT), submit);
    }
    render() {
        var _a;
        const { title } = this.props;
        return this.compile({
            title,
            button: (_a = this._children) === null || _a === void 0 ? void 0 : _a.button.render(),
            blurEventName: this.uniq(RegistrationPage.EVENTS.BLUR),
            focusEventName: this.uniq(RegistrationPage.EVENTS.FOCUS),
            submitEventName: this.uniq(RegistrationPage.EVENTS.SUBMIT),
        });
    }
}
RegistrationPage.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { BLUR: 'blur', FOCUS: 'focus', SUBMIT: 'submit' });
render('.app', new RegistrationPage());
//# sourceMappingURL=RegistrationPage.js.map