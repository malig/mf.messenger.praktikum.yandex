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
export var PATH;
(function (PATH) {
    PATH["ROOT"] = "/";
    PATH["AUTH"] = "/auth";
    PATH["REGISTRATION"] = "/registration";
    PATH["PROFILE"] = "/profile";
    PATH["MESSENGER"] = "/messenger";
    PATH["ERROR"] = "/error";
    PATH["NOT_FOUND"] = "/not-found";
})(PATH || (PATH = {}));
const store = new Store();
export const chatsController = new ChatsController(store, 'chatsController');
export const authController = new AuthController(store, 'authController');
export const userController = new UserController(store, 'userController');
store.init([
    chatsController,
    authController,
    userController
]);
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
//# sourceMappingURL=app.js.map