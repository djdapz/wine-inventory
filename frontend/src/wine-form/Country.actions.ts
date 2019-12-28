import {Action, Dispatch, Middleware, MiddlewareAPI} from "redux";
import {ApiAction, WineAppActionTypes} from "../main/ReduxTypes";
import axios from 'axios'
import {backendUri} from "../config";

export enum FetchCountries {
    FetchCountries = "FetchCountries",
    FetchCountriesSuccess = "FetchCountriesSuccess",
    FetchCountriesFailure = "FetchCountriesFailure",
}

export const fetchCountries = (): FetchCountriesType => ({type: FetchCountries.FetchCountries});

export type FetchCountriesType =
    ApiAction<FetchCountries.FetchCountriesSuccess, FetchCountries.FetchCountriesFailure, CountryPayload>
    | Action<FetchCountries.FetchCountries>

export interface Country {
    code: string,
    name: string
}

export enum CountryResponseTypes {ALL, TOP_5}

export interface CountryPayload {
    countries: Country[],
    selection: CountryResponseTypes
}

export const FetchCountriesMiddleware: Middleware =
    (api: MiddlewareAPI) =>
        (next: Dispatch<WineAppActionTypes>) => {
            return (action: WineAppActionTypes) => {
                if (action.type !== FetchCountries.FetchCountries) {
                    return next(action)
                }
                getCountries("all", allCountriesFetched, next);
                getCountries("top-5", top5CountriesFetched, next);

                return next(action);
            };
        };

const getCountries = (path: string, actionCreator: (countried: Country[]) => FetchCountriesType, next: Dispatch<WineAppActionTypes>) =>
    axios.get(`${backendUri}/country/${path}`)
        .then(response => response.data)
        .then((countries: { countries: Country[] }) => countries.countries)
        .then(actionCreator)
        .then(next)
        .catch(() => next({type: FetchCountries.FetchCountriesFailure}));

export const allCountriesFetched = (countries: Country[]): FetchCountriesType => countriesFetched(countries, CountryResponseTypes.ALL);
export const top5CountriesFetched = (countries: Country[]): FetchCountriesType => countriesFetched(countries, CountryResponseTypes.TOP_5);

export const countriesFetched = (countries: Country[], selection: CountryResponseTypes): FetchCountriesType => ({
    type: FetchCountries.FetchCountriesSuccess,
    payload: {selection, countries}
});
