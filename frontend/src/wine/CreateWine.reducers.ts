import {AnyAction} from "redux";
import {CreateWineRequest} from "./CreateWine.types";
import {CreateWineRequestActions} from "./CreateWine.actions";

export const createWineFormReducer = (state: CreateWineRequest = new CreateWineRequest(), action: AnyAction): CreateWineRequest | undefined => {

    switch (action.type) {
        case CreateWineRequestActions.addQuantityToWineRequest:
            return state.withQuantity(action.payload);
        case CreateWineRequestActions.addCountryToWineRequest:
            return state.withCountry(action.payload);
        case CreateWineRequestActions.addProducerToWineRequest:
            return state.withProducer(action.payload);
        case CreateWineRequestActions.addTypeToWineRequest:
            return state.withType(action.payload);
        case CreateWineRequestActions.addYearToWineRequest:
            return state.withYear(action.payload);
        case CreateWineRequestActions.createWineSucceded:
            return new CreateWineRequest();
        default:
            return state
    }
};
