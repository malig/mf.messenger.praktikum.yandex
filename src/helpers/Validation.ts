export enum Rule {
    Required = 'required',
    Email = 'email',
    Number = 'number',
    Pass = 'pass',
    Phone = 'phone',
    LessThanThree = 'lessThanThree',
}

interface IRules {
    [key: string]: string[];
}

const defaultRules = {
    first_name: [Rule.Required, Rule.LessThanThree],
    second_name: [Rule.Required, Rule.LessThanThree],
    display_name: [],
    login: [Rule.Required],
    email: [Rule.Email],
    password: [],
    phone: [Rule.Phone],
};

export class Validation {
    _check = {
        [Rule.Required]: (value: string) => value !== '',
        [Rule.Number]: (value: string) => Number.isNaN(Number(value)),
        [Rule.Email]: (value: string) => /^([\w.-])+@([\w.-])+\.([A-Za-z]{2,4})$/.test(value),
        [Rule.Pass]: (value: string) => /^[\da-z]{6,}$/.test(value),
        [Rule.Phone]: (value: string) => /^\d[\d ()-]{4,14}\d$/.test(value),
        [Rule.LessThanThree]: (value: string) => value.length >= 3,
    };

    _rules: IRules;

    constructor(rules: IRules = defaultRules) {
        this._rules = rules;
    }

    validate(inputList: HTMLInputElement[] | HTMLFormControlsCollection) {
        return [].reduce.call(
            inputList,
            (count, input: HTMLInputElement) => {
                const errors = this._validate(input);
                return Number(count) + errors.length;
            },
            0,
        );
    }

    _validate(input: HTMLInputElement) {
        const { name, value } = input;
        const rules = this._rules[name];
        const errors: string[] = [];

        if (rules) {
            this._removeMessages(input);

            rules.forEach((rule) => {
                switch (rule) {
                    case Rule.Required:
                        if (!this._check[rule](value)) {
                            errors.push('Поле обязательно для заполнения');
                        }

                        break;
                    case Rule.Number:
                        if (!this._check[rule](value)) {
                            errors.push('Значение не является числом');
                        }

                        break;
                    case Rule.Email:
                        if (!this._check[rule](value)) {
                            errors.push('Это не адрес электронной почты');
                        }

                        break;
                    case Rule.Pass:
                        if (!this._check[rule](value)) {
                            errors.push('Должно быть не менее 6 символов (буквы или цифры)');
                        }

                        break;
                    case Rule.Phone:
                        if (!this._check[rule](value)) {
                            errors.push('С номером телефона что-то не так');
                        }

                        break;
                    case Rule.LessThanThree:
                        if (!this._check[rule](value)) {
                            errors.push('Нужно не менее 3х символов');
                        }

                        break;
                    default:
                }
            });

            this._addMessages(input, errors);
        }

        return errors;
    }

    _removeMessages(input: HTMLInputElement) {
        [].forEach.call(input.parentNode?.childNodes, (node: Element) => {
            if (node.className === 'error-list') {
                node.remove();
            }
        });
    }

    _addMessages(input: HTMLInputElement, errors: string[]) {
        const ul = document.createElement('ul');
        ul.className = 'error-list';

        errors.forEach((error) => {
            const li = document.createElement('li');
            li.textContent = error;
            li.className = 'error-list__item';
            ul.append(li);
        });

        input.parentNode?.append(ul);
    }
}
