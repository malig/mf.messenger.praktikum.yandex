import { Block } from '../../helpers/Block';
import { tpl } from './RegistrationPage.tpl';
import { Button } from '../../components/Button/Button';
import { Validation } from '../../helpers/Validation';
import { authController } from '../../index';
import { RegistrationFormModel } from './RegistrationFormModel';

type RegistrationPageProperties = {
    title: string;
};

export class RegistrationPage extends Block<RegistrationPageProperties> {
    static EVENTS = {
        ...Block.EVENTS,
        BLUR: 'blur',
        FOCUS: 'focus',
        SUBMIT: 'submit',
    };

    constructor() {
        super(tpl, { title: 'Регистрация' });
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                title: 'Зарегистрироваться',
                className: 'full-width',
            }),
        };

        const validator = new Validation();
        const validate = (event: Event) => validator.validate([event.target as HTMLInputElement]);
        const submit = (event: Event) => {
            event.preventDefault();

            const form = event.target as HTMLFormElement;
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

    render(): string {
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
