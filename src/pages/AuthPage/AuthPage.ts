import { Block } from '../../helpers/Block.js';
import { Validation } from '../../helpers/Validation.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './AuthPage.tpl.js';
import { Button } from '../../components/Button/Button.js';

type AuthPageProps = {
    title: string;
    button?: string;
    blurEventName?: string;
    focusEventName?: string;
    submitEventName?: string;
}

class AuthPage extends Block<AuthPageProps> {
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
            button: new Button({ title: 'Войти' })
        }

        const validator = new Validation();
        const validate = (e: Event) => validator.validate([e.target as HTMLInputElement])
        const submit = (e: Event) => {
            const errorsCount = validator.validate((e.target as HTMLFormElement).elements);

            if (!!errorsCount) {
                e.preventDefault();
            }
        };

        window.eventBus.on(this.uniq(AuthPage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(AuthPage.EVENTS.SUBMIT), submit);
    };

    render(): string {
        const { title } = this.props;

        return this.compile({
            title,
            button: this._children?.button.render(),
            blurEventName: this.uniq(AuthPage.EVENTS.BLUR),
            focusEventName: this.uniq(AuthPage.EVENTS.FOCUS),
            submitEventName: this.uniq(AuthPage.EVENTS.SUBMIT),
        });
    }
}

render('.app', new AuthPage());