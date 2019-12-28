import {WineAppActionTypes} from "../../main/ReduxTypes";
import {SortableField, SortByActionEnum} from "./SortBy.actions";

export const sortByReducer = (state: SortableField = SortableField.NONE, action: WineAppActionTypes): SortableField => {

    if (action.type === SortByActionEnum.UPDATE_SORT_BY) {
        return action.payload;
    }
    return state;
}