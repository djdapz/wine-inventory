import {WineForm} from "../wine-form/WineForm";
import {StoreType} from "../index";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {Countries} from "../wine-form/Country.reducer";
import {Wine} from "../wine/Wine.types";
import {areEquivalent, isWineRequestReadyToSubmit, WineRequest} from "../wine-form/CreateWine.types";
import {submitUpdateWine} from "../wine-form/UpdateWine.actions";

const isValidForAnUpdate = (wine: Wine) => (wineRequest: WineRequest) => {
    const readyToSubmit = isWineRequestReadyToSubmit(wineRequest)
    debugger
    const different = !areEquivalent(wine, wineRequest);
    return readyToSubmit && different;
}
export default ({wine}: { wine: Wine }) => {
    const countries = useSelector<StoreType, Countries>(store => store.countries)
    const dispatch = useDispatch()
    return <WineForm wineFormRequest={wine}
                     submit={request => dispatch(submitUpdateWine(wine.id)(request))}
                     countries={countries}
                     buttonText={"SAVE"}
                     canBeSubmitted={isValidForAnUpdate(wine)}/>;
}