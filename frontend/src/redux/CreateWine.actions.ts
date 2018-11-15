import {CreateWineRequest} from "../domain/CreateWine.types";
import axios from 'axios'
import {backendUri} from "../config";
import {Action, Dispatch} from "redux";
import {getAllWine} from "./Wine.actions";
import {ActionWithPayload} from "./ReduxTypes";

export const addQuantityToWineRequest = (quantity: number | undefined): AddNumberToCreateWineRequestType => ({
    type: AddNumberToCreateWineRequest.addQuantityToWineRequest,
    payload: quantity
});

export const addCountryToWineRequest = (name: string): AddStringToCreateWineRequestType => ({
    type: AddStringToCreateWineRequest.addCountryToWineRequest,
    payload: name
});

export const addCellarLocationToWineRequest = (name: string): AddStringToCreateWineRequestType => ({
    type: AddStringToCreateWineRequest.addCellarLocationToWineRequest,
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

export const addYearToWineRequest = (year: number | undefined): AddNumberToCreateWineRequestType =>
    ({
        type: AddNumberToCreateWineRequest.addYearToWineRequest,
        payload: year
    });

export const openCreateWineForm = (): Action<ToggleCreateWineForm> => ({
    type: ToggleCreateWineForm.openCreateWineForm,
});

export const closeCreateWineForm = (): Action<ToggleCreateWineForm> => ({
    type: ToggleCreateWineForm.closeCreateWineForm,
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
    addCellarLocationToWineRequest="addCellarLocationToWineRequest",
    addCountryToWineRequest = "addCountryToWineRequest",
    addProducerToWineRequest = "addProducerToWineRequest",
    addTypeToWineRequest = "addTypeToWineRequest",
}

export const enum AddNumberToCreateWineRequest {
    addQuantityToWineRequest = "addQuantityToWineRequest",
    addYearToWineRequest = "addYearToWineRequest",
}

export const enum ToggleCreateWineForm {
    openCreateWineForm = "openCreateWineForm",
    closeCreateWineForm = "closeCreateWineForm",
}


type AddStringToCreateWineRequestType = ActionWithPayload<AddStringToCreateWineRequest, string>
type AddNumberToCreateWineRequestType = ActionWithPayload<AddNumberToCreateWineRequest, number | undefined>

export type CreateWineActions = AddStringToCreateWineRequestType
    | AddNumberToCreateWineRequestType
    | Action<ToggleCreateWineForm>
    | Action<CreateWineRequestActions>