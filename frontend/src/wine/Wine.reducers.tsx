import {Wine} from "./WineList";
import {AnyAction} from "redux";
import {WineActionTypes} from "./Wine.actions";

export const wineReducer = (state: Wine[] = [], action: AnyAction): Wine[] => {
    if (action.type === WineActionTypes.GET_ALL_WINE_SUCCESS) {
        return action.payload
    }
    return state
};