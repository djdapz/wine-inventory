import React, {useEffect} from "react";
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {User} from './types';
import {login} from "./loggedIn/User.actions";
import {getAllUsers} from "./list/Users.actions";
import {StoreType} from "../index";

export const LoginPageFrame =styled.article` 
   padding-top: 4rem;
   height: 100%
 `

interface LoginPageProps{
    users?: User[],
    login: (user: User) => void,
    getUsers: () => void
}

export default (props: LoginPageProps) => {
    const dispatch = useDispatch()
    const users = useSelector((state: StoreType) => state.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch ])

    return <LoginPageFrame id={'login-page'}>
        <h2>Who are you?</h2>
       { users && <ul>
            {users.map(it => <li key={it.id}
                                       onClick={() => dispatch(login(it))}>{it.name}</li>)}
        </ul>}
    </LoginPageFrame>
}