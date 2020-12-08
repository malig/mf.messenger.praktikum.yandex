import { Block } from '../../helpers/Block.js';
import { Validation } from '../../helpers/Validation.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './AuthPage.tpl.js';
import { Button } from '../../components/Button/Button.js';

type AuthPageProps = {
    title: string;
    button: Button
}

class AuthPage extends Block<AuthPageProps> {
    static EVENTS = {
        ...Block.EVENTS,
        BLUR: 'blur',
        FOCUS: 'focus',
        SUBMIT: 'submit',
    };

    _validator: Validation;

    constructor() {
        super(tpl,{
            title: 'Авторизация',
            button: new Button({ title: 'Войти' })
        });

        this._validator = new Validation();
        const validate = (e: Event) => this._validator.validate([e.target as HTMLInputElement])
        const submit = (e: Event) => {
            const errorsCount = this._validator.validate((e.target as HTMLFormElement).elements);

            if (!!errorsCount) {
                e.preventDefault();
            }
        };

        window.eventBus.on(this.uniq(AuthPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.SUBMIT), submit);
    }

    render(): string {
        const { title, button } = this.props as AuthPageProps;

        return this.compile({
            title,
            button: button.render(),
            blurEventName: this.uniq(AuthPage.EVENTS.BLUR),
            focusEventName: this.uniq(AuthPage.EVENTS.FOCUS),
            submitEventName: this.uniq(AuthPage.EVENTS.SUBMIT),
        });
    }
}

render('.app', new AuthPage());