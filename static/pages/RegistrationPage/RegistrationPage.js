import { Block } from '../../helpers/Block.js';
import { tpl } from './RegistrationPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { Validation } from '../../helpers/Validation.js';
import { authController } from '../../app.js';
import { RegistrationFormModel } from './RegistrationFormModel.js';
export class RegistrationPage extends Block {
    constructor() {
        super(tpl, { title: 'Регистрация' });
    }
    componentDidMount() {
        this._children = {
            button: new Button({
                title: 'Зарегистрироваться',
                className: 'full-width'
            })
        };
        const validator = new Validation();
        const validate = (e) => validator.validate([e.target]);
        const submit = (e) => {
            e.preventDefault();
            const form = e.target;
            const errorsCount = validator.validate(form.elements);
            if (!errorsCount) {
                const formData = new FormData(form);
                authController.register(new RegistrationFormModel(formData));
            }
        };
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.SUBMIT), submit);
    }
    render() {
        const { button } = this._children;
        const { title } = this.props;
        return this.compile({
            title,
            button: button.render(),
            blurEventName: this.uniq(RegistrationPage.EVENTS.BLUR),
            focusEventName: this.uniq(RegistrationPage.EVENTS.FOCUS),
            submitEventName: this.uniq(RegistrationPage.EVENTS.SUBMIT),
        });
    }
}
RegistrationPage.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { BLUR: 'blur', FOCUS: 'focus', SUBMIT: 'submit' });
//# sourceMappingURL=RegistrationPage.js.map