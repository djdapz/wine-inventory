import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './main/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {wineReducer} from "./wine/Wine.reducers";
import {showCreateWineFormReducer} from "./wine-form/CreateWine.reducers";
import {FetchCountriesMiddleware} from "./wine-form/Country.actions";
import {Countries, fetchCountriesReducer} from "./wine-form/Country.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {searchReducer} from "./list/sort/Filter.reducer";
import {sortByReducer} from "./list/sort/SortBy.reducers";
import {SortableField} from "./list/sort/SortBy.actions";
import {Wine} from "./wine/Wine.types";
import {usersReducer} from "./user/list/Users.reducer";
import {User} from "./user/types";
import thunk from "redux-thunk";
import {userReducer} from "./user/loggedIn/User.reducer";
import {ConnectedRouter, connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory({});

const rootReducer = combineReducers(
    {
        router: connectRouter(history),
        wines: wineReducer,
        showCreateWineForm: showCreateWineFormReducer,
        countries: fetchCountriesReducer,
        searchQuery: searchReducer,
        sortBy: sortByReducer,
        users: usersReducer,
        user: userReducer,
    }
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            FetchCountriesMiddleware
        )
    )
);
export type WineStore = typeof store;


export interface StoreType {
    router: RouterState;
    wines: Wine[] | null;
    showCreateWineForm: boolean;
    countries: Countries;
    searchQuery: string;
    sortBy: SortableField;
    users: User[] | null;
    user: User | null;
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
