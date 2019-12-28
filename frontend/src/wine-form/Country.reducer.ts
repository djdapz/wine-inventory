import {WineAppActionTypes} from "../main/ReduxTypes";
import {Country, CountryPayload, CountryResponseTypes, FetchCountries} from "./Country.actions";

export interface Countries {
    top5: Country[]
    all: Country[]
}

export const fetchCountriesReducer = (state: Countries = {
    top5: [],
    all: []
}, action: WineAppActionTypes): Countries => {
    switch (action.type) {
        case FetchCountries.FetchCountriesSuccess:
            return asdf(state, action.payload);
    }
    return state
};

function asdf(state: Countries, payload: CountryPayload): Countries {
    switch (payload.selection) {
        case CountryResponseTypes.TOP_5:
            return {...state, top5: payload.countries};
        case  CountryResponseTypes.ALL:
            return {...state, all: payload.countries}
    }

}