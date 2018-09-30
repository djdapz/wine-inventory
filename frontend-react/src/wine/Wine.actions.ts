import {AnyAction, Dispatch} from "redux";

import axios from 'axios';
import {Wine} from "./WineList";

export enum WineActionTypes {
    GET_ALL_WINE_SUCCESS = "GET_ALL_WINE_SUCCESS",
    GET_ALL_WINE_FAILURE = "GET_ALL_WINE_FAILURE"
}

function wineFailure(): AnyAction {
    return {
        type: WineActionTypes.GET_ALL_WINE_FAILURE
    }
}

function wineSuccess(wines: Wine[]): AnyAction {
    return {
        type: WineActionTypes.GET_ALL_WINE_SUCCESS,
        payload: wines
    }
}

interface WineResponse {
    wine: Wine[]
}

export const getAllWine = (dispatch: Dispatch) => {
        axios.get("http://localhost:8080/wines")
            .then(response => response.data)
            .then((data: WineResponse) => data.wine)
            .then(wines => dispatch(wineSuccess(wines)),
                () => dispatch(wineFailure())
            )
    }
;