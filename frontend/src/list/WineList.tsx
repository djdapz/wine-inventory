import * as React from "react";
import {useEffect} from "react";

import {useDispatch, useSelector} from 'react-redux'
import {getAllWine} from "../wine/Wine.actions";
import {Wine} from "../wine/Wine.types";
import {StoreType} from "../index";
import WineCard from "../wine/WineCard";
import {getSortedVisibleWine} from "./selectors/filteredWine";
import {User} from "../user/types";


export default () => {
    const wines = useSelector<StoreType, Wine[]>(getSortedVisibleWine)
    const user = useSelector<StoreType, User | null>(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if ((wines == null || wines.length === 0) && user) {
            dispatch(getAllWine())
        }
    }, [wines, dispatch, user])

    return <div id={'wine-list'}>
        {wines.map((wine: Wine) =>
            <WineCard key={wine.id}
                      wine={wine}/>)}
    </div>
}

