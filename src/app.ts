import { Router } from './helpers/Router';
import { Store } from './helpers/Store';
import { ChatsController } from './controllers/ChatsController';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { MessengerPage } from './pages/MessengerPage/MessengerPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

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