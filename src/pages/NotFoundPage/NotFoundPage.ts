import { Block } from '../../helpers/Block.js';
import { tpl } from './NotFoundPage.tpl.js';

type NotFoundPageProps = {
    title: string;
    code: number
}

export class NotFoundPage extends Block<NotFoundPageProps> {
    constructor() {
        super(tpl, {
            title: 'Такой страницы не существует',
            code: 404
        });
    }
}