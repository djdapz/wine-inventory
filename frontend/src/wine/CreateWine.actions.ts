import {CreateWineRequest} from "./CreateWine.types";
import axios from 'axios'
import {backendUri} from "../config";
import {Dispatch} from "redux";
import {getAllWine} from "./Wine.actions";

export const addQuantityToWineRequest = (quantity: number) => ({
    type: CreateWineRequestActions.addQuantityToWineRequest,
    payload: quantity
});

export const addCountryToWineRequest = (name: string) => ({
    type: CreateWineRequestActions.addCountryToWineRequest,
    payload: name
});

export const addProducerToWineRequest = (producer: string) => ({
    type: CreateWineRequestActions.addProducerToWineRequest,
    payload: producer
});

export const addTypeToWineRequest = (type: string) => ({
    type: CreateWineRequestActions.addTypeToWineRequest,
    payload: type
});

export const addYearToWineRequest = (year: number) => ({
    type: CreateWineRequestActions.addYearToWineRequest,
    payload: year
});

export const openCreateWineForm = () => ({
    type: CreateWineRequestActions.openCreateWineForm,
});

export const submitCreateWine = (dispatch: Dispatch, createWineRequest: CreateWineRequest) => {
    axios.post(`${backendUri}/wines`, createWineRequest)
        .then(() => dispatch(createWineSucceded()), () => dispatch(createWineFailed()))
        .then(() => getAllWine(dispatch))
};

export const createWineFailed = () => ({type: CreateWineRequestActions.createWineFailed});
export const createWineSucceded = () => ({type: CreateWineRequestActions.createWineSucceded});

export const enum CreateWineRequestActions {
    openCreateWineForm = "openCreateWineForm",
    createWineSucceded = "createWineSucceded",
    createWineFailed = "createWineFailed",
    addQuantityToWineRequest = "addQuantityToWineRequest",
    addCountryToWineRequest = "addCountryToWineRequest",
    addProducerToWineRequest = "addProducerToWineRequest",
    addTypeToWineRequest = "addTypeToWineRequest",
    addYearToWineRequest = "addYearToWineRequest"
}