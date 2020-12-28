// @ts-ignore
import jsdom from 'mocha-jsdom';
import { assert } from 'chai';
import { Router } from './Router';

class FirstBlockClass {
    destroyed = false

    destroy() {
        this.destroyed = true
    }
}
const FirstBlock = () => FirstBlockClass as any;

class SecondBlockClass extends FirstBlockClass {}
const SecondBlock = () => SecondBlockClass as any;

const createRouter = (selector: string, needNew = false) => {
    if (needNew) {
        Router.__instance = undefined as any;
    }
    return new Router(selector);
}

describe('Routing', () => {
    jsdom({ url: 'http://localhost' });

    it('router is singleton. should return first instance domSelector', (done) => {
        let router;
        router = createRouter('.first');
        router = createRouter('.second');

        assert.equal(router._domSelector, '.first');
        done();
    });

    it('should return empty routes if domSelector is empty string', (done) => {
        const router = createRouter('', true);
        router.use('/path', FirstBlock())

        assert.equal(router.routes.length, 0);
        done();
    });

    it('should have routes with given url', (done) => {
        const router = createRouter('selector', true);

        router.use('/first', FirstBlock())
        router.use('/second', SecondBlock())

        assert.equal(router.routes[0]._url, '/first');
        assert.equal(router.routes[1]._url, '/second');
        done();
    });

    it('should have routes with given block', (done) => {
        const router = createRouter('selector', true);

        const firstBlock = FirstBlock();
        router.use('/first', firstBlock)

        const secondBlock = SecondBlock();
        router.use('/second', secondBlock)

        assert.equal(router.routes[0]._pageClass, firstBlock);
        assert.equal(router.routes[1]._pageClass, secondBlock);
        done();
    });

    it('should start with empty current rout', (done) => {
        const router = createRouter('selector', true);

        router.use('/first', FirstBlock())
        router.use('/second', SecondBlock())

        assert.equal(router._currentRoute, undefined);
        done();
    });

    it('should select right route', (done) => {
        const router = createRouter('selector', true);

        router.use('/first', FirstBlock())
        router.use('/second', SecondBlock())

        router.go('/first')
        assert.equal(router._currentRoute?._url, '/first');
        assert.equal(router.location, '/first');

        router.go('/second')
        assert.equal(router._currentRoute?._url, '/second');
        assert.equal(router.location, '/second');

        done();
    });

    it('getRoute should return right route', (done) => {
        const router = createRouter('selector', true);

        const firstBlock = FirstBlock();
        router.use('/first', firstBlock);

        const secondBlock = SecondBlock();
        router.use('/second', secondBlock);

        const firstFoundBlock = router.getRoute('/first')?._pageClass;
        const secondFoundBlock = router.getRoute('/second')?._pageClass;

        assert.equal(firstFoundBlock, firstBlock);
        assert.equal(secondFoundBlock, secondBlock);

        done();
    });

    it('should destroy prev page', (done) => {
        const router = createRouter('selector', true);

        router.use('/first', FirstBlock())
        router.use('/second', SecondBlock())

        router.go('/first')
        router.go('/second')

        const firstBlock = router.getRoute('/first')?._page as any

        assert.equal(firstBlock.destroyed, true);

        done();
    });
});