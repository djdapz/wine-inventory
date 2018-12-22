import * as React from 'react';
import styled from "styled-components";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/es";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {fetchCountries} from "../redux/Country.actions";
import WineListPage from "./WineListPage";

const StyledApp = styled.div`
  display: flex;
  font-family: 'Raleway', sans-serif;
  background-color: #fafafa;
  justify-content: center;
`;

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
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
                    <WineListPage/>
                </StyledApp>
            </MuiThemeProvider>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    fetchCountries: fetchCountries
}, dispatch);


export default connect<{}, DispatchProps, {}>(null, mapDispatchToProps)(App);
