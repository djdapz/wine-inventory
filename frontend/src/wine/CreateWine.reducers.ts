import {AnyAction} from "redux";
import {CreateWineRequest} from "./CreateWine.types";
import {CreateWineRequestActions} from "./CreateWine.actions";

export const createWineFormReducer = (state: CreateWineRequest | null = null, action: AnyAction): CreateWineRequest | null => {

    switch (action.type) {
        case CreateWineRequestActions.addQuantityToWineRequest:
            return state!.withQuantity(action.payload);
        case CreateWineRequestActions.addCountryToWineRequest:
            return state!.withCountry(action.payload);
        case CreateWineRequestActions.addProducerToWineRequest:
            return state!.withProducer(action.payload);
        case CreateWineRequestActions.addTypeToWineRequest:
            return state!.withType(action.payload);
        case CreateWineRequestActions.addYearToWineRequest:
            return state!.withYear(action.payload);
        case CreateWineRequestActions.createWineSucceded:
            return null;
        case CreateWineRequestActions.openCreateWineForm:
            return new CreateWineRequest();
        default:
            return state
    }
};
