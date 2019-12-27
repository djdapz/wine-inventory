import {User} from "../types";
import {WineAppActionTypes} from "../../redux/ReduxTypes";
import {UsersActionTypes} from "./Users.actions";

export const usersReducer = (state: User[] | null = null, action: WineAppActionTypes): User[] | null => {
    if (action.type === UsersActionTypes.GET_ALL_USERS_SUCCESS) {
        return action.payload
    }
    return state;
}