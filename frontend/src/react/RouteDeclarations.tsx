import WinePage from "./WinePage";
import * as React from 'react';
import WineListPage from "./WineListPage";
import {Redirect, Route, Switch} from "react-router";

export default () =>
    <Switch>
        <Route exact
               path="/"
               component={WineListPage}/>
        <Route path="/wine-record/:id"
               component={WinePage}/>
        <Redirect to="/" />
    </Switch>