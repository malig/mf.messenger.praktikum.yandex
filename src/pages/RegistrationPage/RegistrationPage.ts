import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './RegistrationPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { Validation } from '../../helpers/Validation.js';

type RegistrationPageProps = {
    title: string;
    button: Button
}

class RegistrationPage extends Block<RegistrationPageProps> {
    static EVENTS = {
        ...Block.EVENTS,
        BLUR: 'blur',
        FOCUS: 'focus',
        SUBMIT: 'submit',
    };

    _validator: Validation;

    constructor() {
        super(tpl, {
            title: 'Регистрация',
            button: new Button({ title: 'Зарегистрироваться', className: 'full-width' })
        });

        this._validator = new Validation();
        const validate = (e: Event) => this._validator.validate([e.target as HTMLInputElement])
        const submit = (e: Event) => {
            const errorsCount = this._validator.validate((e.target as HTMLFormElement).elements);

            if (!!errorsCount) {
                e.preventDefault();
            }
        };

        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(RegistrationPage.EVENTS.SUBMIT), submit);
    }

    render(): string {
        const { title, button } = this.props as RegistrationPageProps;

        return this.compile({
            title,
            button: button.render(),
            blurEventName: this.uniq(RegistrationPage.EVENTS.BLUR),
            focusEventName: this.uniq(RegistrationPage.EVENTS.FOCUS),
            submitEventName: this.uniq(RegistrationPage.EVENTS.SUBMIT),
        });
    }

}

render('.app', new RegistrationPage());