import { Block } from '../../helpers/Block';
import { tpl } from './AddChatUser.tpl';
import { Button } from '../Button/Button';
import { searchUserController } from '../../index';

import './AddChatUser.less';

type AddChatUserProperties = {
    onAdd: (userId: number) => void;
    changeUserNameEventName?: string;
    disabled?: boolean;
};

export class AddChatUser extends Block<AddChatUserProperties> {
    static EVENTS = {
        ...Block.EVENTS,
        CHANGE_USER_NAME: 'change-user-name',
    };

    private userName = '';

    constructor(properties: AddChatUserProperties) {
        super(tpl, properties);
    }

    clear() {
        this.userName = '';
    }

    componentDidMount() {
        this._children = {
            button: new Button({
                faIco: 'fa-plus',
                className: 'btn_ico add-chat__btn zero-border',
                onClick: () => {
                    const { userName } = this;

                    if (userName.trim()) {
                        searchUserController.searchUser(userName);
                    } else {
                        alert('Введи имя пользователя');
                    }
                },
            }),
        };

        searchUserController.on(({ searchResult }) => {
            const foundUser = searchResult.find((user) => user.login === this.userName);

            if (foundUser) {
                this.props.onAdd(foundUser.id);
                this.clear();
            } else {
                alert('Нет такого пользователя');
            }
        });

        window.eventBus.on(this.uniq(AddChatUser.EVENTS.CHANGE_USER_NAME), (e: Event) => {
            this.userName = (e.target as HTMLInputElement).value;
        });
    }

    render(properties: AddChatUserProperties): string {
        const { disabled } = properties || this.props;

        return this.compile({
            button: this._children.button.render(),
            changeUserNameEventName: this.uniq(AddChatUser.EVENTS.CHANGE_USER_NAME),
            disabled,
        });
    }
}
