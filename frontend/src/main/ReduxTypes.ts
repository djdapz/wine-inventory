import {Action} from "redux";
import {GetWineActionTypes} from "../wine/Wine.actions";
import {CreateWineActions} from "../wine-form/CreateWine.actions";
import {FetchCountriesType} from "../wine-form/Country.actions";
import {SearchForWineActionType} from "../list/sort/Filter.Actions";
import {SortByActionType} from "../list/sort/SortBy.actions";
import {GetUsersActionTypes} from "../user/list/Users.actions";
import {LoginActionTypes} from "../user/loggedIn/User.actions";

export type SuccessfulAction<T, P> = ActionWithPayload<T, P>

export interface ActionWithPayload<T, P> extends Action<T> {
    type: T,
    payload: P
}

export type FailureAction<T> = Action<T>

export type ApiAction<S, F, P> = SuccessfulAction<S, P> | FailureAction<F>

export type StateType<ReducerOrMap> = ReducerOrMap extends (
    ...args: any[]
    ) => any
    ? ReturnType<ReducerOrMap>
    : ReducerOrMap extends object
        ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
        : never;

export  type WineAppActionTypes = GetWineActionTypes
    | CreateWineActions
    | FetchCountriesType
    | SearchForWineActionType
    | SortByActionType
    | GetUsersActionTypes
    | LoginActionTypes

