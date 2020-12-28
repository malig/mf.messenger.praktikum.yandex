import { Http } from '../helpers/Http.js';
import { BASE_URL } from '../consts.js';
const http = new Http(`${BASE_URL}/user`);
export class UserApi {
    get(userId) {
        return http.get(`/${userId}`);
    }
    edit(profileFormModel) {
        return http.put(`/profile`, { data: profileFormModel });
    }
    editPass(passFormModel) {
        return http.put(`/password`, { data: passFormModel });
    }
    editUserPic(userPic) {
        return http.put(`/profile/avatar`, { data: userPic, headers: {} });
    }
}
//# sourceMappingURL=UserApi.js.map