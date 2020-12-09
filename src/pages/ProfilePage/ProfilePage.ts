import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './ProfilePage.tpl.js';
import { Validation } from '../../helpers/Validation.js'
import { Button } from '../../components/Button/Button.js';

type ProfilePageProps = {
    title: string;
    saveButton?: string;
    cancelButton?: string;
    blurEventName?: string;
    focusEventName?: string;
    submitEventName?: string;
}

class ProfilePage extends Block<ProfilePageProps> {
    static EVENTS = {
        ...Block.EVENTS,
        BLUR: 'blur',
        FOCUS: 'focus',
        SUBMIT: 'submit',
    };

    constructor() {
        super(tpl, { title: 'Профиль' });
    }

    componentDidMount() {
        this._children = {
            saveButton: new Button({ title: 'Сохранить' }),
            cancelButton: new Button({ title: 'Отмена' }),
        }

        const validator = new Validation();
        const validate = (e: Event) => validator.validate([e.target as HTMLInputElement])
        const submit = (e: Event) => {
            const errorsCount = validator.validate((e.target as HTMLFormElement).elements);

            if (!!errorsCount) {
                e.preventDefault();
            }
        };

        window.eventBus.on(this.uniq(ProfilePage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.SUBMIT), submit);
    }

    render(): string {
        const { title } = this.props;

        return this.compile({
            title,
            saveButton: this._children?.saveButton.render(),
            cancelButton: this._children?.cancelButton.render(),
            blurEventName: this.uniq(ProfilePage.EVENTS.BLUR),
            focusEventName: this.uniq(ProfilePage.EVENTS.FOCUS),
            submitEventName: this.uniq(ProfilePage.EVENTS.SUBMIT),
        });
    }
}

render('.app', new ProfilePage());