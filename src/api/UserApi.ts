import { Http } from '../helpers/Http';
import { BASE_URL } from '../consts';
import { ProfileFormModel } from '../pages/ProfilePage/ProfileFormModel';
import { PassFormModel } from '../pages/ProfilePage/PassFormModel';

const http = new Http(`${BASE_URL}/user`);

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

export class UserApi {
    get(userId: number): Promise<User> {
        return http.get(`/${userId}`);
    }

    edit(profileFormModel: ProfileFormModel): Promise<User> {
        return http.put(`/profile`, { data: profileFormModel});
    }

    editPass(passFormModel: PassFormModel) {
        return http.put(`/password`, { data: passFormModel});
    }

    editUserPic(userPic: FormData): Promise<User> {
        return http.put<FormData, User>(`/profile/avatar`, { data: userPic, headers: {} });
    }
}