function onClick() {
    console.log([...document.forms[0].elements].reduce((acc,input) => {
        const {name, value} = input;
        return {...acc, [name]: value};
    }, {}));
}