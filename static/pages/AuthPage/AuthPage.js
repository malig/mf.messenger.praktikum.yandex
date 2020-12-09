import { Block } from '../../helpers/Block.js';
import { Validation } from '../../helpers/Validation.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './AuthPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
class AuthPage extends Block {
    constructor() {
        super(tpl, { title: 'Авторизация' });
    }
    componentDidMount() {
        this._children = {
            button: new Button({ title: 'Войти' })
        };
        const validator = new Validation();
        const validate = (e) => validator.validate([e.target]);
        const submit = (e) => {
            const errorsCount = validator.validate(e.target.elements);
            if (!!errorsCount) {
                e.preventDefault();
            }
        };
        window.eventBus.on(this.uniq(AuthPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.SUBMIT), submit);
    }
    ;
    render() {
        var _a;
        const { title } = this.props;
        return this.compile({
            title,
            button: (_a = this._children) === null || _a === void 0 ? void 0 : _a.button.render(),
            blurEventName: this.uniq(AuthPage.EVENTS.BLUR),
            focusEventName: this.uniq(AuthPage.EVENTS.FOCUS),
            submitEventName: this.uniq(AuthPage.EVENTS.SUBMIT),
        });
    }
}
AuthPage.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { BLUR: 'blur', FOCUS: 'focus', SUBMIT: 'submit' });
render('.app', new AuthPage());
//# sourceMappingURL=AuthPage.js.map