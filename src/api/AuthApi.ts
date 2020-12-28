import { Http } from '../helpers/Http.js';
import { BASE_URL } from '../consts.js';
import { RegistrationFormModel } from '../pages/RegistrationPage/RegistrationFormModel.js';
import { AuthFormModel } from '../pages/AuthPage/AuthFormModel.js';

const http = new Http(`${BASE_URL}/auth`);

export type User = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export class AuthApi {
    signup(user: RegistrationFormModel) {
        return http.post<RegistrationFormModel, void>('/signup', {  data: user });
    }

    signin(user: AuthFormModel) {
        return http.post<AuthFormModel, void>('/signin', {  data: user });
    }

    logout() {
        return http.post('/logout');
    }

    get(): Promise<User> {
        return http.get('/user');
    }
}