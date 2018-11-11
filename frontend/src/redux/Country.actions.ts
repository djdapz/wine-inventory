import {Action, Dispatch, Middleware, MiddlewareAPI} from "redux";
import {ApiAction, WineAppActionTypes} from "./ReduxTypes";
import axios from 'axios'
import {backendUri} from "../config";

export enum FetchCountries {
    FetchCountries = "FetchCountries",
    FetchCountriesSuccess = "FetchCountriesSuccess",
    FetchCountriesFailure = "FetchCountriesFailure",
}

export const fetchCountries = (): FetchCountriesType => ({type: FetchCountries.FetchCountries});

export type FetchCountriesType =
    ApiAction<FetchCountries.FetchCountriesSuccess, FetchCountries.FetchCountriesFailure, Country[]>
    | Action<FetchCountries.FetchCountries>


export interface Country {
    code: string,
    name: string
}

interface CountryApiResponse {
    countries: Country[]
}

export const FetchCountriesMiddleware: Middleware =
    (api: MiddlewareAPI) =>
        (next: Dispatch<WineAppActionTypes>) =>
            (action: WineAppActionTypes) => {
                if (action.type !== FetchCountries.FetchCountries) {
                    return next(action)
                }

                axios.get(`${backendUri}/country/all`)
                    .then(response => response.data)
                    .then((countries: CountryApiResponse) => next({
                        type: FetchCountries.FetchCountriesSuccess,
                        payload: countries.countries
                    }))
                    .catch(() => next({type: FetchCountries.FetchCountriesFailure}));

                return next(action);
            };