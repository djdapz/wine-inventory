import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {goBack, push} from "connected-react-router";
import {StoreType} from "../index";
import {login} from "./loggedIn/User.actions";


export default () => {

    const dispatch = useDispatch()
    const pathName = useSelector((state: StoreType) => state.router.location.pathname)
    const user = useSelector((state: StoreType) => state.user)

    useEffect(() => {
        if (!user) {
            const name = localStorage.getItem("userName")
            const id = localStorage.getItem("userId")

            if (name && id) {
                dispatch(login({
                    name,
                    id
                }))
            }
        }
    }, [user, dispatch])

    useEffect(() => {
            if (pathName === "/login" && user) {
                dispatch(goBack())
            }

            if (pathName !== "/login" && !user) {
                dispatch(push("/login"))
            }
        }, [pathName, user, dispatch]
    )

    return <></>
}
