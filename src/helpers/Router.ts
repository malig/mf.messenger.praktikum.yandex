import { Block } from './Block';

type RouteProperties = {
    domSelector: string;
};

type BlockClass = new () => Block<any>;

class Route {
    _url: string;

    _pageClass: BlockClass;

    _page: InstanceType<BlockClass> | null = null;

    _props: RouteProperties;

    constructor(url: string, page: BlockClass, properties: RouteProperties) {
        this._url = url;
        this._props = properties;
        this._pageClass = page;
    }

    render() {
        this._page = new this._pageClass();

        const root = document.querySelector(this._props.domSelector);
        if (root) {
            root.innerHTML = '';
            root.append(this._page.getContent());
        }
    }

    destroy() {
        if (this._page) {
            this._page.destroy();
        }
    }

    match(url: string) {
        return url === this._url;
    }
}

export class Router {
    static __instance: InstanceType<typeof Router>;

    history: History | undefined;

    routes: Route[] = [];

    _currentRoute: Route | undefined;

    _domSelector: string | undefined;

    _notFoundUrl: string | undefined;

    constructor(domSelector: string, notFoundUrl: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._domSelector = domSelector;
        this._notFoundUrl = notFoundUrl;

        Router.__instance = this;
    }

    use(url: string, page: BlockClass) {
        if (this._domSelector) {
            const route = new Route(url, page, { domSelector: this._domSelector });
            this.routes.push(route);
        }

        return this;
    }

    start() {
        window.onpopstate = (event: Event) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };
    }

    _onRoute(url: string) {
        const route = this.getRoute(url);

        if (this._currentRoute) {
            this._currentRoute.destroy();
        }

        this._currentRoute = route;

        if (route) {
            route.render();
        } else if (this._notFoundUrl) {
            this.go(this._notFoundUrl);
        }
    }

    getRoute(url: string) {
        return this.routes.find((route) => route.match(url));
    }

    back() {
        this.history?.back();
    }

    forward() {
        this.history?.forward();
    }

    go(url: string) {
        this.history?.pushState({}, '', url);
        this._onRoute(url);
    }

    get location() {
        return window.location.pathname;
    }
}
