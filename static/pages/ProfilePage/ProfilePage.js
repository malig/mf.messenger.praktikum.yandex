import { Block } from '../../helpers/Block.js';
import { tpl } from './ProfilePage.tpl.js';
import { Validation } from '../../helpers/Validation.js';
import { Button } from '../../components/Button/Button.js';
import { router, PATH, authController, userController } from '../../app.js';
import { ProfileFormModel } from './ProfileFormModel.js';
import { PassFormModel } from './PassFormModel.js';
export class ProfilePage extends Block {
    constructor() {
        super(tpl, {
            title: 'Профиль',
            first_name: '',
            second_name: '',
            display_name: '',
            login: '',
            email: '',
            phone: '',
            avatar: ''
        });
    }
    componentDidMount() {
        this._children = {
            saveButton: new Button({ title: 'Сохранить' }),
            savePassButton: new Button({ title: 'Сохранить' }),
            saveAvaButton: new Button({ title: 'Сохранить' }),
            cancelButton: new Button({
                faIco: 'fa-times',
                className: 'btn_ico',
                onClick: () => router.go(PATH.MESSENGER)
            }),
        };
        const validator = new Validation();
        const validate = (e) => validator.validate([e.target]);
        const submitUser = (e) => {
            e.preventDefault();
            const form = e.target;
            const errorsCount = validator.validate(form.elements);
            if (!errorsCount) {
                const formData = new FormData(form);
                userController.editUser(new ProfileFormModel(formData));
            }
        };
        const submitAva = (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            userController.editAva(formData);
        };
        const submitPass = (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            userController.editPass(new PassFormModel(formData));
        };
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.BLUR), validate);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.FOCUS), validate);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.SUBMIT), submitUser);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.SUBMIT_AVA), submitAva);
        window.eventBus.on(this.uniq(ProfilePage.EVENTS.SUBMIT_PASS), submitPass);
        userController.on(({ user }) => {
            this.setProps(Object.assign({}, user));
        });
        const currentUser = authController.getCurrentUser();
        if (currentUser) {
            userController.getUser(currentUser.id);
        }
    }
    render() {
        const { saveButton, cancelButton, savePassButton, saveAvaButton } = this._children;
        const { title, first_name, second_name, display_name, login, email, phone, avatar } = this.props;
        return this.compile({
            title,
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone,
            avatar,
            saveButton: saveButton.render(),
            cancelButton: cancelButton.render(),
            savePassButton: savePassButton.render(),
            saveAvaButton: saveAvaButton.render(),
            blurEventName: this.uniq(ProfilePage.EVENTS.BLUR),
            focusEventName: this.uniq(ProfilePage.EVENTS.FOCUS),
            submitEventName: this.uniq(ProfilePage.EVENTS.SUBMIT),
            submitPassEventName: this.uniq(ProfilePage.EVENTS.SUBMIT_PASS),
            submitAvaEventName: this.uniq(ProfilePage.EVENTS.SUBMIT_AVA),
        });
    }
}
ProfilePage.EVENTS = Object.assign(Object.assign({}, Block.EVENTS), { BLUR: 'blur', FOCUS: 'focus', SUBMIT: 'submit', SUBMIT_PASS: 'submit-pass', SUBMIT_AVA: 'submit-ava' });
//# sourceMappingURL=ProfilePage.js.map