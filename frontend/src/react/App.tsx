import * as React from 'react';

import WineList from "./WineList";
import styled from "styled-components";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/es";
import CreateWineForm from "./CreateWineForm";
import NewWineButton from "./NewWineButton";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {fetchCountries} from "../redux/Country.actions";

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

export interface DispatchProps {
    fetchCountries: () => void
}

class App extends React.Component<DispatchProps> {
    constructor(props: DispatchProps,) {
        super(props);
        props.fetchCountries()
    }

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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    fetchCountries: fetchCountries
}, dispatch);


export default connect<{}, DispatchProps, {}>(null, mapDispatchToProps)(App);
