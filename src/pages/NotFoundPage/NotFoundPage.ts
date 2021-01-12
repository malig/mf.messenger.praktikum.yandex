import { Block } from '../../helpers/Block';
import { tpl } from './NotFoundPage.tpl';

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