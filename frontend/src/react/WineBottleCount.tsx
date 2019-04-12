import * as React from "react";
import {connect} from "react-redux";
import {StoreType} from "../index";

const getNumberOfBottles = (state: StoreType): number => state.wines ? state.wines
    .reduce((prev, next) => next.quantity + prev, 0) : 0;

const WineBottleCount = (props: { numberOfBottles: number }) =>
    <h4 className='wine-bottle-count'>{props.numberOfBottles} bottles in cellar</h4>


const mapStateToProps = (state: StoreType) => ({
    numberOfBottles: getNumberOfBottles(state)
})

export default connect(mapStateToProps)(WineBottleCount)