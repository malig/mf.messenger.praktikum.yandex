import Handlebars from 'handlebars';

export interface ITplCompiler {
    compile: <Properties>(tpl: string, properties: Properties) => string;
}

Handlebars.registerHelper('ifEq', (v1, v2, options) => {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

export class TplCompiler implements ITplCompiler {
    compile<Properties>(tpl: string, properties: Properties) {
        const template = Handlebars.compile(tpl);
        return template(properties);
    }
}
