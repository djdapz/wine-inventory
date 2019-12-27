import {User} from "../types";
import {WineAppActionTypes} from "../../redux/ReduxTypes";
import {LoginActionTypesEnum} from "./User.actions";

export const userReducer = (state: User | null = null, action: WineAppActionTypes): User | null => {
    if (action.type === LoginActionTypesEnum.LOGIN) {
        return action.payload
    }
    return state;
}