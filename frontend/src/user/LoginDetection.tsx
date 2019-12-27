import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {goBack, push} from "connected-react-router";
import {StoreType} from "../index";


export default () => {

    const dispatch = useDispatch()
    const pathName = useSelector((state: StoreType) => state.router.location.pathname)
    const user = useSelector((state: StoreType) => state.user)

    useEffect(() => {
        if (pathName === "/login" && user) {
            dispatch(goBack())
        }

        if (pathName !== "/login" && !user) {
            dispatch(push("/login"))
        }

    }, [pathName, user])

    return <></>
}
