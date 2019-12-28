import {WineRequest} from "./CreateWine.types";
import axios from 'axios'
import {backendUri} from "../config";
import {Action} from "redux";
import {getAllWine} from "../wine/Wine.actions";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../index";

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

export const submitCreateWine = (createWineRequest: WineRequest) => (dispatch: ThunkDispatch<any, any, any>, getStore: () => StoreType) => {
    axios.post(`${backendUri}/wine`, createWineRequest, {headers: {userId: getStore().user!!.id}})
        .then(() => dispatch(createWineSucceded()), () => dispatch(createWineFailed()))
        .then(() => dispatch(getAllWine()))
};

export const createWineFailed = () => ({type: CreateWineRequestActions.createWineFailed});
export const createWineSucceded = () => ({type: CreateWineRequestActions.createWineSucceded});


export type CreateWineActions = Action<ToggleCreateWineForm> | Action<CreateWineRequestActions>