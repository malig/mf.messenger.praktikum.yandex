class Route {
    constructor(url, page, props) {
        this._page = null;
        this._url = url;
        this._props = props;
        this._pageClass = page;
    }
    render() {
        this._page = new this._pageClass();
        const root = document.querySelector(this._props.domSelector);
        if (root) {
            root.innerHTML = '';
            root.appendChild(this._page.getContent());
        }
        return;
    }
    destroy() {
        if (this._page) {
            this._page.destroy();
        }
    }
    match(url) {
        return url === this._url;
    }
}
export class Router {
    constructor(domSelector, notFoundUrl) {
        this.routes = [];
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._domSelector = domSelector;
        this._notFoundUrl = notFoundUrl;
        Router.__instance = this;
    }
    use(url, page) {
        if (this._domSelector) {
            const route = new Route(url, page, { domSelector: this._domSelector });
            this.routes.push(route);
        }
        return this;
    }
    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };
    }
    _onRoute(url) {
        const route = this.getRoute(url);
        if (this._currentRoute) {
            this._currentRoute.destroy();
        }
        this._currentRoute = route;
        if (route) {
            route.render();
        }
        else if (this._notFoundUrl) {
            this.go(this._notFoundUrl);
        }
    }
    getRoute(url) {
        return this.routes.find(route => route.match(url));
    }
    back() {
        var _a;
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.back();
    }
    forward() {
        var _a;
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.forward();
    }
    go(url) {
        var _a;
        (_a = this.history) === null || _a === void 0 ? void 0 : _a.pushState({}, '', url);
        this._onRoute(url);
    }
    get location() {
        return window.location.pathname;
    }
}
//# sourceMappingURL=Router.js.map