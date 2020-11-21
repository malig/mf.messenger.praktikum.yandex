function onClick() {
    const formValue = [...document.forms[0].elements].reduce((acc,input) => {
        const {name, value} = input;
        acc[name] = value;
        return acc;
    }, {});

    console.log(formValue);
}