import { Block } from '../../helpers/Block';
import { tpl } from './ErrorPage.tpl';

type ErrorPageProperties = {
    title: string;
    code: number;
};

export class ErrorPage extends Block<ErrorPageProperties> {
    constructor() {
        super(tpl, {
            title: 'Ты только не расстраивайся',
            code: 500,
        });
    }
}
