import React, {useEffect} from "react";
import styled from 'styled-components'
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {User} from './types';
import {login} from "./loggedIn/User.actions";
import {getAllUsers} from "./list/Users.actions";

export const LoginPageFrame =styled.article` 
   padding-top: 4rem;
   height: 100%
 `

interface LoginPageProps{
    users?: User[],
    login: (user: User) => void,
    getUsers: () => void
}

const LoginPage = (props: LoginPageProps) => {
    const getUsers =props.getUsers

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return <LoginPageFrame>
        <h2>Who are you?</h2>
       { props.users && <ul>
            {props.users.map(it => <li key={it.id}
                                       onClick={() => props.login(it)}>{it.name}</li>)}
        </ul>}
    </LoginPageFrame>
}


const mapStateToProps = (state: any) => ({
    users: state.users
});

const mapActionsToProps = (dispatch: Dispatch) => ({
    login: (user: User) => dispatch(login(user)),
    getUsers: () => getAllUsers(dispatch)
})
export default connect(mapStateToProps, mapActionsToProps)(LoginPage)
