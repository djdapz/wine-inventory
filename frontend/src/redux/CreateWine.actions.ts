import {WineRequest} from "../domain/CreateWine.types";
import axios from 'axios'
import {backendUri} from "../config";
import {Action, Dispatch} from "redux";
import {getAllWine} from "./Wine.actions";

export enum CreateWineRequestActions {
    createWineSucceded = "createWineSucceded",
    createWineFailed = "createWineFailed",
}

export enum ToggleCreateWineForm {
    openCreateWineForm = "openCreateWineForm",
    closeCreateWineForm = "closeCreateWineForm",
}

export const openCreateWineForm = (): Action<ToggleCreateWineForm> => ({
    type: ToggleCreateWineForm.openCreateWineForm,
});

export const closeCreateWineForm = (): Action<ToggleCreateWineForm> => ({
    type: ToggleCreateWineForm.closeCreateWineForm,
});

export const submitCreateWine = (dispatch: Dispatch, createWineRequest: WineRequest) => {
    axios.post(`${backendUri}/wine`, createWineRequest)
        .then(() => dispatch(createWineSucceded()), () => dispatch(createWineFailed()))
        .then(() => getAllWine(dispatch))
};

export const createWineFailed = () => ({type: CreateWineRequestActions.createWineFailed});
export const createWineSucceded = () => ({type: CreateWineRequestActions.createWineSucceded});



export type CreateWineActions =  Action<ToggleCreateWineForm> | Action<CreateWineRequestActions>