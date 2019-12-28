import {Route} from "react-router-dom";
import * as React from 'react';
import {Button} from "@material-ui/core";
import {WineListAppBar} from "./WineLIestAppBar";
import WineBottleCount from "../list/WineBottleCount";
import {useDispatch} from "react-redux";
import {goBack} from "connected-react-router";

const HomeButton = () => {
    const dispatch = useDispatch()
    return <Button data-cy={'back-button'}
                   variant={"outlined"}
                   onClick={() => dispatch(goBack())}>Back</Button>;
}


export default () =>
    <>
        <Route exact
               path="/"
               component={WineListAppBar}/>
        <Route path="/wine-record/*"
               component={HomeButton}/>
        <Route path="/"
               exact
               component={WineBottleCount}/>
    </>
