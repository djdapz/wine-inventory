import WinePage from "../edit/WinePage";
import * as React from 'react';
import WineListPage from "../list/WineListPage";
import {Redirect, Route, Switch} from "react-router";
import LoginPage from "../user/LoginPage";

export default () =>
    <Switch>
        <Route exact
               path="/"
               component={WineListPage}/>
        <Route path={"/login"}
               component={LoginPage}/>
        <Route path="/wine-record/:id"
               component={WinePage}/>
        <Redirect to="/"/>
    </Switch>