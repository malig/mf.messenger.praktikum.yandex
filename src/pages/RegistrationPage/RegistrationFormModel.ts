type NullOrFormDataEntryValue = FormDataEntryValue | null;

export class RegistrationFormModel {
    first_name: NullOrFormDataEntryValue;

    second_name: NullOrFormDataEntryValue;

    login: NullOrFormDataEntryValue;

    email: NullOrFormDataEntryValue;

    password: NullOrFormDataEntryValue;

    phone: NullOrFormDataEntryValue;

    constructor(data: FormData) {
        this.first_name = data.get('first_name');
        this.second_name = data.get('second_name');
        this.login = data.get('login');
        this.email = data.get('email');
        this.password = data.get('password');
        this.phone = data.get('phone');
    }
}
