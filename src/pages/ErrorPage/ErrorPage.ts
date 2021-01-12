import { Block } from '../../helpers/Block';
import { tpl } from './ErrorPage.tpl';

type ErrorPageProps = {
    title: string;
    code: number
}

export class ErrorPage extends Block<ErrorPageProps> {
    constructor() {
        super(tpl, {
            title: 'Ты только не расстраивайся',
            code: 404
        });
    }
}