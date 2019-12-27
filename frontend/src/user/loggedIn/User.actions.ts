import {ActionWithPayload} from "../../redux/ReduxTypes";
import {User} from "../types";

export enum LoginActionTypesEnum {
    LOGIN = "LOGIN",
}

export type LoginActionTypes = ActionWithPayload<LoginActionTypesEnum.LOGIN, User>

export const login = (user: User): LoginActionTypes =>
    ({
        type: LoginActionTypesEnum.LOGIN,
        payload: user
    });