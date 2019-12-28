import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {User} from './types';
import {login} from "./loggedIn/User.actions";
import {getAllUsers} from "./list/Users.actions";
import {StoreType} from "../index";
import "./login-page.scss"

interface LoginPageProps {
    users?: User[],
    login: (user: User) => void,
    getUsers: () => void
}

export default (props: LoginPageProps) => {
    const dispatch = useDispatch()
    const users = useSelector((state: StoreType) => state.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return <div className={"content"}
                id={'login-page'}>
        <h2>Who are you?</h2>
        {users && <ul>
            {users.map(it =>
                <li className={"user-selection"}
                    key={it.id}
                >
                    <button className={'primary'}
                            onClick={() => dispatch(login(it))}>{it.name}</button>
                </li>)}
        </ul>}
    </div>
}