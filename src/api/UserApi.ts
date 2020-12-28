import { Http } from '../helpers/Http.js';
import { BaseApi, baseUrl } from './BaseApi.js';
import { ProfileFormModel } from '../pages/ProfilePage/ProfileFormModel.js';
import { PassFormModel } from '../pages/ProfilePage/PassFormModel.js';

const http = new Http(`${baseUrl}/user`);

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

export class UserApi extends BaseApi {
    get(userId: number): Promise<User> {
        return http.get(`/${userId}`) as Promise<User>;
    }

    edit(profileFormModel: ProfileFormModel): Promise<User> {
        return http.put(`/profile`, { data: profileFormModel}) as Promise<User>;
    }

    editPass(passFormModel: PassFormModel) {
        return http.put(`/password`, { data: passFormModel});
    }

    editAva(avaForm: FormData): Promise<User> {
        return http.put<FormData>(`/profile/avatar`, { data: avaForm, headers: {} }) as Promise<User>;
    }
}