import { Controller } from '../helpers/Controller.js';
import { UserApi } from '../api/UserApi.js';
import { HOST } from '../consts.js';
const userApi = new UserApi();
var ACTION;
(function (ACTION) {
    ACTION["SET_USER"] = "setUser";
})(ACTION || (ACTION = {}));
export class UserController extends Controller {
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
    setUser(user) {
        this.dispatch(ACTION.SET_USER, Object.assign(Object.assign({}, user), { avatar: `${HOST}${user.avatar}` }));
    }
    getUser(userId) {
        userApi.get(userId).then((user) => this.setUser(user));
    }
    editUser(profileFormModel) {
        userApi.edit(profileFormModel).then((user) => this.setUser(user));
    }
    editPass(passFormModel) {
        userApi.editPass(passFormModel);
    }
    editUserPic(userPic) {
        userApi.editUserPic(userPic).then((user) => this.setUser(user));
    }
}
//# sourceMappingURL=UserController.js.map