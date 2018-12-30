import {AnyAction} from "redux";
import {CreateWineRequestActions, ToggleCreateWineForm} from "./CreateWine.actions";

export const showCreateWineFormReducer = (state: boolean=false, action: AnyAction): boolean => {
    switch (action.type) {
        case CreateWineRequestActions.createWineSucceded:
            return false;
        case ToggleCreateWineForm.closeCreateWineForm:
            return false;
        case ToggleCreateWineForm.openCreateWineForm:
            return true;
        default:
            return state
    }
};
