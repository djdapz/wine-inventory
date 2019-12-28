import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {fetchCountries} from "../wine-form/Country.actions";
import WineAppBar from "../app-bar/WineAppBar";
import RouteDeclarations from "./RouteDeclarations"
import LoginDetection from "../user/LoginDetection";
import {ConnectedRouter} from 'connected-react-router'
import {history} from "../index";
import "../styles.scss"

const StyledApp = styled.div`
  font-family: 'Raleway', sans-serif;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#8e2dfa"
        },
        secondary: {
            main: "#fff",
            light: "#fff",
            dark: "#eedeff",
            contrastText: "#8e2dfa",
        },
    },
});

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    return (
        <MuiThemeProvider theme={theme}>
            <StyledApp className="App">
                <ConnectedRouter history={history}>
                    <WineAppBar/>
                    <RouteDeclarations/>
                    <LoginDetection/>
                </ConnectedRouter>
            </StyledApp>
        </MuiThemeProvider>
    );
}

