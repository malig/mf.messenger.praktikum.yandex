import { Block } from '../../helpers/Block.js';
import { Validation } from '../../helpers/Validation.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './AuthPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
class AuthPage extends Block {
    constructor() {
        super(tpl, {
            title: 'Авторизация',
            button: new Button({ title: 'Войти' })
        });
        this._validator = new Validation();
        const validate = (e) => this._validator.validate([e.target]);
        const submit = (e) => {
            const errorsCount = this._validator.validate(e.target.elements);
            if (!!errorsCount) {
                e.preventDefault();
            }
        };
        window.eventBus.on(this.uniq(AuthPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.SUBMIT), submit);
    }
    render() {
        const { title, button } = this.props;
        return this.compile({
            title,
            button: button.render(),
            blurEventName: this.uniq(AuthPage.EVENTS.BLUR),
            focusEventName: this.uniq(AuthPage.EVENTS.FOCUS),
            submitEventName: this.uniq(AuthPage.EVENTS.SUBMIT),
        });
    }
}
AuthPage.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { BLUR: 'blur', FOCUS: 'focus', SUBMIT: 'submit' });
render('.app', new AuthPage());
//# sourceMappingURL=AuthPage.js.map