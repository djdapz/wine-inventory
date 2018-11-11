import * as React from 'react';

import WineList from "./WineList";
import styled from "styled-components";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/es";
import CreateWineForm from "./CreateWineForm";
import NewWineButton from "./NewWineButton";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {Country, fetchCountries} from "../redux/Country.actions";
import {StoreType} from "../index";

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

export interface PassedProps {
    countries: Country[]
}

class App extends React.Component<DispatchProps & PassedProps> {
    constructor(props: DispatchProps & PassedProps,) {
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

const mapStateToProps = (state: StoreType) => ({
    countries: state.countries
});

export default connect<PassedProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(App);
