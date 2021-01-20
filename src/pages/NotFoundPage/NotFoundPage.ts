import { Block } from '../../helpers/Block';
import { tpl } from './NotFoundPage.tpl';

type NotFoundPageProperties = {
    title: string;
    code: number;
};

export class NotFoundPage extends Block<NotFoundPageProperties> {
    constructor() {
        super(tpl, {
            title: 'Такой страницы не существует',
            code: 404,
        });
    }
}
