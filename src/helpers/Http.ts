import { queryString } from './queryString.js';

enum METHODS {
    GET = 'GET',
    PUT ='PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type Options<Data> = {
    method: METHODS,
    data?: Data,
    headers?: Record<string, string>,
}

const postHeaders = {
    headers: { 'content-type': 'application/json' },
}

export class Http {
    _url: string

    constructor(url: string) {
        this._url = url;
    }

    request = <Data>(url: string, { method, data, headers }: Options<Data>) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]));
            }

            xhr.onload = function() {
                if (xhr.status === 200) {
                    const isJson = xhr.getResponseHeader('content-type')?.indexOf('application/json') !== -1;
                    resolve(isJson ? JSON.parse(xhr.response) : xhr.response);
                } else {
                    const error : Error & { code?: number } = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onabort = function() {
                reject(new Error('Abort Error'));
            }
            xhr.onerror = function() {
                reject(new Error('Network Error'));
            };
            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        });
    };
    get = <Data>(url: string, options: Omit<Options<Data>, 'method'> = {}) => {
        const { data } = options;
        let requestUrl = this.buildUrl(url);
        requestUrl = data ? `${requestUrl}?${queryString(data)}` : requestUrl;

        const requestParams = { ...options, method: METHODS.GET };

        return this.request<Data>(requestUrl, requestParams).catch((error) => {throw(error)});
    };

    post = <Data>(url: string, options: Omit<Options<Data>, 'method'> = {}) => {
        const requestUrl = this.buildUrl(url);
        const requestParams = { ...postHeaders, ...options, method: METHODS.POST };

        return this.request<Data>(requestUrl, requestParams).catch((error) => {throw(error)});
    };

    put = <Data>(url: string, options: Omit<Options<Data>, 'method'>) => {
        const requestUrl = this.buildUrl(url);
        const requestParams = { ...postHeaders, ...options, method: METHODS.PUT };

        return this.request<Data>(requestUrl, requestParams).catch((error) => {throw(error)});
    };

    delete = <Data>(url: string, options: Omit<Options<Data>, 'method'>) => {
        const requestUrl = this.buildUrl(url);
        const requestParams = { ...postHeaders, ...options, method: METHODS.DELETE };

        return this.request<Data>(requestUrl, requestParams).catch((error) => {throw(error)});
    };

    buildUrl(url: string) {
        return `${this._url}${url}`;
    }
}