import {AnyAction} from "redux";
import {WineActionTypes} from "./Wine.actions";
import {Wine} from "../domain/Wine.types";
import {RemoveBottleFromCellar} from "./Cellar.actions";

export const wineReducer = (state: Wine[] = [], action: AnyAction): Wine[] => {
    if (action.type === WineActionTypes.GET_ALL_WINE_SUCCESS) {
        return action.payload
    }
    if(action.type === RemoveBottleFromCellar.removeBottleFromCellarSuccess) {
        return  state.map(wine =>  {
            if(wine.id === action.payload){
                return {...wine, quantity: wine.quantity -1}
            }
            return wine
        }).filter(wine => wine.quantity > 0)
    }
    return state
};