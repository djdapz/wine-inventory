import {Action} from "redux";
import {GetWineActionTypes} from "./Wine.actions";
import {CreateWineActions} from "./CreateWine.actions";
import {FetchCountriesType} from "./Country.actions";

export type SuccessfulAction<T, P> = ActionWithPayload<T, P>

export interface ActionWithPayload<T, P> extends Action<T> {
    type: T,
    payload: P
}

export type FailureAction<T> = Action<T>

export type ApiAction<S, F, P> = SuccessfulAction<S, P> | FailureAction<F>

export  type WineAppActionTypes = GetWineActionTypes
    | CreateWineActions
    | FetchCountriesType

export type StateType<ReducerOrMap> = ReducerOrMap extends (
    ...args: any[]
    ) => any
    ? ReturnType<ReducerOrMap>
    : ReducerOrMap extends object
        ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
        : never;

