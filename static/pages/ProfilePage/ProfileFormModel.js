export class ProfileFormModel {
    constructor(data) {
        this.first_name = data.get('first_name');
        this.second_name = data.get('second_name');
        this.display_name = data.get('display_name');
        this.login = data.get('login');
        this.email = data.get('email');
        this.phone = data.get('phone');
    }
}
//# sourceMappingURL=ProfileFormModel.js.map