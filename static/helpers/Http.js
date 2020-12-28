import { queryString } from './queryString.js';
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["PUT"] = "PUT";
    METHODS["POST"] = "POST";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
const postHeaders = {
    headers: { 'content-type': 'application/json' },
};
export class Http {
    constructor(url = '') {
        this.request = (url, options) => {
            const { method, data, headers } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                if (headers) {
                    Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]));
                }
                xhr.onload = function () {
                    var _a;
                    if (xhr.status === 200) {
                        const isJson = ((_a = xhr.getResponseHeader('content-type')) === null || _a === void 0 ? void 0 : _a.indexOf('application/json')) !== -1;
                        resolve(isJson ? JSON.parse(xhr.response) : xhr.response);
                    }
                    else {
                        const error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.onabort = function () {
                    reject(new Error('Abort Error'));
                };
                xhr.onerror = function () {
                    reject(new Error('Network Error'));
                };
                xhr.withCredentials = true;
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(data instanceof FormData ? data : JSON.stringify(data));
                }
            });
        };
        this.get = (url, options = {}) => {
            const { data } = options;
            let requestUrl = this.getUrl(url);
            requestUrl = data ? `${requestUrl}?${queryString(data)}` : requestUrl;
            const requestParams = Object.assign(Object.assign({}, options), { method: METHODS.GET });
            return this.request(requestUrl, requestParams).catch((error) => { throw (error); });
        };
        this.post = (url, options = {}) => {
            const requestUrl = this.getUrl(url);
            const requestParams = Object.assign(Object.assign(Object.assign({}, postHeaders), options), { method: METHODS.POST });
            return this.request(requestUrl, requestParams).catch((error) => { throw (error); });
        };
        this.put = (url, options) => {
            const requestUrl = this.getUrl(url);
            const requestParams = Object.assign(Object.assign(Object.assign({}, postHeaders), options), { method: METHODS.PUT });
            return this.request(requestUrl, requestParams).catch((error) => { throw (error); });
        };
        this.delete = (url, options) => {
            const requestUrl = this.getUrl(url);
            const requestParams = Object.assign(Object.assign(Object.assign({}, postHeaders), options), { method: METHODS.DELETE });
            return this.request(requestUrl, requestParams).catch((error) => { throw (error); });
        };
        this._url = url;
    }
    getUrl(url) {
        return `${this._url}${url}`;
    }
}
//# sourceMappingURL=Http.js.map