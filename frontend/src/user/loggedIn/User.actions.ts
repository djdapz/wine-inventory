import {ActionWithPayload} from "../../main/ReduxTypes";
import {User} from "../types";

export enum LoginActionTypesEnum {
    LOGIN = "LOGIN",
}

export type LoginActionTypes = ActionWithPayload<LoginActionTypesEnum.LOGIN, User>

export const login = (user: User): LoginActionTypes => {
    window.localStorage.setItem("userName", user.name)
    window.localStorage.setItem("userId", user.id)
    return ({
        type: LoginActionTypesEnum.LOGIN,
        payload: user
    });
};