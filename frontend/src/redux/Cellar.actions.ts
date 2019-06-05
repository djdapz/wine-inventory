import {ApiAction} from "./ReduxTypes";
import {Dispatch} from "redux";
import {backendUri} from "../config";
import axios from 'axios'

export enum RemoveBottleFromCellar {
    removeBottleFromCellarSuccess = "removeBottleFromCellarSuccess",
    removeBottleFromCellarFailure = "removeBottleFromCellarFailure",
}

export const removeWineFromCellarSuccess = (id: number): RemoveBottleFromCellarActionType => ({
    type: RemoveBottleFromCellar.removeBottleFromCellarSuccess,
    payload: id
});

export const removeBottleFromCellar = (dispatch: Dispatch, id: number) => {
    axios.post(`${backendUri}/wine/remove-bottle-from-cellar`, {id})
        .then(() => dispatch(removeWineFromCellarSuccess(id)), (err) => console.log(err))
};

export type RemoveBottleFromCellarActionType = ApiAction<RemoveBottleFromCellar.removeBottleFromCellarSuccess, RemoveBottleFromCellar.removeBottleFromCellarFailure, number>
