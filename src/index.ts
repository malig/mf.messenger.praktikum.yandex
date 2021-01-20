import { Router } from './helpers/Router';
import { Store } from './helpers/Store';
import { ChatsController } from './controllers/ChatsController';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { SearchUserController } from './controllers/SearchUserController';
import { MessageController } from './controllers/MessageController';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { MessengerPage } from './pages/MessengerPage/MessengerPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { EventBus } from './helpers/EventBus';

import './less/app.less';

declare global {
    interface Window {
        eventBus: EventBus;
    }
}

(window as Window).eventBus = new EventBus();

export enum PATH {
    ROOT = '/',
    AUTH = '/auth',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    MESSENGER = '/messenger',
    NOT_FOUND = '/404',
    INTERNAL_SERVER_ERROR = '/500',
}

const store = new Store();

export const chatsController = new ChatsController(store, 'chatsController');
export const authController = new AuthController(store, 'authController');
export const userController = new UserController(store, 'userController');
export const searchUserController = new SearchUserController(store, 'searchUserController');
export const messageController = new MessageController(store, 'messageController');

store.init([
    chatsController,
    authController,
    userController,
    searchUserController,
    messageController,
]);

export const router = new Router('.app', PATH.NOT_FOUND);

router
    .use(PATH.ROOT, AuthPage)
    .use(PATH.AUTH, AuthPage)
    .use(PATH.REGISTRATION, RegistrationPage)
    .use(PATH.PROFILE, ProfilePage)
    .use(PATH.MESSENGER, MessengerPage)
    .use(PATH.NOT_FOUND, NotFoundPage)
    .use(PATH.INTERNAL_SERVER_ERROR, ErrorPage)
    .start();

authController.checkAuth();
