import { Controller } from '../helpers/Controller';
import { UserApi, User } from '../api/UserApi';
import { ProfileFormModel } from '../pages/ProfilePage/ProfileFormModel';
import { PassFormModel } from '../pages/ProfilePage/PassFormModel';
import { HOST } from '../consts';

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

    editUserPic(userPic: FormData) {
        userApi.editUserPic(userPic).then((user) => this.setUser(user));
    }
}