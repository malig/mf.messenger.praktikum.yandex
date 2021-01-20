type NullOrFormDataEntryValue = FormDataEntryValue | null;

export class PassFormModel {
    newPassword: NullOrFormDataEntryValue;

    oldPassword: NullOrFormDataEntryValue;

    constructor(data: FormData) {
        this.newPassword = data.get('newPassword');
        this.oldPassword = data.get('oldPassword');
    }
}
