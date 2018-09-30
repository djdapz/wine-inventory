import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {wineReducer} from "./wine/Wine.reducers";


const rootReducer = combineReducers({wines: wineReducer});
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
