import {AnyAction} from "redux";
import {CreateWineRequest} from "../domain/CreateWine.types";
import {
    AddBooleanToCreateWineRequest,
    AddNumberToCreateWineRequest,
    AddStringToCreateWineRequest,
    CreateWineRequestActions,
    ToggleCreateWineForm
} from "./CreateWine.actions";

export const createWineFormReducer = (state: CreateWineRequest | null = null, action: AnyAction): CreateWineRequest | null => {

    switch (action.type) {
        case AddNumberToCreateWineRequest.addQuantityToWineRequest:
            return {...state, quantity: action.payload};
        case AddStringToCreateWineRequest.addCountryToWineRequest:
            return {...state, country: action.payload};
        case AddStringToCreateWineRequest.addProducerToWineRequest:
            return {...state, producer: action.payload};
        case AddStringToCreateWineRequest.addCellarLocationToWineRequest:
            return {...state, cellarLocation: action.payload};
        case AddStringToCreateWineRequest.addTypeToWineRequest:
            return {...state, type: action.payload};
        case AddNumberToCreateWineRequest.addYearToWineRequest:
            return {...state, year: action.payload};
        case AddBooleanToCreateWineRequest.addOriginalWoodenCaseToWineRequest:
            return {...state, originalWoodenCase: action.payload};
        case AddStringToCreateWineRequest.addNotesToWineRequest:
            return {...state, notes: action.payload};
        case AddNumberToCreateWineRequest.addBottleSizeToWineRequest:
            return {...state, bottleSize: action.payload};
        case CreateWineRequestActions.createWineSucceded:
            return null;
        case ToggleCreateWineForm.closeCreateWineForm:
            return null;
        case ToggleCreateWineForm.openCreateWineForm:
            return {};
        default:
            return state
    }
};
