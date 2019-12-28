import {WineForm} from "../wine-form/WineForm";
import {StoreType} from "../index";
import {connect} from "react-redux";
import * as React from "react";
import {Countries} from "../wine-form/Country.reducer";
import {Wine} from "../wine/Wine.types";
import {areEquivalent, isWineRequestReadyToSubmit, WineRequest} from "../wine-form/CreateWine.types";
import {Dispatch} from "redux";
import {submitUpdateWine} from "../wine-form/UpdateWine.actions";

const isWineDifferentAndReadyToSubmit = (wine: Wine) => (wineRequest: WineRequest) => {
    const readyToSubmit = isWineRequestReadyToSubmit(wineRequest)
    const different = !areEquivalent(wine, wineRequest);
    return readyToSubmit && different;
}

type ReduxStoreProps = { countries: Countries };
type ReduxDispatchProps = { updateWine: (id: number) => (updatedWine: WineRequest) => void };
type PassedProps = { wine: Wine };

const UpdateWineForm = (props: ReduxStoreProps & ReduxDispatchProps & PassedProps) =>
    <WineForm wineFormRequest={props.wine}
              submit={props.updateWine(props.wine.id)}
              countries={props.countries}
              buttonText={"SAVE"}
              canBeSubmitted={isWineDifferentAndReadyToSubmit(props.wine)}/>

const mapStateToProps = (state: StoreType) => ({
    countries: state.countries
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateWine: submitUpdateWine(dispatch)
})


export default connect<ReduxStoreProps, ReduxDispatchProps, PassedProps, StoreType>(mapStateToProps, mapDispatchToProps)(UpdateWineForm)