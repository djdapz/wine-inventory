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


const rootReducer = combineReducers(
    {
        wines: wineReducer,
        createWineForm: createWineFormReducer,
        countries: fetchCountriesReducer
    }
);
export type StoreType = StateType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(FetchCountriesMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
