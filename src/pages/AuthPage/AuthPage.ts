import { Block } from '../../helpers/Block.js';
import { Validation } from '../../helpers/Validation.js';
import { tpl } from './AuthPage.tpl.js';
import { Button } from '../../components/Button/Button.js';
import { router, PATH, authController } from '../../app.js';
import { AuthFormModel } from './AuthFormModel.js';

type AuthPageProps = {
    title: string;
}

export class AuthPage extends Block<AuthPageProps> {
    static EVENTS = {
        ...Block.EVENTS,
        BLUR: 'blur',
        FOCUS: 'focus',
        SUBMIT: 'submit',
    };

    constructor() {
        super(tpl,{ title: 'Авторизация' });
    }

    componentDidMount() {
        this._children = {
            button: new Button({ title: 'Войти' }),
            registrationButton: new Button({
                title: 'Регистрация',
                onClick: () => router.go(PATH.REGISTRATION)
            })
        }

        const validator = new Validation();
        const validate = (e: Event) => validator.validate([e.target as HTMLInputElement])
        const submit = (e: Event) => {
            e.preventDefault();

            const form = e.target as HTMLFormElement;
            const errorsCount = validator.validate(form.elements);

            if (!errorsCount) {
                const formData = new FormData(form);
                authController.login(new AuthFormModel(formData));
            }
        };

        window.eventBus.on(this.uniq(AuthPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.SUBMIT), submit);
    };

    render(): string {
        const { button, registrationButton } = this._children;
        const { title } = this.props;

        return this.compile({
            title,
            button: button.render(),
            registrationButton: registrationButton.render(),
            blurEventName: this.uniq(AuthPage.EVENTS.BLUR),
            focusEventName: this.uniq(AuthPage.EVENTS.FOCUS),
            submitEventName: this.uniq(AuthPage.EVENTS.SUBMIT),
        });
    }
}