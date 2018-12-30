import {Wine} from "../../domain/Wine.types";
import {createSelector} from "reselect";
import {StoreType} from "../../index";


type SearchableWine = Wine & { queryableTerm: string }

const getEasilySearchableWine = (state: StoreType): SearchableWine[] => {
    if (state.wines === null) {
        return []
    }

    return state.wines
        .map(wine => ({
            ...wine,
            queryableTerm: Object.keys(wine)
                .reduce((prev, curr) => {
                    if (wine[curr] === null || wine[curr] === undefined) {
                        return prev
                    }
                    return prev + wine[curr].toString().toLowerCase()
                }, "")
        }));
};

const getSearchQuery = (state: StoreType): string => state.searchQuery.toLowerCase();

export const getVisibleWine = createSelector(
    [getEasilySearchableWine, getSearchQuery],
    (searchableWine: SearchableWine[], query: string) =>
        searchableWine.filter(wine => wine.queryableTerm.indexOf(query) >= 0)
);
