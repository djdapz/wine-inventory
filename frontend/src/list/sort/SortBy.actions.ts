import {ActionWithPayload} from "../../main/ReduxTypes";

export enum SortableField {
    NONE = "NONE",
    YEAR = "YEAR"
}

export enum SortByActionEnum {
    UPDATE_SORT_BY = "UPDATE_SORT_BY"
}

export type SortByActionType = ActionWithPayload<SortByActionEnum.UPDATE_SORT_BY, SortableField>

export const updateSortBy = (sortBy: SortableField): SortByActionType =>
    ({
        type: SortByActionEnum.UPDATE_SORT_BY,
        payload: sortBy
    })