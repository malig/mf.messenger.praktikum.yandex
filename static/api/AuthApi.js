import { Http } from '../helpers/Http.js';
import { BaseApi, baseUrl } from './BaseApi.js';
const http = new Http(`${baseUrl}/auth`);
export class AuthApi extends BaseApi {
    signup(user) {
        return http.post('/signup', { data: user });
    }
    signin(user) {
        return http.post('/signin', { data: user });
    }
    logout() {
        return http.post('/logout');
    }
    get() {
        return http.get('/user');
    }
}
//# sourceMappingURL=AuthApi.js.map