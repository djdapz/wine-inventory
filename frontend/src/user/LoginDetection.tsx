import React from "react";
import {getAllUsers} from "./list/Users.actions";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {User} from "./types";
import {Redirect} from "react-router-dom";


interface LoginDetectionProps {
    getUsers: () => void,
    user: User | null,
}

const LoginDetection = (props: LoginDetectionProps) => {
    console.log("props", props)

    if (window.location.pathname === "/login" && props.user) {
        return <Redirect to={"/"}/>
    }

    if (window.location.pathname !== "/login" && !props.user) {
        return <Redirect to={"/login"}/>
    }


    return <></>
}


const mapActionsToProps = (dispatch: Dispatch) => ({
    getUsers: () => getAllUsers(dispatch)
});

const mapStateToProps = (state: any) => ({
    user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(LoginDetection)