type NullOrFormDataEntryValue = FormDataEntryValue | null;

export class AuthFormModel {
    login: NullOrFormDataEntryValue
    password: NullOrFormDataEntryValue

    constructor(data: FormData) {
        this.login = data.get('login');
        this.password = data.get('password');
    }
}