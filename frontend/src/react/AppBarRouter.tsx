import {Link, Route} from "react-router-dom";
import * as React from 'react';
import SearchBar from "./SearchBar";
import {Button} from "@material-ui/core";

const LinkHome = (props: any) => <Link to="/"  {...props}/>

const HomeButton = () => <Button data-cy={'back-button'}
                                 variant={"outlined"}
                                 component={LinkHome}>Back</Button>

export default () =>
    <div>
        <Route exact
               path="/"
               component={SearchBar}/>
        <Route path="/wine-record/*"
               component={HomeButton}/>
    </div>
