import * as React from "react";
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {StoreType} from "../index";
import {bindActionCreators, Dispatch} from "redux";
import {searchForWine} from "../redux/Filter.Actions";

interface DispatchProps {
    searchForWine: (val: string) => void
}

interface StoreProps {
    searchQuery: string
}


const SearchBar = (props: DispatchProps & StoreProps) =>
    <TextField
        id={"search-bar"}
        label={"Search..."}
        variant={"outlined"}
        value={props.searchQuery}
        onChange={(event: any) => props.searchForWine(event.target.value)}
    />

const mapStateToProps = (state: StoreType): StoreProps => ({
    searchQuery: state.searchQuery
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    searchForWine
}, dispatch);

export default connect<StoreProps, DispatchProps, {}, StoreType>(mapStateToProps, mapDispatchToProps)(SearchBar)