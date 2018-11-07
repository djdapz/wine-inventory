import * as React from 'react';

import WineList from "./wine/WineList";
import styled from "styled-components";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/es";
import CreateWineForm from "./wine/CreateWineForm";
import NewWineButton from "./wine/NewWineButton";

const StyledApp = styled.div`
  display: flex;
  font-family: 'Raleway', sans-serif;
  background-color: #fafafa;
  justify-content: center;
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

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <StyledApp className="App">
                    <CreateWineForm/>
                    <WineList/>
                    <NewWineButton/>
                </StyledApp>
            </MuiThemeProvider>
        );
    }
}

export default App;
