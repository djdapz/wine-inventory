import * as React from "react";
import {useSelector} from "react-redux";
import {StoreType} from "../index";

const getNumberOfBottles = (state: StoreType): number => state.wines ? state.wines
    .reduce((prev, next) => next.quantity + prev, 0) : 0;

export default () => {
    const numberOfBottles = useSelector<StoreType, number>(state => getNumberOfBottles(state))
    return <h4 className='wine-bottle-count'>{numberOfBottles} bottles in cellar</h4>;
}