import * as React from 'react';
import './App.scss';

import WineList from "./wine/WineList";
import styled from "styled-components";
import {SideBar} from "./wine/SideBar";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/es";

const StyledApp = styled.div`
  display: flex;
`;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#8e2dfa"
        },
    },
});

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <StyledApp className="App">
                    <SideBar/>
                    <WineList/>
                </StyledApp>
            </MuiThemeProvider>
        );
    }
}

export default App;
