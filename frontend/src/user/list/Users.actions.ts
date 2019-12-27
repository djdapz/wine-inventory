import {Dispatch} from "redux";

import axios from 'axios';
import {backendUri} from "../../config";
import {ApiAction} from "../../redux/ReduxTypes";
import {User} from "../types";

export enum UsersActionTypes {
    GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS",
    GET_ALL_USERS_FAILURE = "GET_ALL_USERS_FAILURE"
}

export type GetUsersActionTypes = ApiAction<UsersActionTypes.GET_ALL_USERS_SUCCESS, UsersActionTypes.GET_ALL_USERS_FAILURE, User[]>

const getUsersFailure = (): GetUsersActionTypes => ({
    type: UsersActionTypes.GET_ALL_USERS_FAILURE
});

const getUsersSuccess = (users: User[]): GetUsersActionTypes => ({
    type: UsersActionTypes.GET_ALL_USERS_SUCCESS,
    payload: users
});

interface UsersResponse {
    users: User[]
}

export const getAllUsers = (dispatch: Dispatch) => {
        return axios.get(`${backendUri}/users`)
            .then(response => response.data)
            .then((data: UsersResponse) => data.users)
            .then(users => dispatch(getUsersSuccess(users)))
            .catch(() => dispatch(getUsersFailure()));
    }
;