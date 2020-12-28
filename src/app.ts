import { Router } from './helpers/Router.js';
import { Store } from './helpers/Store.js';
import { ChatsController } from './controllers/ChatsController.js';
import { AuthController } from './controllers/AuthController.js';
import { UserController } from './controllers/UserController.js';
import { AuthPage } from './pages/AuthPage/AuthPage.js';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage.js';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.js';
import { MessengerPage } from './pages/MessengerPage/MessengerPage.js';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.js';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.js';

export enum PATH {
    ROOT = '/',
    AUTH = '/auth',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    MESSENGER = '/messenger',
    ERROR = '/error',
    NOT_FOUND = '/404',
}

const store = new Store();

export const chatsController = new ChatsController(store, 'chatsController');
export const authController = new AuthController(store, 'authController');
export const userController = new UserController(store, 'userController');

store.init([
    chatsController,
    authController,
    userController
])

export const router = new Router('.app', PATH.NOT_FOUND);

router
    .use(PATH.ROOT, AuthPage)
    .use(PATH.AUTH, AuthPage)
    .use(PATH.REGISTRATION, RegistrationPage)
    .use(PATH.PROFILE, ProfilePage)
    .use(PATH.MESSENGER, MessengerPage)
    .use(PATH.ERROR, ErrorPage)
    .use(PATH.NOT_FOUND, NotFoundPage)
    .start();

authController.checkAuth();