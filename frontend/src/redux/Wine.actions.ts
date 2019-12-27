import {Dispatch} from "redux";

import axios from 'axios';
import {backendUri} from "../config";
import {Wine} from "../domain/Wine.types";
import {ApiAction} from "./ReduxTypes";
import {StoreType} from "../index";

export enum WineActionTypes {
    GET_ALL_WINE_SUCCESS = "GET_ALL_WINE_SUCCESS",
    GET_ALL_WINE_FAILURE = "GET_ALL_WINE_FAILURE"
}

export type GetWineActionTypes = ApiAction<WineActionTypes.GET_ALL_WINE_SUCCESS, WineActionTypes.GET_ALL_WINE_FAILURE, Wine[]>

function wineFailure(): GetWineActionTypes {
    return {
        type: WineActionTypes.GET_ALL_WINE_FAILURE
    }
}

function wineSuccess(wines: Wine[]): GetWineActionTypes {
    return {
        type: WineActionTypes.GET_ALL_WINE_SUCCESS,
        payload: wines
    }
}

interface WineResponse {
    wine: Wine[]
}

export const getAllWine = () => (dispatch: Dispatch, getState: () => StoreType) => {
        if (!getState().user) {
            dispatch(wineFailure());
            return;
        }
        axios.get(`${backendUri}/wine`, {
            headers: {userId: getState().user!!.id}
        })
            .then(response => response.data)
            .then((data: WineResponse) => data.wine)
            .then(wines => dispatch(wineSuccess(wines)),
                () => dispatch(wineFailure())
            )
    }
;