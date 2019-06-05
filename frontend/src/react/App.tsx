import * as React from 'react';
import styled from "styled-components";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {fetchCountries} from "../redux/Country.actions";
import WineAppBar from "./WineAppBar";
import {BrowserRouter as Router} from "react-router-dom";
import RouteDeclarations from "./RouteDeclarations"

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
                    <Router>
                        <FullPage>
                            <WineAppBar/>
                            <RouteDeclarations/>
                        </FullPage>
                    </Router>
                </StyledApp>
            </MuiThemeProvider>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    fetchCountries: fetchCountries
}, dispatch);


export default connect<{}, DispatchProps, {}>(null, mapDispatchToProps)(App);
