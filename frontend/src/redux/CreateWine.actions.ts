import {CreateWineRequest} from "../domain/CreateWine.types";
import axios from 'axios'
import {backendUri} from "../config";
import {Action, Dispatch} from "redux";
import {getAllWine} from "./Wine.actions";
import {ActionWithPayload} from "./ReduxTypes";

export const addQuantityToWineRequest = (quantity: number): AddNumberToCreateWineRequestType => ({
    type: AddNumberToCreateWineRequest.addQuantityToWineRequest,
    payload: quantity
});

export const addCountryToWineRequest = (name: string): AddStringToCreateWineRequestType => ({
    type: AddStringToCreateWineRequest.addCountryToWineRequest,
    payload: name
});

export const addProducerToWineRequest = (producer: string): AddStringToCreateWineRequestType => ({
    type: AddStringToCreateWineRequest.addProducerToWineRequest,
    payload: producer
});

export const addTypeToWineRequest = (type: string): AddStringToCreateWineRequestType => ({
    type: AddStringToCreateWineRequest.addTypeToWineRequest,
    payload: type
});

export const addYearToWineRequest = (year: number): AddNumberToCreateWineRequestType => ({
    type: AddNumberToCreateWineRequest.addYearToWineRequest,
    payload: year
});

export const openCreateWineForm = (): Action<OpenCreateWineForm> => ({
    type: OpenCreateWineForm.openCreateWineForm,
});

export const submitCreateWine = (dispatch: Dispatch, createWineRequest: CreateWineRequest) => {
    axios.post(`${backendUri}/wines`, createWineRequest)
        .then(() => dispatch(createWineSucceded()), () => dispatch(createWineFailed()))
        .then(() => getAllWine(dispatch))
};

export const createWineFailed = () => ({type: CreateWineRequestActions.createWineFailed});
export const createWineSucceded = () => ({type: CreateWineRequestActions.createWineSucceded});

export const enum CreateWineRequestActions {
    createWineSucceded = "createWineSucceded",
    createWineFailed = "createWineFailed",
}

export const enum AddStringToCreateWineRequest {
    addCountryToWineRequest = "addCountryToWineRequest",
    addProducerToWineRequest = "addProducerToWineRequest",
    addTypeToWineRequest = "addTypeToWineRequest",
}

export const enum AddNumberToCreateWineRequest {
    addQuantityToWineRequest = "addQuantityToWineRequest",
    addYearToWineRequest = "addYearToWineRequest",
}

export const enum OpenCreateWineForm {
    openCreateWineForm = "openCreateWineForm",
}


type AddStringToCreateWineRequestType = ActionWithPayload<AddStringToCreateWineRequest, string>
type AddNumberToCreateWineRequestType = ActionWithPayload<AddNumberToCreateWineRequest, number>

export type CreateWineActions = AddStringToCreateWineRequestType
    | AddNumberToCreateWineRequestType
    | Action<OpenCreateWineForm>
    | Action<CreateWineRequestActions>