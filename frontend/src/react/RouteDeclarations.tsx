import WinePage from "./WinePage";
import * as React from 'react';
import WineListPage from "./WineListPage";
import {Route} from "react-router";

export default () =>
    <React.Fragment>
        <Route exact
               path="/"
               component={WineListPage}/>
        <Route path="/wine-record/:id"
               component={WinePage}/>
    </React.Fragment>