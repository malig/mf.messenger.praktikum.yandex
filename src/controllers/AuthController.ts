import { Controller } from '../helpers/Controller.js';
import { AuthApi, User } from '../api/AuthApi.js';
import { PATH, router } from '../app.js';
import { AuthFormModel } from '../pages/AuthPage/AuthFormModel.js';
import { RegistrationFormModel } from '../pages/RegistrationPage/RegistrationFormModel.js';

type AuthInitialState = {
    user?: User
}

const authApi = new AuthApi();

enum ACTION {
    SET_USER = 'setUser'
}

export class AuthController extends Controller<AuthInitialState>{
    initialState: AuthInitialState = {
        user: undefined
    }

    reducers = {
        [ACTION.SET_USER]: (state: AuthInitialState, payload: User) => {
            state.user = payload;
            return state;
        }
    }

    fetchUser() {
        return authApi.get().then((user) => {
            this.dispatch(ACTION.SET_USER, user);
            return user;
        })
    }

    checkAuth() {
        this.fetchUser().then(
            () => {
                if (([PATH.REGISTRATION, PATH.AUTH, PATH.ROOT] as string[]).includes(router.location)) {
                    router.go(PATH.MESSENGER);
                } else {
                    router.go(router.location);
                }
            },
            () => router.go(PATH.AUTH)
        );
    }

    logout() {
        authApi.logout().then(() => {
            this.checkAuth();
        })
    }

    login(authFormModel: AuthFormModel) {
        authApi.signin(authFormModel).then(() => {
            this.checkAuth();
        })
    }

    register(registrationFormModel: RegistrationFormModel) {
        authApi.signup(registrationFormModel).then(() => {
            this.checkAuth();
        })
    }

    getCurrentUser() {
        return this.getState().user;
    }
}