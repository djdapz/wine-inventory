import {AnyAction} from "redux";
import {CreateWineRequest} from "../domain/CreateWine.types";
import {
    AddNumberToCreateWineRequest,
    AddStringToCreateWineRequest,
    CreateWineRequestActions, ToggleCreateWineForm
} from "./CreateWine.actions";

export const createWineFormReducer = (state: CreateWineRequest | null = null, action: AnyAction): CreateWineRequest | null => {

    switch (action.type) {
        case AddNumberToCreateWineRequest.addQuantityToWineRequest:
            return state!.withQuantity(action.payload);
        case AddStringToCreateWineRequest.addCountryToWineRequest:
            return state!.withCountry(action.payload);
        case AddStringToCreateWineRequest.addProducerToWineRequest:
            return state!.withProducer(action.payload);
        case AddStringToCreateWineRequest.addCellarLocationToWineRequest:
            return state!.withCellarLocation(action.payload);
        case AddStringToCreateWineRequest.addTypeToWineRequest:
            return state!.withType(action.payload);
        case AddNumberToCreateWineRequest.addYearToWineRequest:
            return state!.withYear(action.payload);
        case CreateWineRequestActions.createWineSucceded:
            return null;
        case ToggleCreateWineForm.closeCreateWineForm:
            return null;
        case ToggleCreateWineForm.openCreateWineForm:
            return new CreateWineRequest();
        default:
            return state
    }
};
