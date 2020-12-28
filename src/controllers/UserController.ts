import { Controller } from '../helpers/Controller.js';
import { UserApi, User } from '../api/UserApi.js';
import { ProfileFormModel } from '../pages/ProfilePage/ProfileFormModel.js';
import { PassFormModel } from '../pages/ProfilePage/PassFormModel.js';
import { HOST } from '../consts.js';

type UserInitialState = {
    user?: User
}

const userApi = new UserApi();

enum ACTION {
    SET_USER = 'setUser'
}

export class UserController extends Controller<UserInitialState>{
    initialState: UserInitialState = {
        user: undefined
    }

    reducers = {
        [ACTION.SET_USER]: (state: UserInitialState, payload: User) => {
            state.user = payload;
            return state;
        }
    }

    setUser(user:User) {
        this.dispatch(ACTION.SET_USER, {...user, avatar: `${HOST}${user.avatar}` });
    }

    getUser(userId: number) {
        userApi.get(userId).then((user) => this.setUser(user));
    }

    editUser(profileFormModel: ProfileFormModel) {
        userApi.edit(profileFormModel).then((user) => this.setUser(user));
    }

    editPass(passFormModel: PassFormModel) {
        userApi.editPass(passFormModel);
    }

    editAva(avaForm: FormData) {
        userApi.editAva(avaForm).then((user) => this.setUser(user));
    }
}