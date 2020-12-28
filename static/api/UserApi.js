import { Http } from '../helpers/Http.js';
import { BaseApi, baseUrl } from './BaseApi.js';
const http = new Http(`${baseUrl}/user`);
export class UserApi extends BaseApi {
    get(userId) {
        return http.get(`/${userId}`);
    }
    edit(profileFormModel) {
        return http.put(`/profile`, { data: profileFormModel });
    }
    editPass(passFormModel) {
        return http.put(`/password`, { data: passFormModel });
    }
    editAva(avaForm) {
        return http.put(`/profile/avatar`, { data: avaForm, headers: {} });
    }
}
//# sourceMappingURL=UserApi.js.map