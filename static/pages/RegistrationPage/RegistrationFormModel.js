export class RegistrationFormModel {
    constructor(data) {
        this.first_name = data.get('first_name');
        this.second_name = data.get('second_name');
        this.login = data.get('login');
        this.email = data.get('email');
        this.password = data.get('password');
        this.phone = data.get('phone');
    }
}
//# sourceMappingURL=RegistrationFormModel.js.map