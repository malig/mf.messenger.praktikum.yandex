export var Rule;
(function (Rule) {
    Rule["Required"] = "required";
    Rule["Email"] = "email";
    Rule["Number"] = "number";
    Rule["Pass"] = "pass";
    Rule["Phone"] = "phone";
    Rule["LessThanThree"] = "lessThanThree";
})(Rule || (Rule = {}));
const defaultRules = {
    'first_name': [Rule.Required, Rule.LessThanThree],
    'second_name': [Rule.Required, Rule.LessThanThree],
    'display_name': [Rule.Required, Rule.LessThanThree],
    'login': [Rule.Required],
    'email': [Rule.Email],
    'password': [Rule.Pass],
    'phone': [Rule.Phone]
};
export class Validation {
    constructor(rules = defaultRules) {
        this._check = {
            [Rule.Required]: (value) => value !== '',
            [Rule.Number]: (value) => isNaN(Number(value)),
            [Rule.Email]: (value) => /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value),
            [Rule.Pass]: (value) => /^[0-9a-z]{6,}$/.test(value),
            [Rule.Phone]: (value) => /^\d[\d() -]{4,14}\d$/.test(value),
            [Rule.LessThanThree]: (value) => value.length >= 3
        };
        this._rules = rules;
    }
    validate(inputList) {
        return [].reduce.call(inputList, (count, input) => {
            const errors = this._validate(input);
            return count + errors.length;
        }, 0);
    }
    _validate(input) {
        const { name, value } = input;
        const rules = this._rules[name];
        const errors = [];
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
    _removeMessages(input) {
        var _a;
        [].forEach.call((_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.childNodes, (node) => {
            if (node.className === 'error-list') {
                node.remove();
            }
        });
    }
    _addMessages(input, errors) {
        var _a;
        const ul = document.createElement('ul');
        ul.className = 'error-list';
        errors.forEach((error) => {
            const li = document.createElement('li');
            li.textContent = error;
            li.className = 'error-list__item';
            ul.appendChild(li);
        });
        (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.append(ul);
    }
}
//# sourceMappingURL=Validation.js.map