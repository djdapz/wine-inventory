import {WineAppActionTypes} from "../../main/ReduxTypes";
import {SearchForWineType} from "./Filter.Actions";

export const searchReducer = (state: string = "", action: WineAppActionTypes): string => {
    switch (action.type) {
        case (SearchForWineType.SearchForWine) :
            return action.payload
    }
    return state
}