import { assert } from 'chai';
import { Block } from './Block';

const jsdom = require('mocha-jsdom');

describe('Block', () => {
    jsdom({ url: 'http://localhost' });

    it('should render DOM with props', (done) => {
        const block = new Block(`<div>{{{prop}}}</div>`, { prop: 'value' });
        assert.equal(block._element.innerHTML, '<div>value</div>');
        done();
    });

    it('should rerender DOM after setProps', (done) => {
        const block = new Block(`<div>{{{prop}}}</div>`, { prop: 'value' });
        assert.equal(block._element.innerHTML, '<div>value</div>');

        block.setProps({ prop: 'value2' });
        assert.equal(block._element.innerHTML, '<div>value2</div>');
        done();
    });
});
