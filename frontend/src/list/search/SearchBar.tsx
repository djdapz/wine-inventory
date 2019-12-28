import * as React from "react";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../index";
import {searchForWine} from "../sort/Filter.Actions";


export default () => {
    const dispatch = useDispatch()
    const searchQuery = useSelector<StoreType, string>(state => state.searchQuery)
    return <TextField
        id={"search-bar"}
        label={"Search..."}
        variant={"outlined"}
        value={searchQuery}
        onChange={(event: any) => dispatch(searchForWine(event.target.value))}
    />;
}
