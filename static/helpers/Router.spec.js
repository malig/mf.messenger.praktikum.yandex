// @ts-ignore
import jsdom from 'mocha-jsdom';
import { assert } from 'chai';
import { Router } from './Router';
class FirstBlockClass {
    constructor() {
        this.destroyed = false;
    }
    destroy() {
        this.destroyed = true;
    }
}
const FirstBlock = () => FirstBlockClass;
class SecondBlockClass extends FirstBlockClass {
}
const SecondBlock = () => SecondBlockClass;
const createRouter = (selector, needNew = false) => {
    if (needNew) {
        Router.__instance = undefined;
    }
    return new Router(selector, '/');
};
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
        router.use('/path', FirstBlock());
        assert.equal(router.routes.length, 0);
        done();
    });
    it('should have routes with given url', (done) => {
        const router = createRouter('selector', true);
        router.use('/first', FirstBlock());
        router.use('/second', SecondBlock());
        assert.equal(router.routes[0]._url, '/first');
        assert.equal(router.routes[1]._url, '/second');
        done();
    });
    it('should have routes with given block', (done) => {
        const router = createRouter('selector', true);
        const firstBlock = FirstBlock();
        router.use('/first', firstBlock);
        const secondBlock = SecondBlock();
        router.use('/second', secondBlock);
        assert.equal(router.routes[0]._pageClass, firstBlock);
        assert.equal(router.routes[1]._pageClass, secondBlock);
        done();
    });
    it('should start with empty current rout', (done) => {
        const router = createRouter('selector', true);
        router.use('/first', FirstBlock());
        router.use('/second', SecondBlock());
        assert.equal(router._currentRoute, undefined);
        done();
    });
    it('should select right route', (done) => {
        var _a, _b;
        const router = createRouter('selector', true);
        router.use('/first', FirstBlock());
        router.use('/second', SecondBlock());
        router.go('/first');
        assert.equal((_a = router._currentRoute) === null || _a === void 0 ? void 0 : _a._url, '/first');
        assert.equal(router.location, '/first');
        router.go('/second');
        assert.equal((_b = router._currentRoute) === null || _b === void 0 ? void 0 : _b._url, '/second');
        assert.equal(router.location, '/second');
        done();
    });
    it('getRoute should return right route', (done) => {
        var _a, _b;
        const router = createRouter('selector', true);
        const firstBlock = FirstBlock();
        router.use('/first', firstBlock);
        const secondBlock = SecondBlock();
        router.use('/second', secondBlock);
        const firstFoundBlock = (_a = router.getRoute('/first')) === null || _a === void 0 ? void 0 : _a._pageClass;
        const secondFoundBlock = (_b = router.getRoute('/second')) === null || _b === void 0 ? void 0 : _b._pageClass;
        assert.equal(firstFoundBlock, firstBlock);
        assert.equal(secondFoundBlock, secondBlock);
        done();
    });
    it('should destroy prev page', (done) => {
        var _a;
        const router = createRouter('selector', true);
        router.use('/first', FirstBlock());
        router.use('/second', SecondBlock());
        router.go('/first');
        router.go('/second');
        const firstBlock = (_a = router.getRoute('/first')) === null || _a === void 0 ? void 0 : _a._page;
        assert.equal(firstBlock.destroyed, true);
        done();
    });
});
//# sourceMappingURL=Router.spec.js.map