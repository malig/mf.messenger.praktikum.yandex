import { EventBus } from './EventBus.js';

/** Пусть пока все хаки будут в одном месте)*/
declare global {
    interface Window {
        Handlebars: any;
        eventBus: EventBus
    }
}

(window as Window).eventBus = new EventBus();

export interface ITplCompiler {
    compile: <Props>(tpl: string, props: Props) => string,
}

export class TplCompiler implements ITplCompiler {
    compile<Props>(tpl: string, props: Props) {
        const template = window.Handlebars.compile(tpl);
        return template(props);
    }
}