import { Block } from './Block.js';

export const render = <Props>(query: string, block: Block<Props>) => {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(block.getContent());
    }
}