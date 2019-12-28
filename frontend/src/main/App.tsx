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
  display: flex;
  font-family: 'Raleway', sans-serif;
  background-color: #fafafa;
  justify-content: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const FullPage = styled.div`
  width: 100%;
`
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

export interface DispatchProps {
    fetchCountries: () => void
}

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    return (
        <MuiThemeProvider theme={theme}>
            <StyledApp className="App">
                <ConnectedRouter history={history}>
                    <FullPage>
                        <WineAppBar/>
                        <RouteDeclarations/>
                        <LoginDetection/>
                    </FullPage>
                </ConnectedRouter>
            </StyledApp>
        </MuiThemeProvider>
    );
}

