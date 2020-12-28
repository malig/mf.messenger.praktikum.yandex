import { Http } from '../helpers/Http.js';
import { BASE_URL } from '../consts.js';
const http = new Http(`${BASE_URL}/auth`);
export class AuthApi {
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