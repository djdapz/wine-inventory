import {Dispatch} from "redux";
import {WineRequest} from "../domain/CreateWine.types";
import axios from "axios";
import {backendUri} from "../config";
import {getAllWine} from "./Wine.actions";

export const submitUpdateeWine = (dispatch: Dispatch) => (id: number) => (updateWineRequest: WineRequest) => {
    axios.put(`${backendUri}/wine/${id}`, updateWineRequest)
        .then(() => dispatch(updateWineSucceded()), () => dispatch(updateWineFailed()))
        .then(() => getAllWine(dispatch))
};

export const updateWineFailed = () => ({type: UpdateeWineRequestActions.updateWineFailed});
export const updateWineSucceded = () => ({type: UpdateeWineRequestActions.updateWineSucceded});

export const enum UpdateeWineRequestActions {
    updateWineSucceded = "updateWineSucceded",
    updateWineFailed = "updateWineFailed",
}
