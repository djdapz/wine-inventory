import * as React from 'react';
import './App.scss';

import WineList from "./wine/WineList";
import CreateWineForm from "./wine/CreateWineForm";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <CreateWineForm/>
                <WineList/>
            </div>
        );
    }
}

export default App;
