import { EventBus } from './EventBus.js';
window.eventBus = new EventBus();
export class TplCompiler {
    compile(tpl, props) {
        const template = window.Handlebars.compile(tpl);
        return template(props);
    }
}
//# sourceMappingURL=TplCompiler.js.map