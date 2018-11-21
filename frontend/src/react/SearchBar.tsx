import * as React from "react";
import {createMuiTheme, MuiThemeProvider, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {StoreType} from "../index";
import {bindActionCreators, Dispatch} from "redux";
import {searchForWine} from "../redux/Filter.Actions";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar/AppBar";

interface DispatchProps {
    searchForWine: (val: string) => void
}

interface StoreProps {
    searchQuery: string
}

const SearchBarWrapper = styled.div`
  justify-content: left;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: .5rem  1rem;
  box-sizing: border-box;
  `

export const whiteInputs = createMuiTheme({
    palette: {
        primary: {
            light: "#fff",
            main: "#fff",
            dark: "#fff",
            contrastText: "#444",
        },
        text: {
            primary: "#fff", //actually-typing
            secondary: "#ddd", //placeholder
            disabled: "#aaa",
            hint: "#ddd",
        },
        type: "dark"
    },
    typography: {useNextVariants: true},
});

const SearchBar = (props: DispatchProps & StoreProps) => <AppBar>
    <SearchBarWrapper>
        <MuiThemeProvider theme={whiteInputs}>
            <TextField
                id={"search-bar"}
                label={"Search..."}
                variant={"outlined"}
                value={props.searchQuery}
                onChange={(event: any) => props.searchForWine(event.target.value)}
            />
        </MuiThemeProvider>
    </SearchBarWrapper>
</AppBar>;

const mapStateToProps = (state: StoreType) => ({
    searchQuery: state.searchQuery
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    searchForWine
}, dispatch);

export default connect<StoreProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(SearchBar)