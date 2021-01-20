import { Controller } from '../helpers/Controller';
import { UserApi, User } from '../api/UserApi';

type SearchUserInitialState = {
    searchResult: User[];
};

const userApi = new UserApi();

enum ACTION {
    SET_SEARCH_RESULT = 'setSearchResult',
}

export class SearchUserController extends Controller<SearchUserInitialState> {
    initialState: SearchUserInitialState = {
        searchResult: [],
    };

    reducers = {
        [ACTION.SET_SEARCH_RESULT]: (state: SearchUserInitialState, payload: User[]) => {
            state.searchResult = payload;
            return state;
        },
    };

    setSearchResult(users: User[]) {
        this.dispatch(ACTION.SET_SEARCH_RESULT, users);
    }

    searchUser(userName: string) {
        userApi.searchUser(userName).then((users) => this.setSearchResult(users));
    }
}
