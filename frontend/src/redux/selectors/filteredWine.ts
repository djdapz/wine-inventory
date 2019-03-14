import {Wine} from "../../domain/Wine.types";
import {createSelector} from "reselect";
import {StoreType} from "../../index";
import {SortableField} from "../SortBy.actions";


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
const getSortField = (state: StoreType): SortableField => state.sortBy;

const getVisibleWine = createSelector(
    [getEasilySearchableWine, getSearchQuery],
    (searchableWine: SearchableWine[], query: string) =>
        searchableWine
            .filter(wine => wine.queryableTerm.indexOf(query) >= 0)
);

export const getSortedVisibleWine = createSelector(
    [getVisibleWine, getSortField],
    (searchableWine: SearchableWine[], sortableField: SortableField): SearchableWine[] => {
        if (sortableField === SortableField.YEAR) {
            return searchableWine.sort((a, b) => b.year-a.year)
        }
        return searchableWine
    }
)
