import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './react/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {wineReducer} from "./redux/Wine.reducers";
import {createWineFormReducer} from "./redux/CreateWine.reducers";
import {FetchCountriesMiddleware} from "./redux/Country.actions";
import {fetchCountriesReducer} from "./redux/Country.reducer";
import {StateType} from "./redux/ReduxTypes";
import {composeWithDevTools} from "redux-devtools-extension";
import {searchReducer} from "./redux/Filter.reducer";


const rootReducer = combineReducers(
    {
        wines: wineReducer,
        createWineForm: createWineFormReducer,
        countries: fetchCountriesReducer,
        searchQuery: searchReducer
    }
);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(FetchCountriesMiddleware)));
export type StoreType = StateType<typeof rootReducer>

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
