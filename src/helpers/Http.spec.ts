import { assert, expect } from 'chai';
import { Http } from './Http';

const sinon = require('sinon');

let xhr: any;
let requests: any;
let http: any;
const ok = 'ok';

describe('Http', () => {
    beforeEach(() => {
        http = new Http(`/`);
        xhr = sinon.useFakeXMLHttpRequest();
        global.XMLHttpRequest = xhr;

        requests = [];
        xhr.onCreate = (req: any) => requests.push(req);
    });

    afterEach(() => {
        xhr.restore();
    });

    describe('Get', () => {
        it('should return correct result', (done) => {
            http.get('url').then((data: string) => {
                expect(data).to.equal(ok);
                done();
            });

            assert.equal(requests.length, 1);
            requests[0].respond(200, { 'Content-Type': 'text/json' }, ok);
        });

        it('should method be equal "GET"', (done) => {
            http.get('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].method, 'GET');
            done();
        });

        it('should execute a request for the correct url', (done) => {
            http.get('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].url, '/url');
            done();
        });
    });

    describe('Post', () => {
        it('should return correct result', (done) => {
            http.post('url').then((data: string) => {
                expect(data).to.equal(ok);
                done();
            });

            assert.equal(requests.length, 1);
            requests[0].respond(200, { 'Content-Type': 'text/json' }, ok);
        });

        it('should method be equal "POST"', (done) => {
            http.post('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].method, 'POST');
            done();
        });

        it('should execute a request for the correct url', (done) => {
            http.post('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].url, '/url');
            done();
        });
    });

    describe('Put', () => {
        it('should return correct result', (done) => {
            http.put('url').then((data: string) => {
                expect(data).to.equal(ok);
                done();
            });

            assert.equal(requests.length, 1);
            requests[0].respond(200, { 'Content-Type': 'text/json' }, ok);
        });

        it('should method be equal "PUT"', (done) => {
            http.put('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].method, 'PUT');
            done();
        });

        it('should execute a request for the correct url', (done) => {
            http.put('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].url, '/url');
            done();
        });
    });

    describe('Delete', () => {
        it('should return correct result', (done) => {
            http.delete('url').then((data: string) => {
                expect(data).to.equal(ok);
                done();
            });

            assert.equal(requests.length, 1);
            requests[0].respond(200, { 'Content-Type': 'text/json' }, ok);
        });

        it('should method be equal "DELETE"', (done) => {
            http.delete('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].method, 'DELETE');
            done();
        });

        it('should execute a request for the correct url', (done) => {
            http.delete('url');
            assert.equal(requests.length, 1);
            assert.equal(requests[0].url, '/url');
            done();
        });
    });
});
