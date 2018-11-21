import {ActionWithPayload} from "./ReduxTypes";

export enum SearchForWineType {
    SearchForWine = "SearchForWine"
}

export const searchForWine = (query: string) => ({
    type: SearchForWineType.SearchForWine,
    payload: query
});

export type SearchForWineActionType = ActionWithPayload<SearchForWineType.SearchForWine, string>