import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './react/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {wineReducer} from "./redux/Wine.reducers";
import {showCreateWineFormReducer} from "./redux/CreateWine.reducers";
import {FetchCountriesMiddleware} from "./redux/Country.actions";
import {Countries, fetchCountriesReducer} from "./redux/Country.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {searchReducer} from "./redux/Filter.reducer";
import {sortByReducer} from "./redux/SortBy.reducers";
import {SortableField} from "./redux/SortBy.actions";
import {Wine} from "./domain/Wine.types";


const rootReducer = combineReducers(
    {
        wines: wineReducer,
        showCreateWineForm: showCreateWineFormReducer,
        countries: fetchCountriesReducer,
        searchQuery: searchReducer,
        sortBy: sortByReducer
    }
);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(FetchCountriesMiddleware)));
// export type StoreType = StateType<typeof rootReducer>

export interface StoreType  {
    wines: Wine[] | null;
    showCreateWineForm: boolean;
    countries: Countries;
    searchQuery: string;
    sortBy: SortableField;
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
