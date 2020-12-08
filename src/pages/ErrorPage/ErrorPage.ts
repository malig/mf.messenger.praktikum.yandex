import { Block } from '../../helpers/Block.js';
import { render } from '../../helpers/utils.js';
import { tpl } from './ErrorPage.tpl.js';

type ErrorPageProps = {
    title: string;
    code: number
}

class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super(tpl, props);
    }
}

render('.app', new ErrorPage({
    title: 'Ты только не расстраивайся',
    code: 404
}));