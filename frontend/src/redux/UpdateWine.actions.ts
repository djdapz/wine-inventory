import {Dispatch} from "redux";
import {WineRequest} from "../domain/CreateWine.types";
import axios from "axios";
import {backendUri} from "../config";
import {getAllWine} from "./Wine.actions";

export enum UpdateWineRequestActions {
    updateWineSucceded = "updateWineSucceded",
    updateWineFailed = "updateWineFailed",
}

export const submitUpdateWine = (dispatch: Dispatch) => (id: number) => (updateWineRequest: WineRequest) => {
    axios.put(`${backendUri}/wine/${id}`, updateWineRequest)
        .then(() => dispatch(updateWineSucceded()), () => dispatch(updateWineFailed()))
        .then(() => getAllWine(dispatch))
};

export const updateWineFailed = () => ({type: UpdateWineRequestActions.updateWineFailed});
export const updateWineSucceded = () => ({type: UpdateWineRequestActions.updateWineSucceded});
