import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {User} from "./types";
import {goBack, push} from "connected-react-router";


interface LoginDetectionProps {
    user: User | null,
}

const LoginDetection = (props: LoginDetectionProps) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (window.location.pathname === "/login" && props.user) {
            dispatch(goBack())
        }

        if (window.location.pathname !== "/login" && !props.user) {
            console.log("Login")

            dispatch(push("/login"))
        }

    }, [window.location.pathname, props.user])

    return <></>
}


const mapStateToProps = (state: any) => ({
    user: state.user
});

export default connect(mapStateToProps)(LoginDetection)