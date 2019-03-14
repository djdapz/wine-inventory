import {Link, Route} from "react-router-dom";
import * as React from 'react';
import {Button} from "@material-ui/core";
import {WineListAppBar} from "./WineLIestAppBar";
import styled from "styled-components";

const LinkHome = (props: any) => <Link to="/"  {...props}/>

const HomeButton = () => <Button data-cy={'back-button'}
                                 variant={"outlined"}
                                 component={LinkHome}>Back</Button>

const WineListControls = styled.div`
  display: flex;
`

export default () =>
    <WineListControls>
        <Route exact
               path="/"
               component={WineListAppBar}/>
        <Route path="/wine-record/*"
               component={HomeButton}/>
    </WineListControls>
