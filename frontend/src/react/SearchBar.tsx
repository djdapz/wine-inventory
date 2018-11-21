import * as React from "react";
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {StoreType} from "../index";
import {bindActionCreators, Dispatch} from "redux";
import {searchForWine} from "../redux/Filter.Actions";
import styled from "styled-components";

interface DispatchProps {
    searchForWine: (val: string) => void
}

interface StoreProps {
    searchQuery: string
}

const SearchBarWrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  justify-content: left;
  flex-shrink: 0;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
`;


const SearchBar = (props: DispatchProps & StoreProps) => <SearchBarWrapper>
    <TextField
        label={"Search..."}
        variant={"outlined"}
        value={props.searchQuery}
        onChange={(event: any) => props.searchForWine(event.target.value)}
    />
</SearchBarWrapper>;

const mapStateToProps = (state: StoreType) => ({
    searchQuery: state.searchQuery
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    searchForWine
}, dispatch);

export default connect<StoreProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(SearchBar)