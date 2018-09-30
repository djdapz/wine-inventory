import * as React from 'react';
import './App.scss';

import WineList from "./wine/WineList";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <WineList/>
            </div>
        );
    }
}

export default App;
