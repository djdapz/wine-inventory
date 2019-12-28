import {WineRequest} from "./CreateWine.types";
import axios from "axios";
import {backendUri} from "../config";
import {getAllWine} from "../wine/Wine.actions";
import {ThunkDispatch} from "redux-thunk";

export enum UpdateWineRequestActions {
    updateWineSucceded = "updateWineSucceded",
    updateWineFailed = "updateWineFailed",
}

export const submitUpdateWine = (id: number) => (updateWineRequest: WineRequest) => (dispatch: ThunkDispatch<any, any, any>) => {
    axios.put(`${backendUri}/wine/${id}`, updateWineRequest)
        .then(() => dispatch(updateWineSucceded()), () => dispatch(updateWineFailed()))
        .then(() => dispatch(getAllWine()))
};

export const updateWineFailed = () => ({type: UpdateWineRequestActions.updateWineFailed});
export const updateWineSucceded = () => ({type: UpdateWineRequestActions.updateWineSucceded});
