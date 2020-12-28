import { Controller } from '../helpers/Controller.js';
import { AuthApi } from '../api/AuthApi.js';
import { PATH, router } from '../app.js';
const authApi = new AuthApi();
var ACTION;
(function (ACTION) {
    ACTION["SET_USER"] = "setUser";
})(ACTION || (ACTION = {}));
export class AuthController extends Controller {
    constructor() {
        super(...arguments);
        this.initialState = {
            user: undefined
        };
        this.reducers = {
            [ACTION.SET_USER]: (state, payload) => {
                state.user = payload;
                return state;
            }
        };
    }
    fetchUser() {
        return authApi.get().then((user) => {
            this.dispatch(ACTION.SET_USER, user);
            return user;
        });
    }
    checkAuth() {
        this.fetchUser().then(() => {
            if ([PATH.REGISTRATION, PATH.AUTH, PATH.ROOT].includes(router.location)) {
                router.go(PATH.MESSENGER);
            }
            else {
                router.go(router.location);
            }
        }, () => router.go(PATH.AUTH));
    }
    logout() {
        authApi.logout().then(() => {
            this.checkAuth();
        });
    }
    login(authFormModel) {
        authApi.signin(authFormModel).then(() => {
            this.checkAuth();
        });
    }
    register(registrationFormModel) {
        authApi.signup(registrationFormModel).then(() => {
            this.checkAuth();
        });
    }
    getCurrentUser() {
        return this.getState().user;
    }
}
//# sourceMappingURL=AuthController.js.map