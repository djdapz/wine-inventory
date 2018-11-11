import {WineAppActionTypes} from "./ReduxTypes";
import {Country, FetchCountries} from "./Country.actions";

export const fetchCountriesReducer = (state: Country[] = [], action: WineAppActionTypes): Country[] => {
    switch (action.type) {
        case FetchCountries.FetchCountriesSuccess:
            return action.payload
    }
    return state
};